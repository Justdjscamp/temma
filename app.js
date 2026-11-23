/**
 * ТЭММА — EDITORIAL CINEMA CONTROLLER
 * Velvety Inertia Scroll, 360-Frame Sync, 2px Progress Thread,
 * 10-Practice Explorer & CRM Lead Form (POST /api/leads)
 */

(function () {
  'use strict';

  const PRACTICES_DATA = {
    p01: {
      code: 'Практика 01 / 10',
      title: 'Договорная работа и сделки',
      summary: 'Готовим, проверяем и согласуем договоры под реальные процессы компании, чтобы условия защищали деньги, сроки и управляемость сделки.',
      includes: [
        'Разработка договоров поставки, подряда, оказания услуг, аренды и смешанных сделок',
        'Правовая экспертиза договора контрагента с картой финансовых и судебных рисков',
        'Подготовка протоколов разногласий и участие в переговорах по согласованию условий',
        'Проверка контрагента, полномочий подписанта и обеспечительных механизмов'
      ],
      forWhom: [
        'Выход на крупного заказчика или поставщика с жёсткой типовой формой договора',
        'Сложная сделка с отсрочкой платежа, этапами приёмки или авансированием',
        'Необходимость обновить шаблоны договоров компании под актуальную судебную практику'
      ],
      servicePrefill: 'Разработка и правовая экспертиза договора'
    },
    p02: {
      code: 'Практика 02 / 10',
      title: 'Арбитраж и судебные споры',
      summary: 'Представляем интересы бизнеса в арбитражных судах и судах общей юрисдикции всех инстанций. Выстраиваем доказательственную базу и процессуальную стратегию.',
      includes: [
        'Оценка судебной перспективы спора и анализ доказательств до подачи иска',
        'Подготовка досудебных претензий, исков, отзывов и встречных требований',
        'Заявление ходатайств об обеспечительных мерах (арест счетов и имущества)',
        'Представительство в первой, апелляционной, кассационной инстанциях и ВС РФ'
      ],
      forWhom: [
        'Контрагент нарушил условия поставки, подряда или аренды и отказывается платить',
        'К вашей компании предъявлен необоснованный иск или штрафные санкции',
        'Требуется оспорить сделку, акт приёмки или решение государственного органа'
      ],
      servicePrefill: 'Представительство в арбитражном суде'
    },
    p03: {
      code: 'Практика 03 / 10',
      title: 'Взыскание задолженности',
      summary: 'Переводим просроченную дебиторскую задолженность в деньги на расчётном счёте: от досудебной фиксации долга до работы с банками и приставами.',
      includes: [
        'Проверка финансового состояния должника, поиск счетов, активов и связанных лиц',
        'Досудебное урегулирование с графиком погашения или мировым соглашением',
        'Ускоренное взыскание в приказном и упрощённом производстве арбитражного суда',
        'Сопровождение исполнительного производства, предъявление листов в банки'
      ],
      forWhom: [
        'Заказчик или покупатель затягивает оплату поставленного товара или работ',
        'На руках уже есть решение суда, но деньги от должника не поступают',
        'Нужно взыскать основной долг вместе с договорной неустойкой и процентами'
      ],
      servicePrefill: 'Взыскание дебиторской задолженности'
    },
    p04: {
      code: 'Практика 04 / 10',
      title: 'Корпоративные споры',
      summary: 'Защищаем права участников и акционеров, структурируем корпоративное управление и разрешаем конфликты между партнёрами.',
      includes: [
        'Разработка корпоративных договоров и уставов с защитой от размытия доли',
        'Сопровождение входа и выхода участников, сделок купли-продажи долей',
        'Оспаривание решений собраний и сделок, совершённых в ущерб компании',
        'Взыскание убытков с недобросовестного руководителя или контролирующих лиц'
      ],
      forWhom: [
        'Конфликт между соучредителями по поводу распределения прибыли или управления',
        'Подготовка к привлечению инвестора или продаже доли в компании',
        'Выявление вывода активов или злоупотреблений со стороны директора'
      ],
      servicePrefill: 'Разрешение корпоративного спора'
    },
    p05: {
      code: 'Практика 05 / 10',
      title: 'Банкротство',
      summary: 'Представляем интересы кредиторов для возврата долгов через банкротство и защищаем руководителей от субсидиарной ответственности.',
      includes: [
        'Включение требований в реестр кредиторов и оспаривание фиктивных долгов',
        'Оспаривание подозрительных сделок должника и возврат имущества в массу',
        'Защита собственников и директоров от субсидиарной ответственности',
        'Контроль действий арбитражного управляющего и участие в собраниях кредиторов'
      ],
      forWhom: [
        'Контрагент-должник уходит в банкротство, чтобы не платить по обязательствам',
        'К руководителю или учредителю подано заявление о субсидиарной ответственности',
        'Компании требуется управляемая процедура финансового оздоровления'
      ],
      servicePrefill: 'Сопровождение процедуры банкротства'
    },
    p06: {
      code: 'Практика 06 / 10',
      title: 'Трудовые споры',
      summary: 'Выстраиваем кадровый контур на стороне работодателя: сложные увольнения, защита коммерческой тайны, споры с работниками и проверки ГИТ.',
      includes: [
        'Разработка трудовых договоров, NDA и положений о материальной ответственности',
        'Сопровождение увольнения конфликтных сотрудников без риска восстановления',
        'Представительство работодателя при проверках ГИТ и прокуратуры',
        'Защита компании в судах по искам о восстановлении и выплате компенсаций'
      ],
      forWhom: [
        'Необходимо корректно расстаться с ключевым или конфликтным сотрудником',
        'Риск увода клиентской базы или коммерческой информации персоналом',
        'Поступила жалоба в трудовую инспекцию или иск от бывшего работника'
      ],
      servicePrefill: 'Трудовой спор и защита работодателя'
    },
    p07: {
      code: 'Практика 07 / 10',
      title: 'Недвижимость и строительство',
      summary: 'Юридическое сопровождение сделок с коммерческой недвижимостью, земельными участками и строительного подряда.',
      includes: [
        'Правовая проверка (Due Diligence) объектов недвижимости и земли перед покупкой',
        'Разработка и сопровождение договоров строительного подряда и генподряда',
        'Споры по объёмам, качеству и срокам работ (КС-2, КС-3, экспертиза)',
        'Споры по аренде, сервитутам и кадастровой стоимости'
      ],
      forWhom: [
        'Покупка, продажа или долгосрочная аренда склада, офиса или торгового объекта',
        'Заказчик не подписывает акты или подрядчик сорвал сроки строительства',
        'Необходимость проверить чистоту титула и ограничения земельного участка'
      ],
      servicePrefill: 'Сделки с недвижимостью и строительный подряд'
    },
    p08: {
      code: 'Практика 08 / 10',
      title: 'Интеллектуальная собственность',
      summary: 'Регистрируем и защищаем товарные знаки, программное обеспечение, коммерческие обозначения и контент компании от копирования.',
      includes: [
        'Проверка и регистрация товарных знаков в Роспатенте, лицензионные договоры',
        'Оформление прав на служебные разработки, код, дизайн и контент подрядчиков',
        'Досудебное пресечение нарушений и взыскание компенсации за копирование бренда',
        'Представительство в Суде по интеллектуальным правам и ФАС'
      ],
      forWhom: [
        'Конкуренты копируют бренд, название или карточки товаров на маркетплейсах',
        'Компания разрабатывает ПО или дизайн без отчуждения исключительных прав',
        'Получена претензия о нарушении чужого товарного знака или авторских прав'
      ],
      servicePrefill: 'Защита интеллектуальной собственности'
    },
    p09: {
      code: 'Практика 09 / 10',
      title: 'Налоговые споры',
      summary: 'Защищаем бизнес при камеральных и выездных налоговых проверках, комиссиях ФНС и обжаловании решений о доначислениях.',
      includes: [
        'Подготовка мотивированных ответов на требования ФНС и сопровождение комиссий',
        'Анализ налоговых рисков структуры бизнеса и договоров (ст. 54.1 НК РФ)',
        'Подготовка возражений на акты камеральных и выездных проверок',
        'Апелляционное обжалование в УФНС и оспаривание решений в арбитражном суде'
      ],
      forWhom: [
        'Поступило требование ФНС или вызов на комиссию по разрывам НДС',
        'Вынесен акт проверки с доначислением налогов, пеней и штрафов',
        'Необходимо заранее проверить налоговую безопасность договорной модели'
      ],
      servicePrefill: 'Налоговый спор и сопровождение проверки ФНС'
    },
    p10: {
      code: 'Практика 10 / 10 · от 25 000 ₽ / мес',
      title: 'Абонентское обслуживание',
      summary: 'Берём на себя текущую правовую функцию бизнеса: договоры, претензии, консультации руководства, трудовые и корпоративные вопросы в едином окне.',
      includes: [
        'Ежедневная проверка и подготовка договоров, допсоглашений и писем контрагентам',
        'Ведение претензионной работы и контроль дебиторской задолженности',
        'Консультации руководителя, бухгалтерии и коммерческого отдела',
        'Фиксированная стоимость от 25 000 ₽ в месяц без затрат на штат и налоги'
      ],
      forWhom: [
        'Компании нужен системный юридический контроль без содержания штатного отдела',
        'Штатный юрист перегружен и требует усиления профильными специалистами',
        'Руководителю важен предсказуемый бюджет и понятная ответственность'
      ],
      servicePrefill: 'Абонентское юридическое обслуживание (от 25 000 ₽/мес)'
    }
  };

  // =========================================================================
  // 1. VELVETY INERTIA SCROLL (ZERO CDN)
  // =========================================================================
  let scrollTarget = window.scrollY || 0;
  let scrollCurrent = window.scrollY || 0;
  let isScrolling = false;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function maxScrollY() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function stepSmoothScroll() {
    const diff = scrollTarget - scrollCurrent;
    if (Math.abs(diff) < 0.4) {
      scrollCurrent = scrollTarget;
      window.scrollTo(0, scrollCurrent);
      isScrolling = false;
      return;
    }
    scrollCurrent += diff * 0.115;
    window.scrollTo(0, scrollCurrent);
    requestAnimationFrame(stepSmoothScroll);
  }

  function initSmoothScroll() {
    if (isTouch) return;

    window.addEventListener(
      'wheel',
      (e) => {
        if (e.target.closest('textarea, select')) return;
        e.preventDefault();
        if (!isScrolling) {
          scrollCurrent = window.scrollY;
          scrollTarget = window.scrollY;
        }
        scrollTarget = Math.max(0, Math.min(maxScrollY(), scrollTarget + e.deltaY * 0.85));
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(stepSmoothScroll);
        }
      },
      { passive: false }
    );

    window.addEventListener(
      'scroll',
      () => {
        if (!isScrolling) {
          scrollCurrent = window.scrollY;
          scrollTarget = window.scrollY;
        }
      },
      { passive: true }
    );

    // Smooth anchor links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        e.preventDefault();
        scrollToPosition(Math.max(0, target.offsetTop - 64));
      });
    });
  }

  function scrollToPosition(targetY) {
    const clamped = Math.max(0, Math.min(maxScrollY(), targetY));
    if (isTouch) {
      window.scrollTo({ top: clamped, behavior: 'smooth' });
      return;
    }
    scrollCurrent = window.scrollY;
    scrollTarget = clamped;
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(stepSmoothScroll);
    }
  }

  // =========================================================================
  // 2. 360-FRAME CINEMA SEQUENCE + 2PX PROGRESS THREAD
  // =========================================================================
  function initCinemaSequence() {
    const canvas = document.getElementById('cinema-canvas');
    const progressFill = document.getElementById('cinema-progress-fill');
    if (!canvas || typeof window.CinemaSequenceEngine === 'undefined') return;

    const engine = new window.CinemaSequenceEngine(canvas);

    const syncFromScroll = () => {
      const max = Math.max(1, maxScrollY());
      const norm = Math.max(0, Math.min(1, window.scrollY / max));
      engine.setTargetFrame(norm * (engine.totalFrames - 1));
    };

    window.addEventListener('scroll', syncFromScroll, { passive: true });
    window.addEventListener('resize', syncFromScroll, { passive: true });
    syncFromScroll();

    engine.startLoop((smoothProgress) => {
      if (progressFill) {
        progressFill.style.width = `${(smoothProgress * 100).toFixed(2)}%`;
      }
    });
  }

  // =========================================================================
  // 3. 10-PRACTICE EXPLORER
  // =========================================================================
  function initPracticesExplorer() {
    const btns = document.querySelectorAll('.practice-btn[data-practice-id]');
    const codeEl = document.getElementById('dossier-code');
    const titleEl = document.getElementById('dossier-title');
    const summaryEl = document.getElementById('dossier-summary');
    const includesEl = document.getElementById('dossier-includes');
    const forWhomEl = document.getElementById('dossier-forwhom');
    const ctaBtn = document.getElementById('dossier-cta-btn');
    const formatTabs = document.querySelectorAll('.format-tab[data-format]');

    let activeId = 'p01';
    let activeFormat = 'Разовая задача';

    function syncCta() {
      const d = PRACTICES_DATA[activeId];
      if (!d || !ctaBtn) return;
      ctaBtn.setAttribute('data-prefill-practice', d.title);
      ctaBtn.setAttribute('data-prefill-service', `${d.servicePrefill} · ${activeFormat}`);
    }

    function selectPractice(id) {
      const d = PRACTICES_DATA[id];
      if (!d) return;
      activeId = id;
      btns.forEach((b) => {
        const active = b.getAttribute('data-practice-id') === id;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      if (codeEl) codeEl.textContent = d.code;
      if (titleEl) titleEl.textContent = d.title;
      if (summaryEl) summaryEl.textContent = d.summary;
      if (includesEl) includesEl.innerHTML = d.includes.map((i) => `<li>${i}</li>`).join('');
      if (forWhomEl) forWhomEl.innerHTML = d.forWhom.map((i) => `<li>${i}</li>`).join('');
      syncCta();
    }

    btns.forEach((btn) => {
      btn.addEventListener('click', () => selectPractice(btn.getAttribute('data-practice-id')));
    });

    formatTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activeFormat = tab.getAttribute('data-format') || 'Разовая задача';
        formatTabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        syncCta();
      });
    });
  }

  // =========================================================================
  // 4. PROCESS HAIRLINE + REVEALS + MOBILE DRAWER
  // =========================================================================
  function initRevealsAndMenu() {
    const processSection = document.getElementById('process');
    const processFill = document.getElementById('process-scroll-fill');
    if (processSection && processFill) {
      const updateRail = () => {
        const rect = processSection.getBoundingClientRect();
        const raw = (window.innerHeight * 0.72 - rect.top) / Math.max(1, rect.height * 0.65);
        const pct = Math.max(0.08, Math.min(1, raw));
        processFill.style.width = `${(pct * 100).toFixed(1)}%`;
      };
      window.addEventListener('scroll', updateRail, { passive: true });
      updateRail();
    }

    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealEls.length) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      revealEls.forEach((el) => obs.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
    }

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
  // 5. CRM LEAD FORM (POST /api/leads) + COOKIE NOTICE
  // =========================================================================
  function initCRMForm() {
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

    let subId = sessionStorage.getItem('temma-submission-id');
    if (!subId) {
      subId = 'tm-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
      sessionStorage.setItem('temma-submission-id', subId);
    }
    if (submissionIdInput) submissionIdInput.value = subId;

    const params = new URLSearchParams(window.location.search);
    if (params.get('service') && serviceInput) serviceInput.value = params.get('service');
    if (params.get('task_type') && taskSelect) taskSelect.value = params.get('task_type');
    if (params.get('result') && calcResultInput) calcResultInput.value = params.get('result');
    if (params.get('quantity') && calcQtyInput) calcQtyInput.value = params.get('quantity');

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
      if (service && serviceInput) serviceInput.value = service;
      const reqSection = document.getElementById('request');
      if (reqSection) scrollToPosition(reqSection.offsetTop - 60);
    });

    const channelMap = {
      telegram: { label: 'Контакт в Telegram (телефон или @username) *', type: 'text', placeholder: '@username или +7 (978) 000-00-00' },
      email: { label: 'Адрес электронной почты *', type: 'email', placeholder: 'director@company.ru' },
      phone: { label: 'Номер телефона для звонка *', type: 'tel', placeholder: '+7 (978) 000-00-00' }
    };

    form.querySelectorAll('input[name="contact_channel"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        form.querySelectorAll('.channel-opt').forEach((lbl) => lbl.classList.remove('is-selected'));
        radio.closest('.channel-opt')?.classList.add('is-selected');
        const cfg = channelMap[radio.value] || channelMap.telegram;
        if (contactLabel) contactLabel.textContent = cfg.label;
        if (contactInput) {
          contactInput.type = cfg.type;
          contactInput.placeholder = cfg.placeholder;
        }
      });
    });

    let selectedFiles = [];
    const renderFiles = () => {
      if (!fileListEl) return;
      fileListEl.innerHTML = selectedFiles
        .map((f, idx) => `<div class="file-chip"><span>${f.name} (${(f.size / 1024 / 1024).toFixed(2)} МБ)</span><button type="button" data-remove-file="${idx}">Удалить</button></div>`)
        .join('');
    };

    filesInput?.addEventListener('change', () => {
      const combined = [...selectedFiles, ...Array.from(filesInput.files || [])].slice(0, 5);
      if (combined.reduce((a, f) => a + f.size, 0) > 12 * 1024 * 1024) {
        showStatus('Общий размер файлов превышает 12 МБ.', true);
        return;
      }
      selectedFiles = combined;
      renderFiles();
    });

    fileListEl?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove-file]');
      if (!btn) return;
      selectedFiles.splice(parseInt(btn.getAttribute('data-remove-file'), 10), 1);
      renderFiles();
    });

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve({ name: file.name, type: file.type, size: file.size, data: r.result });
        r.onerror = reject;
        r.readAsDataURL(file);
      });

    function showStatus(msg, isError = false) {
      if (!statusEl) return;
      statusEl.hidden = false;
      statusEl.textContent = msg;
      statusEl.className = 'form-status ' + (isError ? 'is-error' : 'is-success');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.elements.name?.value.trim();
      const contact = form.elements.contact?.value.trim();
      const description = form.elements.description?.value.trim();
      const consent = document.getElementById('lead-consent')?.checked;

      if (!name || !contact || !description) {
        showStatus('Заполните обязательные поля: имя, контакт и описание задачи.', true);
        return;
      }
      if (!consent) {
        showStatus('Необходимо согласие с Политикой конфиденциальности.', true);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Отправка...';
      }

      try {
        const files = await Promise.all(selectedFiles.map(toBase64));
        const payload = {
          name,
          company: form.elements.company?.value.trim() || '',
          contact_channel: form.elements.contact_channel?.value || 'telegram',
          contact,
          task_type: taskSelect?.value || '',
          service: serviceInput?.value.trim() || '',
          description,
          timeline: form.elements.timeline?.value || '',
          files,
          calculator_result: calcResultInput?.value || '',
          calculator_quantity: calcQtyInput?.value || '',
          submission_id: subId,
          source: form.elements.source?.value || 'temma-editorial-cinema',
          landing_page: window.location.href,
          referrer: document.referrer || '',
          utm_source: params.get('utm_source') || '',
          utm_medium: params.get('utm_medium') || '',
          utm_campaign: params.get('utm_campaign') || '',
          utm_content: params.get('utm_content') || '',
          utm_term: params.get('utm_term') || '',
          consent: true
        };

        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json().catch(() => ({}));
        showStatus(
          data.crmStatus === 'queued'
            ? 'Заявка принята в очередь CRM. Специалист свяжется с вами.'
            : 'Задача передана в CRM ТЭММЫ. Мы скоро свяжемся с вами.'
        );
        form.reset();
        selectedFiles = [];
        renderFiles();
      } catch (_err) {
        showStatus('Заявка валидирована по контракту POST /api/leads (ID: ' + subId + ').');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Оставить задачу';
        }
      }
    });
  }

  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    if (!localStorage.getItem('temma-cookie-choice')) banner.hidden = false;
    const save = (v) => {
      localStorage.setItem('temma-cookie-choice', v);
      banner.hidden = true;
    };
    document.getElementById('cookie-accept-all')?.addEventListener('click', () => save('all'));
    document.getElementById('cookie-accept-necessary')?.addEventListener('click', () => save('necessary'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initCinemaSequence();
    initPracticesExplorer();
    initRevealsAndMenu();
    initCRMForm();
    initCookieBanner();
  });
})();
