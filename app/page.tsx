"use client";

/* eslint-disable @next/next/no-img-element -- static Vite build, images are local WebP assets */

import { FormEvent, useEffect, useState } from "react";

const teams = [
  { id: "marketing", label: "Маркетинг", title: "Кампании целиком — из одной идеи", text: "Соберите лендинг, баннеры, презентацию и видео в единой дизайн-системе. Адаптируйте материалы под сегменты без повторной постановки задачи.", stat: "5 форматов", note: "из одного брифа", accent: "peach" },
  { id: "design", label: "Дизайн", title: "Бренд-контроль без ручной рутины", text: "Задайте компоненты, сетку, цвета и типографику один раз. Команда создаёт материалы самостоятельно, а дизайн остаётся консистентным.", stat: "100%", note: "в рамках дизайн-системы", accent: "lilac" },
  { id: "sales", label: "Продажи", title: "Материалы под клиента за минуты", text: "Превращайте коммерческое предложение в персональную страницу или презентацию — с нужными кейсами, аргументами и фирменным оформлением.", stat: "1 запрос", note: "до готового материала", accent: "blue" },
  { id: "product", label: "Продукт", title: "Быстрее проверяйте новые гипотезы", text: "Запускайте страницы под сегменты и сценарии до постановки задачи в разработку. Уточняйте контент через чат или визуальный редактор.", stat: "×7", note: "быстрее до проверки", accent: "mint" },
];

const formats = [
  { id: "sites", label: "Сайты", title: "Страница за один запрос", text: "Загрузите бриф или ссылку — Снэпбилд предложит структуру, напишет тексты и соберёт адаптивную страницу.", view: "site" },
  { id: "images", label: "Изображения", title: "Графика в стиле бренда", text: "Создавайте иллюстрации и рекламные креативы в единой стилистике, затем меняйте формат без потери композиции.", view: "image" },
  { id: "video", label: "Видео", title: "Видео из ключевых кадров", text: "Соберите ролик из фирменных изображений, управляйте сценами и выпускайте версии для разных площадок.", view: "video" },
  { id: "banners", label: "Баннеры", title: "Мастер-баннер и все ресайзы", text: "Одна композиция превращается в набор адаптаций под площадки и плейсменты с сохранением фокусной точки.", view: "banner" },
  { id: "slides", label: "Презентации", title: "Питч-дек в вашей системе", text: "Превратите документ или идею в презентацию с готовой структурой и компонентами бренда.", view: "slides" },
];

const faqs = [
  ["Что можно создавать в Снэпбилде?", "Сайты, изображения, видео, баннеры и презентации — в едином фирменном стиле. Из одной идеи получается полный набор материалов для кампании."],
  ["Как подключается дизайн-система?", "Платформа анализирует ваши страницы, компоненты, цвета, сетку и типографику. После настройки эти правила автоматически применяются к новым материалам."],
  ["Можно ли интегрировать результат в текущую разработку?", "Да. Результат можно передать в существующий процесс разработки и контроля версий. Поддерживаются React, Vue, Angular и чистый HTML/CSS."],
  ["Подходит ли платформа для закрытого контура?", "Да. Возможны частное облако и изолированная инфраструктура без передачи корпоративных данных во внешние сервисы."],
];

const roadmap = [
  ["Сейчас", "Компонентный подход", "AI компонует страницы из элементов вашей дизайн-библиотеки."],
  ["Далее", "Предиктивные рекомендации", "Платформа предлагает, что улучшить в кампании и материалах."],
  ["Следом", "Инфраструктура", "Развёртывание в сети и контуре вашей компании."],
];

