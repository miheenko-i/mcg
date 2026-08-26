'use client';

import { FormEvent, useEffect, useState } from 'react';

type Language = 'ru' | 'en';

const content = {
  ru: {
    menu: 'Меню', close: 'Закрыть', read: 'Читать', back: 'Назад',
    nav: ['Главная', 'О компании', 'Ценности', 'Новости и инсайты', 'Контакты'],
    heroKicker: 'С 2010 года',
    heroTitle: 'MCG занимается вопросами капитала и корпоративного управления.',
    heroText: 'Мы работаем с собственниками, акционерами и предпринимательскими семьями, когда стоящие перед ними вопросы выходят за рамки текущей повестки и определяют будущее бизнеса: его структуру собственности, направление развития, контроль, актуальность и способность сохранять устойчивость.',
    firmLabel: 'О компании',
    firm: [
      {
        title: 'Капитал и управление',
        image: '/media/firm-architecture.jpg',
        alt: 'Современная архитектура из синего стекла и золотистого металла',
        paragraphs: [
          'Мы работаем с собственниками, акционерами и предпринимательскими семьями, когда стоящие перед ними вопросы выходят за рамки текущей повестки и определяют будущее бизнеса: его структуру собственности, направление развития, контроль, актуальность и способность сохранять устойчивость.',
        ],
      },
      {
        title: 'Вопросы без стандартной формы',
        image: '/media/firm-sea.jpg',
        alt: 'Спокойное море в глубокой синей гамме',
        paragraphs: [
          'Такие вопросы редко имеют стандартную форму. Речь может идти о следующем этапе развития бизнеса, новом рынке или технологии, будущем партнёрства, сделке, важных переговорах, изменении структуры собственности, совете директоров, преемственности или идее, для которой ещё нет привычной категории.',
          'Они могут включать передачу капитала и ответственности между поколениями, покупку или продажу бизнеса либо доли в нём, развитие отношений между акционерами, создание новой бизнес-модели и архитектуры управления. Объединяет их не название ситуации, а её значение для собственника и качество суждения, которого она требует.',
        ],
      },
      {
        title: 'Перспектива и участие',
        image: '/media/firm-abstract.jpg',
        alt: 'Абстрактная композиция из архитектурных форм и теней',
        paragraphs: [
          'MCG привносит перспективу, связи и активное участие в отдельные ситуации, где независимая мысль и доверительное партнёрство способны изменить траекторию бизнеса. Мы работаем тесно, конфиденциально и с долгосрочным намерением — иногда за сценой, иногда за столом переговоров, а иногда вместе с партнёрами создавая то, что будет дальше.',
          'Наш подход сформирован более чем двадцатилетним опытом, глубоким пониманием людей и сложных ситуаций, а также международной сетью контактов, построенной на репутации и доверии.',
        ],
      },
    ],
    valuesTitle: 'Наши ценности',
    values: [
      { title: 'Доверие и прямота', text: 'Мы ценим отношения, в которых уважение включает свободу говорить открыто, подвергать сомнению предположения и предлагать независимый взгляд. Наша задача — помогать собственникам видеть ситуацию ясно, а не просто подтверждать то, что уже кажется комфортным.' },
      { title: 'Амбиции и значимость', text: 'Нас привлекают решения с реальным стратегическим, коммерческим и личным весом: моменты, когда очевидного ответа нет и качество суждения особенно важно. Именно здесь честный и независимый партнёр способен создавать долгосрочную ценность.' },
      { title: 'Партнёрство и общая ответственность', text: 'Каждые отношения мы рассматриваем как взаимную инвестицию времени, внимания и доверия. Лучше всего мы работаем там, где есть интеллектуальная совместимость, позитивная энергия и общее стремление вместе создать нечто значимое.' },
    ],
    insightsTitle: 'Новости и инсайты',
    contactLabel: 'Контакты', contactTitle: 'Оставьте контакты, чтобы мы связались с вами.',
    email: 'Email', fullName: 'Имя и фамилия', company: 'Компания', jobTitle: 'Должность', country: 'Страна', countryHint: 'Выберите страну', subject: 'Тема обсуждения', send: 'Отправить',
    privacy: 'Отправляя форму, вы соглашаетесь на обработку указанных данных.', sent: 'Спасибо. Это демо-форма — в финальной версии подключим выбранный канал связи.',
    countries: ['Россия', 'Беларусь', 'Казахстан', 'Армения', 'Другая страна'],
    footerExplore: 'Разделы', footerConnect: 'Связаться', footerLanguage: 'Язык',
  },
  en: {
    menu: 'Menu', close: 'Close', read: 'Read', back: 'Back',
    nav: ['Home', 'Our firm', 'Our values', 'News & insights', 'Contact'],
    heroKicker: 'Since 2010',
    heroTitle: 'MCG works on matters of capital and governance.',
    heroText: 'We partner with owners, shareholders and entrepreneurial families when the questions at hand reach beyond the immediate agenda and shape the future of an enterprise: its ownership, direction, control, relevance and capacity to endure.',
    firmLabel: 'Our Firm',
    firm: [
      {
        title: 'Capital and governance',
        image: '/media/firm-architecture.jpg',
        alt: 'Modern blue glass and gold metal architecture',
        paragraphs: [
          'We partner with owners, shareholders and entrepreneurial families when the questions at hand reach beyond the immediate agenda and shape the future of an enterprise: its ownership, direction, control, relevance and capacity to endure.',
        ],
      },
      {
        title: 'Questions without a standard form',
        image: '/media/firm-sea.jpg',
        alt: 'A calm sea in deep blue tones',
        paragraphs: [
          'These matters rarely arrive in a standard form. They may involve the next stage of a business, a new market or technology, the future of a partnership, a transaction, an important negotiation, a shift in ownership, a board, a succession question or an idea that does not yet have a conventional category.',
          'They can include the transfer of capital and responsibility across generations, the acquisition or sale of a business or a stake in it, the evolution of shareholder relationships, or the design of a new business model and governance architecture. What connects them is not the label of the situation, but its significance to the owner and the quality of judgment it requires.',
        ],
      },
      {
        title: 'Perspective and participation',
        image: '/media/firm-abstract.jpg',
        alt: 'An abstract composition of architectural forms and shadows',
        paragraphs: [
          'MCG brings perspective, relationships and active participation to selected situations where independent thought and trusted partnership can alter the trajectory of a business. We work closely, discreetly and with long-term intent—sometimes behind the scenes, sometimes at the table, and sometimes alongside our partners in creating what comes next.',
          'Our work is shaped by more than two decades of experience, a deep understanding of people and complex situations, and a cross-border network built on reputation and trust.',
        ],
      },
    ],
    valuesTitle: 'Our Values',
    values: [
      { title: 'Trust and candour', text: 'We value relationships in which respect includes the freedom to speak openly, challenge assumptions and offer an independent view. Our role is to help owners see clearly—not simply to confirm what is already comfortable.' },
      { title: 'Ambition and consequence', text: 'We are drawn to decisions with real strategic, commercial and personal weight: moments when there is no obvious answer and the quality of judgment matters most. These are the situations where an honest, independent counterpart can create lasting value.' },
      { title: 'Partnership and shared commitment', text: 'We treat every relationship as a mutual investment of time, attention and trust. We work best where there is intellectual compatibility, positive energy and a shared ambition to create something meaningful together.' },
    ],
    insightsTitle: 'News & insights',
    contactLabel: 'Contact', contactTitle: 'Sign up to get in touch with us.',
    email: 'Email Address', fullName: 'First and Last Name', company: 'Company', jobTitle: 'Job Title', country: 'Country', countryHint: 'Select a country', subject: 'Subject for discussion', send: 'Send',
    privacy: 'By sending the form, you consent to processing the data provided.', sent: 'Thank you. This is a demo form — the final version will connect to your preferred channel.',
    countries: ['Russia', 'Belarus', 'Kazakhstan', 'Armenia', 'Other country'],
    footerExplore: 'Explore', footerConnect: 'Connect', footerLanguage: 'Language',
  },
};

