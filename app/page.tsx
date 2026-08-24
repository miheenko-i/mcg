'use client';

import { FormEvent, useEffect, useState } from 'react';

type Language = 'ru' | 'en';

const contactMethods = [
  {
    id: 'email',
    label: { ru: 'Email', en: 'Email' },
    fieldLabel: { ru: 'Email', en: 'Email' },
    placeholder: { ru: 'name@example.com', en: 'name@example.com' },
    type: 'email',
    autoComplete: 'email',
  },
  {
    id: 'telegram',
    label: { ru: 'Telegram', en: 'Telegram' },
    fieldLabel: { ru: 'Telegram', en: 'Telegram' },
    placeholder: { ru: '@username', en: '@username' },
    type: 'text',
    autoComplete: 'off',
  },
  {
    id: 'phone',
    label: { ru: 'Телефон', en: 'Phone' },
    fieldLabel: { ru: 'Телефон', en: 'Phone' },
    placeholder: { ru: '+7 900 000-00-00', en: '+1 000 000 0000' },
    type: 'tel',
    autoComplete: 'tel',
  },
  {
    id: 'whatsapp',
    label: { ru: 'WhatsApp', en: 'WhatsApp' },
    fieldLabel: { ru: 'WhatsApp', en: 'WhatsApp' },
    placeholder: { ru: '+7 900 000-00-00', en: '+1 000 000 0000' },
    type: 'tel',
    autoComplete: 'tel',
  },
] as const;

type ContactMethod = (typeof contactMethods)[number]['id'];

const contactTopics = {
  ru: ['Стать клиентом', 'Партнёрство', 'Публикации', 'Другое'],
  en: ['Become a client', 'Partnership', 'Publications', 'Other'],
};

const heroContent = {
  ru: {
    label: 'Moscow Consulting Group · С 2010 года',
    lines: ['Стратегические', 'решения для', 'реального бизнеса.'],
    accentText: 'реального бизнеса.',
    note: 'Глобальная сеть профессионалов мирового уровня с широким набором талантов и экспертизы. С 2010 года.',
  },
  en: {
    label: 'Moscow Consulting Group · Since 2010',
    lines: ['Strategic solutions', 'for real business.'],
    accentText: 'real business.',
    note: 'A global network of world-class professionals with a wide variety of talents and expertise. Since 2010.',
  },
};

const approachSlides = {
  ru: [
    {
      title: 'Гибкая команда.',
      text: 'MCG подбирает проектную команду под индивидуальные потребности каждого клиента.',
    },
    {
      title: 'Цифровые решения.',
      text: 'Мы непрерывно расширяем набор используемых инноваций и новых технологий.',
    },
    {
      title: 'Индивидуальный подход.',
      text: 'Структура и график реализации разрабатываются отдельно для каждого проекта.',
    },
  ],
  en: [
    {
      title: 'Flexible teams.',
      text: "MCG forms each project team around the client's individual needs.",
    },
    {
      title: 'Digital solutions.',
      text: 'We continuously expand our use of innovation and new technologies.',
    },
    {
      title: 'A tailored approach.',
      text: 'The framework and delivery plan are developed separately for every project.',
    },
  ],
};

