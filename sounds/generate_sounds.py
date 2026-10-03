#!/usr/bin/env python3
"""
Efeitos sonoros do Panel Attack (estilo Tetris Attack / Panel de Pon).

Todos os sons são sintetizados do zero (sem samples), então dá para ajustar
qualquer parâmetro aqui e gerar de novo:

    pip install numpy scipy
    python3 sounds/generate_sounds.py

Saída: arquivos WAV mono, 44.1 kHz, 16 bits, na mesma pasta deste script.
"""

import os
import wave

import numpy as np
from scipy.signal import butter, lfilter

SR = 44100
OUT_DIR = os.path.dirname(os.path.abspath(__file__))
RNG = np.random.default_rng(7)  # semente fixa: o resultado é sempre igual


# =========================================================
# Utilidades de síntese
# =========================================================

def t_axis(dur):
    return np.arange(int(SR * dur)) / SR


def silence(dur):
    return np.zeros(int(SR * dur))


def note(name):
    """Frequência de uma nota, ex.: 'C5', 'F#4', 'Eb6'."""
    names = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
    semis = names[name[0]]
    rest = name[1:]
    if rest[0] == "#":
        semis += 1
        rest = rest[1:]
    elif rest[0] == "b":
        semis -= 1
        rest = rest[1:]
    midi = 12 * (int(rest) + 1) + semis
    return 440.0 * 2 ** ((midi - 69) / 12)


def env_ad(n, attack, decay_tau):
    """Envelope ataque linear + decaimento exponencial (tempos em segundos)."""
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-5), 0, 1)
    d = np.exp(-np.maximum(t - attack, 0) / decay_tau)
    return a * d


def osc(freq, dur, shape="sine"):
    """Oscilador com frequência fixa ou variando (array do mesmo tamanho)."""
    n = int(SR * dur)
    f = np.full(n, freq) if np.isscalar(freq) else freq
    phase = 2 * np.pi * np.cumsum(f) / SR
    if shape == "sine":
        return np.sin(phase)
    if shape == "triangle":
        return 2 / np.pi * np.arcsin(np.sin(phase))
    if shape == "square":
        # quadrada suavizada (menos áspera que a pura)
        return np.tanh(3 * np.sin(phase))
    raise ValueError(shape)


def sweep(f0, f1, dur, curve="exp"):
    n = int(SR * dur)
    if curve == "exp":
        return f0 * (f1 / f0) ** np.linspace(0, 1, n)
    return np.linspace(f0, f1, n)


def noise(dur):
    return RNG.uniform(-1, 1, int(SR * dur))


def lowpass(x, cutoff, order=2):
    b, a = butter(order, min(cutoff, SR * 0.45) / (SR / 2), "low")
    return lfilter(b, a, x)


def highpass(x, cutoff, order=2):
    b, a = butter(order, cutoff / (SR / 2), "high")
    return lfilter(b, a, x)


def bandpass(x, lo, hi, order=2):
    b, a = butter(order, [lo / (SR / 2), min(hi, SR * 0.45) / (SR / 2)], "band")
    return lfilter(b, a, x)


def mix(*parts):
    """Soma sinais de tamanhos diferentes (alinhados no início)."""
    n = max(len(p) for p in parts)
    out = np.zeros(n)
    for p in parts:
        out[: len(p)] += p
    return out


def place(base, sig, at):
    """Coloca `sig` dentro de `base` a partir de `at` segundos (aumenta se precisar)."""
    i = int(SR * at)
    end = i + len(sig)
    if end > len(base):
        base = np.concatenate([base, np.zeros(end - len(base))])
    base[i:end] += sig
    return base


