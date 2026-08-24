'use client';

import { FormEvent, useEffect, useState } from 'react';

type Language = 'ru' | 'en';

const contactMethods = [
  { id: 'email', label: { ru: 'Email', en: 'Email' }, fieldLabel: { ru: 'Email', en: 'Email' }, placeholder: 'name@example.com', type: 'email', autoComplete: 'email' },
  { id: 'telegram', label: { ru: 'Telegram', en: 'Telegram' }, fieldLabel: { ru: 'Telegram', en: 'Telegram' }, placeholder: '@username', type: 'text', autoComplete: 'off' },
  { id: 'phone', label: { ru: 'Телефон', en: 'Phone' }, fieldLabel: { ru: 'Телефон', en: 'Phone' }, placeholder: '+7 900 000-00-00', type: 'tel', autoComplete: 'tel' },
  { id: 'whatsapp', label: { ru: 'WhatsApp', en: 'WhatsApp' }, fieldLabel: { ru: 'WhatsApp', en: 'WhatsApp' }, placeholder: '+7 900 000-00-00', type: 'tel', autoComplete: 'tel' },
] as const;

type ContactMethod = (typeof contactMethods)[number]['id'];

const content = {
  ru: {
    menu: 'Меню', close: 'Закрыть', read: 'Открыть', back: 'Назад',
    nav: ['Главная', 'О компании', 'Ценности', 'Новости и инсайты', 'Контакты'],
    heroKicker: 'Moscow Consulting Group · С 2010 года',
    heroTitle: ['Стратегические решения', 'для реального бизнеса.'],
    heroText: 'Управленческая экспертиза и цифровые решения, которые работают на практике.',
    explore: 'Далее',
    aboutLabel: 'О компании',
    aboutTitle: ['Moscow', 'Consulting', 'Group.'],
    aboutLead: 'Помогаем компаниям повышать эффективность, определять стратегические приоритеты и внедрять необходимые изменения.',
    about: [
      'Соединяем классические инструменты управленческого консалтинга с инновационными цифровыми решениями.',
      'Для каждого проекта формируем независимую команду консультантов и отраслевых экспертов.',
      'Работаем с 2010 года и фокусируемся на решениях, которые можно внедрить в реальном бизнесе.',
    ],
    valuesLabel: 'Ценности', valuesTitle: 'Принципы нашей работы.',
    values: [
      { title: 'Индивидуальный подход', text: 'Структуру и график реализации определяем отдельно для каждого проекта, исходя из задачи клиента.' },
      { title: 'Независимая экспертиза', text: 'Объединяем собственных специалистов, независимых консультантов и отраслевых экспертов.' },
      { title: 'Развитие решений', text: 'Постоянно расширяем применение инноваций, новых технологий и цифровых инструментов.' },
    ],
    insightsLabel: 'Новости и инсайты', insightsTitle: 'Избранные материалы.', insightsIntro: 'Материалы MCG — о технологиях, проектной работе и практических изменениях в бизнесе.',
    contactLabel: 'Контакты', contactTitle: 'Связаться с MCG.', contactText: 'Москва · Работаем с клиентами в России и СНГ.',
    name: 'Имя', method: 'Как связаться', topic: 'Тема обращения', topicHint: 'Выберите тему', comment: 'Комментарий', commentHint: 'Коротко опишите задачу', send: 'Отправить',
    privacy: 'Отправляя форму, вы соглашаетесь на обработку указанных данных.', sent: 'Спасибо. Это демо-форма — в финальной версии подключим выбранный канал связи.',
    topics: ['Стать клиентом', 'Партнёрство', 'Публикации', 'Другое'],
    articleLabel: 'MCG · Новости и инсайты', archive: 'Архив MCG', draft: 'Черновик публикации MCG',
  },
  en: {
    menu: 'Menu', close: 'Close', read: 'Open', back: 'Back',
    nav: ['Home', 'The firm', 'Values', 'News & insights', 'Contact'],
    heroKicker: 'Moscow Consulting Group · Since 2010',
    heroTitle: ['Strategic solutions', 'for real business.'],
    heroText: 'Management expertise and digital solutions designed to work in practice.',
    explore: 'Explore',
    aboutLabel: 'The firm',
    aboutTitle: ['Moscow', 'Consulting', 'Group.'],
    aboutLead: 'We help companies improve performance, define strategic priorities and implement the changes they need.',
    about: [
      'We combine established management consulting methods with innovative digital solutions.',
      'For every project, we form an independent team of consultants and industry experts.',
      'Since 2010, we have focused on solutions that can be implemented in real businesses.',
    ],
    valuesLabel: 'Values', valuesTitle: 'How we work.',
    values: [
      { title: 'A tailored approach', text: 'The structure and delivery plan are defined separately for every project around the client’s task.' },
      { title: 'Independent expertise', text: 'We combine in-house specialists, independent consultants and industry experts.' },
      { title: 'Evolving solutions', text: 'We continuously expand our use of innovation, new technologies and digital tools.' },
    ],
    insightsLabel: 'News & insights', insightsTitle: 'Selected stories.', insightsIntro: 'MCG perspectives on technology, project delivery and practical change in business.',
    contactLabel: 'Contact', contactTitle: 'Contact MCG.', contactText: 'Moscow · Working with clients in Russia and the CIS.',
    name: 'Name', method: 'How to contact you', topic: 'Subject', topicHint: 'Select a subject', comment: 'Comment', commentHint: 'Briefly describe your task', send: 'Send',
    privacy: 'By sending the form, you consent to processing the data provided.', sent: 'Thank you. This is a demo form — the final version will connect to your preferred channel.',
    topics: ['Become a client', 'Partnership', 'Publications', 'Other'],
    articleLabel: 'MCG · News & insights', archive: 'MCG archive', draft: 'MCG publication draft',
  },
};

