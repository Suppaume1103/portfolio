/**
 * Nintendo-Style Interactive Engine (Fixed Layout & Visuals)
 * Suppaume (@Suppaume1103)
 */

// --- Web Audio API UI Sound Synthesizer (Nintendo Switch Inspired) ---
let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Nintendo Switch Joy-Con "Click / Snap" Sound
function playSwitchClick() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.045);

    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch (e) {}
}

// Joy-Con Select "Pip" Sound
function playSwitchSelect() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch (e) {}
}

// Playful "Coin / Success" Jingle
function playCoinSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (freq, delay, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);
      gain.gain.setValueAtTime(0.2, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + duration);
    };

    playTone(987.77, 0, 0.08);    // B5
    playTone(1318.51, 0.08, 0.28); // E6
  } catch (e) {}
}

// --- Project Data Store (With Visual Banners) ---
const projectsData = {
  'dot-sticker-chat': {
    title: {
      ja: 'DOT STICKER CHAT',
      en: 'DOT STICKER CHAT'
    },
    subtitle: {
      ja: '16×16ドット絵を描いて広場で共有！時間で失効＆育つオンライン空間',
      en: '16x16 Pixel Art Studio with Shared Live Plaza & Growing Stickers'
    },
    category: 'fullstack',
    badge: 'マルチプレイ Web',
    themeColor: '#FF3C28',
    lang: 'React / TS / Node.js',
    stars: 0,
    githubUrl: 'https://github.com/Suppaume1103/dot-sticker-chat',
    // Visual Banner SVG
    bannerSvg: `
      <div class="w-full h-36 bg-gradient-to-tr from-rose-500 via-orange-400 to-amber-300 flex items-center justify-center relative overflow-hidden rounded-t-[22px]">
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:12px_12px]"></div>
        <div class="relative z-10 flex items-center gap-3 bg-white/95 px-4 py-2 rounded-2xl shadow-lg border border-white">
          <span class="text-2xl">🎨</span>
          <div class="flex flex-col">
            <span class="text-xs font-black text-slate-800 tracking-wider">PIXEL PLAZA 16×16</span>
            <span class="text-[10px] font-bold text-rose-500">Live Socket.IO Sync</span>
          </div>
        </div>
      </div>
    `,
    summary: {
      ja: 'お題に合わせて16×16のドット絵を描き、みんなが集まるリアルタイム広場やチャットで流通！一定時間で一斉失効する儚さと、他プレイヤーの保存数（お気に入り）に応じてステッカーがぐんぐん育つ、あそび心満載のフルスタックWebアプリケーションです。',
      en: 'A delightfully playful online platform where users craft 16x16 pixel stickers, share them in an interactive live plaza, and chat in real-time. Features dynamic size growth based on popularity and timed lifecycle expiration.'
    },
    highlights: [
      {
        title: { ja: 'React + Canvas 自作ドット絵スタジオ', en: 'Custom 16x16 Pixel Studio' },
        desc: { ja: '16×16グリッドのお絵描きCanvas、カラーパレット、取り消し履歴、アニメーションプレビューをReact + TypeScriptで完全自作！', en: 'Bespoke canvas drawing engine with color palettes, undo history, and responsive UI built from scratch in React + TypeScript.' }
      },
      {
        title: { ja: 'Socket.IO による低遅延リアルタイム広場', en: 'Low-Latency Socket.IO Plaza' },
        desc: { ja: '広場でのステッカー配置や移動、オープンチャットメッセージをWebSocket（Socket.IO）でリアルタイムに同期・ブロードキャスト。', en: 'Instant WebSocket broadcasting for live sticker placement, room interactions, and synchronized multi-client state.' }
      },
      {
        title: { ja: '時限失効cron & PostgreSQL & Render', en: 'Lifecycle Cron & PostgreSQL on Render' },
        desc: { ja: 'Node.js/ExpressとPostgreSQLによる堅牢なDB設計。定期バッチ処理（cron）によるステッカーの時限ライフサイクル管理とサイズ成長アルゴリズムを導入。', en: 'PostgreSQL relational schema hosted on Render, automated lifecycle cron jobs for sticker expiration and dynamic scaling algorithms.' }
      }
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'Socket.IO', 'PostgreSQL', 'HTML5 Canvas', 'Render', 'REST API'],
    architecture: `
┌────────────────────────┐         ┌────────────────────────┐
│  React + Canvas Client │ <=====> │ Node.js Express Server │
│  (16x16 Studio & Plaza)│  Socket │ (WebSocket Broadcast)  │
└────────────────────────┘   .IO   └──────────┬─────────────┘
                                              │
                         ┌────────────────────┼────────────────────┐
                         ▼                                         ▼
              ┌─────────────────────┐                   ┌─────────────────────┐
              │ PostgreSQL Database │                   │ Cron Lifecycle Task │
              │ (Sticker / Chat)    │                   │ (Decay & Growth)    │
              └─────────────────────┘                   └─────────────────────┘
    `
  },
  'tea-pillar-bowling': {
    title: {
      ja: '茶柱立ち 3D (Tea Bowl Physics)',
      en: 'Tea Bowl & Standing Tea Stalk 3D'
    },
    subtitle: {
      ja: '和の縁起物と剛体物理演算の融合！Three.js × Cannon-es シミュレーション',
      en: 'Serene Japanese Auspicious Tea Stalk Simulation with Rigid-body Physics'
    },
    category: '3d',
    badge: '3D 物理演算',
    themeColor: '#00D26A',
    lang: 'TypeScript / Three.js',
    stars: 0,
    githubUrl: 'https://github.com/Suppaume1103/CGModeling-FinalProject-Bowling',
    // Visual Banner SVG
    bannerSvg: `
      <div class="w-full h-36 bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-300 flex items-center justify-center relative overflow-hidden rounded-t-[22px]">
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:12px_12px]"></div>
        <div class="relative z-10 flex items-center gap-3 bg-white/95 px-4 py-2 rounded-2xl shadow-lg border border-white">
          <span class="text-2xl">🍵</span>
          <div class="flex flex-col">
            <span class="text-xs font-black text-slate-800 tracking-wider">MATCHA & PHYSICS</span>
            <span class="text-[10px] font-bold text-emerald-600">Cannon-es Rigid Body</span>
          </div>
        </div>
      </div>
    `,
    summary: {
      ja: '日本の伝統的な幸運のしるし「茶碗の中のお茶に茶柱が立っている状態」を、Three.jsと剛体物理演算エンジンCannon-esでリアルタイム3D再現！数学的ノイズ（Simplex Noise）による液面の波動表現と、パラメータを自在にいじれるGUIデバッグを搭載。',
      en: 'A high-fidelity 3D WebGL physics simulation capturing the serene Japanese auspicious phenomenon of a tea stalk standing upright in a matcha bowl. Built with Three.js, Cannon-es rigid-body physics, and Simplex Noise fluid ripples.'
    },
    highlights: [
      {
        title: { ja: 'Cannon-es 剛体物理 & 浮力シミュレーション', en: 'Rigid-body Physics & Buoyancy' },
        desc: { ja: '茶柱（円柱剛体）に対する液体浮力、抗力、重心バランスを物理エンジンCannon-esで計算。自然に直立する挙動をシミュレート。', en: 'Accurate buoyancy and drag physics simulated via Cannon-es, allowing the cylindrical tea stalk to naturally balance and stand upright.' }
      },
      {
        title: { ja: 'Simplex Noise による水面波紋生成', en: 'Simplex Noise Liquid Ripple' },
        desc: { ja: 'プロシージャルノイズを活用し、お茶の液面に繊細な波立ちと光の反射（Specular / Fresnel）をリアルタイム計算。', en: 'Procedural wave synthesis using Simplex Noise to recreate delicate surface disturbances and photorealistic specular reflections.' }
      },
      {
        title: { ja: 'lil-gui によるインタラクティブパラメータ制御', en: 'Real-time Parameter Tuning with lil-gui' },
        desc: { ja: 'ライティングの強さ、お茶の濁度・屈折率、茶柱の物理定数をブラウザ上でリアルタイムに微調整できるGUIデバッグ環境を統合。', en: 'Integrated lil-gui runtime panel for dynamically tuning lighting, fluid turbidity, refractive index, and gravity constants.' }
      }
    ],
    techStack: ['TypeScript', 'Three.js', 'Cannon-es', 'Vite', 'Simplex-Noise', 'Tween.js', 'lil-gui', 'WebGL', 'GLSL / Shaders'],
    architecture: `
┌────────────────────────┐        ┌────────────────────────┐
│  Three.js Render Loop  │ <====> │ Cannon-es Physics      │
│  (Camera, Mesh, Light) │ Step() │ (Rigid Body & Buoyancy)│
└──────────┬─────────────┘        └────────────────────────┘
           │
     ┌─────┴──────────────────┐
     ▼                        ▼
┌────────────────────────┐ ┌────────────────────────┐
│ Simplex Noise Ripple   │ │ lil-gui Runtime Panel  │
│ Procedural Fluid Mesh  │ │ Realtime Parameter Tuner│
└────────────────────────┘ └────────────────────────┘
    `
  },
  'mood-bridge': {
    title: {
      ja: 'Mood-Bridge 映画レコメンダー',
      en: 'Mood-Bridge Movie Recommender'
    },
    subtitle: {
      ja: 'キブンの架け橋！感情NLP × TF-IDF × LLM 知能型推薦エンジン',
      en: 'Intelligent Movie Recommender synthesizing NLP, TF-IDF & LLM'
    },
    category: 'ai',
    badge: '知能情報処理',
    themeColor: '#00C3E3',
    lang: 'Java 25 / Lucene',
    stars: 0,
    githubUrl: 'https://github.com/Suppaume1103/Mood-Bridge-Movie-Recommender',
    // Visual Banner SVG
    bannerSvg: `
      <div class="w-full h-36 bg-gradient-to-tr from-cyan-600 via-blue-500 to-indigo-300 flex items-center justify-center relative overflow-hidden rounded-t-[22px]">
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:12px_12px]"></div>
        <div class="relative z-10 flex items-center gap-3 bg-white/95 px-4 py-2 rounded-2xl shadow-lg border border-white">
          <span class="text-2xl">🎬</span>
          <div class="flex flex-col">
            <span class="text-xs font-black text-slate-800 tracking-wider">AFFECTIVE CINEMA</span>
            <span class="text-[10px] font-bold text-sky-600">Lucene TF-IDF & OpenAI</span>
          </div>
        </div>
      </div>
    `,
    summary: {
      ja: 'ユーザーの「今の気分」や言葉にしづらい感情から、TMDBの膨大な映画レビューやあらすじを形態素解析・文分割・TF-IDFベクトル空間モデルで高速マッチング！さらにOpenAI APIとのハイブリッド推論で、最高の1本をパーソナライズ推薦してくれる知能システム。',
      en: 'An intelligent recommendation system that bridges user emotions with cinema. Leveraging Apache Lucene (TF-IDF), Kuromoji morphological analysis, Apache OpenNLP sentence splitting, TMDB API, and OpenAI API to deliver personalized film discovery.'
    },
    highlights: [
      {
        title: { ja: '最新 Java 25 & Maven アーキテクチャ', en: 'Modern Java 25 & Maven Architecture' },
        desc: { ja: '最新のJava 25ランタイムを採用。OkHttp3による非同期TMDB API通信とGsonによる高速JSONパースパイプラインを構築。', en: 'Built on Java 25 with OkHttp3 for asynchronous TMDB API integration and Gson for low-latency JSON pipelines.' }
      },
      {
        title: { ja: '多言語NLP & TF-IDFベクトル空間検索', en: 'Bilingual NLP & Lucene TF-IDF Search' },
        desc: { ja: 'Apache Lucene 9とKuromoji（日本語形態素解析）、EnglishAnalyzer（TMDB英語レビュー解析）をハイブリッド運用。Apache OpenNLPによる文分割で文脈の感情スコアを精密抽出。', en: 'Dual analyzer engine: Kuromoji for Japanese tokenization and EnglishAnalyzer for TMDB reviews, combined with OpenNLP sentence detection.' }
      },
      {
        title: { ja: 'OpenAI API による感情マッチング強化', en: 'OpenAI LLM Hybrid Reranking' },
        desc: { ja: 'TF-IDFによる高速な候補絞り込みと、OpenAI APIによるニュアンス解釈を組み合わせ、高精度かつ文脈に即したレコメンド理由を生成。', en: 'Two-stage retrieval: rapid candidate filtering via TF-IDF vector ranking followed by LLM-driven affective nuance reranking.' }
      }
    ],
    techStack: ['Java 25', 'Apache Lucene 9', 'Kuromoji', 'Apache OpenNLP', 'OpenAI API', 'TMDB API', 'OkHttp3', 'Gson', 'Maven'],
    architecture: `
┌─────────────────┐       ┌──────────────────────┐
│  User Mood /    │ ────> │ OpenNLP & Kuromoji   │
│  Emotional Query│       │ Morphological Filter │
└─────────────────┘       └──────────┬───────────┘
                                     │
                                     ▼
┌─────────────────┐       ┌──────────────────────┐
│ TMDB API        │ ────> │ Apache Lucene TF-IDF │
│ Reviews / Data  │       │ Vector Similarity    │
└─────────────────┘       └──────────┬───────────┘
                                     │ Candidate Pool
                                     ▼
                          ┌──────────────────────┐
                          │ OpenAI API Reranker  │ ───> Tailored Movie
                          │ & Context Synthesizer│      Recommendations!
                          └──────────────────────┘
    `
  }
};