function BrandMark() {
  return <span className="brand"><i aria-hidden="true" /><span>снэпбилд</span></span>;
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [team, setTeam] = useState(0);
  const [format, setFormat] = useState(0);
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    if (name.length < 2) next.name = "Укажите имя";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Проверьте адрес почты";
    if (company.length < 2) next.company = "Укажите компанию";
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  };

  return (
    <main>
      <header className="header">
        <a href="#top" className="logo-link" aria-label="Снэпбилд — на главную"><BrandMark /></a>
        <button className="menu-button" aria-label="Открыть меню" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Основная навигация">
          <a href="#product" onClick={() => setMenuOpen(false)}>Продукт</a>
          <a href="#teams" onClick={() => setMenuOpen(false)}>Возможности</a>
          <a href="#security" onClick={() => setMenuOpen(false)}>Безопасность</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </nav>
        <a className="button button-dark header-cta" href="#contact">Начать сейчас</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-heading">
            <h1>Платформа, где все создается в рамках вашего бренда и дизайн‑системы</h1>
            <p>Подключите дизайн-систему к Снэпбилду, чтобы каждый участник команды мог создавать профессиональные материалы в фирменном стиле за минуты, а не дни.</p>
          </div>
          <a className="button button-light hero-cta" href="#contact">Начать сейчас</a>
        </div>
        <img className="app-preview-image" src="/assets/hero-snapbuild.webp" alt="Интерфейс платформы Снэпбилд" />
      </section>

      <section className="logos" aria-label="Компании" data-reveal>
        <p>С платформой работают команды, для которых бренд — закон</p>
        <div className="marquee"><div>{['logo-1.svg','logo-2.svg','logo-avito.svg','logo-cian.svg','logo-lenta.svg','logo-1.svg','logo-2.svg','logo-avito.svg','logo-cian.svg','logo-lenta.svg'].map((logo, i) => <img src={`/assets/${logo}`} alt="" key={`${logo}-${i}`} />)}</div></div>
      </section>

      <section className="section product" id="product" data-reveal>
        <div className="section-heading"><h2>Одна платформа — весь маркетинг</h2><p>Сайты, изображения, видео, баннеры и презентации — из одной идеи, в вашем стиле</p></div>
        <div className="feature-grid">
          <article className="feature-card"><img src="/assets/process-design-system.webp" alt="" /><h3>Дизайн-система — ядро платформы</h3><p>Ваши компоненты, цвета и шрифты — единственный источник стиля</p></article>
          <article className="feature-card"><img src="/assets/process-flexible.webp" alt="" /><h3>Гибкая конфигурация</h3><p>Правила бренда задаются один раз — работают в каждой генерации</p></article>
          <article className="feature-card"><img src="/assets/process-compliance.webp" alt="" /><h3>Соответствие по умолчанию</h3><p>AI не может нарушить бренд: сайты, изображения, видео, баннеры и презентации — строго по вашим правилам</p></article>
        </div>
      </section>

      <section className="section teams" id="teams" data-reveal>
        <div className="section-heading split"><div><p className="eyebrow">Сценарии</p><h2>Один инструмент.<br />Разные команды.</h2></div><p>Каждая роль получает привычный сценарий — без компромиссов для бренда.</p></div>
        <div className="team-tabs" role="tablist" aria-label="Команды">{teams.map((item, index) => <button key={item.id} role="tab" aria-selected={team === index} onClick={() => setTeam(index)}>{item.label}</button>)}</div>
        <div className={`team-panel ${teams[team].accent}`}>
          <div><p className="panel-number">0{team + 1}</p><h3>{teams[team].title}</h3><p>{teams[team].text}</p><a href="#contact">Обсудить задачу <Arrow /></a></div>
          <div className="team-stat"><span>{teams[team].stat}</span><p>{teams[team].note}</p><div className="mini-chart">{[44,68,51,82,64,94].map((h,i)=><i style={{height:`${h}%`}} key={i} />)}</div></div>
        </div>
      </section>

      <section className="section formats" id="formats" data-reveal>
        <div className="section-heading center"><p className="eyebrow">Все форматы</p><h2>Любой контент в фирменном стиле<br />за считанные минуты</h2></div>
        <div className="format-tabs" role="tablist" aria-label="Форматы">{formats.map((item,index)=><button key={item.id} role="tab" aria-selected={format===index} onClick={()=>setFormat(index)}>{item.label}</button>)}</div>
        <div className="format-panel">
          <div className="format-copy"><span>0{format+1}</span><h3>{formats[format].title}</h3><p>{formats[format].text}</p><a href="#contact">Попробовать формат <Arrow /></a></div>
          <div className={`format-stage ${formats[format].view}`}>
            <div className="stage-toolbar"><i/><i/><i/><span>{formats[format].label}</span></div>
            <div className="stage-canvas"><div className="stage-gradient" /><div className="stage-lines"><b /><b /><b /></div><button>Создать</button></div>
          </div>
        </div>
      </section>

      <section className="section workflow" data-reveal>
        <div className="section-heading split"><div><p className="eyebrow">Как это работает</p><h2>От брифа до кампании —<br />один управляемый процесс</h2></div><p>Снэпбилд сохраняет контекст, дизайн-правила и версии на каждом шаге.</p></div>
        <div className="flow-line">
          {[['01','Дайте контекст','Документ, ссылка или короткий запрос'],['02','Получите основу','Структура, тексты и визуальное направление'],['03','Уточните детали','Правки через чат или визуальный редактор'],['04','Выпустите набор','Все форматы и размеры из одного проекта']].map(([n,t,d])=><article key={n}><span>{n}</span><div className="flow-icon"><i /></div><h3>{t}</h3><p>{d}</p></article>)}
        </div>
      </section>

      <section className="section compare" data-reveal>
        <div className="section-heading"><h2>Почему команды выбирают Снэпбилд</h2><p>Вы получаете не редактор, а результат: готовые маркетинговые материалы без проблем с настройками</p></div>
        <div className="compare-table" role="table" aria-label="Сравнение решений">
          <div className="tr head" role="row"><span>Особенности</span><b>снэпбилд</b><span>AI + Figma</span><span>No-code</span><span>Традиционно</span></div>
          {[['Time-to-market','5 минут','30–60 мин','2–3 дня','3–5 недель'],['Дизайн-система','100% точность','Частично','Шаблоны','Через ревью'],['Визуальный редактор','✓ + AI','—','✓','—'],['Требуемые навыки','Нет','Промпты + код','Дизайн','Полная команда']].map((row)=><div className="tr" role="row" key={row[0]}>{row.map((cell,i)=>i===1?<b key={cell}>{cell}</b>:<span key={cell}>{cell}</span>)}</div>)}
        </div>
      </section>

      <section className="section integrations" data-reveal>
        <div className="integration-shell">
          <div className="integration-copy"><p className="eyebrow">Интеграции</p><h2>Встраивается<br />в ваш процесс</h2><p>Снэпбилд соединяет дизайн, контент и разработку. Результат не заперт внутри платформы.</p><a className="button button-light" href="#contact">Обсудить интеграцию <Arrow /></a></div>
          <div className="orbit" aria-label="Интеграции"><div className="orbit-core"><BrandMark /></div>{['Figma','GitHub','React','CMS','API','GitLab'].map((item,i)=><span className={`orbit-item item-${i+1}`} key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="section security" id="security" data-reveal>
        <div className="section-heading"><h2>Безопасность без компромиссов</h2></div>
        <div className="security-grid">
          <article className="security-main"><div className="shield"><i>✓</i></div><h3>Ваш контур, ваша юрисдикция</h3><p>Развёртывание в частном облаке с соответствием требованиям компании и 152-ФЗ.</p></article>
          <article><span className="security-icon">◎</span><h3>Только одобренные модели</h3><p>Российские и локализованные модели без экспортных ограничений.</p></article>
          <article><span className="security-icon">⌘</span><h3>Собственный AI-стек</h3><p>Вы определяете модели, хранилища, доступы и цепочки валидации.</p></article>
        </div>
      </section>

      <section className="section deployment" data-reveal>
        <div className="section-heading split"><div><p className="eyebrow">Форматы подключения</p><h2>Подключение под<br />вашу инфраструктуру</h2></div><p>Начните с пилота и масштабируйте решение без смены дизайн-системы и процессов.</p></div>
        <div className="deploy-grid">
          <article><span>Быстрый старт</span><h3>Облачный пилот</h3><p>Проверка сценариев на одной команде и реальных материалах.</p><ul><li>Подключение дизайн-системы</li><li>Совместная настройка</li><li>Готовность к масштабированию</li></ul><a href="#contact">Запросить пилот <Arrow /></a></article>
          <article className="featured"><span>Корпоративный</span><h3>Частное облако</h3><p>Контроль данных, моделей и доступов в вашей инфраструктуре.</p><ul><li>Изолированный контур</li><li>Ролевая модель доступа</li><li>Интеграция с внутренними системами</li></ul><a href="#contact">Обсудить внедрение <Arrow /></a></article>
          <article><span>Расширенный</span><h3>Собственный AI-стек</h3><p>Максимальная гибкость для требований безопасности и архитектуры.</p><ul><li>Выбор моделей и хранилищ</li><li>API и автоматизация</li><li>Приоритетная поддержка</li></ul><a href="#contact">Спроектировать решение <Arrow /></a></article>
        </div>
      </section>

      <section className="section roadmap" data-reveal>
        <div className="section-heading split"><div><h2>Каждый день — новый релиз</h2></div><p>Приоритизируем бэклог для ваших целей</p></div>
        <div className="roadmap-track">{roadmap.map(([date,title,text],i)=><article key={title}><div className="road-dot"><i /></div><span>{date}</span><h3>{title}</h3><p>{text}</p><b>0{i+1}</b></article>)}</div>
      </section>

      <section className="section faq" id="faq" data-reveal>
        <div className="faq-intro"><p className="eyebrow">FAQ</p><h2>Часто задаваемые вопросы</h2><p>Ответы, которые помогут принять решение уверенно — без рисков для бренда и безопасности.</p></div>
        <div className="accordion">{faqs.map(([q,a],index)=><article className={faq===index?"open":""} key={q}><button aria-expanded={faq===index} onClick={()=>setFaq(faq===index?-1:index)}><span>{q}</span><i>{faq===index?'−':'+'}</i></button><div><p>{a}</p></div></article>)}</div>
      </section>

      <section className="section contact" id="contact" data-reveal>
        <div className="contact-card">
          <div className="contact-copy"><p className="eyebrow">Запросить демо</p><h2>Покажем Снэпбилд<br />на вашей задаче</h2><p>Расскажите о команде и материалах, которые хотите создавать. Подготовим сценарий демонстрации под ваш процесс.</p><div className="contact-note"><i>✓</i><span>Демо без обязательств<br /><b>Ответим в течение рабочего дня</b></span></div></div>
          {sent ? <div className="success" role="status"><div>✓</div><h3>Заявка принята</h3><p>Спасибо! Мы подготовим демонстрацию и свяжемся с вами.</p><button className="button button-dark" onClick={()=>setSent(false)}>Отправить ещё одну</button></div> :
          <form onSubmit={submit} noValidate>
            <label>Ваше имя<input name="name" placeholder="Алексей" aria-invalid={!!errors.name} />{errors.name&&<span>{errors.name}</span>}</label>
            <label>Рабочая почта<input name="email" type="email" placeholder="name@company.ru" aria-invalid={!!errors.email} />{errors.email&&<span>{errors.email}</span>}</label>
            <label>Компания<input name="company" placeholder="Название компании" aria-invalid={!!errors.company} />{errors.company&&<span>{errors.company}</span>}</label>
            <label>Что хотите создавать?<select name="goal" defaultValue=""><option value="" disabled>Выберите формат</option><option>Сайты и лендинги</option><option>Изображения и баннеры</option><option>Видео</option><option>Презентации</option><option>Весь комплект</option></select></label>
            <button className="button button-dark" type="submit">Запросить демонстрацию <Arrow /></button><small>Нажимая кнопку, вы соглашаетесь с обработкой данных.</small>
          </form>}
        </div>
      </section>

      <section className="final-cta" data-reveal><div><BrandMark /><h2>Профессиональные материалы<br />в фирменном стиле<br /><span>за минуты, а не дни</span></h2><a className="button button-light" href="#contact">Начать сейчас <Arrow /></a></div></section>

      <footer className="footer"><div className="footer-brand"><BrandMark /><p>Платформа, где всё создаётся в рамках вашего бренда и дизайн-системы.</p></div><div><b>Навигация</b><a href="#product">Продукт</a><a href="#teams">Возможности</a><a href="#security">Безопасность</a><a href="#faq">FAQ</a></div><div><b>Контакты</b><a href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a><a href="#contact">Запросить демо</a></div><p className="copyright">© 2026 Снэпбилд. Все права защищены.</p></footer>
    </main>
  );
}