const insights = [
  {
    id: 'digital-solutions', image: '/media/insight-01.jpg', date: { ru: '25 августа 2026', en: '25 August 2026' },
    title: { ru: 'Цифровые решения и новые каналы повышения эффективности бизнеса', en: 'Digital solutions and new channels for business performance' },
    excerpt: { ru: 'Технологии открывают новые каналы повышения эффективности, новые рынки и способы взаимодействия с потребителями.', en: 'Technology opens new ways to improve performance, discover markets and communicate with customers.' },
    body: { ru: ['Мы помогаем клиентам анализировать рынок цифровых технологий и находить решения, способные улучшить показатели бизнеса.', 'В зависимости от задачи MCG проводит обучение современным подходам к разработке продуктов или создаёт решения под ключ.'], en: ['We help clients analyze the digital technology market and find solutions capable of improving business performance.', 'Depending on the task, MCG provides training in advanced product development approaches or creates turnkey solutions.'] },
  },
  {
    id: 'our-approach', image: '/media/insight-02.jpg', date: { ru: '25 августа 2026', en: '25 August 2026' },
    title: { ru: 'Как индивидуальная структура проекта превращает стратегию в практический результат', en: 'How a tailored project framework turns strategy into pragmatic results' },
    excerpt: { ru: 'Индивидуальный подход к каждому проекту — от определения объёма работ до структуры и графика реализации.', en: 'A tailored approach to every project — from defining the scope to designing its framework and delivery plan.' },
    body: { ru: ['MCG разрабатывает структуру и график реализации проекта на этапе определения объёма работ, учитывая конкретные потребности клиента.', 'Такой подход помогает сосредоточить команду на прагматичных и релевантных результатах для бизнеса.'], en: ['MCG develops a custom framework and delivery plan at the project scoping stage, taking each client’s needs into account.', 'This approach keeps the team focused on pragmatic and relevant results for the business.'] },
  },
  {
    id: 'business-model', image: '/media/insight-03.jpg', date: { ru: '25 августа 2026', en: '25 August 2026' },
    title: { ru: 'Как собрать проектную команду вокруг конкретной задачи клиента', en: 'Building the right project team around each client’s challenge' },
    excerpt: { ru: 'Проектные команды формируются под индивидуальные потребности клиента и требуемый набор экспертизы.', en: 'Project teams are formed around each client’s needs and the specific mix of expertise required.' },
    body: { ru: ['Для реализации проектов MCG сочетает собственных специалистов с тщательно отобранными независимыми консультантами и отраслевыми экспертами.', 'Команда формируется специально под задачу клиента и требуемый набор отраслевой и функциональной экспертизы.'], en: ['For every project, MCG combines in-house specialists with carefully selected independent consultants and industry experts.', 'Each team is formed specifically around the client’s task and the required mix of industry and functional expertise.'] },
  },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
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
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }), { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [language]);

  function goTo(id: string) { setMenuOpen(false); window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100); }
  function submitContact(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }

  const sectionIds = ['firm', 'values', 'insights', 'contact'];

  return (
    <main>
      <section className="hero" id="top">
        <video className="hero-video" src="/media/mcg-hero.mp4" autoPlay muted loop playsInline preload="metadata" />
        <div className="hero-shade" aria-hidden="true" />
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="MCG — home"><img className="brand-logo" src="/media/mcg-logo-source.svg" alt="" /></a>
          <nav className="desktop-nav" aria-label={t.menu}>{t.nav.slice(1).map((item, index) => <a key={item} href={`#${sectionIds[index]}`}>{item}</a>)}</nav>
          <div className="header-actions">
            <button className="language" type="button" onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')} aria-label={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}><span className={language === 'ru' ? 'active' : ''}>RU</span><i>/</i><span className={language === 'en' ? 'active' : ''}>EN</span></button>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label={t.menu}><span /><span /><span /></button>
          </div>
        </header>
        <p className="eyebrow hero-kicker" key={`kicker-${language}`} data-reveal>{t.heroKicker}</p>
        <div className="hero-content" key={language} data-reveal>
          <h1>{t.heroTitle}</h1>
          <div className="hero-bottom"><p>{t.heroText}</p></div>
        </div>
      </section>

      <section className="firm" id="firm">
        {t.firm.map((story, index) => (
          <article className={`firm-story firm-story--${index + 1}`} key={story.image}>
            <div className="firm-story__media" data-reveal data-reveal-image><img src={story.image} alt={story.alt} /></div>
            <div className="firm-story__copy">
              {index === 0 && <p className="eyebrow" data-reveal>{t.firmLabel}</p>}
              <div className="firm-story__paragraphs" data-reveal data-reveal-delay="1">{story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </article>
        ))}
      </section>

      <section className="values" id="values">
        <div className="values-inner">
          <h2 data-reveal>{t.valuesTitle}</h2>
          <div className="value-grid">{t.values.map((value, index) => <article key={value.title} data-reveal data-reveal-delay={String(index + 1)}><h3>{value.title}</h3><p>{value.text}</p></article>)}</div>
        </div>
      </section>

      <section className="insights" id="insights">
        <div className="insights-lead" data-reveal><h2>{t.insightsTitle}</h2></div>
        <div className="insight-rail">{insights.map((item, index) => <article className="insight-card" key={item.id} data-reveal data-reveal-delay={String(index + 1)}><button type="button" onClick={() => setActiveInsight(item)} aria-label={`${t.read}: ${item.title[language]}`}><div className="insight-image" data-reveal data-reveal-image data-reveal-delay={String(index + 1)}><img src={item.image} alt="" /></div><div className="insight-meta"><time>{item.date[language]}</time></div><h3>{item.title[language]}</h3><span className="card-link">{t.read}<i>↗</i></span></button></article>)}</div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-layout">
          <div className="contact-copy" data-reveal><p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle}</h2><div className="contact-socials"><a href="https://www.linkedin.com/company/moscow-consulting-group/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a></div></div>
          <form className="contact-form" onSubmit={submitContact} data-reveal data-reveal-delay="1">
            <label className="reference-field"><span>{t.email} *</span><input name="email" type="email" autoComplete="email" placeholder="name@example.com" required /></label>
            <label className="reference-field"><span>{t.fullName} *</span><input name="name" type="text" autoComplete="name" required /></label>
            <label className="reference-field"><span>{t.company}</span><input name="company" type="text" autoComplete="organization" /></label>
            <label className="reference-field"><span>{t.jobTitle}</span><input name="job-title" type="text" autoComplete="organization-title" /></label>
            <label className="reference-field select-field"><span>{t.country} *</span><select key={language} name="country" defaultValue="" required><option value="" disabled>{t.countryHint}</option>{t.countries.map((country) => <option key={country} value={country}>{country}</option>)}</select></label>
            <label className="reference-field"><span>{t.subject}</span><input name="subject" type="text" /></label>
            <label className="consent-row"><input name="consent" type="checkbox" required /><span>{sent ? t.sent : t.privacy}</span></label>
            <div className="form-bottom"><button type="submit" className="submit-button">{t.send}<span>↗</span></button></div>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="wordmark footer-mark" href="#top" aria-label="MCG — home"><img className="brand-logo" src="/media/mcg-logo-source.svg" alt="" /></a>
          <div className="footer-column"><p>{t.footerExplore}</p>{t.nav.slice(1).map((item, index) => <a key={item} href={`#${sectionIds[index]}`}>{item}</a>)}</div>
          <div className="footer-column"><p>{t.footerConnect}</p><a href="https://www.linkedin.com/company/moscow-consulting-group/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a></div>
          <div className="footer-column"><p>{t.footerLanguage}</p><button type="button" onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>English</button><button type="button" onClick={() => setLanguage('ru')} className={language === 'ru' ? 'active' : ''}>Русский</button></div>
        </div>
        <div className="footer-bottom"><p>© 2026 Moscow Consulting Group</p><p>2010—2026</p></div>
      </footer>

      <div className={`menu-overlay ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="overlay-header"><span className="wordmark inverse"><img className="brand-logo" src="/media/mcg-logo-source.svg" alt="MCG" /></span><button className="close-button" type="button" onClick={() => setMenuOpen(false)} aria-label={t.close}>×</button></div>
        <nav>{t.nav.map((item, index) => { const ids = ['top', 'firm', 'values', 'insights', 'contact']; return <button key={item} type="button" onClick={() => goTo(ids[index])}><span>0{index + 1}</span>{item}<i>↘</i></button>; })}</nav>
        <div className="menu-footer"><p>Moscow Consulting Group</p><p>2010—2026</p></div>
      </div>

      <aside className={`insight-panel ${activeInsight ? 'is-open' : ''}`} aria-hidden={!activeInsight}>
        {activeInsight && <><div className="panel-top"><time>{activeInsight.date[language]}</time><button className="close-button panel-close" type="button" onClick={() => setActiveInsight(null)} aria-label={t.close}>×</button></div><div className="article-content"><time>{activeInsight.date[language]}</time><h2>{activeInsight.title[language]}</h2><p className="article-lead">{activeInsight.excerpt[language]}</p><img className="article-image" src={activeInsight.image} alt="" /><div className="article-body">{activeInsight.body[language].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><button className="back-link" type="button" onClick={() => setActiveInsight(null)}>← {t.back}</button></div></>}
      </aside>
    </main>
  );
}