// --- Localization Strings ---
const i18n = {
  ja: {
    navProjects: 'つくったもの',
    navTech: 'そうび・とくぎ',
    navAbout: 'プレイヤー情報',
    navContact: 'コンタクト',
    statusAvailable: 'オンライン',
    heroTag: 'PLAYFUL × INTELLIGENCE × ENGINEERING',
    heroTitlePrefix: 'あそび心を、',
    heroTitleHighlight: 'テクノロジーでカタチに。',
    heroDesc: '知能情報処理（NLP・TF-IDF・LLM）・リアルタイムWebSocket・WebGL/3D物理演算まで。動かして楽しい、触って心地よいシステムを創るエンジニアリング。',
    btnExplore: 'つくったものをあそぶ',
    btnGithub: 'GitHub をのぞく',
    statsRepos: '公開タイトル',
    statsTechs: '習得スキル',
    statsCommits: 'CPS Lab 拠点',
    sectionWorksTag: 'FEATURED SOFTWARES',
    sectionWorksTitle: 'あそびと技術の実験室',
    sectionWorksDesc: 'GitHubに公開中の主要タイトル。アーキテクチャからUI・物理演算・NLPモデルまで、ワクワクする体験を目指して実装しています。',
    filterAll: 'ぜんぶ',
    filterFullStack: 'マルチプレイ Web',
    filter3D: '3D & 物理演算',
    filterAI: '知能処理 & NLP',
    viewDetails: 'くわしく見る',
    sourceCode: 'ソースコード',
    sectionTechTag: 'ABILITIES & SKILLS',
    sectionTechTitle: 'そうび & 得意わざ',
    sectionTechDesc: 'アルゴリズムの実装からフロントエンド・インフラまで、目的に応じて最適な技術を選定・統合します。',
    techCatLanguages: '言語スキル (Languages)',
    techCatAI: '知能情報処理 & NLP',
    techCatFrontend: 'フロントエンド & UI',
    techCatBackend: 'バックエンド & 通信',
    techCat3D: '3D & 物理シミュレーション',
    techCatInfra: 'データベース & ツール',
    sectionAboutTag: 'PLAYER PROFILE',
    sectionAboutTitle: 'CPS Lab × モノづくり精神',
    sectionAboutDesc: 'サイバーフィジカルシステム（CPS）や知能処理を背景に持ち、理論の理解とモダンWebへの実装を両立。「枯れた技術の水平思考」と「触って気持ちいいUI設計」を大切にしています。',
    aboutPoints: [
      {
        title: '理論をあそびへ変える実装力',
        desc: '情報検索の古典的アルゴリズム（TF-IDF）と最新LLMの融合、剛体物理学のWebGL実装など、理論を実際に動くアプリケーションへと落とし込みます。'
      },
      {
        title: '設計第一のアーキテクチャ',
        desc: 'REST API / WebSocketのプロトコル策定、DBスキーマ設計、クラス責務の分離、ワイヤーフレーム作成など、開発前の設計を徹底します。'
      },
      {
        title: '触って心地よい手触りの追求',
        desc: '低遅延なリアルタイム通信、手触りの良いCanvasドット絵エディタ、滑らかな3Dインタラクションなど、使う人が心地よいと感じるUI/UXにこだわります。'
      }
    ],
    contactTitle: 'いっしょに新しいあそびを創りませんか？',
    contactDesc: '共同開発、技術交流、プロジェクトに関するご相談はお気軽にご連絡ください！',
    contactEmailBtn: 'メールアドレスをコピー',
    copiedMsg: 'コインをゲット！アドレスをコピーしました ★',
    footerRights: 'All rights reserved. Designed with Nintendo Spirit.'
  },
  en: {
    navProjects: 'Works',
    navTech: 'Skills',
    navAbout: 'Player Info',
    navContact: 'Contact',
    statusAvailable: 'Online',
    heroTag: 'PLAYFUL × INTELLIGENCE × ENGINEERING',
    heroTitlePrefix: 'Shaping Playful Ideas into',
    heroTitleHighlight: 'High-Performance Reality.',
    heroDesc: 'Bridging the realms of Intelligent NLP/Search, Real-time WebSockets, and WebGL Physics. Dedicated to crafting software that feels responsive, lively, and wonderfully tactile.',
    btnExplore: 'Explore Creations',
    btnGithub: 'GitHub Profile',
    statsRepos: 'Titles Published',
    statsTechs: 'Technologies',
    statsCommits: 'CPS Lab Base',
    sectionWorksTag: 'FEATURED SOFTWARES',
    sectionWorksTitle: 'Playful Lab & Signature Works',
    sectionWorksDesc: 'Key open-source projects on GitHub, crafted with rigorous architecture and lively interactivity.',
    filterAll: 'All',
    filterFullStack: 'Multiplayer Web',
    filter3D: '3D & Physics',
    filterAI: 'AI & NLP',
    viewDetails: 'Read Details',
    sourceCode: 'Source Code',
    sectionTechTag: 'ABILITIES & SKILLS',
    sectionTechTitle: 'Abilities & Skill Tree',
    sectionTechDesc: 'From mathematical models and search algorithms to reactive frontend interfaces and cloud deployments.',
    techCatLanguages: 'Core Languages',
    techCatAI: 'AI, Search & NLP',
    techCatFrontend: 'Frontend & UI Engineering',
    techCatBackend: 'Backend & Real-time',
    techCat3D: '3D Graphics & Physics',
    techCatInfra: 'Databases & Infrastructure',
    sectionAboutTag: 'PLAYER PROFILE',
    sectionAboutTitle: 'CPS Lab × Creative Craft',
    sectionAboutDesc: 'Rooted in Cyber-Physical Systems (CPS) research at Tokyo Denki University. Believing in robust design and tactile feedback that sparks joy.',
    aboutPoints: [
      {
        title: 'Harmonizing Theory & Practice',
        desc: 'Unifying foundational information retrieval (TF-IDF) with modern LLM reasoning, and bridging rigid-body mechanics into high-frame-rate WebGL.'
      },
      {
        title: 'Design-First Architecture',
        desc: 'Rigorous attention to REST API / WebSocket contract definitions, strict DB schema normalization, clean class boundaries, and intuitive wireframes.'
      },
      {
        title: 'Obsession with Tactile UX',
        desc: 'Zero-latency feel in real-time communication, tactile Canvas manipulation, and micro-interactions designed to leave an impression.'
      }
    ],
    contactTitle: "Let's build something playful together!",
    contactDesc: 'Available for collaboration, software engineering quests, and technical discussions.',
    contactEmailBtn: 'Copy Email Address',
    copiedMsg: 'Coin Collected! Email copied to clipboard ★',
    footerRights: 'All rights reserved. Designed with Nintendo Spirit.'
  }
};