def room(x, amount=0.18, size=1.0):
    """Reverb curtinho (combs paralelos + allpass) para dar acabamento."""
    tail = np.concatenate([x, np.zeros(int(SR * 0.35 * size))])
    wet = np.zeros_like(tail)
    for delay_ms, fb in [(29.7, 0.72), (37.1, 0.70), (41.1, 0.68), (43.7, 0.66)]:
        d = int(SR * delay_ms * size / 1000)
        b = np.zeros(d + 1); b[0] = 1
        a = np.zeros(d + 1); a[0] = 1; a[d] = -fb
        wet += lfilter(b, a, tail)
    for delay_ms, g in [(5.0, 0.7), (1.7, 0.7)]:
        d = int(SR * delay_ms / 1000)
        b = np.zeros(d + 1); b[0] = -g; b[d] = 1
        a = np.zeros(d + 1); a[0] = 1; a[d] = -g
        wet = lfilter(b, a, wet)
    wet = lowpass(wet, 6000)
    return tail + amount * wet / 4


def fade(x, fade_in=0.002, fade_out=0.01):
    x = x.copy()
    ni, no = int(SR * fade_in), int(SR * fade_out)
    if ni:
        x[:ni] *= np.linspace(0, 1, ni)
    if no:
        x[-no:] *= np.linspace(1, 0, no)
    return x


def trim_tail(x, threshold=1e-4):
    idx = np.where(np.abs(x) > threshold * np.max(np.abs(x)))[0]
    return x[: idx[-1] + 1] if len(idx) else x


def save(name, x, peak):
    """Normaliza para o pico desejado (define o volume relativo entre sons) e grava."""
    x = trim_tail(x)
    x = fade(x)
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    data = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    path = os.path.join(OUT_DIR, name)
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())
    print(f"  {name:<24} {len(x) / SR * 1000:6.0f} ms")


# =========================================================
# Peças sonoras reutilizáveis
# =========================================================

def click(dur=0.006, lo=2500, hi=9000):
    """Transiente curtinho de clique (ruído filtrado)."""
    x = bandpass(noise(dur), lo, hi)
    return x * env_ad(len(x), 0.0003, dur / 3)


def bell(freq, dur, bright=1.0):
    """Sino/carrilhão: fundamental + parciais levemente inarmônicas."""
    n = int(SR * dur)
    partials = [(1.0, 1.0, 1.0), (2.0, 0.45 * bright, 0.6), (3.01, 0.22 * bright, 0.4), (4.2, 0.12 * bright, 0.25)]
    out = np.zeros(n)
    for ratio, amp, decay_scale in partials:
        out += amp * osc(freq * ratio, dur) * env_ad(n, 0.002, dur * 0.35 * decay_scale)
    return out


def clack(freq, dur=0.11, wood=1.0):
    """Impacto de peça plástica/madeira: dois modos ressonantes + transiente."""
    n = int(SR * dur)
    body = (osc(freq, dur) * env_ad(n, 0.0008, 0.018)
            + 0.5 * osc(freq * 2.71, dur) * env_ad(n, 0.0005, 0.010))
    tick = bandpass(noise(0.012), 1500, 6000 * wood) * env_ad(int(SR * 0.012), 0.0002, 0.003)
    return mix(body, 0.6 * tick)