const copy = {
  ru: {
    nav: ['О компании', 'Публикации', 'Контакты'],
    people: 'Команда',
    menuLabel: 'Навигация',
    close: 'Закрыть',
    scroll: 'Смотреть дальше',
    firmKicker: '01 · О компании',
    firmMeta: 'Москва · Глобальная сеть',
    firmTitleA: 'Moscow',
    firmTitleB: 'Consulting Group',
    firmLead:
      'Помогаем компаниям повышать эффективность, определять стратегические приоритеты и внедрять изменения для устойчивого развития.',
    firmBodyA:
      'Управленческий консалтинг и инновационные цифровые решения.',
    firmBodyB:
      'Независимая команда консультантов и отраслевых экспертов для каждого проекта.',
    firmBodyC:
      'Постоянно внедряем новые технологии и цифровые решения.',
    maximLabel: 'Наш подход',
    insightsKicker: '02 · Публикации',
    insightsTitle: 'Публикации MCG.',
    insightsIntro:
      'Материалы со старого сайта показаны как пример редактируемого раздела публикаций.',
    read: 'Открыть',
    archive: 'Все публикации',
    contactKicker: '03 · Контакты',
    contactMeta: 'Москва · Россия и СНГ',
    socialLinksLabel: 'Соцсети',
    contactTitle: 'Связаться с MCG.',
    contactIntro: 'Москва · Работаем с клиентами в России и СНГ.',
    name: 'Имя',
    contactMethod: 'Как связаться',
    topic: 'Тема обращения',
    topicHint: 'Выберите тему',
    comment: 'Комментарий',
    commentHint: 'Ваш комментарий',
    send: 'Отправить',
    sent: 'Спасибо. Это демо-форма — в финальной версии подключим выбранный канал связи.',
    privacy: 'Отправляя форму, вы соглашаетесь на обработку указанных данных.',
    footerNote: 'Москва / Moscow',
    peopleKicker: 'Команда',
    peopleTitle: 'Команда MCG.',
    founder: 'Основатель MCG',
    back: 'Вернуться на главную',
    cipherCaption: 'Глобальная сеть / Экспертиза / Технологии',
    insightCardLabel: 'MCG / ПУБЛИКАЦИИ',
    insightPanelKicker: 'MCG · Публикации',
    draftNote: 'Черновик / публикации / MCG',
  },
  en: {
    nav: ['The firm', 'Insights', 'Contact'],
    people: 'Our people',
    menuLabel: 'Navigation',
    close: 'Close',
    scroll: 'Explore',
    firmKicker: '01 · The firm',
    firmMeta: 'Moscow · Global network',
    firmTitleA: 'Moscow',
    firmTitleB: 'Consulting Group',
    firmLead:
      'We help companies improve performance, define strategic priorities and implement change for sustainable growth.',
    firmBodyA:
      'Management consulting and innovative digital solutions.',
    firmBodyB:
      'An independent team of consultants and industry experts for every project.',
    firmBodyC:
      'We continuously adopt new technologies and digital solutions.',
    maximLabel: 'Our approach',
    insightsKicker: '02 · Insights',
    insightsTitle: 'MCG publications.',
    insightsIntro:
      'Material from the previous site is shown as an example of an editable publications section.',
    read: 'Open',
    archive: 'All publications',
    contactKicker: '03 · Contact',
    contactMeta: 'Moscow · Russia and the CIS',
    socialLinksLabel: 'Social',
    contactTitle: 'Contact MCG.',
    contactIntro: 'Moscow · Working with clients in Russia and the CIS.',
    name: 'Name',
    contactMethod: 'How to contact you',
    topic: 'Subject',
    topicHint: 'Select a subject',
    comment: 'Comment',
    commentHint: 'Your comment',
    send: 'Send',
    sent: 'Thank you. This is a demo form — the final version will connect to your preferred channel.',
    privacy: 'By sending the form, you consent to processing the data provided.',
    footerNote: 'Moscow',
    peopleKicker: 'Our people',
    peopleTitle: 'The MCG team.',
    founder: 'MCG founder',
    back: 'Back to the site',
    cipherCaption: 'Global network / Expertise / Technology',
    insightCardLabel: 'MCG / PUBLICATIONS',
    insightPanelKicker: 'MCG · Insights',
    draftNote: 'Draft / publications / MCG',
  },
};