let currentLang = 'ja';

// --- Initialize App on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initSoundToggle();
  initMobileMenu();
  initNintendoThreeHero();
  initI18n();
  initProjects();
  initModals();
  initFilter();
  initCopy();
  initGithubStats();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// --- Sound Effects Toggle ---
function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const icon = soundBtn.querySelector('i');
    if (soundEnabled) {
      soundBtn.classList.remove('opacity-40');
      soundBtn.title = 'Sound Effects: ON';
      playSwitchClick();
    } else {
      soundBtn.classList.add('opacity-40');
      soundBtn.title = 'Sound Effects: OFF';
    }
  });

  // Attach click sound to buttons & links
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .filter-btn, .mobile-nav-link')) {
      playSwitchClick();
    }
  });
}

// --- Mobile Navigation Drawer Toggle ---
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (!menuBtn || !menu) return;

  const toggleMenu = (forceClose = false) => {
    const isOpen = forceClose ? false : !menu.classList.contains('open');
    if (isOpen) {
      menu.classList.add('open');
      if (iconOpen) iconOpen.classList.add('hidden');
      if (iconClose) iconClose.classList.remove('hidden');
    } else {
      menu.classList.remove('open');
      if (iconOpen) iconOpen.classList.remove('hidden');
      if (iconClose) iconClose.classList.add('hidden');
    }
  };

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target) && menu.classList.contains('open')) {
      toggleMenu(true);
    }
  });
}