def whoosh(dur, f_start, f_end, q_width=0.6):
    """Ruído com filtro passa-banda varrendo de f_start a f_end."""
    n = int(SR * dur)
    src = noise(dur)
    out = np.zeros(n)
    block = 256
    freqs = f_start * (f_end / f_start) ** np.linspace(0, 1, n // block + 1)
    zi = None
    for k, i in enumerate(range(0, n, block)):
        f = freqs[k]
        lo, hi = f * (1 - q_width / 2), f * (1 + q_width / 2)
        b, a = butter(2, [lo / (SR / 2), min(hi, SR * 0.45) / (SR / 2)], "band")
        seg = src[i:i + block]
        if zi is None:
            zi = np.zeros(max(len(a), len(b)) - 1)
        y, zi = lfilter(b, a, seg, zi=zi)
        out[i:i + len(seg)] = y
    shape = np.sin(np.linspace(0, np.pi, n)) ** 1.5
    return out * shape


# =========================================================
# 1. Troca de blocos
# =========================================================

def make_swap():
    # "Click" + deslize curto para cima: satisfatório sem ser agudo demais
    dur = 0.09
    slide = osc(sweep(620, 980, dur), dur, "triangle") * env_ad(int(SR * dur), 0.003, 0.025)
    body = 0.35 * osc(sweep(310, 490, dur), dur) * env_ad(int(SR * dur), 0.002, 0.02)
    x = mix(0.7 * click(0.005, 3000, 8000), slide, body)
    save("swap.wav", room(lowpass(x, 7000), 0.08, 0.6), 0.55)


# =========================================================
# 2. Queda / gravidade
# =========================================================

def make_fall():
    save("fall_single_a.wav", room(clack(note("A4")), 0.10, 0.6), 0.6)
    save("fall_single_b.wav", room(clack(note("C5")), 0.10, 0.6), 0.6)
    save("fall_single_c.wav", room(clack(note("E5"), wood=0.8), 0.10, 0.6), 0.6)
    # Vários blocos caindo: cascata de clacks, cada um um pouco mais grave e baixo
    x = silence(0.01)
    for i, (n, at) in enumerate(zip(["E5", "C5", "A4", "G4"], [0.0, 0.055, 0.105, 0.150])):
        x = place(x, (0.95 - 0.13 * i) * clack(note(n)), at)
    save("fall_multi.wav", room(x, 0.12, 0.7), 0.65)


# =========================================================
# 3. Remoção (match)
# =========================================================

def sparkle(base_freq, count, spread, dur=0.35):
    """Brilhinhos: pings agudos curtos em notas da escala, espalhados no tempo."""
    x = silence(dur)
    ratios = [1, 1.25, 1.5, 2, 2.5, 3]  # tríade maior em oitavas
    for i in range(count):
        f = base_freq * ratios[RNG.integers(len(ratios))] * 2
        at = (i / max(count - 1, 1)) * spread + RNG.uniform(0, 0.01)
        ping = osc(f, 0.12) * env_ad(int(SR * 0.12), 0.001, 0.035)
        x = place(x, 0.35 * ping, at)
    return x


def pop(freq):
    """'Pop' de bolha: seno com queda rápida de afinação."""
    dur = 0.08
    return osc(sweep(freq * 2, freq, dur), dur) * env_ad(int(SR * dur), 0.001, 0.025)


def make_clear():
    for name, root, sparks, spread in [
        ("clear_3.wav", note("C5"), 4, 0.10),
        ("clear_4.wav", note("E5"), 6, 0.14),
        ("clear_5plus.wav", note("G5"), 9, 0.20),
    ]:
        x = mix(pop(root), 0.5 * pop(root * 1.5))
        x = place(x, sparkle(root, sparks, spread), 0.02)
        save(name, room(x, 0.22, 0.8), 0.8)


# =========================================================
# 4. Chain / combo
# =========================================================

def make_chains():
    # Cada chain sobe um grau da escala maior; a partir da 5ª ganha uma
    # quarta nota e um brilho extra no fim
    scale = ["C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"]
    for chain in range(2, 9):
        root = note(scale[chain - 2])
        steps = [1.0, 1.25, 1.5] + ([2.0] if chain >= 5 else [])
        gap = max(0.075 - 0.004 * chain, 0.05)
        x = silence(0.01)
        for i, r in enumerate(steps):
            x = place(x, bell(root * r, 0.6, bright=0.8 + 0.1 * chain) * (0.8 + 0.1 * i), i * gap)
        if chain >= 5:
            x = place(x, sparkle(root * 2, 4 + chain, 0.2, 0.4), len(steps) * gap)
        save(f"chain_{chain}.wav", room(x, 0.28, 1.0), 0.85)


# =========================================================
# 5. Nova linha subindo
# =========================================================

def make_rise():
    dur = 0.28
    air = lowpass(whoosh(dur, 300, 1400, 0.8), 3000)
    thump_d = 0.16
    thump = osc(sweep(110, 55, thump_d), thump_d) * env_ad(int(SR * thump_d), 0.004, 0.05)
    tick = 0.25 * clack(note("A3"), 0.08)
    x = place(0.55 * air, thump, 0.17)
    x = place(x, tick, 0.17)
    save("rise.wav", room(x, 0.1, 0.7), 0.45)


# =========================================================
# 6. Aviso (pilha perto do topo) — feito para repetir em loop
# =========================================================

def make_warning():
    loop = silence(0.8)  # 75 batidas por minuto

    def beat(freq, amp):
        d = 0.18
        return amp * osc(sweep(freq * 1.4, freq, d), d) * env_ad(int(SR * d), 0.004, 0.05)

    loop = place(loop, beat(70, 1.0), 0.0)    # "tum"
    loop = place(loop, beat(58, 0.75), 0.17)  # "tum"
    # Bipe suave de alarme junto com a batida
    d = 0.11
    beep = osc(note("A5"), d, "triangle") * env_ad(int(SR * d), 0.005, 0.03)
    loop = place(loop, 0.22 * lowpass(beep, 3000), 0.0)
    loop = loop[: int(SR * 0.8)]  # mantém o tamanho exato para o loop
    loop = loop / (np.max(np.abs(loop)) + 1e-9) * 0.6
    data = (np.clip(loop, -1, 1) * 32767).astype(np.int16)
    with wave.open(os.path.join(OUT_DIR, "warning_loop.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(data.tobytes())
    print(f"  {'warning_loop.wav':<24} {800:6d} ms (loop)")


# =========================================================
# 7. Game Over
# =========================================================

def make_game_over():
    # Arpejo descendente menor, timbre suave; nota final longa com vibrato
    x = silence(0.05)
    for i, n in enumerate(["G4", "Eb4", "C4"]):
        d = 0.32
        tone = osc(note(n), d, "triangle") * env_ad(int(SR * d), 0.01, 0.12)
        x = place(x, 0.8 * lowpass(tone, 2500), i * 0.18)
    d = 1.3
    t = t_axis(d)
    vib = note("C3") * (1 + 0.006 * np.sin(2 * np.pi * 5 * t))
    last = (osc(vib, d, "triangle") + 0.4 * osc(vib * 2, d)) * env_ad(int(SR * d), 0.02, 0.45)
    x = place(x, 0.9 * lowpass(last, 1800), 0.56)
    save("game_over.wav", room(x, 0.3, 1.2), 0.8)


# =========================================================
# 8. Movimento do cursor
# =========================================================

def make_cursor():
    d = 0.03
    tick = osc(2100, d) * env_ad(int(SR * d), 0.0005, 0.006)
    x = mix(tick, 0.4 * click(0.004, 4000, 10000))
    save("cursor_move.wav", x, 0.32)


# =========================================================
# 9. Clique de botão (menu)
# =========================================================

def make_ui_click():
    d = 0.06
    tone = osc(sweep(1500, 1200, d), d) * env_ad(int(SR * d), 0.001, 0.012)
    tone2 = 0.4 * osc(2400, d) * env_ad(int(SR * d), 0.001, 0.008)
    x = mix(0.8 * click(0.005, 2000, 8000), tone, tone2)
    save("ui_click.wav", room(x, 0.06, 0.5), 0.5)


# =========================================================
# 10. Pause / Unpause
# =========================================================

def make_pause():
    def two_notes(a, b):
        x = silence(0.01)
        for i, n in enumerate([a, b]):
            d = 0.22
            x = place(x, osc(note(n), d) * env_ad(int(SR * d), 0.004, 0.07), i * 0.09)
        return x

    down = place(0.5 * whoosh(0.25, 2500, 400, 0.7), two_notes("E5", "A4"), 0.03)
    up = place(0.5 * whoosh(0.25, 400, 2500, 0.7), two_notes("A4", "E5"), 0.03)
    save("pause.wav", room(lowpass(down, 6000), 0.15, 0.7), 0.55)
    save("unpause.wav", room(lowpass(up, 6000), 0.15, 0.7), 0.55)


if __name__ == "__main__":
    print("Gerando efeitos em", OUT_DIR)
    make_swap()
    make_fall()
    make_clear()
    make_chains()
    make_rise()
    make_warning()
    make_game_over()
    make_cursor()
    make_ui_click()
    make_pause()