// Draft CMS-shaped content sourced and shortened from the previous MCG website.
const insights = [
  {
    id: 'digital-solutions',
    kind: { ru: 'Экспертиза', en: 'Expertise' },
    date: { ru: 'Архив MCG', en: 'MCG archive' },
    title: {
      ru: 'Цифровые решения',
      en: 'Digital solutions',
    },
    excerpt: {
      ru: 'Технологии открывают новые каналы повышения эффективности, новые рынки и способы взаимодействия с потребителями. MCG помогает определить решения, которые влияют на результат.',
      en: 'Technology opens new ways to improve business effectiveness, discover markets and communicate with customers. MCG helps identify solutions that make a measurable difference.',
    },
    body: {
      ru: [
        'Мы помогаем клиентам анализировать рынок цифровых технологий и находить решения, способные улучшить показатели бизнеса.',
        'В зависимости от задачи MCG проводит обучение современным подходам к разработке продуктов или создаёт решения под ключ.',
      ],
      en: [
        'We help clients analyze the digital technology market and find solutions capable of improving business performance.',
        'Depending on the task, MCG provides training in advanced product development approaches or creates turnkey solutions.',
      ],
    },
    motif: 'radar',
  },
  {
    id: 'our-approach',
    kind: { ru: 'О компании', en: 'The firm' },
    date: { ru: 'Архив MCG', en: 'MCG archive' },
    title: {
      ru: 'Наш подход к работе',
      en: 'How we work',
    },
    excerpt: {
      ru: 'Индивидуальный подход к каждому проекту — от определения объёма работ до структуры и графика реализации.',
      en: 'A tailored approach to every project — from defining the scope to designing its framework and delivery plan.',
    },
    body: {
      ru: [
        'MCG разрабатывает структуру и график реализации проекта на этапе определения объёма работ, учитывая конкретные потребности клиента.',
        'Такой подход помогает сосредоточить команду на прагматичных и релевантных результатах для бизнеса.',
      ],
      en: [
        'MCG develops a custom framework and delivery plan at the project scoping stage, taking each client’s specific needs into account.',
        'This approach keeps the team focused on pragmatic and relevant results for the business.',
      ],
    },
    motif: 'signal',
  },
  {
    id: 'business-model',
    kind: { ru: 'О компании', en: 'The firm' },
    date: { ru: 'Архив MCG', en: 'MCG archive' },
    title: {
      ru: 'Передовая бизнес-модель',
      en: 'An advanced business model',
    },
    excerpt: {
      ru: 'Гибкий подход к формированию проектных команд под индивидуальные потребности клиента — с нужным сочетанием внутренней и внешней экспертизы.',
      en: "A flexible approach to forming project teams around each client's needs, with the right combination of internal and external expertise.",
    },
    body: {
      ru: [
        'Для реализации проектов MCG сочетает собственных специалистов с тщательно отобранными независимыми консультантами и отраслевыми экспертами.',
        'Команда формируется специально под задачу клиента и требуемый набор отраслевой и функциональной экспертизы.',
        'MCG постоянно расширяет применение инноваций, новых технологий и цифровых решений, сохраняя фокус на практическом эффекте.',
      ],
      en: [
        'For every project, MCG combines in-house specialists with carefully selected independent consultants and industry experts.',
        'Each team is formed specifically around the client’s task and the required mix of industry and functional expertise.',
        'MCG continuously expands its use of innovation, new technologies and digital solutions while remaining focused on practical impact.',
      ],
    },
    motif: 'circle',
  },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>('ru');
  const [approachSlide, setApproachSlide] = useState(0);
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [menuOpen, setMenuOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [activeInsight, setActiveInsight] = useState<(typeof insights)[number] | null>(null);
  const [sent, setSent] = useState(false);
  const t = copy[language];
  const hero = heroContent[language];
  const approaches = approachSlides[language];
  const selectedContact = contactMethods.find((method) => method.id === contactMethod)!;

  useEffect(() => {
    if (menuOpen || peopleOpen || activeInsight) return;
    const timer = window.setInterval(
      () => setApproachSlide((current) => (current + 1) % approaches.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [menuOpen, peopleOpen, activeInsight, approaches.length]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || peopleOpen || activeInsight ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, peopleOpen, activeInsight]);

  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    root.classList.add('reveal-ready');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    elements.forEach((element) => {
      if (!element.classList.contains('is-visible')) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [language]);

  function goTo(id: string) {
    setMenuOpen(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <section className="hero" id="top">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="MCG — home">
            MCG<span className="wordmark-dot" />
          </a>
          <div className="header-actions">
            <button
              className="language"
              type="button"
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              aria-label={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
            >
              <span className={language === 'ru' ? 'active' : ''}>RU</span>
              <i>/</i>
              <span className={language === 'en' ? 'active' : ''}>EN</span>
            </button>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label={t.menuLabel}>
              <span />
              <span />
            </button>
          </div>
        </header>

        <div className="hero-intro" data-reveal>
          <p>{hero.note}</p>
        </div>

        <div className="hero-cipher" aria-hidden="true" data-reveal data-reveal-delay="1">
          <video
            className="hero-video"
            src="/media/mcg-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <div className="hero-copy" key={language} data-reveal>
          <h1>
            {hero.lines.map((line) => {
              const accentIndex = line.indexOf(hero.accentText);
              return (
                <span key={line}>
                  {accentIndex >= 0 ? (
                    <>
                      {line.slice(0, accentIndex)}
                      <em className="accent-line">{hero.accentText}</em>
                      {line.slice(accentIndex + hero.accentText.length)}
                    </>
                  ) : line}
                </span>
              );
            })}
          </h1>
        </div>

        <div className="hero-footer" data-reveal data-reveal-delay="2">
          <a className="round-link" href="#firm" aria-label={t.scroll}>
            <span>↓</span>
          </a>
        </div>
      </section>

      <section className="firm section-light" id="firm">
        <div className="firm-heading" data-reveal data-reveal-delay="1">
          <h2>
            {t.firmTitleA}
            <br />
            <em>
              {t.firmTitleB.split(' ').map((word) => <span key={word}>{word}</span>)}
            </em>
          </h2>
          <p className="firm-lead">{t.firmLead}</p>
        </div>
        <div className="firm-body" data-reveal>
          <span className="body-index">A / 02</span>
          <div className="firm-copy">
            <p>{t.firmBodyA}</p>
            <p>{t.firmBodyB}</p>
            <p>{t.firmBodyC}</p>
          </div>
        </div>
      </section>

      <section className={`maxim section-dark approach-${approachSlide + 1}`}>
        <div className="maxim-pattern" aria-hidden="true" />
        <div className="maxim-copy">
          <div className="approach-topline" data-reveal>
            <p className="eyebrow">{t.maximLabel}</p>
            <span>0{approachSlide + 1} / 03</span>
          </div>
          <div className="approach-stage" key={`${language}-${approachSlide}`}>
            <h2>{approaches[approachSlide].title}</h2>
            <p>{approaches[approachSlide].text}</p>
          </div>
          <div className="approach-controls" data-reveal data-reveal-delay="1" aria-label={language === 'ru' ? 'Слайды нашего подхода' : 'Our approach slides'}>
            <div>
              {approaches.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={approachSlide === index ? 'active' : ''}
                  onClick={() => setApproachSlide(index)}
                  aria-label={`${language === 'ru' ? 'Тезис' : 'Slide'} ${index + 1}`}
                >
                  <span />0{index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="insights section-light" id="insights">
        <div className="insights-intro" data-reveal data-reveal-delay="1">
          <h2>{t.insightsTitle}</h2>
          <p>{t.insightsIntro}</p>
        </div>
        <div className="insight-grid">
          {insights.map((item, index) => (
            <article className="insight-card" key={item.id} data-reveal data-reveal-delay={String(index + 1)}>
              <button type="button" onClick={() => setActiveInsight(item)} aria-label={`${t.read}: ${item.title[language]}`}>
                <div className={`insight-visual motif-${item.motif}`} aria-hidden="true">
                  <span>0{index + 1}</span>
                  <i>{t.insightCardLabel}</i>
                </div>
                <div className="insight-meta">
                  <span>{item.kind[language]}</span>
                  <time>{item.date[language]}</time>
                </div>
                <h3>{item.title[language]}</h3>
                <p>{item.excerpt[language]}</p>
                <span className="card-link">{t.read} <i>↗</i></span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section-dark" id="contact">
        <div className="contact-layout">
          <div className="contact-copy" data-reveal>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactIntro}</p>
          </div>
          <form className="contact-form" onSubmit={submitContact} data-reveal data-reveal-delay="1">
            <label>
              <span>{t.name}</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <div className="contact-method-row">
              <span id="contact-method-label">{t.contactMethod}</span>
              <div className="contact-methods" role="group" aria-labelledby="contact-method-label">
                {contactMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    className={contactMethod === method.id ? 'active' : ''}
                    onClick={() => {
                      setContactMethod(method.id);
                      setSent(false);
                    }}
                    aria-pressed={contactMethod === method.id}
                  >
                    {method.label[language]}
                  </button>
                ))}
              </div>
            </div>
            <label className="contact-detail-field" key={contactMethod}>
              <span>{selectedContact.fieldLabel[language]}</span>
              <input
                name="contact"
                type={selectedContact.type}
                autoComplete={selectedContact.autoComplete}
                placeholder={selectedContact.placeholder[language]}
                required
              />
            </label>
            <label>
              <span>{t.topic}</span>
              <select key={language} name="topic" defaultValue="" required>
                <option value="" disabled>{t.topicHint}</option>
                {contactTopics[language].map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </label>
            <label className="message-field">
              <span>{t.comment}</span>
              <textarea name="comment" placeholder={t.commentHint} rows={3} required />
            </label>
            <div className="form-bottom">
              <p>{sent ? t.sent : t.privacy}</p>
              <button type="submit" className="submit-button">
                {t.send}<span>↗</span>
              </button>
            </div>
          </form>
        </div>
        <div className="contact-socials" data-reveal>
          <div className="social-links">
            <a href="https://www.linkedin.com/company/moscow-consulting-group/" target="_blank" rel="noreferrer">
              <span>LinkedIn</span><i>↗</i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <span>Instagram</span><i>↗</i>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top">MCG<span className="wordmark-dot" /></a>
        <p>© 2026 Moscow Consulting Group</p>
        <p>{t.footerNote}</p>
      </footer>

      <div className={`menu-overlay ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="overlay-header">
          <span className="wordmark">MCG<span className="wordmark-dot" /></span>
          <button type="button" className="close-button" onClick={() => setMenuOpen(false)} aria-label={t.close}>×</button>
        </div>
        <nav>
          {t.nav.map((item, index) => {
            const ids = ['firm', 'insights', 'contact'];
            return (
              <button key={item} type="button" onClick={() => goTo(ids[index])}>
                <span>0{index + 1}</span>{item}<i>↘</i>
              </button>
            );
          })}
          <button className="people-link" type="button" onClick={() => { setMenuOpen(false); setPeopleOpen(true); }}>
            <span>04</span>{t.people}<i>→</i>
          </button>
        </nav>
        <div className="menu-footer">
          <p>Moscow Consulting Group</p>
          <a href="https://www.linkedin.com/company/moscow-consulting-group/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>

      <aside className={`people-panel ${peopleOpen ? 'is-open' : ''}`} aria-hidden={!peopleOpen}>
        <div className="panel-top">
          <p className="eyebrow">{t.peopleKicker}</p>
          <button type="button" className="close-button light-close" onClick={() => setPeopleOpen(false)} aria-label={t.close}>×</button>
        </div>
        <div className="people-content">
          <h2>{t.peopleTitle}</h2>
          <div className="people-list">
            <article><span>01</span><h3>Dmitry Plotnikov</h3><p>{t.founder}</p></article>
          </div>
          <button className="back-link" type="button" onClick={() => setPeopleOpen(false)}>← {t.back}</button>
        </div>
      </aside>

      <aside className={`insight-panel ${activeInsight ? 'is-open' : ''}`} aria-hidden={!activeInsight}>
        {activeInsight && (
          <>
            <div className="panel-top">
              <p className="eyebrow">{t.insightPanelKicker}</p>
              <button type="button" className="close-button light-close" onClick={() => setActiveInsight(null)} aria-label={t.close}>×</button>
            </div>
            <div className="article-content">
              <div className="article-meta"><span>{activeInsight.kind[language]}</span><time>{activeInsight.date[language]}</time></div>
              <h2>{activeInsight.title[language]}</h2>
              <p className="article-lead">{activeInsight.excerpt[language]}</p>
              <div className="article-rule" />
              <div className="article-body">
                {activeInsight.body[language].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="draft-note">{t.draftNote}</p>
              <button className="back-link" type="button" onClick={() => setActiveInsight(null)}>← {t.back}</button>
            </div>
          </>
        )}
      </aside>
    </main>
  );
}