// --- Three.js Playful 3D Toy Canvas (Separated in its own right-column container) ---
function initNintendoThreeHero() {
  const container = document.getElementById('hero-canvas-container');
  if (!container || !window.THREE) return;

  const width = container.clientWidth || 320;
  const height = container.clientHeight || 320;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 18;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.id = 'hero-canvas';
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Group to rotate
  const group = new THREE.Group();
  scene.add(group);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
  dirLight.position.set(10, 20, 15);
  scene.add(dirLight);

  // 1. Center Hero Block (Mario/Switch Question Block Style)
  const cubeGeo = new THREE.BoxGeometry(4.2, 4.2, 4.2);
  const cubeMat = new THREE.MeshStandardMaterial({
    color: 0xE60012, // Nintendo Red
    roughness: 0.25,
    metalness: 0.1
  });
  const centerCube = new THREE.Mesh(cubeGeo, cubeMat);
  group.add(centerCube);

  // Outline for pop look
  const edges = new THREE.EdgesGeometry(cubeGeo);
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
  const wireCube = new THREE.LineSegments(edges, lineMat);
  centerCube.add(wireCube);

  // 2. Orbiting Floating Joy-Con Color Spheres & Toys
  const toysGroup = new THREE.Group();
  group.add(toysGroup);

  const toyColors = [
    0x00C3E3, // Joy-Con Neon Blue
    0xFF3C28, // Joy-Con Neon Red
    0xFFB300, // Super Star Yellow
    0x00D26A, // Luigi Green
    0x8C44FF  // Purple
  ];

  const floatingMeshes = [];
  const toyCount = 14;

  for (let i = 0; i < toyCount; i++) {
    const isBox = Math.random() > 0.5;
    const size = 0.7 + Math.random() * 0.7;
    const geo = isBox ? new THREE.BoxGeometry(size, size, size) : new THREE.SphereGeometry(size * 0.6, 16, 16);
    
    const mat = new THREE.MeshStandardMaterial({
      color: toyColors[i % toyColors.length],
      roughness: 0.3,
      metalness: 0.15
    });

    const mesh = new THREE.Mesh(geo, mat);
    const radius = 5.5 + Math.random() * 5.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    mesh.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );

    mesh.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.04,
      rotSpeedY: (Math.random() - 0.5) * 0.04,
      initialY: mesh.position.y,
      floatSpeed: 1 + Math.random() * 2,
      floatOffset: Math.random() * Math.PI * 2
    };

    toysGroup.add(mesh);
    floatingMeshes.push(mesh);
  }

  // Pointer Interaction
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    targetRotationY = (mouseX / window.innerWidth) * 1.5;
    targetRotationX = (mouseY / window.innerHeight) * 1.5;
  }, { passive: true });

  window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const touchX = event.touches[0].clientX - centerX;
      const touchY = event.touches[0].clientY - centerY;
      targetRotationY = (touchX / window.innerWidth) * 1.2;
      targetRotationX = (touchY / window.innerHeight) * 1.2;
    }
  }, { passive: true });

  // Window Resize
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth || 320;
    const newHeight = container.clientHeight || 320;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    centerCube.rotation.y += 0.012;
    centerCube.rotation.x = Math.sin(time * 1.2) * 0.2;

    const scale = 1 + Math.sin(time * 2.5) * 0.035;
    centerCube.scale.set(scale, scale, scale);

    toysGroup.rotation.y -= 0.007;

    floatingMeshes.forEach(mesh => {
      mesh.rotation.x += mesh.userData.rotSpeedX;
      mesh.rotation.y += mesh.userData.rotSpeedY;
      mesh.position.y = mesh.userData.initialY + Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.45;
    });

    group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
    group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

    renderer.render(scene, camera);
  }

  animate();
}