const insights = [
  {
    id: 'digital-solutions', image: '/media/insight-01.jpg', kind: { ru: 'Экспертиза', en: 'Expertise' }, title: { ru: 'Цифровые решения', en: 'Digital solutions' },
    excerpt: { ru: 'Технологии открывают новые каналы повышения эффективности, новые рынки и способы взаимодействия с потребителями.', en: 'Technology opens new ways to improve performance, discover markets and communicate with customers.' },
    body: { ru: ['Мы помогаем клиентам анализировать рынок цифровых технологий и находить решения, способные улучшить показатели бизнеса.', 'В зависимости от задачи MCG проводит обучение современным подходам к разработке продуктов или создаёт решения под ключ.'], en: ['We help clients analyze the digital technology market and find solutions capable of improving business performance.', 'Depending on the task, MCG provides training in advanced product development approaches or creates turnkey solutions.'] },
  },
  {
    id: 'our-approach', image: '/media/insight-02.jpg', kind: { ru: 'Подход', en: 'Approach' }, title: { ru: 'Как мы работаем', en: 'How we work' },
    excerpt: { ru: 'Индивидуальный подход к каждому проекту — от определения объёма работ до структуры и графика реализации.', en: 'A tailored approach to every project — from defining the scope to designing its framework and delivery plan.' },
    body: { ru: ['MCG разрабатывает структуру и график реализации проекта на этапе определения объёма работ, учитывая конкретные потребности клиента.', 'Такой подход помогает сосредоточить команду на прагматичных и релевантных результатах для бизнеса.'], en: ['MCG develops a custom framework and delivery plan at the project scoping stage, taking each client’s needs into account.', 'This approach keeps the team focused on pragmatic and relevant results for the business.'] },
  },
  {
    id: 'business-model', image: '/media/insight-03.jpg', kind: { ru: 'Бизнес-модель', en: 'Business model' }, title: { ru: 'Гибкая проектная модель', en: 'A flexible project model' },
    excerpt: { ru: 'Проектные команды формируются под индивидуальные потребности клиента и требуемый набор экспертизы.', en: 'Project teams are formed around each client’s needs and the specific mix of expertise required.' },
    body: { ru: ['Для реализации проектов MCG сочетает собственных специалистов с тщательно отобранными независимыми консультантами и отраслевыми экспертами.', 'Команда формируется специально под задачу клиента и требуемый набор отраслевой и функциональной экспертизы.'], en: ['For every project, MCG combines in-house specialists with carefully selected independent consultants and industry experts.', 'Each team is formed specifically around the client’s task and the required mix of industry and functional expertise.'] },
  },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>('ru');
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [activeInsight, setActiveInsight] = useState<(typeof insights)[number] | null>(null);
  const [sent, setSent] = useState(false);
  const t = content[language];
  const selectedContact = contactMethods.find((method) => method.id === contactMethod)!;

  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    document.body.style.overflow = menuOpen || activeInsight ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, activeInsight]);
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    root.classList.add('reveal-ready');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { elements.forEach((element) => element.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }), { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [language]);

  function goTo(id: string) { setMenuOpen(false); window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100); }
  function submitContact(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }

  return (
    <main>
      <section className="hero" id="top">
        <video className="hero-video" src="/media/mcg-hero.mp4" autoPlay muted loop playsInline preload="metadata" />
        <div className="hero-shade" aria-hidden="true" />
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="MCG — home">MCG</a>
          <div className="header-actions">
            <button className="language" type="button" onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')} aria-label={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}><span className={language === 'ru' ? 'active' : ''}>RU</span><i>/</i><span className={language === 'en' ? 'active' : ''}>EN</span></button>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label={t.menu}><span /><span /><span /></button>
          </div>
        </header>
        <div className="hero-content" key={language} data-reveal>
          <p className="eyebrow light">{t.heroKicker}</p>
          <h1>{t.heroTitle.map((line) => <span key={line}>{line}</span>)}</h1>
          <div className="hero-bottom"><p>{t.heroText}</p><a className="circle-link" href="#firm" aria-label={t.explore}>↓</a></div>
        </div>
      </section>

      <section className="about light-section" id="firm">
        <div className="section-heading" data-reveal><p className="eyebrow">01 · {t.aboutLabel}</p><span>MCG / Moscow</span></div>
        <div className="about-lead" data-reveal data-reveal-delay="1"><h2>{t.aboutTitle.map((line) => <span key={line}>{line}</span>)}</h2><p>{t.aboutLead}</p></div>
        <div className="three-copy" data-reveal>{t.about.map((paragraph, index) => <article key={paragraph}><span>0{index + 1}</span><p>{paragraph}</p></article>)}</div>
      </section>

      <section className="values dark-section" id="values">
        <div className="values-backdrop" aria-hidden="true" />
        <div className="values-inner">
          <div className="section-heading dark-heading" data-reveal><p className="eyebrow light">02 · {t.valuesLabel}</p><span>Since 2010</span></div>
          <h2 data-reveal>{t.valuesTitle}</h2>
          <div className="value-grid">{t.values.map((value, index) => <article key={value.title} data-reveal data-reveal-delay={String(index + 1)}><span>0{index + 1}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div>
        </div>
      </section>

      <section className="insights light-section" id="insights">
        <div className="section-heading" data-reveal><p className="eyebrow">03 · {t.insightsLabel}</p><span>MCG / Archive</span></div>
        <div className="insights-lead" data-reveal><h2>{t.insightsTitle}</h2><p>{t.insightsIntro}</p></div>
        <div className="insight-grid">{insights.map((item, index) => <article className="insight-card" key={item.id} data-reveal data-reveal-delay={String(index + 1)}><button type="button" onClick={() => setActiveInsight(item)} aria-label={`${t.read}: ${item.title[language]}`}><div className="insight-image"><img src={item.image} alt="" /><span>0{index + 1}</span></div><div className="insight-meta"><span>{item.kind[language]}</span><span>{t.archive}</span></div><h3>{item.title[language]}</h3><p>{item.excerpt[language]}</p><span className="card-link">{t.read}<i>↗</i></span></button></article>)}</div>
      </section>

      <section className="contact dark-section" id="contact">
        <div className="section-heading dark-heading" data-reveal><p className="eyebrow light">04 · {t.contactLabel}</p><span>Moscow</span></div>
        <div className="contact-layout">
          <div className="contact-copy" data-reveal><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
          <form className="contact-form" onSubmit={submitContact} data-reveal data-reveal-delay="1">
            <label><span>{t.name}</span><input name="name" type="text" autoComplete="name" required /></label>
            <div className="contact-method-row"><span id="contact-method-label">{t.method}</span><div className="contact-methods" role="group" aria-labelledby="contact-method-label">{contactMethods.map((method) => <button key={method.id} type="button" className={contactMethod === method.id ? 'active' : ''} onClick={() => { setContactMethod(method.id); setSent(false); }} aria-pressed={contactMethod === method.id}>{method.label[language]}</button>)}</div></div>
            <label className="contact-detail-field" key={contactMethod}><span>{selectedContact.fieldLabel[language]}</span><input name="contact" type={selectedContact.type} autoComplete={selectedContact.autoComplete} placeholder={selectedContact.placeholder} required /></label>
            <label><span>{t.topic}</span><select key={language} name="topic" defaultValue="" required><option value="" disabled>{t.topicHint}</option>{t.topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}</select></label>
            <label className="message-field"><span>{t.comment}</span><textarea name="comment" placeholder={t.commentHint} rows={3} required /></label>
            <div className="form-bottom"><p>{sent ? t.sent : t.privacy}</p><button type="submit" className="submit-button">{t.send}<span>↗</span></button></div>
          </form>
        </div>
        <div className="contact-socials" data-reveal><a href="https://www.linkedin.com/company/moscow-consulting-group/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a></div>
      </section>

      <footer><a className="wordmark footer-mark" href="#top">MCG</a><p>© 2026 Moscow Consulting Group</p><p>Moscow</p></footer>

      <div className={`menu-overlay ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="overlay-header"><span className="wordmark inverse">MCG</span><button className="close-button" type="button" onClick={() => setMenuOpen(false)} aria-label={t.close}>×</button></div>
        <nav>{t.nav.map((item, index) => { const ids = ['top', 'firm', 'values', 'insights', 'contact']; return <button key={item} type="button" onClick={() => goTo(ids[index])}><span>0{index + 1}</span>{item}<i>↘</i></button>; })}</nav>
        <div className="menu-footer"><p>Moscow Consulting Group</p><p>2010—2026</p></div>
      </div>

      <aside className={`insight-panel ${activeInsight ? 'is-open' : ''}`} aria-hidden={!activeInsight}>
        {activeInsight && <><div className="panel-top"><p className="eyebrow">{t.articleLabel}</p><button className="close-button panel-close" type="button" onClick={() => setActiveInsight(null)} aria-label={t.close}>×</button></div><div className="article-content"><div className="article-meta"><span>{activeInsight.kind[language]}</span><span>{t.archive}</span></div><h2>{activeInsight.title[language]}</h2><p className="article-lead">{activeInsight.excerpt[language]}</p><img className="article-image" src={activeInsight.image} alt="" /><div className="article-body">{activeInsight.body[language].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><p className="draft-note">{t.draft}</p><button className="back-link" type="button" onClick={() => setActiveInsight(null)}>← {t.back}</button></div></>}
      </aside>
    </main>
  );
}
