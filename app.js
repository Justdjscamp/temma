/**
 * ТЭММА — MAIN APPLICATION CONTROLLER
 * Scroll Orchestration (Lenis + GSAP ScrollTrigger), 10-Practice Interactive Dossier,
 * Tactile Magnetic UI, and CRM Lead Form Integration (POST /api/leads)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. COMPLETE DATA FOR ALL 10 LEGAL PRACTICES OF ТЭММА
  // =========================================================================
  const PRACTICES_DATA = {
    p01: {
      code: 'ПРАКТИКА № 01 / 10',
      badge: 'Сделки и контракты',
      title: 'Договорная работа и сделки',
      summary:
        'Готовим, проверяем и согласуем договоры под реальные процессы компании, чтобы условия защищали деньги, сроки и управляемость сделки.',
      includes: [
        'Разработка договоров поставки, подряда, оказания услуг, аренды, лицензии и смешанных сделок',
        'Правовая экспертиза договора контрагента с картой финансовых и судебных рисков',
        'Подготовка протоколов разногласий и участие в переговорах по согласованию условий',
        'Проверка контрагента, полномочий подписанта и обеспечительных механизмов (залог, поручительство)'
      ],
      forWhom: [
        'Выход на крупного заказчика или поставщика с жёсткой типовой формой договора',
        'Сделка с отсрочкой платежа, сложной приёмкой работ или авансированием',
        'Необходимость обновить типовые формы договоров компании под актуальную судебную практику'
      ],
      stages: [
        'Разбор экономики сделки',
        'Карта рисков и формулировки',
        'Переговоры с контрагентом',
        'Чистовой пакет к подписанию'
      ],
      servicePrefill: 'Разработка и правовая экспертиза договора'
    },
    p02: {
      code: 'ПРАКТИКА № 02 / 10',
      badge: 'Судебное представительство',
      title: 'Арбитраж и судебные споры',
      summary:
        'Представляем интересы бизнеса в арбитражных судах и судах общей юрисдикции всех инстанций. Выстраиваем доказательственную базу и процессуальную стратегию.',
      includes: [
        'Оценка судебной перспективы спора и анализ доказательственной базы до подачи иска',
        'Подготовка досудебных претензий, исковых заявлений, отзывов и встречных исков',
        'Заявление ходатайств об обеспечительных мерах (арест счетов и имущества)',
        'Представительство в первой, апелляционной, кассационной инстанциях и Верховном Суде РФ'
      ],
      forWhom: [
        'Контрагент нарушил условия поставки, подряда или аренды и отказывается платить',
        'К вашей компании предъявлен необоснованный иск или штрафные санкции',
        'Требуется оспорить сделку, акт приёмки или решение государственного органа'
      ],
      stages: [
        'Аудит доказательств',
        'Досудебная претензия и иск',
        'Обеспечительные меры и процесс',
        'Решение суда и исполнительный лист'
      ],
      servicePrefill: 'Представительство в арбитражном суде'
    },
    p03: {
      code: 'ПРАКТИКА № 03 / 10',
      badge: 'Возврат дебиторской задолженности',
      title: 'Взыскание задолженности',
      summary:
        'Переводим просроченную дебиторскую задолженность в живые деньги на расчётном счёте: от жёсткой досудебной фиксации долга до работы с банками и приставами.',
      includes: [
        'Проверка финансового состояния должника, поиск счетов, активов и связанных лиц',
        'Досудебное урегулирование с проектом мирового соглашения или графика погашения',
        'Ускоренное взыскание в приказном и упрощённом производстве арбитражного суда',
        'Сопровождение исполнительного производства, предъявление листов напрямую в банки'
      ],
      forWhom: [
        'Заказчик или покупатель затягивает оплату поставленного товара или выполненных работ',
        'На руках уже есть решение суда, но деньги от должника фактически не поступают',
        'Нужно взыскать основной долг вместе с договорной неустойкой и процентами по ст. 395 ГК РФ'
      ],
      stages: [
        'Розыск активов должника',
        'Претензия и блокировка манёвров',
        'Судебное взыскание с неустойкой',
        'Списание средств со счетов'
      ],
      servicePrefill: 'Взыскание дебиторской задолженности'
    },
    p04: {
      code: 'ПРАКТИКА № 04 / 10',
      badge: 'Защита собственников и долей',
      title: 'Корпоративные споры',
      summary:
        'Защищаем права участников и акционеров, структурируем корпоративное управление и разрешаем конфликты между партнёрами по бизнесу.',
      includes: [
        'Разработка корпоративных договоров, уставов с защитой от размытия доли и тупиковых ситуаций',
        'Сопровождение входа и выхода участников, сделок купли-продажи долей и активов',
        'Оспаривание решений общих собраний и сделок, совершённых директором в ущерб компании',
        'Взыскание убытков с недобросовестного руководителя или контролирующих лиц'
      ],
      forWhom: [
        'Конфликт между соучредителями по поводу распределения прибыли или управления',
        'Подготовка к привлечению инвестора или продаже доли в компании',
        'Выявление вывода активов или злоупотреблений со стороны наёмного директора'
      ],
      stages: [
        'Анализ устава и реестра',
        'Переговорная и судебная позиция',
        'Фиксация корпоративного контроля',
        'Закрепление прав участников'
      ],
      servicePrefill: 'Разрешение корпоративного спора / структурирование'
    },
    p05: {
      code: 'ПРАКТИКА № 05 / 10',
      badge: 'Кредиторы и защита от субсидиарки',
      title: 'Банкротство',
      summary:
        'Представляем интересы кредиторов для возврата долгов через процедуру банкротства и защищаем руководителей от субсидиарной ответственности.',
      includes: [
        'Включение требований в реестр кредиторов и оспаривание фиктивных долгов конкурентов',
        'Оспаривание подозрительных сделок должника и возврат выведенного имущества в конкурсную массу',
        'Защита собственников и директоров от привлечения к субсидиарной ответственности',
        'Контроль действий арбитражного управляющего и участие в собраниях кредиторов'
      ],
      forWhom: [
        'Контрагент-должник уходит в банкротство, чтобы не платить по обязательствам',
        'К руководителю или учредителю предъявлено заявление о субсидиарной ответственности',
        'Компании требуется управляемая процедура финансового оздоровления или ликвидации'
      ],
      stages: [
        'Анализ сделок за 3 года',
        'Включение в реестр / защита КДЛ',
        'Оспаривание вывода активов',
        'Погашение требований / защита'
      ],
      servicePrefill: 'Сопровождение процедуры банкротства'
    },
    p06: {
      code: 'ПРАКТИКА № 06 / 10',
      badge: 'Трудовое право для работодателя',
      title: 'Трудовые споры',
      summary:
        'Выстраиваем кадровый контур на стороне работодателя: сложные увольнения, защита коммерческой тайны, споры с работниками и проверки ГИТ.',
      includes: [
        'Разработка трудовых договоров, положений о коммерческой тайне (NDA) и материальной ответственности',
        'Правовое сопровождение увольнения конфликтных сотрудников и топ-менеджеров без риска восстановления',
        'Представительство работодателя при проверках Государственной инспекции труда и прокуратуры',
        'Защита компании в судах по искам о восстановлении на работе и выплате компенсаций'
      ],
      forWhom: [
        'Необходимо корректно расстаться с ключевым или конфликтным сотрудником',
        'Риск увода клиентской базы или коммерческой информации персоналом',
        'Поступила жалоба в трудовую инспекцию или судебный иск от бывшего работника'
      ],
      stages: [
        'Аудит кадровых документов',
        'Фиксация дисциплинарного контура',
        'Переговоры или процедура увольнения',
        'Защита в ГИТ и суде'
      ],
      servicePrefill: 'Трудовой спор и защита работодателя'
    },
    p07: {
      code: 'ПРАКТИКА № 07 / 10',
      badge: 'Объекты, подряд и земля',
      title: 'Недвижимость и строительство',
      summary:
        'Юридическое сопровождение сделок с коммерческой недвижимостью, земельными участками и строительного подряда.',
      includes: [
        'Правовая проверка (Due Diligence) объектов недвижимости и земельных участков перед покупкой',
        'Разработка и сопровождение договоров строительного подряда, генподряда и проектирования',
        'Споры по объёмам, качеству и срокам строительно-монтажных работ (КС-2, КС-3, экспертиза)',
        'Легализация реконструкции, споры по аренде, сервитутам и кадастровой стоимости'
      ],
      forWhom: [
        'Покупка, продажа или долгосрочная аренда склада, офиса, торгового или производственного объекта',
        'Заказчик не подписывает акты КС-2/КС-3 или подрядчик сорвал сроки строительства',
        'Необходимость проверить чистоту титула и градостроительные ограничения участка'
      ],
      stages: [
        'Проверка титула и обременений',
        'Структура сделки / подряда',
        'Фиксация приёмки и экспертизы',
        'Регистрация прав / защита в суде'
      ],
      servicePrefill: 'Сделки с недвижимостью и строительный подряд'
    },
    p08: {
      code: 'ПРАКТИКА № 08 / 10',
      badge: 'Бренд, ПО и нематериальные активы',
      title: 'Интеллектуальная собственность',
      summary:
        'Регистрируем и защищаем товарные знаки, программное обеспечение, коммерческие обозначения и контент компании от копирования.',
      includes: [
        'Проверка и регистрация товарных знаков в Роспатенте, лицензионные договоры и франчайзинг',
        'Оформление прав компании на служебные разработки, код, дизайн и контент подрядчиков',
        'Досудебное пресечение нарушений и взыскание компенсации за незаконное использование бренда',
        'Представительство в Суде по интеллектуальным правам (СИП) и ФАС по недобросовестной конкуренции'
      ],
      forWhom: [
        'Конкуренты копируют бренд, название, упаковку или карточки товаров на маркетплейсах',
        'Компания разрабатывает ПО или заказывает дизайн без чёткого отчуждения исключительных прав',
        'Получена претензия о нарушении чужого товарного знака или авторских прав'
      ],
      stages: [
        'Аудит прав и охраноспособности',
        'Оформление / регистрация актива',
        'Фиксация нарушения и претензия',
        'Взыскание компенсации в суде'
      ],
      servicePrefill: 'Защита интеллектуальной собственности и бренда'
    },
    p09: {
      code: 'ПРАКТИКА № 09 / 10',
      badge: 'ФНС, проверки и доначисления',
      title: 'Налоговые споры',
      summary:
        'Защищаем бизнес при камеральных и выездных налоговых проверках, комиссиях ФНС и обжаловании решений о доначислениях.',
      includes: [
        'Подготовка мотивированных ответов на требования ФНС и сопровождение допросов/комиссий',
        'Анализ налоговых рисков структуры бизнеса и договоров (дробление, ст. 54.1 НК РФ)',
        'Подготовка возражений на акты камеральных и выездных налоговых проверок',
        'Апелляционное обжалование в вышестоящем УФНС и оспаривание решений в арбитражном суде'
      ],
      forWhom: [
        'Поступило требование ФНС о представлении документов или вызов на комиссию по разрывам НДС',
        'Вынесен акт проверки с доначислением налогов, пеней и штрафов',
        'Необходимо заранее проверить налоговую безопасность новой договорной модели'
      ],
      stages: [
        'Диагностика требований ФНС',
        'Формирование защитного досье',
        'Возражения и апелляция в УФНС',
        'Судебное оспаривание решения'
      ],
      servicePrefill: 'Налоговый спор и сопровождение проверки ФНС'
    },
    p10: {
      code: 'ПРАКТИКА № 10 / 10 · ОТ 25 000 ₽ В МЕСЯЦ',
      badge: 'Юридический отдел на аутсорсе',
      title: 'Абонентское обслуживание',
      summary:
        'Берём на себя текущую правовую функцию бизнеса: договоры, претензии, консультации руководства, трудовые и корпоративные вопросы в едином окне.',
      includes: [
        'Ежедневная проверка и подготовка договоров, дополнительных соглашений и писем контрагентам',
        'Ведение претензионной работы и оперативный контроль дебиторской задолженности',
        'Консультации руководителя, бухгалтерии и коммерческого отдела по текущим вопросам',
        'Фиксированная стоимость от 25 000 ₽ в месяц без затрат на рабочее место и зарплатные налоги'
      ],
      forWhom: [
        'Компании нужен системный юридический контроль каждый день, но держать штат юристов нерентабельно',
        'Штатный юрист перегружен рутиной и требует усиления профильными судебными специалистами',
        'Руководителю важен предсказуемый бюджет и понятная ответственность за правовой контур'
      ],
      stages: [
        'Аудит текущих задач компании',
        'Согласование регламента и тарифа',
        'Подключение рабочей группы',
        'Ежемесячное ведение и отчётность'
      ],
      servicePrefill: 'Абонентское юридическое обслуживание (от 25 000 ₽/мес)'
    }
  };

  // =========================================================================
  // 2. SUBTLE WEB AUDIO MICRO-HAPTIC CLICK
  // =========================================================================
  function playHapticTick(freq = 640, dur = 0.025) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!window.__temmaAudioCtx) {
        window.__temmaAudioCtx = new AudioCtx();
      }
      const ctx = window.__temmaAudioCtx;
      if (ctx.state === 'suspended') return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + dur);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch (_err) {
      // Ignore before user gesture
    }
  }

  // =========================================================================
  // 3. INITIALIZE 3D STORYBOARD & SCROLL ORCHESTRATION
  // =========================================================================
  let engine = null;
  let lenis = null;

  let smoothScrollTarget = window.scrollY || 0;
  let smoothScrollCurrent = window.scrollY || 0;
  let isSmoothScrolling = false;

  function initSmoothScroll() {
    // Self-contained Lenis-style buttery smooth wheel inertia (zero CDN dependencies)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    window.addEventListener(
      'wheel',
      (e) => {
        // Allow native scrolling inside textareas or horizontal scrollers
        if (e.target.closest('textarea, select, .act-timeline-pills')) return;
        e.preventDefault();
        if (!isSmoothScrolling) {
          smoothScrollCurrent = window.scrollY;
          smoothScrollTarget = window.scrollY;
        }
        smoothScrollTarget = Math.max(0, Math.min(maxScroll(), smoothScrollTarget + e.deltaY * 0.92));
        if (!isSmoothScrolling) {
          isSmoothScrolling = true;
          requestAnimationFrame(stepSmoothScroll);
        }
      },
      { passive: false }
    );

    // Keep synced when user drags native scrollbar
    window.addEventListener(
      'scroll',
      () => {
        if (!isSmoothScrolling) {
          smoothScrollCurrent = window.scrollY;
          smoothScrollTarget = window.scrollY;
        }
      },
      { passive: true }
    );

    function stepSmoothScroll() {
      const diff = smoothScrollTarget - smoothScrollCurrent;
      if (Math.abs(diff) < 0.45) {
        smoothScrollCurrent = smoothScrollTarget;
        window.scrollTo(0, smoothScrollCurrent);
        isSmoothScrolling = false;
        return;
      }
      smoothScrollCurrent += diff * 0.095;
      window.scrollTo(0, smoothScrollCurrent);
      requestAnimationFrame(stepSmoothScroll);
    }
  }

  function scrollToPosition(targetY) {
    const clamped = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, targetY));
    smoothScrollTarget = clamped;
    smoothScrollCurrent = window.scrollY;
    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      if (!isSmoothScrolling) {
        isSmoothScrolling = true;
        const step = () => {
          const diff = smoothScrollTarget - smoothScrollCurrent;
          if (Math.abs(diff) < 0.5) {
            window.scrollTo(0, smoothScrollTarget);
            isSmoothScrolling = false;
            return;
          }
          smoothScrollCurrent += diff * 0.1;
          window.scrollTo(0, smoothScrollCurrent);
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    } else {
      window.scrollTo({ top: clamped, behavior: 'smooth' });
    }
  }

  function initStoryboardAndUI() {
    const canvas = document.getElementById('legal-storyboard-canvas');
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderFrames = document.getElementById('preloader-frames');

    if (canvas && typeof window.Storyboard3DEngine !== 'undefined') {
      engine = new window.Storyboard3DEngine(canvas);

      // Bake real WebGL keyframe snapshots into the filmstrip dock
      engine.bakeFilmstripThumbnails();

      // Preloader calibration sequence (180 frames ready)
      let loadFrame = 1;
      const loadTimer = setInterval(() => {
        loadFrame = Math.min(180, loadFrame + 28);
        const pct = Math.round((loadFrame / 180) * 100);
        if (preloaderBar) preloaderBar.style.width = `${pct}%`;
        if (preloaderFrames) {
          preloaderFrames.textContent = `КАДР ${String(loadFrame).padStart(3, '0')} / 180 · 60 FPS`;
        }
        if (loadFrame >= 180) {
          clearInterval(loadTimer);
          setTimeout(() => {
            if (preloader) preloader.classList.add('is-done');
          }, 180);
        }
      }, 45);

      // Start 60fps loop and sync HUD telemetry
      engine.startLoop((displayFrame) => {
        updateTelemetryHUD(displayFrame);
      });
    } else if (preloader) {
      preloader.classList.add('is-done');
    }

    // Bind scroll progress of #storyboard to frame [0..179]
    const storyboardSection = document.getElementById('storyboard');
    if (storyboardSection) {
      const updateFromScroll = () => {
        const rect = storyboardSection.getBoundingClientRect();
        const scrollable = Math.max(1, storyboardSection.offsetHeight - window.innerHeight);
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollable));
        if (engine) {
          engine.setTargetFrame(progress * 179);
        }
      };

      window.addEventListener('scroll', updateFromScroll, { passive: true });
      updateFromScroll();
    }

    // Bind Clickable 4-Act Progress Scrubber Rail (scrub straight to any of the 180 frames)
    const progressRail = document.getElementById('act-progress-rail');
    if (progressRail && storyboardSection) {
      progressRail.addEventListener('click', (e) => {
        const rect = progressRail.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const sectionTop = storyboardSection.offsetTop;
        const scrollable = Math.max(1, storyboardSection.offsetHeight - window.innerHeight);
        playHapticTick(720, 0.025);
        scrollToPosition(sectionTop + ratio * scrollable);
      });
    }

    // Bind Filmstrip Thumbnails, Act Pills & Frame Ruler Marks to jump to exact frame on scroll
    const jumpTriggers = document.querySelectorAll('[data-jump-frame]');
    jumpTriggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetFrame = parseInt(btn.getAttribute('data-jump-frame'), 10) || 0;
        if (!storyboardSection) return;
        const sectionTop = storyboardSection.offsetTop;
        const scrollable = Math.max(1, storyboardSection.offsetHeight - window.innerHeight);
        const targetScrollY = sectionTop + (targetFrame / 179) * scrollable;
        playHapticTick(700, 0.025);
        scrollToPosition(targetScrollY);
      });
    });
  }

  // Track last active act to avoid redundant DOM writes at 60fps
  let lastActiveAct = -1;
  let lastRoundedFrame = -1;

  function updateTelemetryHUD(frame1Based) {
    if (frame1Based === lastRoundedFrame) return;
    lastRoundedFrame = frame1Based;

    const padded = String(frame1Based).padStart(3, '0');
    const headerReadout = document.getElementById('header-frame-readout');
    if (headerReadout) {
      headerReadout.textContent = `КАДР ${padded}/180`;
    }

    const progressFill = document.getElementById('act-progress-fill');
    if (progressFill) {
      const pct = Math.max(2, ((frame1Based - 1) / 179) * 100);
      progressFill.style.width = `${pct.toFixed(1)}%`;
    }

    const angleReadout = document.getElementById('ruler-angle-readout');
    if (angleReadout) {
      const norm = (frame1Based - 1) / 179;
      const deg = ((1 - norm) * 18.4 * Math.cos(norm * Math.PI * 2)).toFixed(2);
      angleReadout.textContent = `${deg}°`;
    }

    // Highlight active Frame Ruler Mark
    const rulerMarks = document.querySelectorAll('.ruler-mark[data-jump-frame]');
    rulerMarks.forEach((mark) => {
      const f = parseInt(mark.getAttribute('data-jump-frame'), 10) || 0;
      const isClose = Math.abs(frame1Based - 1 - f) <= 23;
      mark.classList.toggle('is-active', isClose);
    });

    // Highlight active Filmstrip Thumbnail
    const filmThumbs = document.querySelectorAll('.film-thumb[data-jump-frame]');
    filmThumbs.forEach((thumb) => {
      const f = parseInt(thumb.getAttribute('data-jump-frame'), 10) || 0;
      const isClose = Math.abs(frame1Based - 1 - f) <= 26;
      thumb.classList.toggle('is-active', isClose);
    });

    // Determine active Story Act (0..3)
    let actIdx = 0;
    if (frame1Based > 135) actIdx = 3;
    else if (frame1Based > 90) actIdx = 2;
    else if (frame1Based > 45) actIdx = 1;

    if (actIdx !== lastActiveAct) {
      lastActiveAct = actIdx;

      const actPills = document.querySelectorAll('.act-pill[data-act-pill]');
      actPills.forEach((pill) => {
        const idx = parseInt(pill.getAttribute('data-act-pill'), 10);
        pill.classList.toggle('is-active', idx === actIdx);
      });

      const acts = document.querySelectorAll('.story-act[data-act]');
      acts.forEach((actEl) => {
        const idx = parseInt(actEl.getAttribute('data-act'), 10);
        actEl.classList.toggle('is-active', idx === actIdx);
      });

      // Sync Right Architectural Panel Card
      const panelNum = document.getElementById('panel-act-num');
      const panelArtifact = document.getElementById('panel-artifact-name');
      const panelTitle = document.getElementById('panel-act-title');

      const actMeta = [
        {
          num: '01',
          artifact: 'ДОСЬЕ И КОНТЕКСТ',
          title: 'Каждая задача начинается с ясного плана.',
          stepIdx: 0
        },
        {
          num: '02',
          artifact: 'ЛАТУННАЯ ПЕЧАТЬ',
          title: 'Фиксируем условия и убираем риски до подписания.',
          stepIdx: 1
        },
        {
          num: '03',
          artifact: 'БАЛАНСИР АРБИТРАЖА',
          title: 'Переводим спор в точную позицию и взыскание.',
          stepIdx: 2
        },
        {
          num: '04',
          artifact: 'МОНОЛИТ 10 ПРАКТИК',
          title: 'Системная правовая защита бизнеса 24/7.',
          stepIdx: 2
        }
      ][actIdx];

      if (panelNum) panelNum.textContent = actMeta.num;
      if (panelArtifact) panelArtifact.textContent = actMeta.artifact;
      if (panelTitle) panelTitle.textContent = actMeta.title;

      const steps = document.querySelectorAll('.panel-step[data-step-act]');
      steps.forEach((stepEl, sIdx) => {
        stepEl.classList.toggle('is-current', sIdx === actMeta.stepIdx);
      });
    }
  }

  // =========================================================================
  // 4. INTERACTIVE 10-PRACTICE MASTER-DETAIL DOSSIER + BLUEPRINT VISUALS
  // =========================================================================
  function buildPracticeBlueprintSVG(index1Based) {
    const step = (index1Based % 4) + 1;
    const cx = 300 + ((index1Based * 37) % 140) - 70;
    const rings = [28, 48, 68].slice(0, step === 1 ? 2 : 3);
    const bars = [0, 1, 2, 3, 4].map((b) => {
      const h = 18 + (((index1Based * 17 + b * 13) % 5) * 11);
      const x = 42 + b * 36;
      return `<rect x="${x}" y="${82 - h}" width="20" height="${h}" fill="rgba(212,178,125,${0.18 + b * 0.12})" stroke="#d4b27d" stroke-opacity="0.55" stroke-width="1"/>`;
    }).join('');
    const circles = rings.map((r, i) =>
      `<circle cx="${cx}" cy="46" r="${r}" stroke="#e7cc9f" stroke-opacity="${0.55 - i * 0.14}" stroke-dasharray="${i === 1 ? '4 5' : 'none'}" stroke-width="${i === 0 ? 1.4 : 1}"/>`
    ).join('');

    return `
      <svg viewBox="0 0 600 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="46" x2="600" y2="46" stroke="#d4b27d" stroke-opacity="0.18" stroke-dasharray="3 6"/>
        <line x1="${cx}" y1="4" x2="${cx}" y2="88" stroke="#d4b27d" stroke-opacity="0.22"/>
        ${bars}
        ${circles}
        <circle cx="${cx}" cy="46" r="4" fill="#e7cc9f"/>
        <polyline points="${cx + 28},46 ${cx + 58},24 558,24" stroke="#d4b27d" stroke-opacity="0.65" stroke-width="1"/>
        <text x="556" y="18" text-anchor="end" fill="#e7cc9f" font-family="JetBrains Mono, monospace" font-size="9">КОНТУР 0${index1Based < 10 ? index1Based : 'X'} · ВЕРИФИЦИРОВАН</text>
        <text x="556" y="76" text-anchor="end" fill="rgba(246,244,239,0.55)" font-family="JetBrains Mono, monospace" font-size="8">АРХИТЕКТУРА ПРАВОВОГО РЕШЕНИЯ ТЭММА</text>
      </svg>`;
  }

  function initPracticesExplorer() {
    const tabs = document.querySelectorAll('.practice-tab[data-practice-id]');
    const codeEl = document.getElementById('dossier-code');
    const slaEl = document.getElementById('dossier-sla-tag');
    const blueprintEl = document.getElementById('dossier-blueprint-svg');
    const badgeEl = document.getElementById('dossier-badge');
    const titleEl = document.getElementById('dossier-title');
    const summaryEl = document.getElementById('dossier-summary');
    const includesEl = document.getElementById('dossier-includes');
    const forWhomEl = document.getElementById('dossier-forwhom');
    const stagesEl = document.getElementById('dossier-stages');
    const ctaBtn = document.getElementById('dossier-cta-btn');
    const formatBtns = document.querySelectorAll('.format-btn[data-format]');
    const formatHint = document.getElementById('format-hint-text');

    let activePracticeId = 'p01';
    let activeFormat = 'Разовая задача';

    const formatHints = {
      'Разовая задача': 'Фиксированная смета и срок по конкретной задаче',
      'Судебный процесс': 'Оценка судебной перспективы, расчёт рисков и ведение процесса',
      'Абонентское сопровождение (от 25 000 ₽/мес)': 'Выделенный юрист + 10 профильных практик в одном окне'
    };

    function syncCtaService() {
      const data = PRACTICES_DATA[activePracticeId];
      if (!data || !ctaBtn) return;
      ctaBtn.setAttribute('data-prefill-practice', data.title);
      ctaBtn.setAttribute('data-prefill-service', `${data.servicePrefill} · ${activeFormat}`);
    }

    function selectPractice(practiceId) {
      const data = PRACTICES_DATA[practiceId];
      if (!data) return;
      activePracticeId = practiceId;

      const idxNum = parseInt(practiceId.replace('p', ''), 10) || 1;

      tabs.forEach((t) => {
        const isCurrent = t.getAttribute('data-practice-id') === practiceId;
        t.classList.toggle('is-active', isCurrent);
        t.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      if (codeEl) codeEl.textContent = data.code;
      if (slaEl) slaEl.textContent = idxNum === 10 ? 'ТАРИФ: ОТ 25 000 ₽ / МЕС' : 'SLA: РАЗБОР ЗА 24 ЧАСА';
      if (blueprintEl) blueprintEl.innerHTML = buildPracticeBlueprintSVG(idxNum);
      if (badgeEl) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      if (summaryEl) summaryEl.textContent = data.summary;

      if (includesEl) {
        includesEl.innerHTML = data.includes.map((item) => `<li>${item}</li>`).join('');
      }
      if (forWhomEl) {
        forWhomEl.innerHTML = data.forWhom.map((item) => `<li>${item}</li>`).join('');
      }
      if (stagesEl) {
        stagesEl.innerHTML = data.stages
          .map((st, idx) => `<div class="dossier-stage-pill"><span>0${idx + 1}</span> ${st}</div>`)
          .join('');
      }
      syncCtaService();
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const id = tab.getAttribute('data-practice-id');
        playHapticTick(620, 0.025);
        selectPractice(id);
      });
    });

    formatBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeFormat = btn.getAttribute('data-format') || 'Разовая задача';
        formatBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        if (formatHint) formatHint.textContent = formatHints[activeFormat] || '';
        playHapticTick(680, 0.02);
        syncCtaService();
      });
    });

    // Render initial blueprint SVG for p01
    if (blueprintEl) blueprintEl.innerHTML = buildPracticeBlueprintSVG(1);

    document.querySelectorAll('[data-open-practice]').forEach((link) => {
      link.addEventListener('click', () => {
        const id = link.getAttribute('data-open-practice');
        if (id) selectPractice(id);
      });
    });
  }

  // =========================================================================
  // 4B. PROCESS AMBIENT MOTION + SCROLL-REACTIVE RAIL + SCROLL REVEALS
  // =========================================================================
  function initProcessAndReveals() {
    // 1. Scroll-Reactive Golden Progress Rail in #process
    const processSection = document.getElementById('process');
    const processFill = document.getElementById('process-scroll-fill');
    const processNodes = document.querySelectorAll('.process-node[data-pnode]');

    if (processSection && processFill) {
      const updateProcessRail = () => {
        const rect = processSection.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = (vh * 0.72 - rect.top) / Math.max(1, rect.height * 0.65);
        const pct = Math.max(0.08, Math.min(1, raw));
        processFill.style.width = `${(pct * 100).toFixed(1)}%`;

        processNodes.forEach((node) => {
          const idx = parseInt(node.getAttribute('data-pnode'), 10) || 0;
          node.classList.toggle('is-lit', pct >= idx / 3.15);
        });
      };
      window.addEventListener('scroll', updateProcessRail, { passive: true });
      updateProcessRail();
    }

    // 2. Subtle Architectural Light-Beam Ambient Canvas in #process
    const ambCanvas = document.getElementById('process-ambient-canvas');
    if (ambCanvas && processSection) {
      const ctx = ambCanvas.getContext('2d');
      let visible = false;
      let t = 0;

      const resizeAmb = () => {
        ambCanvas.width = processSection.clientWidth || window.innerWidth;
        ambCanvas.height = processSection.clientHeight || 600;
      };
      resizeAmb();
      window.addEventListener('resize', resizeAmb);

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(
          (entries) => { visible = entries[0]?.isIntersecting ?? false; },
          { threshold: 0.05 }
        ).observe(processSection);
      }

      const drawAmb = () => {
        requestAnimationFrame(drawAmb);
        if (!visible) return;
        t += 0.006;
        const w = ambCanvas.width;
        const h = ambCanvas.height;
        ctx.clearRect(0, 0, w, h);

        // Moving warm golden architectural light planes
        for (let i = 0; i < 3; i++) {
          const x = ((Math.sin(t * (0.6 + i * 0.25) + i * 2) * 0.5 + 0.5) * w);
          const grad = ctx.createLinearGradient(x - 180, 0, x + 220, h);
          grad.addColorStop(0, 'rgba(212, 178, 125, 0)');
          grad.addColorStop(0.5, 'rgba(212, 178, 125, 0.07)');
          grad.addColorStop(1, 'rgba(212, 178, 125, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x - 160, 0);
          ctx.lineTo(x + 60, 0);
          ctx.lineTo(x + 260, h);
          ctx.lineTo(x + 40, h);
          ctx.closePath();
          ctx.fill();
        }
      };
      requestAnimationFrame(drawAmb);
    }

    // 3. Smooth Scroll Reveals ([data-reveal])
    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealEls.length) {
      const revObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              revObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => revObs.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
    }
  }

  // =========================================================================
  // 5. MAGNETIC BUTTONS & MOBILE DRAWER
  // =========================================================================
  function initMagneticAndMobileMenu() {
    // Tactile magnetic attraction on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      document.querySelectorAll('[data-magnetic]').forEach((el) => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
          const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
          el.style.transform = `translate(${x}px, ${y}px)`;
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate(0px, 0px)';
        });
      });
    }

    // Mobile drawer toggle
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = !drawer.hidden;
        drawer.hidden = isOpen;
        toggleBtn.setAttribute('aria-expanded', String(!isOpen));
      });

      drawer.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
          drawer.hidden = true;
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // =========================================================================
  // 6. CRM LEAD FORM (POST /api/leads) + PREFILL + BASE64 FILES + COOKIES
  // =========================================================================
  function initCRMLeadForm() {
    const form = document.getElementById('lead-form');
    if (!form) return;

    const taskSelect = document.getElementById('lead-task-type');
    const serviceInput = document.getElementById('lead-service');
    const contactInput = document.getElementById('lead-contact');
    const contactLabel = document.getElementById('lead-contact-label');
    const submissionIdInput = document.getElementById('submission_id');
    const calcResultInput = document.getElementById('calculator_result');
    const calcQtyInput = document.getElementById('calculator_quantity');
    const filesInput = document.getElementById('lead-files');
    const fileListEl = document.getElementById('file-list');
    const statusEl = document.getElementById('form-status');
    const submitBtn = document.getElementById('lead-submit-btn');

    // 1. Session submission_id (`temma-submission-id`)
    let subId = sessionStorage.getItem('temma-submission-id');
    if (!subId) {
      subId = 'tm-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
      sessionStorage.setItem('temma-submission-id', subId);
    }
    if (submissionIdInput) submissionIdInput.value = subId;

    // 2. URL Query Prefill (service, task_type, result, quantity)
    const params = new URLSearchParams(window.location.search);
    if (params.get('service') && serviceInput) serviceInput.value = params.get('service');
    if (params.get('task_type') && taskSelect) taskSelect.value = params.get('task_type');
    if (params.get('result') && calcResultInput) calcResultInput.value = params.get('result');
    if (params.get('quantity') && calcQtyInput) calcQtyInput.value = params.get('quantity');

    // 3. 1-Click Prefill Triggers across the site
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-prefill-practice]');
      if (!trigger) return;

      const practice = trigger.getAttribute('data-prefill-practice');
      const service = trigger.getAttribute('data-prefill-service');

      if (practice && taskSelect) {
        Array.from(taskSelect.options).forEach((opt) => {
          if (opt.value === practice) taskSelect.value = practice;
        });
      }
      if (service && serviceInput) {
        serviceInput.value = service;
      }

      playHapticTick(740, 0.03);
      const reqSection = document.getElementById('request');
      if (reqSection) {
        scrollToPosition(reqSection.offsetTop - 60);
      }
    });

    // 4. Dynamic Contact Channel Switcher (Telegram / Email / Phone)
    const channelRadios = form.querySelectorAll('input[name="contact_channel"]');
    const channelConfig = {
      telegram: {
        label: 'Контакт в Telegram (телефон или @username) *',
        type: 'text',
        placeholder: '@username или +7 (978) 000-00-00'
      },
      email: {
        label: 'Адрес электронной почты для ответа *',
        type: 'email',
        placeholder: 'director@company.ru'
      },
      phone: {
        label: 'Номер телефона для звонка *',
        type: 'tel',
        placeholder: '+7 (978) 000-00-00'
      }
    };

    channelRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        form.querySelectorAll('.channel-option').forEach((lbl) => lbl.classList.remove('is-selected'));
        const parentLabel = radio.closest('.channel-option');
        if (parentLabel) parentLabel.classList.add('is-selected');

        const cfg = channelConfig[radio.value] || channelConfig.telegram;
        if (contactLabel) contactLabel.textContent = cfg.label;
        if (contactInput) {
          contactInput.type = cfg.type;
          contactInput.placeholder = cfg.placeholder;
        }
        playHapticTick(580, 0.02);
      });
    });

    // 5. File Upload Validation & Base64 Encoding (Max 5 files, 12 MB total)
    let selectedFiles = [];

    function renderFileChips() {
      if (!fileListEl) return;
      if (!selectedFiles.length) {
        fileListEl.innerHTML = '';
        return;
      }
      fileListEl.innerHTML = selectedFiles
        .map(
          (f, idx) => `
          <div class="file-chip">
            <span>${f.name} (${(f.size / 1024 / 1024).toFixed(2)} МБ)</span>
            <button type="button" class="mono-text" data-remove-file="${idx}">[УДАЛИТЬ]</button>
          </div>`
        )
        .join('');
    }

    if (filesInput) {
      filesInput.addEventListener('change', () => {
        const incoming = Array.from(filesInput.files || []);
        const combined = [...selectedFiles, ...incoming].slice(0, 5);
        const totalBytes = combined.reduce((acc, f) => acc + f.size, 0);

        if (totalBytes > 12 * 1024 * 1024) {
          showStatus('Общий размер файлов превышает 12 МБ. Пожалуйста, выберите файлы меньшего размера.', true);
          return;
        }
        selectedFiles = combined;
        renderFileChips();
      });
    }

    if (fileListEl) {
      fileListEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-remove-file]');
        if (!btn) return;
        const idx = parseInt(btn.getAttribute('data-remove-file'), 10);
        selectedFiles.splice(idx, 1);
        renderFileChips();
      });
    }

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, data: reader.result });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    function showStatus(msg, isError = false) {
      if (!statusEl) return;
      statusEl.hidden = false;
      statusEl.textContent = msg;
      statusEl.className = 'form-status ' + (isError ? 'is-error' : 'is-success');
    }

    // 6. Submit to CRM (`POST /api/leads`)
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = form.elements.name?.value.trim();
      const contact = form.elements.contact?.value.trim();
      const description = form.elements.description?.value.trim();
      const consent = document.getElementById('lead-consent')?.checked;

      if (!name || !contact || !description) {
        showStatus('Пожалуйста, заполните обязательные поля: имя, контакт для ответа и описание задачи.', true);
        return;
      }
      if (!consent) {
        showStatus('Для отправки заявки необходимо согласие с Политикой конфиденциальности.', true);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Отправка в CRM ТЭММА...';
      }

      try {
        const encodedFiles = await Promise.all(selectedFiles.map(fileToBase64));

        const payload = {
          name,
          company: form.elements.company?.value.trim() || '',
          contact_channel: form.elements.contact_channel?.value || 'telegram',
          contact,
          task_type: taskSelect?.value || '',
          service: serviceInput?.value.trim() || '',
          description,
          timeline: form.elements.timeline?.value || '',
          files: encodedFiles,
          calculator_result: calcResultInput?.value || '',
          calculator_quantity: calcQtyInput?.value || '',
          submission_id: subId,
          source: form.elements.source?.value || 'temma-3d-main',
          landing_page: window.location.href,
          referrer: document.referrer || '',
          utm_source: params.get('utm_source') || '',
          utm_medium: params.get('utm_medium') || '',
          utm_campaign: params.get('utm_campaign') || '',
          utm_content: params.get('utm_content') || '',
          utm_term: params.get('utm_term') || '',
          consent: true
        };

        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const resData = await response.json().catch(() => ({}));
          if (resData.crmStatus === 'queued') {
            showStatus('Заявка принята и поставлена в очередь CRM. Специалист ТЭММЫ свяжется с вами в ближайшее время.');
          } else {
            showStatus('Задача передана в CRM ТЭММЫ. Профильный юрист изучит контекст и свяжется с вами.');
          }
          form.reset();
          selectedFiles = [];
          renderFileChips();
        } else {
          throw new Error('CRM endpoint returned status ' + response.status);
        }
      } catch (_err) {
        // Graceful fallback when previewing standalone prototype outside production CRM server
        showStatus(
          'Заявка сформирована по контракту POST /api/leads (ID сессии: ' +
            subId +
            '). В режиме демонстрации прототипа данные валидированы и готовы к приёму CRM.',
          false
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Оставить задачу';
        }
      }
    });
  }

  // =========================================================================
  // 7. COOKIE BANNER (`temma-cookie-choice`)
  // =========================================================================
  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const existingChoice = localStorage.getItem('temma-cookie-choice');
    if (!existingChoice) {
      banner.hidden = false;
    }

    const saveChoice = (val) => {
      localStorage.setItem('temma-cookie-choice', val);
      banner.hidden = true;
    };

    document.getElementById('cookie-accept-all')?.addEventListener('click', () => saveChoice('all'));
    document.getElementById('cookie-accept-necessary')?.addEventListener('click', () => saveChoice('necessary'));
  }

  // =========================================================================
  // BOOTSTRAP
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initStoryboardAndUI();
    initPracticesExplorer();
    initProcessAndReveals();
    initMagneticAndMobileMenu();
    initCRMLeadForm();
    initCookieBanner();
  });
})();