// --- Multi-language (i18n) Engine ---
function initI18n() {
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (!langToggleBtn) return;

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ja' ? 'en' : 'ja';
    langToggleBtn.querySelector('.lang-label').textContent = currentLang === 'ja' ? 'EN' : 'JA';
    applyLanguage(currentLang);
  });

  applyLanguage('ja');
}

function applyLanguage(lang) {
  const dict = i18n[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  renderProjectCards(lang);
  renderAboutPoints(lang);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- Render Project Cards (With Visual Cover Banners) ---
function renderProjectCards(lang) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const categoryIcons = {
    'fullstack': '<i data-lucide="layers" class="w-4 h-4 text-[#FF3C28]"></i>',
    '3d': '<i data-lucide="box" class="w-4 h-4 text-[#00D26A]"></i>',
    'ai': '<i data-lucide="cpu" class="w-4 h-4 text-[#00C3E3]"></i>'
  };

  const projectKeys = ['dot-sticker-chat', 'tea-pillar-bowling', 'mood-bridge'];
  
  container.innerHTML = projectKeys.map((key) => {
    const p = projectsData[key];
    const icon = categoryIcons[p.category];

    const techPills = p.techStack.slice(0, 4).map(t => 
      `<span class="px-2.5 py-1 text-[11px] sm:text-xs rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200 shrink-0">${t}</span>`
    ).join('');

    return `
      <div class="nintendo-card flex flex-col justify-between group overflow-hidden project-card" data-category="${p.category}">
        <div>
          <!-- Visual Software Cover Banner (Image/Graphic) -->
          ${p.bannerSvg}

          <div class="p-5 sm:p-6">
            <!-- Header Badges -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-7 h-7 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  ${icon}
                </div>
                <span class="text-xs font-black uppercase tracking-wider text-slate-600 truncate">${p.badge}</span>
              </div>
              <span class="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-black text-white shrink-0 shadow-sm" style="background-color: ${p.themeColor}">
                ${p.lang}
              </span>
            </div>

            <!-- Title & Subtitle -->
            <h3 class="text-xl font-black text-slate-900 group-hover:text-[#E60012] transition-colors mb-1.5 tracking-tight leading-snug">
              ${p.title[lang]}
            </h3>
            <p class="text-xs sm:text-sm font-bold text-slate-500 mb-3 leading-relaxed">
              ${p.subtitle[lang]}
            </p>

            <!-- Summary Body -->
            <p class="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
              ${p.summary[lang]}
            </p>
          </div>
        </div>

        <div class="px-5 pb-5 sm:px-6 sm:pb-6">
          <!-- Tech Stack Tags -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${techPills}
            ${p.techStack.length > 4 ? `<span class="px-2 py-0.5 text-xs rounded-full text-slate-500 font-bold">+${p.techStack.length - 4}</span>` : ''}
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
            <button onclick="openModal('${key}')" class="flex-1 btn-nintendo-red py-3 px-4 text-xs font-black flex items-center justify-center gap-2">
              <i data-lucide="play" class="w-4 h-4 fill-current"></i>
              <span>${i18n[lang].viewDetails}</span>
            </button>
            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-nintendo-white p-3 rounded-full flex items-center justify-center shrink-0" title="GitHub Repository">
              <i data-lucide="github" class="w-4 h-4"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- Render About Points ---
function renderAboutPoints(lang) {
  const container = document.getElementById('about-points-container');
  if (!container) return;

  const points = i18n[lang].aboutPoints;
  const icons = ['gamepad-2', 'cpu', 'sparkles'];
  const colors = ['#E60012', '#00C3E3', '#FFB300'];

  container.innerHTML = points.map((p, idx) => `
    <div class="nintendo-card p-5 sm:p-6 flex flex-col justify-start">
      <div class="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 shrink-0 shadow-sm" style="background-color: ${colors[idx % colors.length]}18; color: ${colors[idx % colors.length]}">
        <i data-lucide="${icons[idx % icons.length]}" class="w-5 h-5"></i>
      </div>
      <h4 class="text-base font-black text-slate-900 mb-1.5">${p.title}</h4>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">${p.desc}</p>
    </div>
  `).join('');
}

// --- Interactive Project Detail Modal ---
function initModals() {
  const overlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

window.openModal = function(key) {
  playSwitchSelect();
  const p = projectsData[key];
  if (!p) return;

  const overlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-dynamic-content');
  if (!overlay || !modalBody) return;

  const lang = currentLang;

  const highlightsHtml = p.highlights.map(h => `
    <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border-2 border-slate-100">
      <h5 class="text-xs sm:text-sm font-black text-slate-900 mb-1 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${p.themeColor}"></span>
        ${h.title[lang]}
      </h5>
      <p class="text-xs text-slate-600 leading-relaxed">${h.desc[lang]}</p>
    </div>
  `).join('');

  const techStackBadges = p.techStack.map(t => 
    `<span class="px-3 py-1 text-xs rounded-full font-bold bg-slate-100 text-slate-800 border border-slate-200">${t}</span>`
  ).join('');

  modalBody.innerHTML = `
    <!-- Modal Header -->
    <div class="mb-5 sm:mb-6 pr-12 sm:pr-0">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span class="px-3 py-1 rounded-full text-xs font-black text-white shadow-sm" style="background-color: ${p.themeColor}">${p.badge}</span>
        <span class="text-xs text-slate-500 font-bold">${p.lang}</span>
      </div>
      <h3 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">${p.title[lang]}</h3>
      <p class="text-xs sm:text-sm font-bold text-slate-500">${p.subtitle[lang]}</p>
    </div>

    <!-- Summary -->
    <div class="mb-5 sm:mb-6">
      <h4 class="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
        ${lang === 'ja' ? 'タイトル紹介' : 'Game Overview'}
      </h4>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 font-medium">
        ${p.summary[lang]}
      </p>
    </div>

    <!-- Key Technical Highlights -->
    <div class="mb-5 sm:mb-6">
      <h4 class="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
        ${lang === 'ja' ? 'ここがすごい！主要技術ポイント' : 'Technical Highlights'}
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        ${highlightsHtml}
      </div>
    </div>

    <!-- Architecture ASCII Diagram -->
    <div class="mb-5 sm:mb-6">
      <h4 class="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
        ${lang === 'ja' ? 'システム構成ダイアグラム' : 'System Architecture'}
      </h4>
      <div class="rounded-2xl bg-[#1E232A] p-3 sm:p-4 border-2 border-slate-800 overflow-x-auto shadow-inner">
        <pre class="text-[10px] sm:text-xs font-mono text-[#00C3E3] leading-tight whitespace-pre">${p.architecture.trim()}</pre>
      </div>
    </div>

    <!-- Tech Stack Matrix -->
    <div class="mb-6">
      <h4 class="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
        ${lang === 'ja' ? 'そうびした技術・ライブラリ' : 'Technologies & Libraries'}
      </h4>
      <div class="flex flex-wrap gap-1.5 sm:gap-2">
        ${techStackBadges}
      </div>
    </div>

    <!-- Action Links -->
    <div class="flex items-center justify-end gap-3 pt-4 border-t-2 border-slate-100">
      <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-nintendo-red px-6 py-3 text-xs font-black flex items-center justify-center gap-2">
        <i data-lucide="github" class="w-4 h-4"></i>
        <span>${lang === 'ja' ? 'GitHub リポジトリをプレイ' : 'View on GitHub'}</span>
      </a>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.closeModal = function() {
  playSwitchClick();
  const overlay = document.getElementById('project-modal');
  if (overlay) {
    overlay.classList.remove('active');
  }
  document.body.style.overflow = 'auto';
};

// --- Projects Filtering ---
function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#E60012]', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.add('bg-[#E60012]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700');

      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.project-card');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- Clipboard Copy ---
function initCopy() {
  const emailBtn = document.getElementById('copy-email-btn');
  if (!emailBtn) return;

  emailBtn.addEventListener('click', () => {
    const email = 'Suppaume1103@github.com';
    navigator.clipboard.writeText(email).then(() => {
      playCoinSound();
      showToast(i18n[currentLang].copiedMsg);
      if (window.confetti) {
        window.confetti({
          particleCount: 50,
          spread: 60,
          colors: ['#E60012', '#00C3E3', '#FFB300', '#00D26A'],
          origin: { y: 0.85 }
        });
      }
    });
  });
}

function showToast(msg) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 px-5 py-3.5 rounded-full bg-[#E60012] text-white text-xs sm:text-sm font-black shadow-2xl flex items-center justify-center sm:justify-start gap-2 transform translate-y-10 opacity-0 transition-all duration-300';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-yellow-300 shrink-0"></i> <span>${msg}</span>`;
  if (window.lucide) window.lucide.createIcons();

  toast.classList.remove('translate-y-10', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 2600);
}

// --- Live GitHub Stats via API ---
function initGithubStats() {
  fetch('https://api.github.com/users/Suppaume1103')
    .then(res => res.json())
    .then(data => {
      if (data && data.public_repos !== undefined) {
        const repoStat = document.getElementById('stat-public-repos');
        if (repoStat) repoStat.textContent = data.public_repos;
      }
    })
    .catch(() => {});
}
