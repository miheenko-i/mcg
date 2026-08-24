'use client';

import { FormEvent, useEffect, useState } from 'react';

type Language = 'ru' | 'en';

const content = {
  ru: {
    menu: 'Меню', close: 'Закрыть', read: 'Открыть', back: 'Назад',
    nav: ['Главная', 'О компании', 'Ценности', 'Новости и инсайты', 'Контакты'],
    heroKicker: 'Moscow Consulting Group · С 2010 года',
    heroTitle: ['Стратегические решения', 'для реального бизнеса.'],
    heroText: 'Помогаем компаниям повышать эффективность, определять стратегические приоритеты и внедрять необходимые изменения.',
    explore: 'Далее',
    aboutLabel: 'О компании',
    aboutTitle: 'Управленческая экспертиза и цифровые решения, которые работают на практике.',
    about: [
      { title: 'Инструменты и технологии', text: 'Соединяем классические инструменты управленческого консалтинга с инновационными цифровыми решениями.' },
      { title: 'Команда проекта', text: 'Для каждого проекта формируем независимую команду консультантов и отраслевых экспертов.' },
      { title: 'Практический результат', text: 'Работаем с 2010 года и фокусируемся на решениях, которые можно внедрить в реальном бизнесе.' },
    ],
    valuesLabel: 'Ценности', valuesTitle: 'Высокие стандарты — эффективные решения.',
    values: [
      { title: 'Индивидуальный подход', text: 'Структуру и график реализации определяем отдельно для каждого проекта, исходя из задачи клиента.' },
      { title: 'Независимая экспертиза', text: 'Объединяем собственных специалистов, независимых консультантов и отраслевых экспертов.' },
      { title: 'Развитие решений', text: 'Постоянно расширяем применение инноваций, новых технологий и цифровых инструментов.' },
    ],
    insightsLabel: 'Новости и инсайты', insightsTitle: 'Избранные материалы.', insightsIntro: 'Материалы MCG — о технологиях, проектной работе и практических изменениях в бизнесе.',
    contactLabel: 'Контакты', contactTitle: 'Связаться с MCG.', contactText: 'Москва · Работаем с клиентами в России и СНГ.',
    email: 'Email', fullName: 'Имя и фамилия', company: 'Компания', jobTitle: 'Должность', country: 'Страна', countryHint: 'Выберите страну', send: 'Отправить',
    privacy: 'Отправляя форму, вы соглашаетесь на обработку указанных данных.', sent: 'Спасибо. Это демо-форма — в финальной версии подключим выбранный канал связи.',
    countries: ['Россия', 'Беларусь', 'Казахстан', 'Армения', 'Другая страна'],
    articleLabel: 'MCG · Новости и инсайты', archive: 'Архив MCG', draft: 'Черновик публикации MCG',
  },
  en: {
    menu: 'Menu', close: 'Close', read: 'Open', back: 'Back',
    nav: ['Home', 'The firm', 'Values', 'News & insights', 'Contact'],
    heroKicker: 'Moscow Consulting Group · Since 2010',
    heroTitle: ['Strategic solutions', 'for real business.'],
    heroText: 'We help companies improve performance, define strategic priorities and implement the changes they need.',
    explore: 'Explore',
    aboutLabel: 'The firm',
    aboutTitle: 'Management expertise and digital solutions that work in practice.',
    about: [
      { title: 'Methods and technology', text: 'We combine established management consulting methods with innovative digital solutions.' },
      { title: 'Project team', text: 'For every project, we form an independent team of consultants and industry experts.' },
      { title: 'Practical results', text: 'Since 2010, we have focused on solutions that can be implemented in real businesses.' },
    ],
    valuesLabel: 'Values', valuesTitle: 'High standards — effective solutions.',
    values: [
      { title: 'A tailored approach', text: 'The structure and delivery plan are defined separately for every project around the client’s task.' },
      { title: 'Independent expertise', text: 'We combine in-house specialists, independent consultants and industry experts.' },
      { title: 'Evolving solutions', text: 'We continuously expand our use of innovation, new technologies and digital tools.' },
    ],
    insightsLabel: 'News & insights', insightsTitle: 'Selected stories.', insightsIntro: 'MCG perspectives on technology, project delivery and practical change in business.',
    contactLabel: 'Contact', contactTitle: 'Contact MCG.', contactText: 'Moscow · Working with clients in Russia and the CIS.',
    email: 'Email Address', fullName: 'First and Last Name', company: 'Company', jobTitle: 'Job Title', country: 'Country', countryHint: 'Select a country', send: 'Send',
    privacy: 'By sending the form, you consent to processing the data provided.', sent: 'Thank you. This is a demo form — the final version will connect to your preferred channel.',
    countries: ['Russia', 'Belarus', 'Kazakhstan', 'Armenia', 'Other country'],
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
  const [activeInsight, setActiveInsight] = useState<(typeof insights)[number] | null>(null);
  const [sent, setSent] = useState(false);
  const t = content[language];

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
        <div className="about-label" data-reveal><span aria-hidden="true" /><p className="eyebrow">{t.aboutLabel}</p></div>
        <div className="about-lead" data-reveal data-reveal-delay="1"><h2>{t.aboutTitle}</h2></div>
        <div className="three-copy" data-reveal>{t.about.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="values dark-section" id="values">
        <div className="values-backdrop" aria-hidden="true" />
        <div className="values-inner">
          <div className="section-heading dark-heading" data-reveal><p className="eyebrow light">{t.valuesLabel}</p></div>
          <h2 data-reveal>{t.valuesTitle}</h2>
          <div className="value-grid">{t.values.map((value, index) => <article key={value.title} data-reveal data-reveal-delay={String(index + 1)}><span>0{index + 1}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div>
        </div>
      </section>

      <section className="insights light-section" id="insights">
        <div className="section-heading" data-reveal><p className="eyebrow">{t.insightsLabel}</p></div>
        <div className="insights-lead" data-reveal><h2>{t.insightsTitle}</h2><p>{t.insightsIntro}</p></div>
        <div className="insight-grid">{insights.map((item, index) => <article className="insight-card" key={item.id} data-reveal data-reveal-delay={String(index + 1)}><button type="button" onClick={() => setActiveInsight(item)} aria-label={`${t.read}: ${item.title[language]}`}><div className="insight-image"><img src={item.image} alt="" /><span>0{index + 1}</span></div><div className="insight-meta"><span>{item.kind[language]}</span><span>{t.archive}</span></div><h3>{item.title[language]}</h3><p>{item.excerpt[language]}</p><span className="card-link">{t.read}<i>↗</i></span></button></article>)}</div>
      </section>

      <section className="contact dark-section" id="contact">
        <div className="section-heading dark-heading" data-reveal><p className="eyebrow light">{t.contactLabel}</p></div>
        <div className="contact-layout">
          <div className="contact-copy" data-reveal><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
          <form className="contact-form" onSubmit={submitContact} data-reveal data-reveal-delay="1">
            <label className="reference-field"><input name="email" type="email" autoComplete="email" placeholder={`${t.email} *`} aria-label={t.email} required /></label>
            <label className="reference-field"><input name="name" type="text" autoComplete="name" placeholder={`${t.fullName} *`} aria-label={t.fullName} required /></label>
            <label className="reference-field"><input name="company" type="text" autoComplete="organization" placeholder={t.company} aria-label={t.company} /></label>
            <label className="reference-field"><input name="job-title" type="text" autoComplete="organization-title" placeholder={t.jobTitle} aria-label={t.jobTitle} /></label>
            <label className="reference-field select-field"><select key={language} name="country" defaultValue="" aria-label={t.country} required><option value="" disabled>{t.country} *</option>{t.countries.map((country) => <option key={country} value={country}>{country}</option>)}</select></label>
            <label className="consent-row"><input name="consent" type="checkbox" required /><span>{sent ? t.sent : t.privacy}</span></label>
            <div className="form-bottom"><button type="submit" className="submit-button">{t.send}<span>↗</span></button></div>
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
