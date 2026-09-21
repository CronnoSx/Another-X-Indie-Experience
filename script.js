/* ==========================================================================
   AXIE DESERT RUSH - v7 (bioma de Gelo / Tundra Congelada)
   Jogo 3D top-down de deslizamento sobre gelo, feito com Three.js puro.
   Nome do projeto mantido por enquanto mesmo com a mudanca de bioma.
   Nenhuma template string (crase) e usada; concatenacao com "+" no lugar.
   ========================================================================== */

/* ============================ IDIOMA (I18N) ============================= */
// Idiomas: 'en' (padrao) e 'pt' (Portugues do Brasil). TXT(chave, arg0, arg1...) devolve o texto no
// idioma atual e troca {0}, {1}... pelos argumentos. Cada entrada de I18N = [ingles, portugues].
// O texto fixo do HTML usa data-i18n* (ver applyStaticI18n); o idioma escolhido fica salvo no navegador.
var LANG_STORAGE_KEY = 'axie_lang';
var LANG = 'en';
try {
  var __savedLang = window.localStorage.getItem(LANG_STORAGE_KEY);
  if (__savedLang === 'pt' || __savedLang === 'en') { LANG = __savedLang; }
} catch (e) { /* sem storage: fica no padrao (ingles) */ }

var I18N = {
  // senha
  'pw.sub': ['Enter the password to play', 'Digite a senha para entrar'],
  'pw.ph': ['Password', 'Senha'],
  'pw.btn': ['Enter', 'Entrar'],
  'pw.err': ['Wrong password. Try again.', 'Senha incorreta. Tente novamente.'],
  // titulo / menus
  'title.play': ['Play <span class="arrow">&rarr;</span>', 'Jogar <span class="arrow">&rarr;</span>'],
  'title.alt': ['Plant Axie', 'Axie Planta'],
  'menu.title': ['Menu', 'Menu'],
  'menu.single': ['Single Player', 'Single Player'],
  'menu.multi': ['Multiplayer <span class="menu-soon">(coming soon)</span>', 'Multiplayer <span class="menu-soon">(em breve)</span>'],
  'menu.options': ['Options', 'Opções'],
  // selecao de personagem
  'select.title': ['Choose your character', 'Escolha seu personagem'],
  'select.name': ['Type your name', 'Digite seu nome'],
  'select.info': ['Select a character', 'Selecione um personagem'],
  'select.back': ['Back', 'Voltar'],
  'select.start': ['Start', 'Start'],
  'select.soon': ['Coming soon', 'Em breve'],
  'class.plant.label': ['Plant', 'Planta'],
  'class.plant.hint': ['Green', 'Verde'],
  'class.plant.desc': ['Tank: 2 lives, Leaves, area invulnerability', 'Tank: 2 vidas, Folhas, invulnerável em área'],
  'class.beast.label': ['Beast', 'Besta'],
  'class.beast.hint': ['Orange', 'Laranja'],
  'class.beast.desc': ['Killer: strong Push and Stomp', 'Killer: empurrão forte e Pisão'],
  'class.aqua.label': ['Aquatic', 'Aquática'],
  'class.aqua.hint': ['Blue', 'Azul'],
  'class.aqua.desc': ['Long Dash, Water Jet and Water Spit', 'Dash longo, Jato de água e Cuspe'],
  'player.default': ['Player', 'Jogador'],
  // skills e habilidades
  'skill.leaves': ['Leaves', 'Folhas'],
  'skill.invuln': ['Invulnerable', 'Invulnerável'],
  'skill.push': ['Push', 'Empurrar'],
  'skill.stomp': ['Stomp', 'Pisão'],
  'skill.jet': ['Water Jet', 'Jato de água'],
  'skill.spit': ['Water Spit', 'Cuspe de água'],
  'skill.m.leaves': ['Leaves', 'Folhas'],
  'skill.m.invuln': ['Invuln', 'Invul'],
  'skill.m.push': ['Push', 'Empurrar'],
  'skill.m.stomp': ['Stomp', 'Pisão'],
  'skill.m.jet': ['Jet', 'Jato'],
  'skill.m.spit': ['Spit', 'Cuspe'],
  'ab.teleport': ['Teleport', 'Teleporte'],
  'ab.dash': ['Dash', 'Dash'],
  'ab.skill1': ['Skill 1', 'Skill 1'],
  'ab.skill2': ['Skill 2', 'Skill 2'],
  'ab.respawn': ['Respawn', 'Respawn'],
  'ab.help': ['Help', 'Socorro'],
  'ab.life': ['Life', 'Vida'],
  'mobile.help': ['T - Call for help', 'T - Pedir socorro'],
  'key.space': ['Space', 'Espaço'],
  // tutorial (antes da partida)
  'guide.pc.title': ['Controls (PC)', 'Comandos (PC)'],
  'guide.rmb': ['Right mouse button', 'Botão direito do mouse'],
  'guide.rmb.d': ['Hold = walk to the mouse cursor', 'Segurar = andar até o cursor do mouse'],
  'guide.lmb': ['Left mouse button', 'Botão esquerdo do mouse'],
  'guide.lmb.d': ['Click to confirm the skill aim', 'Clicar para confirmar a mira da skill'],
  'guide.help': ['Call for help (frozen)', 'Pedir socorro (congelado)'],
  'guide.esc': ['Pause / cancel aim', 'Pausa / cancelar mira'],
  'guide.tip': ['Tip: in Options you can turn on <b>Quick cast</b> (the skill fires instantly toward the cursor).', 'Dica: em Opções você liga o <b>Atalho rápido</b> (a skill sai na hora na direção do cursor).'],
  'guide.skillN': ['Skill {0} ({1})', 'Skill {0} ({1})'],
  'guide.mob.title': ['Controls (Mobile)', 'Comandos (Mobile)'],
  'guide.mob.hud': ['Team scoreboard', 'Placar do time'],
  'guide.mob.joy': ['Joystick<br>= move', 'Joystick<br>= andar'],
  'guide.mob.drag': ['<b>Touch and drag</b> to use the skill', '<b>Toque e arraste</b> para usar a skill'],
  'guide.mob.tap': ['<b>Tap</b> for quick use', '<b>Toque</b> para uso rápido'],
  'guide.mob.note': ['Skill 1 and Skill 2 have aim assist.', 'Skill 1 e Skill 2 têm auxílio de mira.'],
  'guide.goal.title': ['Objective', 'Objetivo'],
  'guide.story': ['For some reason the cells were opened... escape the frozen prison with your allies and do not let the enemy guild lock you inside the maze again.', 'Por algum motivo as celas foram abertas... escape da prisão congelada com seus aliados e não deixe que a guilda inimiga te tranque dentro do labirinto novamente.'],
  'guide.foot': ['Click or press any key to continue', 'Clique ou pressione qualquer tecla para continuar'],
  'hint.follow': ['Follow the ice to the checkpoint <span class="hint-arrow">&#10140;</span>', 'Siga pelo gelo até o checkpoint <span class="hint-arrow">&#10140;</span>'],
  // pausa / opcoes
  'pause.title': ['Pause', 'Pausa'],
  'pause.resume': ['Resume', 'Continuar'],
  'pause.quit': ['Quit match', 'Sair da partida'],
  'pause.aria': ['Pause', 'Pausar'],
  'opt.language': ['Language', 'Idioma'],
  'opt.volume': ['Master volume', 'Volume geral'],
  'opt.volume.note': ['Controls the overall game volume.', 'Regula o volume do jogo por completo.'],
  'opt.music': ['Soundtrack', 'Trilha sonora'],
  'opt.sfx': ['Game sounds', 'Sons do jogo'],
  'opt.sfx.note': ['Skills, chatter, noises, ambience and Axie voices.', 'Skills, conversas, barulhos, ambiente e vozes dos Axies.'],
  'opt.quick': ['Quick cast', 'Atalho rápido'],
  'opt.quick.note': ['On: pressing 1/2/3/4 fires the skill instantly toward the cursor direction/point. Off: shows the aim and you confirm with a click.', 'Ligado: ao teclar 1/2/3/4 a skill sai na hora, na direção/ponto do cursor. Desligado: mostra a mira e você confirma com o clique.'],
  'opt.on': ['On', 'Ligado'],
  'opt.off': ['Off', 'Desligado'],
  'opt.keys': ['Keyboard shortcuts', 'Atalhos de teclado'],
  'opt.savekeys': ['Save shortcuts', 'Salvar atalhos'],
  'opt.reset': ['Reset to defaults', 'Restaurar padrões'],
  'kb.press': ['Press the new key', 'Pressione a nova tecla'],
  'kb.pressFor': ['Press the new key for {0} (Esc cancels).', 'Pressione a nova tecla para {0} (Esc cancela).'],
  'kb.cancelled': ['Cancelled.', 'Cancelado.'],
  'kb.reserved': ['The {0} key is reserved. Choose another.', 'A tecla {0} é reservada. Escolha outra.'],
  'kb.saved': ['Shortcuts saved.', 'Atalhos salvos.'],
  'kb.restored': ['Shortcuts restored to defaults.', 'Atalhos restaurados para o padrão.'],
  'kb.dupPart': ['key {0} is on {1}', 'a tecla {0} está em {1}'],
  'kb.and': [' and ', ' e '],
  'kb.dupMsg': ['Duplicate shortcuts: {0}. Fix them to be able to save.', 'Atalhos duplicados: {0}. Ajuste para poder salvar.'],
  'kb.unsaved': ['Unsaved changes - click Save shortcuts.', 'Alterações ainda não salvas - clique em Salvar atalhos.'],
  // fim de partida
  'victory.win': ['VICTORY!', 'VITÓRIA!'],
  'victory.lose': ['DEFEAT', 'DERROTA'],
  'victory.sub': ['{0} won — Arrived: {1}/{2}', '{0} venceu — Chegaram: {1}/{2}'],
  'victory.menu': ['Main menu', 'Menu principal'],
  'team.a': ['Team A', 'Time A'],
  'team.b': ['Team B', 'Time B'],
  // mensagens no jogo
  'msg.teamElim': ['TEAM ELIMINATED! Everyone respawns at their own last checkpoint', 'TIME ELIMINADO! Respawn de todos no próprio último checkpoint'],
  'msg.teamWon': ['YOUR TEAM WON!', 'SEU TIME VENCEU!'],
  'msg.enemyWon': ['ENEMY TEAM WON!', 'TIME ADVERSÁRIO VENCEU!'],
  'msg.reachedEnd': ['YOU REACHED THE END! Help the team until the last one arrives', 'VOCÊ CHEGOU AO FINAL! Ajude o time até o último chegar'],
  'msg.lifeLost': ['Life lost!', 'Vida perdida!'],
  'msg.savedAlly': ['Saved by an ally!', 'Salvo por um aliado!'],
  'msg.manualRespawn': ['Manual respawn!', 'Respawn manual!'],
  'msg.respawn': ['Respawn!', 'Respawn!'],
  'msg.callingHelp': ['Calling for help!', 'Pedindo socorro!'],
  'msg.cancelled': ['Cancelled', 'Cancelado'],
  'msg.teleportCancelled': ['Teleport cancelled', 'Teleporte cancelado'],
  'msg.dashCancelled': ['Dash cancelled', 'Dash cancelado'],
  'msg.aimCancelled': ['Aim cancelled', 'Mira cancelada'],
  'msg.aimTeleport': ['Teleport: click/drag the destination', 'Teleporte: clique/arraste o destino'],
  'msg.aimDash': ['Dash: click/drag the direction', 'Dash: clique/arraste a direção'],
  'msg.aimDir': ['{0}: click/drag the direction', '{0}: clique/arraste a direção'],
  'msg.aimSpit': ['Water Spit: click/drag the target', 'Cuspe de água: clique/arraste o alvo'],
  'msg.teleport': ['Teleport!', 'Teleporte!'],
  'msg.dash': ['Dash!', 'Dash!'],
  'msg.pushed': ['Push! {0} destroyed, {1} pushed', 'Empurrou! {0} destruído(s), {1} empurrado(s)'],
  'msg.stomp': ['Stomp! {0} destroyed, {1} pushed', 'Pisão! {0} destruído(s), {1} empurrado(s)'],
  'msg.invuln': ['Invulnerable!', 'Invulnerável!'],
  'msg.invulnAlly': [' (+{0} ally)', ' (+{0} aliado)'],
  'msg.invulnAllies': [' (+{0} allies)', ' (+{0} aliados)'],
  'msg.jet': ['Water Jet!', 'Jato de água!'],
  'msg.spit': ['Water Spit!', 'Cuspe de água!'],
  'msg.spitHits': ['Water Spit! ({0} slipping)', 'Cuspe de água! ({0} escorregando)'],
  'msg.RESPAWN': ['RESPAWN!', 'RESPAWN!'],
  'msg.checkpoint': ['CHECKPOINT!', 'CHECKPOINT!'],
  'msg.frozen': ['FROZEN! ({0} = call for help, {1} = respawn)', 'CONGELADO! ({0} = pedir socorro, {1} = respawn)'],
  'msg.go': ['GO!', 'VAI!'],
  'msg.intro': ['Slide on the ice! Reach the checkpoints and avoid the obstacles.', 'Deslize pelo gelo! Alcance os checkpoints e evite os obstáculos.'],
  // painel do time e avisos
  'hud.teamA': ['Team A (you)', 'Time A (você)'],
  'hud.teamB': ['Team B (you)', 'Time B (você)'],
  'hud.arrived': ['Arrived: {0}/{1}', 'Chegaram: {0}/{1}'],
  'hud.alive': ['Alive: {0} | Frozen: {1}', 'Vivos: {0} | Congelados: {1}'],
  'hud.enemyArrived': ['Enemy arrived: {0}/{1}', 'Adversário chegou: {0}/{1}'],
  'hud.objective': ['Objective: the whole team must reach the end', 'Objetivo: todos do time chegarem ao final'],
  'frozen.title': ['FROZEN - respawn in {0}s', 'CONGELADO - respawn em {0}s'],
  'frozen.help': ['{0} = call for help', '{0} = pedir socorro'],
  'frozen.sent': [' (request sent!)', ' (pedido enviado!)'],
  'frozen.respawn': ['{0} = respawn now', '{0} = respawn agora'],
  // etiquetas sobre os Axies
  'np.rooted': ['rooted', 'preso'],
  'np.spinning': ['spinning', 'girando'],
  'np.noTurn': ['no turning', 'sem curva'],
  'np.slow': ['slow', 'lento'],
  'np.frozen': ['frozen', 'congelado'],
  // feedback de acerto de skill
  'hit.leaf.tag': ['Leaf!', 'Folha!'],
  'hit.leaf.text': ['Hit by LEAF! (slowed / rooted)', 'Atingido por FOLHA! (lento / preso)'],
  'hit.jet.tag': ['Jet!', 'Jato!'],
  'hit.jet.text': ['Hit by WATER JET! (pushed and slowed)', 'Atingido por JATO DE ÁGUA! (empurrado e lento)'],
  'hit.push.tag': ['Push!', 'Empurrão!'],
  'hit.push.text': ['Hit by PUSH! (thrown and slowed)', 'Atingido por EMPURRÃO! (arremessado e lento)'],
  'hit.stomp.tag': ['Stomp!', 'Pisão!'],
  'hit.stomp.text': ['Hit by STOMP! (pushed and heavily slowed)', 'Atingido por PISÃO! (empurrado e muito lento)'],
  'hit.spit.tag': ['Spit!', 'Cuspe!'],
  'hit.spit.text': ['Caught by WATER SPIT! (slipping)', 'Pego pelo CUSPE DE ÁGUA! (escorregando)'],
  'hit.dash.tag': ['Dash!', 'Dash!'],
  'hit.dash.text': ['Run over by the PLANT DASH! (slowed)', 'Atropelado pelo DASH DA PLANTA! (lento)']
};
function TXT(key) {
  var entry = I18N[key];
  if (!entry) { return key; }
  var s = entry[LANG === 'pt' ? 1 : 0], i;
  for (i = 1; i < arguments.length; i++) { s = s.split('{' + (i - 1) + '}').join(String(arguments[i])); }
  return s;
}
// Aplica o idioma atual a todo texto fixo do HTML.
function applyStaticI18n() {
  var maps = [['data-i18n', 'text'], ['data-i18n-html', 'html'], ['data-i18n-ph', 'placeholder'], ['data-i18n-alt', 'alt'], ['data-i18n-aria', 'aria-label']], m, i, els, el, key;
  document.documentElement.lang = (LANG === 'pt') ? 'pt-BR' : 'en';
  for (m = 0; m < maps.length; m++) {
    els = document.querySelectorAll('[' + maps[m][0] + ']');
    for (i = 0; i < els.length; i++) {
      el = els[i];
      key = el.getAttribute(maps[m][0]);
      if (maps[m][1] === 'text') { el.textContent = TXT(key); }
      else if (maps[m][1] === 'html') { el.innerHTML = TXT(key); }
      else { el.setAttribute(maps[m][1], TXT(key)); }
    }
  }
  var sel = document.getElementById('opt-lang');
  if (sel) { sel.value = LANG; }
}

/* ============================ CONFIGURACOES ============================= */

// Escalas gerais pedidas pelo usuario: o MAPA (comprimento de cada trecho -
// "quanto se anda") cresce ~25% (meio do range 20-30% pedido); a LARGURA da
// trilha (distancia entre trilhas paralelas, CORRIDOR_PITCH, de onde vem a
// largura de verdade do corredor via DUNE_OFFSET) cresce ~17.5% (meio do
// range 15-20% pedido) - numeros DIFERENTES de proposito, cada requisito
// aplicado no lugar certo, em vez de um unico fator generico em tudo.
var MAP_SCALE = 1.25;
var TRACK_WIDTH_SCALE = 1.175;

var TURNS = 5;                    // numero de voltas completas da espiral
var NUM_TURNS = TURNS * 4;        // 4 lados (direita/baixo/esquerda/cima) por volta

// Duas quinas extras no final, alem das TURNS voltas completas, pra
// aproveitar o espaco vago que sobrava perto do centro do mapa. A PRIMEIRA
// dessas duas quinas extras (a penultima quina de toda a espiral) nao vira
// checkpoint - fica so como uma curva lisa de passagem - e a SEGUNDA (a
// ultima quina de todas) e o novo checkpoint final.
var EXTRA_END_LEGS = 2;

// A partir desta quina (inclusive), a trilha visivel fica TRACK_WIDEN_FACTOR
// vezes mais larga, pra usar o espaco vago do centro. A MARGEM/checkpoint
// (trimForCorner) usa um fator MENOR e proprio (TRIM_WIDEN_FACTOR) - se
// usasse o mesmo 1.5x da trilha, a margem de quinas "uma volta afastadas"
// (ex: quina 18 e quina 22) ficaria pequena demais e abriria um furo (ja
// aconteceu e foi corrigido - ver o teste de travessia completa).
var TRACK_WIDEN_FROM_CORNER = 17;
var TRACK_WIDEN_FACTOR = 1.5;
var TRIM_WIDEN_FACTOR = 1.2;

// A ULTIMA volta da espiral (mais as duas quinas extras) nao tem uma "volta
// mais interna" que limite seu lado de DENTRO (ver createInnerCap) - MAS
// alargar QUALQUER trecho antes da quina 19 (corners[19]/[20]) faz o espaco
// vazio "furar" direto ate perto do checkpoint final, permitindo contornar o
// checkpoint 19 por dentro do proprio espaco alargado (testado e confirmado
// via BFS de alcancabilidade - o checkpoint 19 e o "portao" obrigatorio
// entre o resto da espiral e a area central, e alargar os trechos ANTES
// dele reduz demais essa "garganta"). Os trechos 16, 17 e 18 ficam no
// tamanho padrao (DUNE_OFFSET) por isso - so os trechos 19, 20 e 21 (que
// literalmente terminam DENTRO da area central, depois do unico portao)
// alargam. Cada valor foi medido empiricamente (maior deslocamento antes de
// um trecho chegar a menos de 15 unidades de QUALQUER outro trecho da
// espiral) e reduzido para boa folga, respeitando o teto CENTER_WIDEN_OFFSET.
// CENTER_WIDEN_OFFSET e a largura (lado de DENTRO) dos ultimos trechos - e
// concentualmente parte da LARGURA da trilha (nao do comprimento do mapa),
// entao escala por TRACK_WIDTH_SCALE, igual DUNE_OFFSET/CORRIDOR_PITCH logo
// abaixo.
var CENTER_WIDEN_OFFSET = 80 * TRACK_WIDTH_SCALE;
var CENTER_WIDEN_FROM_LEG = (TURNS - 1) * 4; // mesmo trecho que createInnerCap ja usa
var CENTER_WIDEN_OFFSET_BY_LEG = { 19: CENTER_WIDEN_OFFSET, 20: CENTER_WIDEN_OFFSET, 21: CENTER_WIDEN_OFFSET };

var TRACK_WIDTH_START = 15 * TRACK_WIDTH_SCALE; // largura da pista de areia clara na volta mais externa (mais larga)
var TRACK_WIDTH_END = 8 * TRACK_WIDTH_SCALE;    // largura da pista de areia clara na volta mais interna (mais estreita)
var SHOULDER_WIDTH = 4 * TRACK_WIDTH_SCALE;     // largura do acostamento de gelo escuro (cada lado)
// CORRIDOR_PITCH precisa ser grande o bastante para que quinas "uma volta
// afastadas" (mesma posicao relativa, ex: quina 17 e quina 21) nao cheguem a
// se tocar: a distancia diagonal entre elas e CORRIDOR_PITCH*sqrt2, que
// precisa superar a SOMA dos dois trims (trimForCorner) envolvidos, com
// folga. Isso ficou mais exigente em duas ocasioes: quando as divisorias
// engrossaram (DUNE_BASE_WIDTH maior) e de novo quando as quinas a partir de
// TRACK_WIDEN_FROM_CORNER passaram a ser 1.5x maiores (a pior combinacao
// agora e quina 17 vs quina 21, ambas com trim*1.5). Escalado por
// TRACK_WIDTH_SCALE (pedido do usuario: trilhas ~15-20% mais largas) - como
// TODA a geometria relacionada (trims, margens de checkpoint) escala JUNTO
// pelo mesmo fator, a proporcao/folga entre voltas vizinhas se mantem
// identica, so maior - as trilhas continuam impossiveis de colar ou pular.
var CORRIDOR_PITCH = 76 * TRACK_WIDTH_SCALE;  // distancia entre trilhas paralelas
var DUNE_OFFSET = CORRIDOR_PITCH / 2;  // duna fica exatamente na metade do caminho entre duas trilhas
var DUNE_BASE_WIDTH = 14;         // largura da base da divisoria de gelo entre trilhas (mantida - so a distancia entre trilhas cresce, nao a espessura da parede)
var DUNE_HEIGHT = 6;              // altura da divisoria de gelo (proporcional a nova largura)

// Comprimento de cada trecho e distancia do inicio - isso e o MAPA GERAL
// (pedido do usuario: ~20-30% maior), escalado por MAP_SCALE, INDEPENDENTE
// da largura da trilha (TRACK_WIDTH_SCALE, acima) - sao dois pedidos
// diferentes, com fatores diferentes.
var FIRST_LEG_LENGTH = 950 * MAP_SCALE;       // comprimento do primeiro trecho da espiral (mapa maior = percurso mais longo, mesma velocidade)
var MIN_LEG_LENGTH = 40 * MAP_SCALE;          // comprimento minimo perto do centro
var START_INSET = 25 * MAP_SCALE;             // distancia do inicio ate a quina real do mapa

// Tamanho do checkpoint (visual + hitbox) e da area inicial - escalam
// JUNTO com a largura da trilha (TRACK_WIDTH_SCALE), a pedido explicito do
// usuario ("aumente o tamanho visual e a hitbox do checkpoint na mesma
// proporcao da nova largura da trilha").
var OASIS_RADIUS = 11.7 * TRACK_WIDTH_SCALE;  // raio do nucleo decorativo do checkpoint - a area JOGAVEL
                                   // do checkpoint e um RETANGULO, cp.xMin/xMax/zMin/zMax - ver computeCheckpointZone)
var START_RADIUS = 26 * TRACK_WIDTH_SCALE;    // raio da area solida inicial
// A duna/colisor tem espessura fisica propria (DUNE_BASE_WIDTH/2 + PLAYER_RADIUS
// = "raio de bloqueio"), entao o trim precisa sobrar alem disso com folga
// extra para a quina inteira ficar de fato livre de colisao nos lados
// fechados. Com divisorias mais grossas esse raio de bloqueio cresceu, entao
// os trims tambem precisaram crescer para manter a mesma folga relativa.
var CORNER_TRIM = 32 * TRACK_WIDTH_SCALE;     // margem sem duna perto de cada quina normal (quase toda a quina vira checkpoint)
var START_TRIM = 38 * TRACK_WIDTH_SCALE;      // margem sem duna ao redor do inicio (bem maior, mesma logica do CORNER_TRIM)

// Cada checkpoint guarda a propria zona JOGAVEL como um RETANGULO em
// coordenadas absolutas (cp.xMin/xMax/zMin/zMax, ver computeCheckpointZone) -
// usada tanto para saber se o jogador "ativou" o checkpoint quanto para a
// zona de controle livre. Precisa cobrir, em cada um dos ate 2 lados
// ABERTOS da quina, pelo menos ate onde a divisoria de verdade daquele lado
// comeca - se fosse menor, sobraria uma faixa "livre" entre o retangulo do
// checkpoint e a divisoria por onde da para cortar caminho na diagonal sem
// tocar o checkpoint. E um RETANGULO (nao mais um quadrado unico) porque a
// ULTIMA volta da espiral tem o lado de FORA numa distancia e o lado de
// DENTRO em outra, bem maior (ver CENTER_WIDEN_OFFSET) - um quadrado unico
// teria que ser grande o bastante para o lado de DENTRO, o que faria o lado
// de FORA alcancar a volta vizinha atraves da propria duna.
var CHECKPOINT_TURN_RATE = 999;   // giro dentro do checkpoint e praticamente instantaneo

var CAMERA_HEIGHT = 146.74;        // altura fixa da camera (+15% a pedido do usuario, era 116)
var CAMERA_BACK_OFFSET = 86.02;    // recuo fixo da camera (+15% a pedido do usuario, era 68 - mesmo angulo, so mais longe)
var CAMERA_FOV = 42;              // campo de visao fixo (zoom nunca muda)
var PLAYER_VISUAL_SCALE = 1.4;    // escala do Axie para aparecer com bom tamanho na tela

var BASE_SPEED = 69.95267578125001; // velocidade de deslize no gelo (-15% de novo a pedido do usuario, era 82.29726562500001)
// Inercia mais forte (aceleracao/freio mais lentos) e curva mais pesada do
// que numa pista comum - e assim que o gelo deve parecer escorregadio: o
// controle da inercia e o coracao do jogo. INERTIA_ACCEL escala JUNTO com
// BASE_SPEED (mesma proporcao de antes) para o tempo ate atingir
// velocidade maxima continuar o mesmo - so RECEBER MAIS RAPIDO nao bastava,
// sem isso o "spin-up" ficava cada vez mais lento a cada aumento de
// velocidade, contra o pedido de sensacao "rapida, fluida e continua".
var INERTIA_ACCEL = 78.3009375;    // aceleracao/desaceleracao no gelo (mesma proporcao de BASE_SPEED de antes)
var TURN_RATE = 2.4;              // velocidade maxima de curva no gelo (-28.5% de novo a pedido do usuario, era 3.36 - vira MENOS AINDA/mais pesado, sem mexer na velocidade nem no slide)
// FREE_SPEED e um valor FIXO (nao mais "BASE_SPEED * 0.85") - o usuario
// pediu explicitamente para manter a velocidade dentro dos checkpoints
// mesmo aumentando a da trilha; se continuasse como formula, cresceria
// junto com BASE_SPEED. O valor abaixo e exatamente o mesmo de antes deste
// aumento (60.75 * 0.85), so que agora congelado.
var FREE_SPEED = 51.6375;         // velocidade dentro do checkpoint (fixa - nao acompanha mais BASE_SPEED)

var DASH_MULTIPLIER = 3.5;
// Dash agora e um impulso de DISTANCIA FIXA (DASH_MAX_DISTANCE, ver mais
// abaixo): velocidade constante DASH_SPEED ate percorrer exatamente essa
// distancia, e ao terminar a velocidade VOLTA IMEDIATAMENTE ao normal (ver
// updatePlayerMovement). DASH_DURATION 0.25s (era 0.6) so define o tamanho
// do impulso (distancia = velocidade x duracao ~ 61 unidades) - a mesma
// distancia em qualquer lugar (gelo ou checkpoint), sem "carregar" a
// velocidade do dash depois.
var DASH_DURATION = 0.25;
var TELEPORT_DISTANCE = 19.5;     // reduzido em 25% (era 26)
var TELEPORT_STEP = 1.0;          // resolucao do "varredura" do teleporte contra paredes (ver executeTeleport)

// ============================================================================
// SISTEMA UNIFICADO DE MIRA (Empurrar/F, Dash/E, Teleporte/G) - pedido
// explicito do usuario: as 3 skills direcionais agora mostram uma HUD
// VERMELHA obrigatoria no chao/mundo enquanto miram, e sao confirmadas do
// MESMO jeito nas duas plataformas:
//   PC:     tecla arma a mira (mostra a HUD) + clique do mouse confirma a
//           direcao (do Axie ate o ponto clicado no chao, raycast de
//           verdade em 3D - ver groundPointFromEvent/onCanvasMouseDown).
//   Mobile: tocar e SEGURAR o botao da skill arma a mira, arrastar o dedo
//           escolhe a direcao (mesma convencao tela->mundo do joystick,
//           ver setupJoystick/computeDesiredInput: dx da tela vira dirX do
//           mundo, dy da tela vira dirZ do mundo, sem raycast nem inverter),
//           soltar confirma (ver setupAimMobileButton).
// G.aimMode guarda qual das 3 esta armada agora (null = nenhuma). Ver
// armAim/cancelAim/confirmAimWithDirection/updateAimHud/updateAimTimeout
// logo antes da secao HABILIDADES.
// ============================================================================
var AIM_TIMEOUT = 6;              // cancela a mira sozinha se ninguem confirmar em X segundos (as 3 skills)
var AIM_HUD_COLOR = 0xFF3232;     // vermelho obrigatorio da HUD de mira (pedido do usuario), igual pras 3

// EMPURRAR (F) substitui o Stun - pedido do usuario. E uma skill de MIRA
// (nao dispara automatico na frente atual): aperta F (PC) ou toca+arrasta o
// botao (mobile) pra escolher a direcao, solta/clica pra confirmar (ver
// useAbilityF, executePush, onCanvasMouseDown, setupAimMobileButton).
// PUSH_RANGE aumentado 12x (pedido explicito do usuario: "3 unidades
// estava curto demais... aumente para cerca de 12x, ~36 unidades") - o
// cone continua 120° (PUSH_ANGLE_DEG inalterado). A deteccao em
// executePush usa essa MESMA constante (funcao inCone: "dist > PUSH_RANGE"
// -> fora) e a HUD (buildPushHudMesh) tambem usa essa MESMA constante como
// raio do leque vermelho - nao existe um "range escondido" menor: as duas
// coisas leem exatamente o mesmo numero, entao mudar aqui move as duas
// juntas automaticamente.
// Pedido explicito do usuario nesta rodada: "nao mexa no range atual do
// Empurrar" - PUSH_RANGE fica igual (36). So o EMPURRAO (distancia que o
// alvo e arremessado) dobra.
var PUSH_RANGE = 36;
var PUSH_ANGLE_DEG = 120;         // abertura TOTAL do cone (60 graus pra cada lado da direcao mirada)
var PUSH_HALF_ANGLE_COS = Math.cos((PUSH_ANGLE_DEG / 2) * Math.PI / 180);
// Empurrao DOBRADO nesta rodada (pedido explicito do usuario: "dobre a
// distancia do empurrao nos inimigos/mobs moveis e players") - era
// PUSH_RANGE*0.4 (~14.4), agora PUSH_RANGE*0.8 (~28.8).
var PUSH_KNOCKBACK = PUSH_RANGE * 0.8;
// SLOW nos alvos empurrados, alem do empurrao - pedido explicito do usuario
// ("Aplicar tambem SLOW nos alvos empurrados, nao causa dano letal"). Nao
// especificou intensidade/duracao exatas - valores escolhidos pra dar um
// respiro tatico de verdade sem travar o alvo por tempo longo demais.
var PUSH_SLOW_MULTIPLIER = 0.5;   // velocidade do alvo cai pela metade...
var PUSH_SLOW_DURATION = 2;       // ...por 2 segundos apos ser empurrado
// Pedido explicito do usuario nesta rodada: o alvo empurrado NUNCA pode
// atravessar parede/sair da trilha - se o empurrao for na direcao de uma
// parede, o alvo desliza ate ela, COLIDE e para ali (nunca continua alem).
// Isso e resolvido reusando moveWithCollision (a MESMA varredura passo a
// passo que o jogador/dash ja usam - ver moveWithCollision) em vez de
// somar o vetor de empurrao direto na posicao, que podia "pular" pra fora
// da trilha em deslocamentos grandes (empurrao agora e quase 29 unidades,
// bem maior que a espessura de qualquer parede).
// PUSH_WALL_STOP_EPS: se a distancia realmente percorrida ficar mais que
// isso abaixo do empurrao pretendido, e porque bateu numa parede de
// verdade no caminho (nao so arredondamento de ponto flutuante).
// PUSH_WALL_STUN_DURATION: "mini stun" (pedido do usuario) - trava o
// movimento do alvo por um instante breve ao bater. Pros lobos, reusa o
// mesmo campo "pausedUntil" que ja existe pra pausa natural entre
// travessias (ver updateCentipedes); pros bots (aliados/inimigos), um
// campo novo "stunnedUntil" (ver createTeamBot/updateTeamBot).
var PUSH_WALL_STOP_EPS = 1.5;
var PUSH_WALL_STUN_DURATION = 0.6;

// DASH (E) agora e DIRECIONAL (pedido do usuario) - mesma mira das outras
// duas, HUD = "coluna" vermelha 3D reta do Axie ate a distancia maxima do
// dash. DASH_MAX_DISTANCE e AO MESMO TEMPO o comprimento da HUD e a
// distancia REAL do impulso: updatePlayerMovement percorre exatamente essa
// distancia a DASH_SPEED constante (contador G.dashRemaining) e para -
// nao existe mais rampa de inercia nem velocidade "sobrando" depois, entao
// HUD e dash de verdade sao o mesmo numero em qualquer lugar do mapa.
var DASH_SPEED = BASE_SPEED * DASH_MULTIPLIER;
var DASH_MAX_DISTANCE = DASH_SPEED * DASH_DURATION;
var DASH_HUD_WIDTH = 2.4;         // largura da coluna
var DASH_HUD_HEIGHT = 4.2;        // altura aproximada do Axie

// TELEPORTE (G) agora mostra a HUD = CIRCULO vermelho no ponto EXATO onde o
// Axie vai aparecer - calculado com o MESMO sweepTeleport usado na hora de
// confirmar (ver updateAimHud), entao o jogador ve o destino de verdade
// (ja considerando paredes no caminho), nunca so a direcao crua.
var TELEPORT_HUD_RADIUS = 2.6;

// ============================================================================
// DIFERENCIACAO POR CLASSE (pedido do usuario). Referencia de distancia: o
// range do Teleporte (TELEPORT_DISTANCE = 19.5 unidades).
//   PLANTA (tank): 2 vidas; Invulneravel tambem protege aliados num circulo
//     de 19.5; Empurrar vira "Folhas" (3 cargas, projeteis so em inimigos).
//   BESTA (killer): Empurrar 1.5x mais forte e mini-stun de parede 2x; a
//     Invulneravel vira "Pisao" (area de 19.5: destroi mobs letais e empurra
//     inimigos pra fora, com slow forte).
//   AQUATICA: Dash mais longo; Empurrar vira "Jato de agua" (cone estreito,
//     arremesso maior); a Invulneravel vira "Cuspe de agua" (2 cargas, area
//     de 39 de alcance que TRAVA A CURVA de inimigos).
// ============================================================================
var PLAYER_RADIUS = 2.0;         // hitbox do Axie (raio)
var LIVES_PLANT = 2;
var LIFE_REGEN_SECONDS = 15;     // sobreviver 15s sem dano devolve a 2a vida
var LIFE_HIT_IFRAME = 1.0;       // resguardo curto depois de gastar uma vida
var INVULN_AREA_RADIUS = TELEPORT_DISTANCE * 2;   // Planta: aliados nesse raio tambem ficam invulneraveis (DOBRO do raio anterior: 19.5 -> 39)
var STOMP_RADIUS = TELEPORT_DISTANCE * 1.5;   // Besta: Pisao (area +50%: era 19.5, agora 29.25)
var STOMP_KNOCKBACK = 30;
var STOMP_SLOW_FACTOR = 0.3;                  // slow FORTE (30% da velocidade)...
var STOMP_SLOW_DURATION = 3;                  // ...por 3 segundos
var LEAF_CHARGES = 3;
var LEAF_RECHARGE = 6;           // segundos pra recuperar cada carga
var LEAF_CAST_GAP = 0.35;        // intervalo minimo entre dois disparos
var LEAF_SPEED = 170;            // projeteis rapidos
var LEAF_RANGE = 128;            // DOBRO da distancia anterior (era 64)
var LEAF_SIZE_MULT = 4.5;         // tamanho do projetil (folha): era 6x, reduzido em 25% (pedido do usuario)
var LEAF_RADIUS = 0.8 * LEAF_SIZE_MULT;  // raio do cone (visual = area de acerto)
var LEAF_HIT_RADIUS = PLAYER_RADIUS + LEAF_RADIUS;
var JET_PROJ_RADIUS = PLAYER_RADIUS;    // Jato: projetil com DIAMETRO ~ hitbox do Axie
var JET_PROJ_SPEED = 150;
var JET_PROJ_COUNT = 1;             // 1 projetil por lancamento (o 'dobrar' pedido era o numero de CARGAS)
var JET_CHARGES = 4;               // Jato de agua: 4 cargas (era 1 lancamento por cooldown)
var JET_LATERAL = JET_PROJ_RADIUS * 1.3;  // afastamento lateral de cada projetil
var LEAF_STACK_TIMEOUT = 6;      // sem novo acerto nesse tempo, os acumulos zeram
var LEAF_SLOW_DURATION = 3;
var LEAF_SLOW_FACTORS = [0.85, 0.70]; // 1o acerto: slow 15%; 2o: 30% no total
var LEAF_ROOT_DURATION = 1.5;    // 3o acerto: prende no lugar
var BEAST_PUSH_MULT = 1.5;       // empurrao 1.5x mais forte
var BEAST_STUN_MULT = 2;         // mini-stun de parede 2x maior
var AQUA_DASH_MULT = 1.3;        // Dash "um pouco" mais longo
var JET_ANGLE_DEG = 40;          // Jato de agua: cone bem mais estreito (normal = 120)
var JET_KNOCK_MULT = 1.6;        // arremessa mais longe que o empurrao padrao
var JET_RANGE_MULT = 3;        // Jato de agua: alcance 36 -> 54 (+50%) -> 108 (dobrado; a HUD e o golpe leem prof.range, mesmo numero)
var SPIT_RANGE = TELEPORT_DISTANCE * 8;       // Cuspe: DOBRO de novo (39 -> 78 -> 156)
var SPIT_RADIUS = PLAYER_RADIUS * 4;          // area = 4x a hitbox do Axie
var SPIT_CHARGES = 2;
var SPIT_RECHARGE = 10;
var SPIT_CAST_GAP = 0.5;
var SPIT_ZONE_DURATION = 4; // a area do Cuspe fica ATIVA por 4s (afeta quem esta OU ENTRA nela)
var SPIT_SLIP_MIN = 0.9; // giro/escorregao visivel por pelo menos isso (o Axie cruza a area em ~0.3s a 70 u/s)
var SPIT_RECOVER_TIME = 1.2; // depois do escorregao: volta de 25% a 100% da velocidade nesse tempo
var SPIT_SLIP_MAX = 4;   // teto do escorregao (normalmente acaba antes: sair da area encerra)

// Nomes das skills por classe (slot F e slot H) - ver applyClassSlotLabels.
var CLASS_SKILL_KEYS = {
  plant: { f: 'skill.leaves', g: 'skill.invuln' },
  beast: { f: 'skill.push', g: 'skill.stomp' },
  aqua: { f: 'skill.jet', g: 'skill.spit' }
};
var CLASS_SKILL_MOBILE_KEYS = {
  plant: { f: 'skill.m.leaves', g: 'skill.m.invuln' },
  beast: { f: 'skill.m.push', g: 'skill.m.stomp' },
  aqua: { f: 'skill.m.jet', g: 'skill.m.spit' }
};
// Nomes traduzidos (idioma atual) dos slots F e H da classe; a versao "mobile" e mais curta.
function classSkillNames(cls) {
  var k = CLASS_SKILL_KEYS[cls] || CLASS_SKILL_KEYS.beast;
  return { f: TXT(k.f), g: TXT(k.g) };
}
function classSkillMobileNames(cls) {
  var k = CLASS_SKILL_MOBILE_KEYS[cls] || CLASS_SKILL_MOBILE_KEYS.beast;
  return { f: TXT(k.f), g: TXT(k.g) };
}

var INVULN_DURATION = 5 * 0.85;   // Planta: duracao -15% (vale tambem pros aliados afetados)
var PLANT_INVULN_CD_MULT = 1.15;   // Planta: cooldown +15%

var COOLDOWNS = { q: 8, e: 5, f: 10, g: 15, r: 3 };

/* ====================== TIMES / CONGELADO / SALVAMENTO ====================== */
// Base do sistema hibrido de times pedido pelo usuario: quando o Axie
// "morre", em vez de respawnar na hora, ele fica CONGELADO/CAIDO no lugar
// por ate FREEZE_DURATION segundos. Sai desse estado de 3 formas: um
// ALIADO chega perto o bastante (SAVE_RANGE) e salva (fica no MESMO lugar,
// so com um pequeno i-frame), o proprio jogador aperta R (respawn manual
// no ultimo checkpoint, sem esperar o tempo todo), ou o tempo esgota
// (respawn OBRIGATORIO no ultimo checkpoint). Um INIMIGO perto o bastante
// (ENEMY_BLOCK_RANGE) atrapalha/bloqueia o salvamento do aliado.
var FREEZE_DURATION = 15;       // segundos congelado antes do respawn obrigatorio
var SAVE_RANGE = 14;            // distancia pra um aliado conseguir salvar
var ENEMY_BLOCK_RANGE = 16;     // um inimigo dentro dessa distancia atrapalha o salvamento
var SAVE_PING_DURATION = 4;     // quanto tempo o "pedido de socorro" (tecla T) fica visivel
// I-frame ao ser SALVO POR ALIADO (pedido explicito do usuario: "tempo
// extra de invulnerabilidade breve, 1 a 1.5s") - o jogador continua
// EXATAMENTE onde estava (nao teleporta), entao pode ainda estar cercado
// pelo mesmo perigo que o matou; sem esse i-frame maior, corria risco real
// de morrer nA HORA de novo, antes de conseguir reagir.
var ALLY_SAVE_IFRAME = 1.5;
// I-frame bem menor pro respawn MANUAL (R) e pro respawn OBRIGATORIO
// (timeout) - os dois TELEPORTAM o jogador pro ultimo checkpoint, que ja e
// uma zona sem perigo por design (isInsideAnyHazardFreeZone) - so um
// resguardo minimo contra timing de frame, nao precisa do bonus grande do
// salvamento por aliado (pedido do usuario: "NÃO mexa no tempo de freeze/
// respawn obrigatorio" - a duracao do freeze continua igual, so o i-frame
// de respawn que fica diferenciado do salvamento).
var RESPAWN_IFRAME = 0.3;

// Catch-up de cooldown (Dash/Teleporte) pra quem esta MUITO atras do lider
// geral da partida (jogador + aliados + inimigos, todo mundo conta pro
// "lider"): reduz o cooldown em ate 20% quando a diferenca de checkpoints
// alcancados e MAIOR que 1 - corta de volta ao cooldown padrao assim que a
// diferenca cai pra 1 ou menos (ver catchupCooldownMultiplier).
var CATCHUP_GAP_THRESHOLD = 1;
var CATCHUP_COOLDOWN_REDUCTION = 0.2; // ate 20% de reducao

// PLAYER_RADIUS (hitbox do Axie) e declarado mais acima, junto das constantes
// de classe (usado por LEAF_HIT_RADIUS/SPIT_RADIUS).
var MOUSE_ARRIVAL_DIST = 2.0;     // distancia para considerar que o clique-do-mouse "chegou" ao destino

// Padrao de movimento dos lobos: a largura da trilha e dividida em
// HAZARD_LATERAL_ZONES fatias iguais (borda, meio-caminho, centro, etc) e o
// lobo mira sempre numa fatia DIFERENTE da ultima visitada (nunca repete a
// fatia imediatamente anterior) - isso GARANTE cobertura real de toda a
// largura, incluindo as bordas, em vez de so ter uma CHANCE de chegar la
// (o jogador relatou que ainda dava pra "decorar" corredores seguros perto
// das laterais com a versao anterior, baseada so em probabilidade). A
// ORDEM de visita continua sorteada (nunca a mesma sequencia fixa), entao
// continua imprevisivel - so a cobertura das fatias e que virou garantida.
// CENTIPEDE_TILT_MAX e o quanto cada travessia pode se inclinar em direcao
// ao comprimento da trilha (eixo U) - existe, mas fica sempre secundario ao
// cruzamento lateral. CENTIPEDE_WANDER_RATE e um jitter aleatorio por cima
// da mira, pra reduzir ao maximo qualquer padrao previsivel.
var CENTIPEDE_WANDER_RATE = 2.4;      // jitter aleatorio por cima da mira (bem mais alto - movimento menos previsivel)
var CENTIPEDE_STEER_RATE = 3.4;       // velocidade com que o lobo gira o rumo em direcao a mira atual (mais decisivo)
var CENTIPEDE_TILT_MAX = 0.55;        // inclinacao maxima (radianos, ~31 graus) da travessia lateral em direcao ao comprimento da trilha
var CENTIPEDE_REACH_TOLERANCE = 1.5;  // o quanto perto da mira (V) conta como "chegou", pra escolher a proxima
// Voltou pro valor original a pedido do usuario (a pausa de ate 4s NAO era
// a causa do travamento reportado - o usuario esperou mais que isso e
// continuou travado). A causa real era outra (ver findSafeUOffset/uMin/
// uMax em createHazards) - corrigida la, nao aqui.
var CENTIPEDE_PAUSE_CHANCE = 0.4;     // chance de parar um pouco ao terminar uma travessia
var CENTIPEDE_PAUSE_MAX = 4;          // pausa maxima (segundos) - sorteada entre 0 e este valor

// Numero de fatias em que a LARGURA da trilha e dividida, tanto para a mira
// de travessia dos lobos quanto para o posicionamento das estalagmites (ver
// HAZARD_LATERAL_ZONE_RANGE) - usado pelas duas coisas pra garantir que
// nenhuma faixa da largura (nem perto do centro nem perto de nenhuma das
// duas bordas) fique sem cobertura.
var HAZARD_LATERAL_ZONES = 4;

// Usado por pickCentipedeTargetV pra nunca escolher uma mira que caia perto
// demais de QUALQUER barreira (ver comentario la) - PRECISA ser maior que o
// raio fisico da barreira (DUNE_BASE_WIDTH/2=7) + a folga da reacao de
// bater-e-virar em updateCentipedes (1.5) = 8.5 no pior caso, senao a mira
// escolhida ainda cai DENTRO do raio de reacao fisica e o lobo fica batendo
// e virando pra sempre tentando alcanca-la (bug medido: lobo travado 14.8s
// de 15s simulados, com folga de so 3 unidades).
var BARRIER_WOLF_BUFFER = 12;

// Escala de tamanho (visual + raio de COLISAO, sempre juntos, pra um nao
// ficar desproporcional ao outro) de cada tipo de perigo - agora SEPARADA
// entre obstaculo estatico (estalagmite/cristal, nao se move) e lobo (se
// move), a pedido do usuario: so os estaticos cresceram mais 15% nesta
// rodada, os lobos ficam exatamente do tamanho que ja estavam.
var OBSTACLE_SIZE_SCALE = 1.45475;
var WOLF_SIZE_SCALE = 1.265;
var WOLF_VISUAL_TALL = 1.6;      // lobos 60% mais ALTOS so no visual (hitbox inalterada)
var OBSTACLE_VISUAL_TALL = 1.5;  // estalagmites 50% mais ALTAS so no visual (hitbox inalterada)

// Pedido explicito do usuario: obstaculos/barreiras NUNCA podem fechar a
// trilha por completo - precisa sempre sobrar passagem jogavel. Duas regras
// novas, aplicadas em createHazards:
// 1) OBSTACLE_MIN_GAP: folga MINIMA obrigatoria (borda a borda, nao centro a
//    centro) entre um obstaculo estatico e outro no nascimento - alem de
//    nunca poderem se sobrepor (ver tooCloseToOtherObstacle abaixo, que soma
//    os dois raios MAIS essa folga).
// 2) HAZARD_CENTER_SAFE_HALF: uma faixa central (em torno de v=0, o meio de
//    verdade da trilha) que fica SEMPRE livre de barreira e de obstaculo
//    estatico, em QUALQUER "u" ao longo do trecho. Isso e o que garante de
//    forma absoluta (nao so provavel) que nenhuma combinacao de barreira +
//    obstaculos lado a lado consegue somar 100% da largura - sempre sobra
//    pelo menos essa faixa central aberta. Largura (2x o valor, pois e um
//    "half") folgada o bastante pro jogador (PLAYER_RADIUS*2=4) passar com
//    espaco de manobra de sobra.
// OBSTACLE_RADIUS: raio de COLISAO de toda estalagmite estatica (mesmo
// valor usado em spawnStalagmiteAt/tooCloseToOtherObstacle) - existe como
// constante nomeada porque BUG REAL encontrado e corrigido aqui (a trilha
// "fechou 100% de novo" depois da rodada anterior): os dois pontos de
// checagem contra HAZARD_CENTER_SAFE_HALF (nas duas estalagmites, normal e
// de borda) comparavam so o CENTRO do obstaculo contra a faixa central,
// sem somar o proprio raio - um obstaculo podia nascer com o centro bem
// colado na borda da faixa (permitido pela checagem antiga) mas o CORPO
// dele (raio ~2.9) ainda invadia bem fundo a faixa que deveria ficar
// sempre livre. Com dois obstaculos assim, um de cada lado, a faixa
// central que sobrava de verdade podia cair pra ~2 unidades (menos que o
// diametro do jogador, PLAYER_RADIUS*2=4) em vez das 8 pretendidas -
// perto o bastante de fechar de vez com qualquer coisa a mais por perto
// (barreira, outro obstaculo). Agora as duas checagens somam
// OBSTACLE_RADIUS ao limite, garantindo que o CORPO do obstaculo (nao so o
// centro) nunca cruza a fronteira da faixa central.
var OBSTACLE_MIN_GAP = 2;
var HAZARD_CENTER_SAFE_HALF = 5; // +1 de folga extra nesta rodada, em cima do fix do raio
var OBSTACLE_RADIUS = 2.0 * OBSTACLE_SIZE_SCALE;

// Devolve [min,max] (coordenadas V ABSOLUTAS, ja dentro de [vMin,vMax]) da
// fatia lateral "zone" (0 = lado de FORA/borda, HAZARD_LATERAL_ZONES-1 =
// lado de DENTRO/outra borda). vMin/vMax vem de legLateralBounds - podem
// ser bem assimetricos (ver comentario la), entao a fatia NAO pode mais
// ser calculada como fracao simetrica de um unico vHalf.
function hazardLateralZoneRange(zone, vMin, vMax) {
  var step = (vMax - vMin) / HAZARD_LATERAL_ZONES;
  return [vMin + step * zone, vMin + step * (zone + 1)];
}

// Sorteia a proxima posicao V (largura da trilha) que um lobo vai
// perseguir: uma fatia lateral diferente da ultima (cent.lastZone), pra
// garantir cobertura real da largura toda ao longo do tempo, com um pouco
// de jitter dentro da propria fatia.
function centipedeVIsSafe(cent, v) {
  var wx = cent.segStartX + cent.ux * cent.u + cent.nx * v;
  var wz = cent.segStartZ + cent.uz * cent.u + cent.nz * v;
  var bb;
  for (bb = 0; bb < G.barrierObstacles.length; bb++) {
    var bar = G.barrierObstacles[bb];
    if (pointToSegmentDistance(wx, wz, bar.ax, bar.az, bar.bx, bar.bz) < bar.radius + BARRIER_WOLF_BUFFER) {
      return false;
    }
  }
  return true;
}

function shuffledIndices(n) {
  var arr = [];
  var k;
  for (k = 0; k < n; k++) { arr.push(k); }
  for (k = arr.length - 1; k > 0; k--) {
    var j = Math.floor(Math.random() * (k + 1));
    var tmp = arr[k]; arr[k] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

// Sorteia a proxima posicao V (largura da trilha) que um lobo vai
// perseguir: uma fatia lateral diferente da ultima (cent.lastZone), pra
// garantir cobertura real da largura toda ao longo do tempo. O bin de
// vMin/vMax (ver wolfVBoundsAtU) ja e a largura JOGAVEL de verdade daquele
// pedaco da trilha, bem mais perto da parede real do que antes (nao mais
// encolhida pra sempre excluir o lado de uma barreira - isso deixava
// faixas inteiras da trilha, longe de qualquer barreira, inalcancaveis
// pros lobos, bug reportado pelo usuario). Alem disso, cada candidato e
// testado contra a posicao REAL
// (mundo) de TODAS as barreiras do mapa (nao so as da propria trilha - um
// lobo perto de uma quina pode ficar fisicamente perto de uma barreira da
// trilha VIZINHA tambem). A VARREDURA e DETERMINISTICA (sub-amostras
// igualmente espacadas, embaralhadas so na ORDEM de teste) em vez de pontos
// aleatorios soltos - com pontos aleatorios, algumas legs com varias
// barreiras perto uma da outra podiam fazer as poucas tentativas (por
// sorte) errarem a faixa livre (que podia ser bem estreita) TODA VEZ,
// fazendo o lobo "desistir" (mirar a propria posicao atual) e travar ali
// pra sempre - bug medido: lobo parado quase 24s seguidos.
function pickCentipedeTargetV(cent) {
  // O alcance lateral de verdade depende de ONDE ao longo da trilha o lobo
  // esta AGORA (ver wolfLateralBounds/wolfVBoundsAtU) - pernas longas tem
  // varios bins, cada um com seu proprio vMin/vMax.
  var vb = wolfVBoundsAtU(cent.vBins, cent.u);
  var zonePool = [];
  var z;
  for (z = 0; z < HAZARD_LATERAL_ZONES; z++) { if (z !== cent.lastZone) { zonePool.push(z); } }
  var zoneOrder = shuffledIndices(zonePool.length);
  var SUB_SAMPLES = 6;
  var zi, si;
  for (zi = 0; zi < zoneOrder.length; zi++) {
    var zone = zonePool[zoneOrder[zi]];
    var range = hazardLateralZoneRange(zone, vb.vMin, vb.vMax);
    var subOrder = shuffledIndices(SUB_SAMPLES);
    for (si = 0; si < subOrder.length; si++) {
      var v = range[0] + (range[1] - range[0]) * ((subOrder[si] + 0.5) / SUB_SAMPLES);
      if (centipedeVIsSafe(cent, v)) { cent.lastZone = zone; return v; }
    }
  }

  // Nenhuma das 4 fatias tinha ponto livre (raro, so perto de varias
  // barreiras ao mesmo tempo) - varre a largura JOGAVEL TODA em passos
  // finos antes de desistir.
  var FULL_SAMPLES = 40;
  for (si = 0; si < FULL_SAMPLES; si++) {
    var vFull = vb.vMin + (vb.vMax - vb.vMin) * ((si + 0.5) / FULL_SAMPLES);
    if (centipedeVIsSafe(cent, vFull)) { return vFull; }
  }

  // Realmente sem nenhum ponto livre nesse "u" (nao deveria acontecer) -
  // mira no ponto mais LONGE de qualquer barreira, em vez de mirar a propria
  // posicao atual (isso e o que travava o lobo pra sempre: mirar onde ja
  // esta faz "chegou na mira" disparar de novo no proximo frame, chamando
  // esta funcao de novo, pra sempre, sem o lobo nunca se mexer).
  var bestV = vb.vMin, bestDist = -1;
  for (si = 0; si <= FULL_SAMPLES; si++) {
    var vScan = vb.vMin + (vb.vMax - vb.vMin) * (si / FULL_SAMPLES);
    var wxScan = cent.segStartX + cent.ux * cent.u + cent.nx * vScan;
    var wzScan = cent.segStartZ + cent.uz * cent.u + cent.nz * vScan;
    var minDist = Infinity;
    var bb;
    for (bb = 0; bb < G.barrierObstacles.length; bb++) {
      var bar = G.barrierObstacles[bb];
      var d = pointToSegmentDistance(wxScan, wzScan, bar.ax, bar.az, bar.bx, bar.bz) - bar.radius;
      if (d < minDist) { minDist = d; }
    }
    if (G.barrierObstacles.length === 0) { minDist = Infinity; }
    if (minDist > bestDist) { bestDist = minDist; bestV = vScan; }
  }
  return bestV;
}
var CENTIPEDE_TRAIL_SPACING = 5;  // frames de atraso entre cada segmento do corpo
var CENTIPEDE_AGGRO_RADIUS = 55;  // raio (em coordenadas locais do corredor) em que a centopeia comeca a perseguir o jogador quando a dificuldade sobe

var DIFFICULTY_PER_CHECKPOINT = 0.08;  // quanto a dificuldade sobe a cada checkpoint alcancado
var DIFFICULTY_MAX = 3.0;              // teto do multiplicador de dificuldade

// Distancia (em unidades do mundo) livre de perigo logo depois de sair de um
// checkpoint e logo antes de entrar no proximo - a ~BASE_SPEED isso da mais
// de 1 segundo de reacao antes do primeiro obstaculo/lobo poder aparecer.
// Escalado junto com o +50% do BASE_SPEED (era 55) para manter esse mesmo
// tempo de reacao de ~1s+ com a pista mais rapida. Escalado de novo junto
// com o +25% do BASE_SPEED (era 82.5) e reduzido de novo junto com o -15%
// mais recente do BASE_SPEED (era 103.125).
var REACTION_BUFFER = 87.65625;

/* ============================ ESTADO GLOBAL ============================= */

var G = {
  scene: null,
  camera: null,
  renderer: null,
  clock: null,
  raycaster: null,
  groundPlane: null,

  corners: [],           // quinas da espiral: {x,z} (indice 0 = ponto inicial)
  checkpoints: [],        // {x,z,index,reached,loopIndex}
  startPosition: { x: 0, z: 0 },
  startZone: null, // {xMin,xMax,zMin,zMax} - ver createStartArea/computeCheckpointZone

  wallSegments: [],       // colisores solidos: {ax,az,bx,bz,radius} (dunas, bordas, mini-oasis)
  staticObstacles: [],    // {x,z,radius} - letais
  barrierObstacles: [],   // {ax,az,bx,bz,radius} - perigo tipo "parede curta", letal (ver checkCollisions)
  centipedes: [],         // ver createHazards() para a estrutura completa

  player: {
    group: null,
    position: null,   // THREE.Vector3
    heading: 0,
    currentSpeed: 0,
    inOasisIndex: -2,
    // Classe escolhida ('plant'|'beast'|'aqua') e status vindos de skills
    // (ver applySlow/applySteerLock/applyLeafHit): slow, preso, curva travada.
    cls: 'beast',
    lives: 1,
    lifeTimer: 0, // segundos sem dano acumulados (Planta recupera a 2a vida em 15s)
    slowUntil: 0, slowFactor: 1,
    rootUntil: 0,
    steerLockUntil: 0,
    leafStacks: 0, leafExpire: 0,
    name: 'Player',
    // Base do sistema de times (ver secao TIMES/CONGELADO acima): o
    // jogador local sempre e do 'teamA'. state controla o ciclo
    // racing -> frozen -> racing (salvo/respawn) -> ... -> finished (ao
    // alcancar o ultimo checkpoint).
    team: 'teamA',
    state: 'racing', // 'racing' | 'frozen' (chegar ao final NAO muda o estado - ver reachedEnd)
    reachedEnd: false, // ja entrou no ponto FINAL (conta pra vitoria do time, mas segue jogando normal)
    frozenUntil: 0,
    savePingUntil: 0
  },

  // Bots BASE dos times (sem rede de verdade ainda - "hibrido": o jogador
  // local e o unico humano, aliados/inimigos sao IA simples que percorrem a
  // mesma rota de quinas do mapa, so pra dar corpo real ao sistema de
  // times/salvamento/catch-up). Ver createTeamBots/updateTeamBots.
  // G.slots e a base do modo 2x2 (4 vagas, 2 por time) - ver comentario
  // completo em createTeamBots sobre o que falta pra virar rede de verdade.
  allies: [],
  enemies: [],
  slots: [],
  matchWinner: null, // null | 'teamA' | 'teamB'
  playerClass: null, // 'plant' | 'beast' | 'aqua' (escolhido na selecao de personagem)
  playerName: 'Player',
  botNameCounter: 0,
  // Cargas de skills (Folhas da Planta = f, Cuspe da Aquatica = g) - ver chargeMax
  charges: { f: 0, g: 0 },
  chargeTimer: { f: 0, g: 0 },
  projectiles: [], // folhas em voo (ver executeLeaves/updateProjectiles)
  nameplates: [],
  rescueNext: 0,
  legPaths: {}, // caminho de cada perna da rota (ver botLegPath)
  wallGrid: null, wallGridCount: 0,
  aimDist: null,
  paused: false, // ESC no Single Player - congela a simulacao inteira (ver animate)
  countdownLeft: 0, // segundos restantes do 3-2-1 inicial (>0 = simulacao congelada)

  lastCheckpointIndex: -1,
  totalCheckpoints: 0,
  difficultyMultiplier: 1,

  keys: {},
  mouse: { down: false, targetActive: false, targetX: 0, targetZ: 0 },
  joystick: { active: false, dx: 0, dy: 0 },

  // Sistema unificado de mira das 3 skills direcionais (ver comentario
  // grande perto de AIM_TIMEOUT) - aimMode fica null (nenhuma mira ativa)
  // ou 'push'|'dash'|'teleport' entre apertar a tecla/segurar o botao e
  // confirmar a direcao. aimUntil cancela sozinho por timeout (ver
  // updateAimTimeout). aimDirX/Z guardam a direcao mirada ATUAL (unitaria),
  // atualizada continuamente pelo mouse (PC, ver onCanvasMouseMove) ou pelo
  // arrasto do dedo (mobile, ver setupAimMobileButton) enquanto mira -
  // updateAimHud() usa isso a cada frame pra reposicionar/girar a HUD.
  // aimHud e o THREE.Group da HUD vermelha atual (ou null se nenhuma mira
  // ativa). Enquanto mirando, um clique/toque no canvas NAO move o
  // personagem (ver onCanvasMouseDown).
  aimMode: null,
  aimUntil: 0,
  aimDirX: 0,
  aimDirZ: 1,
  aimHud: null,

  abilities: { q: 0, e: 0, f: 0, g: 0, r: 0 },
  dashRemaining: 0, // distancia que ainda falta percorrer do dash atual (0 = sem dash) - ver updatePlayerMovement/executeDash
  invulnUntil: 0,

  totalTime: 0,

  // Feedback visual (checkpoint/congelado/respawn) - ver triggerCheckpointFeedback,
  // triggerFreezeFeedback e spawnEffectBurst.
  cameraShakeUntil: 0,
  effectBursts: [], // {mesh, mat, startTime} - aneis temporarios que crescem e somem
  spitZones: [], // pocas do Cuspe ativas {x,z,r,until,team} (ver updateSpitZones)
  helpAlerts: [], // alertas de socorro no minimapa {m, start, pinged} (ver triggerHelpAlert)
  fxList: [], // efeitos animados {start, dur, update(k), done()} (jato, raizes...)
  checkpointGroundVisuals: {}, // {indiceDaQuina: {mesh, mat}} - ver createTrackVisuals/createCheckpoints

  // Offset de look-ahead da camera (ver updateCameraFollow), suavizado
  // frame a frame - comeca em 0 (sem deslocamento) ate o jogador se mover.
  cameraLookaheadX: 0,
  cameraLookaheadZ: 0
};

var messageTimeoutHandle = null;

/* ======================= UTILITARIOS MATEMATICOS ========================= */

function clampNum(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(maxValue, value));
}

function normalizeAngle(angle) {
  var a = angle;
  while (a > Math.PI) { a -= Math.PI * 2; }
  while (a < -Math.PI) { a += Math.PI * 2; }
  return a;
}

function lerpNum(a, b, t) {
  return a + (b - a) * t;
}

// Largura da pista na quina "i": mais larga na volta mais externa (loop 0) e
// afinando levemente a cada volta em direcao ao centro - exceto a partir de
// TRACK_WIDEN_FROM_CORNER, onde a trilha volta a alargar (TRACK_WIDEN_FACTOR
// vezes mais larga) pra aproveitar o espaco vago perto do centro do mapa.
function trackWidthAtCornerIndex(i) {
  var loop = Math.floor(i / 4);
  var t = clampNum(loop / TURNS, 0, 1);
  var w = lerpNum(TRACK_WIDTH_START, TRACK_WIDTH_END, t);
  if (i >= TRACK_WIDEN_FROM_CORNER) { w *= TRACK_WIDEN_FACTOR; }
  return w;
}

// Margem sem duna ao redor da quina "i" (o quanto o colisor/duna fica
// afastado do centro da quina). O inicio do mapa usa uma margem bem maior
// (baseada em START_RADIUS) porque a area livre inicial e maior que um
// oasis comum - sem isso a duna do primeiro trecho invadiria a propria
// area inicial. A partir de TRACK_WIDEN_FROM_CORNER a margem tambem cresce
// (mesmo fator das trilhas), para o checkpoint continuar ocupando a quina
// inteira mesmo com a trilha mais larga.
function trimForCorner(i) {
  if (i === 0) { return START_TRIM; }
  return i >= TRACK_WIDEN_FROM_CORNER ? CORNER_TRIM * TRIM_WIDEN_FACTOR : CORNER_TRIM;
}

// Distancia (perpendicular a direcao do trecho) da parede do lado de DENTRO
// do trecho reto "i" (corners[i] -> corners[i+1]). Para quase todo trecho,
// esse lado e coberto pela duna de FORA da proxima volta, mais interna
// (createDuneWalls), entao a distancia e a mesma de sempre (DUNE_OFFSET) -
// so os trechos da ULTIMA volta (createInnerCap) usam a distancia alargada
// (CENTER_WIDEN_OFFSET), ja que sao os unicos sem uma volta mais interna
// ocupando aquele espaco (ver CENTER_WIDEN_OFFSET).
function innerOffsetForLeg(i) {
  if (i >= CENTER_WIDEN_FROM_LEG && CENTER_WIDEN_OFFSET_BY_LEG.hasOwnProperty(i)) {
    return CENTER_WIDEN_OFFSET_BY_LEG[i];
  }
  return DUNE_OFFSET;
}

// Zona jogavel/de deteccao da quina "i", como um RETANGULO (nao mais um
// quadrado unico) em coordenadas absolutas {xMin,xMax,zMin,zMax}. Antes,
// bastava um unico halfSize porque os dois lados de qualquer trecho ficavam
// sempre na mesma distancia (DUNE_OFFSET). Agora que a ULTIMA volta tem o
// lado de FORA em DUNE_OFFSET mas o lado de DENTRO bem mais afastado
// (CENTER_WIDEN_OFFSET, ver innerOffsetForLeg), um quadrado unico teria que
// escolher entre pequeno demais (sobra fresta no lado de dentro, mais largo)
// ou grande demais (o lado de FORA passaria a alcancar a volta VIZINHA
// atraves da propria duna, ativando o checkpoint so por proximidade, sem o
// jogador nunca ter de fato entrado no corredor certo). Cada um dos ate 2
// trechos abertos da quina (o de chegada e o de saida) e sempre
// perpendicular ao outro (toda quina da espiral e um angulo reto) - por
// isso cada trecho so contribui para o eixo PERPENDICULAR a propria direcao
// (largura do corredor daquele trecho), nunca para os dois.
// Aumentado de 2 para 8 a pedido do usuario: no encontro dos dois lados
// ABERTOS de uma quina normal (2 pernas), as paredes de cada corredor tem
// seu proprio raio de colisao CIRCULAR e nunca se tocam exatamente no
// canto, deixando um vao diagonal pequeno mas real bem ali (confirmado com
// o teste de alcancabilidade de verdade contra resolveWallCollisions - o
// checkpoint ficava PULAVEL). Em vez de fechar esse vao com um colisor
// extra (pilar), a zona de DETECCAO do proprio checkpoint (esta funcao) e
// que foi alargada o bastante pra cobrir o vao inteiro - o jogador so
// precisa PASSAR por ali pra contar como "alcancado", entao alargar a
// deteccao resolve sem precisar de nenhuma parede nova. Medido: 5 unidades
// ja fechava o pulo (teste fino com resolveWallCollisions de verdade).
// IMPORTANTE - 15 direto sozinho causou sobreposicao entre checkpoints de
// voltas adjacentes (a sala alargada do centro, offset ja proximo do limite
// entre voltas, mais 15 de margem passava do meio do caminho ate a volta
// vizinha - bug real, reportado pelo usuario: "consegui varios checkpoints
// sem sair do inicio"). Tentei reduzir a margem (8) pra evitar isso, mas
// isso interagia mal com a BORDA DO MAPA em quinas proximas dela (a zona
// maior encostava na borda e shrinkZoneClearOfWalls encolhia ela de volta,
// as vezes mais do que o necessario pra fechar o vao diagonal original -
// reabriu o pulo do checkpoint 19). A solucao correta nao e mexer na
// margem: e ter uma rede de seguranca de verdade contra sobreposicao
// (ver preventCheckpointOverlap, mais abaixo) rodando DEPOIS de calcular
// todas as zonas - assim da pra manter a margem generosa (15, que fecha o
// vao diagonal com folga) sem risco de sobrepor outro checkpoint.
// Reduzido em 20% a pedido do usuario (15 -> 12). A protecao contra
// sobreposicao (preventCheckpointOverlap) e contra atravessar parede de
// verdade (clampZoneToRealWalls, mais abaixo - varre de dentro pra fora e
// nunca deixa a zona passar de uma parede real) continuam valendo do
// mesmo jeito com qualquer valor aqui.
var CHECKPOINT_ZONE_MARGIN = 10.2 * TRACK_WIDTH_SCALE;
// Deslocamento lateral (X) fixo pedido pelo usuario pra parar de vazar
// atraves da parede de uma trilha vizinha (outra volta da espiral) - ver
// uso em computeCheckpointZone.
var CHECKPOINT_SIDE_SHIFT = 2;
// So para a quina 0 (o novo checkpoint FINAL, criado a parte em
// createInvertedFinalCheckpoint - ver uso em computeCheckpointZoneRaw) -
// essa tem um vao MUITO maior no eixo sem perna nenhuma (so o quadrado de
// trim, sem nenhuma parede de largura de corredor pra fechar o lado de
// fora) - medido: precisava de ~30 unidades pra cobrir os pontos onde o
// jogador relatou "passar sem alcancar" o checkpoint final. Seguro usar um
// valor bem maior aqui porque essa quina fica isolada (~950 unidades do
// checkpoint mais proximo) - SO se aplica quando i===0, NUNCA quando
// i===corners.length-1: essa OUTRA quina de 1 perna virou o INICIO (nao e
// mais um checkpoint), mas createTrackVisuals ainda chama esta formula pra
// ela (so pro remendo visual do piso) - aplicar a mesma margem grande ali
// juntava o remendo com os checkpoints 1/2/3 vizinhos (bem perto, na sala
// alargada do centro), causando exatamente a bagunca visual e a
// sobreposicao reportadas pelo usuario.
// Reduzido em 20% a pedido do usuario (35 -> 28).
var CHECKPOINT_END_MARGIN = 23.8 * TRACK_WIDTH_SCALE;
// Raio de bloqueio de uma duna (usado so pelo ajuste fino de
// shrinkZoneClearOfWalls abaixo, NAO pela formula principal - a formula
// principal precisa alcancar pelo menos DUNE_OFFSET/innerOffsetForLeg para
// impedir o corte na quina aberta, ver comentario historico logo abaixo;
// reduzir isso na formula geral reabriu 74 pulos confirmados por BFS).
var WALL_BLOCK_RADIUS = DUNE_BASE_WIDTH / 2 + PLAYER_RADIUS;

// Largura JOGAVEL de verdade do trecho reto "i", em coordenadas locais (n =
// nx=-uz,nz=ux, a mesma convencao de createHazards - MESMO sinal do normal
// "de dentro" usado por createInnerCap). Perigos (obstaculos e lobos)
// precisam usar ISSO, nao a largura da trilha VISUAL
// (trackWidthAtCornerIndex) - a trilha visual e so a faixa de gelo clara
// desenhada por cima, sempre mais estreita que o corredor de verdade
// (definido pelas dunas reais, DUNE_OFFSET/innerOffsetForLeg). Usar a
// largura visual deixava uma faixa GRANDE, inteiramente livre de perigo,
// entre a borda da trilha desenhada e a parede real - exatamente o
// "corredor seguro nas laterais" reportado (ficava pior ainda nos trechos
// alargados da ultima volta, onde o corredor de verdade e MUITO mais largo
// que a faixa visual). vMin (lado de FORA, direcao -n) e vMax (lado de
// DENTRO, direcao +n) sao independentes porque os dois lados de um mesmo
// trecho podem ter distancias bem diferentes (ver CENTER_WIDEN_OFFSET).
function legLateralBounds(i) {
  var margin = 2;
  // trackEdgeJitterMaxForLeg(i) (ver createWavyOffsetWall/trackEdgeJitter)
  // reserva uma margem extra igual ao PIOR CASO possivel da borda ondulada
  // DESSA PERNA ESPECIFICA (ultima volta e/ou saliencia esparsa exagerada,
  // so quando ela de fato existe nessa perna) - a parede de verdade pode
  // ficar ate esse tanto mais perto do centro em algum ponto do trecho,
  // entao nenhum perigo pode nascer/vagar perto o bastante da borda "reta"
  // original pra correr o risco de aparecer dentro da onda. Usar o pior
  // caso POR PERNA (em vez de um pior-caso global fixo aplicado em toda
  // parte) evita desperdicar espaco jogavel nas pernas sem saliencia e
  // fora da ultima volta - a maioria - o que estava deixando os
  // obstaculos "parede parcial" minusculos nelas (reportado pelo usuario).
  var jitterMargin = trackEdgeJitterMaxForLeg(i);
  var outwardSafe = DUNE_OFFSET - WALL_BLOCK_RADIUS - margin - jitterMargin;
  var inwardSafe = innerOffsetForLeg(i) - WALL_BLOCK_RADIUS - margin - jitterMargin;
  return { vMin: -outwardSafe, vMax: inwardSafe };
}

// Bounds LATERAIS proprias dos LOBOS - a MESMA proximidade maxima da parede
// que o proprio JOGADOR consegue alcancar (DUNE_OFFSET/innerOffsetForLeg
// menos WALL_BLOCK_RADIUS, o raio que resolveWallCollisions usa pra
// empurrar qualquer coisa pra fora da parede). Pedido explicito do
// usuario: "a area andavel dos lobos deve ser a mesma area andavel do
// jogador".
// Antes disso, isso aqui era uma varredura empirica bem mais complexa
// (busca binaria + filtragem de segmentos + bins por trecho de "u") pra
// tentar adivinhar, SO POR FORMULA/AMOSTRAGEM, o quao perto de cada parede
// era "seguro" - e mesmo assim sobravam pontos onde a margem calculada
// ficava maior que a parede de verdade (ondulacao da parede, colar de
// quina de outra volta da espiral por perto), criando a "parede invisivel"
// reportada pelo usuario (lobo batia e voltava bem antes da parede real).
// A causa raiz era usar so um limite LOGICO pra decidir o quao perto o
// lobo chegava. A fonte de verdade real da colisao e resolveWallCollisions
// - agora updateCentipedes chama ela toda frame pro lobo, EXATAMENTE como
// o jogador (ver ali) - entao esse valor aqui so precisa ser um ALVO DE
// MIRA razoavel (onde o lobo TENTA ir), nao mais a garantia de seguranca:
// se a mira ficar um pouco alem da parede de verdade em algum ponto
// especifico, a colisao fisica corrige sozinha, sem nenhum risco de
// atravessar nem de "grudar" numa margem exagerada.
function wolfLateralBounds(i) {
  var buffer = WALL_BLOCK_RADIUS;
  return [{
    uStart: -Infinity,
    uEnd: Infinity,
    vMin: -(DUNE_OFFSET - buffer),
    vMax: innerOffsetForLeg(i) - buffer
  }];
}

// Acha o bin (ver wolfLateralBounds) que cobre o "u" atual do lobo -
// usado toda vez que o lobo precisa saber seus limites laterais de
// verdade (mira nova, clamp de posicao a cada frame).
function wolfVBoundsAtU(vBins, u) {
  var i;
  for (i = 0; i < vBins.length; i++) {
    if (u >= vBins[i].uStart && u <= vBins[i].uEnd) { return vBins[i]; }
  }
  return u < vBins[0].uStart ? vBins[0] : vBins[vBins.length - 1];
}

// Versao "crua" (sem o ajuste fino de shrinkZoneClearOfWalls) - usada pelo
// REMENDO VISUAL da quina (createTrackVisuals), que deve preencher a quina
// inteira ate a duna de verdade, mesmo nos poucos casos em que a zona de
// JOGO (computeCheckpointZone, mais abaixo) precisa ficar um pouco menor
// para nao reivindicar espaco dentro do raio solido de uma duna vizinha
// (ver comentario historico ali). Isso e so uma cor de piso - nao ha
// problema nenhum nela ir ate a duna de verdade, so a zona de DETECCAO e
// que precisava ficar mais conservadora.
function computeCheckpointZoneRaw(corners, i) {
  var cur = corners[i];
  var trim = trimForCorner(i);
  // A quina 0 (unica com UMA SO perna que ainda e um checkpoint de
  // verdade - ver CHECKPOINT_END_MARGIN acima) usa o quadrado de trim puro
  // no eixo que nenhuma perna toca - sem nenhuma margem, diferente do eixo
  // com perna (que ja usa CHECKPOINT_ZONE_MARGIN, ver applyLeg abaixo).
  // Isso deixava um vao diagonal bem maior que o normal ali (confirmado
  // medindo: precisava de ~30 unidades de folga extra, nao so ~5-8 como
  // nas quinas normais de 2 pernas). NAO aplica pra i===corners.length-1
  // (essa virou o INICIO, nao e mais checkpoint - ver CHECKPOINT_END_MARGIN).
  var endMargin = (i === 0) ? CHECKPOINT_END_MARGIN : 0;
  var xMin = cur.x - trim - endMargin, xMax = cur.x + trim + endMargin;
  var zMin = cur.z - trim - endMargin, zMax = cur.z + trim + endMargin;

  function applyLeg(legIndex, a, b) {
    var dx = b.x - a.x, dz = b.z - a.z;
    var len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.0001) { return; }
    var ux = dx / len, uz = dz / len;
    var outward = DUNE_OFFSET + CHECKPOINT_ZONE_MARGIN;
    var inward = innerOffsetForLeg(legIndex) + CHECKPOINT_ZONE_MARGIN;
    // Ponto no lado de FORA (mesmo normal de createDuneWalls: nx=uz,nz=-ux)
    // e no lado de DENTRO (mesmo normal de createInnerCap: nx=-uz,nz=ux).
    var outX = cur.x + uz * outward, outZ = cur.z - ux * outward;
    var inX = cur.x - uz * inward, inZ = cur.z + ux * inward;
    // SUBSTITUI o quadrado padrao (trim) neste eixo - nao faz min/max com
    // ele. O quadrado padrao so serve de valor-base para o eixo que NENHUM
    // trecho toca (quina de inicio/fim, so 1 lado aberto); quando um trecho
    // toca o eixo, o alcance dele (ja reduzido por WALL_BLOCK_RADIUS acima)
    // e que manda - usar o maior entre os dois deixava o quadrado padrao (as
    // vezes maior que o alcance real) vazar e anular esse ajuste.
    if (Math.abs(ux) > Math.abs(uz)) {
      // trecho ao longo de X -> a largura dele fica no eixo Z
      zMin = Math.min(outZ, inZ);
      zMax = Math.max(outZ, inZ);
    } else {
      // trecho ao longo de Z -> a largura dele fica no eixo X
      xMin = Math.min(outX, inX);
      xMax = Math.max(outX, inX);
    }
  }

  if (i > 0) { applyLeg(i - 1, corners[i - 1], cur); }
  if (i < corners.length - 1) { applyLeg(i, cur, corners[i + 1]); }

  return { xMin: xMin, xMax: xMax, zMin: zMin, zMax: zMax };
}

// Versao usada para a zona de JOGO (deteccao de checkpoint) - encolhe a
// versao crua acima para nunca reivindicar espaco que na pratica ja esta
// dentro do raio solido de alguma duna (ver clampZoneToRealWalls).
function computeCheckpointZone(corners, i) {
  var zone = clampZoneToRealWalls(computeCheckpointZoneRaw(corners, i), corners[i]);
  // Correcao pedida pelo usuario: alguns checkpoints ainda registravam
  // atraves da parede de uma trilha VIZINHA (outra volta da espiral,
  // paralela em X) - desloca o retangulo inteiro (mesmo tamanho, so a
  // posicao muda) CHECKPOINT_SIDE_SHIFT unidades para FORA: pra direita se
  // o checkpoint fica a direita do INICIO, pra esquerda se fica a
  // esquerda (INICIO = corners[corners.length-1] como referencia de lado).
  // Isso afasta a zona da parede vizinha do lado de fora, mesmo que ela
  // passe a invadir um pouco a propria coluna/parede do lado de dentro -
  // aceito explicitamente pelo usuario ("nao se importe se o checkpoint
  // entrar um pouco dentro das colunas/paredes").
  var startX = corners[corners.length - 1].x;
  var sideShift = 0;
  if (corners[i].x > startX) { sideShift = CHECKPOINT_SIDE_SHIFT; }
  else if (corners[i].x < startX) { sideShift = -CHECKPOINT_SIDE_SHIFT; }
  zone.xMin += sideShift;
  zone.xMax += sideShift;
  return zone;
}

// REGRA pedida pelo usuario: a zona de um checkpoint nunca pode ultrapassar
// uma parede de verdade ("as colunas"). A versao antiga (shrinkZoneClearOf
// Walls) encolhia cada borda PRA DENTRO, mas so enquanto a PROPRIA borda
// estivesse bloqueada - se uma margem grande (CHECKPOINT_ZONE_MARGIN/
// CHECKPOINT_END_MARGIN) empurrasse a borda BEM ALEM de uma parede de
// verdade, a borda podia nascer ja "livre" (a parede ficava no MEIO do
// caminho, nao mais na borda) e nada era encolhido - a zona pulava por cima
// da parede sem nunca perceber que ela existia (bug real, reportado pelo
// usuario: dava pra "burlar" um checkpoint tocando nele vindo de dentro do
// corredor errado, de outra volta da espiral). Esta versao evita isso por
// construcao: em vez de encolher de fora pra dentro, VARRE de DENTRO (o
// proprio centro da quina, sempre livre de parede) pra FORA, na direcao de
// cada borda desejada, parando no primeiro sinal de parede de verdade -
// assim e IMPOSSIVEL a zona final incluir qualquer ponto alem de uma
// parede real, nao importa o tamanho da margem que pediu aquela borda.
function clampZoneToRealWalls(zone, center) {
  var SAMPLES = 10;
  var STEP = 2;
  function rangeBlocked(axis, value, otherMin, otherMax) {
    var blockedCount = 0;
    for (var s = 0; s <= SAMPLES; s++) {
      var other = otherMin + (otherMax - otherMin) * (s / SAMPLES);
      var px = axis === 'x' ? value : other;
      var pz = axis === 'x' ? other : value;
      var res = resolveWallCollisions(px, pz);
      if (Math.abs(res.x - px) > 0.3 || Math.abs(res.z - pz) > 0.3) { blockedCount++; }
    }
    return (blockedCount / (SAMPLES + 1)) > 0.5;
  }
  // Anda de "fromValue" ate "toValue" em passos pequenos, parando no ULTIMO
  // valor ainda livre assim que qualquer passo seguinte bater numa parede -
  // mesma logica de "varredura que para na primeira colisao" ja usada em
  // sweepTeleport, so que pra definir o tamanho de uma zona em vez de mover
  // o jogador.
  function scanEdge(axis, fromValue, toValue, otherMin, otherMax) {
    var dist = toValue - fromValue;
    var dir = dist >= 0 ? 1 : -1;
    var absDist = Math.abs(dist);
    var steps = Math.max(1, Math.ceil(absDist / STEP));
    var last = fromValue;
    var st;
    for (st = 1; st <= steps; st++) {
      var v = fromValue + dir * Math.min(st * STEP, absDist);
      if (rangeBlocked(axis, v, otherMin, otherMax)) { return last; }
      last = v;
    }
    return last;
  }
  // IMPORTANTE: usa sempre o retangulo CRU original (rawXMin/rawXMax/
  // rawZMin/rawZMax) como faixa do "outro eixo" nas 4 varreduras - nunca o
  // valor JA atualizado de zone.xMin/xMax/zMin/zMax. Usar o valor ja
  // encolhido contaminava a amostragem do proximo eixo com o resultado do
  // anterior (a mesma familia de bug que a versao antiga documentava e
  // evitava com passadas separadas) - podia encolher um eixo bem mais do
  // que o necessario so porque o OUTRO eixo, encolhido primeiro, deixou a
  // faixa de amostragem artificialmente estreita.
  var rawXMin = zone.xMin, rawXMax = zone.xMax, rawZMin = zone.zMin, rawZMax = zone.zMax;
  zone.xMax = scanEdge('x', center.x, rawXMax, rawZMin, rawZMax);
  zone.xMin = scanEdge('x', center.x, rawXMin, rawZMin, rawZMax);
  zone.zMax = scanEdge('z', center.z, rawZMax, rawXMin, rawXMax);
  zone.zMin = scanEdge('z', center.z, rawZMin, rawXMin, rawXMax);
  return zone;
}

function isInsideCheckpointZone(cp, x, z) {
  return x > cp.xMin && x < cp.xMax && z > cp.zMin && z < cp.zMax;
}

// Checkpoints (e o inicio) sao area SEGURA - nenhum perigo (obstaculo
// estatico, lobo de gelo) pode nascer ou vagar para dentro deles. Antes,
// obstaculos e lobos so respeitavam uma margem fixa (REACTION_BUFFER) ao
// longo do proprio trecho reto - o suficiente enquanto o quadrado do
// checkpoint tinha um tamanho unico e prev isivel, mas nao depois da sala
// alargada do centro, onde a zona de alguns checkpoints (computeCheckpointZone)
// passou a ser um retangulo BEM maior de um dos lados (ver CENTER_WIDEN_OFFSET)
// - podendo alcancar perigos que antes ficavam a uma distancia segura.
// HAZARD_SAFE_MARGIN da uma folga extra alem da propria zona do checkpoint,
// para nada nascer bem em cima da borda.
var HAZARD_SAFE_MARGIN = 6;
function isInsideAnyHazardFreeZone(x, z) {
  if (x > G.startZone.xMin - HAZARD_SAFE_MARGIN && x < G.startZone.xMax + HAZARD_SAFE_MARGIN &&
      z > G.startZone.zMin - HAZARD_SAFE_MARGIN && z < G.startZone.zMax + HAZARD_SAFE_MARGIN) {
    return true;
  }
  var i;
  for (i = 0; i < G.checkpoints.length; i++) {
    var cp = G.checkpoints[i];
    if (x > cp.xMin - HAZARD_SAFE_MARGIN && x < cp.xMax + HAZARD_SAFE_MARGIN &&
        z > cp.zMin - HAZARD_SAFE_MARGIN && z < cp.zMax + HAZARD_SAFE_MARGIN) {
      return true;
    }
  }
  return false;
}

/* ====================== CONSTRUCAO DA ESPIRAL QUADRADA ==================== */

// Constroi as "quinas" da espiral com o algoritmo classico de espiral
// retangular: direita, desce, esquerda, sobe - repetindo e encolhendo o
// comprimento de cada trecho a cada duas viradas. Isso garante um caminho
// fechado, sem sobreposicao, convergindo para o centro do mapa, com
// corredores paralelos sempre exatamente CORRIDOR_PITCH afastados.
function buildSpiralCorners() {
  var directions = [
    { x: 1, z: 0 },   // direita (topo)
    { x: 0, z: 1 },   // desce
    { x: -1, z: 0 },  // esquerda
    { x: 0, z: -1 }   // sobe
  ];

  // Ponto inicial: extremidade esquerda do mapa (lado oeste), bem proximo da borda
  var mapEstimateHalf = FIRST_LEG_LENGTH + START_INSET + 20;
  var startX = -mapEstimateHalf + START_INSET;
  var startZ = -mapEstimateHalf + START_INSET;

  var corners = [{ x: startX, z: startZ }];
  var currentX = startX;
  var currentZ = startZ;

  var i;
  for (i = 0; i < NUM_TURNS + EXTRA_END_LEGS; i++) {
    var legLength = FIRST_LEG_LENGTH - Math.floor(i / 2) * CORRIDOR_PITCH;
    if (legLength < MIN_LEG_LENGTH) { legLength = MIN_LEG_LENGTH; }
    var dir = directions[i % 4];
    currentX += dir.x * legLength;
    currentZ += dir.z * legLength;
    corners.push({ x: currentX, z: currentZ });
  }

  return corners;
}

// Calcula o retangulo que envolve toda a espiral (usado para o chao e as bordas do mapa)
function computeMapBounds(corners) {
  var minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  var i;
  for (i = 0; i < corners.length; i++) {
    if (corners[i].x < minX) { minX = corners[i].x; }
    if (corners[i].x > maxX) { maxX = corners[i].x; }
    if (corners[i].z < minZ) { minZ = corners[i].z; }
    if (corners[i].z > maxZ) { maxZ = corners[i].z; }
  }
  var margin = 35;
  var half = Math.max(maxX - minX, maxZ - minZ) / 2 + margin;
  var centerX = (minX + maxX) / 2;
  var centerZ = (minZ + maxZ) / 2;
  return { half: half, centerX: centerX, centerZ: centerZ };
}

/* ===================== COLISAO CONTRA OBJETOS SOLIDOS ===================== */

// Registra um colisor solido (segmento de reta com raio; um segmento com
// ax===bx e az===bz funciona como um circulo, usado pelos mini-oasis)
function addWallSegment(ax, az, bx, bz, radius) {
  var seg = { ax: ax, az: az, bx: bx, bz: bz, radius: radius };
  G.wallSegments.push(seg);
  return seg;
}

// Empurra a posicao (x,z) para fora de qualquer colisor solido que esteja
// invadindo. Esta e a UNICA forma de bloqueio fisico do jogo - todos os
// colisores correspondem a objetos 3D visiveis (dunas, bordas, mini-oasis).
function resolveWallCollisions(x, z) {
  var resultX = x, resultZ = z;
  var i;
  for (i = 0; i < G.wallSegments.length; i++) {
    var seg = G.wallSegments[i];
    var abx = seg.bx - seg.ax;
    var abz = seg.bz - seg.az;
    var denom = abx * abx + abz * abz;
    var t = 0;
    if (denom > 0.0000001) {
      t = ((resultX - seg.ax) * abx + (resultZ - seg.az) * abz) / denom;
      t = clampNum(t, 0, 1);
    }
    var closestX = seg.ax + abx * t;
    var closestZ = seg.az + abz * t;
    var dx = resultX - closestX;
    var dz = resultZ - closestZ;
    var dist = Math.sqrt(dx * dx + dz * dz);
    var minDist = seg.radius + PLAYER_RADIUS;
    if (dist < minDist) {
      if (dist < 0.0001) { dx = 1; dz = 0; dist = 1; }
      resultX = closestX + (dx / dist) * minDist;
      resultZ = closestZ + (dz / dist) * minDist;
    }
  }
  return { x: resultX, z: resultZ };
}

// Move de (x,z) por um deslocamento (dx,dz), resolvendo colisao em pequenos
// passos (nunca maiores que MOVE_STEP) em vez de aplicar resolveWallCollisions
// so no ponto final. Isso existe para nunca deixar o movimento normal
// "atravessar" uma divisoria fina numa unica atualizacao de fisica: em
// velocidade de dash (BASE_SPEED*DASH_MULTIPLIER) com um frame mais lento
// que o normal, o deslocamento de um unico frame pode ultrapassar a
// espessura de bloqueio de uma duna - resolvendo so o ponto final, o
// personagem podia "pular" para o lado errado da parede (a mesma logica de
// bug que o sweepTeleport ja evita para o Teleporte). Passo a passo, a
// colisao e pega assim que a duna e alcancada, antes de conseguir cruzar
// para o outro lado.
function moveWithCollision(x, z, dx, dz) {
  var MOVE_STEP = 4.0; // bem menor que o raio de bloqueio de qualquer parede (>=9)
  var dist = Math.sqrt(dx * dx + dz * dz);
  if (dist <= MOVE_STEP) {
    return resolveWallCollisions(x + dx, z + dz);
  }
  var steps = Math.ceil(dist / MOVE_STEP);
  var stepX = dx / steps, stepZ = dz / steps;
  var curX = x, curZ = z;
  var i;
  for (i = 0; i < steps; i++) {
    var resolved = resolveWallCollisions(curX + stepX, curZ + stepZ);
    curX = resolved.x;
    curZ = resolved.z;
  }
  return { x: curX, z: curZ };
}

// "Varre" um caminho reto a partir de (startX,startZ) na direcao (dirX,dirZ)
// por ate maxDist, avancando em passos pequenos (TELEPORT_STEP) e parando no
// ULTIMO ponto livre assim que um colisor solido e encontrado no caminho.
// Isso e o que garante que o Teleporte nunca atravessa uma divisoria: uma
// checagem que so olha o ponto final (como resolveWallCollisions sozinho
// faz) poderia "empurrar" o destino para o lado ERRADO de uma parede fina,
// efetivamente atravessando-a. Varrendo passo a passo, a primeira colisao no
// caminho interrompe o avanco antes de cruzar a parede.
function sweepTeleport(startX, startZ, dirX, dirZ, maxDist) {
  var lastX = startX, lastZ = startZ;
  var steps = Math.max(1, Math.ceil(maxDist / TELEPORT_STEP));
  var i;
  for (i = 1; i <= steps; i++) {
    var dist = Math.min(i * TELEPORT_STEP, maxDist);
    var px = startX + dirX * dist;
    var pz = startZ + dirZ * dist;
    var resolved = resolveWallCollisions(px, pz);
    var pushed = Math.sqrt((resolved.x - px) * (resolved.x - px) + (resolved.z - pz) * (resolved.z - pz));
    if (pushed > 0.05) { return { x: lastX, z: lastZ }; }
    lastX = px; lastZ = pz;
    if (dist >= maxDist) { break; }
  }
  return { x: lastX, z: lastZ };
}

// Verifica se uma posicao esta dentro do inicio ou de algum oasis (zona livre,
// onde o Axie pode virar instantaneamente e andar em qualquer direcao)
function isInsideAnyOasis(x, z) {
  if (x > G.startZone.xMin && x < G.startZone.xMax && z > G.startZone.zMin && z < G.startZone.zMax) { return true; }
  var i;
  for (i = 0; i < G.checkpoints.length; i++) {
    var cp = G.checkpoints[i];
    var dx = x - cp.x;
    var dz = z - cp.z;
    if (Math.sqrt(dx * dx + dz * dz) < OASIS_RADIUS) { return true; }
  }
  return false;
}

/* ============================ ARTE (so visual) ============================ */
// Blocos de gelo estilo iglu nas paredes, neve nos checkpoints, estalagmites em 3
// variacoes, lobos com silhueta de lobo e flocos de neve leves. NADA aqui muda
// colisao/hitbox: os colisores continuam sendo G.wallSegments, os raios de
// OBSTACLE_RADIUS/WOLF_SIZE_SCALE e as posicoes dos segmentos dos lobos.

// Junta varias geometrias numa so, com COR POR VERTICE (1 malha = 1 draw call).
// parts: [{geo, color, pos:[x,y,z], rot:[rx,ry,rz], scale:[sx,sy,sz]}]
function mergeColored(parts, opts) {
  var pos = [], nor = [], col = [], i, j, c = new THREE.Color(), c2 = new THREE.Color();
  var hull = !!(opts && opts.hull);
  for (i = 0; i < parts.length; i++) {
    var pt = parts[i];
    if (hull && pt.noHull) { continue; }
    var g = pt.geo.clone();
    var sc = pt.scale || [1, 1, 1];
    if (hull) { sc = [sc[0] * opts.inflate, sc[1] * opts.inflate, sc[2] * opts.inflate]; }
    if (pt.scale || hull) { g.scale(sc[0], sc[1], sc[2]); }
    if (pt.rot) { g.rotateX(pt.rot[0]); g.rotateY(pt.rot[1]); g.rotateZ(pt.rot[2]); }
    if (pt.pos) { g.translate(pt.pos[0], pt.pos[1], pt.pos[2]); }
    if (g.index) { g = g.toNonIndexed(); }
    g.computeVertexNormals(); // normais por face = aparencia facetada (low-poly)
    c.setHex(hull ? opts.color : pt.color);
    var useGrad = !hull && pt.color2 !== undefined;
    if (useGrad) { c2.setHex(pt.color2); }
    var pa = g.attributes.position.array, na = g.attributes.normal.array, yMin = Infinity, yMax = -Infinity;
    if (useGrad) { for (j = 1; j < pa.length; j += 3) { if (pa[j] < yMin) { yMin = pa[j]; } if (pa[j] > yMax) { yMax = pa[j]; } } }
    for (j = 0; j < pa.length; j++) { pos.push(pa[j]); nor.push(na[j]); }
    for (j = 0; j < pa.length / 3; j++) {
      if (useGrad) {
        var k2 = yMax > yMin ? (pa[j * 3 + 1] - yMin) / (yMax - yMin) : 0; // base -> ponta
        col.push(c.r + (c2.r - c.r) * k2, c.g + (c2.g - c.g) * k2, c.b + (c2.b - c.b) * k2);
      } else { col.push(c.r, c.g, c.b); }
    }
  }
  var out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  out.userData.shared = true; // geometria COMPARTILHADA: nao descartar ao remover a malha
  return out;
}
// --- Blocos de gelo (parede de iglu) ---
var ICE_TILE_W = 12; // largura (mundo) de um ladrilho da textura (2 tijolos de 6)
var ICE_TILE_H = 6;  // altura (mundo) do ladrilho (2 fileiras de 3)

// Textura procedural: tijolos de gelo arredondados, brilhosos, com argamassa azul
// escura, fileiras defasadas (como a referencia de parede de iglu).
function makeIceBrickTexture() {
  var W = 256, H = 128, cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  var ctx = cv.getContext('2d');
  ctx.fillStyle = '#2f6f9c';
  ctx.fillRect(0, 0, W, H);
  function rr(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
  function brick(x, y, w, h, seed) {
    var g = ctx.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, '#d9f1fb'); g.addColorStop(0.5, '#a9d8ee'); g.addColorStop(1, '#79b6d8');
    ctx.fillStyle = g;
    rr(x + 4, y + 4, w - 8, h - 8, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 3;
    rr(x + 7, y + 7, w - 14, h - 14, 13);
    ctx.stroke();
    // brilho (reflexo) e pontinhos de neve
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.beginPath(); ctx.ellipse(x + 26 + (seed % 3) * 9, y + 20, 11, 5, -0.25, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + w - 24 - (seed % 2) * 12, y + h - 22, 3, 0, Math.PI * 2); ctx.fill();
  }
  var row, k;
  for (row = 0; row < 2; row++) {
    var off = row === 0 ? 0 : 64;
    for (k = -1; k <= 2; k++) { brick(k * 128 + off, row * 64, 128, 64, k + row * 3 + 6); }
  }
  var tex = new THREE.CanvasTexture(cv);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}
function getIceWallMats() {
  if (!G.iceWallMats) {
    G.iceWallMats = [
      new THREE.MeshLambertMaterial({ map: makeIceBrickTexture() }),  // 0: tijolos de gelo
      new THREE.MeshLambertMaterial({ color: 0xf6fbff })               // 1: neve por cima
    ];
  }
  return G.iceWallMats;
}
// Escala as UVs de uma BoxGeometry (indexada, 6 faces x 4 vertices) para que a
// textura repita a cada ICE_TILE_W x ICE_TILE_H unidades de mundo.
function scaleBoxUVs(geo, w, h, d) {
  var uv = geo.attributes.uv, f, k;
  var dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (f = 0; f < 6; f++) {
    for (k = 0; k < 4; k++) {
      var idx = f * 4 + k;
      uv.setXY(idx, uv.getX(idx) * dims[f][0] / ICE_TILE_W, uv.getY(idx) * dims[f][1] / ICE_TILE_H);
    }
  }
}
// Junta geometrias em UMA malha com 1 grupo (material) por parte.
function joinWithGroups(list) {
  var pos = [], nor = [], uvs = [], out = new THREE.BufferGeometry(), i, start = 0;
  for (i = 0; i < list.length; i++) {
    var g = list[i].index ? list[i].toNonIndexed() : list[i];
    var pa = g.attributes.position.array, na = g.attributes.normal.array, ua = g.attributes.uv.array, j;
    for (j = 0; j < pa.length; j++) { pos.push(pa[j]); nor.push(na[j]); }
    for (j = 0; j < ua.length; j++) { uvs.push(ua[j]); }
    var cnt = pa.length / 3;
    out.addGroup(start, cnt, i);
    start += cnt;
  }
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  out.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  return out;
}
// Parede reta de blocos de gelo com neve em cima (mesmas dimensoes do colisor:
// len x DUNE_HEIGHT x width).
function makeIceWallGeometry(len, height, width) {
  var bodyH = height - 0.6;
  var body = new THREE.BoxGeometry(len, bodyH, width);
  scaleBoxUVs(body, len, bodyH, width);
  body.translate(0, bodyH / 2, 0);
  // Neve na largura EXATA do colisor (sem aba lateral): o visual nao passa da hitbox.
  var cap = new THREE.BoxGeometry(len + 0.6, 1.3, width);
  cap.translate(0, height - 0.5, 0);
  return joinWithGroups([body, cap]);
}
function makeIceCylinderGeometry(r, height) {
  var bodyH = height - 0.6;
  var body = new THREE.CylinderGeometry(r, r, bodyH, 16);
  var uv = body.attributes.uv, i;
  for (i = 0; i < uv.count; i++) { uv.setXY(i, uv.getX(i) * (Math.PI * 2 * r) / ICE_TILE_W, uv.getY(i) * bodyH / ICE_TILE_H); }
  body.translate(0, bodyH / 2, 0);
  var cap = new THREE.CylinderGeometry(r, r, 1.3, 16);
  cap.translate(0, height - 0.5, 0);
  return joinWithGroups([body, cap]);
}

// --- Estalagmites (cristais de gelo saindo do chao), 3 variacoes GRANDES e legiveis ---
// So visual (o raio de acerto OBSTACLE_RADIUS nao muda). Degrade escuro na base ->
// claro na ponta + contorno azul-marinho (casco invertido) pra se destacarem do gelo.
var STAL_VISUAL_SCALE = 1.45;   // tamanho visual (horizontal)
var STAL_VISUAL_TALL = 1.5;     // altura extra (vertical)
function buildStalagmiteVariants() {
  if (G.stalVariants) { return G.stalVariants; }
  var BASE1 = 0x1a86c8, BASE2 = 0x0f6aa8, TIP1 = 0xc9f7ff, TIP2 = 0x8fe6ff, SNOW = 0xffffff, ROCK = 0x3f7fa6;
  function spike(r, h, seg) { var g = new THREE.ConeGeometry(r, h, seg || 6); g.translate(0, h / 2, 0); return g; }
  function snow(r) { return { geo: new THREE.SphereGeometry(r, 8, 5), color: SNOW, pos: [0, 0.1, 0], scale: [1, 0.3, 1], noHull: true }; }
  function sp(r, h, seg, x, z, lx, lz, c1, c2) { return { geo: spike(r, h, seg), color: c1, color2: c2, pos: [x, 0, z], rot: [lz, 0, -lx] }; }
  // V0 - FEIXE: espetos altos e finos juntos
  var v0 = [snow(2.1)], i;
  var s0 = [[0, 0, 0.95, 9.4], [1.25, 0.5, 0.6, 6.6], [-1.15, -0.5, 0.55, 5.8], [0.35, -1.35, 0.5, 4.6], [-0.55, 1.3, 0.45, 3.8], [1.7, -0.8, 0.32, 2.7]];
  for (i = 0; i < s0.length; i++) {
    var q = s0[i];
    v0.push(sp(q[2], q[3], 5, q[0], q[1], q[0] * 0.07, q[1] * 0.06, i % 2 ? BASE2 : BASE1, i % 2 ? TIP2 : TIP1));
  }
  // V1 - CRISTAL: grande cristal facetado com estilhacos inclinados
  var v1 = [snow(2.0), { geo: new THREE.DodecahedronGeometry(0.85, 0), color: ROCK, pos: [1.2, 0.5, 0.6] }, { geo: new THREE.DodecahedronGeometry(0.7, 0), color: ROCK, pos: [-1.2, 0.4, -0.7] }];
  v1.push({ geo: new THREE.OctahedronGeometry(1.5, 0), color: BASE1, color2: TIP1, pos: [0, 4.7, 0], scale: [0.85, 3.1, 0.85] });
  var a;
  for (a = 0; a < 3; a++) {
    var ang = a * 2.094 + 0.5;
    v1.push(sp(0.6, 4.6, 4, Math.cos(ang) * 1.2, Math.sin(ang) * 1.2, Math.cos(ang) * 0.3, Math.sin(ang) * 0.3, a % 2 ? BASE2 : BASE1, a % 2 ? TIP2 : TIP1));
  }
  // V2 - PRESAS: 3 presas largas inclinadas + coroa de espetinhos na base
  var v2 = [snow(2.0)], f;
  for (f = 0; f < 3; f++) {
    var fa = f * 2.094 + 1.0;
    v2.push(sp(1.05, 7.6 - f * 0.9, 5, Math.cos(fa) * 0.9, Math.sin(fa) * 0.9, Math.cos(fa) * 0.26, Math.sin(fa) * 0.26, BASE1, f === 1 ? TIP1 : TIP2));
  }
  for (f = 0; f < 8; f++) {
    var ra = f * 0.785;
    v2.push(sp(0.3, 2.2 + (f % 3) * 0.5, 4, Math.cos(ra) * 1.7, Math.sin(ra) * 1.7, Math.cos(ra) * 0.25, Math.sin(ra) * 0.25, BASE2, TIP1));
  }
  var HULL = { hull: true, inflate: 1.14, color: 0x0b2f5c };
  G.stalVariants = [mergeColored(v0), mergeColored(v1), mergeColored(v2)];
  G.stalHulls = [mergeColored(v0, HULL), mergeColored(v1, HULL), mergeColored(v2, HULL)];
  G.stalMat = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x0b3a55 });
  G.stalHullMat = new THREE.MeshBasicMaterial({ color: 0x0b2f5c, side: THREE.BackSide });
  return G.stalVariants;
}
// --- Lobo BRANCO e assustador (rosto de lobo: focinho, boca aberta com presas, olhos
// vermelhos e sobrancelha brava, orelhas pontudas, juba e cauda felpuda) + andar ---
// Tamanho VISUAL bem maior que a area de acerto (que NAO mudou: os 5 segmentos invisiveis
// continuam sendo a hitbox, com WOLF_SIZE_SCALE).
var WOLF_VISUAL_SCALE = 1.45;
var WOLF_ANCHOR_BACK = 4.8; // o modelo fica atras da cabeca-hitbox (cabeca do modelo ~ na cabeca)
function buildWolfAssets() {
  if (G.wolfAssets) { return G.wolfAssets; }
  var FUR = 0xf4f7fb, FUR2 = 0xdde5ee, BELLY = 0xffffff, SNOUT = 0xeaf0f6, DARK = 0x39424f;
  function sph(sx, sy, sz, x, y, z, col, nh) { return { geo: new THREE.SphereGeometry(1, 9, 7), color: col, pos: [x, y, z], scale: [sx, sy, sz], noHull: !!nh }; }
  function cone(r, h, seg, x, y, z, rx, ry, rz, col, nh) { return { geo: new THREE.ConeGeometry(r, h, seg), color: col, pos: [x, y, z], rot: [rx, ry, rz], noHull: !!nh }; }
  var body = [
    sph(1.35, 1.25, 2.6, 0, 2.7, 0, FUR),          // tronco
    sph(1.0, 0.7, 2.0, 0, 2.05, 0.1, BELLY, true),  // barriga
    sph(1.45, 1.3, 1.35, 0, 2.75, -1.6, FUR2),      // quadril
    sph(1.4, 1.35, 1.2, 0, 2.95, 1.2, FUR),         // peito/ombros
    sph(0.95, 1.0, 1.1, 0, 3.35, 2.2, FUR),         // pescoco
    sph(1.0, 0.92, 1.15, 0, 3.5, 3.0, FUR),         // cabeca
    cone(0.62, 1.9, 6, 0, 3.3, 4.4, Math.PI / 2 + 0.05, 0, 0, SNOUT),  // focinho (mandibula de cima)
    cone(0.5, 1.6, 6, 0, 2.7, 4.1, Math.PI / 2 - 0.4, 0, 0, FUR2),     // mandibula de baixo (boca aberta)
    sph(0.45, 0.3, 0.9, 0, 3.0, 4.15, 0x7a1420, true),                  // interior da boca
    cone(0.13, 0.65, 4, 0.34, 3.0, 4.95, Math.PI, 0, 0, 0xfff8e0, true), // presas de cima
    cone(0.13, 0.65, 4, -0.34, 3.0, 4.95, Math.PI, 0, 0, 0xfff8e0, true),
    cone(0.11, 0.5, 4, 0.28, 2.85, 4.8, 0, 0, 0, 0xfff8e0, true),        // presas de baixo
    cone(0.11, 0.5, 4, -0.28, 2.85, 4.8, 0, 0, 0, 0xfff8e0, true),
    sph(0.28, 0.24, 0.28, 0, 3.55, 5.3, 0x0c1016, true),                 // nariz
    sph(0.22, 0.16, 0.22, 0.52, 3.78, 3.9, 0xff2a1e, true),              // olhos vermelhos
    sph(0.22, 0.16, 0.22, -0.52, 3.78, 3.9, 0xff2a1e, true),
    { geo: new THREE.BoxGeometry(0.85, 0.16, 0.34), color: DARK, pos: [0.5, 4.05, 3.9], rot: [0, 0, -0.5], noHull: true }, // sobrancelhas bravas
    { geo: new THREE.BoxGeometry(0.85, 0.16, 0.34), color: DARK, pos: [-0.5, 4.05, 3.9], rot: [0, 0, 0.5], noHull: true },
    cone(0.42, 1.6, 4, 0.62, 4.75, 2.7, 0, 0, -0.15, FUR2),              // orelhas pontudas
    cone(0.42, 1.6, 4, -0.62, 4.75, 2.7, 0, 0, 0.15, FUR2),
    cone(0.3, 1.2, 4, 0.98, 3.5, 2.2, 0, 0, -1.2, BELLY),               // juba (pelos arrepiados no pescoco)
    cone(0.3, 1.2, 4, -0.98, 3.5, 2.2, 0, 0, 1.2, BELLY),
    cone(0.3, 1.2, 4, 0.55, 4.1, 2.0, 0, 0, -0.5, BELLY),
    cone(0.3, 1.2, 4, -0.55, 4.1, 2.0, 0, 0, 0.5, BELLY),
    cone(0.3, 1.2, 4, 0, 4.35, 1.9, -0.5, 0, 0, BELLY),
    cone(0.26, 1.0, 4, 0, 4.15, 0.6, -0.55, 0, 0, BELLY),                // pelos eriçados nas costas
    cone(0.26, 1.0, 4, 0, 4.0, -0.4, -0.55, 0, 0, BELLY),
    cone(0.26, 1.0, 4, 0, 4.0, -1.4, -0.55, 0, 0, BELLY),
    cone(0.65, 3.0, 5, 0, 3.3, -3.5, -Math.PI / 2 + 0.55, 0, 0, FUR),     // cauda felpuda
    sph(0.8, 0.75, 1.4, 0, 3.4, -3.9, FUR2),
    cone(0.5, 1.2, 5, 0, 3.6, -5.2, -Math.PI / 2 + 0.55, 0, 0, 0x9aa8ba, true) // ponta cinza da cauda
  ];
  var leg = [
    { geo: new THREE.CylinderGeometry(0.4, 0.28, 1.8, 6), color: FUR, pos: [0, -0.9, 0] },
    { geo: new THREE.SphereGeometry(0.4, 6, 5), color: BELLY, pos: [0, -1.85, 0.12], scale: [1, 0.6, 1.3] },
    { geo: new THREE.ConeGeometry(0.1, 0.4, 3), color: 0x2a303a, pos: [0.14, -1.9, 0.62], rot: [Math.PI / 2, 0, 0] },
    { geo: new THREE.ConeGeometry(0.1, 0.4, 3), color: 0x2a303a, pos: [-0.14, -1.9, 0.62], rot: [Math.PI / 2, 0, 0] }
  ];
  G.wolfAssets = {
    bodyGeo: mergeColored(body),
    hullGeo: mergeColored(body, { hull: true, inflate: 1.1, color: 0x1b2d45 }),
    legGeo: mergeColored(leg),
    mat: new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x20262e }),
    hullMat: new THREE.MeshBasicMaterial({ color: 0x1b2d45, side: THREE.BackSide })
  };
  return G.wolfAssets;
}
function createWolfVisual() {
  var A = buildWolfAssets();
  var grp = new THREE.Group();
  var inner = new THREE.Group(); // recebe escala e balanco
  inner.add(new THREE.Mesh(A.bodyGeo, A.mat));
  inner.add(new THREE.Mesh(A.hullGeo, A.hullMat)); // contorno escuro (lobo branco sobre gelo claro)
  var hips = [[0.85, 1.5], [-0.85, 1.5], [0.85, -1.4], [-0.85, -1.4]], legs = [], i;
  for (i = 0; i < hips.length; i++) {
    var pivot = new THREE.Group();
    pivot.position.set(hips[i][0], 2.0, hips[i][1]);
    pivot.add(new THREE.Mesh(A.legGeo, A.mat));
    inner.add(pivot);
    legs.push(pivot);
  }
  inner.scale.set(WOLF_VISUAL_SCALE, WOLF_VISUAL_SCALE, WOLF_VISUAL_SCALE);
  grp.add(inner);
  grp.userData = { inner: inner, legs: legs, phase: 0, heading: 0, lx: null, lz: 0 };
  return grp;
}
// Posiciona/gira o lobo no rastro da cabeca (segments[0]) e balanca as pernas
// conforme a distancia andada (passos de trote em diagonal). A hitbox continua
// sendo os segmentos, que ficam invisiveis.
function updateWolfVisual(cent) {
  var v = cent.visual;
  if (!v) { return; }
  var ud = v.userData, head = cent.segments[0].position, tail = cent.segments[cent.segments.length - 1].position;
  var dx = head.x - tail.x, dz = head.z - tail.z;
  if (dx * dx + dz * dz > 0.16) { ud.heading = Math.atan2(dx, dz); }
  var fx = Math.sin(ud.heading), fz = Math.cos(ud.heading);
  v.position.set(head.x - fx * WOLF_ANCHOR_BACK, 0, head.z - fz * WOLF_ANCHOR_BACK);
  v.rotation.y = ud.heading;
  var mv = ud.lx === null ? 0 : Math.sqrt((head.x - ud.lx) * (head.x - ud.lx) + (head.z - ud.lz) * (head.z - ud.lz));
  ud.lx = head.x; ud.lz = head.z;
  if (mv < 12) { ud.phase += mv * 1.0; }
  var sw = mv > 0.01 ? Math.sin(ud.phase) * 0.75 : 0;
  ud.legs[0].rotation.x = sw; ud.legs[3].rotation.x = sw;
  ud.legs[1].rotation.x = -sw; ud.legs[2].rotation.x = -sw;
  ud.inner.position.y = mv > 0.01 ? Math.abs(Math.sin(ud.phase)) * 0.14 * WOLF_VISUAL_SCALE : 0;
}
// --- Neve no ar: POUCOS flocos, lentos, baixa opacidade (so clima) ---
var SNOW_FLAKES = 80, SNOW_BOX_W = 380, SNOW_BOX_D = 320, SNOW_TOP = 120;
function createSnowfall() {
  var cv = document.createElement('canvas');
  cv.width = 32; cv.height = 32;
  var cx = cv.getContext('2d'), g = cx.createRadialGradient(16, 16, 1, 16, 16, 15);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  cx.fillStyle = g; cx.fillRect(0, 0, 32, 32);
  var arr = new Float32Array(SNOW_FLAKES * 3), speeds = [], phases = [], i;
  var px = G.player.position.x, pz = G.player.position.z;
  for (i = 0; i < SNOW_FLAKES; i++) {
    arr[i * 3] = px + (Math.random() - 0.5) * SNOW_BOX_W;
    arr[i * 3 + 1] = Math.random() * SNOW_TOP;
    arr[i * 3 + 2] = pz + (Math.random() - 0.5) * SNOW_BOX_D;
    speeds.push(5 + Math.random() * 5);
    phases.push(Math.random() * 6.28);
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  var mat = new THREE.PointsMaterial({ color: 0xffffff, size: 2.1, map: new THREE.CanvasTexture(cv), transparent: true, opacity: 0.5, depthWrite: false, sizeAttenuation: true });
  var pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  G.scene.add(pts);
  G.snow = { pts: pts, arr: arr, speeds: speeds, phases: phases, t: 0 };
}
function updateSnowfall(dt) {
  var s = G.snow;
  if (!s) { return; }
  s.t += dt;
  var arr = s.arr, i, px = G.player.position.x, pz = G.player.position.z;
  for (i = 0; i < SNOW_FLAKES; i++) {
    arr[i * 3 + 1] -= s.speeds[i] * dt;
    arr[i * 3] += Math.sin(s.t * 0.5 + s.phases[i]) * 1.6 * dt;
    if (arr[i * 3 + 1] < 0) { arr[i * 3 + 1] = SNOW_TOP; arr[i * 3] = px + (Math.random() - 0.5) * SNOW_BOX_W; arr[i * 3 + 2] = pz + (Math.random() - 0.5) * SNOW_BOX_D; }
    var dx = arr[i * 3] - px, dz = arr[i * 3 + 2] - pz;
    if (dx > SNOW_BOX_W / 2) { arr[i * 3] -= SNOW_BOX_W; } else if (dx < -SNOW_BOX_W / 2) { arr[i * 3] += SNOW_BOX_W; }
    if (dz > SNOW_BOX_D / 2) { arr[i * 3 + 2] -= SNOW_BOX_D; } else if (dz < -SNOW_BOX_D / 2) { arr[i * 3 + 2] += SNOW_BOX_D; }
  }
  s.pts.geometry.attributes.position.needsUpdate = true;
}

// --- Neve nos CHECKPOINTS: montinhos de neve nas bordas de cada zona (instanciados) ---
function createCheckpointSnow() {
  var mats = [], m = new THREE.Matrix4(), q = new THREE.Quaternion(), pv = new THREE.Vector3(), sv = new THREE.Vector3();
  var ci, k;
  for (ci = 0; ci < G.checkpoints.length; ci++) {
    var cp = G.checkpoints[ci], w = cp.xMax - cp.xMin, h = cp.zMax - cp.zMin;
    for (k = 0; k < 16; k++) {
      var side = k % 4, tt = Math.random(), inset = 1.2 + Math.random() * 3.2, x, z;
      if (side === 0) { x = cp.xMin + tt * w; z = cp.zMin + inset; }
      else if (side === 1) { x = cp.xMin + tt * w; z = cp.zMax - inset; }
      else if (side === 2) { x = cp.xMin + inset; z = cp.zMin + tt * h; }
      else { x = cp.xMax - inset; z = cp.zMin + tt * h; }
      var r = 1.0 + Math.random() * 1.7;
      pv.set(x, 0.05, z);
      sv.set(r, r * 0.4, r);
      m.compose(pv, q, sv);
      mats.push(m.clone());
    }
  }
  if (!mats.length) { return; }
  var im = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshLambertMaterial({ color: 0xf6fbff }), mats.length);
  for (k = 0; k < mats.length; k++) { im.setMatrixAt(k, mats[k]); }
  im.instanceMatrix.needsUpdate = true;
  G.scene.add(im);
}
/* ---- FEEDBACK DE ALCANCE E DE ACERTO DAS SKILLS (so visual; nenhum alcance mudou) ---- */
function fxFadeMesh(mesh, mat, dur, peak) {
  spawnFx(dur, function (k) { mat.opacity = peak * (1 - k); }, function () {
    G.scene.remove(mesh);
    mesh.geometry.dispose();
    mat.dispose();
  });
}
function rangeMat(color, op) {
  return new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: op, side: THREE.DoubleSide, depthWrite: false });
}
// Disco preenchido + anel na AREA REAL (Pisao, Invulnerabilidade...).
function spawnRangeDisc(x, z, radius, color, dur) {
  var mat = rangeMat(color, 0.3), mesh = new THREE.Mesh(new THREE.CircleGeometry(radius, 40), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, 0.14, z);
  G.scene.add(mesh);
  fxFadeMesh(mesh, mat, dur || 0.7, 0.32);
  spawnAreaRing(x, z, radius, color);
}
// Cone (leque) do Empurrar: mesmo raio/abertura do golpe.
function spawnRangeSector(x, z, dirX, dirZ, range, angleDeg, color, dur) {
  var half = (angleDeg / 2) * Math.PI / 180, segs = 18, pos = [0, 0, 0], idx = [], i;
  for (i = 0; i <= segs; i++) {
    var a = -half + 2 * half * (i / segs);
    pos.push(Math.sin(a) * range, 0, Math.cos(a) * range);
  }
  for (i = 1; i <= segs; i++) { idx.push(0, i, i + 1); }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  var mat = rangeMat(color, 0.38), mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, 0.14, z);
  mesh.rotation.y = Math.atan2(dirX, dirZ);
  G.scene.add(mesh);
  fxFadeMesh(mesh, mat, dur || 0.6, 0.4);
}
// Faixa reta ate o alcance maximo (Jato, Folhas, Dash).
function spawnRangeLane(x, z, dirX, dirZ, range, width, color, dur) {
  var mat = rangeMat(color, 0.3), mesh = new THREE.Mesh(new THREE.BoxGeometry(width, 0.2, range), mat);
  mesh.position.set(x + dirX * range / 2, 0.14, z + dirZ * range / 2);
  mesh.rotation.y = Math.atan2(dirX, dirZ);
  G.scene.add(mesh);
  fxFadeMesh(mesh, mat, dur || 0.5, 0.34);
}
/* ---- EFEITOS DE SKILL (so visual; nenhum alcance/hitbox mudou) ---- */
// EMPURRAR (Besta): onda de AR cor de areia, como um soco no ar - 3 paredes curvas (cilindro aberto
// no mesmo angulo do golpe) que se expandem ate o alcance real, mais um clarao no punho e poeira.
var SAND_LIGHT = 0xf0c56e;
var SAND_DARK = 0xc9903f;
function spawnPushWave(px, pz, dirX, dirZ, range, angleDeg) {
  var half = (angleDeg / 2) * Math.PI / 180, yaw = Math.atan2(dirX, dirZ), i;
  var TOTAL = 0.8;
  var waves = [
    { delay: 0.0, span: 0.5, h: 7.0, col: SAND_LIGHT, op: 0.9 },
    { delay: 0.12, span: 0.5, h: 5.5, col: SAND_DARK, op: 0.78 },
    { delay: 0.24, span: 0.5, h: 4.0, col: SAND_LIGHT, op: 0.65 }
  ];
  var meshes = [], mats = [], rings = [], rMats = [];
  for (i = 0; i < waves.length; i++) {
    var w = waves[i];
    var geo = new THREE.CylinderGeometry(1.3, 1, w.h, 22, 1, true, -half, half * 2); // topo mais largo = onda 'inclinada' pra frente
    var mat = new THREE.MeshBasicMaterial({ color: w.col, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    var grp = new THREE.Group();
    grp.position.set(px, 0, pz);
    grp.rotation.y = yaw;
    grp.visible = false;
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = w.h / 2 + 0.3;
    grp.add(mesh);
    // faixa de areia no CHAO sob a parede (a camera do jogo olha de cima)
    var rMat = new THREE.MeshBasicMaterial({ color: w.col, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    var ring = new THREE.Mesh(new THREE.RingGeometry(0.76, 1, 24, 1, -Math.PI / 2 - half, half * 2), rMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.22;
    grp.add(ring);
    G.scene.add(grp);
    meshes.push(grp); mats.push(mat); rings.push(ring); rMats.push(rMat);
  }
  // clarao do "soco": esfera achatada de areia que estoura na frente do Axie
  var fMat = new THREE.MeshBasicMaterial({ color: 0xfff1c9, transparent: true, opacity: 0.9, depthWrite: false });
  var flash = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 9), fMat);
  flash.position.set(px + dirX * 5, 3.2, pz + dirZ * 5);
  G.scene.add(flash);
  // poeira/areia soprada pra frente dentro do cone
  var dMat = new THREE.MeshBasicMaterial({ color: SAND_DARK, transparent: true, opacity: 0.85, depthWrite: false });
  var dGeo = new THREE.BoxGeometry(1, 1, 1);
  var parts = [];
  for (i = 0; i < 22; i++) {
    var a = (Math.random() * 2 - 1) * half * 0.95;
    var pm = new THREE.Mesh(dGeo, dMat);
    pm.scale.set(0.9 + Math.random() * 0.9, 0.5 + Math.random() * 0.6, 0.9 + Math.random() * 0.9);
    G.scene.add(pm);
    parts.push({ m: pm, ang: yaw + a, spd: range * (0.9 + Math.random() * 0.6), y0: 0.8 + Math.random() * 3.5, spin: Math.random() * 4 });
  }
  spawnFx(TOTAL, function (k) {
    var tt = k * TOTAL, j;
    for (j = 0; j < waves.length; j++) {
      var wv = waves[j], kk = (tt - wv.delay) / wv.span;
      if (kk <= 0) { continue; }
      if (kk > 1) { kk = 1; }
      var e = 1 - (1 - kk) * (1 - kk); // desacelera perto do alcance
      var r = 3 + (range - 3) * e;
      meshes[j].visible = true;
      meshes[j].scale.set(r, 1, r);
      mats[j].opacity = wv.op * 0.85 * (1 - kk * kk);
      rMats[j].opacity = wv.op * (1 - kk * kk);
    }
    var fk = Math.min(1, tt / 0.28);
    var fs = 2 + fk * 7;
    flash.scale.set(fs, fs * 0.7, fs);
    fMat.opacity = 0.9 * (1 - fk);
    var pk = Math.min(1, tt / 0.7), pe = 1 - (1 - pk) * (1 - pk);
    var q;
    for (q = 0; q < parts.length; q++) {
      var pt = parts[q], d = 3 + pt.spd * pe;
      pt.m.position.set(px + Math.sin(pt.ang) * d, pt.y0 + Math.sin(pk * Math.PI) * 2, pz + Math.cos(pt.ang) * d);
      pt.m.rotation.y = pt.spin * pk;
    }
    dMat.opacity = 0.85 * (1 - pk * pk);
  }, function () {
    var j, q;
    for (j = 0; j < meshes.length; j++) { G.scene.remove(meshes[j]); meshes[j].children[0].geometry.dispose(); rings[j].geometry.dispose(); mats[j].dispose(); rMats[j].dispose(); }
    G.scene.remove(flash); flash.geometry.dispose(); fMat.dispose();
    for (q = 0; q < parts.length; q++) { G.scene.remove(parts[q].m); }
    dGeo.dispose(); dMat.dispose();
  });
}
// CUSPE (Aquatica): esfera de agua que sai do Axie, sobe num arco curto e CAI rapido no alvo;
// o respingo aparece quando ela toca o chao (a poca em si continua imediata, so o visual e animado).
function spawnSpitBall(fromX, fromZ, toX, toZ, onLand) {
  var mat = new THREE.MeshBasicMaterial({ color: 0x35b0ff });
  var ball = new THREE.Mesh(new THREE.SphereGeometry(2.3, 14, 10), mat);
  var outMat = new THREE.MeshBasicMaterial({ color: 0x1257a8, side: THREE.BackSide });
  var outline = new THREE.Mesh(new THREE.SphereGeometry(2.3 * 1.14, 14, 10), outMat); // contorno escuro (legivel sobre a neve)
  ball.add(outline);
  var hiMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var hi = new THREE.Mesh(new THREE.SphereGeometry(0.65, 8, 6), hiMat);
  hi.position.set(-0.8, 1.0, 0.9);
  ball.add(hi);
  ball.position.set(fromX, 3.2, fromZ);
  G.scene.add(ball);
  var dist = Math.sqrt((toX - fromX) * (toX - fromX) + (toZ - fromZ) * (toZ - fromZ));
  var peak = 13 + Math.min(dist, 160) * 0.08; // arco alto o bastante pra passar por cima das paredes
  spawnFx(0.4, function (k) {
    var y = 3.2 + (0.8 - 3.2) * k + peak * 4 * k * (1 - k);
    ball.position.set(fromX + (toX - fromX) * k, y, fromZ + (toZ - fromZ) * k);
    var st = k > 0.7 ? 1 + (k - 0.7) * 0.9 : 1; // estica um pouco na queda
    ball.scale.set(1 / Math.sqrt(st), st, 1 / Math.sqrt(st));
  }, function () {
    G.scene.remove(ball);
    ball.geometry.dispose(); hi.geometry.dispose(); outline.geometry.dispose(); mat.dispose(); hiMat.dispose(); outMat.dispose();
    spawnRangeDisc(toX, toZ, SPIT_RADIUS * 0.55, 0x9fe8ff, 0.35); // respingo pequeno (menor que a poca; nao engana sobre a area real)
    if (onLand) { onLand(); }
  });
}
// Feedback ao ser ATINGIDO: anel/flash colorido no alvo, etiqueta com a causa acima do Axie
// (nameplate) e, se for o jogador, flash colorido na tela + mensagem dizendo o que o acertou.
var HIT_FX = {
  leaf:  { color: 0x6de35a },
  jet:   { color: 0x4fc3ff },
  push:  { color: 0xffb347 },
  stomp: { color: 0xff9d2e },
  spit:  { color: 0x4fc3ff },
  dash:  { color: 0x7de35a }
};
function cssColor(hex) { return '#' + ('000000' + hex.toString(16)).slice(-6); }
function hitFlash(hex) {
  var el = document.getElementById('hit-flash');
  if (!el) { return; }
  el.style.setProperty('--hit', cssColor(hex));
  el.classList.remove('active');
  void el.offsetWidth; // reinicia a animacao
  el.classList.add('active');
}
function feedbackHit(m, kind) {
  var fx = HIT_FX[kind];
  if (!fx || !m || !m.position) { return; }
  spawnAreaRing(m.position.x, m.position.z, 7, fx.color);
  spawnEffectBurst(m.position.x, m.position.z, fx.color);
  m.hitTag = { kind: kind, color: fx.color, until: G.totalTime + 1.3 };
  if (m === G.player) { hitFlash(fx.color); showMessage(TXT('hit.' + kind + '.text'), 1.8); }
}
/* =========================== CRIACAO DA CENA ============================= */

function createGround(bounds) {
  var size = bounds.half * 2 + 60;
  var geo = new THREE.PlaneGeometry(size, size, 1, 1);
  // Chao = GELO azulado (nao neve branca): base fria; a luz do jogo clareia ~1.4x.
  var mat = new THREE.MeshPhongMaterial({ color: 0x6aa6c4, specular: 0x6fa8c8, shininess: 45 });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(bounds.centerX, 0, bounds.centerZ);
  G.scene.add(mesh);
}

// Constroi a geometria de uma fita reta (triangle strip manual) seguindo a
// lista de pontos. "widths" e um array com uma largura por ponto (mesmo
// tamanho de "points"), permitindo uma fita com afinamento gradual.
function buildRibbonGeometry(points, widths) {
  var positions = [];
  var i;
  for (i = 0; i < points.length - 1; i++) {
    var p0 = points[i];
    var p1 = points[i + 1];
    var dx = p1.x - p0.x;
    var dz = p1.z - p0.z;
    var len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.0001) { continue; }
    var nx = -dz / len;
    var nz = dx / len;
    var half0 = widths[i] / 2;
    var half1 = widths[i + 1] / 2;

    var ax = p0.x + nx * half0, az = p0.z + nz * half0;
    var bx = p0.x - nx * half0, bz = p0.z - nz * half0;
    var cx = p1.x + nx * half1, cz = p1.z + nz * half1;
    var ddx = p1.x - nx * half1, ddz = p1.z - nz * half1;

    positions.push(ax, 0, az, bx, 0, bz, cx, 0, cz);
    positions.push(bx, 0, bz, ddx, 0, ddz, cx, 0, cz);
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

// Cria a pista visivel: acostamento de gelo ESCURO/azulado (mais largo,
// embaixo) e pista de gelo CLARO e brilhante (mais estreita, por cima) -
// contraste bem visivel e transmite a superficie escorregadia. A largura
// afina gradualmente da volta mais externa para a mais interna
// (trackWidthAtCornerIndex). Nas quinas, o remendo ocupa toda a area livre
// da quina (ate trimForCorner), entao o checkpoint nao fica isolado num
// circulinho no meio de um quadrado vazio.
function createTrackVisuals(corners) {
  var i;
  var trackWidths = [];
  var shoulderWidths = [];
  for (i = 0; i < corners.length; i++) {
    var w = trackWidthAtCornerIndex(i);
    trackWidths.push(w);
    shoulderWidths.push(w + SHOULDER_WIDTH * 2);
  }

  var darkMat = new THREE.MeshPhongMaterial({ color: 0x2f6f98, specular: 0x4f8fb5, shininess: 40 }); // gelo fundo (acostamento)
  var darkGeo = buildRibbonGeometry(corners, shoulderWidths);
  var darkMesh = new THREE.Mesh(darkGeo, darkMat);
  darkMesh.position.y = 0.04;
  G.scene.add(darkMesh);

  // gelo POLIDO da trilha: azul-claro translucido com brilho especular (nada de tapete de neve)
  var lightMat = new THREE.MeshPhongMaterial({ color: 0x78afc8, specular: 0xbfe6ff, shininess: 80 });
  var lightGeo = buildRibbonGeometry(corners, trackWidths);
  var lightMesh = new THREE.Mesh(lightGeo, lightMat);
  lightMesh.position.y = 0.05;
  G.scene.add(lightMesh);

  // Gelo do checkpoint: um pouco mais escuro/grosso que o gelo fino da
  // trilha, para o jogador identificar de longe onde e o checkpoint.
  // CHECKPOINT = NEVE (branca, fosca) por cima do gelo, pra se distinguir bem da trilha.
  var checkpointMat = new THREE.MeshLambertMaterial({ color: 0xe9f0f4 });

  // Remenda as quinas (exceto a quina 0, que ja ganha seu proprio circulo
  // bem maior em createStartArea) para nao deixar frestas na mudanca de
  // direcao e para o remendo (gelo do checkpoint) cobrir toda a area livre
  // da quina.
  // A penultima quina de toda a espiral nao e um checkpoint (ver
  // createCheckpoints) - seu remendo usa a cor normal da trilha (lightMat),
  // nao a cor de checkpoint, pra ela ler visualmente como "so uma curva",
  // nao como um lugar pra parar.
  // O remendo usa EXATAMENTE a mesma zona RETANGULAR usada pela deteccao
  // (computeCheckpointZone, ja encolhida por clampZoneToRealWalls) - antes
  // este remendo usava a versao CRUA (computeCheckpointZoneRaw, maior),
  // fazendo o desenho do checkpoint parecer bem maior do que a area onde
  // ele de fato registrava (reportado pelo usuario: "so ativa pelas
  // quinas"). Usando a mesma zona nos dois lugares, area visual e area de
  // deteccao ficam sempre identicas - e como clampZoneToRealWalls ja avanca
  // o quanto for fisicamente possivel sem cruzar uma parede de verdade, o
  // remendo tambem nunca ultrapassa os limites da trilha.
  var skipCornerIndex = corners.length - 2;
  for (i = 1; i < corners.length; i++) {
    var zone = computeCheckpointZone(corners, i);
    var zoneW = zone.xMax - zone.xMin, zoneH = zone.zMax - zone.zMin;
    var centerX = (zone.xMin + zone.xMax) / 2, centerZ = (zone.zMin + zone.zMax) / 2;
    var innerW = Math.max(trackWidths[i], zoneW - 8);
    var innerH = Math.max(trackWidths[i], zoneH - 8);
    // Material PROPRIO (clone) por checkpoint, nao o checkpointMat
    // compartilhado - precisa poder mudar de cor no feedback de "ativado"
    // (ver triggerCheckpointFeedback) sem afetar todos os outros
    // checkpoints ao mesmo tempo (eles usariam o mesmo objeto de material).
    var patchMat = (i === skipCornerIndex) ? lightMat : checkpointMat.clone();

    var darkPatchGeo = new THREE.PlaneGeometry(zoneW, zoneH);
    var darkPatch = new THREE.Mesh(darkPatchGeo, darkMat);
    darkPatch.rotation.x = -Math.PI / 2;
    darkPatch.position.set(centerX, 0.045, centerZ);
    G.scene.add(darkPatch);

    var lightPatchGeo = new THREE.PlaneGeometry(innerW, innerH);
    var lightPatch = new THREE.Mesh(lightPatchGeo, patchMat);
    lightPatch.rotation.x = -Math.PI / 2;
    lightPatch.position.set(centerX, 0.052, centerZ);
    if (i !== skipCornerIndex) {
      G.checkpointGroundVisuals[i] = { mesh: lightPatch, mat: patchMat };
    }
    G.scene.add(lightPatch);
  }
}

// Cria uma formacao de gelo 3D real (com altura) entre dois pontos - e
// tambem registra o colisor solido correspondente, para que a barreira
// seja fisica de verdade.
function createDuneWallMesh(ax, az, bx, bz, mat) {
  var dx = bx - ax, dz = bz - az;
  var len = Math.sqrt(dx * dx + dz * dz);
  if (len < 0.5) { return; }
  var midX = (ax + bx) / 2, midZ = (az + bz) / 2;
  var angle = Math.atan2(dz, dx);
  // Blocos de gelo estilo iglu com neve em cima (colisor inalterado).
  var geo = makeIceWallGeometry(len, DUNE_HEIGHT, DUNE_BASE_WIDTH);
  var mesh = new THREE.Mesh(geo, getIceWallMats());
  mesh.position.set(midX, 0, midZ);
  mesh.rotation.y = -angle;
  G.scene.add(mesh);
}

// Visual de uma barreira "parede parcial" - pedido do usuario: precisa
// parecer PARTE DA TRILHA, nao um bloco soltos no meio dela, entao usa
// EXATAMENTE a mesma geometria/espessura/cor das paredes de verdade
// (DUNE_HEIGHT, DUNE_BASE_WIDTH, mesmo material de createDuneWallMesh) -
// so o comprimento e menor (nunca a largura toda da trilha, ver o local
// que chama esta funcao). NAO e mais um perigo que mata ao tocar - agora e
// um BLOCO SOLIDO de verdade (ver addWallSegment no local que chama esta
// funcao), o jogador e os lobos precisam contornar, igual as paredes
// laterais.
function createBarrierObstacleMesh(ax, az, bx, bz, mat) {
  var dx = bx - ax, dz = bz - az;
  var len = Math.sqrt(dx * dx + dz * dz);
  if (len < 0.5) { return; }
  var midX = (ax + bx) / 2, midZ = (az + bz) / 2;
  var angle = Math.atan2(dz, dx);
  var geo = makeIceWallGeometry(len, DUNE_HEIGHT, DUNE_BASE_WIDTH);
  var mesh = new THREE.Mesh(geo, getIceWallMats());
  mesh.position.set(midX, 0, midZ);
  mesh.rotation.y = -angle;
  G.scene.add(mesh);
  return mesh; // guardado na barreira pra poder remove-la (ver ensureTrackPassable)
}

// Para cada trecho reto da espiral, cria UMA duna no lado que fica voltado
// para fora do centro do mapa. Como cada intervalo entre duas trilhas
// paralelas so e "de fora" para uma delas, isso cobre automaticamente os
// dois lados de toda trilha, sem duplicar geometria. A duna fica bem perto
// de cada quina (so sobra o espaco exato do oasis), entao nao ha atalho.
//
// O lado "de fora" e calculado de forma 100% DETERMINISTICA a partir da
// PROPRIA direcao do trecho, sem depender de nenhum centro/caixa
// delimitadora global: como a espiral gira sempre no mesmo sentido (direita
// -> baixo -> esquerda -> cima, repetindo), o lado de fora de QUALQUER
// trecho e sempre o mesmo, fixo, em relacao a direcao de quem anda por ele
// (girar a direcao 90 graus no sentido anti-horario: (ux,uz) -> (uz,-ux)).
// Uma versao anterior usava o vetor do centro da caixa delimitadora do mapa
// ate o meio de cada trecho para decidir o lado - isso funciona para os
// trechos mais externos (onde esse centro aproxima bem o centro real da
// espiral), mas e uma heuristica fragil: numa espiral quadrada que encolhe,
// o "centro verdadeiro" de cada volta interna vai se afastando do centro da
// caixa delimitadora, arriscando escolher o lado ERRADO perto do centro (o
// que deixa duas voltas vizinhas com a duna do MESMO lado, expondo o outro
// lado por completo e permitindo pular quinas/checkpoints). A formula local
// abaixo nao tem esse risco: e sempre correta, em qualquer volta.
// Borda IRREGULAR das trilhas, pedido do usuario: em vez de uma unica
// parede reta por trecho, cada parede e desenhada em varios pedacinhos
// retos (~TRACK_EDGE_JITTER_SEGMENT_LEN cada), com um pequeno desvio pra
// DENTRO da trilha (nunca pra fora) que varia suavemente ao longo do
// trecho - um leve "serpentear" da borda. Objetivo: quem anda colado bem
// na borda de vez em quando esbarra num desses pontos mais estreitos,
// incentivando passar mais pelo centro, sem quebrar a legibilidade (o
// desvio e pequeno) nem abrir nenhum buraco (o desvio SO encolhe a
// trilha, nunca alarga - a folga ate a trilha vizinha so pode aumentar,
// nunca diminuir, entao continua impossivel pular de uma trilha pra
// outra). legLateralBounds (mais abaixo) reserva uma margem extra do
// tamanho do desvio maximo, garantindo que nenhum obstaculo/lobo nasca
// num ponto que a onda possa alcancar.
var TRACK_EDGE_JITTER_SEGMENT_LEN = 26;
// Fortalecido a pedido do usuario (era 5) - ondulacao basica mais
// pronunciada em toda trilha.
var TRACK_EDGE_JITTER_MAX = 8;
// A ULTIMA volta da espiral (a mais dificil, pedido do usuario) usa um
// pouco mais de deformacao que o resto - ainda jogavel, so mais dificil de
// colar na borda.
var TRACK_EDGE_JITTER_LAST_LOOP_BOOST = 1.3;
// Saliencias ESPARSAS e bem mais exageradas que a ondulacao normal (pedido
// do usuario: "poucas irregularidades, exagere mais") - so em pernas cujo
// indice cai num padrao raro (1 a cada 4), numa faixa estreita no meio do
// trecho; o resto da perna continua na ondulacao normal, mais discreta.
var TRACK_EDGE_JITTER_SPIKE_MULT = 2;
var TRACK_EDGE_JITTER_SPIKE_WIDTH = 0.06; // fracao do trecho (bem estreito, fica pontual)
// Nenhum desvio perto o bastante de QUALQUER quina - a zona de deteccao do
// checkpoint (clampZoneToRealWalls) escaneia a parede de verdade partindo
// do centro da quina, e so alcanca uma distancia da ordem de DUNE_OFFSET
// (bem menor que isso). Se a parede ficasse ondulada logo ali, esse
// escaneamento podia ler a parede "mais perto" do que devia bem na hora de
// medir a zona, colapsando o checkpoint pra quase nada (bug real,
// confirmado: zona virou um unico ponto). Por isso o desvio nasce em ZERO
// em cada ponta do trecho (logo apos o trim) e so cresce ate o maximo
// depois de TRACK_EDGE_JITTER_FADE_DIST unidades - bem mais longe do que
// qualquer checkpoint jamais escaneia.
var TRACK_EDGE_JITTER_FADE_DIST = 70;

function legJitterHasSpike(legIndex) {
  return (legIndex % 4) === 1;
}
function legJitterBaseAmp(legIndex) {
  var amp = TRACK_EDGE_JITTER_MAX;
  if (legIndex >= CENTER_WIDEN_FROM_LEG) { amp *= TRACK_EDGE_JITTER_LAST_LOOP_BOOST; }
  return amp;
}
// Pior caso possivel DESSA perna especifica (nao mais um pior-caso GLOBAL
// aplicado em toda parte, que desperdicava espaco jogavel em pernas sem
// nenhuma saliencia e fora da ultima volta - a grande maioria) - usado por
// legLateralBounds pra reservar so a margem de seguranca que ESSA perna
// pode realmente precisar, garantindo que nenhum perigo nasca onde a onda,
// no pico mais exagerado dela, possa alcancar.
function trackEdgeJitterMaxForLeg(legIndex) {
  var amp = legJitterBaseAmp(legIndex);
  if (legJitterHasSpike(legIndex)) { amp *= TRACK_EDGE_JITTER_SPIKE_MULT; }
  return amp;
}
function trackEdgeJitter(legIndex, t) {
  var freq = 2.3 + (legIndex % 5) * 0.37;
  var phase = legIndex * 1.7;
  var wave = Math.sin(t * freq * Math.PI * 2 + phase) * 0.5 + 0.5; // 0..1, nunca negativo

  var amp = legJitterBaseAmp(legIndex);

  // Saliencia esparsa: 1 a cada 4 pernas, centrada num ponto que varia por
  // perna (pra nao ficar sempre bem no meio, mais organico), suavizada nas
  // bordas da propria saliencia (spikeT^2) pra nao criar uma quina visual
  // dura.
  if (legJitterHasSpike(legIndex)) {
    var spikeCenter = 0.5 + (((legIndex * 37) % 100) / 100 - 0.5) * 0.3;
    var distFromSpike = Math.abs(t - spikeCenter);
    if (distFromSpike < TRACK_EDGE_JITTER_SPIKE_WIDTH) {
      var spikeT = 1 - (distFromSpike / TRACK_EDGE_JITTER_SPIKE_WIDTH);
      amp *= 1 + (TRACK_EDGE_JITTER_SPIKE_MULT - 1) * (spikeT * spikeT);
    }
  }

  return wave * amp;
}

// Desenha (visual + colisor) a parede de UM lado de UM trecho reto, do
// ponto ja aparado pelo trim (sax/saz) ate o outro (sbx/sbz), subdividida
// em varios pedacinhos com o desvio ondulado de trackEdgeJitter aplicado a
// cada ponto de quebra - usada tanto por createDuneWalls (lado de fora)
// quanto por createInnerCap (lado de dentro da ultima volta), so mudando
// qual normal (nx,nz) e offset de base sao passados.
function createWavyOffsetWall(a, b, legIndex, trimA, trimB, offsetBase, nx, nz, mat) {
  var dx = b.x - a.x, dz = b.z - a.z;
  var len = Math.sqrt(dx * dx + dz * dz);
  if (len < trimA + trimB + 6) { return; }
  var fracA = trimA / len;
  var fracB = 1 - trimB / len;
  var sax = a.x + dx * fracA, saz = a.z + dz * fracA;
  var sbx = a.x + dx * fracB, sbz = a.z + dz * fracB;
  var spanLen = len * (fracB - fracA);
  var segCount = Math.max(1, Math.round(spanLen / TRACK_EDGE_JITTER_SEGMENT_LEN));
  var s, prevX = null, prevZ = null;
  for (s = 0; s <= segCount; s++) {
    var segT = s / segCount;
    var px = sax + (sbx - sax) * segT, pz = saz + (sbz - saz) * segT;
    var tGlobal = fracA + (fracB - fracA) * segT;
    var distFromA = segT * spanLen;
    var distFromB = (1 - segT) * spanLen;
    var fade = Math.min(distFromA, distFromB, TRACK_EDGE_JITTER_FADE_DIST) / TRACK_EDGE_JITTER_FADE_DIST;
    var jitter = trackEdgeJitter(legIndex, tGlobal) * fade;
    var effOffset = offsetBase - jitter;
    var wx = px + nx * effOffset, wz = pz + nz * effOffset;
    if (prevX !== null) {
      createDuneWallMesh(prevX, prevZ, wx, wz, mat);
      addWallSegment(prevX, prevZ, wx, wz, DUNE_BASE_WIDTH / 2);
    }
    prevX = wx; prevZ = wz;
  }
}

function createDuneWalls(corners) {
  var mat = new THREE.MeshLambertMaterial({ color: 0x9FDCF0 });
  var i;
  for (i = 0; i < corners.length - 1; i++) {
    var a = corners[i], b = corners[i + 1];
    var dx = b.x - a.x, dz = b.z - a.z;
    var len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.0001) { continue; }
    var ux = dx / len, uz = dz / len;
    var nx = uz, nz = -ux; // sempre "para fora" - ver prova geometrica no comentario acima
    createWavyOffsetWall(a, b, i, trimForCorner(i), trimForCorner(i + 1), DUNE_OFFSET, nx, nz, mat);
  }
}

// Distancia "segura" para as paredes dos lados FECHADOS de uma quina
// (createCornerCollars): precisa alcancar pelo menos ate DUNE_OFFSET (onde
// fica a duna do corredor de verdade), nao so ate trimForCorner - senao,
// quando DUNE_OFFSET > trim, sobra uma faixa sem NENHUMA parede entre o
// quadrado do checkpoint e a duna do corredor vizinho, por onde da pra
// "cortar" a quina sem nunca tocar o checkpoint (bug ja encontrado e
// corrigido - ver o teste de alcancabilidade/BFS completo). Ver
// createCornerCollars para como isso e usado (tanto na distancia
// perpendicular quanto no proprio comprimento tangencial da parede, para que
// paredes de lados fechados vizinhos se encontrem na diagonal sem furo, e
// para que encontrem a duna real de um lado aberto vizinho sem furo).
function safeCollarOffset(i) {
  return Math.max(trimForCorner(i), DUNE_OFFSET) + 2;
}

// So para quinas encostadas na sala alargada do centro (ver
// CENTER_WIDEN_OFFSET_BY_LEG): o colar padrao (safeCollarOffset) alcanca
// so ate DUNE_OFFSET, mas o lado de DENTRO (alargado) de uma perna vizinha
// pode ir bem mais longe (CENTER_WIDEN_OFFSET, ~quase o dobro) - se o
// colar do lado FECHADO que corresponde a essa mesma direcao parar no "off"
// padrao, sobra um vao na DIAGONAL entre os dois (mesma familia do vao
// diagonal ja visto nos checkpoints) - bug real, reportado pelo usuario
// como "2 caminhos possiveis no inicio". IMPORTANTE: isso so vale para a
// direcao FECHADA que e EXATAMENTE o lado de DENTRO de uma das duas pernas
// vizinhas desta quina - as outras direcoes fechadas continuam usando o
// "off" padrao (testado e confirmado: usar o valor maior em TODAS as
// direcoes fechadas, nao so a certa, fazia o colar de outro lado esticar
// tao longe que passava perto de OUTRA quina de uma volta bem diferente da
// espiral, colapsando a zona de deteccao dela).
function closedDirCollarOffset(corners, i, dir) {
  var off = safeCollarOffset(i);
  var legs = [i - 1, i];
  var l;
  for (l = 0; l < legs.length; l++) {
    var legIndex = legs[l];
    if (legIndex < 0 || legIndex >= corners.length - 1) { continue; }
    var pa = corners[legIndex], pb = corners[legIndex + 1];
    var dx = pb.x - pa.x, dz = pb.z - pa.z;
    var len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.0001) { continue; }
    var ux = dx / len, uz = dz / len;
    var innerNx = -uz, innerNz = ux; // mesma convencao de createInnerCap
    if (Math.abs(dir.x - innerNx) < 0.001 && Math.abs(dir.z - innerNz) < 0.001) {
      off = Math.max(off, innerOffsetForLeg(legIndex) + 2);
    }
  }
  return off;
}

// Fecha o lado de DENTRO da ULTIMA volta da espiral. Normalmente, cada
// trecho reto so precisa de UMA duna (no lado de fora), porque o lado de
// dentro de qualquer volta e automaticamente coberto pela duna de FORA da
// proxima volta, mais interna (createDuneWalls ja documenta isso). Mas a
// ULTIMA volta nao tem uma "volta ainda mais interna" para fornecer essa
// duna complementar - sem esta funcao, o lado de dentro da ultima volta
// ficava completamente aberto, criando um buraco perto do centro do mapa
// por onde dava pra cortar caminho entre trechos da ultima volta (inclusive
// alcancando o checkpoint final sem passar pelos anteriores). Isso e
// exatamente simetrico ao papel que createMapBorder ja faz do lado de FORA
// da primeira volta (que tambem nao tem uma "volta anterior" para protege-la).
function createInnerCap(corners) {
  var mat = new THREE.MeshLambertMaterial({ color: 0x9FDCF0 });
  var lastLoopStart = CENTER_WIDEN_FROM_LEG;
  var i;
  for (i = lastLoopStart; i < corners.length - 1; i++) {
    var a = corners[i], b = corners[i + 1];
    var dx = b.x - a.x, dz = b.z - a.z;
    var len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.0001) { continue; }
    var ux = dx / len, uz = dz / len;
    var nx = -uz, nz = ux; // lado de DENTRO - oposto ao "para fora" de createDuneWalls
    var offset = innerOffsetForLeg(i); // alargado nesta ultima volta (ver CENTER_WIDEN_OFFSET)
    createWavyOffsetWall(a, b, i, trimForCorner(i), trimForCorner(i + 1), offset, nx, nz, mat);
  }
}

// Fecha as aberturas que sobram em cada quina da espiral, INCLUINDO a
// primeira (inicio) e a ultima (centro). As dunas de createDuneWalls()
// cobrem o meio de cada trecho reto, mas param antes de cada quina (para
// nao trancar o oasis) - isso deixava uma fresta livre perto da quina por
// onde dava para atravessar direto para o corredor vizinho, ou (no caso da
// quina inicial) sair em qualquer direcao em vez de seguir o unico caminho
// certo. Como toda a espiral e feita so de trechos alinhados aos eixos
// (direita/baixo/esquerda/cima), toda quina e um angulo reto entre 4
// direcoes cardeais possiveis: no maximo 2 delas sao o caminho real (por
// onde a pista chega e por onde ela sai) e as demais precisam ficar
// fechadas com duna. A quina inicial (sem "chegada") so tem 1 lado aberto -
// o unico caminho possivel para fora do inicio. A quina central (sem
// "saida") tambem so tem 1 lado aberto - o caminho de volta.
// Quinas de dentro da sala alargada do centro (ver CENTER_WIDEN_OFFSET_BY_LEG)
// cujo colar de lado FECHADO (safeCollarOffset, pequeno) ficou redundante: a
// sala inteira ja e cercada pelas paredes bem mais afastadas dos trechos
// alargados, entao esse colar pequeno so sobrava isolado no meio do piso
// grande - dava a impressao de "parede aleatoria" solta no meio do nada
// (reportado pelo usuario apos o alargamento). A quina 20 NAO entra aqui de
// proposito: seu colar fica bem na fronteira entre a sala alargada e o
// resto (nao-alargado) da espiral, e removê-lo abre atalhos de verdade
// (confirmado via BFS de alcancabilidade - 10 skips apareceram removendo so
// o dela). So a penultima quina (corners.length-2) e inteiramente interna a
// sala e foi confirmada segura para remover (0 skips).
// A ULTIMA quina (corners.length-1) NAO entra mais aqui: depois da inversao
// de inicio/fim, ela virou o INICIO de verdade (createStartArea) - e o fim
// literal do caminho, sem nenhuma perna alem dela pra fornecer paredes "de
// borda" que a cercassem por tabela (ao contrario da penultima quina, que
// tem a ultima logo depois). Remover o colar dela deixava um lado inteiro
// (a direcao fechada sem NENHUMA parede) livre pra sair andando direto pra
// fora do inicio, sem limite - bug real reportado pelo usuario ("area
// aberta a esquerda no inicio"), confirmado andando 180+ unidades sem
// esbarrar em nada. Colar restaurado; ver safeCollarOffset (fica bem alem
// do raio do proprio inicio, START_RADIUS, entao nao invade a area segura).
var REDUNDANT_COLLAR_CORNERS = {};
REDUNDANT_COLLAR_CORNERS[NUM_TURNS + EXTRA_END_LEGS - 1] = true;

function createCornerCollars(corners) {
  var mat = new THREE.MeshLambertMaterial({ color: 0x9FDCF0 });
  var cardinals = [ { x: 1, z: 0 }, { x: 0, z: 1 }, { x: -1, z: 0 }, { x: 0, z: -1 } ];
  var i;
  for (i = 0; i < corners.length; i++) {
    if (REDUNDANT_COLLAR_CORNERS[i]) { continue; }
    var cur = corners[i];

    var openA = null, openB = null;
    if (i > 0) {
      var prev = corners[i - 1];
      var dx = cur.x - prev.x, dz = cur.z - prev.z;
      var len = Math.sqrt(dx * dx + dz * dz);
      if (len > 0.0001) { openA = { x: -dx / len, z: -dz / len }; } // -din: de onde a pista veio
    }
    if (i < corners.length - 1) {
      var next = corners[i + 1];
      var dx2 = next.x - cur.x, dz2 = next.z - cur.z;
      var len2 = Math.sqrt(dx2 * dx2 + dz2 * dz2);
      if (len2 > 0.0001) { openB = { x: dx2 / len2, z: dz2 / len2 }; } // dout: para onde a pista vai
    }

    var c;
    for (c = 0; c < cardinals.length; c++) {
      var dir = cardinals[c];
      var isOpenA = openA && Math.abs(dir.x - openA.x) < 0.001 && Math.abs(dir.z - openA.z) < 0.001;
      var isOpenB = openB && Math.abs(dir.x - openB.x) < 0.001 && Math.abs(dir.z - openB.z) < 0.001;
      if (isOpenA || isOpenB) { continue; }

      // A parede de um lado FECHADO fica na distancia "segura" (off, ver
      // safeCollarOffset/closedDirCollarOffset) tanto na perpendicular (o
      // quao longe da quina) quanto no proprio comprimento tangencial (o
      // quanto ela se estende para os lados). Usar "off" nos dois eixos (em
      // vez de so trim) faz com que a parede de um lado fechado alcance
      // exatamente ate onde a duna de um lado ABERTO vizinho comeca
      // (createDuneWalls tambem usa DUNE_OFFSET), ou ate a parede do
      // PROXIMO lado fechado (que usa o mesmo "off"), sem sobrar nenhuma
      // fresta na diagonal entre os dois. closedDirCollarOffset so usa um
      // "off" maior (alargado) na direcao FECHADA que realmente precisa
      // dele (o lado de DENTRO de uma perna vizinha alargada) - as outras
      // direcoes fechadas desta mesma quina continuam no "off" padrao, bem
      // menor, pra nao esticar demais rumo a alguma quina de outra volta.
      var off = closedDirCollarOffset(corners, i, dir);
      var tx = -dir.z, tz = dir.x;
      var baseX = cur.x + dir.x * off;
      var baseZ = cur.z + dir.z * off;
      var p1x = baseX + tx * off, p1z = baseZ + tz * off;
      var p2x = baseX - tx * off, p2z = baseZ - tz * off;

      createDuneWallMesh(p1x, p1z, p2x, p2z, mat);
      addWallSegment(p1x, p1z, p2x, p2z, DUNE_BASE_WIDTH / 2);
    }
  }
}

// Borda alta de formacoes de gelo, continua nas 4 bordas do mapa quadrado -
// impede o jogador de sair do mapa.
function createMapBorder(bounds) {
  var half = bounds.half, cx = bounds.centerX, cz = bounds.centerZ;
  var thickness = 12;
  var height = DUNE_HEIGHT + 1.5;
  var mat = new THREE.MeshLambertMaterial({ color: 0x6FB6DC });

  var walls = [
    { ax: cx - half, az: cz - half, bx: cx + half, bz: cz - half, horizontal: true },  // norte
    { ax: cx - half, az: cz + half, bx: cx + half, bz: cz + half, horizontal: true },  // sul
    { ax: cx - half, az: cz - half, bx: cx - half, bz: cz + half, horizontal: false }, // oeste
    { ax: cx + half, az: cz - half, bx: cx + half, bz: cz + half, horizontal: false }  // leste
  ];

  var i;
  for (i = 0; i < walls.length; i++) {
    var w = walls[i];
    var dx = w.bx - w.ax, dz = w.bz - w.az;
    var len = Math.sqrt(dx * dx + dz * dz);
    var midX = (w.ax + w.bx) / 2, midZ = (w.az + w.bz) / 2;

    var geo = makeIceWallGeometry(len + thickness, height, thickness);
    var mesh = new THREE.Mesh(geo, getIceWallMats());
    mesh.position.set(midX, 0, midZ);
    mesh.rotation.y = w.horizontal ? 0 : Math.PI / 2;
    G.scene.add(mesh);

    addWallSegment(w.ax, w.az, w.bx, w.bz, thickness / 2);
  }
}

// Formacao decorativa de cristais de gelo (substitui os antigos coqueiros do
// bioma de deserto): um conjunto de picos de gelo de alturas variadas, com
// um cristal central maior e translucido.
function createIceFormation(x, z) {
  var group = new THREE.Group();

  var spikeMat = new THREE.MeshLambertMaterial({ color: 0xBEEAF9 });
  var i;
  for (i = 0; i < 4; i++) {
    var h = 3.2 + Math.random() * 2.6;
    var spikeGeo = new THREE.ConeGeometry(0.6 + Math.random() * 0.4, h, 5);
    var spike = new THREE.Mesh(spikeGeo, spikeMat);
    var ang = (Math.PI * 2 / 4) * i + Math.random() * 0.4;
    var dist = 0.7 + Math.random() * 0.6;
    spike.position.set(Math.cos(ang) * dist, h / 2, Math.sin(ang) * dist);
    spike.rotation.y = Math.random() * Math.PI;
    group.add(spike);
  }

  var crystalMat = new THREE.MeshLambertMaterial({ color: 0x8FE3FA, transparent: true, opacity: 0.85 });
  var crystalGeo = new THREE.OctahedronGeometry(1.3, 0);
  var crystal = new THREE.Mesh(crystalGeo, crystalMat);
  crystal.scale.y = 1.8;
  crystal.position.y = 3.2;
  group.add(crystal);

  group.position.set(x, 0, z);
  G.scene.add(group);
}

// Checkpoint: SOMENTE nas quinas de cada volta da espiral, EXCETO a
// penultima quina de toda a espiral (skipCornerIndex) - essa fica de
// propósito sem checkpoint, como uma curva lisa de passagem entre o
// checkpoint anterior e o novo checkpoint final (a ultima quina). Cada
// checkpoint guarda a propria zona retangular (ver computeCheckpointZone),
// ja que a partir de TRACK_WIDEN_FROM_CORNER as quinas sao maiores e a
// ultima volta tem o lado de dentro alargado (CENTER_WIDEN_OFFSET).
// Inclui um nucleo de gelo brilhante (estetico, nao atrapalha a area de
// ativacao) e uma formacao de cristais de gelo.
function createCheckpoints(corners) {
  var skipCornerIndex = corners.length - 2;
  var i;
  for (i = 1; i < corners.length; i++) {
    var p = corners[i];
    var index = i - 1;
    var loopIndex = Math.floor(index / 4);
    var zone = computeCheckpointZone(corners, i);
    var isSkipped = (i === skipCornerIndex);

    if (!isSkipped) {
      var cp = { x: p.x, z: p.z, index: index, reached: false, loopIndex: loopIndex, xMin: zone.xMin, xMax: zone.xMax, zMin: zone.zMin, zMax: zone.zMax };
      G.checkpoints.push(cp);

      // CENTRO REAL da zona (media de xMin/xMax e zMin/zMax) - NAO p.x/p.z
      // (o ponto bruto da quina). Depois do deslocamento lateral
      // (CHECKPOINT_SIDE_SHIFT) e do encolhimento contra paredes reais
      // (clampZoneToRealWalls), a zona pode ficar bem assimetrica em torno
      // da quina - usar p.x/p.z fazia o aneL/nucleo visual aparecer fora do
      // centro do proprio remendo de chao do checkpoint (que ja usa o
      // centro da zona, ver createTrackVisuals). Pedido do usuario:
      // centralizar o visual no centro de verdade da area.
      var visX = (zone.xMin + zone.xMax) / 2, visZ = (zone.zMin + zone.zMax) / 2;

      var ringGeo = new THREE.RingGeometry(OASIS_RADIUS * 0.55, OASIS_RADIUS, 24);
      var ringMat = new THREE.MeshLambertMaterial({ color: 0xBFE6F5, side: THREE.DoubleSide });
      var ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.set(visX, 0.065, visZ);
      G.scene.add(ringMesh);

      var coreGeo = new THREE.CircleGeometry(OASIS_RADIUS * 0.35, 20);
      var coreMat = new THREE.MeshLambertMaterial({ color: 0x8FEAFF });
      var coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.rotation.x = -Math.PI / 2;
      coreMesh.position.set(visX, 0.07, visZ);
      G.scene.add(coreMesh);

      // Guarda as referencias de material/malha pra poder mudar de cor e
      // mostrar o efeito de "ativado" (ver triggerCheckpointFeedback) sem
      // precisar recriar nada.
      cp.ringMat = ringMat;
      cp.coreMat = coreMat;
      var groundVis = G.checkpointGroundVisuals[i];
      cp.groundMat = groundVis ? groundVis.mat : null;

      createIceFormation(visX + OASIS_RADIUS * 0.6, visZ + OASIS_RADIUS * 0.6);
    }
  }
}

// Cria o checkpoint final NOVO (pedido do usuario: inverter ponto de
// partida com o ultimo checkpoint) na posicao da quina de INICIO original
// (corners[0]) - mesmo visual/zona dos demais checkpoints (ver
// createCheckpoints), so chamado a parte porque corners[0] nunca passava
// por ali (o loop de createCheckpoints comeca em i=1, ja que i=0 sempre foi
// o inicio, nunca um checkpoint).
function createInvertedFinalCheckpoint(corners) {
  var p = corners[0];
  var zone = computeCheckpointZone(corners, 0);
  var cp = { x: p.x, z: p.z, index: G.checkpoints.length, reached: false, loopIndex: 0, xMin: zone.xMin, xMax: zone.xMax, zMin: zone.zMin, zMax: zone.zMax };
  G.checkpoints.push(cp);

  // CENTRO REAL da zona, nao p.x/p.z - mesma razao de createCheckpoints.
  var visX = (zone.xMin + zone.xMax) / 2, visZ = (zone.zMin + zone.zMax) / 2;

  var ringGeo = new THREE.RingGeometry(OASIS_RADIUS * 0.55, OASIS_RADIUS, 24);
  var ringMat = new THREE.MeshLambertMaterial({ color: 0xBFE6F5, side: THREE.DoubleSide });
  var ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = -Math.PI / 2;
  ringMesh.position.set(visX, 0.065, visZ);
  G.scene.add(ringMesh);

  var coreGeo = new THREE.CircleGeometry(OASIS_RADIUS * 0.35, 20);
  var coreMat = new THREE.MeshLambertMaterial({ color: 0x8FEAFF });
  var coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.rotation.x = -Math.PI / 2;
  coreMesh.position.set(visX, 0.07, visZ);
  G.scene.add(coreMesh);

  // Superficie de NEVE do checkpoint final (as demais vem de createTrackVisuals).
  var finalSnowMat = new THREE.MeshLambertMaterial({ color: 0xe9f0f4 });
  var finalSnow = new THREE.Mesh(new THREE.PlaneGeometry(zone.xMax - zone.xMin, zone.zMax - zone.zMin), finalSnowMat);
  finalSnow.rotation.x = -Math.PI / 2;
  finalSnow.position.set(visX, 0.052, visZ);
  G.scene.add(finalSnow);

  cp.ringMat = ringMat;
  cp.coreMat = coreMat;
  cp.groundMat = finalSnowMat;

  createIceFormation(visX + OASIS_RADIUS * 0.6, visZ + OASIS_RADIUS * 0.6);
}

// Regra de seguranca pedida pelo usuario: NENHUM checkpoint pode sobrepor
// outro. Bug real encontrado: alargar a zona de deteccao (CHECKPOINT_ZONE_
// MARGIN/CHECKPOINT_END_MARGIN, ver computeCheckpointZoneRaw) pra fechar o
// vao diagonal de uma quina tambem empurrou a borda da zona pra ALEM da
// parede real de uma volta ADJACENTE em alguns casos (quinas na mesma
// posicao relativa, uma volta CORRIDOR_PITCH=76 afastada - a sala alargada
// do centro, CENTER_WIDEN_OFFSET=80, sozinha ja passa de 76, entao qualquer
// margem extra ali garante ultrapassar) - shrinkZoneClearOfWalls nao pega
// isso porque so testa a posicao ATUAL da borda contra paredes reais, nao o
// caminho inteiro ate ela: uma borda empurrada longe demais pode "pular por
// cima" do raio de colisao da parede sem nunca ser amostrada perto dela.
// Em vez de tentar acertar a margem exata pra cada quina (fragil, depende
// de quao perto esta a proxima volta), esta funcao roda por ULTIMO,
// depois de toda zona calculada, e VERIFICA de verdade: se dois checkpoints
// quaisquer (nao so vizinhos no array - a sobreposicao real encontrada era
// sempre entre quinas 4 indices afastadas, ou seja, mesma posicao numa
// volta diferente) acabarem se sobrepondo, encolhe os dois simetricamente
// no eixo de MENOR sobreposicao (menos destrutivo pra forma de cada zona)
// ate sobrar uma folga minima entre eles.
var CHECKPOINT_OVERLAP_GAP = 4;
var CHECKPOINT_MIN_ZONE_SIZE = 20;
function preventCheckpointOverlap() {
  var cps = G.checkpoints;
  var pass, i, j;
  for (pass = 0; pass < 6; pass++) {
    var anyOverlap = false;
    for (i = 0; i < cps.length; i++) {
      for (j = i + 1; j < cps.length; j++) {
        var a = cps[i], b = cps[j];
        var overlapX = Math.min(a.xMax, b.xMax) - Math.max(a.xMin, b.xMin);
        var overlapZ = Math.min(a.zMax, b.zMax) - Math.max(a.zMin, b.zMin);
        if (overlapX <= 0 || overlapZ <= 0) { continue; }
        anyOverlap = true;
        if (overlapX < overlapZ) {
          var shrinkX = (overlapX + CHECKPOINT_OVERLAP_GAP) / 2;
          if (a.x <= b.x) {
            a.xMax = Math.max(a.xMin + CHECKPOINT_MIN_ZONE_SIZE, a.xMax - shrinkX);
            b.xMin = Math.min(b.xMax - CHECKPOINT_MIN_ZONE_SIZE, b.xMin + shrinkX);
          } else {
            a.xMin = Math.min(a.xMax - CHECKPOINT_MIN_ZONE_SIZE, a.xMin + shrinkX);
            b.xMax = Math.max(b.xMin + CHECKPOINT_MIN_ZONE_SIZE, b.xMax - shrinkX);
          }
        } else {
          var shrinkZ = (overlapZ + CHECKPOINT_OVERLAP_GAP) / 2;
          if (a.z <= b.z) {
            a.zMax = Math.max(a.zMin + CHECKPOINT_MIN_ZONE_SIZE, a.zMax - shrinkZ);
            b.zMin = Math.min(b.zMax - CHECKPOINT_MIN_ZONE_SIZE, b.zMin + shrinkZ);
          } else {
            a.zMin = Math.min(a.zMax - CHECKPOINT_MIN_ZONE_SIZE, a.zMin + shrinkZ);
            b.zMax = Math.max(b.zMin + CHECKPOINT_MIN_ZONE_SIZE, b.zMax - shrinkZ);
          }
        }
      }
    }
    if (!anyOverlap) { break; }
  }
}

// Fecha o vao diagonal residual que ainda sobra no CANTO de uma zona de
// checkpoint (ver clampZoneToRealWalls acima): duas paredes retas
// perpendiculares (uma em cada lado da quina), cada uma com seu proprio
// raio de colisao CIRCULAR, nunca se tocam exatamente no canto - um ponto
// na diagonal a mais de "raio" de distancia do ponto onde elas se
// encontram nao toca nenhuma das duas (prova geometrica simples). Mesmo
// com a zona do checkpoint agora varrendo ate a parede real de verdade
// (CHECKPOINT_WALL_SCAN_MAX), esse vao especifico continua existindo por
// ser um retangulo simples - reintroduzido a pedido do usuario, na MENOR
// versao ja testada (raio de colisao 14, raio visual so ate a largura da
// propria duna - a versao "que quase nem aparece" das rodadas anteriores).
// Roda por ULTIMO (depois de preventCheckpointOverlap, com as zonas finais
// e sem sobreposicao) e so fecha um canto se ele JA estiver genuinamente
// perto de uma parede real (evita o bug antigo de um bloqueio fantasma
// caindo longe, no meio de outro corredor).
var CHECKPOINT_CORNER_NOTCH_RADIUS = 14;
var CHECKPOINT_CORNER_NOTCH_VISUAL_RADIUS = DUNE_BASE_WIDTH / 2;
// Escalado junto com a largura da trilha - a zona do checkpoint cresceu
// (TRACK_WIDTH_SCALE), entao a distancia ate a parede real na quina tambem
// cresce proporcionalmente; sem escalar isso, cantos que antes ficavam
// "perto o bastante" de uma parede pra ganhar o pilar deixariam de contar.
var CHECKPOINT_CORNER_NOTCH_MAX_WALL_DIST = 20 * TRACK_WIDTH_SCALE;
function pointToSegmentDistance(px, pz, ax, az, bx, bz) {
  var abx = bx - ax, abz = bz - az;
  var denom = abx * abx + abz * abz;
  var t = 0;
  if (denom > 1e-7) {
    t = ((px - ax) * abx + (pz - az) * abz) / denom;
    t = clampNum(t, 0, 1);
  }
  var cx = ax + abx * t, cz = az + abz * t;
  var dx = px - cx, dz = pz - cz;
  return Math.sqrt(dx * dx + dz * dz);
}
function closeCheckpointCornerNotches() {
  var existingWalls = G.wallSegments.slice();
  function nearestRealWallDist(px, pz) {
    var best = Infinity;
    var w;
    for (w = 0; w < existingWalls.length; w++) {
      var seg = existingWalls[w];
      var d = pointToSegmentDistance(px, pz, seg.ax, seg.az, seg.bx, seg.bz);
      if (d < best) { best = d; }
    }
    return best;
  }
  var mat = new THREE.MeshLambertMaterial({ color: 0x9FDCF0 });
  var cps = G.checkpoints;
  var i, c;
  for (i = 0; i < cps.length; i++) {
    var cp = cps[i];
    var candidates = [
      { x: cp.xMin, z: cp.zMin }, { x: cp.xMin, z: cp.zMax },
      { x: cp.xMax, z: cp.zMin }, { x: cp.xMax, z: cp.zMax }
    ];
    for (c = 0; c < candidates.length; c++) {
      var pt = candidates[c];
      if (nearestRealWallDist(pt.x, pt.z) > CHECKPOINT_CORNER_NOTCH_MAX_WALL_DIST) { continue; }
      var geo = makeIceCylinderGeometry(CHECKPOINT_CORNER_NOTCH_VISUAL_RADIUS, DUNE_HEIGHT);
      var mesh = new THREE.Mesh(geo, getIceWallMats());
      mesh.position.set(pt.x, 0, pt.z);
      G.scene.add(mesh);
      addWallSegment(pt.x, pt.z, pt.x, pt.z, CHECKPOINT_CORNER_NOTCH_RADIUS);
    }
  }
}

function createStartArea(startCorner) {
  G.startPosition = { x: startCorner.x, z: startCorner.z };

  // A area SEGURA de verdade (onde o movimento fica sem deslize, ver
  // updatePlayerMovement/isInsideAnyOasis/isInsideAnyHazardFreeZone) agora
  // e um RETANGULO (computeCheckpointZone, mesmo sistema dos checkpoints -
  // ver G.startZone), nao mais so o circulo decorativo abaixo. Antes, o
  // circulo (START_RADIUS) definia TANTO o visual quanto a zona sem
  // deslize, mas a area fisica real do inicio (ate a parede de verdade) e
  // maior e nao-circular - sobrava uma faixa entre a borda do circulo e a
  // parede onde o jogo ainda tratava como "trilha comum" (deslize com
  // inercia), reportado pelo usuario ("fora do anel, ainda com deslize").
  // O circulo continua existindo, so como marca decorativa do oasis
  // central - a zona de JOGO agora e o retangulo, do mesmo jeito que o
  // remendo de chao de um checkpoint e diferente do seu nucleo decorativo.
  G.startZone = computeCheckpointZone(G.corners, G.corners.length - 1);
  var zoneCenterX = (G.startZone.xMin + G.startZone.xMax) / 2;
  var zoneCenterZ = (G.startZone.zMin + G.startZone.zMax) / 2;

  // Cor bem diferente do resto do mapa (tons quentes de creme/dourado, em
  // vez dos azuis de gelo usados em trilha/checkpoint/duna) - o inicio
  // precisa ser reconhecivel de longe a primeira vista, nao so por
  // formato.
  var patchGeo = new THREE.PlaneGeometry(G.startZone.xMax - G.startZone.xMin, G.startZone.zMax - G.startZone.zMin);
  var patchMat = new THREE.MeshLambertMaterial({ color: 0xFFF1CE });
  var patchMesh = new THREE.Mesh(patchGeo, patchMat);
  patchMesh.rotation.x = -Math.PI / 2;
  patchMesh.position.set(zoneCenterX, 0.055, zoneCenterZ);
  G.scene.add(patchMesh);

  var geo = new THREE.CircleGeometry(START_RADIUS, 32);
  var mat = new THREE.MeshLambertMaterial({ color: 0xFFF6DE });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(zoneCenterX, 0.06, zoneCenterZ);
  G.scene.add(mesh);

  // Anel CENTRALIZADO no centro real da area segura (zoneCenterX/Z), nao
  // mais em startCorner.x/z (o ponto bruto da quina) - pedido do usuario.
  var ringGeo = new THREE.RingGeometry(START_RADIUS * 0.9, START_RADIUS, 32);
  var ringMat = new THREE.MeshLambertMaterial({ color: 0xE8C97A, side: THREE.DoubleSide });
  var ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = -Math.PI / 2;
  ringMesh.position.set(zoneCenterX, 0.065, zoneCenterZ);
  G.scene.add(ringMesh);

  createIceFormation(zoneCenterX - 9, zoneCenterZ - 9);
  createIceFormation(zoneCenterX + 8, zoneCenterZ + 9);
}

// Formacoes de gelo decorativas espalhadas pelo meio das trilhas apenas por
// estetica (nucleo de gelo + cristais). Sao solidas (bloqueiam passagem)
// mas NAO sao pontos de respawn (nao entram em G.checkpoints).
function createMiniOases(corners) {
  var i;
  for (i = 0; i < corners.length - 1; i++) {
    var a = corners[i], b = corners[i + 1];
    var dx = b.x - a.x, dz = b.z - a.z;
    var len = Math.sqrt(dx * dx + dz * dz);
    if (len < 55) { continue; }
    if (Math.random() > 0.5) { continue; }

    var t = 0.35 + Math.random() * 0.3;
    var lateral = (Math.random() * 2 - 1) * 2.2;
    var ux = dx / len, uz = dz / len;
    var nx = -uz, nz = ux;
    var px = a.x + dx * t + nx * lateral;
    var pz = a.z + dz * t + nz * lateral;

    var coreGeo = new THREE.CircleGeometry(2.4, 16);
    var coreMat = new THREE.MeshLambertMaterial({ color: 0x8FEAFF });
    var coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.rotation.x = -Math.PI / 2;
    coreMesh.position.set(px, 0.08, pz);
    G.scene.add(coreMesh);

    createIceFormation(px + 2.0, pz + 2.0);

    addWallSegment(px, pz, px, pz, 2.6);
  }
}

// Espalha cristais de gelo afiados (obstaculos estaticos) e lobos de gelo
// (as antigas "centopeias", agora com tema de gelo) em cada trecho reto da
// espiral. A quantidade e a velocidade aumentam conforme "diffIndex" (ver
// abaixo) - o jogo comeca perto do CENTRO do mapa e termina perto da BORDA
// (ver inversao de inicio/fim em init()), entao a dificuldade cresce
// conforme o jogador se AFASTA do centro, nao o contrario.
// Acha o quanto (em unidades ao longo do trecho, a partir de "fromX,fromZ"
// andando na direcao dirX,dirZ) e preciso se afastar da quina pra ficar
// LIVRE de qualquer zona segura (checkpoint ou inicio) em TODA a largura
// jogavel do corredor (varios "v" amostrados, de vMin a vMax) - em vez de
// tentar adivinhar essa distancia com uma formula (trim+folga fixa), mede
// direto contra isInsideAnyHazardFreeZone, a MESMA funcao que decide de
// verdade o que e zona segura. Isso corrige um bug real: antes, tanto o
// lobo (uMin/uMax, a propria fronteira que ele nao pode cruzar) quanto os
// perigos (otMin/otMax, safeMinBase/safeMaxBase) usavam so o trim fisico
// (ou trim+folga fixa) - com a zona de deteccao de alguns checkpoints bem
// maior (CHECKPOINT_ZONE_MARGIN/CHECKPOINT_END_MARGIN), a zona segura
// passou a alcancar, em alguns trechos, uma faixa de "u" onde ela cobre a
// largura JOGAVEL INTEIRA do corredor (todo "v" possivel) - um lobo cujo
// proprio uMin/uMax (calculado so pelo trim, sem saber disso) permitia
// vagar ate essa faixa ficava PRESO ali: qualquer movimento (em qualquer
// direcao lateral) cai dentro da zona segura e e desfeito (ver bounce-back
// em updateCentipedes), sem nenhuma saida possivel - reportado pelo
// usuario como "os lobos desse checkpoint ficam travados" (confirmado:
// nao era a pausa de ate 4s, era isso). Usar a MESMA medida (esta funcao)
// pra limitar tanto o lobo quanto o nascimento de perigos garante que
// nenhum dos dois nunca fique preso ou nasca dentro da zona segura,
// automaticamente certo pra QUALQUER quina (checkpoint normal, alargada,
// inicio, ou a unica sem checkpoint), sem precisar prever cada caso.
function findSafeUOffset(fromX, fromZ, dirX, dirZ, nx, nz, vMin, vMax) {
  var STEP = 3;
  var MAX_SCAN = 150;
  var samples = [vMin, vMin * 0.5, 0, vMax * 0.5, vMax];
  var u = 0;
  while (u < MAX_SCAN) {
    var allClear = true;
    var s;
    for (s = 0; s < samples.length; s++) {
      var px = fromX + dirX * u + nx * samples[s];
      var pz = fromZ + dirZ * u + nz * samples[s];
      if (isInsideAnyHazardFreeZone(px, pz)) { allClear = false; break; }
    }
    if (allClear) { return u; }
    u += STEP;
  }
  return MAX_SCAN;
}

function createHazards(corners) {
  var obstacleMat = new THREE.MeshLambertMaterial({ color: 0xA9E8FB, transparent: true, opacity: 0.9 });
  var centipedeMat = new THREE.MeshLambertMaterial({ color: 0x000000 });
  // Mesma cor EXATA das paredes de verdade (createDuneWallMesh/
  // createInnerCap/createCornerCollars) - pedido do usuario: a barreira
  // parcial precisa parecer parte da trilha, nao um obstaculo solto.
  var barrierMat = new THREE.MeshLambertMaterial({ color: 0x9FDCF0 });

  // Extraida do corpo do loop de estalagmites originais pra poder ser
  // reusada pelas estalagmites NOVAS de borda (ver EDGE_HUG_DEPTH mais
  // abaixo) sem duplicar a criacao da malha.
  function spawnStalagmiteAt(px, pz) {
    // 3 variacoes de cristal de gelo saindo do chao (feixe / cristal / presas), GRANDES
    // (STAL_VISUAL_SCALE) e com contorno. So visual: o colisor continua OBSTACLE_RADIUS.
    var variants = buildStalagmiteVariants();
    var vi = Math.floor(Math.random() * variants.length);
    var mesh = new THREE.Mesh(variants[vi], G.stalMat);
    var hullMesh = new THREE.Mesh(G.stalHulls[vi], G.stalHullMat);
    var sc = STAL_VISUAL_SCALE * (0.9 + Math.random() * 0.2), ry = Math.random() * Math.PI * 2, sy = sc * STAL_VISUAL_TALL * (0.9 + Math.random() * 0.2) / 1.0;
    var k;
    for (k = 0; k < 2; k++) {
      var mm = k === 0 ? mesh : hullMesh;
      mm.position.set(px, 0, pz);
      mm.rotation.y = ry;
      mm.scale.set(sc, sy, sc);
      G.scene.add(mm);
    }
    // "meshes" guardado pra Empurrar/Pisao/Jato poderem DESTRUIR o obstaculo
    // (ver removeStaticObstacleAt). Geometria e materiais sao compartilhados.
    G.staticObstacles.push({ x: px, z: pz, radius: OBSTACLE_RADIUS, meshes: [mesh, hullMesh] });
  }  // Pedido explicito do usuario: "nunca spawne obstaculos sobrepostos" +
  // "pelo menos 2 unidades de distancia entre um obstaculo e outro no
  // spawn". Checa a candidata contra TODOS os obstaculos ja plantados no
  // mapa inteiro ate agora (G.staticObstacles cresce trecho a trecho) -
  // distancia exigida = soma dos dois raios (nunca sobrepor) MAIS a folga
  // OBSTACLE_MIN_GAP (a folga de verdade, borda a borda). Usado tanto pelo
  // loop de estalagmites normais quanto pelo de borda, como so mais uma
  // condicao dentro do "ate 8 tentativas" que ja existia pra cada um.
  function tooCloseToOtherObstacle(px, pz) {
    var ownRadius = OBSTACLE_RADIUS;
    var i2;
    for (i2 = 0; i2 < G.staticObstacles.length; i2++) {
      var other = G.staticObstacles[i2];
      var minDist = ownRadius + other.radius + OBSTACLE_MIN_GAP;
      var dx2 = px - other.x, dz2 = pz - other.z;
      if (dx2 * dx2 + dz2 * dz2 < minDist * minDist) { return true; }
    }
    return false;
  }

  // Velocidade dos lobos: a pedido do usuario, diminui em 20% a DIFERENCA
  // entre o mais lento (perto do novo INICIO, no centro) e o mais rapido
  // (perto do novo checkpoint FINAL, na borda) - os do inicio ficam 20%
  // MAIS RAPIDOS que antes, os do final ficam 20% MAIS LENTOS, mantendo a
  // progressao (inicio ainda mais lento que o final, so que com menos
  // diferenca entre os dois extremos). A formula antiga era
  // "9.5 + diffIndex*0.8" (9.5 no inicio, 9.5+max*0.8 no final) - os dois
  // extremos sao recalculados e a taxa por quina e re-derivada pra
  // continuar linear entre eles.
  var CENTIPEDE_SPEED_MAX_DIFF_INDEX = corners.length - 2;
  // Ajuste posterior (menos diferenca de velocidade entre inicio e final): lobos do
  // INICIO +15% e lobos do FINAL -10%. A progressao continua LINEAR entre os dois
  // novos extremos (a taxa por checkpoint e re-derivada logo abaixo).
  var CENTIPEDE_SPEED_AT_START = 9.5 * 1.2 * 1.15;
  var CENTIPEDE_SPEED_AT_END = (9.5 + CENTIPEDE_SPEED_MAX_DIFF_INDEX * 0.8) * 0.8 * 0.9;
  var CENTIPEDE_SPEED_RATE = CENTIPEDE_SPEED_MAX_DIFF_INDEX > 0
    ? (CENTIPEDE_SPEED_AT_END - CENTIPEDE_SPEED_AT_START) / CENTIPEDE_SPEED_MAX_DIFF_INDEX
    : 0;

  // Reforco de dificuldade pedido pelo usuario a partir de certos
  // checkpoints. "diffIndex" (definido mais abaixo, dentro do loop) ja
  // representa exatamente o NUMERO do checkpoint que aquele trecho leva o
  // jogador a alcancar (checkpoint 21 = mais dificil/final, checkpoint 1 =
  // mais facil/perto do inicio - ver o comentario de diffIndex). Os
  // limiares 13 e 16 NAO se somam entre si (16 nao empilha em cima do 13) -
  // cada um dos dois e o multiplicador TOTAL daquele trecho em diante. Mas
  // o reforco NOVO pedido pelo usuario para o checkpoint 16 EMPILHA sim,
  // "alem do que ja existir" (+5% em cima do +7% que ja havia) - por isso
  // o degrau de 16 e 1.07*1.05, nao um novo valor fixo substituindo o 1.07.
  function difficultyTierMultiplier(diffIndex) {
    if (diffIndex >= 16) { return 1.07 * 1.05; }
    if (diffIndex >= 13) { return 1.05; }
    return 1;
  }

  // Reducao pedida pelo usuario: a partir do 7º checkpoint (diffIndex>=7),
  // 10% a MENOS de mobs - MULTIPLICA por cima de difficultyTierMultiplier
  // (mesmo padrao ja usado nessa formula pra empilhar ajustes), nao
  // substitui os degraus de 13/16 que ja existiam.
  function mobReductionMultiplier(diffIndex) {
    return diffIndex >= 7 ? 0.9 : 1;
  }

  // Aumento pedido pelo usuario so nos MOBS MOVEIS (lobos): do checkpoint 5
  // ate o 11 = +15%, a partir do 12 = +25% (mesma convencao checkpoint =
  // diffIndex de mobReductionMultiplier acima). Multiplica por cima dos
  // outros ajustes, nao os substitui.
  function mobIncreaseMultiplier(diffIndex) {
    if (diffIndex >= 12) { return 1.25; }
    if (diffIndex >= 5) { return 1.15; }
    return 1;
  }

  // +25% de obstaculos estaticos no mapa inteiro (pedido do usuario). As
  // regras de seguranca (faixa central livre, 2 unidades entre obstaculos,
  // barreiras <=70%) continuam valendo - obstaculo que nao achar lugar
  // seguro e pulado como sempre, entao o total real pode ficar um pouco
  // abaixo do teorico em trechos apertados.
  var OBSTACLE_COUNT_MULTIPLIER = 1.25;

  // Ajuste de quantidade de MOBS (estalagmites E lobos) por regiao, empilhado por cima
  // dos multiplicadores acima: do ponto inicial ate o checkpoint 3 (diffIndex <= 3)
  // = -10%; a partir do checkpoint 16 (diffIndex >= 16) = +10%.
  function mobRegionMultiplier(diffIndex) {
    if (diffIndex <= 3) { return 0.9; }
    if (diffIndex >= 16) { return 1.1; }
    return 1;
  }

  var i;
  for (i = 0; i < corners.length - 1; i++) {
    var a = corners[i], b = corners[i + 1];
    var dx = b.x - a.x, dz = b.z - a.z;
    var len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.001) { continue; }
    var ux = dx / len, uz = dz / len;
    var nx = -uz, nz = ux;

    // Largura JOGAVEL de verdade (ate perto da duna real de cada lado, ver
    // legLateralBounds) - NAO a largura visual da trilha, que e sempre bem
    // mais estreita que o corredor de verdade e deixava uma faixa segura
    // enorme perto das paredes.
    var lateralBounds = legLateralBounds(i);

    var trimA = trimForCorner(i);
    var trimB = trimForCorner(i + 1);

    // Distancia real (medida, nao estimada) ate ficar livre de qualquer
    // zona segura em TODA a largura do corredor, a partir de cada ponta -
    // ver findSafeUOffset. Sempre >= trim (a duna real ja bloqueia antes
    // disso) e cresce sozinho o quanto for preciso perto de um checkpoint
    // grande, mas fica pequeno perto da unica quina sem checkpoint (onde
    // isInsideAnyHazardFreeZone e false quase de cara) - resolve os dois
    // problemas (lobo preso E area vazia demais) com a mesma medida.
    var safeOffsetA = findSafeUOffset(a.x, a.z, ux, uz, nx, nz, lateralBounds.vMin, lateralBounds.vMax);
    var safeOffsetB = findSafeUOffset(b.x, b.z, -ux, -uz, nx, nz, lateralBounds.vMin, lateralBounds.vMax);

    var loopIndex = Math.floor(i / 4);

    // O jogo comeca perto do CENTRO do mapa (quina mais interna da espiral,
    // ver a inversao de inicio/fim em init()) e termina perto da BORDA
    // (quina mais externa) - a pedido do usuario, a dificuldade precisa
    // ficar MAIOR conforme o jogador se AFASTA do centro, ou seja, crescer
    // ao longo da jornada (perto da borda = mais dificil), nao decrescer.
    // O indice de trecho "i" cru e o OPOSTO disso: i=0 e o trecho mais
    // externo (borda) e i=corners.length-2 e o mais interno (centro) - se
    // usado direto, a dificuldade ficaria maior perto do CENTRO (inicio),
    // exatamente ao contrario do pedido. "diffIndex" espelha "i" so para as
    // formulas de DIFICULDADE (contagem/velocidade) abaixo - a posicao
    // geometrica de cada perigo continua usando "i" normalmente, sem
    // nenhuma mudanca na geometria/paredes.
    var diffIndex = (corners.length - 2) - i;

    /* ---------- Estalagmites de gelo (cresce gradualmente A CADA quina/checkpoint, nao so a cada volta) ---------- */
    // Ao contrario dos lobos (que se MOVEM e podem emboscar o jogador logo
    // na saida de um checkpoint, por isso precisam do REACTION_BUFFER
    // inteiro - ver effBuffer mais abaixo, usado so pelos lobos agora), uma
    // estalagmite e ESTATICA e fica visivel de longe assim que o jogador
    // sai do checkpoint - o unico motivo pra nao nascer bem em cima da
    // saida e nao sobrepor o proprio checkpoint (ja garantido a parte por
    // isInsideAnyHazardFreeZone, testado ponto a ponto). Por isso usa uma
    // folga bem menor e FIXA (obstacleEdgeGap), independente de
    // REACTION_BUFFER. Antes, usar o mesmo effBuffer dos lobos aqui deixava
    // a janela [otMin,otMax] batendo no teto de 30% do trecho em quase toda
    // quina alargada do final (trim ja alargado + buffer cheio somados
    // passavam de 65% do trecho de cada lado) - sobrava so uma faixa
    // minuscula no meio pra estalagmites, com 70% do trecho (perto de cada
    // ponta) sem nenhuma. Com essa folga bem menor, so o trim (que sozinho
    // ja da uma boa margem) domina a conta, abrindo a janela de verdade.
    var otMin = clampNum(safeOffsetA / len, 0.01, 0.35);
    var otMax = clampNum(1 - safeOffsetB / len, 0.65, 0.99);
    // Usa "i" (a propria quina) em vez de "loopIndex" (a volta) para a
    // quantidade crescer aos poucos a CADA checkpoint, nao em saltos a cada
    // 4 quinas de uma vez. Dobrado a pedido do usuario (base e taxa x2).
    // Triplicado a pedido do usuario (base e taxa outra vez x3, em cima do
    // valor ja dobrado duas vezes antes) e depois reduzido em 25% (base e
    // taxa x0.75, em cima do valor triplicado).
    // Reduzido em mais 25% a pedido do usuario (em cima de todos os ajustes
    // anteriores ja embutidos na formula) - multiplica o total, nao so a
    // base ou so a taxa, pra reduzir a contagem inteira proporcionalmente
    // em qualquer trecho.
    // Reduzido em mais 25% de novo a pedido do usuario (em cima do 0.75 ja
    // aplicado antes - 0.75*0.75=0.5625 do valor original da formula base).
    // Reduzido em mais 15% a pedido do usuario (em cima dos 0.75*0.75 ja
    // aplicados antes).
    // *1.05 no final: +5% em TODAS as trilhas, pedido do usuario, por cima
    // de tudo que ja existia (inclusive dos degraus de dificuldade).
    // *mobReductionMultiplier no final: -10% a partir do 7º checkpoint,
    // pedido explicito do usuario (ver comentario na funcao acima).
    var obstacleCount = Math.floor((18 + diffIndex * 1.8) * 0.75 * 0.75 * 0.85 * 0.85 * difficultyTierMultiplier(diffIndex) * 1.05 * mobReductionMultiplier(diffIndex) * OBSTACLE_COUNT_MULTIPLIER * mobRegionMultiplier(diffIndex));
    // Deslocamento aleatorio (por trecho) de qual fatia lateral cada indice
    // "o" cai - ver logo abaixo.
    var obstacleZonePhase = Math.floor(Math.random() * HAZARD_LATERAL_ZONES);
    var o;
    for (o = 0; o < obstacleCount; o++) {
      // Distribuicao ESTRATIFICADA em DUAS dimensoes: "o" define a fatia do
      // COMPRIMENTO (binWidth/binStart, como antes) E a fatia da LARGURA
      // (obstacleZonePhase+o ciclando por HAZARD_LATERAL_ZONES, agora sobre
      // lateralBounds.vMin/vMax de verdade) - assim, conforme o percorre o
      // trecho inteiro, a posicao lateral tambem percorre TODAS as fatias
      // da largura JOGAVEL REAL em sequencia (incluindo as duas bordas de
      // verdade, nao mais so a faixa visual da trilha), garantindo que nao
      // sobra nenhuma faixa sem perigo por um trecho longo.
      var binWidth = (otMax - otMin) / obstacleCount;
      var binStart = otMin + binWidth * o;
      var obstacleZone = (o + obstacleZonePhase) % HAZARD_LATERAL_ZONES;
      var obstacleZoneRange = hazardLateralZoneRange(obstacleZone, lateralBounds.vMin, lateralBounds.vMax);

      // Tenta ate 8 posicoes: nenhum obstaculo pode nascer dentro do inicio
      // ou de um checkpoint (area segura - ver isInsideAnyHazardFreeZone).
      // Pula o obstaculo se nao achar um lugar seguro (raro, so em trechos
      // bem curtos onde o checkpoint praticamente toma o corredor inteiro).
      var opx = 0, opz = 0, foundSafeSpot = false;
      var attempt;
      for (attempt = 0; attempt < 16; attempt++) { // 16 (era 8): +25% de obstaculos deixa mais tentativas falharem nas regras de seguranca
        var ot = binStart + Math.random() * binWidth;
        var lateral = obstacleZoneRange[0] + Math.random() * (obstacleZoneRange[1] - obstacleZoneRange[0]);
        // Nunca dentro da faixa central sempre-livre (garante que a trilha
        // nunca fecha 100% - ver comentario de HAZARD_CENTER_SAFE_HALF) nem
        // sobreposto/colado demais em outro obstaculo ja plantado (ver
        // tooCloseToOtherObstacle - "pelo menos 2 unidades de distancia").
        // Soma OBSTACLE_RADIUS ao limite - PRECISA ser o CORPO do obstaculo
        // (nao so o centro) que fica fora da faixa central, senao o raio
        // ainda invade ela por dentro (bug real corrigido nesta rodada).
        if (Math.abs(lateral) < HAZARD_CENTER_SAFE_HALF + OBSTACLE_RADIUS) { continue; }
        opx = a.x + dx * ot + nx * lateral;
        opz = a.z + dz * ot + nz * lateral;
        if (!isInsideAnyHazardFreeZone(opx, opz) && !tooCloseToOtherObstacle(opx, opz)) { foundSafeSpot = true; break; }
      }
      if (!foundSafeSpot) { continue; }

      spawnStalagmiteAt(opx, opz);
    }

    /* ---------- Barreiras: "parede parcial" solida partindo da BORDA DE VERDADE ---------- */
    // Pedido do usuario: precisa nascer na BORDA/lateral de verdade da
    // trilha e avancar pra dentro - NAO no meio, "flutuando" longe da
    // parede. O lado que "abraca" (hugMin) comeca EXATAMENTE no offset da
    // parede real (DUNE_OFFSET/innerOffsetForLeg, o mesmo usado por
    // createDuneWalls/createInnerCap pra desenhar a parede em si) - nao no
    // lateralBounds.vMin/vMax (que fica alguns tantos units PRA DENTRO da
    // parede real, de proposito, so pra dar folga de seguranca aos outros
    // perigos - usar isso aqui e o que deixava a barreira boiando longe da
    // parede, parecendo um bloco solto no meio da trilha).
    // O quanto ela AVANCA pra dentro (o que realmente importa pra nao
    // fechar a trilha nem sufocar o espaco de manobra dos lobos) continua
    // limitado a uma fatia da largura JOGAVEL de verdade (lateralBounds,
    // com toda a margem de seguranca) - nunca mais que ~65% dela, garantindo
    // que sobra bastante espaco de manobra pros lobos no lado aberto (ver
    // legBarrierBlockedRange, usado logo abaixo pra excluir esse espaco do
    // vagar dos lobos POR COMPLETO, em vez de so reagir ao bater nela -
    // e essa exclusao antecipada que resolve os lobos "parados" perto da
    // barreira, que antes ficavam tentando alcancar uma mira dentro dela
    // sem nunca conseguir).
    // Chance DOBRADA (era 0.2) a pedido do usuario, pra dobrar a
    // quantidade no mapa. Cobre no maximo ~70% da largura real (checado no
    // final, com folga).
    // Pedido do usuario: a partir do checkpoint 13 (diffIndex>=13), garantir
    // pelo menos 2 barreiras parciais por trecho (3-4 em trechos mais
    // longos), em vez de no maximo 1 como antes. Cada barreira ocupa sua
    // propria fatia do COMPRIMENTO do trecho (uBin distinto, nunca a mesma
    // fatia de outra) - assim qualquer secao transversal da trilha encontra
    // no maximo UMA barreira por vez, o que por si so ja garante que a
    // passagem nunca fecha (sempre sobra o lado aberto daquela barreira
    // especifica). Alterna hugMin/hugMax (bc%2) pra um ziguezague natural
    // em vez de todas grudarem no mesmo lado.
    var barrierCountTarget = 0;
    var barrierUMin = clampNum(safeOffsetA + 10, 0, len * 0.4);
    var barrierUMax = clampNum(len - safeOffsetB - 10, len * 0.6, len);
    if (diffIndex >= 13) {
      barrierCountTarget = 2;
      var barrierSpanU = barrierUMax - barrierUMin;
      if (barrierSpanU > 150) { barrierCountTarget = 3; }
      if (barrierSpanU > 260) { barrierCountTarget = 4; }
    } else if (Math.random() < 0.4) {
      barrierCountTarget = 1;
    }
    // BUG REAL encontrado e corrigido aqui (pedido do usuario: "revise a
    // geracao para eliminar seeds em que o corredor fica totalmente
    // fechado"): cada barreira nascia em qualquer ponto ALEATORIO dentro do
    // seu proprio "bin" de comprimento, sem checar contra a barreira
    // VIZINHA (bin anterior) - se uma sorteasse perto do FIM do seu bin e a
    // proxima pertio do INICIO do dela, as duas podiam ficar fisicamente tao
    // proximas em "u" que seus raios (DUNE_BASE_WIDTH/2=7 cada, 14 juntas)
    // se sobrepunham. Como bc%2 alterna o lado que cada uma "abraca"
    // (hugMin/hugMax), duas barreiras sobrepostas de LADOS OPOSTOS podiam
    // somar as duas larguras parciais e fechar 100% da trilha bem naquele
    // "u" - mesmo cada uma respeitando o limite de 70% sozinha. Agora
    // MIN_BARRIER_U_GAP forca uma distancia minima entre uma barreira e a
    // anterior (soma dos dois raios fisicos + folga), garantindo que nunca
    // se tocam - e portanto nunca fecham a trilha juntas. Se o bin nao tiver
    // espaco sobrando pra manter essa distancia (bin curto demais), aquela
    // barreira e pulada (mesmo padrao de "pula se nao achar espaco seguro"
    // ja usado pelos obstaculos).
    // BUG REAL (fechamento em "S"): o colisor de cada barreira e raio 7 + raio
    // do jogador 2 = 9 pra cada lado em U. Com o gap antigo (20) sobravam so 2
    // unidades ENTRE duas barreiras de lados opostos - o jogador nao consegue
    // atravessar o corredor lateralmente numa fresta de 2 unidades, entao a
    // trilha fechava na pratica. Agora o gap = as duas espessuras (2*9) + 24
    // de faixa livre pra cruzar de um lado pro outro.
    var MIN_BARRIER_U_GAP = 2 * (DUNE_BASE_WIDTH / 2 + PLAYER_RADIUS) + 24;
    if (barrierCountTarget > 0 && barrierUMax > barrierUMin) {
      var barrierBinSpan = (barrierUMax - barrierUMin) / barrierCountTarget;
      var bc;
      var lastBarrierU = -Infinity;
      for (bc = 0; bc < barrierCountTarget; bc++) {
        var binLo = barrierUMin + barrierBinSpan * bc;
        var binHi = binLo + barrierBinSpan;
        var effBinLo = Math.max(binLo, lastBarrierU + MIN_BARRIER_U_GAP);
        if (effBinLo >= binHi) { continue; }
        var barrierU = effBinLo + Math.random() * (binHi - effBinLo);
        lastBarrierU = barrierU;
        var hugMin = (bc % 2 === 0);
        var trueOutward = DUNE_OFFSET;
        var trueInward = innerOffsetForLeg(i);
        var trueTotal = trueOutward + trueInward;
        var safeWidth = lateralBounds.vMax - lateralBounds.vMin;
        // Com 2+ barreiras (podendo cair uma de cada lado), cada uma avanca
        // MENOS pra dentro que o caso de barreira unica (45%-65%), pra
        // garantir que sobra faixa central aberta mesmo se uma hugMin e uma
        // hugMax avancarem no maximo ao mesmo tempo.
        var reachIntoSafe = barrierCountTarget > 1
          ? safeWidth * (0.28 + Math.random() * 0.12)
          : safeWidth * (0.45 + Math.random() * 0.2);
        var barrierVStart = hugMin ? -trueOutward : trueInward;
        var barrierVEnd = hugMin ? (lateralBounds.vMin + reachIntoSafe) : (lateralBounds.vMax - reachIntoSafe);
        // Limite final de seguranca: nunca mais que 70% da largura REAL da
        // trilha, mesmo em casos extremos.
        var span = Math.abs(barrierVEnd - barrierVStart);
        var maxSpan = trueTotal * 0.7;
        if (span > maxSpan) {
          barrierVEnd = hugMin ? (barrierVStart + maxSpan) : (barrierVStart - maxSpan);
        }
        // Trava adicional (alem do 70%): a barreira NUNCA pode invadir a
        // faixa central sempre-livre (ver HAZARD_CENTER_SAFE_HALF). Sozinho,
        // isso ja garante que sobra pelo menos essa faixa aberta em QUALQUER
        // "u" onde essa barreira existe, sem depender so da distancia entre
        // barreiras vizinhas (MIN_BARRIER_U_GAP, acima) pra evitar o
        // fechamento total.
        if (hugMin && barrierVEnd > -HAZARD_CENTER_SAFE_HALF) {
          barrierVEnd = -HAZARD_CENTER_SAFE_HALF;
        } else if (!hugMin && barrierVEnd < HAZARD_CENTER_SAFE_HALF) {
          barrierVEnd = HAZARD_CENTER_SAFE_HALF;
        }
        var bax = a.x + ux * barrierU + nx * barrierVStart, baz = a.z + uz * barrierU + nz * barrierVStart;
        var bbx = a.x + ux * barrierU + nx * barrierVEnd, bbz = a.z + uz * barrierU + nz * barrierVEnd;
        // BUG REAL (2a parte) encontrado e corrigido aqui: MIN_BARRIER_U_GAP
        // (acima) so protege contra a barreira ANTERIOR DO MESMO TRECHO. Mas
        // dois trechos DIFERENTES e ADJACENTES da espiral podem terminar/
        // comecar bem perto um do outro em espaco absoluto, perto de uma
        // quina compartilhada - cada um calculando sua propria folga so em
        // relacao ao PROPRIO checkpoint, sem saber da barreira que o trecho
        // vizinho ja colocou ali perto. Medido de verdade: duas barreiras de
        // trechos diferentes, ancoradas quase no mesmo ponto da quina,
        // esticando em direcoes opostas - fisicamente se tocando (folga
        // medida de so ~1.5 unidades onde precisava de 14). Por isso, antes
        // de aceitar QUALQUER barreira nova, checa contra TODAS as barreiras
        // ja plantadas no mapa inteiro ate agora (nao so as do trecho atual)
        // - se a distancia minima entre os dois segmentos for menor que a
        // soma dos raios fisicos (14) mais uma folga extra, essa barreira
        // nova e pulada (mesmo padrao de "pula se nao achar espaco seguro"
        // usado pelos obstaculos).
        var barrierConflict = false;
        var bChk;
        for (bChk = 0; bChk < G.barrierObstacles.length; bChk++) {
          var otherB = G.barrierObstacles[bChk];
          var minSegDist = Infinity;
          var bt;
          for (bt = 0; bt <= 1; bt += 0.1) {
            var samplePx = bax + (bbx - bax) * bt, samplePz = baz + (bbz - baz) * bt;
            var segD = pointToSegmentDistance(samplePx, samplePz, otherB.ax, otherB.az, otherB.bx, otherB.bz);
            if (segD < minSegDist) { minSegDist = segD; }
          }
          if (minSegDist < 2 * (DUNE_BASE_WIDTH / 2 + PLAYER_RADIUS) + 24) { barrierConflict = true; break; }
        }
        if (barrierConflict) { continue; }
        var barrierMesh = createBarrierObstacleMesh(bax, baz, bbx, bbz, barrierMat);
        // Colisor SOLIDO de verdade (jogador) - mesma espessura das
        // paredes reais. Tambem serve pro desvio de mira dos lobos (ver
        // pickCentipedeTargetV) e pra reacao de bater-e-virar deles
        // (updateCentipedes).
        var barrierSeg = addWallSegment(bax, baz, bbx, bbz, DUNE_BASE_WIDTH / 2);
        barrierSeg.isBarrier = true;
        G.barrierObstacles.push({ ax: bax, az: baz, bx: bbx, bz: bbz, radius: DUNE_BASE_WIDTH / 2, mesh: barrierMesh, seg: barrierSeg });
      }
    }

    /* ---------- Estalagmites de BORDA (pra impedir grudar na parede) ---------- */
    // Pedido do usuario, apos playtesting: estava facil demais deslizar
    // colado no canto/borda da trilha o jogo inteiro. Rodada anterior
    // ancorava essas estalagmites em lateralBounds.vMin/vMax (a margem de
    // legLateralBounds, que reserva folga extra pro PIOR CASO da parede
    // ondulada - ate ~20-31 unidades da parede real nas pernas mais
    // exageradas) - "a parede sendo lida maior do que e", exatamente o
    // reportado pelo usuario, deixando uma faixa morta enorme onde
    // grudar na parede continuava seguro. Agora ancora direto na MESMA
    // proximidade maxima que o JOGADOR consegue alcancar de verdade
    // (DUNE_OFFSET/innerOffsetForLeg menos WALL_BLOCK_RADIUS, sem a folga
    // extra da ondulacao) - bem mais perto da parede real. Contagem
    // aumentada de 20% pra 40% da contagem normal (pedido explicito:
    // "aumente de verdade"). Alterna os dois lados ao longo do trecho e
    // nunca fecha o centro (EDGE_HUG_DEPTH e bem menor que a largura
    // jogavel toda).
    var edgeAnchorOutward = -(DUNE_OFFSET - WALL_BLOCK_RADIUS);
    var edgeAnchorInward = innerOffsetForLeg(i) - WALL_BLOCK_RADIUS;
    var edgeObstacleCount = Math.ceil(obstacleCount * 0.4);
    var EDGE_HUG_DEPTH = 14;
    var eo;
    for (eo = 0; eo < edgeObstacleCount; eo++) {
      var eBinWidth = (otMax - otMin) / edgeObstacleCount;
      var eBinStart = otMin + eBinWidth * eo;
      var eHugMin = (eo % 2 === 0);
      var epx = 0, epz = 0, eFoundSafe = false;
      var eAttempt;
      for (eAttempt = 0; eAttempt < 16; eAttempt++) {
        var eot = eBinStart + Math.random() * eBinWidth;
        var eDepth = Math.random() * EDGE_HUG_DEPTH;
        var eLateral = eHugMin ? (edgeAnchorOutward + eDepth) : (edgeAnchorInward - eDepth);
        // eDepth vai de 0 ate EDGE_HUG_DEPTH a partir da borda de verdade -
        // essas estalagmites SEMPRE ficam perto da borda por construcao
        // (EDGE_HUG_DEPTH=14 e bem menor que a largura jogavel), mas ainda
        // assim garante explicitamente que nunca invadem a faixa central
        // sempre-livre (ver HAZARD_CENTER_SAFE_HALF), caso EDGE_HUG_DEPTH
        // seja aumentado no futuro ou a trilha fique estreita o bastante.
        // Soma OBSTACLE_RADIUS - mesmo fix de raio do loop normal acima.
        if (Math.abs(eLateral) < HAZARD_CENTER_SAFE_HALF + OBSTACLE_RADIUS) { continue; }
        epx = a.x + dx * eot + nx * eLateral;
        epz = a.z + dz * eot + nz * eLateral;
        var eNearBarrier = false;
        var enb;
        for (enb = 0; enb < G.barrierObstacles.length; enb++) {
          var ebar = G.barrierObstacles[enb];
          if (pointToSegmentDistance(epx, epz, ebar.ax, ebar.az, ebar.bx, ebar.bz) < ebar.radius + 3) { eNearBarrier = true; break; }
        }
        if (!isInsideAnyHazardFreeZone(epx, epz) && !eNearBarrier && !tooCloseToOtherObstacle(epx, epz)) { eFoundSafe = true; break; }
      }
      if (!eFoundSafe) { continue; }
      spawnStalagmiteAt(epx, epz);
    }

    /* ---------- Lobos de gelo: atravessam a trilha de lado a lado ---------- */
    if (len < trimA + trimB + 20) { continue; } // corredor curto demais para um lobo vagar

    // O lobo agora tem acesso a LARGURA JOGAVEL INTEIRA da trilha (nao mais
    // um lado inteiro excluido pro trecho todo so por existir uma barreira
    // em algum "u") - pedido explicito do usuario: "corrija a navegacao dos
    // lobos pra eles conseguirem percorrer a area valida INTEIRA da
    // trilha", depois de reportar trechos vazios (sem barreira nenhuma
    // perto) onde os lobos nao apareciam. O desvio de barreira agora e
    // dinamico, testado por posicao real no mundo contra TODAS as
    // barreiras do mapa (ver pickCentipedeTargetV), nao mais um recorte
    // fixo aplicado no trecho inteiro. A reacao de bater-e-virar em
    // updateCentipedes continua como rede de seguranca fisica.
    // "largura jogavel" AQUI e wolfLateralBounds (nao lateralBounds) - o
    // lobo precisa chegar bem mais perto da parede de verdade que a margem
    // usada pelos obstaculos estaticos, senao sobra uma faixa perto de toda
    // borda/canto onde ele nunca aparece e nunca pressiona um jogador
    // colado na parede (reportado pelo usuario).
    var wolfVBins = wolfLateralBounds(i);

    // Mesma logica de "cresce a cada quina" dos obstaculos acima (ver
    // comentario la), so que mais devagar (os lobos sao mais perigosos que
    // as estalagmites, entao a contagem cresce com mais cuidado). Reduzido
    // em 25% a pedido do usuario (base e taxa x0.75, em cima do valor que
    // tinha sido dobrado duas vezes e depois triplicado antes).
    // Reduzido em mais 25% a pedido do usuario (mesma logica dos obstaculos
    // acima - multiplica o total inteiro, nao so base ou taxa).
    // Reduzido em mais 25% de novo a pedido do usuario (mesma logica dos
    // obstaculos acima).
    // Reduzido em mais 15% a pedido do usuario (mesma logica dos
    // obstaculos acima).
    // *1.05 no final: +5% em TODAS as trilhas, pedido do usuario.
    // *mobReductionMultiplier no final: -10% a partir do 7º checkpoint,
    // pedido explicito do usuario (ver comentario na funcao acima).
    var centipedeCount = Math.floor((18 + diffIndex * 1.08) * 0.75 * 0.75 * 0.85 * 0.85 * difficultyTierMultiplier(diffIndex) * 1.05 * mobReductionMultiplier(diffIndex) * mobIncreaseMultiplier(diffIndex) * mobRegionMultiplier(diffIndex));
    var centipedeZonePhase = Math.floor(Math.random() * HAZARD_LATERAL_ZONES);
    // Os lobos SE MOVEM e podem emboscar o jogador logo na saida de um
    // checkpoint - por isso, ao contrario das estalagmites (ver
    // obstacleEdgeGap acima), eles continuam usando o REACTION_BUFFER
    // inteiro (effBuffer, limitado a no maximo 30% do proprio trecho de
    // cada lado) e os mesmos limites ABSOLUTOS (0.35/0.65) garantindo pelo
    // menos 30% do trecho livre pra nascer.
    // O lobo SE MOVE e pode emboscar o jogador logo na saida de um
    // checkpoint - por isso, alem do afastamento medido (safeOffsetA/B, que
    // sozinho ja garante nao nascer/vagar dentro de zona segura), ainda
    // soma REACTION_BUFFER pra da tempo de reacao de verdade perto de um
    // checkpoint/inicio de tamanho normal. Perto da unica quina sem
    // checkpoint, safeOffsetA/B ja e pequeno (nada ali pra reagir), entao o
    // buffer soma pouco de mais nesse caso - continua pequeno no total.
    var effBuffer = Math.min(REACTION_BUFFER, len * 0.3);
    var safeMinBase = clampNum(safeOffsetA + effBuffer, 0, len * 0.35);
    var safeMaxBase = clampNum(len - safeOffsetB - effBuffer, len * 0.65, len);
    var c;
    for (c = 0; c < centipedeCount; c++) {
      // Acha a posicao de nascimento ANTES de criar qualquer malha 3D - se
      // nao achar um lugar seguro (fora do inicio/checkpoint) em 8
      // tentativas, pula esse lobo por completo (mesma regra dos
      // obstaculos). Fazer essa busca primeiro evita deixar pedacos de
      // malha "orfaos" na cena (sem lobo nenhum dono deles) quando o
      // nascimento e pulado.
      // Mesma distribuicao ESTRATIFICADA dos obstaculos (ver comentario la)
      // - cada lobo nasce na sua propria fatia do trecho, pra nao amontoar
      // todos perto de um so ponto por coincidencia do sorteio.
      var uBinWidth = Math.max(0.001, safeMaxBase - safeMinBase) / centipedeCount;
      var uBinStart = safeMinBase + uBinWidth * c;
      var startU = 0, startV = 0, foundSafeSpawn = false;
      var spawnAttempt;
      var centipedeZone = (c + centipedeZonePhase) % HAZARD_LATERAL_ZONES;
      for (spawnAttempt = 0; spawnAttempt < 8; spawnAttempt++) {
        var candU = uBinStart + Math.random() * uBinWidth;
        // O bin de vMin/vMax certo depende de ONDE ao longo da trilha o
        // candidato caiu (ver wolfLateralBounds/wolfVBoundsAtU) - pernas
        // longas tem varios bins, cada um com seu proprio alcance seguro.
        var candVBounds = wolfVBoundsAtU(wolfVBins, candU);
        var centipedeZoneRange = hazardLateralZoneRange(centipedeZone, candVBounds.vMin, candVBounds.vMax);
        var candV = centipedeZoneRange[0] + Math.random() * (centipedeZoneRange[1] - centipedeZoneRange[0]);
        var candX = a.x + ux * candU + nx * candV;
        var candZ = a.z + uz * candU + nz * candV;
        startU = candU; startV = candV;
        // So checa contra barreiras (G.barrierObstacles ja tem as desta
        // trilha, adicionadas logo acima) - o resto do desvio de barreira e
        // dinamico durante o jogo (ver pickCentipedeTargetV), mas o
        // NASCIMENTO precisa garantir de cara que o lobo nao aparece
        // enfiado dentro de uma.
        var candNearBarrier = false;
        var nb;
        for (nb = 0; nb < G.barrierObstacles.length; nb++) {
          var barN = G.barrierObstacles[nb];
          if (pointToSegmentDistance(candX, candZ, barN.ax, barN.az, barN.bx, barN.bz) < barN.radius + 3) {
            candNearBarrier = true;
            break;
          }
        }
        if (!isInsideAnyHazardFreeZone(candX, candZ) && !candNearBarrier) { foundSafeSpawn = true; break; }
      }
      if (!foundSafeSpawn) { continue; }

      var segments = [];
      var s;
      for (s = 0; s < 5; s++) {
        var r = s === 0 ? 1.3 : (1.0 - s * 0.08);
        if (r < 0.5) { r = 0.5; }
        r *= WOLF_SIZE_SCALE;
        var sgeo = new THREE.SphereGeometry(r, 10, 10);
        // Mais ALTO so no visual (escala Y 1.6 para cima, base no mesmo lugar) - a
        // hitbox usa o raio r (WOLF_SIZE_SCALE), nao a malha.
        sgeo.scale(1, WOLF_VISUAL_TALL, 1);
        sgeo.translate(0, r * (WOLF_VISUAL_TALL - 1), 0);
        var smesh = new THREE.Mesh(sgeo, centipedeMat);

        if (s === 0) {
          // Cabeca do lobo: acrescenta duas orelhinhas para reforcar a
          // silhueta de lobo (o resto do corpo segue o mesmo rastro em
          // "cobra" usado para o corpo).
          var headGroup = new THREE.Group();
          headGroup.add(smesh);
          var earGeo = new THREE.ConeGeometry(0.32 * WOLF_SIZE_SCALE, 0.85 * WOLF_SIZE_SCALE, 6);
          var earL = new THREE.Mesh(earGeo, centipedeMat);
          earL.position.set(-0.55, r * 0.75 + r * (WOLF_VISUAL_TALL - 1) * 1.6, 0);
          earL.rotation.z = 0.3;
          headGroup.add(earL);
          var earR = new THREE.Mesh(earGeo, centipedeMat);
          earR.position.set(0.55, r * 0.75 + r * (WOLF_VISUAL_TALL - 1) * 1.6, 0);
          earR.rotation.z = -0.3;
          headGroup.add(earR);
          G.scene.add(headGroup);
          segments.push(headGroup);
        } else {
          G.scene.add(smesh);
          segments.push(smesh);
        }
      }

      // Velocidade base (ver CENTIPEDE_SPEED_AT_START/END/RATE acima -
      // inicio 20% mais rapido, final 20% mais lento que a formula
      // original, mesma progressao), com o mesmo reforco extra de
      // dificuldade dos checkpoints 13/16 (difficultyTierMultiplier) aplicado
      // aqui tambem - "dificuldade", nao so "quantidade"; a dificuldade
      // dinamica (G.difficultyMultiplier) continua multiplicando isso ainda
      // mais em cima, em tempo real, conforme o jogador alcanca checkpoints.
      var speed = (CENTIPEDE_SPEED_AT_START + diffIndex * CENTIPEDE_SPEED_RATE) * difficultyTierMultiplier(diffIndex) + Math.random() * 2.2;

      // Mira inicial ja usa a mesma logica de mira do resto da caminhada
      // (ver pickCentipedeTargetV) - pode ser perto da borda ou em qualquer
      // ponto da largura, em vez de sempre um "cruzamento" previsivel.
      var newCent = {
        segStartX: a.x, segStartZ: a.z,
        ux: ux, uz: uz, nx: nx, nz: nz,
        // CRITICO: precisa ser safeOffsetA/B (medido contra zona segura de
        // verdade), NAO trimA/trimB (so a duna fisica) - era essa a causa
        // real do lobo "travado" (ver findSafeUOffset): com trimA/trimB, o
        // lobo podia vagar (via crossingTilt) ate uma faixa de "u" onde a
        // zona segura de um checkpoint alargado cobre o corredor INTEIRO
        // (toda largura), e dali nao tinha pra onde se mexer sem cair
        // dentro dela (desfeito todo frame por updateCentipedes).
        uMin: safeOffsetA, uMax: len - safeOffsetB,
        vBins: wolfVBins,
        u: startU, v: startV,
        headingLocal: Math.random() * Math.PI * 2,
        targetV: 0,
        lastZone: centipedeZone,
        crossingTilt: (Math.random() * 2 - 1) * CENTIPEDE_TILT_MAX,
        pausedUntil: 0,
        slowUntil: 0, // ver executePush - SLOW temporario ao ser empurrado
        speed: speed,
        segments: segments,
        trailHistory: [],
        trailSpacing: CENTIPEDE_TRAIL_SPACING,
        maxHistory: 5 * CENTIPEDE_TRAIL_SPACING + 4
      };
      // Mira inicial ja usa a mesma logica de mira do resto da caminhada
      // (ver pickCentipedeTargetV): fatia lateral diferente da anterior
      // (aqui, "nenhuma" ainda, ver lastZone:-1), garantindo cobertura da
      // largura toda desde o primeiro movimento.
      newCent.targetV = pickCentipedeTargetV(newCent);
      // Aparencia de LOBO (corpo, cabeca, orelhas, cauda, 4 patas que andam): os 5
      // segmentos viram a HITBOX invisivel; a colisao nao muda.
      var wi;
      for (wi = 0; wi < segments.length; wi++) { segments[wi].visible = false; }
      newCent.visual = createWolfVisual();
      G.scene.add(newCent.visual);
      G.centipedes.push(newCent);
    }
  }
}

/* ===================== PERSONAGENS (3 classes, low-poly) ===================== */
// Classes jogaveis por enquanto (selecao de personagem, ver select-screen):
//   plant = Verde/Planta, beast = Laranja/Besta, aqua = Azul/Aquatica.
// Modelos 3D simples e low-poly montados so com primitivas do Three.js, nas
// cores de cada classe (inspirados nas imagens enviadas). Todos seguem a
// convencao do jogo: "frente" = +Z local (olhos), mesmo corpo/tamanho do
// Axie de antes - so muda a aparencia, nao a colisao.
var AXIE_CLASSES = {
  plant: { body: 0x9be21c, feet: 0x7bc010, img: 'axie_plant.jpg' }, // nome/dica/descricao: chaves class.plant.* em I18N
  beast: { body: 0xffa31f, feet: 0xe08a10, img: 'axie_beast.jpg' },
  aqua: { body: 0x2ee8cc, feet: 0x22c4ab, img: 'axie_aqua.jpg' }
};

// Normais por face (toNonIndexed + computeVertexNormals) = aparencia facetada.
function lowPolyGeo(geo) {
  var g = geo.toNonIndexed();
  g.computeVertexNormals();
  return g;
}

function axiePart(group, geo, color, x, y, z, rx, ry, rz) {
  var mesh = new THREE.Mesh(lowPolyGeo(geo), new THREE.MeshLambertMaterial({ color: color }));
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx || 0, ry || 0, rz || 0);
  group.add(mesh);
  return mesh;
}

function buildAxieModel(cls) {
  var def = AXIE_CLASSES[cls] || AXIE_CLASSES.beast;
  var g = new THREE.Group();
  var bodyGeo = new THREE.SphereGeometry(1.8, 12, 9);
  bodyGeo.scale(1.08, 0.86, 1.1);
  axiePart(g, bodyGeo, def.body, 0, 0, 0);
  var sx, sz;
  for (sx = -1; sx <= 1; sx += 2) {
    for (sz = -1; sz <= 1; sz += 2) {
      axiePart(g, new THREE.SphereGeometry(0.5, 6, 5), def.feet, sx * 0.9, -1.4, sz * 0.85);
    }
  }
  var s, a;
  if (cls === 'plant') {
    // PLANTA (arte 2D): olhos pequenos e brabos, BIGODAO branco caido, elmo de ferro surrado,
    // suculenta nas costas, cicatriz em X no flanco e broto de folha na cauda.
    for (s = -1; s <= 1; s += 2) {
      axiePart(g, new THREE.SphereGeometry(0.2, 6, 5), 0x1e2a1a, s * 0.62, 0.5, 1.78);
      axiePart(g, new THREE.BoxGeometry(0.8, 0.17, 0.14), 0x24361a, s * 0.62, 0.98, 1.68, 0, 0, s * 0.5);
      // bigode: duas pontas grossas caindo pra fora
      axiePart(g, new THREE.ConeGeometry(0.5, 2.0, 5), 0xf4f1e6, s * 1.07, -0.72, 1.86, 0, 0, -s * 1.95);
      axiePart(g, new THREE.ConeGeometry(0.34, 1.5, 5), 0xd9d5c4, s * 0.92, -1.0, 1.8, 0, 0, -s * 2.25);
    }
    axiePart(g, new THREE.SphereGeometry(0.42, 6, 5), 0xf4f1e6, 0, -0.3, 1.95);
    // elmo de ferro
    var helm = new THREE.SphereGeometry(1.15, 9, 5, 0, Math.PI * 2, 0, Math.PI / 2);
    helm.scale(1, 0.85, 1);
    axiePart(g, helm, 0x7c8288, 0.15, 1.05, 0.55, -0.12, 0, -0.1);
    axiePart(g, new THREE.CylinderGeometry(1.22, 1.28, 0.24, 9), 0x50555a, 0.15, 1.03, 0.55, -0.12, 0, -0.1);
    axiePart(g, new THREE.BoxGeometry(0.16, 0.22, 2.1), 0x484c50, 0.15, 1.95, 0.55, -0.12, 0, -0.1);
    axiePart(g, new THREE.BoxGeometry(0.5, 0.1, 0.1), 0x2c2f33, 0.6, 1.6, 1.05, 0, 0, 0.9);
    axiePart(g, new THREE.SphereGeometry(0.16, 5, 4), 0x7fb03a, -0.35, 1.5, 0.35);
    var rv;
    for (rv = -2; rv <= 2; rv++) { axiePart(g, new THREE.SphereGeometry(0.08, 4, 3), 0xd5d8db, 0.15 + rv * 0.42, 1.15, 1.62 - Math.abs(rv) * 0.12); }
    // suculenta: roseta de petalas menta nas costas
    for (a = 0; a < 7; a++) {
      var pa = a * 0.898;
      axiePart(g, new THREE.ConeGeometry(0.42, 1.35, 5), a % 2 ? 0x5fc9b0 : 0x8be9d2, -0.55 + Math.cos(pa) * 0.55, 1.2 + 0.05 * (a % 2), -1.0 + Math.sin(pa) * 0.55, Math.sin(pa) * 0.75, 0, -Math.cos(pa) * 0.75);
    }
    axiePart(g, new THREE.ConeGeometry(0.34, 1.1, 5), 0xc4f5e8, -0.55, 1.45, -1.0);
    // cicatriz em X (flanco esquerdo)
    axiePart(g, new THREE.BoxGeometry(0.07, 1.05, 0.15), 0x467e14, -1.9, 0.15, 0.35, 0.75, 0, 0);
    axiePart(g, new THREE.BoxGeometry(0.07, 1.05, 0.15), 0x467e14, -1.9, 0.15, 0.35, -0.75, 0, 0);
    // broto de folha na cauda
    axiePart(g, new THREE.ConeGeometry(0.4, 1.3, 5), 0x76d92a, -1.55, -0.3, -1.6, -1.7, 0, 0.3);
    axiePart(g, new THREE.ConeGeometry(0.3, 1.0, 5), 0x9be21c, -1.75, -0.15, -1.9, -1.9, 0, 0.6);
  } else if (cls === 'aqua') {
    // AQUATICA (arte 2D): olhos de conta, bochechas rosa, sorriso, garras de caranguejo
    // vermelhas no topo, barbatanas azuis (traseira e lateral) e barriga clara.
    axiePart(g, new THREE.SphereGeometry(1.25, 9, 6), 0x9ff7e8, 0, -0.55, 0.75, 0, 0, 0);
    for (s = -1; s <= 1; s += 2) {
      axiePart(g, new THREE.SphereGeometry(0.34, 7, 6), 0x2b1a3a, s * 0.8, 0.5, 1.72);
      axiePart(g, new THREE.SphereGeometry(0.11, 5, 4), 0xffffff, s * 0.72, 0.66, 2.02);
      axiePart(g, new THREE.SphereGeometry(0.4, 6, 5), 0xff8fb1, s * 1.3, -0.1, 1.42, 0, 0, 0);
      // garras (pinça de duas pontas) vermelhas com ponta clara
      axiePart(g, new THREE.ConeGeometry(0.58, 1.35, 5), 0xe8483a, s * 0.95, 1.75, 0.15, 0, 0, -s * 0.5);
      axiePart(g, new THREE.ConeGeometry(0.42, 1.05, 5), 0xf05f4d, s * 1.5, 1.6, 0.05, 0, 0, -s * 0.05);
      axiePart(g, new THREE.ConeGeometry(0.22, 0.5, 4), 0xffd7cf, s * 1.02, 2.3, 0.15, 0, 0, -s * 0.5);
      // barbatana lateral
      axiePart(g, new THREE.ConeGeometry(0.5, 1.5, 4), 0x5aa8e8, s * 1.95, -0.1, -0.6, 0, 0, -s * 1.2);
    }
    axiePart(g, new THREE.TorusGeometry(0.3, 0.07, 4, 8, Math.PI), 0x2b1a3a, 0, -0.32, 2.02, 0, 0, Math.PI);
    var fin = axiePart(g, new THREE.ConeGeometry(0.95, 2.1, 4), 0x6fb6e8, 0, 0.1, -2.35, -1.6, 0, 0);
    fin.scale.set(0.35, 1, 1);
    axiePart(g, new THREE.ConeGeometry(0.4, 1.0, 4), 0x8ad0f5, 0, 1.5, -0.4, -0.5, 0, 0);
    axiePart(g, new THREE.ConeGeometry(0.15, 0.6, 4), 0x6acb5a, 0, 1.65, 0.7);
  } else {
    // BESTA (arte 2D): olhos grandes verde-agua com brilho, focinho claro, orelhas de raposa
    // grandes, folha de caqui no topo, chifre marrom atras e cauda felpuda branca.
    axiePart(g, new THREE.SphereGeometry(1.25, 9, 6), 0xffd9a0, 0, -0.5, 0.95, 0, 0, 0);
    for (s = -1; s <= 1; s += 2) {
      // olho de GATO da arte 2D "colado" na cara (nada sai pra fora do corpo): discos FINOS
      // empilhados sobre a superficie do corpo e alinhados a normal dela. Amendoado, verde com miolo
      // claro, contorno verde-escuro, pupila em FENDA vertical e brilho branco.
      var eyeX = s * 0.8, eyeY = 0.5;
      var eyeZ = 1.98 * Math.sqrt(Math.max(0.05, 1 - (eyeX / 1.944) * (eyeX / 1.944) - (eyeY / 1.548) * (eyeY / 1.548)));
      var eyeN = new THREE.Vector3(eyeX / (1.944 * 1.944), eyeY / (1.548 * 1.548), eyeZ / (1.98 * 1.98)).normalize();
      var eye = new THREE.Group();
      eye.position.set(eyeX, eyeY, eyeZ);
      eye.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), eyeN);
      eye.rotateZ(-s * 0.16); // canto externo um pouco mais alto (olhar de gato)
      eye.scale.set(0.75, 0.75, 1); // olho 25% menor (so largura/altura; a espessura fina continua rente a cara)
      g.add(eye);
      var eyeLayers = [
        [0.8, 0.72, 0x1c5e34, 0.12, 0, 0],
        [0.68, 0.6, 0x55d47c, 0.15, 0, -0.02],
        [0.44, 0.4, 0x9beb92, 0.18, 0, 0.04],
        [0.12, 0.46, 0x0c2a17, 0.2, 0, 0],
        [0.72, 0.6, 0x1c5e34, 0.12, 0, 0.13], // borda superior mais grossa (palpebra), dentro do contorno
        [0.14, 0.14, 0xffffff, 0.23, -0.24, 0.24]
      ];
      var li;
      for (li = 0; li < eyeLayers.length; li++) {
        var L = eyeLayers[li];
        var eg = new THREE.SphereGeometry(1, 16, 10);
        eg.scale(L[0], L[1], 0.05);
        axiePart(eye, eg, L[2], L[4], L[5], L[3]);
      }
      axiePart(g, new THREE.ConeGeometry(0.85, 2.0, 4), def.body, s * 1.0, 1.75, 0.2, 0, 0, -s * 0.25);
      axiePart(g, new THREE.ConeGeometry(0.5, 1.35, 4), 0xffd9a0, s * 1.0, 1.7, 0.42, 0, 0, -s * 0.25);
    }
    axiePart(g, new THREE.SphereGeometry(0.17, 5, 4), 0x5a3b1e, 0, -0.12, 2.05);
    axiePart(g, new THREE.TorusGeometry(0.22, 0.05, 4, 8, Math.PI), 0x5a3b1e, 0, -0.42, 1.98, 0, 0, Math.PI);
    // folha de caqui: 4 folhas em cruz + talo
    for (a = 0; a < 4; a++) {
      var la = a * 1.571 + 0.4;
      axiePart(g, new THREE.ConeGeometry(0.5, 1.3, 4), a % 2 ? 0x5fae2c : 0x7fc63a, Math.cos(la) * 0.55, 1.5, 0.2 + Math.sin(la) * 0.55, Math.sin(la) * 1.15, 0, -Math.cos(la) * 1.15);
    }
    axiePart(g, new THREE.CylinderGeometry(0.15, 0.2, 0.7, 5), 0x8a9a3a, 0, 1.85, 0.2);
    // chifre marrom e cauda felpuda
    axiePart(g, new THREE.ConeGeometry(0.42, 1.6, 5), 0x8a5a2b, -1.5, 0.9, -0.9, -0.3, 0, 0.6);
    axiePart(g, new THREE.SphereGeometry(0.85, 7, 6), 0xf2eee4, 0, 0.1, -2.2);
    axiePart(g, new THREE.ConeGeometry(0.6, 1.2, 5), 0xffffff, 0, 0.5, -2.9, -1.2, 0, 0);
  }
  return g;
}
function createPlayer() {
  // Mesmo tamanho e mesmo circulo de time dos bots (createAxieWithRing).
  G.player.team = 'teamA';
  var group = createAxieWithRing(parseInt(TEAM_COLORS.teamA.substring(1), 16), G.playerClass || 'beast');

  G.player.group = group;
  G.player.cls = G.playerClass || 'beast';
  G.player.name = G.playerName || TXT('player.default');
  G.player.lives = G.player.cls === 'plant' ? LIVES_PLANT : 1;
  G.player.lifeTimer = 0;
  G.player.position = new THREE.Vector3(G.startPosition.x, 0, G.startPosition.z);
  G.player.heading = 0;
  G.player.currentSpeed = 0;
  group.position.set(G.player.position.x, 2.0, G.player.position.z);
}

/* ================================ TIMES (BASE) ============================== */
// Base do sistema hibrido de times pedido pelo usuario: sem rede de
// verdade ainda (o jogador local e o unico humano) - aliados/inimigos sao
// bots BEM simples que so percorrem a mesma sequencia de quinas do mapa
// (G.corners, do inicio ate a quina 0) em linha reta, SEM desviar de
// obstaculos/lobos/paredes onduladas (simplificacao intencional de uma
// "base" - da pra evoluir pra uma IA de verdade depois, reusando
// resolveWallCollisions como os lobos fazem). Servem pra dar corpo real ao
// HUD de times, ao minimapa colorido por time, ao salvamento/interferencia
// e ao catch-up de cooldown - sem eles nenhuma dessas telas teria com quem
// comparar.
var BOT_SIZE_SCALE = 1.3;
var BOT_NAMES = ['Nino', 'Kiko', 'Luma', 'Bento', 'Zeca', 'Mimi', 'Tuca', 'Rafa'];

// Cada bot usa o modelo 3D de uma das 3 classes (ver buildAxieModel) e um
// anel achatado na COR DO TIME no chao - o time continua obvio de longe
// (aliado x rival), mesmo com corpos coloridos por classe. group.userData.model
// e so o corpo (o anel nao inclina quando o bot congela, ver freezeBot).
// Pedido do usuario: TODOS os Axies (jogador e bots) com o MESMO tamanho e o
// mesmo circulo de time sob os pes. Um unico ponto de montagem
// (createAxieWithRing) serve aos dois, entao nao ha como divergirem.
var AXIE_SCALE = PLAYER_VISUAL_SCALE * BOT_SIZE_SCALE;

// Circulo de time: anel opaco forte + disco translucido dentro. O anel fica
// no grupo (nao no modelo), entao nao inclina quando o Axie congela.
function createTeamRing(color) {
  var ring = new THREE.Mesh(
    new THREE.RingGeometry(2.1, 3.0, 28),
    new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -1.05;
  var disc = new THREE.Mesh(
    new THREE.CircleGeometry(2.1, 28),
    new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.4, side: THREE.DoubleSide, depthWrite: false })
  );
  ring.add(disc);
  ring.userData.disc = disc;
  return ring;
}
function setTeamRingColor(ring, hex) {
  ring.material.color.setHex(hex);
  if (ring.userData.disc) { ring.userData.disc.material.color.setHex(hex); }
}
function createAxieWithRing(color, cls) {
  var group = new THREE.Group();
  var model = buildAxieModel(cls);
  group.add(model);
  var ring = createTeamRing(color);
  group.add(ring);
  group.userData.model = model;
  group.userData.ring = ring;
  group.scale.set(AXIE_SCALE, AXIE_SCALE, AXIE_SCALE);
  G.scene.add(group);
  return group;
}
function createTeamBotMesh(color, cls) {
  return createAxieWithRing(color, cls);
}

// routeCornerIndex comeca em corners.length-1 (o INICIO, ver inversao em
// init()) e desce ate 0 (o checkpoint FINAL) - a mesma direcao de jornada
// do jogador. sideOffset so afasta um pouco o ponto de partida visual (em
// unidades, perpendicular a primeira perna) pra ninguem nascer exatamente
// em cima de outro Axie.
function createTeamBot(team, color, sideOffset, cls) {
  var startCorner = G.corners[G.corners.length - 1];
  var nextCorner = G.corners[G.corners.length - 2];
  var dx = nextCorner.x - startCorner.x, dz = nextCorner.z - startCorner.z;
  var len = Math.sqrt(dx * dx + dz * dz) || 1;
  var nx = -dz / len, nz = dx / len;
  var group = createTeamBotMesh(color, cls);
  var startX = startCorner.x + nx * sideOffset;
  var startZ = startCorner.z + nz * sideOffset;
  group.position.set(startX, 2.0, startZ);
  return {
    team: team,
    group: group,
    position: new THREE.Vector3(startX, 0, startZ),
    routeCornerIndex: G.corners.length - 1,
    cls: cls,
    // Ultimo checkpoint REAL alcancado por este bot (deteccao de zona em
    // ordem, um por vez - ver updateTeamBot) - usado pro catch-up/lideranca
    // e pro respawn INDIVIDUAL (ver respawnBot: nunca o checkpoint de outro).
    lastCheckpointIndex: -1,
    state: 'racing', // 'racing' | 'frozen'
    reachedEnd: false, // ja entrou no ponto FINAL (continua ativo: pode salvar, usar skills, congelar)
    cd: { f: 0, g: 0 }, // skills de classe: instante em que ficam prontas (ver botCombat)
    charges: { f: cls === 'plant' ? LEAF_CHARGES : (cls === 'aqua' ? JET_CHARGES : 0), g: cls === 'aqua' ? SPIT_CHARGES : 0 },
    chargeAt: { f: 0, g: 0 },
    combatAt: 0,
    frozenUntil: 0,
    invulnUntil: 0, // i-frames apos ser salvo/respawnar (ver unfreezeBot)
    rescueTarget: null, // aliado congelado que ESTE bot foi escalado pra salvar (ver updateRescues)
    rescuePath: null, rescueFor: null, rescuePathAt: 0, rescueNearT: 0,
    lastHazard: null, // ultimo perigo que encostou (ver botTouchesHazard)
    name: BOT_NAMES[G.botNameCounter++ % BOT_NAMES.length],
    teamHex: new THREE.Color(color).getHex(),
    ringHex: null,
    lives: cls === 'plant' ? LIVES_PLANT : 1,
    lifeTimer: 0,
    slowFactor: 1,
    rootUntil: 0,
    steerLockUntil: 0,
    orbitKey: '', orbitBest: 0, orbitAcc: 0, rescueBanTarget: null, rescueBanUntil: 0, progAt: 0, progRem: 0, recoverUntil: 0, slipping: false, slipZone: null, slipStart: 0, slipCx: 0, slipCz: 0, slipR: 0, faceUntil: 0, faceAngle: 0,
    leafStacks: 0, leafExpire: 0,
    dirX: dx / len, dirZ: dz / len, // ja nasce virado pra saida (a curva e limitada por TURN_RATE)
    avoidSide: Math.random() < 0.5 ? 1 : -1,
    stuckT: 0, sidestepUntil: 0,
    dashRemaining: 0, dashDirX: 0, dashDirZ: 1, dashReady: 0, tpReady: 0, skillCheckAt: 0,
    slowUntil: 0, // ver executePush - SLOW temporario ao ser empurrado
    stunnedUntil: 0, // ver executePush - "mini stun" ao bater numa parede empurrado
    speed: BASE_SPEED * (0.82 + Math.random() * 0.18)
  };
}

// ============================================================================
// BASE DO MODO EM TIMES (agora 3x3: 6 vagas, TEAM_SIZE=3 por time).
// Hoje SO o slot 0 e humano (o jogador local, controlado por teclado/
// joystick) - os outros 5 sao bots simples (ver createTeamBot, sem rede de
// verdade). G.slots documenta essa estrutura de forma EXPLICITA (nao so
// "allies[]"/"enemies[]" implicitos) pra deixar claro onde um jogador de
// verdade entraria:
//
//   slot 0 - teamA - HUMANO (jogador local, G.player)
//   slots 1-2 - teamA - bots (G.allies)
//   slots 3-5 - teamB - bots (G.enemies)
//
// O QUE FALTA PRA VIRAR REDE DE VERDADE (documentado aqui, nao implementado
// nesta base):
//   1) Transporte (WebSocket/WebRTC) conectando ate 4 clientes numa mesma
//      partida/sala (lobby simples: cria/entra numa sala por codigo).
//   2) Cada slot 'bot' vira 'remote': em vez de updateTeamBot rodar a IA
//      local, o slot recebe (x,z,heading,state,lastCheckpointIndex) por
//      rede a cada frame/tick, e so INTERPOLA a posicao recebida (ver
//      updateTeamBot - o mesmo campo group/position ja existe, so a FONTE
//      do movimento mudaria de "IA" pra "rede").
//   3) Autoridade de colisao/checkpoint/morte: hoje cada instancia local
//      decide sozinha (checkCollisions so roda pro jogador local). Rede de
//      verdade precisa de UMA fonte de verdade (servidor, ou o proprio
//      host/P2P) pra checkpoints/mortes de jogadores remotos nao
//      divergirem entre clientes.
//   4) Sincronizar G.matchWinner/G.totalCheckpoints entre clientes (hoje e
//      100% local).
// ============================================================================
// Times de TEAM_SIZE jogadores (3x3): o humano + 2 bots aliados contra 3 bots
// rivais (as regras de resgate/wipe/vitoria valem pra qualquer tamanho).
var TEAM_SIZE = 3;
// Bot so sai pra salvar um aliado congelado se ele for o aliado MAIS PROXIMO
// e estiver a no maximo essa distancia (pedido do usuario: nada de bot
// correndo/teleportando de longe so pra descongelar).
var BOT_RESCUE_MAX_DISTANCE = 220;
var CLASS_KEYS = ['plant', 'beast', 'aqua'];

function createTeamBots() {
  var playerClassIdx = Math.max(0, CLASS_KEYS.indexOf(G.playerClass || 'beast'));
  var allyOffsets = [10, 22, 34];
  var enemyOffsets = [-26, -38, -50]; // celas dos times bem separadas (menos caos na largada) // afastados do jogador: cada time fica na SUA cela (ver createStartCells)
  var i;
  G.slots = [{ slotIndex: 0, team: 'teamA', kind: 'human', ref: G.player }];
  for (i = 0; i < TEAM_SIZE - 1; i++) {
    // aliados: as outras classes, na ordem; rivais: classes variadas
    var ally = createTeamBot('teamA', TEAM_COLORS.teamA, allyOffsets[i], CLASS_KEYS[(playerClassIdx + 1 + i) % CLASS_KEYS.length]);
    G.allies.push(ally);
    G.slots.push({ slotIndex: G.slots.length, team: 'teamA', kind: 'bot', ref: ally });
  }
  for (i = 0; i < TEAM_SIZE; i++) {
    var enemy = createTeamBot('teamB', TEAM_COLORS.teamB, enemyOffsets[i], CLASS_KEYS[(playerClassIdx + i) % CLASS_KEYS.length]);
    G.enemies.push(enemy);
    G.slots.push({ slotIndex: G.slots.length, team: 'teamB', kind: 'bot', ref: enemy });
  }
}

// ---- Congelar / salvar / respawn dos BOTS (mesma logica do jogador) ----
var BOT_HIT_RADIUS = PLAYER_RADIUS;

// Centro real da area do checkpoint (mesma conta de respawnPlayer) ou o
// ponto de partida se ainda nao alcancou nenhum.
function checkpointCenterOrStart(index) {
  if (index >= 0 && G.checkpoints[index]) {
    var cp = G.checkpoints[index];
    return { x: (cp.xMin + cp.xMax) / 2, z: (cp.zMin + cp.zMax) / 2 };
  }
  return G.startPosition;
}

function freezeBot(bot) {
  if (bot.state !== 'racing') { return; }
  if (bot.cls === 'plant' && bot.dashRemaining > 0) { return; } // Planta nao congela durante o Dash
  if (absorbHit(bot)) { return; } // Planta: gasta uma vida em vez de congelar
  bot.state = 'frozen';
  playSfxAt('freeze', bot.position.x, bot.position.z);
  bot.helpCalled = false; // o bot congelado tambem pede socorro (alerta no minimapa), um pouco depois
  bot.helpCallAt = G.totalTime + 0.6 + Math.random() * 1.2;
  bot.frozenUntil = G.totalTime + FREEZE_DURATION;
  bot.rescueTarget = null;
  if (bot.group && bot.group.userData.model) { bot.group.userData.model.rotation.z = Math.PI / 2.1; }
}

// Respawn INDIVIDUAL: no ultimo checkpoint que ESTE bot alcancou (nunca no
// de outro aliado - nao pula checkpoint).
function respawnBot(bot) {
  var target = checkpointCenterOrStart(bot.lastCheckpointIndex);
  bot.position.set(target.x, 0, target.z);
  bot.group.position.set(target.x, 2.0, target.z);
  spawnEffectBurst(target.x, target.z, RESPAWN_BURST_COLOR);
}

// reason: 'ally' (salvo por aliado, fica no lugar), 'timeout' (estourou o
// tempo) ou 'wipe' (time inteiro congelado) - os dois ultimos respawnam.
function unfreezeBot(bot, reason) {
  if (reason === 'ally') { playSfxAt('save', bot.position.x, bot.position.z); }
  if (reason !== 'ally') { respawnBot(bot); } else { spawnEffectBurst(bot.position.x, bot.position.z, RESPAWN_BURST_COLOR); }
  bot.state = 'racing';
  bot.rescueTarget = null;
  bot.lives = 1;
  bot.lifeTimer = 0;
  bot.dashRemaining = 0;
  if (bot.group && bot.group.userData.model) { bot.group.userData.model.rotation.z = 0; }
  bot.invulnUntil = G.totalTime + (reason === 'ally' ? ALLY_SAVE_IFRAME : RESPAWN_IFRAME);
  // Continua a rota DE ONDE ESTA (no lugar onde foi salvo / no checkpoint do respawn).
  resyncBotRoute(bot);
}

// Perigos congelam bots como congelam o jogador (obstaculo letal ou lobo).
// Os bots andam em linha reta (sem desviar de nada, ver updateTeamBot), entao
// so uma parte dos contatos vira congelamento (BOT_HIT_CHANCE = "desviou
// de ultima hora" no resto) - sorteada UMA vez por encontro (o mesmo perigo
// nao e sorteado de novo a cada frame de sobreposicao).
var BOT_HIT_CHANCE = 0.6;
function botTouchesHazard(bot, hazard) {
  if (bot.lastHazard === hazard) { return; }
  bot.lastHazard = hazard;
  if (Math.random() < BOT_HIT_CHANCE) { freezeBot(bot); }
}

function checkBotHazards(bot) {
  if (G.totalTime < bot.invulnUntil) { return; }
  var bx = bot.position.x, bz = bot.position.z, i, dx, dz;
  for (i = 0; i < G.staticObstacles.length; i++) {
    var o = G.staticObstacles[i];
    dx = bx - o.x; dz = bz - o.z;
    var rr = o.radius + BOT_HIT_RADIUS;
    if (dx * dx + dz * dz < rr * rr) { botTouchesHazard(bot, o); return; }
  }
  var wr = 1.0 * WOLF_SIZE_SCALE + BOT_HIT_RADIUS;
  var c, s;
  for (c = 0; c < G.centipedes.length; c++) {
    var segs = G.centipedes[c].segments;
    for (s = 0; s < segs.length; s++) {
      dx = bx - segs[s].position.x; dz = bz - segs[s].position.z;
      if (dx * dx + dz * dz < wr * wr) { botTouchesHazard(bot, G.centipedes[c]); return; }
    }
  }
}

// Salvamento: bloqueado se algum RIVAL em corrida estiver perto do
// congelado (ENEMY_BLOCK_RANGE) - vale pro jogador e pros bots.
function isSaveBlocked(target) {
  var otherTeam = target.team === 'teamA' ? 'teamB' : 'teamA';
  var others = getTeamMembers(otherTeam), i;
  for (i = 0; i < others.length; i++) {
    if (others[i].state !== 'racing') { continue; }
    var dx = others[i].position.x - target.position.x, dz = others[i].position.z - target.position.z;
    if (dx * dx + dz * dz < ENEMY_BLOCK_RANGE * ENEMY_BLOCK_RANGE) { return true; }
  }
  return false;
}

function saveFrozenMember(target) {
  if (target.state !== 'frozen' || isSaveBlocked(target)) { return; }
  if (target === G.player) { unfreezePlayer('ally'); } else { unfreezeBot(target, 'ally'); }
}

function memberDistance(a, b) {
  var dx = a.position.x - b.position.x, dz = a.position.z - b.position.z;
  return Math.sqrt(dx * dx + dz * dz);
}

// REGRA DE RESGATE (pedido do usuario, revisada):
//  - o aliado em corrida MAIS PROXIMO do congelado (distancia REAL de
//    caminho, contornando paredes - nao a distancia reta) vai salvar;
//  - se quem ia salvar tambem congelar/morrer, outro aliado vivo assume (a
//    atribuicao e refeita quando muda quem esta congelado/vivo);
//  - com DOIS (ou mais) congelados e so UM vivo, ele salva o mais proximo
//    primeiro e, salvo esse, vai para o proximo - nunca fica sem tentar
//    salvar enquanto houver algum aliado vivo e algum congelado;
//  - o escalado ANDA seguindo um caminho que respeita as paredes (ver
//    botRescuePath) - sem atravessar parede e sem teleportar (ver
//    botUseSkills); ao salvar, continua a rota de onde esta (ver
//    resyncBotRoute), sem voltar ao ponto antigo.
// Se o mais proximo for o jogador humano, nenhum bot vai para aquele
// congelado (o humano decide; ele salva sozinho ao chegar em SAVE_RANGE).
// Existe caminho reto LIVRE de parede entre dois pontos? Salvar so vale com
// linha livre - um aliado "perto" do outro lado de uma parede (outra volta da
// espiral) NAO esta perto de verdade.
function hasClearLine(ax, az, bx, bz) {
  var dx = bx - ax, dz = bz - az, len = Math.sqrt(dx * dx + dz * dz);
  if (len < 2) { return true; }
  return clipStraightByWalls(ax, az, dx / len, dz / len, len) >= len - 1;
}

// Grade de estalagmites (celulas de 40) para o pathfinding sensivel a colunas;
// refeita quando o numero de obstaculos muda (destruidos por skills).
function getObstGrid() {
  if (!G.obstGridCache || G.obstGridCount !== G.staticObstacles.length) {
    var grid = {}, i;
    for (i = 0; i < G.staticObstacles.length; i++) {
      var o = G.staticObstacles[i], key = Math.floor(o.x / 40) + '_' + Math.floor(o.z / 40);
      if (!grid[key]) { grid[key] = []; }
      grid[key].push(o);
    }
    G.obstGridCache = grid;
    G.obstGridCount = G.staticObstacles.length;
  }
  return G.obstGridCache;
}
// Caminho MAIS CURTO tratando estalagmites como bloqueio (com folga); se nao
// houver (corredor apertado), cai no caminho so de paredes.
function botFindPath(ax, az, bx, bz) {
  return findPath(ax, az, bx, bz, { obstacles: true, obstGrid: getObstGrid(), obstMargin: 1.5 }) || findPath(ax, az, bx, bz);
}
// Recalcula o caminho do bot a partir da posicao atual ate o alvo atual
// (proxima quina da rota, ou o congelado que vai salvar).
function rerouteBot(bot) {
  if (bot.rescueTarget && bot.rescueTarget.state === 'frozen') { bot.rescuePathAt = -99; return; }
  var tc = G.corners[bot.routeCornerIndex - 1];
  if (!tc) { return; }
  var np = botFindPath(bot.position.x, bot.position.z, tc.x, tc.z);
  if (np) { bot.path = np; bot.pathKey = 'c' + bot.routeCornerIndex; }
}

function straightPath(ax, az, bx, bz) {
  var l = Math.sqrt((bx - ax) * (bx - ax) + (bz - az) * (bz - az));
  return { pts: [{ x: ax, z: az }, { x: bx, z: bz }], cum: [0, l], total: l };
}

// Perna da espiral (indice i = quina i -> quina i+1) mais proxima de um ponto.
function nearestLegIndex(x, z) {
  var best = Infinity, bi = 0, i;
  for (i = 0; i < G.corners.length - 1; i++) {
    var a = G.corners[i], b = G.corners[i + 1];
    var d = pointToSegmentDistance(x, z, a.x, a.z, b.x, b.z);
    if (d < best) { best = d; bi = i; }
  }
  return bi;
}

// Caminho da perna key (quina key -> quina key-1), calculado uma vez e guardado.
function legPathForKey(key) {
  if (!G.legPaths[key]) {
    var pc = G.corners[key], tc = G.corners[key - 1];
    G.legPaths[key] = findPath(pc.x, pc.z, tc.x, tc.z) || straightPath(pc.x, pc.z, tc.x, tc.z);
  }
  return G.legPaths[key];
}

function appendRoutePts(out, pts, reverse) {
  var i, n = pts.length;
  for (i = 0; i < n; i++) {
    var q = reverse ? pts[n - 1 - i] : pts[i];
    var last = out[out.length - 1];
    if (last && Math.abs(last.x - q.x) < 0.01 && Math.abs(last.z - q.z) < 0.01) { continue; }
    out.push({ x: q.x, z: q.z });
  }
}

// Caminho REAL ate um ponto: na mesma perna, busca direta; em outra perna
// (outra volta da espiral, separada por paredes), segue a propria ROTA da
// espiral quina a quina (para tras ou para a frente) e so entao vai ao ponto -
// nunca uma reta atravessando parede.
function routePath(ax, az, bx, bz) {
  var la = nearestLegIndex(ax, az), lb = nearestLegIndex(bx, bz), pts = [{ x: ax, z: az }], k, seg;
  if (la === lb) { return botFindPath(ax, az, bx, bz) || straightPath(ax, az, bx, bz); }
  var c, cx, cz;
  if (lb < la) {
    c = G.corners[la];
    seg = botFindPath(ax, az, c.x, c.z) || straightPath(ax, az, c.x, c.z);
    appendRoutePts(pts, seg.pts, false);
    for (k = la; k > lb + 1; k--) { appendRoutePts(pts, legPathForKey(k).pts, false); }
    c = G.corners[lb + 1];
  } else {
    c = G.corners[la + 1];
    seg = botFindPath(ax, az, c.x, c.z) || straightPath(ax, az, c.x, c.z);
    appendRoutePts(pts, seg.pts, false);
    for (k = la + 1; k < lb; k++) { appendRoutePts(pts, legPathForKey(k + 1).pts, true); }
    c = G.corners[lb];
  }
  seg = botFindPath(c.x, c.z, bx, bz) || straightPath(c.x, c.z, bx, bz);
  appendRoutePts(pts, seg.pts, false);
  var cum = [0], i;
  for (i = 1; i < pts.length; i++) { cum.push(cum[i - 1] + Math.sqrt((pts[i].x - pts[i - 1].x) * (pts[i].x - pts[i - 1].x) + (pts[i].z - pts[i - 1].z) * (pts[i].z - pts[i - 1].z))); }
  return { pts: pts, cum: cum, total: cum[cum.length - 1] };
}

// Caminho (com desvio de paredes) do bot ate o congelado que ele vai salvar;
// refeito a cada 2.5s ou se o alvo mudou.
function botRescuePath(bot) {
  var tg = bot.rescueTarget, now = G.totalTime;
  if (!bot.rescuePath || bot.rescueFor !== tg || now >= bot.rescuePathAt + 2.5) {
    bot.rescuePath = routePath(bot.position.x, bot.position.z, tg.position.x, tg.position.z);
    bot.rescueFor = tg;
    bot.rescuePathAt = now;
  }
  return bot.rescuePath;
}

// Depois de salvar/ser salvo (ou respawnar), a rota continua DE ONDE O BOT
// ESTA: acha a perna da espiral mais proxima (empate -> a mais a frente na
// jornada), aponta a rota para a proxima quina dela e calcula um caminho novo
// a partir da posicao atual (nada de voltar ao ponto antigo).
function resyncBotRoute(bot) {
  var best = Infinity, i, ds = [];
  for (i = 0; i < G.corners.length - 1; i++) {
    var a = G.corners[i], b = G.corners[i + 1];
    var d = pointToSegmentDistance(bot.position.x, bot.position.z, a.x, a.z, b.x, b.z);
    ds.push(d);
    if (d < best) { best = d; }
  }
  var bi = 0;
  for (i = 0; i < ds.length; i++) { if (ds[i] <= best + 2) { bi = i; break; } }
  bot.routeCornerIndex = bi + 1;
  var tc = G.corners[bi];
  bot.path = botFindPath(bot.position.x, bot.position.z, tc.x, tc.z) || straightPath(bot.position.x, bot.position.z, tc.x, tc.z);
  bot.progAt = 0;
  bot.pathKey = 'c' + bot.routeCornerIndex;
  bot.stuckT = 0;
  bot.dashRemaining = 0;
  bot.rescuePath = null;
  bot.rescueNearT = 0;
}

// Custo (distancia de caminho) de "cand" ate "target"; sem caminho, cai numa
// estimativa bem pior que qualquer caminho real. Guarda o caminho no bot.
function rescueCost(cand, target) {
  var p = routePath(cand.position.x, cand.position.z, target.position.x, target.position.z);
  return { cost: p.total, path: p };
}

function updateRescues() {
  // Reavalia so a cada 0.2s (as checagens custam).
  if (G.totalTime < G.rescueNext) { return; }
  G.rescueNext = G.totalTime + 0.2;
  var now = G.totalTime;
  if (!G.rescueSig) { G.rescueSig = {}; G.rescueRecalc = {}; }
  var teams = ['teamA', 'teamB'], t, i, m, f;
  for (t = 0; t < teams.length; t++) {
    var members = getTeamMembers(teams[t]);
    // 1) Salvamentos que ja podem acontecer: qualquer aliado em corrida
    //    (bot ou humano) perto do congelado e SEM parede no meio.
    for (f = 0; f < members.length; f++) {
      var fz = members[f];
      if (fz.state !== 'frozen') { continue; }
      for (m = 0; m < members.length; m++) {
        var sv = members[m];
        if (sv === fz || sv.state !== 'racing') { continue; }
        if (memberDistance(sv, fz) < SAVE_RANGE && hasClearLine(sv.position.x, sv.position.z, fz.position.x, fz.position.z)) {
          saveFrozenMember(fz);
          break;
        }
      }
    }
    // 2) Limpa escalados cujo alvo ja foi salvo/respawnou (seguem a rota de onde estao).
    for (m = 0; m < members.length; m++) {
      var mb = members[m];
      if (mb === G.player || !mb.rescueTarget) { continue; }
      if (mb.state !== 'racing' || mb.rescueTarget.state !== 'frozen') { mb.rescueTarget = null; if (mb.state === 'racing') { resyncBotRoute(mb); } }
    }
    // 3) Refaz a atribuicao so quando algo mudou (quem esta congelado / vivo)
    //    ou a cada 2s - o escalado atual nao troca de alvo a todo instante.
    var frozenL = [], freeL = [], sig = '';
    for (m = 0; m < members.length; m++) {
      if (members[m].state === 'frozen') { frozenL.push(members[m]); sig += 'F' + m; }
      else if (members[m].state === 'racing') { freeL.push(members[m]); sig += 'R' + m; } // quem ja chegou ao final tambem pode sair pra salvar
    }
    if (sig === G.rescueSig[teams[t]] && now < G.rescueRecalc[teams[t]]) { continue; }
    G.rescueSig[teams[t]] = sig;
    G.rescueRecalc[teams[t]] = now + 2;
    var before = [];
    for (m = 0; m < members.length; m++) {
      before.push(members[m].rescueTarget || null);
      if (members[m] !== G.player) { members[m].rescueTarget = null; }
    }
    // Atribuicao gulosa: par (vivo, congelado) de MENOR custo primeiro; o
    // vivo e o congelado saem da lista; repete - com um vivo so, ele pega o
    // mais proximo agora e o proximo depois (ver o passo 3 na proxima mudanca).
    var pairs = [];
    for (f = 0; f < frozenL.length; f++) {
      for (m = 0; m < freeL.length; m++) {
        if (freeL[m].rescueBanTarget === frozenL[f] && now < freeL[m].rescueBanUntil) { continue; } // desistiu (orbitando) - da um tempo
        var rc = rescueCost(freeL[m], frozenL[f]);
        pairs.push({ cand: freeL[m], target: frozenL[f], cost: rc.cost, path: rc.path });
      }
    }
    pairs.sort(function (p1, p2) { return p1.cost - p2.cost; });
    var usedC = [], usedT = [], k;
    for (k = 0; k < pairs.length; k++) {
      var pr = pairs[k];
      if (usedC.indexOf(pr.cand) !== -1 || usedT.indexOf(pr.target) !== -1) { continue; }
      usedC.push(pr.cand); usedT.push(pr.target);
      if (pr.cand === G.player) { continue; } // o humano decide sozinho
      pr.cand.rescueTarget = pr.target;
      pr.cand.rescueNearT = 0;
      // Bot que ja estava no ponto final SAI so pra ajudar (a rota o leva de volta
      // depois - ver resyncBotRoute/updateTeamBot).
      pr.cand.rescuePath = pr.path;
      pr.cand.rescueFor = pr.target;
      pr.cand.rescuePathAt = now;
    }
    // Bots que perderam a missao (alvo passou a ser atendido por outro) seguem a rota de onde estao.
    for (m = 0; m < members.length; m++) {
      if (members[m] !== G.player && before[m] && !members[m].rescueTarget && members[m].state === 'racing') { resyncBotRoute(members[m]); }
    }
  }
}
// WIPE DO TIME (pedido do usuario): se TODOS os membros do time estiverem
// congelados ao mesmo tempo, os TRES respawnam NA HORA, cada um no SEU
// proprio ultimo checkpoint (nunca no mais avancado de outro aliado).
function checkTeamWipe() {
  var teams = ['teamA', 'teamB'], t, i;
  for (t = 0; t < teams.length; t++) {
    var members = getTeamMembers(teams[t]);
    if (members.length === 0) { continue; }
    var allFrozen = true;
    for (i = 0; i < members.length; i++) {
      if (members[i].state !== 'frozen') { allFrozen = false; break; }
    }
    if (!allFrozen) { continue; }
    for (i = 0; i < members.length; i++) {
      if (members[i] === G.player) { respawnPlayer(); unfreezePlayer('timeout'); }
      else { unfreezeBot(members[i], 'wipe'); }
    }
    if (teams[t] === G.player.team) { showMessage(TXT('msg.teamElim'), 3); }
  }
}

function updateTeamBot(bot, delta) {
  if (bot.state === 'frozen') {
    // Estourou o tempo: respawn obrigatorio no ultimo checkpoint DESTE bot.
    if (G.totalTime >= bot.frozenUntil) { unfreezeBot(bot, 'timeout'); }
    return;
  }
  // "Mini stun" ao bater numa parede empurrado (ver executePush) - trava o
  // movimento por um instante breve, igual ao "pausedUntil" dos lobos.
  if (G.totalTime < bot.stunnedUntil) { return; }

  updateBotSlip(bot, delta);
  checkBotHazards(bot);
  if (bot.state === 'frozen') { if (bot.slipping) { endSlip(bot, false); } return; }
  updateBotStatusVisual(bot);
  botCombat(bot); // skills de classe (abrir caminho, atacar rivais, ajudar aliados)

  // Checkpoint REAL alcancado: testa so o PROXIMO da sequencia (nunca pula).
  var nextCp = G.checkpoints[bot.lastCheckpointIndex + 1];
  if (nextCp && isInsideCheckpointZone(nextCp, bot.position.x, bot.position.z)) {
    bot.lastCheckpointIndex += 1;
    if (bot.lastCheckpointIndex >= G.checkpoints.length - 1) { bot.reachedEnd = true; } // entrou no ponto final
  }

  // Preso (3o acerto das Folhas): nao anda.
  if (G.totalTime < bot.rootUntil) { return; }

  // So o aliado MAIS PROXIMO foi escalado pra salvar (ver updateRescues) -
  // ele anda (velocidade normal) ate o congelado; os outros seguem a rota.
  var rescuing = !!bot.rescueTarget && bot.rescueTarget.state === 'frozen';
  var targetX, targetZ;
  if (rescuing) {
    targetX = bot.rescueTarget.position.x;
    targetZ = bot.rescueTarget.position.z;
  } else {
    var targetCornerIdx = bot.routeCornerIndex - 1;
    if (targetCornerIdx < 0) {
      // Fim da rota: fica no ponto final (estado continua 'racing' - sofre dano,
      // usa skills e sai SO pra ajudar/salvar aliados, ver updateRescues).
      bot.reachedEnd = true;
      return;
    }
    var tc = G.corners[targetCornerIdx];
    targetX = tc.x;
    targetZ = tc.z;
  }

  var dx = targetX - bot.position.x, dz = targetZ - bot.position.z;
  var dist = Math.sqrt(dx * dx + dz * dz);
  if (dist < 12 && !rescuing) { // raio de chegada maior que o raio de curva freada (~11)
    bot.routeCornerIndex -= 1;
    return;
  }
  if (dist < 0.01) { return; }
  // Ja perto do congelado: fica esperando o salvamento (nao empilha em cima).
  if (rescuing && dist < SAVE_RANGE * 0.6) { return; }
  var wantX = dx / dist, wantZ = dz / dist;
  var pathRemaining = dist;
  if (rescuing) {
    // Salvando: segue o caminho ate o congelado (contorna paredes, nunca atravessa).
    var rcar = pathCarrot(botRescuePath(bot), bot.position.x, bot.position.z, 30);
    var rcx = rcar.x - bot.position.x, rcz = rcar.z - bot.position.z;
    var rcl = Math.sqrt(rcx * rcx + rcz * rcz);
    if (rcl > 1) { wantX = rcx / rcl; wantZ = rcz / rcl; }
    pathRemaining = rcar.remaining;
  } else {
    // Segue o CAMINHO da perna (contorna pontas de parede/barreira pelo vao
    // real - ver findPath): mira num ponto ~40 unidades a frente nele.
    var carrot = pathCarrot(botLegPath(bot), bot.position.x, bot.position.z, 40);
    var cdx = carrot.x - bot.position.x, cdz = carrot.z - bot.position.z;
    var cdl = Math.sqrt(cdx * cdx + cdz * cdz);
    if (cdl > 1) { wantX = cdx / cdl; wantZ = cdz / cdl; }
    pathRemaining = carrot.remaining;
  }

  var now = G.totalTime;
  var dirX, dirZ, stepSpeed, turnedNow = 0;

  if (bot.dashRemaining > 0) {
    // Dash em andamento: reta travada, velocidade constante, distancia exata.
    dirX = bot.dashDirX; dirZ = bot.dashDirZ; stepSpeed = DASH_SPEED;
  } else if (now < bot.steerLockUntil) {
    // "Cuspe de agua": nao consegue curvar - segue reto na direcao que tinha e
    // vai PERDENDO VELOCIDADE (de 100% a 25% em SPIT_SLIP_MIN).
    dirX = bot.dirX; dirZ = bot.dirZ;
    stepSpeed = bot.speed * Math.max(0.25, 1 - 0.75 * (now - bot.slipStart) / SPIT_SLIP_MIN);
  } else {
    // Desvia de perigos (obstaculos, lobos, barreiras) sem sair da trilha:
    // o movimento abaixo SEMPRE passa por moveWithCollision (paredes reais).
    var av = botAvoidance(bot, wantX, wantZ);
    dirX = wantX + av.x; dirZ = wantZ + av.z;
    if (now < bot.sidestepUntil) { dirX += -wantZ * bot.avoidSide * 1.2; dirZ += wantX * bot.avoidSide * 1.2; }
    var dl = Math.sqrt(dirX * dirX + dirZ * dirZ) || 1;
    dirX /= dl; dirZ /= dl;
    stepSpeed = bot.speed;
    // FISICA DE CURVA (sempre, a mesma do jogador no gelo - ver
    // updatePlayerMovement): o rumo real gira no MAXIMO TURN_RATE rad/s em
    // direcao ao rumo desejado. Nunca vira de uma vez - nem indo salvar, nem
    // depois de salvar/respawnar/escorregar (o rumo antigo e mantido).
    var curH = Math.atan2(bot.dirX, bot.dirZ), wantH = Math.atan2(dirX, dirZ);
    var dH = normalizeAngle(wantH - curH), maxT = TURN_RATE * delta;
    var limited = clampNum(dH, -maxT, maxT);
    turnedNow = Math.abs(limited);
    var skipSkills = Math.abs(dH) - maxT > 0.35; // ainda virando: nada de dash pro lado errado
    // Chegando perto do alvo (quina/checkpoint ou congelado) com o rumo errado:
    // reduz a velocidade (raio de curva menor) em vez de orbitar em volta dele
    // pra sempre - vale pra rota e pro resgate.
    if (dist < 60 && Math.abs(dH) > 0.5) { stepSpeed *= 0.4; }
    dirX = Math.sin(curH + limited); dirZ = Math.cos(curH + limited);
    if (!skipSkills) { botUseSkills(bot, dirX, dirZ, pathRemaining, rescuing); }
    if (bot.dashRemaining > 0) { dirX = bot.dashDirX; dirZ = bot.dashDirZ; stepSpeed = DASH_SPEED; }
    // Recuperando a velocidade depois de um escorregao.
    if (now < bot.recoverUntil) { stepSpeed *= 0.25 + 0.75 * clampNum(1 - (bot.recoverUntil - now) / SPIT_RECOVER_TIME, 0, 1); }
  }  if (bot.dashRemaining <= 0 && now < bot.slowUntil) { stepSpeed *= bot.slowFactor; }

  var dashedNow = bot.dashRemaining > 0, prevBX = bot.position.x, prevBZ = bot.position.z;
  var step = Math.min(stepSpeed * delta, bot.dashRemaining > 0 ? bot.dashRemaining : dist);
  if (bot.dashRemaining > 0) { bot.dashRemaining -= step; if (bot.dashRemaining < 0.01) { bot.dashRemaining = 0; } }
  var res = moveWithCollision(bot.position.x, bot.position.z, dirX * step, dirZ * step);
  var moved = Math.sqrt((res.x - bot.position.x) * (res.x - bot.position.x) + (res.z - bot.position.z) * (res.z - bot.position.z));
  bot.position.x = res.x;
  bot.position.z = res.z;
  bot.dirX = dirX; bot.dirZ = dirZ;
  if (dashedNow) { applyDashContacts(bot, prevBX, prevBZ, res.x, res.z); }

  // DETECTOR DE ORBITA (bug: bots girando em circulos dentro do checkpoint):
  // se o bot ja girou uma volta inteira perto do mesmo alvo sem chegar mais
  // perto, aceita o objetivo e segue - na rota, avanca pra proxima quina; no
  // resgate, desiste desse congelado por 6s e volta pra rota.
  var okey = rescuing ? 'r' + bot.rescueTarget.name : 'c' + bot.routeCornerIndex;
  if (bot.orbitKey !== okey) { bot.orbitKey = okey; bot.orbitBest = dist; bot.orbitAcc = 0; }
  else if (dist < bot.orbitBest - 1) { bot.orbitBest = dist; bot.orbitAcc = 0; }
  else { bot.orbitAcc += turnedNow; }
  if (bot.orbitAcc > Math.PI * 2) {
    bot.orbitAcc = 0;
    if (rescuing) {
      bot.rescueBanTarget = bot.rescueTarget;
      bot.rescueBanUntil = now + 6;
      bot.rescueTarget = null;
      resyncBotRoute(bot);
    } else {
      bot.routeCornerIndex -= 1;
      bot.pathKey = null;
      bot.path = null;
    }
  }

  // Preso contra uma parede/barreira? Troca o lado do desvio e da uma
  // andada lateral curta (nunca teleporta por cima de parede).
  if (moved < step * 0.3) { bot.stuckT += delta; } else { bot.stuckT = Math.max(0, bot.stuckT - delta * 2); }
  if (bot.stuckT > 1.0) {
    bot.avoidSide = -bot.avoidSide;
    bot.sidestepUntil = now + 0.9;
    bot.stuckT = 0;
    // Preso: recalcula a rota MAIS CURTA a partir de onde esta, agora
    // tratando estalagmites/colunas como bloqueio (ver rerouteBot).
    rerouteBot(bot);
  }
  // Sem progresso na rota por 2.5s (preso/rodando em volta de uma coluna sem
  // encostar de vez): tambem recalcula a rota alternativa.
  if (bot.dashRemaining <= 0 && !bot.slipping && now >= bot.progAt) {
    if (bot.progAt > 0 && bot.progRem - pathRemaining < 4) { rerouteBot(bot); }
    bot.progAt = now + 2.5;
    bot.progRem = pathRemaining;
  }
  bot.group.position.set(bot.position.x, 2.0, bot.position.z);
  bot.group.rotation.y = Math.atan2(dirX, dirZ); // rosto = rumo real (inclusive o sorteado no fim do escorregao)
}

// ---- IA basica dos bots: desvio de perigos + skills (dash/teleporte) ----
var BOT_LOOKAHEAD = 42;

// Vetor de desvio: para cada perigo (estalagmite, segmento de lobo, barreira)
// na frente do bot e perto o bastante da linha de movimento, empurra o rumo
// pro lado OPOSTO ao perigo (mais forte quanto mais perto).
function botAvoidance(bot, dirX, dirZ) {
  var bx = bot.position.x, bz = bot.position.z;
  var perpX = -dirZ, perpZ = dirX;
  var sx = 0, sz = 0;
  function consider(hx, hz, radius) {
    var rx = hx - bx, rz = hz - bz;
    var along = rx * dirX + rz * dirZ;
    if (along < -radius || along > BOT_LOOKAHEAD) { return; }
    var lateral = rx * perpX + rz * perpZ;
    var clear = radius + BOT_HIT_RADIUS + 3;
    if (Math.abs(lateral) > clear + 6) { return; }
    var side = lateral > 0 ? -1 : 1;
    if (Math.abs(lateral) < 0.8) { side = bot.avoidSide; }
    var w = 1 - clampNum(along / BOT_LOOKAHEAD, 0, 1);
    var lat = clampNum((clear + 6 - Math.abs(lateral)) / (clear + 6), 0, 1);
    sx += perpX * side * w * lat * 2.4;
    sz += perpZ * side * w * lat * 2.4;
  }
  var i, o;
  for (i = 0; i < G.staticObstacles.length; i++) {
    o = G.staticObstacles[i];
    if (Math.abs(o.x - bx) > BOT_LOOKAHEAD + 10 || Math.abs(o.z - bz) > BOT_LOOKAHEAD + 10) { continue; }
    consider(o.x, o.z, o.radius);
  }
  var wolfR = 1.0 * WOLF_SIZE_SCALE;
  var c, s;
  for (c = 0; c < G.centipedes.length; c++) {
    var segs = G.centipedes[c].segments;
    var head = segs[0].position;
    if (Math.abs(head.x - bx) > BOT_LOOKAHEAD + 20 || Math.abs(head.z - bz) > BOT_LOOKAHEAD + 20) { continue; }
    for (s = 0; s < segs.length; s++) { consider(segs[s].position.x, segs[s].position.z, wolfR); }
  }
  // Paredes NAO entram aqui: o caminho ja contorna paredes (ver findPath) e
  // moveWithCollision barra qualquer encostada.
  return { x: sx, z: sz };
}

/* ---- Pathfinding dos bots (nada de atalho por cima de parede) ---- */
// A linha reta entre quinas NAO e sempre livre (pontas de paredes/barreiras
// invadem o corredor - o jogador passa pelo vao). Cada perna da rota e
// resolvida UMA vez com BFS numa grade (celula = PATH_CELL) usando as mesmas
// paredes de colisao do jogador (raio da parede + PLAYER_RADIUS), e o caminho
// e "esticado" (string pulling) em poucos pontos. Os bots seguem esse
// caminho; se algo os prender, recalculam a partir da posicao atual.
var PATH_CELL = 6;

// opts (so na validacao da trilha, ver ensureTrackPassable): obstacles = tambem
// bloqueia estalagmites (raio + PLAYER_RADIUS + obstMargin); skipBarriers =
// ignora as barreiras parciais.
function isWalkable(x, z, margin, opts) {
  var segs = wallSegmentsNear(x, z, 14), i;
  for (i = 0; i < segs.length; i++) {
    var s = segs[i];
    if (opts && opts.skipBarriers && s.isBarrier) { continue; }
    if (pointToSegmentDistance(x, z, s.ax, s.az, s.bx, s.bz) < s.radius + PLAYER_RADIUS + margin) { return false; }
  }
  if (opts && opts.obstacles && opts.obstGrid) {
    var cell = opts.obstGrid[Math.floor(x / 40) + '_' + Math.floor(z / 40)] ;
    var cx = Math.floor(x / 40), cz = Math.floor(z / 40), dx, dz;
    for (dx = -1; dx <= 1; dx++) {
      for (dz = -1; dz <= 1; dz++) {
        cell = opts.obstGrid[(cx + dx) + '_' + (cz + dz)];
        if (!cell) { continue; }
        for (i = 0; i < cell.length; i++) {
          var o = cell[i];
          var ox = x - o.x, oz = z - o.z, rr = o.radius + PLAYER_RADIUS + (opts.obstMargin || 0);
          if (ox * ox + oz * oz < rr * rr) { return false; }
        }
      }
    }
  }
  return true;
}

function clearSegWalk(ax, az, bx, bz, opts) {
  var dx = bx - ax, dz = bz - az, len = Math.sqrt(dx * dx + dz * dz), n = Math.max(1, Math.ceil(len / 3)), i;
  for (i = 1; i <= n; i++) {
    if (!isWalkable(ax + dx * i / n, az + dz * i / n, 0.2, opts)) { return false; }
  }
  return true;
}

function findPath(ax, az, bx, bz, opts) {
  var cellSize = (opts && opts.cell) || PATH_CELL;
  var wmargin = (opts && opts.margin !== undefined) ? opts.margin : 0.8;
  var pad = 70;
  var minX = Math.min(ax, bx) - pad, maxX = Math.max(ax, bx) + pad, minZ = Math.min(az, bz) - pad, maxZ = Math.max(az, bz) + pad;
  var cols = Math.ceil((maxX - minX) / cellSize) + 1, rows = Math.ceil((maxZ - minZ) / cellSize) + 1;
  var state = new Int8Array(cols * rows); // 0 = nao testada, 1 = livre, 2 = bloqueada
  function walk(c, r) {
    if (c < 0 || r < 0 || c >= cols || r >= rows) { return false; }
    var idx = r * cols + c;
    if (state[idx] === 0) { state[idx] = isWalkable(minX + c * cellSize, minZ + r * cellSize, wmargin, opts) ? 1 : 2; }
    return state[idx] === 1;
  }
  function nearestFree(x, z) {
    var c0 = Math.round((x - minX) / cellSize), r0 = Math.round((z - minZ) / cellSize), rad, dc, dr;
    for (rad = 0; rad <= 6; rad++) {
      for (dc = -rad; dc <= rad; dc++) {
        for (dr = -rad; dr <= rad; dr++) {
          if (Math.max(Math.abs(dc), Math.abs(dr)) !== rad) { continue; }
          if (walk(c0 + dc, r0 + dr)) { return (r0 + dr) * cols + (c0 + dc); }
        }
      }
    }
    return -1;
  }
  var s = nearestFree(ax, az), g = nearestFree(bx, bz);
  if (s < 0 || g < 0) { G.lastPathFrontier = { x: ax, z: az }; return null; }
  var prev = new Int32Array(cols * rows).fill(-2);
  var queue = new Int32Array(cols * rows), qh = 0, qt = 0;
  queue[qt++] = s; prev[s] = -1;
  var found = false, dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  var frontierD = Infinity, frontierX = ax, frontierZ = az; // ponto alcancado mais perto do destino (onde o bloqueio esta)
  while (qh < qt) {
    var cur = queue[qh++];
    if (cur === g) { found = true; break; }
    var cc = cur % cols, cr = (cur - cc) / cols, d;
    var fwx = minX + cc * cellSize, fwz = minZ + cr * cellSize;
    var fd = (fwx - bx) * (fwx - bx) + (fwz - bz) * (fwz - bz);
    if (fd < frontierD) { frontierD = fd; frontierX = fwx; frontierZ = fwz; }
    for (d = 0; d < 8; d++) {
      var nc = cc + dirs[d][0], nr = cr + dirs[d][1];
      if (!walk(nc, nr)) { continue; }
      if (d >= 4 && (!walk(cc + dirs[d][0], cr) || !walk(cc, cr + dirs[d][1]))) { continue; } // sem cortar quina de parede
      var ni = nr * cols + nc;
      if (prev[ni] !== -2) { continue; }
      prev[ni] = cur;
      queue[qt++] = ni;
    }
  }
  if (!found) { G.lastPathFrontier = { x: frontierX, z: frontierZ }; return null; }
  if (opts && opts.validateOnly) { return { ok: true }; }
  var raw = [], node = g;
  while (node !== -1) {
    var nc2 = node % cols, nr2 = (node - nc2) / cols;
    raw.push({ x: minX + nc2 * cellSize, z: minZ + nr2 * cellSize });
    node = prev[node];
  }
  raw.reverse();
  raw[0] = { x: ax, z: az };
  raw[raw.length - 1] = { x: bx, z: bz };
  // string pulling: pula pra o ponto mais longe com reta livre
  var pts = [raw[0]], i = 0;
  while (i < raw.length - 1) {
    var j = raw.length - 1;
    while (j > i + 1 && !clearSegWalk(raw[i].x, raw[i].z, raw[j].x, raw[j].z, opts)) { j--; }
    pts.push(raw[j]);
    i = j;
  }
  var cum = [0], k;
  for (k = 1; k < pts.length; k++) {
    cum.push(cum[k - 1] + Math.sqrt((pts[k].x - pts[k - 1].x) * (pts[k].x - pts[k - 1].x) + (pts[k].z - pts[k - 1].z) * (pts[k].z - pts[k - 1].z)));
  }
  return { pts: pts, cum: cum, total: cum[cum.length - 1] };
}

// Ponto a "lead" unidades a frente do ponto do caminho mais proximo do bot +
// quanto falta ate o fim do caminho.
function pathCarrot(path, x, z, lead) {
  var best = Infinity, bi = 0, bt = 0, i;
  for (i = 0; i < path.pts.length - 1; i++) {
    var a = path.pts[i], b = path.pts[i + 1];
    var dx = b.x - a.x, dz = b.z - a.z, l2 = dx * dx + dz * dz;
    var t = l2 > 0.0001 ? clampNum(((x - a.x) * dx + (z - a.z) * dz) / l2, 0, 1) : 0;
    var px = a.x + dx * t - x, pz = a.z + dz * t - z, d = px * px + pz * pz;
    if (d < best) { best = d; bi = i; bt = t; }
  }
  var segLen = path.cum[bi + 1] - path.cum[bi];
  var s = path.cum[bi] + bt * segLen;
  var target = Math.min(s + lead, path.total), j = bi;
  while (j < path.pts.length - 2 && path.cum[j + 1] < target) { j++; }
  var l = path.cum[j + 1] - path.cum[j];
  var u = l > 0.0001 ? clampNum((target - path.cum[j]) / l, 0, 1) : 1;
  return {
    x: path.pts[j].x + (path.pts[j + 1].x - path.pts[j].x) * u,
    z: path.pts[j].z + (path.pts[j + 1].z - path.pts[j].z) * u,
    remaining: path.total - s
  };
}

/* ============ GARANTIA DE PASSAGEM DA TRILHA (nunca fecha 100%) ============ */
// Pedido do usuario (de novo): obstaculos/barreiras continuavam fechando a
// trilha. Os limites de nascimento (faixa central livre, 2 unidades entre
// obstaculos, barreira <= 70% da largura) NAO bastam sozinhos: um paredao de
// estalagmites lado a lado (cada uma letal num raio de ~5) ou duas barreiras
// de lados opostos muito juntas ainda podem fechar o corredor na pratica.
// Por isso, DEPOIS de gerar tudo, cada perna da espiral e testada com a
// MESMA busca de caminho dos bots (findPath, BFS numa grade de 5 unidades)
// contando paredes (com folga de 3 alem do raio do jogador), barreiras e
// estalagmites como bloqueio. Se nao existe caminho de uma quina a outra, o
// bloqueador mais perto de onde a busca parou e REMOVIDO, e o teste repete
// ate haver passagem. Pernas que ja sao intransitaveis sem nenhum perigo
// (geometria do mapa, nao dos obstaculos) sao ignoradas.
function ensureTrackPassable() {
  var grid = {}, i;
  function gridKey(o) { return Math.floor(o.x / 40) + '_' + Math.floor(o.z / 40); }
  for (i = 0; i < G.staticObstacles.length; i++) {
    var k0 = gridKey(G.staticObstacles[i]);
    if (!grid[k0]) { grid[k0] = []; }
    grid[k0].push(G.staticObstacles[i]);
  }
  var full = { cell: 5, margin: 3, obstacles: true, obstMargin: 1, obstGrid: grid, validateOnly: true };
  var bare = { cell: 5, margin: 3, skipBarriers: true, validateOnly: true };
  var stats = { legs: 0, blocked: 0, repaired: 0, removedBarriers: 0, removedObstacles: 0, unfixable: 0 };
  var corners = G.corners;
  for (i = 0; i < corners.length - 1; i++) {
    var a = corners[i], b = corners[i + 1];
    if (Math.abs(a.x - b.x) + Math.abs(a.z - b.z) < 1) { continue; }
    stats.legs++;
    if (findPath(a.x, a.z, b.x, b.z, full)) { continue; }
    stats.blocked++;
    if (!findPath(a.x, a.z, b.x, b.z, bare)) { stats.unfixable++; continue; }
    var tries = 0, ok = false;
    while (tries < 300 && !ok) {
      tries++;
      var fr = G.lastPathFrontier || { x: a.x, z: a.z };
      var bestKind = null, bestIdx = -1, bestD = Infinity, k;
      for (k = 0; k < G.barrierObstacles.length; k++) {
        var br = G.barrierObstacles[k];
        var d1 = pointToSegmentDistance(fr.x, fr.z, br.ax, br.az, br.bx, br.bz) - br.radius - PLAYER_RADIUS - 3;
        if (d1 < bestD) { bestD = d1; bestKind = 'b'; bestIdx = k; }
      }
      for (k = 0; k < G.staticObstacles.length; k++) {
        var so = G.staticObstacles[k];
        var d2 = Math.sqrt((fr.x - so.x) * (fr.x - so.x) + (fr.z - so.z) * (fr.z - so.z)) - so.radius - PLAYER_RADIUS - 1;
        if (d2 < bestD) { bestD = d2; bestKind = 'o'; bestIdx = k; }
      }
      if (bestKind === 'b') {
        var rb = G.barrierObstacles[bestIdx];
        if (rb.mesh) { G.scene.remove(rb.mesh); rb.mesh.geometry.dispose(); }
        var si = G.wallSegments.indexOf(rb.seg);
        if (si !== -1) { G.wallSegments.splice(si, 1); }
        G.barrierObstacles.splice(bestIdx, 1);
        stats.removedBarriers++;
      } else if (bestKind === 'o') {
        var ro = G.staticObstacles[bestIdx];
        var cell = grid[gridKey(ro)];
        if (cell) { var ci = cell.indexOf(ro); if (ci !== -1) { cell.splice(ci, 1); } }
        removeStaticObstacleAt(bestIdx);
        stats.removedObstacles++;
      } else { break; }
      ok = !!findPath(a.x, a.z, b.x, b.z, full);
    }
    if (ok) { stats.repaired++; }
  }
  G.wallGrid = null; // paredes mudaram: refaz a grade espacial na proxima consulta
  return stats;
}

// Caminho da perna atual (corner anterior -> corner alvo), calculado uma vez
// por perna e guardado em G.legPaths.
function botLegPath(bot) {
  var key = bot.routeCornerIndex;
  if (bot.pathKey === key || bot.pathKey === 'c' + key) { return bot.path; }
  if (!G.legPaths[key]) {
    var pc = G.corners[key], tc = G.corners[key - 1];
    G.legPaths[key] = findPath(pc.x, pc.z, tc.x, tc.z) ||
      { pts: [{ x: pc.x, z: pc.z }, { x: tc.x, z: tc.z }], cum: [0, Math.sqrt((tc.x - pc.x) * (tc.x - pc.x) + (tc.z - pc.z) * (tc.z - pc.z))], total: Math.sqrt((tc.x - pc.x) * (tc.x - pc.x) + (tc.z - pc.z) * (tc.z - pc.z)) };
  }
  bot.path = G.legPaths[key];
  bot.pathKey = key;
  return bot.path;
}

// Grade espacial dos segmentos de parede (celulas de 50 unidades) - montada
// uma vez, na primeira consulta. Cada segmento entra em todas as celulas que
// a caixa dele (inflada pelo raio) cobre.
var WALL_CELL = 50;
function buildWallGrid() {
  var grid = {}, i;
  for (i = 0; i < G.wallSegments.length; i++) {
    var s = G.wallSegments[i];
    var x0 = Math.floor((Math.min(s.ax, s.bx) - s.radius) / WALL_CELL), x1 = Math.floor((Math.max(s.ax, s.bx) + s.radius) / WALL_CELL);
    var z0 = Math.floor((Math.min(s.az, s.bz) - s.radius) / WALL_CELL), z1 = Math.floor((Math.max(s.az, s.bz) + s.radius) / WALL_CELL);
    var cx, cz;
    for (cx = x0; cx <= x1; cx++) {
      for (cz = z0; cz <= z1; cz++) {
        var key = cx + '_' + cz;
        if (!grid[key]) { grid[key] = []; }
        grid[key].push(s);
      }
    }
  }
  G.wallGrid = grid;
  G.wallGridCount = G.wallSegments.length;
}
function wallSegmentsNear(x, z, r) {
  if (!G.wallGrid || G.wallGridCount !== G.wallSegments.length) { buildWallGrid(); }
  var out = [], seen = [], x0 = Math.floor((x - r) / WALL_CELL), x1 = Math.floor((x + r) / WALL_CELL);
  var z0 = Math.floor((z - r) / WALL_CELL), z1 = Math.floor((z + r) / WALL_CELL), cx, cz, j;
  for (cx = x0; cx <= x1; cx++) {
    for (cz = z0; cz <= z1; cz++) {
      var cell = G.wallGrid[cx + '_' + cz];
      if (!cell) { continue; }
      for (j = 0; j < cell.length; j++) {
        if (seen.indexOf(cell[j]) === -1) { seen.push(cell[j]); out.push(cell[j]); }
      }
    }
  }
  return out;
}

// Existe algum perigo dentro do corredor (largura halfW de cada lado) da
// reta (x,z)->(x+dir*len)? Usado pra decidir se um dash/teleporte e seguro.
function hazardOnLine(x, z, dirX, dirZ, len, halfW) {
  var perpX = -dirZ, perpZ = dirX, i, rx, rz, along, lat;
  for (i = 0; i < G.staticObstacles.length; i++) {
    var o = G.staticObstacles[i];
    rx = o.x - x; rz = o.z - z;
    along = rx * dirX + rz * dirZ;
    if (along < 0 || along > len + o.radius) { continue; }
    lat = rx * perpX + rz * perpZ;
    if (Math.abs(lat) < o.radius + halfW) { return true; }
  }
  var wr = 1.0 * WOLF_SIZE_SCALE, c, s;
  for (c = 0; c < G.centipedes.length; c++) {
    var segs = G.centipedes[c].segments;
    for (s = 0; s < segs.length; s++) {
      rx = segs[s].position.x - x; rz = segs[s].position.z - z;
      along = rx * dirX + rz * dirZ;
      if (along < 0 || along > len + wr) { continue; }
      lat = rx * perpX + rz * perpZ;
      if (Math.abs(lat) < wr + halfW + 2) { return true; }
    }
  }
  return false;
}

// Skills basicas dos bots (so quando faz sentido): DASH pra alcancar mais
// rapido o aliado a salvar ou quando esta atras do lider; TELEPORTE quando
// esta salvando de longe ou preso. Ambos so em reta LIVRE de parede (mesmas
// varreduras do jogador - nada de atravessar parede) e sem perigo no caminho,
// e sempre parando antes do proximo ponto da rota (nao pula quina).
function botUseSkills(bot, dirX, dirZ, distToTarget, rescuing) {
  var now = G.totalTime, bx = bot.position.x, bz = bot.position.z;
  if (now < bot.skillCheckAt) { return; } // avalia so a cada 0.4s (as checagens de reta livre sao caras)
  bot.skillCheckAt = now + 0.4;
  var behind = getLeaderCheckpointIndex() - bot.lastCheckpointIndex >= 2;
  var D = dashDistanceFor(bot.cls), isPlant = bot.cls === 'plant';
  // Planta: o Dash DESTROI mobs letais - usa pra abrir caminho.
  var clearing = isPlant && now >= bot.dashReady && mobsAhead(bx, bz, dirX, dirZ, D + 4, PLAYER_RADIUS + 2).count > 0;
  if (now >= bot.dashReady && (rescuing || behind || clearing)) {
    if ((distToTarget > D + 14 || (clearing && distToTarget > D * 0.5)) &&
        clipStraightByWalls(bx, bz, dirX, dirZ, D) >= D - 0.5 &&
        (isPlant || !hazardOnLine(bx, bz, dirX, dirZ, D, BOT_HIT_RADIUS + 2))) {
      bot.dashRemaining = D; bot.dashDirX = dirX; bot.dashDirZ = dirZ;
      spawnRangeLane(bx, bz, dirX, dirZ, D, 4, 0xd8f3ff, 0.45);
      bot.dashReady = now + COOLDOWNS.e;
      playSfxAt('dash', bx, bz);
      return;
    }
  }
  if (now >= bot.tpReady && !rescuing && bot.stuckT > 0.5 && distToTarget > TELEPORT_DISTANCE + 14) {
    var dest = sweepTeleport(bx, bz, dirX, dirZ, TELEPORT_DISTANCE);
    var moved = Math.sqrt((dest.x - bx) * (dest.x - bx) + (dest.z - bz) * (dest.z - bz));
    if (moved >= TELEPORT_DISTANCE * 0.9 && !hazardOnLine(bx, bz, dirX, dirZ, TELEPORT_DISTANCE + 4, BOT_HIT_RADIUS + 2)) {
      spawnAreaRing(bx, bz, 6, 0xb59bff);
      spawnAreaRing(dest.x, dest.z, 6, 0xb59bff);
      bot.position.set(dest.x, 0, dest.z);
      bot.dirX = dirX; bot.dirZ = dirZ; // vira pro lado do teleporte (o rumo ja e o da rota, limitado pela curva)
      bot.tpReady = now + COOLDOWNS.q;
      playSfxAt('teleport', bx, bz);
      bot.stuckT = 0;
      spawnEffectBurst(dest.x, dest.z, RESPAWN_BURST_COLOR);
    }
  }
}

/* ---- BOTS: USO DAS SKILLS DE CLASSE (abrir caminho / atacar / ajudar) ---- */
// Avalia a cada BOT_COMBAT_INTERVAL. Usa as MESMAS funcoes de efeito do
// jogador (pushCone, stompFrom, invulnFrom, projeteis, pocas do Cuspe), com
// cooldowns/cargas proprios (bot.cd/charges) e cooldown ~25% menor: os bots
// usam skills bastante. Nada disso roda com o bot congelado (o updateTeamBot
// nem chega aqui).
var BOT_COMBAT_INTERVAL = 0.2;
// Largada: os bots NAO usam skill nos primeiros 3 segundos. Bug corrigido: no primeiro
// frame apos o 3-2-1 o Pisao/Empurrar de um bot rival colado na cela acertava o
// JOGADOR (empurrao de 30 unidades = 'teleporte' pro lado da cela). As celas so abrem;
// quem sai da cela e o jogador.
var BOT_COMBAT_GRACE = 3;
var BOT_CD_MULT = 0.75;

function foesOf(bot) {
  var l = getTeamMembers(otherTeam(bot.team)), out = [], i;
  for (i = 0; i < l.length; i++) { if (l[i].state === 'racing') { out.push(l[i]); } }
  return out;
}

// Mobs letais (estalagmites + segmentos de lobo) num retangulo a frente de (x,z).
function mobsAhead(x, z, dx, dz, range, half) {
  var count = 0, nearest = 1e9, i, s;
  function chk(mx, mz, r) {
    var rx = mx - x, rz = mz - z, along = rx * dx + rz * dz;
    if (along < -r || along > range) { return; }
    var lat = Math.abs(-rx * dz + rz * dx);
    if (lat < half + r) { count++; if (along < nearest) { nearest = along; } }
  }
  for (i = 0; i < G.staticObstacles.length; i++) {
    var o = G.staticObstacles[i];
    if (Math.abs(o.x - x) > range + 12 || Math.abs(o.z - z) > range + 12) { continue; }
    chk(o.x, o.z, o.radius);
  }
  for (i = 0; i < G.centipedes.length; i++) {
    var segs = G.centipedes[i].segments;
    if (Math.abs(segs[0].position.x - x) > range + 40 || Math.abs(segs[0].position.z - z) > range + 40) { continue; }
    for (s = 0; s < segs.length; s++) { chk(segs[s].position.x, segs[s].position.z, 1.0 * WOLF_SIZE_SCALE); }
  }
  return { count: count, nearest: nearest };
}

function mobsWithin(x, z, R) {
  var count = 0, i, s;
  for (i = 0; i < G.staticObstacles.length; i++) {
    var o = G.staticObstacles[i], dx = o.x - x, dz = o.z - z;
    if (dx * dx + dz * dz <= (R + o.radius) * (R + o.radius)) { count++; }
  }
  for (i = 0; i < G.centipedes.length; i++) {
    var segs = G.centipedes[i].segments;
    for (s = 0; s < segs.length; s++) {
      var sx = segs[s].position.x - x, sz = segs[s].position.z - z;
      if (sx * sx + sz * sz <= R * R) { count++; break; }
    }
  }
  return count;
}

// Onde o alvo estara quando o tiro/poca chegar (lead simples).
function leadPoint(target, shooter, speed) {
  var dx = target.position.x - shooter.position.x, dz = target.position.z - shooter.position.z;
  var dist = Math.sqrt(dx * dx + dz * dz), tt = speed > 0 ? Math.min(0.6, dist / speed) : 0, vx, vz;
  if (target === G.player) { vx = Math.sin(G.player.heading) * G.player.currentSpeed; vz = Math.cos(G.player.heading) * G.player.currentSpeed; }
  else { vx = target.dirX * target.speed; vz = target.dirZ * target.speed; }
  return { x: target.position.x + vx * tt, z: target.position.z + vz * tt };
}

function botConsume(bot, key) {
  var mx = key === 'f' ? (bot.cls === 'aqua' ? JET_CHARGES : LEAF_CHARGES) : SPIT_CHARGES;
  if (bot.charges[key] >= mx) { bot.chargeAt[key] = G.totalTime + chargeRecharge(key, bot.cls); }
  bot.charges[key] -= 1;
}

function botCombat(bot) {
  var now = G.totalTime;
  if (now < bot.combatAt || bot.slipping || now < BOT_COMBAT_GRACE) { return; }
  bot.combatAt = now + BOT_COMBAT_INTERVAL;
  var cls = bot.cls, k;
  // recarga de cargas (Folhas / Cuspe)
  var keys = ['f', 'g'];
  for (k = 0; k < keys.length; k++) {
    var key = keys[k], mx = key === 'f' ? (cls === 'plant' ? LEAF_CHARGES : (cls === 'aqua' ? JET_CHARGES : 0)) : (cls === 'aqua' ? SPIT_CHARGES : 0);
    if (mx && bot.charges[key] < mx && now >= bot.chargeAt[key]) {
      bot.charges[key] += 1;
      bot.chargeAt[key] = bot.charges[key] < mx ? now + chargeRecharge(key, cls) : 0;
    }
  }
  var px = bot.position.x, pz = bot.position.z, hl = Math.sqrt(bot.dirX * bot.dirX + bot.dirZ * bot.dirZ) || 1;
  var hx = bot.dirX / hl, hz = bot.dirZ / hl, i;
  // ALVO: rival que BLOQUEIA o resgate tem prioridade; senao o rival mais proximo.
  var foes = foesOf(bot), target = null, td = 1e9;
  if (bot.rescueTarget && bot.rescueTarget.state === 'frozen') {
    for (i = 0; i < foes.length; i++) {
      var bx0 = foes[i].position.x - bot.rescueTarget.position.x, bz0 = foes[i].position.z - bot.rescueTarget.position.z;
      if (bx0 * bx0 + bz0 * bz0 < ENEMY_BLOCK_RANGE * ENEMY_BLOCK_RANGE) {
        var dd0 = memberDistance(bot, foes[i]);
        if (dd0 < td) { td = dd0; target = foes[i]; }
      }
    }
  }
  if (!target) {
    td = 1e9;
    for (i = 0; i < foes.length; i++) {
      var dd = memberDistance(bot, foes[i]);
      if (dd < td) { td = dd; target = foes[i]; }
    }
  }
  var clear = !!target && hasClearLine(px, pz, target.position.x, target.position.z);
  var tdx = 0, tdz = 0;
  if (target) { var tl = td || 1; tdx = (target.position.x - px) / tl; tdz = (target.position.z - pz) / tl; }

  if (cls === 'plant') {
    // Invulnerabilidade: mobs a frente (perigo pra mim e pros aliados por perto) ou
    // resgate em andamento com rival por perto.
    if (now >= bot.cd.g) {
      var mates = getTeamMembers(bot.team), nearMates = 0;
      for (i = 0; i < mates.length; i++) {
        if (mates[i] !== bot && mates[i].state === 'racing' && memberDistance(bot, mates[i]) <= INVULN_AREA_RADIUS) { nearMates++; }
      }
      var danger = mobsAhead(px, pz, hx, hz, 34, 9).count > 0;
      var helping = !!bot.rescueTarget && bot.rescueTarget.state === 'frozen' && memberDistance(bot, bot.rescueTarget) < 50 && !!target && td < 70;
      if ((danger && nearMates > 0) || helping) {
        invulnFrom(bot);
        bot.cd.g = now + COOLDOWNS.g * PLANT_INVULN_CD_MULT * BOT_CD_MULT;
      }
    }
    // Folhas: rival ao alcance, com linha livre.
    if (bot.charges.f > 0 && now >= bot.cd.f && target && clear && td <= LEAF_RANGE * 0.95) {
      var lp = leadPoint(target, bot, LEAF_SPEED), ldx = lp.x - px, ldz = lp.z - pz, ll = Math.sqrt(ldx * ldx + ldz * ldz) || 1;
      spawnProjectile('leaf', ldx / ll, ldz / ll, makeLeafMesh(), LEAF_SPEED, LEAF_RANGE, LEAF_HIT_RADIUS, null, bot);
      botConsume(bot, 'f');
      bot.cd.f = now + LEAF_CAST_GAP;
    }
  } else if (cls === 'beast') {
    var prof = pushProfile('beast');
    // Empurrar: mobs (ou rival) dentro do cone a frente.
    if (now >= bot.cd.f) {
      var cdx = hx, cdz = hz, useDir = false;
      if (target && td <= prof.range * 0.95 && clear) { cdx = tdx; cdz = tdz; useDir = true; }
      var ahead = mobsAhead(px, pz, cdx, cdz, prof.range * 0.9, 12).count;
      if (useDir || ahead > 0) {
        pushCone(bot, cdx, cdz, prof);
        spawnEffectBurst(px + cdx * (prof.range * 0.5), pz + cdz * (prof.range * 0.5), 0xFFD27A);
        bot.cd.f = now + COOLDOWNS.f * BOT_CD_MULT;
      }
    }
    // Pisao: 2+ mobs ao redor, ou rival dentro do raio.
    if (now >= bot.cd.g && (mobsWithin(px, pz, STOMP_RADIUS) >= 2 || (target && td <= STOMP_RADIUS))) {
      stompFrom(bot);
      bot.cd.g = now + COOLDOWNS.g * BOT_CD_MULT;
    }
  } else {
    // AQUATICA: Jato (projetil reto) e Cuspe (poca) nos rivais.
    var jprof = pushProfile('aqua');
    if (bot.charges.f > 0 && now >= bot.cd.f && target && clear && td <= jprof.range * 0.95) {
      var jp = leadPoint(target, bot, JET_PROJ_SPEED), jdx = jp.x - px, jdz = jp.z - pz, jl = Math.sqrt(jdx * jdx + jdz * jdz) || 1;
      fireJet(bot, jdx / jl, jdz / jl, jprof);
      botConsume(bot, 'f');
      bot.cd.f = now + LEAF_CAST_GAP;
    }
    if (bot.charges.g > 0 && now >= bot.cd.g && target && td <= SPIT_RANGE * 0.9) { // o Cuspe passa por cima de paredes: nao precisa de linha livre
      var sp = leadPoint(target, bot, 60), sdx = sp.x - px, sdz = sp.z - pz, sl = Math.sqrt(sdx * sdx + sdz * sdz) || 1;
      var pt = spitLandingPoint(px, pz, sdx / sl, sdz / sl, Math.min(sl, SPIT_RANGE));
      castSpitBall(bot, px + (sdx / sl) * 3, pz + (sdz / sl) * 3, pt, false);
      botConsume(bot, 'g');
      bot.cd.g = now + 2; // espaca as cargas do Cuspe
    }
  }
}

// Cor do anel do time muda enquanto o bot esta sob efeito (curva travada =
// azul, preso = marrom) - indicacao visual simples no alvo.
function updateBotStatusVisual(bot) {
  var ring = bot.group.userData.ring;
  if (!ring) { return; }
  var now = G.totalTime;
  var hex = now < bot.rootUntil ? 0x9a6b3a : (now < bot.steerLockUntil ? 0x9dffe8 : bot.teamHex);
  if (bot.ringHex !== hex) { setTeamRingColor(ring, hex); bot.ringHex = hex; }
}

function updateTeamBots(delta) {
  var i;
  for (i = 0; i < G.allies.length; i++) { updateTeamBot(G.allies[i], delta); }
  for (i = 0; i < G.enemies.length; i++) { updateTeamBot(G.enemies[i], delta); }
}

// "Lider geral" da partida (pedido do usuario) = quem tiver o MAIOR
// lastCheckpointIndex entre jogador + todos os bots, dos dois times.
function getLeaderCheckpointIndex() {
  var maxIdx = G.lastCheckpointIndex;
  var i;
  for (i = 0; i < G.allies.length; i++) { if (G.allies[i].lastCheckpointIndex > maxIdx) { maxIdx = G.allies[i].lastCheckpointIndex; } }
  for (i = 0; i < G.enemies.length; i++) { if (G.enemies[i].lastCheckpointIndex > maxIdx) { maxIdx = G.enemies[i].lastCheckpointIndex; } }
  return maxIdx;
}

// Regra EXATA pedida pelo usuario: diferenca > 1 checkpoint atras do lider
// -> bonus ativo (cooldown reduzido em ate 20%); diferenca <= 1 -> cooldown
// padrao (cortado IMEDIATAMENTE, nao gradual). Usada no momento em que o
// cooldown e ATIVADO (useAbilityQ/E), nao continuamente.
function catchupCooldownMultiplier() {
  var gap = getLeaderCheckpointIndex() - G.lastCheckpointIndex;
  return gap > CATCHUP_GAP_THRESHOLD ? (1 - CATCHUP_COOLDOWN_REDUCTION) : 1;
}

function getTeamMembers(team) {
  var members = [];
  if (G.player.team === team) { members.push(G.player); }
  var i;
  for (i = 0; i < G.allies.length; i++) { if (G.allies[i].team === team) { members.push(G.allies[i]); } }
  for (i = 0; i < G.enemies.length; i++) { if (G.enemies[i].team === team) { members.push(G.enemies[i]); } }
  return members;
}

function countTeamStatus(team) {
  var members = getTeamMembers(team);
  var alive = 0, frozen = 0, finished = 0;
  var i;
  for (i = 0; i < members.length; i++) {
    if (members[i].reachedEnd) { finished++; }
    if (members[i].state === 'frozen') { frozen++; }
    else { alive++; }
  }
  return { total: members.length, alive: alive, frozen: frozen, finished: finished };
}

// Vitoria de time (base): TODOS os membros do mesmo time precisam ter
// chegado ao final (reachedEnd) - pedido explicito do usuario, nao basta so um.
// Chegar NAO trava nada: quem ja chegou segue jogando normal (skills, dano,
// salvar aliados) ate o ULTIMO aliado do time entrar no ponto final.
function checkMatchWinner() {
  if (G.matchWinner) { return; }
  var teamsToCheck = ['teamA', 'teamB'];
  var t;
  for (t = 0; t < teamsToCheck.length; t++) {
    var team = teamsToCheck[t];
    var members = getTeamMembers(team);
    if (members.length === 0) { continue; }
    var allFinished = true;
    var m;
    for (m = 0; m < members.length; m++) {
      if (!members[m].reachedEnd) { allFinished = false; break; }
    }
    if (allFinished) {
      G.matchWinner = team;
      showMessage(TXT(team === G.player.team ? 'msg.teamWon' : 'msg.enemyWon'), 4);
      showVictoryScreen(team);
      return;
    }
  }
}

/* ============================ MOVIMENTACAO =============================== */

// Calcula, de forma UNICA e consistente em qualquer ponto do mapa, a direcao
// absoluta desejada pelo jogador. Tres fontes de input, com prioridade:
// 1) WASD (ou joystick no mobile) - tem prioridade e cancela qualquer
//    destino de clique pendente.
// 2) Clique do mouse: guarda um PONTO de destino no mundo (G.mouse.targetX/
//    targetZ). Enquanto o botao estiver pressionado, esse ponto e atualizado
//    continuamente para a posicao atual do cursor (onCanvasMouseMove) - e
//    assim que "segurar o clique" faz o personagem seguir o cursor. Ao
//    soltar o botao, o ponto fica fixo e o personagem continua andando ate
//    chegar nele (MOUSE_ARRIVAL_DIST), quando entao para.
function computeDesiredInput() {
  // PC: NAO anda mais com WASD - movimento so pelo botao DIREITO do mouse (ver
  // G.mouse.target*) ou pelo joystick virtual (mobile).
  if (G.joystick.active && (Math.abs(G.joystick.dx) > 0.05 || Math.abs(G.joystick.dy) > 0.05)) {
    G.mouse.targetActive = false;
    return { hasInput: true, dirX: G.joystick.dx, dirZ: G.joystick.dy };
  }

  if (G.mouse.targetActive) {
    var mdx = G.mouse.targetX - G.player.position.x;
    var mdz = G.mouse.targetZ - G.player.position.z;
    var mdist = Math.sqrt(mdx * mdx + mdz * mdz);
    if (mdist < MOUSE_ARRIVAL_DIST) {
      G.mouse.targetActive = false;
      return { hasInput: false, dirX: 0, dirZ: 0 };
    }
    return { hasInput: true, dirX: mdx / mdist, dirZ: mdz / mdist };
  }

  return { hasInput: false, dirX: 0, dirZ: 0 };
}

// Varre o caminho reto de (oldX,oldZ) ate (newX,newZ) em passos pequenos e
// marca como alcancado qualquer checkpoint cujo retangulo (isInsideCheckpointZone)
// o caminho tenha tocado em QUALQUER ponto no meio do trajeto - nao so nas
// duas pontas. Isso e necessario porque em alta velocidade (dash) o
// deslocamento de um unico frame pode ser grande o bastante
// para entrar e sair da zona de um checkpoint sem que nenhuma das duas
// pontas (inicio ou fim do frame) esteja tecnicamente "dentro" dele.
function markCheckpointsAlongPath(oldX, oldZ, newX, newZ) {
  var dx = newX - oldX, dz = newZ - oldZ;
  var dist = Math.sqrt(dx * dx + dz * dz);
  var steps = Math.max(1, Math.ceil(dist / 4));
  var s;
  for (s = 0; s <= steps; s++) {
    var t = s / steps;
    var px = oldX + dx * t, pz = oldZ + dz * t;
    var i;
    for (i = 0; i < G.checkpoints.length; i++) {
      var cp = G.checkpoints[i];
      if (cp.reached) { continue; }
      if (isInsideCheckpointZone(cp, px, pz)) {
        cp.reached = true;
        G.totalCheckpoints += 1;
        // O jogo agora comeca perto do CENTRO do mapa e termina perto da
        // BORDA (ver inversao de inicio/fim em init()) - a pedido do
        // usuario, a dificuldade cresce conforme o jogador se AFASTA do
        // centro, ou seja, conforme a jornada avanca. G.totalCheckpoints
        // cresce exatamente nessa mesma direcao (0 perto do centro, maximo
        // perto da borda/final), entao o multiplicador SOBE com checkpoints
        // alcancados - mesma formula de sempre, so documentando o motivo
        // (ficar mais dificil ao se afastar do centro) por causa da
        // inversao de inicio/fim.
        G.difficultyMultiplier = clampNum(1 + G.totalCheckpoints * DIFFICULTY_PER_CHECKPOINT, 1, DIFFICULTY_MAX);
        triggerCheckpointFeedback(cp);
        if (i > G.lastCheckpointIndex) { G.lastCheckpointIndex = i; }
        // Ultimo checkpoint da rota (ver secao TIMES/base): o jogador
        // "chegou ao final" - vitoria de time so acontece quando TODOS os
        // membros do mesmo time chegarem (ver checkMatchWinner).
        if (i === G.checkpoints.length - 1 && !G.player.reachedEnd) {
          G.player.reachedEnd = true; // continua 'racing': sem imortalidade, skills livres
          showMessage(TXT('msg.reachedEnd'), 2.5);
        }
      }
    }
  }
}

function updatePlayerMovement(delta) {
  // CONGELADO/CAIDO (ver secao TIMES/CONGELADO): sem controle nenhum
  // enquanto espera ser salvo por um aliado, respawnar manualmente (R) ou
  // esgotar FREEZE_DURATION (respawn obrigatorio) - ver updateFreezeState.
  // Regra de vitoria (pedido do usuario): a partida so acaba quando TODOS do
  // MESMO time chegam ao final (ver checkMatchWinner) - ate la, NINGUEM e
  // travado, nem quem ja chegou (reachedEnd nao muda o estado: o jogo
  // continua normal pra ele). Quando ha vencedor (G.matchWinner), todo mundo
  // para (tela de vitoria por cima).
  if (G.player.slipping) { updateBotSlip(G.player, delta); } // escorregao do Cuspe (bot rival) no jogador
  if (G.player.state === 'frozen' || G.matchWinner) {
    G.player.currentSpeed = 0;
    G.dashRemaining = 0; // congelar/fim de jogo cancela um dash em andamento
    return;
  }

  // Determina se o jogador esta em uma zona livre (inicio ou checkpoint). O
  // inicio usa um circulo (START_RADIUS); cada checkpoint usa um RETANGULO
  // (cp.xMin/xMax/zMin/zMax, ver computeCheckpointZone) que cobre a quina
  // inteira - como as duas aberturas da quina comecam exatamente na borda
  // desse retangulo, e fisicamente impossivel ir de uma trilha para a
  // proxima sem entrar nele
  // primeiro.
  var oasisIndex = -2;
  if (isInsideCheckpointZone(G.startZone, G.player.position.x, G.player.position.z)) {
    oasisIndex = -1;
  } else {
    var i;
    for (i = 0; i < G.checkpoints.length; i++) {
      var cp = G.checkpoints[i];
      if (isInsideCheckpointZone(cp, G.player.position.x, G.player.position.z)) {
        oasisIndex = i;
        break;
      }
    }
  }
  G.player.inOasisIndex = oasisIndex;

  var inFreeZone = oasisIndex > -2;
  var input = computeDesiredInput();

  // Um UNICO modelo de movimento (com inercia) para toda a trilha, inclusive
  // dentro do checkpoint - so os PARAMETROS mudam (aceleracao/giro mais
  // responsivos e teto de velocidade um pouco menor dentro do checkpoint).
  // No GELO (fora do checkpoint) o alvo de velocidade e sempre BASE_SPEED,
  // com ou sem input - e o "auto-slide" classico de pista de gelo: uma vez
  // deslizando, o personagem mantem uma velocidade constante e continua
  // sozinho (a inercia nao precisa de tecla pressionada para se sustentar).
  // O jogador so CONTROLA A DIRECAO (heading) com o input; sem input o
  // heading fica travado e ele desliza reto. So dentro do checkpoint a
  // velocidade de fato depende do input e cai bastante sem ele (controle
  // "mais controlado", como pedido).
  // Dash de distancia fixa (ver DASH_MAX_DISTANCE): enquanto sobra distancia
  // (G.dashRemaining), velocidade constante DASH_SPEED, direcao TRAVADA (o
  // input nao entorta o trajeto - a HUD mostrou uma reta) e sem rampa de
  // inercia; ao percorrer tudo, a velocidade volta na hora ao normal.
  var dashing = G.dashRemaining > 0;
  // "Cuspe de agua" (Aquatica) trava a CURVA do alvo por alguns segundos:
  // o heading fica como esta (ver applySteerLock) - ele continua andando.
  var steerLocked = G.totalTime < G.player.steerLockUntil;
  var targetSpeed;
  if (dashing) {
    targetSpeed = DASH_SPEED;
  } else if (inFreeZone) {
    targetSpeed = input.hasInput ? FREE_SPEED : 0;
  } else {
    targetSpeed = BASE_SPEED;
  }
  // SLOW de skills inimigas (Folhas/Pisao/Empurrar) - ver applySlow.
  if (!dashing && G.totalTime < G.player.slowUntil) { targetSpeed *= G.player.slowFactor; }
  if (G.player.slipping) { targetSpeed *= Math.max(0.25, 1 - 0.75 * (G.totalTime - G.player.slipStart) / SPIT_SLIP_MIN); }
  else if (G.totalTime < (G.player.recoverUntil || 0)) { targetSpeed *= 0.25 + 0.75 * clampNum(1 - (G.player.recoverUntil - G.totalTime) / SPIT_RECOVER_TIME, 0, 1); }
  // Preso (3o acerto das Folhas): nao anda.
  if (G.totalTime < G.player.rootUntil) { targetSpeed = 0; }

  if (input.hasInput && !dashing && !steerLocked) {
    var desiredHeading = Math.atan2(input.dirX, input.dirZ);
    var diff = normalizeAngle(desiredHeading - G.player.heading);
    var turnRate = inFreeZone ? CHECKPOINT_TURN_RATE : TURN_RATE;
    var maxTurn = turnRate * delta;
    diff = clampNum(diff, -maxTurn, maxTurn);
    G.player.heading += diff;
  }
  // Se nao ha input, o heading permanece como esta - o personagem nunca
  // vira ou anda sozinho.

  if (dashing) {
    G.player.currentSpeed = DASH_SPEED; // velocidade constante do impulso (sem rampa)
  } else if (G.totalTime < G.player.rootUntil) {
    G.player.currentSpeed = 0;
  } else if (inFreeZone) {
    // Pedido do usuario: dentro do checkpoint/oasis/inicio o Axie ANDA
    // normal, sem nenhum deslize com inercia - a velocidade acompanha o
    // input na mesma hora (sem rampa de aceleracao nenhuma). O deslize com
    // inercia (INERTIA_ACCEL, ver o "else" abaixo) fica so no gelo fino da
    // trilha, fora de qualquer area segura.
    G.player.currentSpeed = targetSpeed;
  } else {
    var speedDiff = targetSpeed - G.player.currentSpeed;
    var maxAccel = INERTIA_ACCEL * delta;
    speedDiff = clampNum(speedDiff, -maxAccel, maxAccel);
    G.player.currentSpeed += speedDiff;
  }
  if (G.player.currentSpeed < 0) { G.player.currentSpeed = 0; }
  // Trava de seguranca (pedido do usuario: "nao pode gerar velocidade
  // absurda"): fora do dash, a velocidade nunca passa de BASE_SPEED.
  if (!dashing && G.player.currentSpeed > BASE_SPEED) {
    G.player.currentSpeed = BASE_SPEED;
  }

  var fx = Math.sin(G.player.heading);
  var fz = Math.cos(G.player.heading);
  var stepDist = G.player.currentSpeed * delta;
  var dashEnded = false;
  if (dashing) {
    // Nunca anda mais que o que falta do dash (distancia exata, mesmo com
    // frame lento) - o ultimo passo e cortado e o dash acaba.
    if (stepDist >= G.dashRemaining) {
      stepDist = G.dashRemaining;
      G.dashRemaining = 0;
      dashEnded = true;
    } else {
      G.dashRemaining -= stepDist;
    }
  }
  var moveX = fx * stepDist;
  var moveZ = fz * stepDist;

  var prevX = G.player.position.x, prevZ = G.player.position.z;

  // Unica fonte de bloqueio fisico: colisao contra objetos solidos reais
  // (dunas, bordas do mapa, mini-oasis). Nenhuma parede invisivel. Usa
  // moveWithCollision (varredura em passos pequenos) em vez de resolver so
  // o ponto final, para nunca atravessar uma divisoria mesmo em alta
  // velocidade (dash) combinada com um frame mais lento que o normal.
  var resolved = moveWithCollision(G.player.position.x, G.player.position.z, moveX, moveZ);
  G.player.position.x = resolved.x;
  G.player.position.z = resolved.z;
  if (dashing) { applyDashContacts(G.player, prevX, prevZ, resolved.x, resolved.z); }

  // Fim do dash: a velocidade VOLTA NA HORA ao normal do jogo (gelo =
  // BASE_SPEED; dentro de checkpoint, o proprio modo livre ajusta no proximo
  // frame) - sem desacelerar devagar carregando a velocidade do dash.
  if (dashEnded) {
    G.player.currentSpeed = inFreeZone ? (input.hasInput ? FREE_SPEED : 0) : BASE_SPEED;
  }

  G.player.group.position.set(G.player.position.x, 2.0, G.player.position.z);
  G.player.group.rotation.y = G.player.heading;

  // Marca checkpoints alcancados ao longo de TODO o caminho percorrido neste
  // frame (de prevX/prevZ ate a posicao final), nao so no ponto final. Sem
  // isso, em velocidade alta (dash) o personagem podia
  // entrar e sair da zona de um checkpoint dentro de um unico frame - como a
  // deteccao antiga so olhava a posicao de INICIO do frame (antes de mover),
  // isso fazia o checkpoint nunca ser registrado mesmo com o caminho
  // passando bem no meio dele (nao era um buraco na geometria, era esse
  // "salto" de deteccao).
  markCheckpointsAlongPath(prevX, prevZ, G.player.position.x, G.player.position.z);

  // Recalcula a zona (start/checkpoint/pista) com base na posicao FINAL,
  // para refletir onde o jogador realmente esta ao fim deste frame.
  var finalOasisIndex = -2;
  if (isInsideCheckpointZone(G.startZone, G.player.position.x, G.player.position.z)) {
    finalOasisIndex = -1;
  } else {
    var fi;
    for (fi = 0; fi < G.checkpoints.length; fi++) {
      var fcp = G.checkpoints[fi];
      if (isInsideCheckpointZone(fcp, G.player.position.x, G.player.position.z)) {
        finalOasisIndex = fi;
        break;
      }
    }
  }
  G.player.inOasisIndex = finalOasisIndex;
}

// Lobos de gelo: o padrao MAIS COMUM e atravessar a trilha de lado a lado
// (mirar em cent.targetV - eixo V local, perpendicular a trilha - e cruzar
// ate chegar perto dele). A mira em si e sorteada por pickCentipedeTargetV:
// quase metade das vezes forca perto de uma das bordas (quase tocando a
// parede), o resto do tempo e uniforme na largura TODA - assim o lobo
// realmente ocupa e cobre a trilha inteira, em vez de ficar preso perto do
// centro. O deslocamento ao longo do COMPRIMENTO da trilha (eixo U) existe
// mas e sempre SECUNDARIO: cent.crossingTilt inclina cada travessia so um
// pouco (no maximo CENTIPEDE_TILT_MAX radianos) na direcao de U, nunca
// virando a travessia num passeio ao longo da trilha. Ao chegar perto da
// mira, o lobo sorteia se PARA por um tempinho (0 a CENTIPEDE_PAUSE_MAX
// segundos) e sorteia a proxima mira. O rumo real (headingLocal) GIRA em
// direcao a esse alvo (CENTIPEDE_STEER_RATE) com um jitter aleatorio grande
// por cima (CENTIPEDE_WANDER_RATE) - a combinacao das duas coisas e o que
// reduz ao maximo qualquer padrao previsivel na movimentacao. Conforme
// G.difficultyMultiplier sobe (a cada checkpoint alcancado), os lobos ficam
// mais rapidos e, quando o jogador esta por perto, o rumo se inclina um
// pouco em direcao a ele (mais agressivos), mas com um teto baixo o
// bastante pra nunca abandonar de vez o padrao de atravessar a trilha.
function updateCentipedes(delta) {
  var c;
  for (c = 0; c < G.centipedes.length; c++) {
    var cent = G.centipedes[c];

    // Pausado: fica parado onde esta (so mantem os segmentos do corpo
    // renderizados na posicao atual), sem acumular movimento novo.
    if (G.totalTime < cent.pausedUntil) {
      var worldXP = cent.segStartX + cent.ux * cent.u + cent.nx * cent.v;
      var worldZP = cent.segStartZ + cent.uz * cent.u + cent.nz * cent.v;
      cent.trailHistory.unshift({ x: worldXP, z: worldZP });
      if (cent.trailHistory.length > cent.maxHistory) { cent.trailHistory.pop(); }
      var sp;
      for (sp = 0; sp < cent.segments.length; sp++) {
        var histIndexP = Math.min(sp * cent.trailSpacing, cent.trailHistory.length - 1);
        var hpP = cent.trailHistory[histIndexP];
        cent.segments[sp].position.set(hpP.x, 1, hpP.z);
      }
      continue;
    }

    var crossSign = (cent.targetV >= cent.v) ? 1 : -1;
    var desiredHeadingLocal = crossSign * (Math.PI / 2 - cent.crossingTilt);

    // Lobos IGNORAM o jogador CONGELADO como foco (nao rondam o congelado).
    if (G.difficultyMultiplier > 1.01 && G.player.state !== 'frozen') {
      var relX = G.player.position.x - cent.segStartX;
      var relZ = G.player.position.z - cent.segStartZ;
      var playerU = relX * cent.ux + relZ * cent.uz;
      var playerV = relX * cent.nx + relZ * cent.nz;
      var toPlayerU = playerU - cent.u;
      var toPlayerV = playerV - cent.v;
      var distToPlayer = Math.sqrt(toPlayerU * toPlayerU + toPlayerV * toPlayerV);
      if (distToPlayer > 0.5 && distToPlayer < CENTIPEDE_AGGRO_RADIUS) {
        var aggroAngle = Math.atan2(toPlayerV, toPlayerU);
        // Teto reduzido (era 0.92): perseguir demais o jogador "sequestrava"
        // o rumo da travessia e prendia os lobos perto de onde o jogador
        // costuma estar (perto do centro da trilha) - o usuario reportou
        // isso como "ficam presos no centro". Com o teto mais baixo, mesmo
        // agressivos, os lobos continuam favorecendo a travessia lateral.
        var aggroStrength = clampNum((G.difficultyMultiplier - 1) * 1.4, 0, 0.55);
        var aggroDiff = normalizeAngle(aggroAngle - desiredHeadingLocal);
        desiredHeadingLocal += aggroDiff * aggroStrength;
      }
    }

    // Gira o rumo ATUAL em direcao ao rumo desejado (nao salta direto pra
    // ele - continua suave/organico), mais um jitter pequeno por cima.
    var steerDiff = normalizeAngle(desiredHeadingLocal - cent.headingLocal);
    var maxSteer = CENTIPEDE_STEER_RATE * delta;
    cent.headingLocal += clampNum(steerDiff, -maxSteer, maxSteer);
    cent.headingLocal += (Math.random() - 0.5) * CENTIPEDE_WANDER_RATE * delta;

    var effSpeed = cent.speed * G.difficultyMultiplier;
    // SLOW temporario apos ser empurrado (ver executePush) - pedido
    // explicito do usuario ("aplicar tambem SLOW nos alvos empurrados").
    if (G.totalTime < cent.slowUntil) { effSpeed *= PUSH_SLOW_MULTIPLIER; }
    var du = Math.cos(cent.headingLocal) * effSpeed * delta;
    var dv = Math.sin(cent.headingLocal) * effSpeed * delta;
    cent.u += du;
    cent.v += dv;

    if (cent.u < cent.uMin) { cent.u = cent.uMin; cent.headingLocal = Math.PI - cent.headingLocal; }
    if (cent.u > cent.uMax) { cent.u = cent.uMax; cent.headingLocal = Math.PI - cent.headingLocal; }
    // O alcance lateral valido depende de ONDE ao longo da trilha o lobo
    // esta agora (ver wolfLateralBounds/wolfVBoundsAtU - pernas longas tem
    // varios bins, cada um com seu proprio vMin/vMax mais perto ou mais
    // longe da parede de verdade dependendo do que existe por perto).
    var vb = wolfVBoundsAtU(cent.vBins, cent.u);
    if (cent.v < vb.vMin) { cent.v = vb.vMin; cent.headingLocal = -cent.headingLocal; }
    if (cent.v > vb.vMax) { cent.v = vb.vMax; cent.headingLocal = -cent.headingLocal; }

    // Chegou perto da mira: sorteia uma pausa curta e escolhe a proxima
    // travessia, sempre para o lado OPOSTO de onde esta agora.
    if (Math.abs(cent.v - cent.targetV) < CENTIPEDE_REACH_TOLERANCE) {
      if (Math.random() < CENTIPEDE_PAUSE_CHANCE) {
        cent.pausedUntil = G.totalTime + Math.random() * CENTIPEDE_PAUSE_MAX;
      }
      cent.targetV = pickCentipedeTargetV(cent);
      cent.crossingTilt = (Math.random() * 2 - 1) * CENTIPEDE_TILT_MAX;
    }

    var worldX = cent.segStartX + cent.ux * cent.u + cent.nx * cent.v;
    var worldZ = cent.segStartZ + cent.uz * cent.u + cent.nz * cent.v;

    // Colisao FISICA de verdade contra as paredes - a MESMA resolveWallCollisions
    // que o jogador usa (ver moveWithCollision). Pedido explicito do
    // usuario: "a area andavel dos lobos deve ser a mesma area andavel do
    // jogador". Antes disso, o lobo so tinha um limite LOGICO (cent.vMin/
    // vMax, calculado por formula/varredura) que podia ficar mais
    // conservador que a parede de verdade em pontos especificos (ondulacao
    // da parede, colar de quina de outra volta da espiral por perto) -
    // exatamente a "parede invisivel" reportada, onde o lobo batia e
    // voltava bem antes de chegar na parede real. Com a colisao real aqui,
    // o lobo fisicamente NUNCA atravessa uma parede de verdade E SEMPRE
    // consegue chegar tao perto dela quanto o proprio jogador consegue -
    // nenhuma margem calculada a mais e necessaria pra seguranca (o
    // cent.vMin/vMax logico, ver wolfLateralBounds, agora so guia ONDE
    // mirar, nao decide mais sozinho o quao perto da parede o lobo chega).
    var wallOrigX = worldX, wallOrigZ = worldZ;
    var wallResolved = resolveWallCollisions(worldX, worldZ);
    if (wallResolved.x !== worldX || wallResolved.z !== worldZ) {
      worldX = wallResolved.x;
      worldZ = wallResolved.z;
      // Reprojeta a posicao corrigida de volta pras coordenadas locais
      // (u,v) do proprio trecho, pra continuar consistente nos proximos
      // frames (cent.u/cent.v guiam a mira, o clamp de uMin/uMax etc).
      var wrx = worldX - cent.segStartX, wrz = worldZ - cent.segStartZ;
      cent.u = wrx * cent.ux + wrz * cent.uz;
      cent.v = wrx * cent.nx + wrz * cent.nz;
      // Rumo de fuga de VERDADE (o proprio vetor de empurrao que
      // resolveWallCollisions aplicou ja aponta pra FORA da parede) - um
      // flip generico (Math.PI - headingLocal) deixava o lobo PRESO
      // oscilando bem em cima da parede (medido: 36 de 40s "parado"),
      // porque a mira (cent.targetV) fica intencionalmente perto da
      // parede agora (ver wolfLateralBounds) e o sistema de steer virava
      // de volta pra ela sozinho no proximo frame, gerando o mesmo bate-e-
      // volta reportado pelo usuario ("parede invisivel"). Mesma correcao
      // ja usada pras barreiras (ver mais abaixo): rumo de fuga exato +
      // sorteia uma mira nova, pra nao insistir em alcancar o mesmo ponto
      // exatamente em cima da parede pela mesma rota que acabou de bater.
      var escX = worldX - wallOrigX, escZ = worldZ - wallOrigZ;
      var escLen = Math.sqrt(escX * escX + escZ * escZ);
      if (escLen > 0.0001) {
        cent.headingLocal = Math.atan2(
          (escX * cent.nx + escZ * cent.nz) / escLen,
          (escX * cent.ux + escZ * cent.uz) / escLen
        );
      } else {
        cent.headingLocal = Math.PI - cent.headingLocal;
      }
      cent.targetV = pickCentipedeTargetV(cent);
      cent.crossingTilt = (Math.random() * 2 - 1) * CENTIPEDE_TILT_MAX;
    }

    // Checkpoint (e inicio) sao area segura - se o passo deste frame
    // colocaria o lobo para dentro de um, desfaz o movimento e vira (mesma
    // reacao de bater numa borda do corredor). Necessario porque a zona de
    // alguns checkpoints agora e bem maior de um lado (ver CENTER_WIDEN_OFFSET)
    // e pode alcancar um trecho que antes era seguro pro lobo vagar.
    // Tambem sorteia uma mira NOVA (mesma correcao ja aplicada pra
    // barreiras/paredes mais abaixo/acima) - sem isso, o lobo continuava
    // tentando alcancar a MESMA mira dentro da zona alargada (ver
    // CENTER_WIDEN_OFFSET), batendo e virando sem parar bem no lado LARGO
    // do checkpoint - a "parede invisivel" reportada num lado especifico
    // da trilha (o lado que a zona do checkpoint alarga).
    if (isInsideAnyHazardFreeZone(worldX, worldZ)) {
      cent.u -= du;
      cent.v -= dv;
      cent.headingLocal = Math.PI - cent.headingLocal;
      worldX = cent.segStartX + cent.ux * cent.u + cent.nx * cent.v;
      worldZ = cent.segStartZ + cent.uz * cent.u + cent.nz * cent.v;
      cent.targetV = pickCentipedeTargetV(cent);
      cent.crossingTilt = (Math.random() * 2 - 1) * CENTIPEDE_TILT_MAX;
    }

    // Barreiras "parede parcial" agora sao solidas de verdade (ver
    // createHazards) - pedido do usuario: os lobos NAO podem atravessa-las.
    // Mesma reacao de "bater e virar" usada acima pro checkpoint/inicio -
    // lista pequena (poucas barreiras no mapa todo), entao checar contra
    // todas elas a cada frame e barato.
    var bb;
    for (bb = 0; bb < G.barrierObstacles.length; bb++) {
      var bar2 = G.barrierObstacles[bb];
      var barDist = pointToSegmentDistance(worldX, worldZ, bar2.ax, bar2.az, bar2.bx, bar2.bz);
      if (barDist < bar2.radius + 1.5) {
        // Rumo de fuga calculado de VERDADE (aponta do ponto mais proximo
        // da barreira pra onde o lobo esta, nao um flip generico de
        // Math.PI) - um flip generico podia continuar apontando de volta
        // pra dentro da barreira dependendo do angulo de aproximacao, e a
        // direcao IA VOLTAR a apontar pra ela sozinha no proximo frame (o
        // sistema de steer gira o rumo de volta em direcao a mira a cada
        // frame) - com o rumo de fuga exato, o primeiro passo depois de
        // bater sempre afasta de verdade antes do steer retomar o controle.
        var abx = bar2.bx - bar2.ax, abz = bar2.bz - bar2.az;
        var denom = abx * abx + abz * abz;
        var t = 0;
        if (denom > 1e-7) { t = clampNum(((worldX - bar2.ax) * abx + (worldZ - bar2.az) * abz) / denom, 0, 1); }
        var closestX = bar2.ax + abx * t, closestZ = bar2.az + abz * t;
        var awayX = worldX - closestX, awayZ = worldZ - closestZ;
        var awayLen = Math.sqrt(awayX * awayX + awayZ * awayZ);
        if (awayLen > 0.001) {
          cent.headingLocal = Math.atan2(
            (awayX * cent.nx + awayZ * cent.nz) / awayLen,
            (awayX * cent.ux + awayZ * cent.uz) / awayLen
          );
        } else {
          cent.headingLocal = Math.PI - cent.headingLocal;
        }
        cent.u -= du;
        cent.v -= dv;
        worldX = cent.segStartX + cent.ux * cent.u + cent.nx * cent.v;
        worldZ = cent.segStartZ + cent.uz * cent.u + cent.nz * cent.v;
        // Tambem sorteia uma mira NOVA aqui (pickCentipedeTargetV ja testa
        // contra a posicao real de TODAS as barreiras, usando o "u" ATUAL -
        // o mesmo "u" que acabou de bater). Sem isso, o lobo continuava
        // tentando alcancar a MESMA mira antiga de antes (podia ter sido
        // sorteada num "u" bem diferente, antes dele derivar pra perto da
        // barreira durante a travessia) - so virava a direcao, batia nela
        // de novo no proximo frame, pra sempre (bug medido: lobo travado
        // quase 24s seguidos batendo na mesma barreira).
        cent.targetV = pickCentipedeTargetV(cent);
        cent.crossingTilt = (Math.random() * 2 - 1) * CENTIPEDE_TILT_MAX;
        break;
      }
    }

    cent.trailHistory.unshift({ x: worldX, z: worldZ });
    if (cent.trailHistory.length > cent.maxHistory) { cent.trailHistory.pop(); }

    var s;
    for (s = 0; s < cent.segments.length; s++) {
      var histIndex = Math.min(s * cent.trailSpacing, cent.trailHistory.length - 1);
      var hp = cent.trailHistory[histIndex];
      if (!hp) { hp = { x: worldX, z: worldZ }; }
      cent.segments[s].position.set(hp.x, 1, hp.z);
    }
  }
  for (c = 0; c < G.centipedes.length; c++) { updateWolfVisual(G.centipedes[c]); }
}

function checkCollisions() {
  if (G.totalTime < G.invulnUntil) { return; }
  if (G.player.cls === 'plant' && G.dashRemaining > 0) { return; } // Planta nao congela durante o Dash
  // Ja congelado (esperando salvamento/respawn) ou ja finalizado (chegou no
  // ultimo checkpoint) - nao pode "morrer" de novo nesses estados.
  if (G.player.state === 'frozen') { return; }

  var px = G.player.position.x;
  var pz = G.player.position.z;

  var i;
  for (i = 0; i < G.staticObstacles.length; i++) {
    var o = G.staticObstacles[i];
    var dx = px - o.x;
    var dz = pz - o.z;
    if (Math.sqrt(dx * dx + dz * dz) < (o.radius + PLAYER_RADIUS)) {
      onPlayerDeath();
      return;
    }
  }

  // As barreiras "parede parcial" NAO causam dano mais - viraram bloco
  // solido de verdade (addWallSegment, ver createHazards), o jogador ja e
  // barrado fisicamente por resolveWallCollisions/moveWithCollision igual
  // a qualquer parede, sem precisar de nenhum check letal aqui.

  var c;
  for (c = 0; c < G.centipedes.length; c++) {
    var cent = G.centipedes[c];
    var s;
    for (s = 0; s < cent.segments.length; s++) {
      var mesh = cent.segments[s];
      var dx2 = px - mesh.position.x;
      var dz2 = pz - mesh.position.z;
      if (Math.sqrt(dx2 * dx2 + dz2 * dz2) < (1.0 * WOLF_SIZE_SCALE + PLAYER_RADIUS)) {
        onPlayerDeath();
        return;
      }
    }
  }
}

var RESPAWN_BURST_COLOR = 0x9FE8FF;
// Ao "morrer", o Axie NAO respawna mais na hora - ele entra no estado
// CONGELADO/CAIDO (ver secao TIMES/CONGELADO no topo do arquivo) e fica
// parado no lugar ate ser salvo, respawnar manualmente (R) ou estourar
// FREEZE_DURATION. VISUAL FUTURO (placeholder por enquanto - so inclina o
// modelo atual, ver abaixo): modelo do Axie caido de lado + som de dentes
// batendo de frio em loop enquanto congelado.
function onPlayerDeath() {
  if (G.player.state === 'frozen') { return; }
  if (G.player.cls === 'plant' && G.dashRemaining > 0) { return; } // Planta nao congela durante o Dash
  // PLANTA (2 vidas): o primeiro dano so gasta uma vida (nao congela).
  if (absorbHit(G.player)) {
    showMessage(TXT('msg.lifeLost'), 1.2);
    G.cameraShakeUntil = G.totalTime + CAMERA_SHAKE_DURATION * 0.6;
    return;
  }
  triggerFreezeFeedback();
  playSfx('freeze'); // dentes batendo de frio
  G.player.state = 'frozen';
  cancelAim(null); // congelado nao lanca skill nenhuma (nem uma mira ja armada)
  G.player.frozenUntil = G.totalTime + FREEZE_DURATION;
  G.player.savePingUntil = 0;
  G.player.currentSpeed = 0;
  // Inclina o modelo atual de lado (placeholder da queda - ver comentario
  // acima) - resetado em unfreezePlayer.
  if (G.player.group) { G.player.group.userData.model.rotation.z = Math.PI / 2.1; }
}

// Tira o jogador do estado congelado, disparado por QUALQUER uma das 3
// formas descritas no pedido do usuario: 'ally' (aliado chegou perto e
// salvou, fica NO MESMO lugar), 'manual' (o proprio jogador apertou R) ou
// 'timeout' (estourou FREEZE_DURATION, respawn obrigatorio). So 'manual' e
// 'timeout' de fato TELEPORTAM o jogador (respawnPlayer, chamado pelo
// CALLER antes desta funcao) - 'ally' preserva a posicao atual.
function unfreezePlayer(reason) {
  if (reason === 'ally') { playSfx('save'); }
  G.player.state = 'racing';
  G.player.lives = 1; // ao levantar/respawnar volta com 1 vida (Planta recupera a 2a em 15s)
  G.player.lifeTimer = 0;
  G.player.savePingUntil = 0;
  G.player.currentSpeed = 0;
  if (G.player.group) { G.player.group.userData.model.rotation.z = 0; }
  // 'ally' ganha o i-frame MAIOR (fica no mesmo lugar onde morreu, ainda
  // podendo estar cercado de perigo) - 'manual'/'timeout' ja teleportam pro
  // checkpoint (zona sem perigo), entao usam so o resguardo minimo.
  G.invulnUntil = G.totalTime + (reason === 'ally' ? ALLY_SAVE_IFRAME : RESPAWN_IFRAME);
  if (reason === 'ally') {
    // 'manual'/'timeout' ja chamam respawnPlayer() (que ja faz o burst na
    // posicao NOVA) antes de chegar aqui - 'ally' preserva a posicao atual
    // e nao passa por respawnPlayer, entao precisa do proprio burst.
    spawnEffectBurst(G.player.position.x, G.player.position.z, RESPAWN_BURST_COLOR);
    showMessage(TXT('msg.savedAlly'), 1.5);
  } else if (reason === 'manual') {
    showMessage(TXT('msg.manualRespawn'), 1);
  } else {
    showMessage(TXT('msg.respawn'), 1);
  }
}

// Chamado toda vez que um ALIADO chega perto o bastante (SAVE_RANGE, ver
// updateTeamBots) de um jogador congelado - so nao salva se algum INIMIGO
// estiver perto o bastante (ENEMY_BLOCK_RANGE) pra "proteger a vantagem"
// (pedido explicito do usuario: inimigos podem atrapalhar o save).
function trySaveFrozenPlayer() {
  // Logica generalizada (jogador OU bot) em saveFrozenMember/isSaveBlocked.
  saveFrozenMember(G.player);
}

// Sinal de socorro do congelado (tecla T / botao Help no mobile) - so um
// PING visivel por alguns segundos (ver updateSavePingMarker); a IA base
// dos aliados ja tenta socorrer assim que o jogador congela, ping ou nao
// (ver comentario em updateTeamBots) - preparado pra uma IA mais seletiva
// no futuro (so responder a quem realmente pediu).
function signalSaveMe() {
  if (G.player.state !== 'frozen') { return; }
  G.player.savePingUntil = G.totalTime + SAVE_PING_DURATION;
  triggerHelpAlert(G.player);
  showMessage(TXT('msg.callingHelp'), 1.5);
}

function respawnPlayer() {
  G.dashRemaining = 0; // respawn cancela um dash em andamento
  var target;
  if (G.lastCheckpointIndex >= 0) {
    var cp = G.checkpoints[G.lastCheckpointIndex];
    // CENTRO REAL da area do checkpoint (media de xMin/xMax e zMin/zMax),
    // nao cp.x/cp.z (o ponto da quina onde o oasis foi desenhado) - depois
    // do deslocamento lateral (CHECKPOINT_SIDE_SHIFT) e do encolhimento
    // contra paredes reais (clampZoneToRealWalls), a zona de deteccao pode
    // ficar assimetrica em torno da quina, deixando cp.x/cp.z mais perto de
    // uma borda do que do meio de verdade. Pedido do usuario: respawn
    // sempre no centro da area, nunca deslocado/na borda.
    target = { x: (cp.xMin + cp.xMax) / 2, z: (cp.zMin + cp.zMax) / 2 };
  } else {
    target = G.startPosition;
  }
  G.player.position.set(target.x, 0, target.z);
  G.player.currentSpeed = 0;
  spawnEffectBurst(target.x, target.z, RESPAWN_BURST_COLOR);
}

// Chamada quando FREEZE_DURATION estoura sem ninguem salvar - respawn
// OBRIGATORIO no ultimo checkpoint (pedido explicito do usuario).
function updateFreezeState() {
  if (G.player.state !== 'frozen') { return; }
  if (G.totalTime >= G.player.frozenUntil) {
    respawnPlayer();
    unfreezePlayer('timeout');
  }
}

/* ============================ HUD DE MIRA (3D) ============================= */
// Constroi a malha vermelha de cada skill DIRETO em coordenadas locais
// X/Z com o eixo de referencia ("frente") apontando pro local +Z - a MESMA
// convencao usada pelo heading do jogador em todo o resto do arquivo
// (updatePlayerMovement: fx=Math.sin(heading), fz=Math.cos(heading); o
// modelo do Axie usa "group.rotation.y = heading" pra virar de acordo).
// Construir direto nessa orientacao (em vez de girar uma CircleGeometry
// generica, que nasce no plano XY com theta=0 apontando pro eixo X) evita
// ter que deduzir composicao de rotacoes - so precisa de UM
// "group.rotation.y = Math.atan2(dirX,dirZ)" (identico ao heading) pra
// apontar a HUD pra qualquer direcao (dirX,dirZ) do mundo (ver
// updateAimHud), sem risco de inverter eixo por engano.

// Perfil do Empurrar/Jato da CLASSE do jogador (ver pushProfile): angulo do
// cone, distancia de arremesso e duracao do mini-stun de parede.
function pushProfile(castCls) {
  var cls = castCls || G.player.cls;
  if (cls === 'aqua') {
    return { range: PUSH_RANGE * JET_RANGE_MULT, angleDeg: JET_ANGLE_DEG, halfCos: Math.cos((JET_ANGLE_DEG / 2) * Math.PI / 180), knock: PUSH_KNOCKBACK * JET_KNOCK_MULT, stun: PUSH_WALL_STUN_DURATION, name: TXT('skill.jet') };
  }
  if (cls === 'beast') {
    return { range: PUSH_RANGE, angleDeg: PUSH_ANGLE_DEG, halfCos: PUSH_HALF_ANGLE_COS, knock: PUSH_KNOCKBACK * BEAST_PUSH_MULT, stun: PUSH_WALL_STUN_DURATION * BEAST_STUN_MULT, name: TXT('skill.push') };
  }
  return { range: PUSH_RANGE, angleDeg: PUSH_ANGLE_DEG, halfCos: PUSH_HALF_ANGLE_COS, knock: PUSH_KNOCKBACK, stun: PUSH_WALL_STUN_DURATION, name: TXT('skill.push') };
}

function buildPushHudMesh() {
  var halfAngle = (pushProfile().angleDeg / 2) * Math.PI / 180;
  var hudRange = pushProfile().range; // MESMO numero que executePush usa (prof.range)
  var segments = 20;
  var positions = [0, 0.12, 0]; // vertice central, no proprio Axie
  var i;
  for (i = 0; i <= segments; i++) {
    var t = -halfAngle + (2 * halfAngle) * (i / segments);
    positions.push(Math.sin(t) * hudRange, 0.12, Math.cos(t) * hudRange);
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  var indices = [];
  for (i = 1; i <= segments; i++) { indices.push(0, i, i + 1); }
  geo.setIndex(indices);
  var mat = new THREE.MeshBasicMaterial({ color: AIM_HUD_COLOR, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false });
  return new THREE.Mesh(geo, mat);
}

function buildDashHudMesh() {
  // Profundidade 1: o comprimento de verdade e aplicado a cada frame via
  // scale.z/position.z em updateAimHud (ver predictDashDistance) - a HUD
  // acompanha a distancia REAL do dash, nao um numero fixo.
  var geo = new THREE.BoxGeometry(DASH_HUD_WIDTH, DASH_HUD_HEIGHT, 1);
  var mat = new THREE.MeshBasicMaterial({ color: AIM_HUD_COLOR, transparent: true, opacity: 0.45, depthWrite: false });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, DASH_HUD_HEIGHT / 2, 0.5);
  return mesh;
}

// Distancia REAL do dash (pedido do usuario: a HUD nao pode passar do ponto
// final). Agora o dash e um impulso de distancia fixa (ver updatePlayerMovement/
// G.dashRemaining), igual em qualquer lugar do mapa - entao HUD e dash real
// leem o mesmo numero, DASH_MAX_DISTANCE (a HUD ainda e cortada por paredes
// em clipStraightByWalls, onde o dash real tambem para).
function predictDashDistance() {
  return dashDistanceFor(G.player.cls);
}

// Distancia do Dash por classe: a Aquatica vai um pouco mais longe.
function dashDistanceFor(cls) {
  return DASH_MAX_DISTANCE * (cls === 'aqua' ? AQUA_DASH_MULT : 1);
}

// HUD das Folhas (Planta): reta fina como a do Dash, ate LEAF_RANGE.
function buildLeafHudMesh() {
  var geo = new THREE.BoxGeometry(LEAF_RADIUS * 2, 1.2, 1); // largura = diametro do projetil
  var mat = new THREE.MeshBasicMaterial({ color: AIM_HUD_COLOR, transparent: true, opacity: 0.5, depthWrite: false });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0.6, 0.5);
  return mesh;
}

// HUD do Jato de agua (Aquatica): reta com a largura do PROJETIL (diametro
// ~ hitbox do Axie), ate o alcance real pushProfile().range.
function buildJetHudMesh() {
  var geo = new THREE.BoxGeometry((JET_PROJ_COUNT - 1) * 2 * JET_LATERAL + 2 * JET_PROJ_RADIUS, 1.2, 1); // largura = diametro do projetil
  var mat = new THREE.MeshBasicMaterial({ color: AIM_HUD_COLOR, transparent: true, opacity: 0.5, depthWrite: false });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0.6, 0.5);
  return mesh;
}

// HUD do Cuspe de agua (Aquatica): disco vermelho da area de efeito
// (SPIT_RADIUS) no ponto de impacto - igual ao circulo do Teleporte, mas
// do tamanho REAL da area.
function buildSpitHudMesh() {
  var g = new THREE.Group();
  var disc = new THREE.Mesh(
    new THREE.CircleGeometry(SPIT_RADIUS, 28),
    new THREE.MeshBasicMaterial({ color: AIM_HUD_COLOR, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false })
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.12;
  var ring = new THREE.Mesh(
    new THREE.RingGeometry(SPIT_RADIUS * 0.94, SPIT_RADIUS, 32),
    new THREE.MeshBasicMaterial({ color: AIM_HUD_COLOR, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.13;
  g.add(disc);
  g.add(ring);
  return g;
}

// Varre a reta do dash em passos de 3 unidades e devolve ate onde ela chega
// livre (para no ultimo ponto antes de uma parede) - a HUD termina onde o
// dash de verdade terminaria.
function clipStraightByWalls(px, pz, dirX, dirZ, maxDist) {
  var STEP = 3, d;
  for (d = STEP; d < maxDist + STEP; d += STEP) {
    var dd = Math.min(d, maxDist);
    var r = resolveWallCollisions(px + dirX * dd, pz + dirZ * dd);
    var ex = r.x - (px + dirX * dd), ez = r.z - (pz + dirZ * dd);
    if (ex * ex + ez * ez > 0.0025) { return Math.max(0, dd - STEP); }
    if (dd >= maxDist) { break; }
  }
  return maxDist;
}

function buildTeleportHudMesh() {
  var geo = new THREE.RingGeometry(TELEPORT_HUD_RADIUS * 0.7, TELEPORT_HUD_RADIUS, 28);
  var mat = new THREE.MeshBasicMaterial({ color: AIM_HUD_COLOR, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.12;
  return mesh;
}

function clearAimHud() {
  if (!G.aimHud) { return; }
  G.scene.remove(G.aimHud);
  G.aimHud.traverse(function (obj) {
    if (obj.geometry) { obj.geometry.dispose(); }
    if (obj.material) { obj.material.dispose(); }
  });
  G.aimHud = null;
}

// Atualizada a cada frame (ver animate()) enquanto G.aimMode != null.
// Push/Dash: reancora a HUD na posicao ATUAL do Axie (ele continua
// deslizando no gelo enquanto mira) e gira pra apontar pra G.aimDirX/Z
// (ultima direcao conhecida - mouse no PC, dedo no mobile).
// Teleporte: a HUD e um circulo SIMETRICO, entao nao precisa girar - so
// reposiciona no destino de verdade, recalculado a cada frame com o MESMO
// sweepTeleport usado na hora de confirmar (ver executeTeleport), pra
// mostrar exatamente onde o Axie vai aparecer, ja considerando paredes no
// caminho.
function updateAimHud() {
  if (!G.aimMode || !G.aimHud) { return; }
  var px = G.player.position.x, pz = G.player.position.z;
  if (G.aimMode === 'teleport') {
    var dest = sweepTeleport(px, pz, G.aimDirX, G.aimDirZ, TELEPORT_DISTANCE);
    G.aimHud.position.set(dest.x, 0, dest.z);
  } else if (G.aimMode === 'spit') {
    var sp = spitTargetPoint(G.aimDirX, G.aimDirZ, G.aimDist);
    G.aimHud.position.set(sp.x, 0, sp.z);
  } else {
    G.aimHud.position.set(px, 0, pz);
    G.aimHud.rotation.y = Math.atan2(G.aimDirX, G.aimDirZ);
    var jetAim = G.aimMode === 'push' && G.player.cls === 'aqua';
    if (G.aimMode === 'dash' || G.aimMode === 'leaf' || jetAim) {
      var maxLen = G.aimMode === 'dash' ? predictDashDistance() : (jetAim ? pushProfile().range : LEAF_RANGE);
      var lineLen = clipStraightByWalls(px, pz, G.aimDirX, G.aimDirZ, maxLen);
      var lineMesh = G.aimHud.children[0];
      lineMesh.scale.z = Math.max(lineLen, 0.01);
      lineMesh.position.z = lineLen / 2;
    }
  }
}

// Ponto de impacto do Cuspe de agua: na direcao mirada, ate a distancia
// escolhida (PC: ate onde o cursor esta; toque: alcance maximo), NUNCA alem de
// SPIT_RANGE (78) e parando antes de qualquer parede (mesma varredura do
// Teleporte).
function spitTargetPoint(dirX, dirZ, dist) {
  var d = (dist === null || dist === undefined) ? SPIT_RANGE : clampNum(dist, 6, SPIT_RANGE);
  return spitLandingPoint(G.player.position.x, G.player.position.z, dirX, dirZ, d);
}
// O Cuspe e a UNICA skill que passa POR CIMA das paredes: o ponto de queda e simplesmente
// origem + direcao * distancia (sem varredura), sempre dentro de SPIT_RANGE. Se esse ponto cair
// DENTRO de uma parede, a poca vai pro ponto livre mais proximo (sem passar do alcance).
function spitLandingPoint(sx, sz, dirX, dirZ, dist) {
  var d = clampNum(dist, 0, SPIT_RANGE);
  var tx = sx + dirX * d, tz = sz + dirZ * d;
  var r = resolveWallCollisions(tx, tz);
  if ((r.x - tx) * (r.x - tx) + (r.z - tz) * (r.z - tz) <= 0.0025) { return { x: tx, z: tz }; }
  var it, r2;
  for (it = 0; it < 6; it++) { // em quinas o 1o empurrao pode cair em outra parede: repete ate estabilizar
    r2 = resolveWallCollisions(r.x, r.z);
    if ((r2.x - r.x) * (r2.x - r.x) + (r2.z - r.z) * (r2.z - r.z) <= 0.0025) { break; }
    r = r2;
  }
  var rd = Math.sqrt((r.x - sx) * (r.x - sx) + (r.z - sz) * (r.z - sz));
  if (rd <= d + 0.01 && (r2.x - r.x) * (r2.x - r.x) + (r2.z - r.z) * (r2.z - r.z) <= 0.0025) { return { x: r.x, z: r.z }; }
  var back = d, px, pz, q;
  for (q = 0; q < 60 && back > 0; q++) { // recua pela linha ate achar chao livre
    back -= 1.5;
    px = sx + dirX * back; pz = sz + dirZ * back;
    var rr = resolveWallCollisions(px, pz);
    if ((rr.x - px) * (rr.x - px) + (rr.z - pz) * (rr.z - pz) <= 0.0025) { return { x: px, z: pz }; }
  }
  return { x: sx, z: sz };
}

/* =============================== HABILIDADES ============================== */

// Arma a mira de uma das 3 skills direcionais (mode: 'push'|'dash'|
// 'teleport') - mostra a HUD vermelha na hora (obrigatorio, pedido do
// usuario), NAO gasta cooldown ainda (so a confirmacao gasta, ver
// confirmAimWithDirection/executePush/executeDash/executeTeleport). A
// direcao comeca apontando pra onde o Axie ja esta olhando (heading atual)
// e e atualizada em tempo real pelo mouse/dedo (ver onCanvasMouseMove/
// setupAimMobileButton) ate a confirmacao.
function armAim(mode) {
  clearAimHud();
  G.aimMode = mode;
  G.aimUntil = G.totalTime + AIM_TIMEOUT;
  G.aimDirX = Math.sin(G.player.heading);
  G.aimDirZ = Math.cos(G.player.heading);
  G.aimDist = null; // distancia do cursor (so o Cuspe usa) - ver onCanvasMouseMove
  G.aimHud = new THREE.Group();
  var mesh;
  if (mode === 'push') { mesh = G.player.cls === 'aqua' ? buildJetHudMesh() : buildPushHudMesh(); }
  else if (mode === 'dash') { mesh = buildDashHudMesh(); }
  else if (mode === 'leaf') { mesh = buildLeafHudMesh(); }
  else if (mode === 'spit') { mesh = buildSpitHudMesh(); }
  else { mesh = buildTeleportHudMesh(); }
  G.aimHud.add(mesh);
  G.scene.add(G.aimHud);
  updateAimHud();
}

// Cancela a mira ativa (se houver) sem gastar cooldown nem aplicar efeito -
// pedido do usuario: precisa funcionar apertando a tecla de novo (ver
// useAbilityQ/E/F), com clique direito (ver setupInput) ou com Escape.
function cancelAim(message) {
  if (!G.aimMode) { return; }
  G.aimMode = null;
  clearAimHud();
  if (message) { showMessage(message, 1); }
}

// Cancela a mira sozinha SO por timeout (AIM_TIMEOUT), nunca por o jogador
// mudar de estado (congelar etc) - ver o comentario historico completo
// dessa decisao em executePush (a mesma logica vale pras 3 skills agora: a
// confirmacao em si, mais abaixo, nunca depende do estado do jogador pra
// funcionar).
function updateAimTimeout() {
  if (G.aimMode && G.totalTime > G.aimUntil) { cancelAim(null); }
}

// Confirma a mira ATIVA na direcao (dirX,dirZ) (vetor no MUNDO, nao precisa
// vir normalizado - cada execute* normaliza por conta propria) e despacha
// pra skill certa. Chamada pelo clique do PC (ver onCanvasMouseDown) e pelo
// soltar o dedo no mobile (ver setupAimMobileButton).
// worldDist (opcional): distancia MUNDO ate o ponto clicado (PC) - so o Cuspe
// de agua usa (escolher ate onde cuspir); no toque vem null = alcance maximo.
function confirmAimWithDirection(dirX, dirZ, worldDist) {
  var mode = G.aimMode;
  G.aimMode = null;
  clearAimHud();
  if (mode === 'push') { executePush(dirX, dirZ); }
  else if (mode === 'dash') { executeDash(dirX, dirZ); }
  else if (mode === 'teleport') { executeTeleport(dirX, dirZ); }
  else if (mode === 'leaf') { executeLeaves(dirX, dirZ); }
  else if (mode === 'spit') { executeSpit(dirX, dirZ, worldDist); }
}

// TELEPORTE (G) - agora e skill de MIRA (pedido do usuario), igual ao
// Empurrar: so ARMA aqui (nao gasta cooldown ainda) - a confirmacao de
// verdade e executeTeleport, chamada via confirmAimWithDirection. Apertar a
// tecla de novo enquanto ja mira o Teleporte CANCELA.
function useAbilityQ() {
  if (G.player.state !== 'racing') { return false; } // nao teleporta congelado/finalizado
  if (G.aimMode === 'teleport') { cancelAim(TXT('msg.teleportCancelled')); return false; }
  if (G.abilities.q > 0) { return false; }
  armAim('teleport');
  showMessage(TXT('msg.aimTeleport'), AIM_TIMEOUT);
  return true;
}

// DASH (E) - agora e DIRECIONAL e skill de MIRA (pedido do usuario: "Dash
// passa a ser movimento direcional bem rapido"), mesmo modelo do
// Teleporte/Empurrar. So ARMA aqui - confirmacao de verdade e executeDash.
function useAbilityE() {
  if (G.player.state !== 'racing') { return false; }
  if (G.aimMode === 'dash') { cancelAim(TXT('msg.dashCancelled')); return false; }
  if (G.abilities.e > 0) { return false; }
  armAim('dash');
  showMessage(TXT('msg.aimDash'), AIM_TIMEOUT);
  return true;
}

// EMPURRAR (F) - skill de MIRA, nao dispara sozinha: so ARMA a mira aqui
// (nao gasta cooldown ainda). A confirmacao de verdade - PC: proximo clique
// no canvas (ver onCanvasMouseDown); mobile: soltar o dedo do botao (ver
// setupAimMobileButton) - e quem chama executePush de fato. Apertar F de
// novo enquanto ja esta mirando CANCELA (nao reativa/reinicia).
// Slot F por classe: Planta = Folhas (3 cargas, projeteis), Besta = Empurrar
// forte, Aquatica = Jato de agua (cone estreito, arremesso maior).
function useAbilityF() {
  if (G.player.state !== 'racing') { return false; }
  var isPlant = G.player.cls === 'plant';
  var mode = isPlant ? 'leaf' : 'push';
  if (G.aimMode === mode) { cancelAim(TXT('msg.cancelled')); return false; }
  if (G.abilities.f > 0) { return false; }
  if (chargeMax('f') > 0 && G.charges.f <= 0) { return false; } // Folhas / Jato: precisa de carga
  armAim(mode);
  showMessage(TXT('msg.aimDir', isPlant ? TXT('skill.leaves') : pushProfile().name), AIM_TIMEOUT);
  return true;
}

// Dash/Teleporte: o Axie passa a ficar VIRADO para o lado em que a skill foi usada e
// continua andando nesse rumo (ex.: indo reto e usando a skill pra tras, ele segue
// caminhando pra tras). Um destino de clique antigo (mouse) e descartado pra ele nao
// voltar a girar pro rumo anterior; se o botao direito ainda esta SEGURADO, o cursor
// continua guiando normalmente.
function faceSkillDirection(dirX, dirZ) {
  G.player.heading = Math.atan2(dirX, dirZ);
  if (G.player.group) { G.player.group.rotation.y = G.player.heading; }
  if (!G.mouse.down) { G.mouse.targetActive = false; }
}

// Confirma o Teleporte na direcao mirada (dirX,dirZ) - so aqui o cooldown e
// gasto. Requer o jogador ainda 'racing' no momento da confirmacao (ao
// contrario do Empurrar, este SIM move o proprio jogador - nao faz sentido
// nem e desejavel deixar um jogador CONGELADO escapar teleportando).
function executeTeleport(dirX, dirZ) {
  if (G.player.state !== 'racing') { cancelAim(null); return; }
  var len = Math.sqrt(dirX * dirX + dirZ * dirZ);
  if (len < 0.0001) { return; }
  dirX /= len; dirZ /= len;
  // Catch-up (ver catchupCooldownMultiplier): quem esta a mais de 1
  // checkpoint atras do lider geral recebe ate 20% de reducao no cooldown
  // do Teleporte, cortado de volta ao normal assim que a diferenca cai pra
  // 1 ou menos.
  G.abilities.q = COOLDOWNS.q * catchupCooldownMultiplier();
  var dest = sweepTeleport(G.player.position.x, G.player.position.z, dirX, dirZ, TELEPORT_DISTANCE);
  spawnRangeDisc(G.player.position.x, G.player.position.z, 6, 0xb59bff, 0.5); // saida
  spawnRangeDisc(dest.x, dest.z, 6, 0xb59bff, 0.5);                            // chegada
  G.player.position.x = dest.x;
  G.player.position.z = dest.z;
  faceSkillDirection(dirX, dirZ); // a frente do Axie passa a ser o lado do teleporte
  showMessage(TXT('msg.teleport'), 1);
  playSfx('teleport');
}

// Confirma o Dash na direcao mirada (dirX,dirZ) - vira o Axie pra essa
// direcao NA HORA (sem o giro gradual normal de TURN_RATE - pedido do
// usuario: "movimento direcional bem rapido") e deixa o sistema de
// movimento normal (updatePlayerMovement) percorrer EXATAMENTE
// DASH_MAX_DISTANCE a DASH_SPEED constante (G.dashRemaining), voltando na
// hora a velocidade normal ao acabar. Mesma trava do Teleporte: precisa
// continuar 'racing' na hora de confirmar.
function executeDash(dirX, dirZ) {
  if (G.player.state !== 'racing') { cancelAim(null); return; }
  var len = Math.sqrt(dirX * dirX + dirZ * dirZ);
  if (len < 0.0001) { return; }
  dirX /= len; dirZ /= len;
  // Catch-up - ver comentario em executeTeleport (mesma regra pro Dash).
  G.abilities.e = COOLDOWNS.e * catchupCooldownMultiplier();
  faceSkillDirection(dirX, dirZ); // a frente do Axie e o lado do dash (e segue nele depois)
  G.dashRemaining = dashDistanceFor(G.player.cls);
  spawnRangeLane(G.player.position.x, G.player.position.z, dirX, dirZ, G.dashRemaining, 4, 0xd8f3ff, 0.45); // faixa do dash
  showMessage(TXT('msg.dash'), 1);
  playSfx('dash');
}

// Confirma a mira e aplica o Empurrar de verdade, na direcao (dirX,dirZ)
// (vetor no MUNDO, nao precisa vir normalizado). So aqui o cooldown e
// gasto - se a mira expirar sozinha (updateAimTimeout) ou for cancelada,
// NADA e gasto. NAO trava em G.player.state - ver historico completo dessa
// decisao logo abaixo, e por que ela NAO se aplica a executeTeleport/
// executeDash (que MOVEM o proprio jogador, diferente do Empurrar).
// Area: cone de PUSH_ANGLE_DEG (120°) de abertura, alcance PUSH_RANGE (36
// unidades), centrado na direcao mirada.
// Efeitos (pedido do usuario):
//   - Mobs IMOVEIS que dao dano (G.staticObstacles, as estalagmites) sao
//     DESTRUIDOS (removidos da cena e do array).
//   - Mobs que se movem (G.centipedes, os lobos) sao EMPURRADOS
//     PUSH_KNOCKBACK unidades pra longe do jogador, MAIS um SLOW temporario
//     (ver PUSH_SLOW_MULTIPLIER/DURATION, aplicado em updateCentipedes).
//   - Players INIMIGOS (G.enemies, time rival) tambem sao empurrados e ficam
//     com SLOW do mesmo jeito (ver updateTeamBot). ALIADOS do mesmo time
//     (G.allies) NUNCA sao afetados.
//   - O empurrao usa moveWithCollision (varredura passo a passo, a MESMA
//     do jogador/dash) em vez de somar o vetor direto - o alvo NUNCA
//     atravessa parede nem sai da trilha empurrado: se o caminho encontrar
//     uma parede, ele desliza ate ela, colide e para exatamente ali. Se
//     parou bem antes do empurrao pretendido (bateu de verdade, nao so
//     arredondamento), aplica um "mini stun" breve (PUSH_WALL_STUN_DURATION)
//     - pausedUntil nos lobos, stunnedUntil nos bots.
//   - NAO afeta barreiras (G.barrierObstacles) nem paredes da trilha
//     (G.wallSegments) - pedido explicito do usuario: so os alvos acima.
// BUG REAL encontrado e corrigido em uma rodada anterior (documentado aqui
// pra nao se perder): antes, a mira era cancelada assim que
// G.player.state saia de 'racing' - parecia sensato ("nao faz sentido
// mirar congelado"), mas na pratica MATAVA a skill exatamente no unico
// caso em que ela mais importa: PUSH_RANGE (3) e quase identico a
// distancia letal lobo-jogador (~3.27, ver checkCollisions) - um lobo
// perto o bastante pra ser empurrado e, quase sempre, um lobo perto o
// bastante pra matar o jogador no MESMO instante, antes do clique de
// confirmacao chegar. Por isso a confirmacao do Empurrar continua
// funcionando mesmo com o jogador ja congelado.
function executePush(dirX, dirZ) {
  if (G.player.state !== 'racing') { cancelAim(null); return; } // congelado: nenhuma skill
  var dirLen = Math.sqrt(dirX * dirX + dirZ * dirZ);
  if (dirLen < 0.0001) { return; }
  dirX /= dirLen;
  dirZ /= dirLen;

  // AQUATICA: o Jato de agua e um PROJETIL (nao cone) com 4 CARGAS - ver executeJet.
  if (G.player.cls === 'aqua') {
    if (G.charges.f <= 0) { cancelAim(null); return; }
    consumeCharge('f');
    G.abilities.f = LEAF_CAST_GAP; // so um respiro entre lancamentos; o cooldown de 10s virou a recarga de cada carga
    executeJet(dirX, dirZ);
    return;
  }
  G.abilities.f = COOLDOWNS.f;
  var prof = pushProfile(); // angulo/forca/stun da CLASSE (Besta 1.5x e stun 2x)
  var r = pushCone(G.player, dirX, dirZ, prof);
  spawnEffectBurst(G.player.position.x + dirX * (prof.range * 0.5), G.player.position.z + dirZ * (prof.range * 0.5), 0xFFD27A);
  showMessage(TXT('msg.pushed', r.destroyed, r.pushed), 1.5);
}

// Nucleo do Empurrar (jogador OU bot): destroi estalagmites no cone, empurra
// lobos e empurra + da slow nos players do time RIVAL (nunca aliados).
// Devolve {destroyed, pushed}.
function pushCone(caster, dirX, dirZ, prof) {
  var px = caster.position.x, pz = caster.position.z;
  spawnRangeSector(px, pz, dirX, dirZ, prof.range, prof.angleDeg, 0xe6c27a, 0.6); // leque = area real do golpe (cor de areia)
  spawnPushWave(px, pz, dirX, dirZ, prof.range, prof.angleDeg); // onda de ar (visual)
  castSfx(caster, 'push'); // palma abafada

  function inCone(tx, tz) {
    var dx = tx - px, dz = tz - pz;
    var dist = Math.sqrt(dx * dx + dz * dz);
    if (dist > prof.range || dist < 0.0001) { return false; }
    var ndx = dx / dist, ndz = dz / dist;
    return (ndx * dirX + ndz * dirZ) >= prof.halfCos;
  }

  var destroyedCount = 0;
  var i;
  for (i = G.staticObstacles.length - 1; i >= 0; i--) {
    var ob = G.staticObstacles[i];
    if (!inCone(ob.x, ob.z)) { continue; }
    removeStaticObstacleAt(i);
    destroyedCount++;
  }

  var pushedCount = 0;
  for (i = 0; i < G.centipedes.length; i++) {
    var cent = G.centipedes[i];
    var wx = cent.segStartX + cent.ux * cent.u + cent.nx * cent.v;
    var wz = cent.segStartZ + cent.uz * cent.u + cent.nz * cent.v;
    if (!inCone(wx, wz)) { continue; }
    var awayX = wx - px, awayZ = wz - pz;
    var awayLen = Math.sqrt(awayX * awayX + awayZ * awayZ) || 1;
    var awayDirX = awayX / awayLen, awayDirZ = awayZ / awayLen;
    // moveWithCollision (a MESMA varredura passo a passo do jogador/dash) -
    // nunca deixa o lobo atravessar/sair da trilha; para exatamente na
    // parede se o caminho do empurrao encontrar uma.
    var resolvedW = moveWithCollision(wx, wz, awayDirX * prof.knock, awayDirZ * prof.knock);
    var actualDistW = Math.sqrt((resolvedW.x - wx) * (resolvedW.x - wx) + (resolvedW.z - wz) * (resolvedW.z - wz));
    var relX = resolvedW.x - cent.segStartX, relZ = resolvedW.z - cent.segStartZ;
    var newU = clampNum(relX * cent.ux + relZ * cent.uz, cent.uMin, cent.uMax);
    var vb = wolfVBoundsAtU(cent.vBins, newU);
    cent.u = newU;
    cent.v = clampNum(relX * cent.nx + relZ * cent.nz, vb.vMin, vb.vMax);
    cent.slowUntil = G.totalTime + PUSH_SLOW_DURATION;
    // "Mini stun" (pedido do usuario) - so quando bateu numa parede de
    // verdade no caminho (percorreu bem menos que o empurrao pretendido).
    // Reusa pausedUntil (a mesma pausa natural entre travessias).
    if (actualDistW < prof.knock - PUSH_WALL_STOP_EPS) {
      cent.pausedUntil = Math.max(cent.pausedUntil, G.totalTime + prof.stun);
    }
    pushedCount++;
  }

  // So o time RIVAL (aliados NUNCA sao alvo).
  var foes = getTeamMembers(otherTeam(caster.team));
  for (i = 0; i < foes.length; i++) {
    var f = foes[i];
    if (f.state !== 'racing' || !inCone(f.position.x, f.position.z)) { continue; }
    var fx = f.position.x - px, fz = f.position.z - pz;
    var fl = Math.sqrt(fx * fx + fz * fz) || 1;
    knockMember(f, fx / fl, fz / fl, prof.knock, prof.stun);
    applySlow(f, PUSH_SLOW_MULTIPLIER, PUSH_SLOW_DURATION);
    feedbackHit(f, 'push');
    pushedCount++;
  }
  return { destroyed: destroyedCount, pushed: pushedCount };
}

// Empurrao generico (jogador OU bot) com colisao de parede: se bateu na parede
// no caminho, "mini stun" (bot: stunnedUntil; jogador: rootUntil).
function knockMember(m, dirX, dirZ, knock, stun) {
  var res = moveWithCollision(m.position.x, m.position.z, dirX * knock, dirZ * knock);
  var travelled = Math.sqrt((res.x - m.position.x) * (res.x - m.position.x) + (res.z - m.position.z) * (res.z - m.position.z));
  m.position.x = res.x;
  m.position.z = res.z;
  if (m.group) { m.group.position.x = res.x; m.group.position.z = res.z; }
  if (travelled < knock - PUSH_WALL_STOP_EPS) {
    if (m === G.player) { m.rootUntil = Math.max(m.rootUntil, G.totalTime + stun); }
    else { m.stunnedUntil = Math.max(m.stunnedUntil, G.totalTime + stun); }
  }
}
// Slot H por classe: Planta = Invulneravel em AREA (protege aliados num
// circulo de 19.5), Besta = Pisao (area de 19.5), Aquatica = Cuspe de agua
// (skill de MIRA, 2 cargas - so ARMA aqui, ver executeSpit).
function useAbilityG() {
  if (G.player.state !== 'racing') { return false; }
  var cls = G.player.cls;
  if (cls === 'aqua') {
    if (G.aimMode === 'spit') { cancelAim(TXT('msg.cancelled')); return false; }
    if (G.abilities.g > 0 || G.charges.g <= 0) { return false; }
    armAim('spit');
    showMessage(TXT('msg.aimSpit'), AIM_TIMEOUT);
    return true;
  }
  if (G.abilities.g > 0) { return false; }
  G.abilities.g = cooldownTotal('g');
  if (cls === 'beast') { castStomp(); } else { castPlantInvuln(); }
  return true;
}

/* ============== SKILLS DE CLASSE: status, cargas, vidas, projeteis ============== */

function otherTeam(team) { return team === 'teamA' ? 'teamB' : 'teamA'; }

// Anel achatado que cresce e some - mostra a AREA (raio real) de uma skill.
function spawnAreaRing(x, z, radius, color) {
  var geo = new THREE.RingGeometry(radius * 0.92, radius, 40);
  var mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, 0.15, z);
  G.scene.add(mesh);
  // noScale: o anel de AREA nao cresce (o raio mostrado e o raio real).
  G.effectBursts.push({ mesh: mesh, mat: mat, startTime: G.totalTime, noScale: true, dur: 0.9 });
}

// SLOW generico (fator < 1 = mais lento); vale o mais forte ainda ativo.
function applySlow(t, factor, dur) {
  var now = G.totalTime;
  if (now < t.slowUntil) {
    t.slowFactor = Math.min(t.slowFactor, factor);
    t.slowUntil = Math.max(t.slowUntil, now + dur);
  } else {
    t.slowFactor = factor;
    t.slowUntil = now + dur;
  }
}

// CUSPE DE AGUA: o alvo perde a capacidade de CURVAR por dur segundos -
// continua andando na direcao que tinha (ver updateTeamBot/updatePlayerMovement).
function applySteerLock(t, dur) {
  t.steerLockUntil = G.totalTime + dur;
}

// CUSPE DE AGUA (novo efeito): quem esta dentro da area ESCORREGA e GIRA -
// continua andando pelo percurso/movimento que ja tinha (nao consegue curvar)
// ate SAIR da area (ou ate o teto SPIT_SLIP_MAX). Ao sair, fica voltado para
// uma direcao ALEATORIA (ver endSlip). So bots inimigos entram aqui: o
// executeSpit nunca escolhe aliados.
function applySlip(t, zone) {
  feedbackHit(t, 'spit');
  t.slipping = true;
  t.slipStart = G.totalTime;
  t.slipCx = zone.x; t.slipCz = zone.z; t.slipR = zone.r; t.slipZone = zone;
  t.steerLockUntil = G.totalTime + SPIT_SLIP_MAX;
}
function endSlip(t, giveRandomFacing) {
  t.slipping = false;
  t.steerLockUntil = 0;
  if (t.group && t.group.userData.model) {
    t.group.userData.model.rotation.x = 0;
    t.group.userData.model.rotation.y = 0;
  }
  if (giveRandomFacing) {
    var a = Math.random() * Math.PI * 2;
    // A trajetoria PASSA A SER a direcao em que ficou de frente (mesmo virado pra
    // tras: segue pra onde a frente aponta, nao anda de costas no caminho antigo);
    // depois refaz a rota daqui e gira de volta com a curva normal.
    t.dirX = Math.sin(a); t.dirZ = Math.cos(a);
    if (t === G.player) { t.heading = a; }
    t.faceAngle = a;
    t.faceUntil = 0;
    t.recoverUntil = G.totalTime + SPIT_RECOVER_TIME;
    if (t !== G.player) { rerouteBot(t); }
  }
}
// Chamado a cada frame por bot: gira/escorrega o modelo e encerra o efeito ao
// sair da area, ao esgotar o teto, ou se o bot deixou de correr (congelado).
function updateBotSlip(bot, delta) {
  if (!bot.slipping) { return; }
  var dx = bot.position.x - bot.slipCx, dz = bot.position.z - bot.slipCz;
  if (bot.state !== 'racing') { endSlip(bot, false); return; }
  var outside = dx * dx + dz * dz > bot.slipR * bot.slipR;
  var zoneOver = bot.slipZone && G.totalTime >= bot.slipZone.until; // a poca secou = fim do efeito
  if (zoneOver || G.totalTime >= bot.steerLockUntil || (outside && G.totalTime - bot.slipStart >= SPIT_SLIP_MIN)) { endSlip(bot, true); return; }
  var model = bot.group.userData.model;
  if (model) {
    model.rotation.y += 13 * delta;
    model.rotation.x = 0.22 * Math.sin(G.totalTime * 9); // balanca ao escorregar
  }
}

/* ---- DASH: contatos durante o impulso (qualquer classe salva; Planta destroi mobs e da slow) ---- */
var DASH_CONTACT_RADIUS = PLAYER_RADIUS * 2 + 1;
var DASH_PLANT_SLOW_FACTOR = 0.55;
var DASH_PLANT_SLOW_DURATION = 2.5;
// m = quem esta no Dash (jogador ou bot), (x0,z0)->(x1,z1) = trecho percorrido
// neste frame. Varre o TRECHO (nao so o ponto final): em DASH_SPEED um frame
// anda bastante e passaria "por cima" de alguem sem encostar de fato.
function applyDashContacts(m, x0, z0, x1, z1) {
  var i, j, mates = getTeamMembers(m.team);
  // Passou por cima de um aliado CONGELADO = SAVE (mesma regra de saveFrozenMember,
  // inclusive o bloqueio por rival perto do congelado).
  for (i = 0; i < mates.length; i++) {
    var mate = mates[i];
    if (mate === m || mate.state !== 'frozen') { continue; }
    if (pointToSegmentDistance(mate.position.x, mate.position.z, x0, z0, x1, z1) < DASH_CONTACT_RADIUS + SAVE_TOUCH_EXTRA) {
      saveFrozenMember(mate);
    }
  }
  if (m.cls !== 'plant') { return; }
  // PLANTA: destroi estalagmites e lobos no caminho do Dash...
  for (i = G.staticObstacles.length - 1; i >= 0; i--) {
    var ob = G.staticObstacles[i];
    if (pointToSegmentDistance(ob.x, ob.z, x0, z0, x1, z1) < ob.radius + PLAYER_RADIUS + 1) {
      spawnEffectBurst(ob.x, ob.z, 0x7de35a);
      removeStaticObstacleAt(i);
    }
  }
  var wr = 1.0 * WOLF_SIZE_SCALE + PLAYER_RADIUS + 1;
  for (i = G.centipedes.length - 1; i >= 0; i--) {
    var segs = G.centipedes[i].segments, hitWolf = false;
    for (j = 0; j < segs.length; j++) {
      if (pointToSegmentDistance(segs[j].position.x, segs[j].position.z, x0, z0, x1, z1) < wr) { hitWolf = true; break; }
    }
    if (hitWolf) { spawnEffectBurst(segs[0].position.x, segs[0].position.z, 0x7de35a); removeWolfAt(i); }
  }
  // ...e em PLAYERS rivais so aplica SLOW (nunca mata/congela).
  var foes = getTeamMembers(otherTeam(m.team));
  for (i = 0; i < foes.length; i++) {
    var f = foes[i];
    if (f.state !== 'racing') { continue; }
    if (pointToSegmentDistance(f.position.x, f.position.z, x0, z0, x1, z1) < DASH_CONTACT_RADIUS) {
      applySlow(f, DASH_PLANT_SLOW_FACTOR, DASH_PLANT_SLOW_DURATION);
      if (!f.dashHitAt || G.totalTime - f.dashHitAt > 1) { f.dashHitAt = G.totalTime; feedbackHit(f, 'dash'); }
    }
  }
}
var SAVE_TOUCH_EXTRA = 2; // folga extra do toque do Dash num congelado

/* ---- Efeitos animados (jato d'agua, raizes, aura de invulnerabilidade) ---- */
// Cada efeito de G.fxList tem {start, dur, update(k 0..1), done()}; roda no
// tempo da simulacao (G.totalTime), entao pausa junto com o jogo.
function spawnFx(dur, updateFn, doneFn) {
  G.fxList.push({ start: G.totalTime, dur: dur, update: updateFn, done: doneFn });
}
function updateFx() {
  var i;
  for (i = G.fxList.length - 1; i >= 0; i--) {
    var f = G.fxList[i];
    var k = (G.totalTime - f.start) / f.dur;
    if (k >= 1) {
      if (f.done) { f.done(); }
      G.fxList.splice(i, 1);
      continue;
    }
    f.update(k);
  }
}

// JATO DE AGUA (Aquatica): feixe + gotas que disparam pelo cone ate o alcance
// REAL do golpe (range = prof.range, o mesmo da HUD).
function spawnWaterJet(px, pz, dirX, dirZ, range, angleDeg) {
  var half = (angleDeg / 2) * Math.PI / 180, base = Math.atan2(dirX, dirZ), i;
  var group = new THREE.Group();
  group.position.set(px, 0, pz);
  group.rotation.y = base;
  G.scene.add(group);
  var geos = [], mats = [];
  var beamMat = new THREE.MeshBasicMaterial({ color: 0xbff0ff, transparent: true, opacity: 0.6, depthWrite: false });
  var beamGeo = new THREE.BoxGeometry(2.6, 1.6, 1);
  var beam = new THREE.Mesh(beamGeo, beamMat);
  beam.position.y = 2.4;
  group.add(beam);
  geos.push(beamGeo); mats.push(beamMat);
  // leque de agua no chao (o cone real do golpe)
  var fan = [0, 0.14, 0], segs = 16, idx = [];
  for (i = 0; i <= segs; i++) {
    var ang = -half + 2 * half * (i / segs);
    fan.push(Math.sin(ang) * range, 0.14, Math.cos(ang) * range);
  }
  for (i = 1; i <= segs; i++) { idx.push(0, i, i + 1); }
  var fanGeo = new THREE.BufferGeometry();
  fanGeo.setAttribute('position', new THREE.Float32BufferAttribute(fan, 3));
  fanGeo.setIndex(idx);
  var fanMat = new THREE.MeshBasicMaterial({ color: 0x5fd0ff, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
  var fanMesh = new THREE.Mesh(fanGeo, fanMat);
  group.add(fanMesh);
  geos.push(fanGeo); mats.push(fanMat);
  var dropGeo = new THREE.SphereGeometry(0.9, 6, 5);
  var dropMats = [new THREE.MeshBasicMaterial({ color: 0x9fe8ff, transparent: true, opacity: 0.9 }), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })];
  geos.push(dropGeo); mats.push(dropMats[0], dropMats[1]);
  var drops = [];
  for (i = 0; i < 40; i++) {
    var d = new THREE.Mesh(dropGeo, dropMats[i % 2]);
    group.add(d);
    drops.push({ mesh: d, a: (Math.random() * 2 - 1) * half * 0.92, reach: 0.55 + Math.random() * 0.45, delay: Math.random() * 0.25, size: 0.5 + Math.random() * 0.9 });
  }
  spawnFx(0.6, function (k) {
    var j, reachK = Math.min(1, k * 2.4);
    beam.scale.x = 1;
    beam.scale.z = Math.max(0.1, range * reachK);
    beam.position.z = beam.scale.z / 2 + 2;
    beamMat.opacity = 0.6 * (1 - k);
    fanMat.opacity = 0.35 * (1 - k);
    for (j = 0; j < drops.length; j++) {
      var dr = drops[j];
      var kk = clampNum((k - dr.delay) / (1 - dr.delay), 0, 1);
      var dist = 3 + (range * dr.reach) * kk;
      dr.mesh.position.set(Math.sin(dr.a) * dist, 2.4 + 4 * Math.sin(Math.PI * kk) * (0.4 + dr.reach * 0.6), Math.cos(dr.a) * dist);
      var sc = dr.size * (kk <= 0 ? 0.001 : 1 - 0.5 * kk);
      dr.mesh.scale.set(sc, sc, sc);
    }
  }, function () {
    var j;
    G.scene.remove(group);
    for (j = 0; j < geos.length; j++) { geos[j].dispose(); }
    for (j = 0; j < mats.length; j++) { mats[j].dispose(); }
  });
}

// RAIZES (Planta, 3a folha): espinhos de raiz brotam do chao em volta do
// inimigo, se inclinam pra ele e ficam segurando ate o fim da prisao.
function spawnRootFx(x, z, dur) {
  var group = new THREE.Group();
  group.position.set(x, 0, z);
  G.scene.add(group);
  var geos = [], mats = [
    new THREE.MeshLambertMaterial({ color: 0x7a4a22 }),
    new THREE.MeshLambertMaterial({ color: 0x4cc243 })
  ];
  var pivots = [], i, n = 9;
  for (i = 0; i < n; i++) {
    var a = (i / n) * Math.PI * 2 + (i % 2) * 0.2;
    var h = 9 + (i % 3) * 2.4;
    var geo = new THREE.ConeGeometry(1.0, h, 5);
    geo.translate(0, h / 2, 0);
    geos.push(geo);
    var cone = new THREE.Mesh(geo, mats[i % 3 === 0 ? 1 : 0]);
    cone.rotation.z = -0.55;
    var pivot = new THREE.Group();
    pivot.position.set(Math.cos(a) * 5.2, 0, Math.sin(a) * 5.2);
    pivot.rotation.y = Math.PI - a;
    pivot.add(cone);
    group.add(pivot);
    pivots.push(pivot);
  }
  // segunda fileira mais junta e baixa (parece um feixe de raizes fechando)
  for (i = 0; i < 6; i++) {
    var a2 = (i / 6) * Math.PI * 2 + 0.5;
    var geo2 = new THREE.ConeGeometry(0.75, 7, 5);
    geo2.translate(0, 3.5, 0);
    geos.push(geo2);
    var cone2 = new THREE.Mesh(geo2, mats[0]);
    cone2.rotation.z = -0.95;
    var pv2 = new THREE.Group();
    pv2.position.set(Math.cos(a2) * 3.4, 0, Math.sin(a2) * 3.4);
    pv2.rotation.y = Math.PI - a2;
    pv2.add(cone2);
    group.add(pv2);
    pivots.push(pv2);
  }
  spawnFx(dur, function (k) {
    var grow = k < 0.15 ? k / 0.15 : (k > 0.85 ? (1 - k) / 0.15 : 1);
    var j;
    for (j = 0; j < pivots.length; j++) { pivots[j].scale.set(1, Math.max(0.01, grow), 1); }
  }, function () {
    var j;
    G.scene.remove(group);
    for (j = 0; j < geos.length; j++) { geos[j].dispose(); }
    mats[0].dispose(); mats[1].dispose();
  });
}

// AURA DE INVULNERABILIDADE (Planta): anel verde no chao + bolha verde
// translucida em cada Axie afetado, enquanto durar (m.auraUntil). Criada sob
// demanda dentro do grupo do Axie (nao inclina quando congela).
function ensureInvulnAura(m) {
  var ud = m.group.userData;
  if (ud.aura) { return ud.aura; }
  var aura = new THREE.Group();
  var ringGeo = new THREE.RingGeometry(3.1, 3.9, 32);
  var ringMat = new THREE.MeshBasicMaterial({ color: 0x35e04a, side: THREE.DoubleSide, transparent: true, opacity: 0.95 });
  var ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -0.95;
  aura.add(ring);
  var domeGeo = new THREE.SphereGeometry(3.4, 16, 12);
  var domeMat = new THREE.MeshBasicMaterial({ color: 0x4bf05e, transparent: true, opacity: 0.2, depthWrite: false });
  var dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = 0.7;
  aura.add(dome);
  aura.userData.dome = dome;
  aura.userData.ring = ring;
  aura.visible = false;
  m.group.add(aura);
  ud.aura = aura;
  return aura;
}
function updateInvulnAuras() {
  var all = [G.player].concat(G.allies, G.enemies), i, now = G.totalTime;
  for (i = 0; i < all.length; i++) {
    var m = all[i];
    if (!m.group) { continue; }
    var on = now < (m.auraUntil || 0) && m.state === 'racing';
    if (!on && !m.group.userData.aura) { continue; }
    var aura = ensureInvulnAura(m);
    if (aura.visible !== on) { aura.visible = on; }
    if (on) {
      var pulse = 1 + 0.08 * Math.sin(now * 8);
      aura.userData.dome.scale.set(pulse, pulse, pulse);
      aura.userData.ring.scale.set(pulse, pulse, 1);
    }
  }
}

// POCA DO CUSPE (area persistente por SPIT_ZONE_DURATION): disco de agua no
// gelo com brilho pulsante, borda e ondas que se espalham em loop; some (fade)
// no fim. O raio mostrado e o raio REAL do efeito (zone.r).
function spawnSpitPuddle(zone) {
  var group = new THREE.Group();
  group.position.set(zone.x, 0, zone.z);
  G.scene.add(group);
  var geos = [], mats = [];
  function flat(geo, color, opacity, y) {
    var mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity, side: THREE.DoubleSide, depthWrite: false });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y;
    group.add(mesh);
    geos.push(geo); mats.push(mat);
    return mesh;
  }
  var R = zone.r;
  var disc = flat(new THREE.CircleGeometry(R, 40), 0x1f9dff, 0.5, 0.18);
  var edge = flat(new THREE.RingGeometry(R * 0.93, R, 40), 0xeaffff, 0.95, 0.22);
  var glow = flat(new THREE.CircleGeometry(R * 0.6, 32), 0x8fe3ff, 0.35, 0.2);
  var waves = [
    flat(new THREE.RingGeometry(R * 0.9, R, 40), 0xffffff, 0.8, 0.24),
    flat(new THREE.RingGeometry(R * 0.9, R, 40), 0xffffff, 0.8, 0.24)
  ];
  var dur = SPIT_ZONE_DURATION;
  spawnFx(dur, function (k) {
    var t = k * dur, fade = k > 0.85 ? (1 - k) / 0.15 : 1, j;
    var grow = Math.min(1, t / 0.25); // a poca se abre a partir do ponto do impacto
    group.scale.set(0.3 + 0.7 * grow, 1, 0.3 + 0.7 * grow);
    var pulse = 0.5 + 0.5 * Math.sin(t * 6);
    disc.material.opacity = (0.4 + 0.15 * pulse) * fade;
    glow.material.opacity = (0.25 + 0.2 * (1 - pulse)) * fade;
    edge.material.opacity = 0.95 * fade;
    for (j = 0; j < waves.length; j++) {
      var ph = ((t * 0.9) + j * 0.5) % 1;
      var sc = 0.25 + 0.75 * ph;
      waves[j].scale.set(sc, sc, 1);
      waves[j].material.opacity = 0.8 * (1 - ph) * fade;
    }
  }, function () {
    var j;
    G.scene.remove(group);
    for (j = 0; j < geos.length; j++) { geos[j].dispose(); }
    for (j = 0; j < mats.length; j++) { mats[j].dispose(); }
  });
}

// Pocas ativas: todo INIMIGO em corrida dentro da area (ou que ENTRE nela
// enquanto ela dura) comeca a escorregar (applySlip). Aliados nunca. Devolve
// quantos comecaram a escorregar agora.
function updateSpitZones() {
  var i, j, started = 0, now = G.totalTime;
  for (i = G.spitZones.length - 1; i >= 0; i--) {
    var z = G.spitZones[i];
    if (now >= z.until) { G.spitZones.splice(i, 1); continue; }
    var foes = getTeamMembers(otherTeam(z.team));
    for (j = 0; j < foes.length; j++) {
      var m = foes[j];
      if (m.state !== 'racing' || m.slipping) { continue; } // (jogador humano tambem escorrega se um bot rival cuspir)
      var dx = m.position.x - z.x, dz = m.position.z - z.z;
      if (dx * dx + dz * dz <= z.r * z.r) { applySlip(m, z); started++; }
    }
  }
  return started;
}
// FOLHAS (Planta): 1o acerto slow 15%, 2o slow 30% no total, 3o PRENDE no
// lugar por 1.5s (e zera os acumulos). Os acumulos zeram sozinhos se nao
// houver novo acerto em LEAF_STACK_TIMEOUT.
function applyLeafHit(t) {
  feedbackHit(t, 'leaf');
  var now = G.totalTime;
  if (now > t.leafExpire) { t.leafStacks = 0; }
  t.leafStacks += 1;
  t.leafExpire = now + LEAF_STACK_TIMEOUT;
  if (t.leafStacks >= 3) {
    t.rootUntil = now + LEAF_ROOT_DURATION;
    t.leafStacks = 0;
    spawnEffectBurst(t.position.x, t.position.z, 0x6de35a);
    spawnRootFx(t.position.x, t.position.z, LEAF_ROOT_DURATION); // raizes prendendo o Axie
  } else {
    applySlow(t, LEAF_SLOW_FACTORS[t.leafStacks - 1], LEAF_SLOW_DURATION);
  }
}

// ---- Cargas (Folhas: F da Planta; Cuspe: H da Aquatica) ----
function chargeMax(key) {
  if (key === 'f' && G.player.cls === 'plant') { return LEAF_CHARGES; }
  if (key === 'f' && G.player.cls === 'aqua') { return JET_CHARGES; }
  if (key === 'g' && G.player.cls === 'aqua') { return SPIT_CHARGES; }
  return 0;
}
// Tempo pra recuperar CADA carga: Folhas 6s, Cuspe 10s e Jato = o cooldown atual do
// slot (COOLDOWNS.f = 10s, inalterado). cls opcional (bots passam a propria classe).
function chargeRecharge(key, cls) {
  if (key === 'f') { return (cls || G.player.cls) === 'aqua' ? COOLDOWNS.f : LEAF_RECHARGE; }
  return SPIT_RECHARGE;
}
function initClassAbilities() {
  G.charges.f = chargeMax('f'); G.charges.g = chargeMax('g');
  G.chargeTimer.f = 0; G.chargeTimer.g = 0;
}
function consumeCharge(key) {
  if (G.charges[key] >= chargeMax(key)) { G.chargeTimer[key] = chargeRecharge(key); }
  G.charges[key] -= 1;
}
function updateCharges(delta) {
  var keys = ['f', 'g'], i;
  for (i = 0; i < keys.length; i++) {
    var k = keys[i], mx = chargeMax(k);
    if (!mx || G.charges[k] >= mx) { continue; }
    G.chargeTimer[k] -= delta;
    if (G.chargeTimer[k] <= 0) {
      G.charges[k] += 1;
      G.chargeTimer[k] = G.charges[k] < mx ? chargeRecharge(k) : 0;
    }
  }
}

// ---- Vidas (Planta: 2; ao levantar/respawnar volta com 1) ----
// Gastar uma vida NAO congela (so o dano com 1 vida congela); o cronometro
// de 15s recomeca a cada dano e, sobrevivendo sem dano, devolve a 2a vida.
function absorbHit(m) {
  if (m.cls !== 'plant' || m.lives <= 1) { return false; }
  m.lives -= 1;
  m.lifeTimer = 0;
  var until = G.totalTime + LIFE_HIT_IFRAME;
  if (m === G.player) { G.invulnUntil = Math.max(G.invulnUntil, until); }
  else { m.invulnUntil = Math.max(m.invulnUntil, until); }
  spawnEffectBurst(m.position.x, m.position.z, 0x7de35a);
  return true;
}
function updateLives(delta) {
  var all = [G.player].concat(G.allies, G.enemies), i;
  for (i = 0; i < all.length; i++) {
    var m = all[i];
    if (m.cls !== 'plant' || m.state !== 'racing' || m.lives >= LIVES_PLANT) { continue; }
    m.lifeTimer += delta;
    if (m.lifeTimer >= LIFE_REGEN_SECONDS) { m.lives = LIVES_PLANT; m.lifeTimer = 0; }
  }
}

// ---- PLANTA: Invulneravel em area ----
function castPlantInvuln() {
  var n = invulnFrom(G.player);
  showMessage(TXT('msg.invuln') + (n > 0 ? TXT(n > 1 ? 'msg.invulnAllies' : 'msg.invulnAlly', n) : ''), 1.2);
}
// Nucleo da Invulnerabilidade em area (jogador OU bot): o proprio + aliados
// em corrida dentro de INVULN_AREA_RADIUS, por INVULN_DURATION. Devolve quantos aliados.
function invulnFrom(caster) {
  var now = G.totalTime, n = 0, i, mates = getTeamMembers(caster.team);
  function grant(m) {
    if (m === G.player) { G.invulnUntil = Math.max(G.invulnUntil, now + INVULN_DURATION); }
    else { m.invulnUntil = Math.max(m.invulnUntil, now + INVULN_DURATION); }
    m.auraUntil = now + INVULN_DURATION;
  }
  grant(caster);
  for (i = 0; i < mates.length; i++) {
    var a = mates[i];
    if (a === caster || a.state !== 'racing') { continue; }
    var dx = a.position.x - caster.position.x, dz = a.position.z - caster.position.z;
    if (dx * dx + dz * dz <= INVULN_AREA_RADIUS * INVULN_AREA_RADIUS) { grant(a); n++; }
  }
  spawnRangeDisc(caster.position.x, caster.position.z, INVULN_AREA_RADIUS, 0x7de35a, 0.8); // area real da Invulnerabilidade
  castSfx(caster, 'shield', INVULN_DURATION); // som de protecao, dura a skill
  return n;
}
// ---- BESTA: Pisao ----
function removeStaticObstacleAt(i) {
  var ob = G.staticObstacles[i];
  if (ob.meshes) {
    var m;
    for (m = 0; m < ob.meshes.length; m++) {
      G.scene.remove(ob.meshes[m]);
      if (ob.meshes[m].geometry && !ob.meshes[m].geometry.userData.shared) { ob.meshes[m].geometry.dispose(); }
    }
  }
  G.staticObstacles.splice(i, 1);
}
function removeWolfAt(i) {
  var segs = G.centipedes[i].segments, s;
  for (s = 0; s < segs.length; s++) { G.scene.remove(segs[s]); }
  if (G.centipedes[i].visual) { G.scene.remove(G.centipedes[i].visual); }
  G.centipedes.splice(i, 1);
}
function castStomp() {
  var r = stompFrom(G.player);
  G.cameraShakeUntil = G.totalTime + CAMERA_SHAKE_DURATION;
  showMessage(TXT('msg.stomp', r.destroyed, r.pushed), 1.5);
}
// Nucleo do Pisao (jogador OU bot): destroi mobs letais na area e empurra
// RADIALMENTE + slow forte nos rivais. Aliados NAO sao afetados.
function stompFrom(caster) {
  var px = caster.position.x, pz = caster.position.z, R = STOMP_RADIUS, i, destroyed = 0, pushed = 0;
  for (i = G.staticObstacles.length - 1; i >= 0; i--) {
    var o = G.staticObstacles[i];
    var dx = o.x - px, dz = o.z - pz;
    if (dx * dx + dz * dz <= (R + o.radius) * (R + o.radius)) { removeStaticObstacleAt(i); destroyed++; }
  }
  for (i = G.centipedes.length - 1; i >= 0; i--) {
    var c = G.centipedes[i], hit = false, s;
    for (s = 0; s < c.segments.length && !hit; s++) {
      var sx = c.segments[s].position.x - px, sz = c.segments[s].position.z - pz;
      if (sx * sx + sz * sz <= R * R) { hit = true; }
    }
    if (hit) { removeWolfAt(i); destroyed++; }
  }
  var foes = getTeamMembers(otherTeam(caster.team));
  for (i = 0; i < foes.length; i++) {
    var e = foes[i];
    if (e.state !== 'racing') { continue; }
    var ex = e.position.x - px, ez = e.position.z - pz;
    var ed = Math.sqrt(ex * ex + ez * ez);
    if (ed > R) { continue; }
    var ux, uz;
    if (ed < 0.5) { var ang = Math.random() * Math.PI * 2; ux = Math.cos(ang); uz = Math.sin(ang); } else { ux = ex / ed; uz = ez / ed; }
    knockMember(e, ux, uz, STOMP_KNOCKBACK, PUSH_WALL_STUN_DURATION);
    applySlow(e, STOMP_SLOW_FACTOR, STOMP_SLOW_DURATION);
    feedbackHit(e, 'stomp');
    pushed++;
  }
  spawnRangeDisc(px, pz, R, 0xff9d2e, 0.7); // area real do Pisao
  castSfx(caster, 'stomp'); // tremor de terra
  spawnEffectBurst(px, pz, 0xffc27a);
  return { destroyed: destroyed, pushed: pushed };
}
// ---- PROJETEIS (Folhas da Planta e Jato de agua da Aquatica) ----
// Cada projetil carrega o proprio alcance/velocidade/raio: {kind: 'leaf'|'jet'}.
// Rapidos, param em parede, e so acertam PLAYERS inimigos (nunca aliados nem mobs).
// Folha DESENHADA (contorno verde-escuro, duas metades de tons diferentes, nervura central e
// cabinho) no lugar do cone: mesmo comprimento/largura do antigo projetil (visual = area de acerto).
// Deitada e apontando pro +Z local; o grupo interno "balanca" girando no eixo do comprimento.
function makeLeafMesh() {
  var L = 4 * LEAF_RADIUS, W = LEAF_RADIUS * 0.98;
  function halfShape(sign, grow) {
    var s = new THREE.Shape();
    s.moveTo(0, -L * 0.5 - grow);
    s.bezierCurveTo(sign * (W * 1.15 + grow), -L * 0.32, sign * (W * 1.05 + grow), L * 0.16, 0, L * 0.5 + grow * 1.5);
    s.lineTo(0, -L * 0.5 - grow);
    return s;
  }
  function flat(shape, color, y) {
    var geo = new THREE.ShapeGeometry(shape, 12);
    geo.rotateX(Math.PI / 2); // eixo Y do desenho vira +Z, a folha fica deitada
    var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide }));
    m.position.y = y;
    return m;
  }
  var inner = new THREE.Group();
  inner.add(flat(halfShape(1, 0.9), 0x1f6b2a, -0.06));
  inner.add(flat(halfShape(-1, 0.9), 0x1f6b2a, -0.06));
  inner.add(flat(halfShape(1, 0), 0x62e352, 0));
  inner.add(flat(halfShape(-1, 0), 0x3fbf3a, 0));
  var vein = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, L * 0.86), new THREE.MeshBasicMaterial({ color: 0x1f8a2c }));
  vein.position.set(0, 0.08, 0);
  inner.add(vein);
  var k;
  for (k = -1; k <= 1; k += 2) {
    var side, sv;
    for (side = 0; side < 3; side++) {
      sv = new THREE.Mesh(new THREE.BoxGeometry(W * 0.75, 0.1, 0.5), new THREE.MeshBasicMaterial({ color: 0x2f9a34 }));
      sv.position.set(k * W * 0.4, 0.07, -L * 0.22 + side * L * 0.2);
      sv.rotation.y = -k * 0.75;
      inner.add(sv);
    }
  }
  var stem = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.3, L * 0.16), new THREE.MeshBasicMaterial({ color: 0x1f6b2a }));
  stem.position.set(0, 0, -L * 0.56);
  inner.add(stem);
  var g = new THREE.Group();
  g.add(inner);
  return g;
}
// Bola d'agua (diametro = hitbox do Axie) com um rastro em cone atras dela.
function makeJetMesh() {
  var g = new THREE.Group();
  var ball = new THREE.Mesh(new THREE.SphereGeometry(JET_PROJ_RADIUS, 12, 9), new THREE.MeshBasicMaterial({ color: 0x9fe8ff, transparent: true, opacity: 0.95 }));
  g.add(ball);
  var trailGeo = new THREE.ConeGeometry(JET_PROJ_RADIUS * 0.9, JET_PROJ_RADIUS * 5, 10, 1, true);
  trailGeo.rotateX(-Math.PI / 2); // ponta (fina) pra -Z local: a base larga fica junto da bola
  var trail = new THREE.Mesh(trailGeo, new THREE.MeshBasicMaterial({ color: 0x4fc3ff, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }));
  trail.position.z = -JET_PROJ_RADIUS * 3;
  g.add(trail);
  return g;
}
function spawnProjectile(kind, dirX, dirZ, mesh, speed, range, hitR, extra, caster) {
  caster = caster || G.player;
  var lat = (extra && extra.lat) || 0; // afastamento lateral (Jato: 2 projeteis lado a lado)
  var sx = caster.position.x + dirX * 6 - dirZ * lat, sz = caster.position.z + dirZ * 6 + dirX * lat;
  mesh.position.set(sx, 4, sz);
  mesh.rotation.y = Math.atan2(dirX, dirZ);
  G.scene.add(mesh);
  // faixa do ALCANCE do projetil (Folhas verde / Jato azul)
  spawnRangeLane(caster.position.x, caster.position.z, dirX, dirZ, range, kind === 'jet' ? JET_PROJ_RADIUS * 2 : LEAF_RADIUS * 2, kind === 'jet' ? 0x4fc3ff : 0x6de35a, 0.5);
  var p = { kind: kind, x: sx, z: sz, dx: dirX, dz: dirZ, traveled: 6, mesh: mesh, team: caster.team, speed: speed, range: range, hitR: hitR };
  if (extra) { var k; for (k in extra) { p[k] = extra[k]; } }
  if (kind === 'leaf') { p.sfx = castSfx(caster, 'leaf', range / speed); } // corte no ar, dura o voo
  G.projectiles.push(p);
}
function disposeProjectile(p) {
  if (p.sfx) { p.sfx.refs -= 1; if (p.sfx.refs <= 0) { p.sfx.stop(); } p.sfx = null; } // projetil acabou: cala o som dele
  G.scene.remove(p.mesh);
  p.mesh.traverse(function (o) {
    if (o.geometry) { o.geometry.dispose(); }
    if (o.material) { o.material.dispose(); }
  });
}

// ---- PLANTA: Folhas (3 cargas) ----
function executeLeaves(dirX, dirZ) {
  if (G.player.state !== 'racing' || G.charges.f <= 0) { cancelAim(null); return; }
  var len = Math.sqrt(dirX * dirX + dirZ * dirZ);
  if (len < 0.0001) { return; }
  dirX /= len; dirZ /= len;
  consumeCharge('f');
  G.abilities.f = LEAF_CAST_GAP;
  spawnProjectile('leaf', dirX, dirZ, makeLeafMesh(), LEAF_SPEED, LEAF_RANGE, LEAF_HIT_RADIUS, null);
}

// ---- AQUATICA: Jato de agua (agora PROJETIL, so afeta players inimigos) ----
function executeJet(dirX, dirZ) {
  fireJet(G.player, dirX, dirZ, pushProfile());
  spawnEffectBurst(G.player.position.x + dirX * 8, G.player.position.z + dirZ * 8, 0x7fd8ff);
  showMessage(TXT('msg.jet'), 1);
}

// Dispara JET_PROJ_COUNT projeteis lado a lado (jogador OU bot). Cada um
// acerta players inimigos E destroi mobs (ver jetHitsMob).
function fireJet(caster, dirX, dirZ, prof) {
  var n = JET_PROJ_COUNT, i;
  for (i = 0; i < n; i++) {
    var lat = (i - (n - 1) / 2) * 2 * JET_LATERAL;
    spawnProjectile('jet', dirX, dirZ, makeJetMesh(), JET_PROJ_SPEED, prof.range, JET_PROJ_RADIUS + PLAYER_RADIUS, { knock: prof.knock, stun: prof.stun, lat: lat }, caster);
  }
  // UM som de jato pros projeteis lado a lado, com a duracao do voo; para quando o ultimo some.
  var jh = castSfx(caster, 'jet', prof.range / JET_PROJ_SPEED);
  if (jh) {
    jh.refs = n;
    for (i = 0; i < n; i++) { G.projectiles[G.projectiles.length - 1 - i].sfx = jh; }
  }
}

// O Jato tambem ATINGE e DESTROI mobs letais (estalagmites e lobos): o
// projetil que encosta num deles o destroi e acaba ali. Devolve true se acertou.
function jetHitsMob(p) {
  var i, s;
  for (i = G.staticObstacles.length - 1; i >= 0; i--) {
    var o = G.staticObstacles[i], dx = o.x - p.x, dz = o.z - p.z, rr = o.radius + JET_PROJ_RADIUS;
    if (dx * dx + dz * dz <= rr * rr) {
      spawnEffectBurst(o.x, o.z, 0x7fd8ff);
      removeStaticObstacleAt(i);
      return true;
    }
  }
  var wr = 1.0 * WOLF_SIZE_SCALE + JET_PROJ_RADIUS;
  for (i = G.centipedes.length - 1; i >= 0; i--) {
    var segs = G.centipedes[i].segments;
    for (s = 0; s < segs.length; s++) {
      var sx = segs[s].position.x - p.x, sz = segs[s].position.z - p.z;
      if (sx * sx + sz * sz <= wr * wr) {
        spawnEffectBurst(segs[s].position.x, segs[s].position.z, 0x7fd8ff);
        removeWolfAt(i);
        return true;
      }
    }
  }
  return false;
}
// Efeito do Jato num player inimigo (o MESMO do antigo cone: empurrao na
// direcao do tiro + slow + mini stun se bater em parede).
function applyJetHit(m, dirX, dirZ, knock, stun) {
  feedbackHit(m, 'jet');
  knockMember(m, dirX, dirZ, knock, stun);
  applySlow(m, PUSH_SLOW_MULTIPLIER, PUSH_SLOW_DURATION);
  spawnEffectBurst(m.position.x, m.position.z, 0x7fd8ff);
}

function updateProjectiles(delta) {
  var i;
  for (i = G.projectiles.length - 1; i >= 0; i--) {
    var p = G.projectiles[i], remaining = p.speed * delta, dead = false;
    while (remaining > 0 && !dead) {
      var step = Math.min(remaining, 3);
      remaining -= step;
      var nx = p.x + p.dx * step, nz = p.z + p.dz * step;
      var r = resolveWallCollisions(nx, nz);
      if ((r.x - nx) * (r.x - nx) + (r.z - nz) * (r.z - nz) > 0.36) { dead = true; break; }
      p.x = nx; p.z = nz; p.traveled += step;
      if (p.kind === 'jet' && jetHitsMob(p)) { dead = true; break; }
      var foes = getTeamMembers(otherTeam(p.team)), f;
      for (f = 0; f < foes.length; f++) {
        var m = foes[f];
        if (m.state !== 'racing') { continue; }
        var dx = m.position.x - p.x, dz = m.position.z - p.z;
        if (dx * dx + dz * dz < p.hitR * p.hitR) {
          if (p.kind === 'jet') { applyJetHit(m, p.dx, p.dz, p.knock, p.stun); }
          else { applyLeafHit(m); }
          dead = true; break;
        }
      }
      if (p.traveled >= p.range) { dead = true; }
    }
    if (dead) {
      disposeProjectile(p);
      G.projectiles.splice(i, 1);
    } else {
      p.mesh.position.set(p.x, 4, p.z);
      if (p.kind === 'leaf' && p.mesh.children[0]) { p.mesh.children[0].rotation.z = Math.sin(p.traveled * 0.09) * 0.75; } // folha balancando
    }
  }
}
// ---- AQUATICA: Cuspe de agua (2 cargas) ----
function executeSpit(dirX, dirZ, worldDist) {
  if (G.player.state !== 'racing' || G.charges.g <= 0) { cancelAim(null); return; }
  var len = Math.sqrt(dirX * dirX + dirZ * dirZ);
  if (len < 0.0001) { return; }
  dirX /= len; dirZ /= len;
  consumeCharge('g');
  G.abilities.g = SPIT_CAST_GAP;
  var pt = spitTargetPoint(dirX, dirZ, worldDist);
  castSpitBall(G.player, G.player.position.x + dirX * 3, G.player.position.z + dirZ * 3, pt, true);
  showMessage(TXT('msg.spit'), 1.2);
}

// A esfera de agua voa (spawnSpitBall) e SO QUANDO ELA CHEGA no local nasce a POCA PERSISTENTE
// (SPIT_ZONE_DURATION, contada a partir da chegada): quem estiver OU ENTRAR nela escorrega
// (ver updateSpitZones). O respingo, o anel de alcance e a poca aparecem juntos no impacto.
function castSpitBall(caster, fromX, fromZ, pt, isPlayer) {
  spawnSpitBall(fromX, fromZ, pt.x, pt.z, function () {
    var zone = { x: pt.x, z: pt.z, r: SPIT_RADIUS + PLAYER_RADIUS, until: G.totalTime + SPIT_ZONE_DURATION, team: caster.team };
    G.spitZones.push(zone);
    var hits = updateSpitZones();
    spawnSpitPuddle(zone); // a poca desenha exatamente o raio real da area (zone.r)
    if (isPlayer) { playSfx('splash', 0.9); } else { playSfxAt('splash', pt.x, pt.z); } // "splash" quando a esfera cai
    if (isPlayer && hits > 0) { showMessage(TXT('msg.spitHits', hits), 1.2); }
  });
}

// R sempre funciona como "respawn manual no ultimo checkpoint", mas com
// dois comportamentos diferentes dependendo do estado (pedido do
// usuario): CONGELADO -> sai do congelamento na hora, sem cooldown nenhum
// (e a valvula de escape principal, nao devia ficar limitado por
// cooldown); RACING -> continua a habilidade normal de sempre, com o
// cooldown de COOLDOWNS.r.
function useAbilityR() {
  if (G.player.state === 'frozen') {
    respawnPlayer();
    unfreezePlayer('manual');
    return;
  }
  if (G.player.state !== 'racing') { return; }
  if (G.abilities.r > 0) { return; }
  G.abilities.r = COOLDOWNS.r;
  respawnPlayer();
  showMessage(TXT('msg.RESPAWN'), 1);
}

function updateCooldowns(delta) {
  var keys = ['q', 'e', 'f', 'g', 'r'];
  var i;
  for (i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (G.abilities[k] > 0) {
      G.abilities[k] -= delta;
      if (G.abilities[k] < 0) { G.abilities[k] = 0; }
    }
  }
  updateCharges(delta);
}

/* ================================ CAMERA =================================== */

// Camera estilo Dota 2: leve inclinacao (nao e mais 100% de cima). A camera
// fica sempre recuada e elevada em relacao ao jogador por uma distancia
// fixa (o que gera o angulo perspectivo) e usa lookAt para apontar sempre
// para o personagem - como o angulo nunca e reto (90 graus), nao ha risco
// de singularidade de gimbal.
var CAMERA_SHAKE_DURATION = 0.35; // segundos - tremor leve de feedback de morte/congelamento (ver triggerFreezeFeedback)
var CAMERA_SHAKE_MAGNITUDE = 3.2;
// Look-ahead sutil: a camera (posicao E mira, as DUAS - ver "trucking" no
// comentario abaixo) se desloca um pouco na direcao pra onde o Axie esta
// olhando (G.player.heading), pra mostrar mais do que tem pela frente
// (inimigos incluidos). ~2 "corpos" do Axie (que tem raio PLAYER_RADIUS,
// ~1.5-2 de tamanho) a frente, pedido do usuario. Baseado SO no heading
// (nunca em velocidade/input), entao continua valendo parado ou andando -
// diferente de antes, onde so deslocava a POSICAO da camera mantendo a
// mira sempre exatamente no jogador: isso mantinha o Axie sempre bem no
// centro da tela e so mudava o angulo de visao por uma fracao de grau,
// praticamente imperceptivel (reportado pelo usuario: "so parece mudar em
// super velocidade", quando o deslocamento entre frames e grande o
// bastante pra notar por outro motivo). Agora a POSICAO da camera E a
// MIRA se movem JUNTAS, pelo MESMO vetor - o angulo/distancia de visao em
// relacao ao Axie continua exatamente o mesmo de sempre (sem inclinar nem
// dar zoom), so o enquadramento inteiro desliza pra frente, deixando o
// Axie visivelmente um pouco fora do centro (na direcao contraria a que
// olha) e revelando mais area adiante - o efeito classico de "look-ahead",
// bem mais perceptivel que so mover a posicao da camera sozinha.
// fx/fz = sin/cos do heading e SEMPRE um vetor unitario (seno^2+cosseno^2=1
// pra qualquer angulo) - por isso a distancia do deslocamento e sempre a
// MESMA (CAMERA_LOOKAHEAD_DISTANCE), tanto reto quanto na diagonal, nunca
// somando os dois eixos cheios (o que deixaria a diagonal maior/mais forte
// que o reto, o oposto do pedido "ainda mais sutil na diagonal").
// G.cameraLookaheadX/Z guardam um valor JA suavizado (lerp) entre frames,
// separado do lerp de posicao da camera logo abaixo - dois lerps em serie,
// sem nenhum salto brusco.
var CAMERA_LOOKAHEAD_DISTANCE = 7; // dobrado a pedido do usuario (era 3.5)
// Look-ahead maior (pedido do usuario): eixo frente/tras da tela (mundo Z) 2x;
// eixo lateral (mundo X) 1.5x o valor acima.
var CAMERA_LOOKAHEAD_MULT_Z = 3;    // 2 x 1.5 (mais 1.5x pedido depois)
var CAMERA_LOOKAHEAD_MULT_X = 2.25;  // 1.5 x 1.5
var CAMERA_LOOKAHEAD_LERP = 0.06;
function updateCameraFollow() {
  var fx = Math.sin(G.player.heading);
  var fz = Math.cos(G.player.heading);
  var targetLookaheadX = fx * CAMERA_LOOKAHEAD_DISTANCE * CAMERA_LOOKAHEAD_MULT_X;
  var targetLookaheadZ = fz * CAMERA_LOOKAHEAD_DISTANCE * CAMERA_LOOKAHEAD_MULT_Z;
  G.cameraLookaheadX = lerpNum(G.cameraLookaheadX, targetLookaheadX, CAMERA_LOOKAHEAD_LERP);
  G.cameraLookaheadZ = lerpNum(G.cameraLookaheadZ, targetLookaheadZ, CAMERA_LOOKAHEAD_LERP);

  var desiredX = G.player.position.x + G.cameraLookaheadX;
  var desiredY = CAMERA_HEIGHT;
  var desiredZ = G.player.position.z + CAMERA_BACK_OFFSET + G.cameraLookaheadZ;

  G.camera.position.x = lerpNum(G.camera.position.x, desiredX, 0.1);
  G.camera.position.y = lerpNum(G.camera.position.y, desiredY, 0.1);
  G.camera.position.z = lerpNum(G.camera.position.z, desiredZ, 0.1);

  // Tremor leve da camera (feedback de morte/colisao) - diminui de forca
  // conforme o tempo restante encolhe, ate sumir por completo. So desloca
  // a POSICAO da camera; a mira (logo abaixo) nao é afetada pelo tremor,
  // entao o tremor nao desalinha o enquadramento, so da a sensacao de
  // impacto.
  if (G.totalTime < G.cameraShakeUntil) {
    var shakeT = clampNum((G.cameraShakeUntil - G.totalTime) / CAMERA_SHAKE_DURATION, 0, 1);
    var mag = CAMERA_SHAKE_MAGNITUDE * shakeT;
    G.camera.position.x += (Math.random() * 2 - 1) * mag;
    G.camera.position.y += (Math.random() * 2 - 1) * mag * 0.5;
    G.camera.position.z += (Math.random() * 2 - 1) * mag;
  }

  // A MIRA acompanha o mesmo deslocamento de look-ahead da posicao (ver
  // comentario acima) - "anda junto" com a camera, mantendo o mesmo
  // angulo/distancia de sempre em relacao ao Axie, so deslizando o
  // enquadramento inteiro pra frente.
  G.camera.lookAt(G.player.position.x + G.cameraLookaheadX, 0, G.player.position.z + G.cameraLookaheadZ);
}

/* ============================ INTERFACE (HUD) ============================== */

function showMessage(text, duration) {
  var box = document.getElementById('message-box');
  box.textContent = text;
  box.classList.add('visible');
  if (messageTimeoutHandle) { clearTimeout(messageTimeoutHandle); }
  messageTimeoutHandle = setTimeout(function () {
    box.classList.remove('visible');
  }, duration * 1000);
}

/* ================= FEEDBACK VISUAL (checkpoint/morte/respawn) ============== */

// Cria um anel temporario que cresce e desaparece no lugar indicado - usado
// tanto pelo feedback de checkpoint ativado quanto pelo de respawn (cor
// diferente pra cada caso). Nao interfere em nada da fisica/deteccao, e so
// decoracao (ver updateEffectBursts, chamada todo frame em animate()).
var EFFECT_BURST_DURATION = 0.6;
function spawnEffectBurst(x, z, color) {
  var burstGeo = new THREE.RingGeometry(OASIS_RADIUS * 0.9, OASIS_RADIUS * 1.15, 24);
  var burstMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
  var burstMesh = new THREE.Mesh(burstGeo, burstMat);
  burstMesh.rotation.x = -Math.PI / 2;
  burstMesh.position.set(x, 0.09, z);
  G.scene.add(burstMesh);
  G.effectBursts.push({ mesh: burstMesh, mat: burstMat, startTime: G.totalTime });
}

function updateEffectBursts() {
  var i;
  for (i = G.effectBursts.length - 1; i >= 0; i--) {
    var b = G.effectBursts[i];
    var t = (G.totalTime - b.startTime) / (b.dur || EFFECT_BURST_DURATION);
    if (t >= 1) {
      G.scene.remove(b.mesh);
      b.mesh.geometry.dispose();
      b.mat.dispose();
      G.effectBursts.splice(i, 1);
      continue;
    }
    if (!b.noScale) {
      var scale = 1 + t * 1.8;
      b.mesh.scale.set(scale, scale, scale);
    }
    b.mat.opacity = (b.startOpacity || 0.9) * (1 - t);
  }
}

// Ping/icone de "quero ser salvo" (tecla T / botao Help no mobile, ver
// signalSaveMe) - um aneizinho amarelo pulsando por cima do Axie congelado,
// visivel so por SAVE_PING_DURATION segundos.
function createSavePingMarker() {
  var geo = new THREE.RingGeometry(1.1, 1.7, 16);
  var mat = new THREE.MeshBasicMaterial({ color: 0xFFE066, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
  var mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.visible = false;
  G.scene.add(mesh);
  G.savePingMesh = mesh;
}

function updateSavePingMarker() {
  var mesh = G.savePingMesh;
  if (!mesh) { return; }
  var active = G.player.state === 'frozen' && G.totalTime < G.player.savePingUntil;
  mesh.visible = active;
  if (!active) { return; }
  mesh.position.set(G.player.position.x, 4.2 + Math.sin(G.totalTime * 6) * 0.3, G.player.position.z);
  var pulse = 1 + 0.25 * Math.sin(G.totalTime * 8);
  mesh.scale.set(pulse, pulse, pulse);
}

// ALERTA DE SOCORRO no minimapa: quando um Axie congelado pede ajuda (T / bot congelado) aparece um
// anel + "!" na COR DO TIME dele, que PISCA 3 vezes (com um "ping" a cada piscada) e some sozinho;
// some NA HORA se o Axie deixa de estar congelado (respawn ou salvo por aliado).
var HELP_BLINKS = 3;
var HELP_BLINK_PERIOD = 0.6; // segundos por piscada
var HELP_BLINK_ON = 0.6;     // fracao do periodo em que fica aceso
function triggerHelpAlert(m) {
  var i;
  for (i = 0; i < G.helpAlerts.length; i++) { if (G.helpAlerts[i].m === m) { return; } } // ja ha um ativo
  G.helpAlerts.push({ m: m, start: G.totalTime, pinged: -1 });
}
function updateHelpAlerts() {
  var now = G.totalTime, i, bots = G.allies.concat(G.enemies);
  for (i = 0; i < bots.length; i++) {
    var b = bots[i];
    if (b.state === 'frozen' && b.helpCalled === false && now >= b.helpCallAt) { b.helpCalled = true; triggerHelpAlert(b); }
  }
  for (i = G.helpAlerts.length - 1; i >= 0; i--) {
    var a = G.helpAlerts[i], k = Math.floor((now - a.start) / HELP_BLINK_PERIOD);
    if (a.m.state !== 'frozen' || k >= HELP_BLINKS) { G.helpAlerts.splice(i, 1); continue; }
    if (k > a.pinged) { a.pinged = k; playSfx('ping', a.m.team === G.player.team ? 1 : 0.45); }
  }
}

// Cor de destaque (verde/ciano) usada no checkpoint por CHECKPOINT_FEEDBACK_
// DURATION segundos, depois volta sozinha para a cor original - curto o
// bastante pra nao atrapalhar o jogo (o jogador so ve o flash e continua).
var CHECKPOINT_FEEDBACK_DURATION = 1;
var CHECKPOINT_FEEDBACK_COLOR = 0x4CFFC4;
function triggerCheckpointFeedback(cp) {
  playSfx('checkpoint');
  var origRingColor = cp.ringMat.color.getHex();
  var origCoreColor = cp.coreMat.color.getHex();
  var origGroundColor = cp.groundMat ? cp.groundMat.color.getHex() : null;

  cp.ringMat.color.setHex(CHECKPOINT_FEEDBACK_COLOR);
  cp.coreMat.color.setHex(CHECKPOINT_FEEDBACK_COLOR);
  if (cp.groundMat) { cp.groundMat.color.setHex(CHECKPOINT_FEEDBACK_COLOR); }

  spawnEffectBurst(cp.x, cp.z, CHECKPOINT_FEEDBACK_COLOR);
  showMessage(TXT('msg.checkpoint'), CHECKPOINT_FEEDBACK_DURATION);

  setTimeout(function () {
    cp.ringMat.color.setHex(origRingColor);
    cp.coreMat.color.setHex(origCoreColor);
    if (cp.groundMat && origGroundColor !== null) { cp.groundMat.color.setHex(origGroundColor); }
  }, CHECKPOINT_FEEDBACK_DURATION * 1000);
}

// Feedback de morte/colisao: flash vermelho na tela (CSS, ver #death-flash
// no HTML/CSS) + tremor de camera curto (ver CAMERA_SHAKE_* e
// updateCameraFollow) + mensagem rapida. Renomeada de triggerDeathFeedback
// pra triggerFreezeFeedback porque a morte NAO respawna mais na hora -
// agora so avisa que o Axie caiu/congelou (ver onPlayerDeath); o respawn de
// verdade so acontece depois, por salvamento/R manual/timeout (ver
// unfreezePlayer). VISUAL FUTURO (placeholder por enquanto): Axie caido de
// lado (ja aplicado como um tilt simples em onPlayerDeath) + som de dentes
// batendo de frio em loop enquanto congelado.
var DEATH_MESSAGE_DURATION = 0.7;
function triggerFreezeFeedback() {
  showMessage(TXT('msg.frozen', keyLabel(KEYBINDS.save), keyLabel(KEYBINDS.respawn)), DEATH_MESSAGE_DURATION + 1.3);
  G.cameraShakeUntil = G.totalTime + CAMERA_SHAKE_DURATION;
  var flashEl = document.getElementById('death-flash');
  if (flashEl) {
    flashEl.classList.remove('flash-active');
    void flashEl.offsetWidth; // forca reflow pra reiniciar a animacao se disparada de novo rapido
    flashEl.classList.add('flash-active');
  }
}

// Nomes/rotulos dos slots F e H conforme a classe + slot passivo de vida da
// Planta (ver CLASS_SKILL_NAMES).
function applyClassSlotLabels() {
  var names = classSkillNames(G.player.cls);
  var mn = classSkillMobileNames(G.player.cls);
  var el = document.querySelector('#ability-f .ability-name');
  if (el) { el.textContent = names.f; }
  el = document.querySelector('#ability-g .ability-name');
  if (el) { el.textContent = names.g; }
  el = document.querySelector('#mobile-f .mobile-ability-label');
  if (el) { el.textContent = mn.f; }
  el = document.querySelector('#mobile-g .mobile-ability-label');
  if (el) { el.textContent = mn.g; }
  var isPlant = G.player.cls === 'plant';
  // slots com CARGAS: o contador vai no canto (nao cobre a tecla)
  var chargeIds = { plant: ['ability-f', 'mobile-f'], aqua: ['ability-f', 'mobile-f', 'ability-g', 'mobile-g'] };
  var all = ['ability-f', 'mobile-f', 'ability-g', 'mobile-g'], ci;
  for (ci = 0; ci < all.length; ci++) {
    var ce = document.getElementById(all[ci]);
    if (ce) { ce.classList.toggle('has-charges', !!(chargeIds[G.player.cls] && chargeIds[G.player.cls].indexOf(all[ci]) !== -1)); }
  }
  var lifeBar = document.getElementById('ability-life');
  var lifeMob = document.getElementById('mobile-life');
  if (lifeBar) { lifeBar.hidden = !isPlant; }
  if (lifeMob) { lifeMob.hidden = !isPlant; }
}

// Slot passivo "Vida" da Planta: mostra 1/2 ou 2/2 e o TEMPORIZADOR dos 15s
// pra recuperar a 2a vida (a camada escura encolhe conforme carrega).
function updateLifeUI() {
  if (G.player.cls !== 'plant') { return; }
  var charging = G.player.lives < LIVES_PLANT;
  var frac = charging ? clampNum(G.player.lifeTimer / LIFE_REGEN_SECONDS, 0, 1) : 1;
  var remain = Math.max(0, LIFE_REGEN_SECONDS - G.player.lifeTimer);
  var keyText = G.player.lives + '/' + LIVES_PLANT;
  var fillPct = charging ? (1 - frac) * 100 : 0;
  var txt = charging ? (G.player.state === 'racing' ? remain.toFixed(0) + 's' : '') : '';
  var ids = [['life-key', 'life-fill', 'life-text'], ['mobile-life-key', 'mobile-life-fill', 'mobile-life-text']], i;
  for (i = 0; i < ids.length; i++) {
    var k = document.getElementById(ids[i][0]);
    var f = document.getElementById(ids[i][1]);
    var t = document.getElementById(ids[i][2]);
    if (k) { k.textContent = keyText; }
    if (f) { f.style.height = fillPct + '%'; }
    if (t) { t.textContent = txt; }
  }
}

// Cooldown total do slot (a Invulnerabilidade da Planta tem +15%).
function cooldownTotal(key) {
  return COOLDOWNS[key] * (key === 'g' && G.player.cls === 'plant' ? PLANT_INVULN_CD_MULT : 1);
}
function updateAbilityUI(key) {
  var total = cooldownTotal(key);
  var remaining = G.abilities[key];
  var pct = total > 0 ? (remaining / total) * 100 : 0;
  var text = remaining > 0.05 ? remaining.toFixed(1) : '';
  // Skills com CARGAS (Folhas = F da Planta, Cuspe = H da Aquatica): mostra
  // quantas cargas restam (ex.: "2x") e o tempo pra proxima recarga; a camada
  // escura so cobre o slot quando nao ha carga nenhuma.
  var mx = chargeMax(key);
  if (mx > 0) {
    var timerLeft = G.charges[key] < mx ? Math.max(0, G.chargeTimer[key]) : 0;
    pct = G.charges[key] <= 0 ? (timerLeft / chargeRecharge(key)) * 100 : 0;
    text = G.charges[key] + 'x' + (timerLeft > 0.05 ? ' ' + timerLeft.toFixed(0) + 's' : '');
  }

  var fillEl = document.getElementById('cooldown-fill-' + key);
  var textEl = document.getElementById('cooldown-text-' + key);
  if (fillEl) { fillEl.style.height = pct + '%'; }
  if (textEl) { textEl.textContent = text; }

  // Mesma informacao tambem nos botoes mobile (pedido do usuario: "mostre
  // o cooldown das skills tambem na versao mobile") - ids proprios
  // (mobile-cooldown-fill-*/mobile-cooldown-text-*), ver index.html.
  var mobileFillEl = document.getElementById('mobile-cooldown-fill-' + key);
  var mobileTextEl = document.getElementById('mobile-cooldown-text-' + key);
  if (mobileFillEl) { mobileFillEl.style.height = pct + '%'; }
  if (mobileTextEl) { mobileTextEl.textContent = text; }
}

/* ===================== NOMES + INFO ACIMA DOS AXIES ===================== */
// Nome discreto sobre cada Axie (DOM projetado na tela) e, ao lado, as
// informacoes de estado VISIVEIS PARA TODOS: vidas da Planta (2 circulos, o 2o
// enche gradualmente em 15s), acumulos das Folhas, preso, sem curva, lento.
function createNameplates() {
  var host = document.getElementById('nameplates');
  if (!host) { return; }
  host.innerHTML = '';
  G.nameplates = [];
  var all = [G.player].concat(G.allies, G.enemies), i;
  for (i = 0; i < all.length; i++) {
    var m = all[i];
    var el = document.createElement('div');
    el.className = 'nameplate' + (m === G.player ? ' np-self' : '');
    el.style.setProperty('--tc', TEAM_COLORS[m.team] || '#ffffff');
    var nm = document.createElement('span');
    nm.className = 'np-name';
    nm.textContent = m.name || 'Axie';
    var info = document.createElement('span');
    info.className = 'np-info';
    el.appendChild(nm);
    el.appendChild(info);
    host.appendChild(el);
    G.nameplates.push({ m: m, el: el, infoEl: info, last: '' });
  }
  host.hidden = false;
}

function nameplateInfoHtml(m) {
  var now = G.totalTime, h = '';
  if (m.cls === 'plant') {
    var second;
    if (m.lives >= LIVES_PLANT) { second = '<i class="np-life on"></i>'; }
    else {
      var p = m.state === 'racing' ? Math.round(clampNum(m.lifeTimer / LIFE_REGEN_SECONDS, 0, 1) * 50) / 50 : 0;
      second = '<i class="np-life" style="--p:' + p + '"></i>';
    }
    h += '<i class="np-life on"></i>' + second;
  }
  if (m.leafStacks > 0 && now < m.leafExpire) {
    var s;
    for (s = 0; s < 3; s++) { h += '<i class="np-leaf' + (s < m.leafStacks ? ' on' : '') + '"></i>'; }
  }
  if (m.hitTag && now < m.hitTag.until) { h += '<b class="np-chip" style="background:' + cssColor(m.hitTag.color) + '">' + TXT('hit.' + m.hitTag.kind + '.tag') + '</b>'; }
  if (now < m.rootUntil) { h += '<b class="np-chip np-root">' + TXT('np.rooted') + '</b>'; }
  if (now < m.steerLockUntil) { h += '<b class="np-chip np-lock">' + TXT(m.slipping ? 'np.spinning' : 'np.noTurn') + '</b>'; }
  if (now < m.slowUntil && m.slowFactor < 1) { h += '<b class="np-chip np-slow">' + TXT('np.slow') + '</b>'; }
  if (m.state === 'frozen') { h += '<b class="np-chip np-frozen">' + TXT('np.frozen') + '</b>'; }
  return h;
}

var __npVec = null;
function updateNameplates() {
  if (!G.nameplates.length || !G.camera) { return; }
  if (!__npVec) { __npVec = new THREE.Vector3(); }
  var w = window.innerWidth, hgt = window.innerHeight, i;
  for (i = 0; i < G.nameplates.length; i++) {
    var np = G.nameplates[i], m = np.m;
    __npVec.set(m.position.x, 9.5, m.position.z).project(G.camera);
    if (__npVec.z > 1 || __npVec.z < -1) { np.el.style.display = 'none'; continue; }
    var sx = (__npVec.x * 0.5 + 0.5) * w, sy = (-__npVec.y * 0.5 + 0.5) * hgt;
    np.el.style.display = 'flex';
    np.el.style.transform = 'translate(' + Math.round(sx) + 'px,' + Math.round(sy) + 'px) translate(-50%,-100%)';
    var html = nameplateInfoHtml(m);
    if (html !== np.last) { np.infoEl.innerHTML = html; np.last = html; }
  }
}

function updateHUD() {
  var countEl = document.getElementById('checkpoint-count');
  var totalEl = document.getElementById('checkpoint-total');
  if (countEl) { countEl.textContent = G.totalCheckpoints; }
  if (totalEl) { totalEl.textContent = G.checkpoints.length; }

  updateAbilityUI('q');
  updateAbilityUI('e');
  updateAbilityUI('f');
  updateAbilityUI('g');
  updateAbilityUI('r');
  updateLifeUI();

  updateTeamHUD();
  updateFrozenBanner();
  layoutMobileR();
}

// Mobile: o botao R (Respawn) fica no canto direito, logo ABAIXO do placar do time -
// a altura do placar varia (linhas quebram), entao a posicao e recalculada a cada ~0.4s.
var mobileRLayoutAt = 0;
function layoutMobileR() {
  var now = performance.now();
  if (now < mobileRLayoutAt) { return; }
  mobileRLayoutAt = now + 400;
  if (!window.matchMedia || !window.matchMedia('(pointer: coarse)').matches) { return; }
  var hud = document.getElementById('team-hud'), r = document.getElementById('mobile-r');
  if (!hud || !r) { return; }
  r.style.top = Math.round(hud.getBoundingClientRect().bottom + 8) + 'px';
}

// Painel de time (base 2x2): time do jogador, quantos estao vivos/
// congelados/chegaram, o objetivo (pedido do usuario: "TODOS do time
// precisam chegar ao final") e um resumo curto do time adversario, ja que
// agora sao 2 times de 2 (ver createTeamBots/G.slots).
function updateTeamHUD() {
  var el = document.getElementById('team-hud');
  if (!el) { return; }
  var myTeam = G.player.team;
  var otherTeam = myTeam === 'teamA' ? 'teamB' : 'teamA';
  var status = countTeamStatus(myTeam);
  var otherStatus = countTeamStatus(otherTeam);
  var teamLabel = TXT(myTeam === 'teamA' ? 'hud.teamA' : 'hud.teamB');
  // Contador de chegada do time no formato pedido ("Chegaram: 1/2", o total
  // vem do tamanho real do time) - so vira vitoria quando chega em N/N.
  el.innerHTML =
    teamLabel + ' - ' + TEAM_SIZE + 'x' + TEAM_SIZE + '<br>' +
    '<b>' + TXT('hud.arrived', status.finished, status.total) + '</b><br>' +
    TXT('hud.alive', status.alive, status.frozen) + '<br>' +
    TXT('hud.enemyArrived', otherStatus.finished, otherStatus.total) + '<br>' +
    TXT('hud.objective');
  if (G.matchWinner) {
    el.innerHTML += '<br><b>' + TXT(G.matchWinner === G.player.team ? 'msg.teamWon' : 'msg.enemyWon') + '</b>';
  }
}

// Banner grande mostrado so enquanto o jogador esta CONGELADO - contagem
// regressiva ate o respawn obrigatorio + lembrete das duas saidas (T pra
// sinalizar, R pra respawn manual).
function updateFrozenBanner() {
  var el = document.getElementById('frozen-banner');
  var mobileHelpBtn = document.getElementById('mobile-t');
  var frozen = G.player.state === 'frozen';
  if (mobileHelpBtn) { mobileHelpBtn.hidden = !frozen; }
  if (!el) { return; }
  if (!frozen) {
    el.hidden = true;
    return;
  }
  el.hidden = false;
  var remaining = Math.max(0, G.player.frozenUntil - G.totalTime);
  var pinging = G.totalTime < G.player.savePingUntil;
  el.innerHTML =
    TXT('frozen.title', remaining.toFixed(1)) + '<br>' +
    '<span class="frozen-hint">' + TXT('frozen.help', keyLabel(KEYBINDS.save)) + (pinging ? TXT('frozen.sent') : '') + ' &nbsp;|&nbsp; ' + TXT('frozen.respawn', keyLabel(KEYBINDS.respawn)) + '</span>';
}

/* ============================= ENTRADA (INPUT) ============================= */

// Projeta a posicao de um evento de mouse no plano do chao e devolve o
// ponto no MUNDO (ou null se o raio nao cruzar o plano) - extraida de
// updateMouseTargetFromEvent pra tambem ser reusada pela mira do Empurrar
// (ver onCanvasMouseDown), que precisa do mesmo raycast mas NAO deve virar
// destino de movimento.
function groundPointFromEvent(e) {
  var rect = G.renderer.domElement.getBoundingClientRect();
  var mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  var my = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  var ndc = new THREE.Vector2(mx, my);
  G.raycaster.setFromCamera(ndc, G.camera);
  var pt = new THREE.Vector3();
  var hit = G.raycaster.ray.intersectPlane(G.groundPlane, pt);
  return hit ? pt : null;
}

// Atualiza o ponto de destino (G.mouse.target*). Chamado no clique (define
// o destino) e, enquanto o botao estiver pressionado, a cada movimento do
// mouse (permite "segurar e arrastar" para guiar o personagem
// continuamente pelo cursor).
function updateMouseTargetFromEvent(e) {
  var pt = groundPointFromEvent(e);
  if (!pt) { return; }
  G.mouse.targetActive = true;
  G.mouse.targetX = pt.x;
  G.mouse.targetZ = pt.z;
}

// Funcoes do mouse SEPARADAS (pedido do usuario):
//   - Clique ESQUERDO (button 0): so skills - confirma a mira armada (ver
//     armAim); nunca move o personagem. Sem mira armada, nao faz nada.
//   - Clique DIREITO (button 2): movimentacao direcional - segurar anda na
//     direcao do cursor (ver G.mouse.down/onCanvasMouseMove). Se houver
//     mira armada, o clique direito tambem CANCELA a mira (funcao anterior
//     do clique direito) e ja comeca a andar.
function onCanvasMouseDown(e) {
  // Contagem 3-2-1: a simulacao esta parada, mas o botao DIREITO ja vale como
  // BUFFER de movimento (igual ao teclado, que ja carrega G.keys) - o Axie
  // sai no frame exato em que a contagem acaba, nunca antes (ver
  // updateCountdown/animate: nada anda com countdownLeft > 0).
  if (G.countdownLeft > 0 && !G.paused) {
    if (e.button === 2) {
      G.mouse.down = true;
      updateMouseTargetFromEvent(e);
    }
    return;
  }
  if (inputLocked()) { return; }
  if (e.button === 0) {
    if (G.aimMode) {
      var pt = groundPointFromEvent(e);
      if (pt) {
        var cdx = pt.x - G.player.position.x, cdz = pt.z - G.player.position.z;
      confirmAimWithDirection(cdx, cdz, Math.sqrt(cdx * cdx + cdz * cdz));
      }
    }
    return;
  }
  if (e.button === 2) {
    if (G.aimMode) { cancelAim(TXT('msg.aimCancelled')); }
    G.mouse.down = true;
    updateMouseTargetFromEvent(e);
  }
}

function onCanvasMouseMove(e) {
  // Enquanto mirando, atualiza a direcao em tempo real (pro jogador ver a
  // HUD vermelha girar seguindo o mouse ANTES de clicar - ver
  // updateAimHud) - nao precisa segurar nenhum botao, so mover o mouse.
  if (G.aimMode) {
    var pt = groundPointFromEvent(e);
    if (pt) {
      var dx = pt.x - G.player.position.x, dz = pt.z - G.player.position.z;
      var len = Math.sqrt(dx * dx + dz * dz);
      if (len > 0.0001) { G.aimDirX = dx / len; G.aimDirZ = dz / len; G.aimDist = len; }
    }
  }
  if (G.mouse.down) { updateMouseTargetFromEvent(e); }
}

function onWindowMouseUp(e) {
  // So soltar o botao DIREITO para de guiar pelo cursor (soltar o esquerdo,
  // que so mira skills, nao pode cortar um movimento em andamento).
  if (e && e.button !== 2) { return; }
  G.mouse.down = false;
  // Soltou o botao ainda na contagem: cancela o buffer (nao sai sozinho).
  if (G.countdownLeft > 0) { G.mouse.targetActive = false; }
  // O destino (G.mouse.target*) permanece ativo: o personagem continua
  // andando ate chegar la (ver computeDesiredInput), so nao e mais
  // atualizado pelo cursor depois que o botao e solto.
}

// Usa a skill do slot. Com ATALHO RAPIDO ligado (QUICK_CAST), a mira e
// confirmada NA HORA no ponto do cursor (mesmo caminho do clique: ver
// confirmAimWithDirection); desligado, so arma a mira (fluxo normal).
function castSlot(useFn) {
  if (!QUICK_CAST) { useFn(); return; }
  if (G.aimMode) { cancelAim(null); }
  var used = useFn();
  if (used && G.aimMode) { quickConfirmAtCursor(); }
}
function quickConfirmAtCursor() {
  var pt = G.mouse.hasPos ? groundPointFromEvent({ clientX: G.mouse.clientX, clientY: G.mouse.clientY }) : null;
  var dx = pt ? pt.x - G.player.position.x : Math.sin(G.player.heading);
  var dz = pt ? pt.z - G.player.position.z : Math.cos(G.player.heading);
  var len = Math.sqrt(dx * dx + dz * dz);
  if (len < 0.5) { dx = Math.sin(G.player.heading); dz = Math.cos(G.player.heading); len = 1; }
  confirmAimWithDirection(dx, dz, len);
}

function setupInput() {
  // Ultima posicao do cursor (pro Atalho rapido, mesmo sem clicar).
  window.addEventListener('mousemove', function (e) { G.mouse.clientX = e.clientX; G.mouse.clientY = e.clientY; G.mouse.hasPos = true; });
  window.addEventListener('keydown', function (e) {
    G.keys[e.code] = true;
    // ESC nao e tratado aqui: cancelar mira / pausar fica em onMenuKeyDown
    // (uma unica decisao por tecla, sem cancelar E pausar no mesmo aperto).
    if (!e.repeat && !inputLocked()) {
      // Teclas trocadas a pedido do usuario: Teleporte agora e G (era Q),
      // Invulneravel agora e H (era G) - useAbilityQ/useAbilityG continuam
      // com os MESMOS nomes internamente (so a tecla fisica que dispara
      // cada uma mudou), pra nao precisar renomear objetos de cooldown/UI
      // (G.abilities.q/g, ids 'cooldown-fill-q'/'-g' etc. continuam iguais).
      // Teclas agora vem de KEYBINDS (editavel em Opcoes, salvo no
      // localStorage - ver secao PREFERENCIAS); os padroes sao os mesmos de
      // sempre (G/E/F/H/R/T).
      if (e.code === KEYBINDS.teleport) { castSlot(useAbilityQ); }
      if (e.code === KEYBINDS.dash) { castSlot(useAbilityE); }
      if (e.code === KEYBINDS.push) { castSlot(useAbilityF); }
      if (e.code === KEYBINDS.invuln) { castSlot(useAbilityG); }
      if (e.code === KEYBINDS.respawn) { useAbilityR(); }
      if (e.code === KEYBINDS.save) { signalSaveMe(); } // sinaliza "quero ser salvo" enquanto congelado
    }
  });
  window.addEventListener('keyup', function (e) {
    G.keys[e.code] = false;
  });
  G.renderer.domElement.addEventListener('mousedown', onCanvasMouseDown);
  G.renderer.domElement.addEventListener('mousemove', onCanvasMouseMove);
  window.addEventListener('mouseup', onWindowMouseUp);
  // Pedido do usuario: o menu de contexto do navegador fica BLOQUEADO em
  // todo o jogo (o clique direito e movimento, nao pode abrir opcoes do
  // browser). Listener no document (nao so no canvas) pra cobrir tambem a
  // HUD/botoes por cima do canvas. A tela de senha ja foi escondida quando
  // isso roda (setupInput so e chamada depois da senha certa), entao o
  // campo de senha nao e afetado.
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
}

function setupJoystick() {
  var base = document.getElementById('joystick-base');
  var knob = document.getElementById('joystick-knob');
  var baseRect = null;
  var maxDist = 40;

  // targetTouches (so os dedos que comecaram NESTE elemento), nao touches
  // (TODOS os dedos na tela) - pedido do usuario: "multi-touch deve
  // continuar permitindo andar e usar skills" ao mesmo tempo (ex.: um dedo
  // no joystick e outro mirando uma skill, ver setupAimMobileButton) -
  // com "touches" cru, o segundo dedo em outro botao podia fazer o
  // joystick pular pra posicao errada.
  function getPointer(e) {
    if (e.targetTouches && e.targetTouches.length > 0) { return e.targetTouches[0]; }
    return e;
  }

  function start(e) {
    baseRect = base.getBoundingClientRect();
    G.joystick.active = true;
    move(e);
  }

  function move(e) {
    if (!G.joystick.active || !baseRect) { return; }
    var pointer = getPointer(e);
    var cx = baseRect.left + baseRect.width / 2;
    var cy = baseRect.top + baseRect.height / 2;
    var dx = pointer.clientX - cx;
    var dy = pointer.clientY - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxDist) {
      dx = (dx / dist) * maxDist;
      dy = (dy / dist) * maxDist;
      dist = maxDist;
    }
    knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    var norm = dist / maxDist;
    var ang = Math.atan2(dy, dx);
    G.joystick.dx = Math.cos(ang) * norm;
    G.joystick.dy = Math.sin(ang) * norm;
    if (e.preventDefault) { e.preventDefault(); }
  }

  function end() {
    G.joystick.active = false;
    G.joystick.dx = 0;
    G.joystick.dy = 0;
    knob.style.transform = 'translate(0px,0px)';
  }

  base.addEventListener('touchstart', start, { passive: false });
  base.addEventListener('touchmove', move, { passive: false });
  base.addEventListener('touchend', end);
  base.addEventListener('touchcancel', end);

  base.addEventListener('mousedown', function (e) {
    baseRect = base.getBoundingClientRect();
    G.joystick.active = true;
    move(e);
  });
  window.addEventListener('mousemove', function (e) {
    if (G.joystick.active) { move(e); }
  });
  window.addEventListener('mouseup', function () {
    if (G.joystick.active) { end(); }
  });
}

// Botao de disparo INSTANTANEO no mobile (Invulneravel/Respawn/Socorro -
// nao sao skills de mira, disparam na hora). BUG REAL corrigido aqui
// (pedido do usuario: "ainda nao consigo usar algumas skills enquanto
// ando... principalmente Invulnerabilidade"): esses 3 botoes usavam o
// evento 'click', que no mobile e SINTETIZADO pelo navegador depois do
// touchend (nao e um evento de toque de verdade) - com o joystick JA
// segurado por outro dedo (um gesto multi-touch em andamento), varios
// navegadores atrasam ou simplesmente NAO disparam esse clique sintetico
// pro segundo dedo, enquanto ainda estao decidindo se e um gesto de
// pinca/zoom. Trocado pro mesmo padrao ja usado (e ja funcionando) pelos
// botoes de mira: 'touchstart' direto (toque de
// verdade, dispara na hora, nao depende de sintese nenhuma) + preventDefault
// (evita o clique fantasma duplicado que o navegador ainda tenta gerar
// depois). Ver tambem touch-action:none em html,body/.mobile-ability-btn/
// #mobile-t no CSS - tira o navegador de tentar reconhecer um gesto padrao
// (pan/zoom) quando esse segundo dedo toca a tela, que e a outra metade do
// mesmo bug.
function setupInstantMobileButton(buttonId, fn) {
  var btn = document.getElementById(buttonId);
  function trigger(e) {
    if (inputLocked()) { return; }
    fn();
    if (e.preventDefault) { e.preventDefault(); }
  }
  btn.addEventListener('touchstart', trigger, { passive: false });
  btn.addEventListener('mousedown', function (e) { if (e.button === 0) { trigger(e); } }); // so clique esquerdo (o direito e movimento)
}

function setupMobileAbilityButtons() {
  // As 3 skills de mira (Teleporte/mobile-q, Dash/mobile-e, Empurrar/
  // mobile-f) usam o padrao de toque: tocar e segurar arma a mira,
  // arrastar escolhe a direcao, soltar confirma (ver setupAimMobileButton).
  // Invulneravel/Respawn/Socorro sao instantaneos (ver setupInstantMobileButton).
  setupAimMobileButton('mobile-q', useAbilityQ);
  setupAimMobileButton('mobile-e', useAbilityE);
  // AIM ASSIST (so mobile, so Skill 1 e Skill 2 - NAO Teleporte/Dash): toque rapido
  // (sem arrastar) mira no adversario mais proximo; arrastar continua mira manual.
  setupAimMobileButton('mobile-f', useAbilityF, true);
  // Slot H: Cuspe de agua (Aquatica) e skill de MIRA; Invulneravel (Planta) e
  // Pisao (Besta) sao instantaneas.
  if (G.player.cls === 'aqua') { setupAimMobileButton('mobile-g', useAbilityG, true); }
  else { setupInstantMobileButton('mobile-g', useAbilityG); }
  setupInstantMobileButton('mobile-r', useAbilityR);
  setupInstantMobileButton('mobile-t', signalSaveMe);

  // PC: os icones da barra de habilidades tambem sao clicaveis (pedido do
  // usuario: "clicar sem arrastar = pra frente" tambem no PC). Mesmo
  // handler do mobile: clicar e soltar no icone usa a skill pra FRENTE,
  // clicar e arrastar mira na direcao. A tecla continua armando a mira
  // (clique no chao confirma), sem mudanca.
  setupAimMobileButton('ability-q', useAbilityQ);
  setupAimMobileButton('ability-e', useAbilityE);
  setupAimMobileButton('ability-f', useAbilityF);
  if (G.player.cls === 'aqua') { setupAimMobileButton('ability-g', useAbilityG); }
  else { setupInstantMobileButton('ability-g', useAbilityG); }
  setupInstantMobileButton('ability-r', useAbilityR);
  setupInstantMobileButton('ability-t', signalSaveMe);

}

// Botao de mira no mobile, generico pras 3 skills direcionais (pedido do
// usuario: "tocar e arrastar, soltar confirma", igual pra Empurrar/Dash/
// Teleporte) - toca+segura pra ARMAR a mira (armFn e a useAbilityQ/E/F
// correspondente, que ja checa cooldown/estado e devolve true/false -
// unica fonte de verdade, sem duplicar a checagem aqui), arrasta o dedo
// pra escolher a direcao (atualiza G.aimDirX/Z em tempo real, pra HUD
// acompanhar - ver updateAimHud), solta pra confirmar (ver
// confirmAimWithDirection). O arrasto usa a MESMA convencao tela->mundo do
// joystick (ver setupJoystick/computeDesiredInput: dx da tela vira dirX do
// mundo, dy da tela vira dirZ do mundo, sem inverter) - consistente com o
// resto do jogo. Um arrasto curto demais (toque sem direcao de verdade)
// cancela em vez de confirmar num sentido aleatorio.
// Adversario (rival em corrida) mais proximo do jogador, dentro de 1.5x o
// alcance da skill armada; null se nao houver (ai cai no "pra frente").
function nearestEnemyForAssist() {
  var range = 60;
  if (G.aimMode === 'leaf') { range = LEAF_RANGE; }
  else if (G.aimMode === 'push') { range = pushProfile().range; }
  else if (G.aimMode === 'spit') { range = SPIT_RANGE; }
  var best = null, bestD = range * 1.5, i;
  for (i = 0; i < G.enemies.length; i++) {
    var e = G.enemies[i];
    if (e.state !== 'racing') { continue; }
    var dx = e.position.x - G.player.position.x, dz = e.position.z - G.player.position.z;
    var d = Math.sqrt(dx * dx + dz * dz);
    if (d < bestD && d > 0.5) { bestD = d; best = { dx: dx, dz: dz, dist: d }; }
  }
  return best;
}

function setupAimMobileButton(buttonId, armFn, assist) {
  var btn = document.getElementById(buttonId);
  var startX = 0, startY = 0, active = false;
  var MIN_DRAG = 12; // pixels minimos de arrasto pra contar como direcao valida

  // targetTouches (nao touches) pro toque em andamento - touches lista
  // TODOS os dedos na tela (inclusive o do joystick, se estiver sendo
  // usado ao mesmo tempo - pedido do usuario: "multi-touch deve continuar
  // permitindo andar e usar skills"), enquanto targetTouches so os que
  // comecaram NESTE elemento especifico.
  function getPoint(e, ended) {
    if (ended && e.changedTouches && e.changedTouches.length > 0) { return e.changedTouches[0]; }
    if (e.targetTouches && e.targetTouches.length > 0) { return e.targetTouches[0]; }
    return e;
  }

  function start(e) {
    if (active) { return; } // ja em andamento (ex.: segundo dedo no mesmo botao) - ignora
    if (inputLocked()) { return; }
    if (!armFn()) { return; }
    var p = getPoint(e, false);
    startX = p.clientX;
    startY = p.clientY;
    active = true;
    if (e.preventDefault) { e.preventDefault(); }
  }

  function move(e) {
    if (!active) { return; }
    var p = getPoint(e, false);
    var dx = p.clientX - startX, dy = p.clientY - startY;
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len > 0.0001) { G.aimDirX = dx / len; G.aimDirZ = dy / len; G.aimDist = null; }
    if (e.preventDefault) { e.preventDefault(); }
  }

  function end(e) {
    if (!active) { return; }
    active = false;
    var p = getPoint(e, true);
    var dx = p.clientX - startX, dy = p.clientY - startY;
    if (Math.sqrt(dx * dx + dy * dy) < MIN_DRAG) {
      // Toque/clique SEM arrastar (pedido do usuario): usa a skill
      // AUTOMATICAMENTE PARA FRENTE, na direcao em que o Axie esta olhando
      // (heading) - antes isso cancelava. Arrastar continua sendo a mira
      // direcional normal (ramo abaixo).
      if (assist) {
        var tgt = nearestEnemyForAssist();
        if (tgt) { confirmAimWithDirection(tgt.dx, tgt.dz, tgt.dist); return; }
      }
      confirmAimWithDirection(Math.sin(G.player.heading), Math.cos(G.player.heading));
      return;
    }
    confirmAimWithDirection(dx, dy);
  }

  btn.addEventListener('touchstart', start, { passive: false });
  btn.addEventListener('touchmove', move, { passive: false });
  btn.addEventListener('touchend', end);
  btn.addEventListener('touchcancel', function () { active = false; cancelAim(TXT('msg.cancelled')); });
  // Tambem funciona com mouse (desktop testando o layout mobile).
  btn.addEventListener('mousedown', function (e) { if (e.button === 0) { start(e); } }); // so clique esquerdo
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', function (e) { if (active) { end(e); } });
}

/* ================================ MINIMAPA =================================== */
// Estrutura de cor ja preparada por time, mesmo so existindo o jogador
// local por enquanto (pedido do usuario, pensando em times futuros) - cada
// Axie no minimapa usa a cor do seu time; sem time definido cai em 'local'.
// teamA e o time do jogador local - mesmo laranja do proprio modelo do
// Axie (0xFF8C42 em createPlayer), pra ficar obvio no minimapa qual ponto e
// "voce". teamB e o time adversario. teamC/teamD ficam prontos pra quando
// houver mais de 2 times.
var TEAM_COLORS = {
  teamA: '#1f5fff', // AZUL forte (time do jogador)
  teamB: '#f0202e', // VERMELHO forte (time rival)
  teamC: '#8dffb0',
  teamD: '#c98dff'
};
var MINIMAP_SIZE = 160;
var MINIMAP_PADDING = 12;

function setupMinimap() {
  var canvas = document.getElementById('minimap-canvas');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = MINIMAP_SIZE * dpr;
  canvas.height = MINIMAP_SIZE * dpr;
  G.minimapCtx = canvas.getContext('2d');
  G.minimapCtx.scale(dpr, dpr);
}

function worldToMinimap(x, z, bounds) {
  var scale = (MINIMAP_SIZE - MINIMAP_PADDING * 2) / (bounds.half * 2);
  var mx = MINIMAP_PADDING + (x - (bounds.centerX - bounds.half)) * scale;
  var mz = MINIMAP_PADDING + (z - (bounds.centerZ - bounds.half)) * scale;
  return { x: mx, y: mz };
}

function updateMinimap() {
  var ctx = G.minimapCtx;
  if (!ctx || !G.mapBounds) { return; }
  var size = MINIMAP_SIZE;
  ctx.clearRect(0, 0, size, size);

  // Percurso/trilhas da espiral - a mesma sequencia de quinas usada pra
  // construir as paredes de verdade (G.corners), so ligada em linha fina.
  // Branco bem transparente (pedido do usuario) pra ainda dar pra ver o
  // jogo ao redor por baixo do minimapa.
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  var i;
  for (i = 0; i < G.corners.length; i++) {
    var p = worldToMinimap(G.corners[i].x, G.corners[i].z, G.mapBounds);
    if (i === 0) { ctx.moveTo(p.x, p.y); } else { ctx.lineTo(p.x, p.y); }
  }
  ctx.stroke();

  // Marcacoes de rota (as mesmas da gameplay): CHECKPOINTS (alcancados em
  // verde, o PROXIMO em amarelo pulsante, o final como bandeira/quadrado) e a
  // SETA do inicio apontando a saida (some junto com as setas do chao).
  var pulse = 0.5; // fixo (sem piscar)
  var ci, nextIdx = G.lastCheckpointIndex + 1;
  for (ci = 0; ci < G.checkpoints.length; ci++) {
    var cpp = G.checkpoints[ci];
    var cmp = worldToMinimap((cpp.xMin + cpp.xMax) / 2, (cpp.zMin + cpp.zMax) / 2, G.mapBounds);
    var isFinal = ci === G.checkpoints.length - 1;
    if (ci === nextIdx) {
      ctx.beginPath();
      ctx.arc(cmp.x, cmp.y, 4.2 + 2.2 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 224, 80, ' + (0.9 - 0.5 * pulse).toFixed(2) + ')';
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.fillStyle = '#ffd23a';
    } else if (ci <= G.lastCheckpointIndex) {
      ctx.fillStyle = '#5be08c';
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    }
    ctx.strokeStyle = '#0a1c2d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (isFinal) { ctx.rect(cmp.x - 3.4, cmp.y - 3.4, 6.8, 6.8); } else { ctx.arc(cmp.x, cmp.y, 2.7, 0, Math.PI * 2); }
    ctx.fill();
    ctx.stroke();
  }
  if (G.guide && G.guide.chevronsOn && G.startPosition) {
    var sc = G.corners[G.corners.length - 1], nc = G.corners[G.corners.length - 2];
    var sdx = nc.x - sc.x, sdz = nc.z - sc.z, sl = Math.sqrt(sdx * sdx + sdz * sdz) || 1;
    sdx /= sl; sdz /= sl;
    var sp0 = worldToMinimap(G.startPosition.x, G.startPosition.z, G.mapBounds);
    ctx.beginPath();
    ctx.arc(sp0.x, sp0.y, 6.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 210, 58, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // seta (triangulo) saindo do ponto inicial na direcao da rota
    var tipx = sp0.x + sdx * 17, tipy = sp0.y + sdz * 17, bx0 = sp0.x + sdx * 8, by0 = sp0.y + sdz * 8;
    ctx.beginPath();
    ctx.moveTo(tipx, tipy);
    ctx.lineTo(bx0 - sdz * 4.5, by0 + sdx * 4.5);
    ctx.lineTo(bx0 + sdz * 4.5, by0 - sdx * 4.5);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 210, 58, ' + (0.55 + 0.45 * pulse).toFixed(2) + ')';
    ctx.fill();
    ctx.strokeStyle = '#0a1c2d';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Todos os Axies no mapa - jogador local + aliados/inimigos (ver
  // G.allies/G.enemies, base do sistema de times), cada um na cor do
  // proprio time (TEAM_COLORS). O jogador CONGELADO pisca (fica
  // intermitente) pra ficar obvio no minimapa quem precisa de socorro.
  var axies = [{ x: G.player.position.x, z: G.player.position.z, color: TEAM_COLORS[G.player.team], frozen: G.player.state === 'frozen' }];
  var bi;
  for (bi = 0; bi < G.allies.length; bi++) {
    var ally = G.allies[bi];
    axies.push({ x: ally.position.x, z: ally.position.z, color: TEAM_COLORS[ally.team], frozen: ally.state === 'frozen' });
  }
  for (bi = 0; bi < G.enemies.length; bi++) {
    var enemy = G.enemies[bi];
    axies.push({ x: enemy.position.x, z: enemy.position.z, color: TEAM_COLORS[enemy.team], frozen: enemy.state === 'frozen' });
  }
  var a;
  for (a = 0; a < axies.length; a++) {
    if (axies[a].frozen && Math.floor(G.totalTime * 3) % 2 === 0) { continue; } // pisca enquanto congelado
    var ap = worldToMinimap(axies[a].x, axies[a].z, G.mapBounds);
    ctx.beginPath();
    ctx.fillStyle = axies[a].color;
    ctx.arc(ap.x, ap.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0a1c2d';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  // Alertas de socorro (ver triggerHelpAlert): anel + "!" na cor do time, piscando 3x.
  var hai;
  for (hai = 0; hai < G.helpAlerts.length; hai++) {
    var ha = G.helpAlerts[hai], hk = (G.totalTime - ha.start) / HELP_BLINK_PERIOD, hph = hk - Math.floor(hk);
    if (hph > HELP_BLINK_ON) { continue; } // fase apagada da piscada
    var hp = worldToMinimap(ha.m.position.x, ha.m.position.z, G.mapBounds), hcol = TEAM_COLORS[ha.m.team], hg = hph / HELP_BLINK_ON;
    ctx.globalAlpha = 1 - 0.45 * hg;
    ctx.beginPath();
    ctx.arc(hp.x, hp.y, 7.5 + 5 * hg, 0, Math.PI * 2);
    ctx.strokeStyle = hcol;
    ctx.lineWidth = 2.6;
    ctx.stroke();
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(hp.x, hp.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = hcol;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0a1c2d';
    ctx.strokeText('!', hp.x, hp.y - 12);
    ctx.fillStyle = hcol;
    ctx.fillText('!', hp.x, hp.y - 12);
  }
}

function onWindowResize() {
  G.camera.aspect = window.innerWidth / window.innerHeight;
  G.camera.updateProjectionMatrix();
  G.renderer.setSize(window.innerWidth, window.innerHeight);
}

/* ================================ LOOP PRINCIPAL ============================ */

// Contador 3-2-1 no inicio da partida e PAUSA (ESC): nos dois casos a
// simulacao INTEIRA fica congelada (jogador, bots, lobos, cooldowns, tempo do
// jogo) - so a camera/HUD/render continuam. G.clock.getDelta() e chamado
// todo frame mesmo assim (nao acumula salto quando volta).
var COUNTDOWN_SECONDS = 3;

function inputLocked() {
  return G.paused || G.countdownLeft > 0;
}

function startCountdown() {
  G.countdownLeft = COUNTDOWN_SECONDS;
  var el = document.getElementById('countdown');
  if (el) { el.textContent = String(COUNTDOWN_SECONDS); el.hidden = false; }
  var hint = document.getElementById('countdown-hint');
  if (hint) { hint.hidden = false; }
}

/* ---- Clareza de direcao na largada: setas no chao + checkpoint destacado ---- */
// Setas (chevrons) amarelas ao longo do PRIMEIRO trecho da rota (o mesmo
// caminho que os bots seguem, ver legPathForKey) apontando a saida correta do
// ponto inicial, e um farol/zona pulsante no PROXIMO checkpoint (fica ate ele
// ser alcancado, depois passa para o seguinte). As setas somem quando o
// jogador sai da zona inicial (ou 8s depois da largada).
function pathPointAt(path, s) {
  var i, n = path.pts.length;
  if (s <= 0) { return { x: path.pts[0].x, z: path.pts[0].z, dx: 0, dz: 1 }; }
  for (i = 0; i < n - 1; i++) {
    if (s <= path.cum[i + 1] || i === n - 2) {
      var l = path.cum[i + 1] - path.cum[i] || 1;
      var u = clampNum((s - path.cum[i]) / l, 0, 1);
      var ax = path.pts[i].x, az = path.pts[i].z, bx = path.pts[i + 1].x, bz = path.pts[i + 1].z;
      var dl = Math.sqrt((bx - ax) * (bx - ax) + (bz - az) * (bz - az)) || 1;
      return { x: ax + (bx - ax) * u, z: az + (bz - az) * u, dx: (bx - ax) / dl, dz: (bz - az) / dl };
    }
  }
  return { x: path.pts[n - 1].x, z: path.pts[n - 1].z, dx: 0, dz: 1 };
}

function createStartGuide() {
  var L = G.corners.length, i;
  var path = legPathForKey(L - 1);
  var group = new THREE.Group();
  G.scene.add(group);
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 4.5, -4.5, 0, -2.5, 0, 0, -0.4, 0, 0, 4.5, 0, 0, -0.4, 4.5, 0, -2.5], 3));
  var chevrons = [];
  for (i = 0; i < 7; i++) {
    var pt = pathPointAt(path, 16 + i * 13);
    var mat = new THREE.MeshBasicMaterial({ color: 0xffd23a, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false });
    var m = new THREE.Mesh(geo, mat);
    m.position.set(pt.x, 0.3, pt.z);
    m.rotation.y = Math.atan2(pt.dx, pt.dz);
    m.scale.set(1.5, 1, 1.5);
    group.add(m);
    chevrons.push(m);
  }
  // Farol do proximo checkpoint: zona retangular pulsante + coluna de luz.
  var beacon = new THREE.Group();
  var zoneMat = new THREE.MeshBasicMaterial({ color: 0xffd23a, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false });
  var zone = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), zoneMat);
  zone.rotation.x = -Math.PI / 2;
  zone.position.y = 0.25;
  beacon.add(zone);
  var beamMat = new THREE.MeshBasicMaterial({ color: 0xfff08a, transparent: true, opacity: 0.35, depthWrite: false });
  var beam = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 70, 12, 1, true), beamMat);
  beam.position.y = 35;
  beacon.add(beam);
  beacon.visible = false;
  group.add(beacon);
  G.guide = { group: group, chevrons: chevrons, chevronsOn: true, beacon: beacon, zone: zone, zoneMat: zoneMat, beamMat: beamMat, cpIdx: -99 };
}

function updateStartGuide() {
  var g = G.guide;
  if (!g) { return; }
  var t = performance.now() / 1000, i;
  if (g.chevronsOn) {
    if (G.countdownLeft <= 0 && (G.totalTime > 8 || !isInsideCheckpointZone(G.startZone, G.player.position.x, G.player.position.z))) {
      g.chevronsOn = false;
      for (i = 0; i < g.chevrons.length; i++) { g.chevrons[i].visible = false; }
    } else {
      for (i = 0; i < g.chevrons.length; i++) {
        g.chevrons[i].material.opacity = 0.25 + 0.75 * Math.max(0, Math.sin(t * 5 - i * 0.9));
      }
    }
  }
  var cp = G.checkpoints[G.lastCheckpointIndex + 1];
  if (!cp || G.matchWinner) { g.beacon.visible = false; return; }
  if (g.cpIdx !== G.lastCheckpointIndex + 1) {
    g.cpIdx = G.lastCheckpointIndex + 1;
    var w = Math.min(60, cp.xMax - cp.xMin), h = Math.min(60, cp.zMax - cp.zMin);
    g.zone.scale.set(w, h, 1);
    g.beacon.position.set((cp.xMin + cp.xMax) / 2, 0, (cp.zMin + cp.zMax) / 2);
    g.beacon.visible = true;
  }
  // ESTAVEL (sem pulsar): antes a zona/coluna do proximo checkpoint pulsava e parecia
  // 'piscar' o checkpoint. Agora e uma marca fixa e discreta.
  g.zoneMat.opacity = 0.2;
  g.beamMat.opacity = 0.22;
}

/* ---- CELAS DO INICIO: uma por time, abrem (com som) quando o countdown acaba ---- */
// Grupo de referencia na posicao inicial: +Z local = direcao da rota (saida),
// +X local = lado contrario ao das vagas do time A (ver createTeamBot: o
// jogador e os aliados ficam em +n, os rivais em -n, e local X = -n).
// Time A (azul): X de -30 a 8. Time B (vermelho): X de 20 a 56 (12 de vao entre as celas). A frente de
// cada cela e um portao de grades que sobe quando as celas abrem.
var CELL_FRONT = 11, CELL_BACK = -10, CELL_WALL_H = 8;
function createStartCells() {
  var L = G.corners.length;
  var sc = G.corners[L - 1], nc = G.corners[L - 2];
  var ux = nc.x - sc.x, uz = nc.z - sc.z, ul = Math.sqrt(ux * ux + uz * uz) || 1;
  var root = new THREE.Group();
  root.position.set(sc.x, 0, sc.z);
  root.rotation.y = Math.atan2(ux / ul, uz / ul);
  G.scene.add(root);
  var cells = { root: root, gates: [], locks: [], openStart: null, done: false, geos: [], mats: [] };
  function box(w, h, d, color, x, y, z, opacity) {
    var geo = new THREE.BoxGeometry(w, h, d);
    var mat = new THREE.MeshLambertMaterial({ color: color, transparent: opacity < 1, opacity: opacity });
    var m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    cells.geos.push(geo); cells.mats.push(mat);
    return m;
  }
  function team(x0, x1, colorHex, wallHex) {
    var w = x1 - x0, cx = (x0 + x1) / 2, depth = CELL_FRONT - CELL_BACK, cz = (CELL_FRONT + CELL_BACK) / 2;
    root.add(box(w, 0.3, depth, colorHex, cx, 0.2, cz, 0.45));                       // piso colorido
    root.add(box(w, CELL_WALL_H, 1, wallHex, cx, CELL_WALL_H / 2, CELL_BACK, 1));      // fundo
    root.add(box(1, CELL_WALL_H, depth, wallHex, x0, CELL_WALL_H / 2, cz, 1));         // lateral
    root.add(box(1, CELL_WALL_H, depth, wallHex, x1, CELL_WALL_H / 2, cz, 1));         // lateral
    // portao: grades verticais + trilho + cadeado
    var gate = new THREE.Group();
    gate.position.set(0, 0, CELL_FRONT);
    var n = Math.max(2, Math.round(w / 3.4)), i;
    for (i = 0; i <= n; i++) {
      var gx = x0 + (w * i) / n;
      var bar = new THREE.CylinderGeometry(0.45, 0.45, CELL_WALL_H, 8);
      var barMat = new THREE.MeshLambertMaterial({ color: 0x7a8794 });
      var bm = new THREE.Mesh(bar, barMat);
      bm.position.set(gx, CELL_WALL_H / 2, 0);
      gate.add(bm);
      cells.geos.push(bar); cells.mats.push(barMat);
    }
    gate.add(box(w, 0.8, 0.8, 0x59636e, cx, CELL_WALL_H - 0.6, 0, 1));
    gate.add(box(w, 0.8, 0.8, 0x59636e, cx, 1.2, 0, 1));
    var lock = box(2.2, 2.6, 1.4, 0xffc23a, cx, CELL_WALL_H / 2, 0.9, 1);
    gate.add(lock);
    root.add(gate);
    cells.gates.push(gate);
    cells.locks.push(lock);
  }
  team(-30, 8, 0x2a6bff, 0x1a3f99);
  team(20, 56, 0xff3a48, 0x99202b);
  G.cells = cells;
}

// Portoes sobem e os cadeados caem (tempo REAL - roda ate com a simulacao parada).
function updateStartCells() {
  var c = G.cells;
  if (!c || !c.openStart || c.done) { return; }
  var t = (performance.now() - c.openStart) / 1000, i;
  var rise = clampNum((t - 0.35) / 0.9, 0, 1);
  for (i = 0; i < c.gates.length; i++) {
    c.gates[i].position.y = rise * rise * (CELL_WALL_H + 3);
    c.locks[i].position.y = CELL_WALL_H / 2 - clampNum(t / 0.5, 0, 1) * clampNum(t / 0.5, 0, 1) * 6; // o cadeado cai
    c.locks[i].rotation.z = clampNum(t / 0.5, 0, 1) * 1.4;
  }
  if (t > 1.6) {
    for (i = 0; i < c.gates.length; i++) { c.gates[i].visible = false; }
    c.done = true;
  }
}

function openStartCells() {
  if (!G.cells || G.cells.openStart) { return; }
  G.cells.openStart = performance.now();
  playCellOpenSound();
}

// Som sintetizado (WebAudio, passa pelo volume master): chaves tilintando,
// cadeado destrancando ("clac") e o portao de grades subindo/rangendo.
function playCellOpenSound() {
  if (!audioEnsure()) { return; }
  try {
    var ctx = GAME_AUDIO.ctx;
    if (ctx.resume) { ctx.resume(); }
    var t0 = ctx.currentTime + 0.02;
    function tone(type, freq, start, dur, vol, freqEnd) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t0 + start);
      if (freqEnd) { o.frequency.exponentialRampToValueAtTime(freqEnd, t0 + start + dur); }
      g.gain.setValueAtTime(0.0001, t0 + start);
      g.gain.exponentialRampToValueAtTime(vol, t0 + start + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + start + dur);
      o.connect(g); g.connect(GAME_AUDIO.sfxGain);
      o.start(t0 + start); o.stop(t0 + start + dur + 0.05);
    }
    function noise(start, dur, vol, freq, q) {
      var len = Math.floor(ctx.sampleRate * dur), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0), i;
      for (i = 0; i < len; i++) { d[i] = (Math.random() * 2 - 1) * (1 - i / len); }
      var src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = buf; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
      g.gain.value = vol;
      src.connect(f); f.connect(g); g.connect(GAME_AUDIO.sfxGain);
      src.start(t0 + start);
    }
    // chaves: tres "tings" metalicos
    var kf = [2300, 3100, 2700], k;
    for (k = 0; k < kf.length; k++) {
      tone('triangle', kf[k], k * 0.08, 0.28, 0.22);
      tone('sine', kf[k] * 2.76, k * 0.08, 0.16, 0.08);
    }
    // cadeado destrancando: clique seco + baque
    noise(0.36, 0.06, 0.9, 2200, 1.2);
    tone('square', 160, 0.37, 0.09, 0.22, 90);
    // portao subindo: rangido grave + chocalho de grades
    tone('sawtooth', 75, 0.5, 0.95, 0.16, 48);
    noise(0.5, 0.9, 0.5, 700, 0.8);
    // batida final das grades
    tone('triangle', 330, 1.3, 0.35, 0.2, 200);
    noise(1.3, 0.12, 0.7, 1400, 1.0);
  } catch (e) { /* sem audio: ignora */ }
}

function updateCountdown(delta) {
  if (!(G.countdownLeft > 0) || G.paused) { return; }
  G.countdownLeft -= delta;
  var el = document.getElementById('countdown');
  if (G.countdownLeft <= 0) {
    G.countdownLeft = 0;
    if (el) { el.hidden = true; }
    var hintEl = document.getElementById('countdown-hint');
    if (hintEl) { hintEl.hidden = true; }
    showMessage(TXT('msg.go'), 1);
    openStartCells(); // som de chave destrancando + celas abrindo
    return;
  }
  var n = String(Math.ceil(G.countdownLeft));
  if (el && el.textContent !== n) { el.textContent = n; }
}

function animate() {
  requestAnimationFrame(animate);
  var rawDelta = G.clock.getDelta();
  var delta = Math.min(rawDelta, 0.1);
  // O 3-2-1 usa tempo REAL (nao o delta limitado a 0.1 do jogo): 3 segundos
  // de verdade mesmo se o navegador estiver renderizando devagar.
  updateCountdown(Math.min(rawDelta, 0.5));

  if (!G.paused && !(G.countdownLeft > 0)) {
    G.totalTime += delta;

    updateCooldowns(delta);
    updateAimTimeout();
    updateFreezeState();
    updatePlayerMovement(delta);
    updateAimHud();
    updateCentipedes(delta);
    updateTeamBots(delta);
    updateProjectiles(delta);
    updateLives(delta);
    updateRescues();
    checkCollisions();
    checkTeamWipe();
    checkMatchWinner();
    updateEffectBursts();
    updateSpitZones();
    updateFx();
    updateInvulnAuras();
    updateSavePingMarker();
    updateHelpAlerts();
    updateSnowfall(delta);
  }
  updateStartGuide();
  updateStartCells();
  updateCameraFollow();
  updateHUD();
  updateNameplates();
  updateMinimap();

  G.renderer.render(G.scene, G.camera);
}

/* ================================= INICIALIZACAO ============================= */

function init() {
  applyKeybindLabels(); // rotulos da barra de habilidades seguem as teclas salvas
  G.scene = new THREE.Scene();
  G.scene.background = new THREE.Color(0xD8EEF8);
  G.scene.fog = new THREE.Fog(0xD8EEF8, 260, 620);

  // near 20 (era 0.1): a camera fica a ~150 unidades do chao; com near 0.1 o buffer de
  // profundidade nao separava os planos do chao (0.04-0.07 de altura) e os
  // checkpoints PISCAVAM (z-fighting). Com near 20 a precisao sobe ~200x.
  G.camera = new THREE.PerspectiveCamera(CAMERA_FOV, window.innerWidth / window.innerHeight, 20, 3000);

  G.renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('game-canvas'),
    antialias: true
  });
  G.renderer.setSize(window.innerWidth, window.innerHeight);
  // Trava em no maximo 2x (varios celulares reportam devicePixelRatio 3),
  // que ja e nitido o bastante - sem isso o celular teria que desenhar mais
  // que o dobro de pixels por frame sem ganho visual perceptivel.
  G.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  G.clock = new THREE.Clock();
  G.raycaster = new THREE.Raycaster();
  G.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  var ambient = new THREE.AmbientLight(0xE8F4FF, 0.75);
  G.scene.add(ambient);

  var sun = new THREE.DirectionalLight(0xF5FBFF, 0.85);
  sun.position.set(150, 220, 100);
  G.scene.add(sun);

  G.corners = buildSpiralCorners();
  var bounds = computeMapBounds(G.corners);
  G.mapBounds = bounds; // guardado pro minimapa (ver updateMinimap)

  createGround(bounds);
  createDuneWalls(G.corners);
  createInnerCap(G.corners);
  createCornerCollars(G.corners);
  createMapBorder(bounds);
  // createTrackVisuals precisa rodar DEPOIS das paredes (usa
  // computeCheckpointZone, que agora encolhe a zona para ficar livre das
  // paredes de verdade em G.wallSegments - ver shrinkZoneClearOfWalls) -
  // senao o remendo visual e a zona jogavel do checkpoint ficariam com
  // tamanhos diferentes.
  createTrackVisuals(G.corners);
  createCheckpoints(G.corners);
  // Inversao pedida pelo usuario: o ponto de partida passa a ser onde
  // estava o ULTIMO checkpoint (perto do CENTRO do mapa, a quina mais
  // interna da espiral), e vice-versa (o INICIO original, perto da BORDA,
  // vira o novo checkpoint final). A dificuldade (contagem/velocidade dos
  // perigos, ver "diffIndex" em createHazards, e o multiplicador dinamico
  // logo abaixo de onde um checkpoint e alcancado) precisa CRESCER conforme
  // o jogador se AFASTA do centro - ou seja, crescer ao longo da jornada,
  // do novo inicio (centro, facil) ate o novo checkpoint final (borda,
  // dificil). Nao mexe na geometria da espiral (paredes/corredores
  // continuam exatamente como sempre foram, ja testados) - so em QUAL
  // numero alimenta as formulas de dificuldade e em qual ponta e o inicio.
  // O checkpoint que createCheckpoints criou na ultima quina
  // (corners[length-1]) e removido daqui (essa quina virou o INICIO, nao um
  // checkpoint pra alcancar) e um novo checkpoint e criado na quina 0 (o
  // INICIO original, que agora e o novo checkpoint final) - depois disso,
  // a ordem do array e invertida para que "indice mais alto = mais perto do
  // fim da nova jornada" continue valendo (usado pelo alvo do Teleporte/
  // Respawn, ver G.lastCheckpointIndex).
  G.checkpoints.pop();
  G.checkpoints.reverse();
  createInvertedFinalCheckpoint(G.corners);
  createCheckpointSnow(); // montinhos de neve nas bordas de cada checkpoint
  preventCheckpointOverlap();
  closeCheckpointCornerNotches();
  createStartArea(G.corners[G.corners.length - 1]);
  createMiniOases(G.corners);
  createHazards(G.corners);
  G.trackFix = ensureTrackPassable(); // nunca deixa a trilha fechada (ver comentario da funcao)
  createPlayer();
  createTeamBots();
  createSavePingMarker();
  createSnowfall(); // POUCOS flocos, lentos e translucidos
  initClassAbilities();
  applyClassSlotLabels();
  createNameplates();

  // Posiciona a camera inicial ja no angulo e distancia corretos (estilo Dota 2)
  G.camera.position.set(G.player.position.x, CAMERA_HEIGHT, G.player.position.z + CAMERA_BACK_OFFSET);
  G.camera.lookAt(G.player.position.x, 0, G.player.position.z);

  setupInput();
  setupJoystick();
  setupMobileAbilityButtons();
  setupMinimap();
  window.addEventListener('resize', onWindowResize);

  showMessage(TXT('msg.intro'), 4);

  animate();
}

/* ============================ PREFERENCIAS (localStorage) ================== */
// Volume master e teclas das skills - editaveis na tela Opcoes, salvos no
// localStorage (com try/catch: modo privado/bloqueado nao pode quebrar o
// jogo, so deixa de salvar).
var PREF_KEY_VOLUME = 'axie_master_volume';
var PREF_KEY_MUSIC = 'axie_music_volume';
var PREF_KEY_SFX = 'axie_sfx_volume';
var PREF_KEY_KEYBINDS = 'axie_keybinds_v2'; // v2: novos padroes 1/2/3/4 (os salvos com G/E/F/H nao valem mais)
var PREF_KEY_QUICKCAST = 'axie_quickcast';

function prefGet(key) {
  try { return window.localStorage.getItem(key); } catch (e) { return null; }
}
function prefSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch (e) { /* sem storage: so nao salva */ }
}

var DEFAULT_KEYBINDS = { teleport: 'Digit1', dash: 'Digit2', push: 'Digit3', invuln: 'Digit4', respawn: 'KeyR', save: 'KeyT' };
// barId = icone da barra de habilidades cujo rotulo mostra a tecla.
var KEYBIND_ACTIONS = [
  { id: 'teleport', labelKey: 'ab.teleport', barId: 'ability-q' },
  { id: 'dash', labelKey: 'ab.dash', barId: 'ability-e' },
  { id: 'push', labelKey: 'ab.skill1', barId: 'ability-f' },
  { id: 'invuln', labelKey: 'ab.skill2', barId: 'ability-g' },
  { id: 'respawn', labelKey: 'ab.respawn', barId: 'ability-r' },
  { id: 'save', labelKey: 'ab.help', barId: 'ability-t' }
];
// Teclas que NAO podem ser atribuidas: cancelar mira/pausar (Escape). WASD
// ficou livre (o PC nao anda mais com WASD).
var KEYBIND_RESERVED = { Escape: true };
function actionLabel(a) { return TXT(a.labelKey); }

function loadKeybinds() {
  var kb = {}, k;
  for (k in DEFAULT_KEYBINDS) { kb[k] = DEFAULT_KEYBINDS[k]; }
  var raw = prefGet(PREF_KEY_KEYBINDS);
  if (!raw) { return kb; }
  try {
    var saved = JSON.parse(raw);
    var merged = {}, used = {}, ok = true, i;
    for (i = 0; i < KEYBIND_ACTIONS.length; i++) {
      var id = KEYBIND_ACTIONS[i].id;
      var code = (saved && typeof saved[id] === 'string') ? saved[id] : DEFAULT_KEYBINDS[id];
      if (KEYBIND_RESERVED[code] || used[code]) { ok = false; break; }
      used[code] = true;
      merged[id] = code;
    }
    if (ok) { return merged; }
  } catch (e) { /* JSON invalido: cai nos padroes */ }
  return kb;
}
var KEYBINDS = loadKeybinds();
// ATALHO RAPIDO (Opcoes, PC): ligado = 1/2/3/4 usam a skill NA HORA na direcao/ponto do
// cursor; desligado = fluxo normal (mostra a HUD e confirma com o clique).
var QUICK_CAST = prefGet(PREF_KEY_QUICKCAST) === '1';

function saveKeybinds() { prefSet(PREF_KEY_KEYBINDS, JSON.stringify(KEYBINDS)); }

var KEY_LABEL_NAMES = {
  ShiftLeft: 'Shift', ShiftRight: 'Shift', ControlLeft: 'Ctrl', ControlRight: 'Ctrl',
  AltLeft: 'Alt', AltRight: 'Alt', Tab: 'Tab', Enter: 'Enter', Backspace: 'Backspace',
  ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
  Semicolon: ';', Comma: ',', Period: '.', Slash: '/', Backslash: '\\', Quote: '\'',
  BracketLeft: '[', BracketRight: ']', Minus: '-', Equal: '='
};
function keyLabel(code) {
  if (!code) { return '?'; }
  if (code === 'Space') { return TXT('key.space'); }
  if (code.indexOf('Key') === 0) { return code.substring(3); }
  if (code.indexOf('Digit') === 0) { return code.substring(5); }
  if (code.indexOf('Numpad') === 0) { return 'Num' + code.substring(6); }
  return KEY_LABEL_NAMES[code] || code;
}

// Rotulos da barra de habilidades (desktop) seguem as teclas atuais.
function applyKeybindLabels() {
  var i;
  for (i = 0; i < KEYBIND_ACTIONS.length; i++) {
    var el = document.querySelector('#' + KEYBIND_ACTIONS[i].barId + ' .ability-key');
    if (el) { el.textContent = keyLabel(KEYBINDS[KEYBIND_ACTIONS[i].id]); }
  }
}

function findActionUsingKey(code, exceptId) {
  var i;
  for (i = 0; i < KEYBIND_ACTIONS.length; i++) {
    if (KEYBIND_ACTIONS[i].id !== exceptId && KEYBINDS[KEYBIND_ACTIONS[i].id] === code) { return KEYBIND_ACTIONS[i]; }
  }
  return null;
}

// AUDIO: tres controles em Opcoes.
//   - Volume geral: regula o jogo POR COMPLETO (trilha + sons).
//   - Trilha sonora: so a musica (castle_escape.mp4 = a musica Castle Escape em audio MPEG-4, em loop).
//   - Sons do jogo: todo o resto (skills, conversas, barulhos, ambiente e vozes dos
//     Axies) - qualquer som novo deve sair por GAME_AUDIO.sfx (GainNode), que passa
//     pelo master. A trilha usa o volume do proprio elemento <audio> (= geral x trilha).
//     Os valores ficam salvos no localStorage. O "blip" ao soltar um slider so serve
//     pra ouvir o volume.
var GAME_AUDIO = { volume: 0.8, music: 0.7, sfx: 0.8, ctx: null, master: null, sfxGain: null, musicGain: null, musicEl: null, musicViaCtx: false, musicWanted: false };
function loadAudioPref(key, fallback) {
  var raw = prefGet(key);
  var n = raw === null ? NaN : parseInt(raw, 10);
  return isNaN(n) ? fallback : clampNum(n, 0, 100) / 100;
}
(function loadVolume() {
  GAME_AUDIO.volume = loadAudioPref(PREF_KEY_VOLUME, GAME_AUDIO.volume);
  GAME_AUDIO.music = loadAudioPref(PREF_KEY_MUSIC, GAME_AUDIO.music);
  GAME_AUDIO.sfx = loadAudioPref(PREF_KEY_SFX, GAME_AUDIO.sfx);
})();

function applyAudioVolumes() {
  if (GAME_AUDIO.master) { GAME_AUDIO.master.gain.value = GAME_AUDIO.volume; }
  if (GAME_AUDIO.sfxGain) { GAME_AUDIO.sfxGain.gain.value = GAME_AUDIO.sfx; }
  if (GAME_AUDIO.musicGain) { GAME_AUDIO.musicGain.gain.value = GAME_AUDIO.music; }
  // Com a trilha roteada pelo WebAudio (musicViaCtx) o volume e o do ganho (funciona no iOS,
  // que IGNORA element.volume); senao usa o volume do proprio elemento.
  if (GAME_AUDIO.musicEl) { GAME_AUDIO.musicEl.volume = GAME_AUDIO.musicViaCtx ? 1 : clampNum(GAME_AUDIO.volume * GAME_AUDIO.music, 0, 1); }
}
function setMasterVolume(pct) {
  pct = clampNum(Math.round(pct), 0, 100);
  GAME_AUDIO.volume = pct / 100;
  prefSet(PREF_KEY_VOLUME, String(pct));
  applyAudioVolumes();
}
function setMusicVolume(pct) {
  pct = clampNum(Math.round(pct), 0, 100);
  GAME_AUDIO.music = pct / 100;
  prefSet(PREF_KEY_MUSIC, String(pct));
  applyAudioVolumes();
}
function setSfxVolume(pct) {
  pct = clampNum(Math.round(pct), 0, 100);
  GAME_AUDIO.sfx = pct / 100;
  prefSet(PREF_KEY_SFX, String(pct));
  applyAudioVolumes();
}

function audioEnsure() {
  if (GAME_AUDIO.ctx) { return true; }
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { return false; }
  try {
    GAME_AUDIO.ctx = new AC();
    GAME_AUDIO.master = GAME_AUDIO.ctx.createGain();
    GAME_AUDIO.master.connect(GAME_AUDIO.ctx.destination);
    GAME_AUDIO.sfxGain = GAME_AUDIO.ctx.createGain();
    GAME_AUDIO.sfxGain.connect(GAME_AUDIO.master);
    applyAudioVolumes();
  } catch (e) { GAME_AUDIO.ctx = null; return false; }
  return true;
}

// TRILHA SONORA: toca em loop desde a tela inicial (a senha ja foi um gesto do
// usuario, o que libera o audio). A musica vem embutida em music_data.js (base64 ->
// Blob local): assim nao depende de Range/CORS do servidor e pode passar pelo
// WebAudio (volume da trilha funcionando tambem no iPhone). Sem music_data.js, cai no
// arquivo castle_escape.mp4.
function musicSourceUrl() {
  if (typeof MUSIC_B64 === 'string' && MUSIC_B64.length > 1000) {
    try {
      var bin = atob(MUSIC_B64), n = bin.length, u8 = new Uint8Array(n), i;
      for (i = 0; i < n; i++) { u8[i] = bin.charCodeAt(i); }
      return URL.createObjectURL(new Blob([u8], { type: 'audio/mp4' }));
    } catch (e) { /* cai no arquivo */ }
  }
  return 'castle_escape.mp4';
}
function startMusic() {
  GAME_AUDIO.musicWanted = true;
  try {
    if (!GAME_AUDIO.musicEl) {
      var el = new Audio(musicSourceUrl());
      el.loop = true;
      el.preload = 'auto';
      el.setAttribute('playsinline', '');
      GAME_AUDIO.musicEl = el;
      // Roteia pelo WebAudio (ganho da trilha -> volume geral). Se falhar, usa element.volume.
      if (audioEnsure()) {
        try {
          var node = GAME_AUDIO.ctx.createMediaElementSource(el);
          GAME_AUDIO.musicGain = GAME_AUDIO.ctx.createGain();
          node.connect(GAME_AUDIO.musicGain);
          GAME_AUDIO.musicGain.connect(GAME_AUDIO.master);
          GAME_AUDIO.musicViaCtx = true;
        } catch (e2) { GAME_AUDIO.musicViaCtx = false; }
      }
    }
    applyAudioVolumes();
    unlockAudio();
    var pr = GAME_AUDIO.musicEl.play();
    if (pr && pr.catch) { pr.catch(function () { /* bloqueado: unlockAudio tenta no proximo toque/tecla */ }); }
  } catch (e) { /* sem audio: ignora */ }
}

// iOS/Safari: o AudioContext so sai de "suspended" (e a musica so toca) dentro de um GESTO
// do usuario (toque/clique/tecla). Este handler roda em todo gesto, ate tudo estar tocando:
// retoma o contexto, toca um buffer mudo (truque de desbloqueio do iOS) e retoma a trilha.
// Tambem pede a sessao de audio "playback" (iOS 17+) para o som nao ser mudo com o botao
// de silencio do iPhone.
function unlockAudio() {
  try { if (navigator.audioSession) { navigator.audioSession.type = 'playback'; } } catch (e0) { /* ok */ }
  try {
    if (audioEnsure()) {
      var ctx = GAME_AUDIO.ctx;
      if (ctx.state !== 'running') {
        if (ctx.resume) { ctx.resume(); }
        var b = ctx.createBuffer(1, 1, 22050), s = ctx.createBufferSource();
        s.buffer = b; s.connect(ctx.destination);
        if (s.start) { s.start(0); }
      }
    }
    var el = GAME_AUDIO.musicEl;
    if (GAME_AUDIO.musicWanted && el && el.paused) {
      var pr = el.play();
      if (pr && pr.catch) { pr.catch(function () { /* tenta no proximo gesto */ }); }
    }
  } catch (e) { /* sem audio: ignora */ }
}
(function installAudioUnlock() {
  var evs = ['touchend', 'click', 'pointerup', 'mousedown', 'keydown'], i;
  function handler() {
    var c = GAME_AUDIO.ctx, el = GAME_AUDIO.musicEl;
    if (c && c.state === 'running' && (!GAME_AUDIO.musicWanted || !el || !el.paused)) { return; }
    unlockAudio();
  }
  for (i = 0; i < evs.length; i++) { window.addEventListener(evs[i], handler, true); }
  // iOS pode suspender o audio ao trocar de app/aba: ao voltar, o proximo gesto retoma.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { return; }
    var c = GAME_AUDIO.ctx;
    if (c && c.state !== 'running' && c.resume) { try { c.resume(); } catch (e) { /* ok */ } }
  });
  // iOS ignora user-scalable=no: bloqueia o zoom por gesto de pinca.
  document.addEventListener('gesturestart', function (e) { e.preventDefault(); });
})();
/* ---- SONS DO JOGO (sinteticos, saem pelo canal "Sons do jogo" -> volume geral) ---- */
function sfxReady() {
  if (!audioEnsure()) { return false; }
  try { if (GAME_AUDIO.ctx.resume) { GAME_AUDIO.ctx.resume(); } } catch (e) { /* ok */ }
  return true;
}
function sfxTone(out, type, freq, start, dur, vol, freqEnd) {
  var ctx = GAME_AUDIO.ctx, t0 = ctx.currentTime + 0.01 + start;
  var o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (freqEnd) { o.frequency.exponentialRampToValueAtTime(freqEnd, t0 + dur); }
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + Math.min(0.012, dur / 3));
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(out);
  o.start(t0); o.stop(t0 + dur + 0.05);
}
// Ruido filtrado (passa-banda); f1 opcional = varredura de frequencia (whoosh).
function sfxNoise(out, start, dur, vol, f0, q, f1) {
  var ctx = GAME_AUDIO.ctx, t0 = ctx.currentTime + 0.01 + start, len = Math.max(1, Math.floor(ctx.sampleRate * dur)), i;
  var buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  for (i = 0; i < len; i++) { d[i] = (Math.random() * 2 - 1) * (1 - i / len); }
  var src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  src.buffer = buf; f.type = 'bandpass'; f.Q.value = q;
  f.frequency.setValueAtTime(f0, t0);
  if (f1) { f.frequency.exponentialRampToValueAtTime(f1, t0 + dur); }
  g.gain.value = vol;
  src.connect(f); f.connect(g); g.connect(out);
  src.start(t0);
}
// Ruido branco em loop (buffer unico reaproveitado) - base dos sons que duram (vento, agua, tremor).
function sfxNoiseBuffer() {
  var ctx = GAME_AUDIO.ctx;
  if (!GAME_AUDIO.noiseBuf || GAME_AUDIO.noiseBuf.sampleRate !== ctx.sampleRate) {
    var len = ctx.sampleRate * 2, i, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (i = 0; i < len; i++) { d[i] = Math.random() * 2 - 1; }
    GAME_AUDIO.noiseBuf = buf;
  }
  return GAME_AUDIO.noiseBuf;
}
// Ligado por LFO: tremolo (variacao de volume) aplicado entre "src" e "out".
function sfxTremolo(node, out, hz, depth) {
  var ctx = GAME_AUDIO.ctx, tg = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
  tg.gain.value = 1 - depth / 2;
  lfo.frequency.value = hz; lg.gain.value = depth / 2;
  lfo.connect(lg); lg.connect(tg.gain);
  node.connect(tg); tg.connect(out);
  return lfo;
}
// Ruido CONTINUO com envelope (att/rel) e varredura do filtro f0 -> f1 durante dur segundos.
// opt: att, rel, type ('bandpass'), lfoHz/lfoDepth (tremolo).
function sfxSustain(out, start, dur, vol, f0, q, f1, opt) {
  opt = opt || {};
  var ctx = GAME_AUDIO.ctx, t0 = ctx.currentTime + 0.01 + start, att = opt.att || 0.03, rel = opt.rel || 0.12;
  var src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(), lfo = null;
  src.buffer = sfxNoiseBuffer(); src.loop = true;
  f.type = opt.type || 'bandpass'; f.Q.value = q;
  f.frequency.setValueAtTime(f0, t0);
  if (f1) { f.frequency.exponentialRampToValueAtTime(f1, t0 + dur); }
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + att);
  g.gain.setValueAtTime(vol, t0 + Math.max(att, dur - rel));
  g.gain.linearRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f); f.connect(g);
  if (opt.lfoHz) { lfo = sfxTremolo(g, out, opt.lfoHz, opt.lfoDepth || 0.4); } else { g.connect(out); }
  src.start(t0); src.stop(t0 + dur + 0.05);
  if (lfo) { lfo.start(t0); lfo.stop(t0 + dur + 0.05); }
}
// Tom CONTINUO (oscilador) com envelope e tremolo opcional; freqEnd = glissando.
function sfxHold(out, type, freq, start, dur, vol, opt) {
  opt = opt || {};
  var ctx = GAME_AUDIO.ctx, t0 = ctx.currentTime + 0.01 + start, att = opt.att || 0.03, rel = opt.rel || 0.12;
  var o = ctx.createOscillator(), g = ctx.createGain(), lfo = null;
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (opt.freqEnd) { o.frequency.exponentialRampToValueAtTime(opt.freqEnd, t0 + dur); }
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + att);
  g.gain.setValueAtTime(vol, t0 + Math.max(att, dur - rel));
  g.gain.linearRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g);
  if (opt.lfoHz) { lfo = sfxTremolo(g, out, opt.lfoHz, opt.lfoDepth || 0.4); } else { g.connect(out); }
  o.start(t0); o.stop(t0 + dur + 0.05);
  if (lfo) { lfo.start(t0); lfo.stop(t0 + dur + 0.05); }
}
// mul = volume relativo (0..1) - sons de OUTROS Axies chegam mais baixos (playSfxAt).
// dur = duracao (s) dos sons que acompanham uma skill (jato, folha, escudo).
// Devolve um "handle" {stop(), refs}: stop() cala o som na hora (ex.: o projetil acertou/parou).
function playSfx(name, mul, dur) {
  if (!sfxReady()) { return null; }
  try {
    var ctx = GAME_AUDIO.ctx, out = ctx.createGain(), k, d;
    out.gain.value = mul === undefined ? 1 : mul;
    out.connect(GAME_AUDIO.sfxGain);
    var handle = { refs: 1, stop: function () {
      try { var tn = ctx.currentTime; out.gain.cancelScheduledValues(tn); out.gain.setValueAtTime(out.gain.value, tn); out.gain.linearRampToValueAtTime(0.0001, tn + 0.08); } catch (e3) { /* ok */ }
    } };
    if (name === 'freeze') {
      // estalo de gelo + dentes batendo de frio (cliques rapidos) + tremor agudo
      sfxNoise(out, 0, 0.09, 0.8, 1100, 1.2);
      for (k = 0; k < 10; k++) {
        var at = 0.1 + k * 0.058 + Math.random() * 0.012;
        sfxNoise(out, at, 0.02, 0.9, 2400 + Math.random() * 900, 4);
        sfxTone(out, 'triangle', 1500 + Math.random() * 300, at, 0.02, 0.09);
      }
      sfxTone(out, 'sine', 930, 0.05, 0.7, 0.05, 900);
      sfxTone(out, 'sine', 985, 0.05, 0.7, 0.04, 950);
    } else if (name === 'checkpoint') {
      sfxTone(out, 'triangle', 660, 0, 0.16, 0.22);
      sfxTone(out, 'triangle', 880, 0.1, 0.18, 0.22);
      sfxTone(out, 'triangle', 1320, 0.2, 0.45, 0.2);
      sfxTone(out, 'sine', 2640, 0.2, 0.3, 0.06);
    } else if (name === 'save') {
      sfxNoise(out, 0, 0.08, 0.8, 1800, 1.5);
      sfxTone(out, 'sine', 523, 0.06, 0.25, 0.2);
      sfxTone(out, 'sine', 659, 0.14, 0.25, 0.2);
      sfxTone(out, 'sine', 784, 0.22, 0.4, 0.2);
      sfxTone(out, 'sine', 392, 0.06, 0.5, 0.1);
    } else if (name === 'dash') {
      // DASH (todas as classes): algo GRANDE cortando o vento, rapido - corpo grave do vento + assobio agudo + peso.
      sfxSustain(out, 0, 0.3, 1.0, 260, 0.7, 1900, { att: 0.05, rel: 0.16 });
      sfxSustain(out, 0.03, 0.24, 0.5, 1500, 1.0, 5200, { att: 0.03, rel: 0.12 });
      sfxTone(out, 'sine', 110, 0, 0.26, 0.28, 55);
    } else if (name === 'teleport') {
      // TELEPORTE (todas as classes), no estilo do "Flash" do LoL: varredura ascendente rapida ->
      // "pop" do blink -> brilho metalico que decai (com eco curto).
      sfxSustain(out, 0, 0.11, 0.9, 700, 1.1, 7000, { att: 0.008, rel: 0.03 });
      sfxTone(out, 'sine', 420, 0, 0.11, 0.18, 2800);
      sfxTone(out, 'sine', 120, 0.1, 0.1, 0.35, 55);
      sfxNoise(out, 0.1, 0.05, 0.6, 4200, 2.5);
      sfxTone(out, 'triangle', 2093, 0.11, 0.3, 0.14);
      sfxTone(out, 'triangle', 3136, 0.11, 0.24, 0.09);
      sfxTone(out, 'sine', 4186, 0.12, 0.18, 0.05);
      sfxTone(out, 'triangle', 2093, 0.22, 0.25, 0.05);
    } else if (name === 'push') {
      // EMPURRAR (Besta): UMA palma abafada - estalo grave sem brilho + corpo + baque.
      sfxSustain(out, 0, 0.09, 0.85, 1100, 0.6, 500, { att: 0.004, rel: 0.06 });
      sfxSustain(out, 0, 0.16, 0.55, 380, 0.7, 180, { att: 0.004, rel: 0.11 });
      sfxTone(out, 'sine', 170, 0, 0.14, 0.4, 60);
    } else if (name === 'stomp') {
      // PISAO (Besta): tremor de terra - impacto + rumor grave tremulo + pedras rolando.
      sfxTone(out, 'sine', 95, 0, 0.32, 0.75, 32);
      sfxSustain(out, 0, 1.1, 1.6, 90, 0.9, 45, { att: 0.02, rel: 0.6, lfoHz: 13, lfoDepth: 0.55 });
      sfxHold(out, 'sine', 48, 0.02, 1.0, 0.35, { lfoHz: 11, lfoDepth: 0.6, att: 0.05, rel: 0.5, freqEnd: 34 });
      for (k = 0; k < 8; k++) { sfxNoise(out, 0.15 + k * 0.11 + Math.random() * 0.05, 0.05, 0.5, 250 + Math.random() * 300, 3); }
    } else if (name === 'jet') {
      // JATO DE AGUA (Aquatica): chiado continuo do jato + borbulhar, com a duracao do projetil (dur).
      d = dur || 0.7;
      sfxSustain(out, 0, d, 0.85, 2400, 0.7, 3400, { att: 0.04, rel: 0.18 });
      sfxSustain(out, 0, d, 0.5, 900, 1.2, 1400, { att: 0.05, rel: 0.2, lfoHz: 24, lfoDepth: 0.5 });
      sfxTone(out, 'sine', 260, 0, 0.12, 0.3, 140);
      sfxNoise(out, 0, 0.06, 0.6, 1500, 1);
    } else if (name === 'splash') {
      // CUSPE (Aquatica): so o "splash" da esfera batendo no chao - respingo + bolha + gotas.
      sfxNoise(out, 0, 0.28, 0.9, 1400, 0.8, 500);
      sfxNoise(out, 0.02, 0.18, 0.5, 3500, 1.5, 1800);
      sfxTone(out, 'sine', 300, 0, 0.16, 0.3, 110);
      for (k = 0; k < 7; k++) { sfxTone(out, 'sine', 900 + Math.random() * 900, 0.06 + k * 0.045 + Math.random() * 0.02, 0.05, 0.12, 500); }
    } else if (name === 'leaf') {
      // FOLHAS (Planta): algo cortando o ar rapido, dura o mesmo que o projetil (dur).
      d = dur || 0.75;
      sfxNoise(out, 0, 0.05, 0.7, 5500, 2);
      sfxSustain(out, 0, d, 0.7, 4200, 2.2, 1500, { att: 0.02, rel: 0.2, lfoHz: 38, lfoDepth: 0.35 });
      sfxSustain(out, 0, d, 0.25, 1200, 1.5, 700, { att: 0.05, rel: 0.25 });
    } else if (name === 'shield') {
      // INVULNERAVEL (Planta): escudo generico - arpejo de ativacao + zumbido protetor + brilho, dura a skill toda (dur).
      d = dur || 4;
      sfxTone(out, 'sine', 523, 0, 0.25, 0.2);
      sfxTone(out, 'sine', 659, 0.07, 0.25, 0.2);
      sfxTone(out, 'sine', 784, 0.14, 0.3, 0.2);
      sfxTone(out, 'sine', 1046, 0.21, 0.5, 0.18);
      sfxHold(out, 'sine', 196, 0, d, 0.16, { att: 0.15, rel: 0.5, lfoHz: 5, lfoDepth: 0.35 });
      sfxHold(out, 'triangle', 294, 0, d, 0.08, { att: 0.2, rel: 0.5, lfoHz: 4, lfoDepth: 0.4 });
      sfxHold(out, 'sine', 1568, 0, d, 0.03, { att: 0.3, rel: 0.5, lfoHz: 7, lfoDepth: 0.8 });
      sfxSustain(out, 0, d, 0.12, 5200, 3, 5800, { att: 0.3, rel: 0.6 });
    } else if (name === 'ping') {
      // ALERTA de socorro: "ding-dong" curto e claro (um por piscada no minimapa).
      sfxTone(out, 'sine', 1320, 0, 0.32, 0.28);
      sfxTone(out, 'sine', 1980, 0, 0.22, 0.12);
      sfxTone(out, 'sine', 990, 0.09, 0.28, 0.2);
      sfxNoise(out, 0, 0.02, 0.4, 3000, 3);
    } else if (name === 'click') {
      sfxTone(out, 'sine', 560, 0, 0.06, 0.16, 340);
      sfxNoise(out, 0, 0.018, 0.25, 2200, 3);
    }
    return handle;
  } catch (e) { /* sem audio: ignora */ }
  return null;
}
// Som da skill de um Axie (jogador = volume cheio; bots = mais baixo com a distancia).
function castSfx(caster, name, dur) {
  if (caster === G.player) { return playSfx(name, 1, dur); }
  return playSfxAt(name, caster.position.x, caster.position.z, dur);
}
// Som que vem de uma posicao do mundo: mais baixo com a distancia, mudo alem de 130.
function playSfxAt(name, x, z, dur) {
  var dx = x - G.player.position.x, dz = z - G.player.position.z, d = Math.sqrt(dx * dx + dz * dz);
  if (d > 130) { return null; }
  return playSfx(name, 0.12 + 0.6 * (1 - d / 130), dur);
}

// kind: 'master' (padrao, volume geral) | 'sfx' (passa tambem pelo volume dos sons).
function playVolumeBlip(kind) {
  if (!audioEnsure()) { return; }
  try {
    if (GAME_AUDIO.ctx.resume) { GAME_AUDIO.ctx.resume(); }
    var osc = GAME_AUDIO.ctx.createOscillator();
    var g = GAME_AUDIO.ctx.createGain();
    osc.frequency.value = 660;
    g.gain.value = 0.25;
    osc.connect(g);
    g.connect(kind === 'sfx' ? GAME_AUDIO.sfxGain : GAME_AUDIO.master);
    osc.start();
    osc.stop(GAME_AUDIO.ctx.currentTime + 0.12);
  } catch (e) { /* sem audio: ignora */ }
}
/* ============================ TELAS / MENUS ================================= */
// Fluxo: senha -> title-screen -> main-menu -> Single Player (init) ou
// options-screen. Multiplayer fica BLOQUEADO ("em breve"): nao existe
// servidor multiplayer real aqui (o jogo e 100% local, os outros 3 jogadores
// sao bots - ver createTeamBots/G.slots), so o menu esta pronto.
var ALL_SCREENS = ['title-screen', 'main-menu', 'select-screen', 'guide-screen', 'options-screen', 'pause-menu'];
var currentScreen = null;
var screenShownAt = 0;
var gameStarted = false;
var capturingAction = null;
var optionsReturnTo = 'main-menu'; // Opcoes abre tanto do menu inicial quanto da pausa
var selectedClass = null; // classe escolhida na selecao de personagem

function showScreen(name) {
  var i;
  for (i = 0; i < ALL_SCREENS.length; i++) {
    var el = document.getElementById(ALL_SCREENS[i]);
    if (el) { el.hidden = (ALL_SCREENS[i] !== name); }
  }
  currentScreen = name;
  screenShownAt = Date.now();
  capturingAction = null;
  if (name === 'main-menu') {
    var first = document.getElementById('menu-single');
    if (first) { first.focus(); }
  }
  if (name === 'options-screen') { refreshOptionsUI(); }
}

// Single Player NAO inicia direto: menu -> selecao de personagem -> Start
// (startMatch) -> countdown 3-2-1 -> jogo.
function openCharacterSelect() {
  showScreen('select-screen');
  refreshSelectUI();
}

/* ---- Telas antes da partida: comandos PC -> comandos mobile -> objetivo -> countdown ---- */
var guidePage = 0;
var GUIDE_PAGES = 3;
var guideShownAt = 0;

// Botao Start da selecao de personagem: abre as 3 telas (nao inicia direto).
function startMatch() {
  if (gameStarted || !selectedClass) { return; }
  guidePage = 0;
  showScreen('guide-screen');
  guideShownAt = Date.now();
  renderGuidePage();
}

function setText(id, txt) {
  var el = document.getElementById(id);
  if (el) { el.textContent = txt; }
}

function renderGuidePage() {
  var i;
  for (i = 0; i < GUIDE_PAGES; i++) {
    var pg = document.getElementById('guide-page-' + i);
    if (pg) { pg.hidden = (i !== guidePage); }
    var dot = document.getElementById('guide-dot-' + i);
    if (dot) { dot.className = 'guide-dot' + (i === guidePage ? ' on' : ''); }
  }
  if (guidePage === 0) {
    // Teclas atuais (respeitam o que foi remapeado em Opcoes) + nomes das skills da classe escolhida.
    var names = classSkillNames(selectedClass);
    setText('gk-tp', keyLabel(KEYBINDS.teleport));
    setText('gk-dash', keyLabel(KEYBINDS.dash));
    setText('gk-s1', keyLabel(KEYBINDS.push));
    setText('gk-s2', keyLabel(KEYBINDS.invuln));
    setText('gk-r', keyLabel(KEYBINDS.respawn));
    setText('gk-t', keyLabel(KEYBINDS.save));
    setText('gn-s1', TXT('guide.skillN', 1, names.f));
    setText('gn-s2', TXT('guide.skillN', 2, names.g));
  }
  if (guidePage === 1) {
    var mn = classSkillMobileNames(selectedClass);
    setText('mk-s1', mn.f);
    setText('mk-s2', mn.g);
  }
}

// Clique/tecla avanca; na ultima tela segue para o countdown.
function advanceGuide() {
  if (currentScreen !== 'guide-screen' || Date.now() - guideShownAt < 250) { return; }
  guidePage += 1;
  guideShownAt = Date.now();
  if (guidePage >= GUIDE_PAGES) { beginMatch(); return; }
  renderGuidePage();
}

function beginMatch() {
  if (gameStarted || !selectedClass) { return; }
  gameStarted = true;
  startMusic();
  G.playerClass = selectedClass;
  var nameEl = document.getElementById('select-name');
  var typed = nameEl ? nameEl.value.replace(/^\s+|\s+$/g, '') : '';
  G.playerName = typed ? typed.substring(0, 14) : TXT('player.default');
  prefSet('axie_player_name', typed);
  G.countdownLeft = COUNTDOWN_SECONDS; // antes do init: nem o primeiro frame simula
  showScreen(null);
  init();
  createStartGuide();
  createStartCells();
  startCountdown();
  var pb = document.getElementById('pause-btn');
  if (pb) { pb.hidden = false; }
}

function pauseGame() {
  if (!gameStarted || G.paused || G.matchWinner) { return; }
  G.paused = true;
  G.keys = {};
  G.mouse.down = false;
  G.joystick.active = false;
  G.joystick.dx = 0;
  G.joystick.dy = 0;
  cancelAim(null);
  showScreen('pause-menu');
}

function resumeGame() {
  if (!G.paused) { return; }
  G.paused = false;
  showScreen(null);
}

function buildSelectGrid() {
  var grid = document.getElementById('select-grid');
  if (!grid) { return; }
  grid.innerHTML = '';
  var i;
  for (i = 0; i < 9; i++) {
    var key = i < CLASS_KEYS.length ? CLASS_KEYS[i] : null;
    var card = document.createElement('button');
    card.type = 'button';
    if (key) {
      var def = AXIE_CLASSES[key];
      card.className = 'select-card';
      card.setAttribute('data-class', key);
      var img = document.createElement('img');
      img.src = def.img;
      img.alt = TXT('class.' + key + '.label');
      img.draggable = false;
      var nm = document.createElement('span');
      nm.className = 'card-name';
      nm.textContent = TXT('class.' + key + '.label');
      card.appendChild(img);
      card.appendChild(nm);
      card.addEventListener('click', (function (k) {
        return function () { selectedClass = k; refreshSelectUI(); };
      })(key));
    } else {
      // Slots bloqueados (por enquanto so 3 classes jogaveis)
      card.className = 'select-card locked';
      card.disabled = true;
      var lock = document.createElement('span');
      lock.className = 'card-lock';
      lock.textContent = TXT('select.soon');
      card.appendChild(lock);
    }
    grid.appendChild(card);
  }
}

function refreshSelectUI() {
  var cards = document.querySelectorAll('#select-grid .select-card');
  var i;
  for (i = 0; i < cards.length; i++) {
    var k = cards[i].getAttribute('data-class');
    if (k && k === selectedClass) { cards[i].classList.add('selected'); }
    else { cards[i].classList.remove('selected'); }
  }
  var info = document.getElementById('select-info');
  var start = document.getElementById('select-start');
  if (info) {
    info.textContent = selectedClass ? (TXT('class.' + selectedClass + '.label') + ' (' + TXT('class.' + selectedClass + '.hint') + ') - ' + TXT('class.' + selectedClass + '.desc')) : TXT('select.info');
  }
  if (start) { start.disabled = !selectedClass; }
}

function setOptMsg(text) {
  var el = document.getElementById('opt-msg');
  if (el) { el.textContent = text || ''; }
}

// ATALHOS: a edicao acontece num RASCUNHO (KEYBIND_DRAFT) - pode repetir uma tecla que outra
// skill ja usa (assim da pra liberar a tecla numa skill e depois colocar na outra). So o botao
// "Salvar atalhos" grava, e ele fica BLOQUEADO enquanto houver teclas duplicadas. Vale SO para
// atalhos: os volumes e o Atalho rapido continuam salvando na hora. Sair das Opcoes sem salvar
// descarta o rascunho (refreshOptionsUI recomeca dele a partir dos atalhos salvos).
var KEYBIND_DRAFT = {};
function resetKeybindDraft() {
  var k;
  KEYBIND_DRAFT = {};
  for (k in KEYBINDS) { KEYBIND_DRAFT[k] = KEYBINDS[k]; }
}
// [{code, labels:[...]}] das teclas usadas por mais de uma skill no rascunho.
function keybindDuplicates() {
  var byCode = {}, i, out = [], code;
  for (i = 0; i < KEYBIND_ACTIONS.length; i++) {
    code = KEYBIND_DRAFT[KEYBIND_ACTIONS[i].id];
    if (!byCode[code]) { byCode[code] = []; }
    byCode[code].push(actionLabel(KEYBIND_ACTIONS[i]));
  }
  for (code in byCode) { if (byCode[code].length > 1) { out.push({ code: code, labels: byCode[code] }); } }
  return out;
}
function keybindDraftChanged() {
  var i;
  for (i = 0; i < KEYBIND_ACTIONS.length; i++) {
    if (KEYBIND_DRAFT[KEYBIND_ACTIONS[i].id] !== KEYBINDS[KEYBIND_ACTIONS[i].id]) { return true; }
  }
  return false;
}
// Mensagem de duplicados + estado do botao "Salvar atalhos".
function updateKeybindSaveUI() {
  var dups = keybindDuplicates(), btn = document.getElementById('opt-save-keys'), msg = document.getElementById('kb-dup-msg');
  if (btn) { btn.disabled = dups.length > 0 || !keybindDraftChanged(); }
  if (!msg) { return; }
  if (dups.length > 0) {
    var parts = dups.map(function (d) { return TXT('kb.dupPart', keyLabel(d.code), d.labels.join(TXT('kb.and'))); });
    msg.textContent = TXT('kb.dupMsg', parts.join('; '));
    msg.className = 'kb-dup-msg bad';
  } else if (keybindDraftChanged()) {
    msg.textContent = TXT('kb.unsaved');
    msg.className = 'kb-dup-msg';
  } else {
    msg.textContent = '';
    msg.className = 'kb-dup-msg';
  }
}

function renderKeybindList() {
  var list = document.getElementById('keybind-list');
  if (!list) { return; }
  list.innerHTML = '';
  KEYBIND_ACTIONS.forEach(function (a) {
    var row = document.createElement('div');
    row.className = 'kb-row';
    var name = document.createElement('span');
    name.className = 'kb-name';
    name.textContent = actionLabel(a);
    var btn = document.createElement('button');
    btn.type = 'button';
    var capturing = capturingAction === a.id;
    var isDup = keybindDuplicates().some(function (d) { return d.code === KEYBIND_DRAFT[a.id]; });
    btn.className = 'kb-key' + (capturing ? ' kb-capturing' : '') + (isDup && !capturing ? ' kb-dup' : '');
    btn.textContent = capturing ? TXT('kb.press') : keyLabel(KEYBIND_DRAFT[a.id]);
    btn.addEventListener('click', function () {
      capturingAction = a.id;
      setOptMsg(TXT('kb.pressFor', actionLabel(a)));
      renderKeybindList();
    });
    row.appendChild(name);
    row.appendChild(btn);
    list.appendChild(row);
  });
  updateKeybindSaveUI();
}

function refreshQuickCastUI() {
  var qc = document.getElementById('opt-quickcast');
  if (!qc) { return; }
  qc.textContent = TXT(QUICK_CAST ? 'opt.on' : 'opt.off');
  qc.className = 'kb-key opt-toggle' + (QUICK_CAST ? ' on' : '');
}

function refreshOptionsUI() {
  refreshQuickCastUI();
  var vols = [['opt-volume', 'opt-volume-value', GAME_AUDIO.volume], ['opt-music', 'opt-music-value', GAME_AUDIO.music], ['opt-sfx', 'opt-sfx-value', GAME_AUDIO.sfx]], vi;
  for (vi = 0; vi < vols.length; vi++) {
    var vs = document.getElementById(vols[vi][0]), vl = document.getElementById(vols[vi][1]), vp = Math.round(vols[vi][2] * 100);
    if (vs) { vs.value = String(vp); }
    if (vl) { vl.textContent = vp + '%'; }
  }
  setOptMsg('');
  resetKeybindDraft(); // recomeca dos atalhos SALVOS (descarta alteracoes nao salvas)
  renderKeybindList();
}

function onMenuKeyDown(e) {
  if (currentScreen === 'title-screen') {
    // Qualquer tecla (ou Enter) confirma "Jogar". Pequena trava de tempo:
    // o Enter que acabou de confirmar a senha nao pode pular a tela titulo.
    // preventDefault no keydown tambem cancela o keypress, senao o mesmo
    // Enter ainda "clicaria" no botao do menu recem-focado.
    if (e.repeat || e.code === 'Escape' || Date.now() - screenShownAt < 350) { return; } // ESC nao avanca (e a tela inicial)
    // Atalhos do navegador (Ctrl+R, F5, F12, Alt+...) nao contam como "tecla".
    if (e.ctrlKey || e.metaKey || e.altKey || /^F\d+$/.test(e.code)) { return; }
    e.preventDefault();
    showScreen('main-menu');
    return;
  }
  // ESC: menus voltam pra tela anterior; no jogo (Single Player) cancela a
  // mira se houver, senao PAUSA; na pausa, retoma.
  if (currentScreen === null) {
    if (e.code === 'Escape' && !e.repeat && gameStarted) {
      if (G.aimMode) { cancelAim(TXT('msg.aimCancelled')); } else { pauseGame(); }
    }
    return;
  }
  if (currentScreen === 'pause-menu') {
    if (e.code === 'Escape' && !e.repeat) { resumeGame(); }
    return;
  }
  if (currentScreen === 'select-screen') {
    if (e.code === 'Escape') { showScreen('main-menu'); }
    return;
  }
  if (currentScreen === 'guide-screen') {
    if (e.code === 'Escape') { if (!e.repeat) { showScreen('select-screen'); } return; }
    if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || /^F\d+$/.test(e.code) || /^(Shift|Control|Alt|Meta)/.test(e.code)) { return; }
    e.preventDefault();
    advanceGuide();
    return;
  }
  if (currentScreen === 'main-menu') {
    if (e.code === 'Escape') { showScreen('title-screen'); return; }
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
      e.preventDefault();
      var btns = [document.getElementById('menu-single'), document.getElementById('menu-options')];
      var idx = btns.indexOf(document.activeElement);
      var next = e.code === 'ArrowDown' ? idx + 1 : idx - 1;
      if (next < 0) { next = btns.length - 1; }
      if (next >= btns.length) { next = 0; }
      btns[next].focus();
    }
    return;
  }
  if (currentScreen === 'options-screen') {
    if (capturingAction) {
      e.preventDefault();
      if (e.code === 'Escape') {
        capturingAction = null;
        setOptMsg(TXT('kb.cancelled'));
        renderKeybindList();
        return;
      }
      if (KEYBIND_RESERVED[e.code]) {
        setOptMsg(TXT('kb.reserved', keyLabel(e.code)));
        return;
      }
      // Pode repetir uma tecla ja usada por outra skill (so nao da pra SALVAR duplicado).
      KEYBIND_DRAFT[capturingAction] = e.code;
      capturingAction = null;
      setOptMsg('');
      renderKeybindList();
      return;
    }
    if (e.code === 'Escape') { showScreen(optionsReturnTo); }
  }
}

// Troca de idioma (Opcoes): salva a escolha e refaz todos os textos, fixos e dinamicos.
function setLanguage(code) {
  if (code !== 'en' && code !== 'pt') { return; }
  LANG = code;
  try { window.localStorage.setItem(LANG_STORAGE_KEY, code); } catch (e) { /* sem storage: vale so nesta sessao */ }
  applyStaticI18n();
  buildSelectGrid();
  refreshSelectUI();
  refreshQuickCastUI();
  renderKeybindList();
  if (gameStarted && G.player && G.player.cls) { applyClassSlotLabels(); }
  if (currentScreen === 'guide-screen') { renderGuidePage(); }
  applyKeybindLabels();
}

function setupMenus() {
  applyStaticI18n();
  var langSel = document.getElementById('opt-lang');
  if (langSel) { langSel.addEventListener('change', function () { setLanguage(langSel.value); }); }
  var play = document.getElementById('title-play');
  var title = document.getElementById('title-screen');
  if (play) { play.addEventListener('click', function (e) { e.stopPropagation(); showScreen('main-menu'); }); }
  // Toque/clique em qualquer lugar da tela titulo tambem confirma (mobile
  // nao tem "Press Enter").
  if (title) {
    title.addEventListener('click', function () {
      if (currentScreen === 'title-screen' && Date.now() - screenShownAt > 350) { showScreen('main-menu'); }
    });
  }
  var single = document.getElementById('menu-single');
  if (single) { single.addEventListener('click', openCharacterSelect); }
  var opts = document.getElementById('menu-options');
  if (opts) { opts.addEventListener('click', function () { optionsReturnTo = 'main-menu'; showScreen('options-screen'); }); }

  // Selecao de personagem (3x3) e Start
  buildSelectGrid();
  var nameInput = document.getElementById('select-name');
  if (nameInput) { nameInput.value = prefGet('axie_player_name') || ''; }
  var selBack = document.getElementById('select-back');
  if (selBack) { selBack.addEventListener('click', function () { showScreen('main-menu'); }); }
  var selStart = document.getElementById('select-start');
  if (selStart) { selStart.addEventListener('click', startMatch); }
  var guideEl = document.getElementById('guide-screen');
  if (guideEl) { guideEl.addEventListener('click', advanceGuide); }
  var qc = document.getElementById('opt-quickcast');
  if (qc) {
    qc.addEventListener('click', function () {
      QUICK_CAST = !QUICK_CAST;
      prefSet(PREF_KEY_QUICKCAST, QUICK_CAST ? '1' : '0');
      refreshQuickCastUI();
    });
  }

  // Pausa (ESC no PC, botao II no celular)
  var pResume = document.getElementById('pause-resume');
  if (pResume) { pResume.addEventListener('click', resumeGame); }
  var pOpts = document.getElementById('pause-options');
  if (pOpts) { pOpts.addEventListener('click', function () { optionsReturnTo = 'pause-menu'; showScreen('options-screen'); }); }
  var pQuit = document.getElementById('pause-quit');
  if (pQuit) {
    // Sair da partida = volta pra tela inicial (recarrega a pagina; a senha
    // ja digitada nesta sessao nao e pedida de novo, cai na tela "Jogar").
    pQuit.addEventListener('click', function () { window.location.reload(); });
  }
  var pBtn = document.getElementById('pause-btn');
  if (pBtn) { pBtn.addEventListener('click', pauseGame); }
  // menu-multi e "disabled" no HTML (em breve) - sem listener de proposito.

  // Tres sliders de audio: volume geral / trilha sonora / sons do jogo.
  function bindVolume(sliderId, labelId, setFn, getFn, blipKind) {
    var sl = document.getElementById(sliderId), lb = document.getElementById(labelId);
    if (!sl) { return; }
    sl.addEventListener('input', function () {
      setFn(parseInt(sl.value, 10));
      if (lb) { lb.textContent = Math.round(getFn() * 100) + '%'; }
    });
    if (blipKind) { sl.addEventListener('change', function () { playVolumeBlip(blipKind); }); }
  }
  bindVolume('opt-volume', 'opt-volume-value', setMasterVolume, function () { return GAME_AUDIO.volume; }, 'master');
  bindVolume('opt-music', 'opt-music-value', setMusicVolume, function () { return GAME_AUDIO.music; }, null);
  bindVolume('opt-sfx', 'opt-sfx-value', setSfxVolume, function () { return GAME_AUDIO.sfx; }, 'sfx');
  var saveKeys = document.getElementById('opt-save-keys');
  if (saveKeys) {
    saveKeys.addEventListener('click', function () {
      if (keybindDuplicates().length > 0) { return; } // bloqueado enquanto houver duplicados
      var k;
      for (k in KEYBIND_DRAFT) { KEYBINDS[k] = KEYBIND_DRAFT[k]; }
      saveKeybinds();
      applyKeybindLabels();
      capturingAction = null;
      renderKeybindList();
      setOptMsg(TXT('kb.saved'));
    });
  }
  var reset = document.getElementById('opt-reset');
  if (reset) {
    reset.addEventListener('click', function () {
      var k;
      for (k in DEFAULT_KEYBINDS) { KEYBINDS[k] = DEFAULT_KEYBINDS[k]; }
      saveKeybinds();
      applyKeybindLabels();
      resetKeybindDraft();
      capturingAction = null;
      renderKeybindList();
      setOptMsg(TXT('kb.restored'));
    });
  }
  var back = document.getElementById('opt-back');
  if (back) { back.addEventListener('click', function () { showScreen(optionsReturnTo); }); }

  var vbtn = document.getElementById('victory-menu-btn');
  if (vbtn) {
    vbtn.addEventListener('click', function () {
      // Voltar ao menu = recarregar a pagina (a partida e recriada do zero);
      // a senha desta sessao fica salva, entao cai direto na tela titulo.
      window.location.reload();
    });
  }
  // Clique de UI (botoes de menu, cards, teclas do remapeamento, telas de comandos).
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('.menu-btn, .select-card, .kb-key, #pause-btn, #guide-screen') : null;
    if (el && !el.disabled) { playSfx('click'); }
  }, true);
  window.addEventListener('keydown', onMenuKeyDown);
  applyKeybindLabels();
}

// Tela de vitoria do time vencedor (so quando TODOS do time chegaram - ver
// checkMatchWinner).
function showVictoryScreen(team) {
  var el = document.getElementById('victory-screen');
  if (!el) { return; }
  var mine = team === G.player.team;
  var status = countTeamStatus(team);
  var teamName = TXT(team === 'teamA' ? 'team.a' : 'team.b');
  var titleEl = document.getElementById('victory-title');
  var subEl = document.getElementById('victory-sub');
  if (titleEl) { titleEl.textContent = TXT(mine ? 'victory.win' : 'victory.lose'); }
  if (subEl) { subEl.textContent = TXT('victory.sub', teamName, status.finished, status.total); }
  el.className = mine ? 'victory-win' : 'victory-lose';
  el.hidden = false;
}

/* ================================= TELA DE SENHA ============================= */
// O jogo (init/animate) so comeca DEPOIS da senha certa - ate la, fica so a
// tela de senha visivel (ver #password-gate em index.html/style.css), o
// canvas do Three.js nem chega a ser inicializado.
var GAME_PASSWORD = '20221';

function setupPasswordGate() {
  var gate = document.getElementById('password-gate');
  var input = document.getElementById('password-input');
  var submitBtn = document.getElementById('password-submit');
  var errorMsg = document.getElementById('password-error');
  var started = false;

  function tryStart() {
    if (started) { return; }
    if (input.value === GAME_PASSWORD) {
      started = true;
      gate.style.display = 'none';
      try { window.sessionStorage.setItem('axie_pw_ok', '1'); } catch (e) {}
      // Fluxo: senha -> tela titulo -> menu principal -> (Single Player)
      // selecao de personagem -> Start -> countdown -> jogo. O jogo em si
      // (init/animate) so comeca em startMatch.
      showScreen('title-screen');
      startMusic();
    } else {
      errorMsg.textContent = TXT('pw.err');
      errorMsg.className = 'visible';
      input.value = '';
      input.focus();
    }
  }

  submitBtn.addEventListener('click', tryStart);
  input.addEventListener('keydown', function (e) {
    // Checa key/keyCode/which juntos (alguns teclados/IMEs mobile so
    // preenchem um desses no evento) pra garantir que Enter sempre funcione.
    if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) { tryStart(); }
  });
  // Voltando ao menu depois de uma partida (recarrega a pagina, ver
  // showVictoryScreen) a senha ja digitada nesta sessao nao e pedida de novo.
  var alreadyUnlocked = false;
  try { alreadyUnlocked = window.sessionStorage.getItem('axie_pw_ok') === '1'; } catch (e) {}
  if (alreadyUnlocked) {
    started = true;
    gate.style.display = 'none';
    showScreen('title-screen');
    startMusic(); // se o navegador bloquear, toca no primeiro toque/tecla
    return;
  }
  input.focus();
}

window.addEventListener('load', function () {
  setupMenus();
  setupPasswordGate();
});
