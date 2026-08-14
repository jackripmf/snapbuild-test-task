"use client";

/* eslint-disable @next/next/no-img-element -- static Vite build, images are local WebP assets */

import { FormEvent, useEffect, useState } from "react";

const teams = [
  { id: "marketing", label: "Маркетинг", title: "Кампания целиком — из одного брифа", text: "Соберите лендинг, баннеры и презентацию в единой дизайн-системе. Адаптируйте материалы под сегменты без повторной постановки задачи.", stat: "5 форматов", note: "готовы к запуску", previewTitle: "Запуск новой линейки", accent: "peach", outputs: [["Лендинг", "Desktop + mobile", "page"], ["Баннеры", "6 размеров", "banner"], ["Презентация", "12 слайдов", "slides"]] },
  { id: "design", label: "Дизайн", title: "Бренд-контроль без ручной рутины", text: "Задайте компоненты, сетку, цвета и типографику один раз. Команда создаёт материалы самостоятельно, а дизайн остаётся консистентным.", stat: "100%", note: "правила применены", previewTitle: "Дизайн-система бренда", accent: "lilac", outputs: [["Компоненты", "48 элементов", "components"], ["Токены", "Цвета и типографика", "tokens"], ["Brand-check", "Без отклонений", "check"]] },
  { id: "sales", label: "Продажи", title: "Материалы под клиента за минуты", text: "Превращайте коммерческое предложение в персональную страницу или презентацию — с нужными кейсами, аргументами и фирменным оформлением.", stat: "1 запрос", note: "персонализировано", previewTitle: "Предложение для клиента", accent: "blue", outputs: [["Страница клиента", "Персональный оффер", "page"], ["Коммерческое предложение", "PDF, 8 страниц", "document"], ["Презентация", "Для встречи", "slides"]] },
  { id: "product", label: "Продукт", title: "Быстрее проверяйте новые гипотезы", text: "Запускайте страницы под сегменты и сценарии до постановки задачи в разработку. Уточняйте контент через чат или визуальный редактор.", stat: "×7", note: "быстрее до проверки", previewTitle: "Гипотеза нового сценария", accent: "mint", outputs: [["Лендинг гипотезы", "Готов к трафику", "page"], ["A/B-варианты", "3 версии", "variants"], ["Сегменты", "4 аудитории", "segments"]] },
];

const formats = [
  { id: "sites", label: "Сайты", features: [
    ["Результат за один запрос", "Отправляйте документ или ссылку на описание продукта — платформа собирает структуру"],
    ["Страница за минуту", "В вашей дизайн-системе, с вашими шрифтами, сеткой и компонентами"],
    ["AI или визуальный редактор", "Меняйте контент через чат или редактируйте вручную"],
    ["Адаптация под ЦА за один клик", "Версия сайта под новый сегмент без работы дизайнеров и копирайтеров"],
  ], images: ["use-site-1.webp","use-site-2.webp","use-site-3.webp","use-site-4.webp"] },
  { id: "images", label: "Изображения", features: [
    ["В стиле и цвете бренда", "Изображения по композиционным правилам вашей дизайн-системы"],
    ["Попадание с первой генерации", "Без часов промптинга и поиска на стоках"],
    ["Редактирование объектов", "Меняйте композицию и удаляйте элементы прямо на изображении"],
    ["Любой стиль и формат", "Портреты, иллюстрации, обложки — в нужном соотношении, до 4K"],
  ], images: ["use-image-1.webp","use-image-2.webp","use-image-3.webp","use-image-4.webp"] },
  { id: "video", label: "Видео", features: [
    ["Изображения как ключевые кадры", "Используйте графику из модуля изображений напрямую"],
    ["Контроль качества и формата", "Длительность, соотношение, качество — под площадку"],
    ["Сохранение стиля и композиции", "AI удерживает визуальную целостность ролика"],
    ["Один сценарий — десятки адаптаций", "Версии под популярные форматы соцсетей и рекламные площадки"],
  ], images: ["use-video-1.webp","use-video-2.webp","use-video-3.webp","use-video-4.webp"] },
  { id: "banners", label: "Баннеры", features: [
    ["Креативы из одной идеи", "Готовые баннеры в фирменном стиле для любой кампании"],
    ["Все размеры автоматически", "Готовые размеры популярных площадок или собственные — без ручной пересборки"],
    ["Текст и графика под контролем", "Редактируйте оффер, композицию и визуальные акценты"],
    ["Экспорт под площадку", "Форматы и вес файлов соответствуют требованиям размещения"],
  ], images: ["use-banner-1.webp","use-banner-2.webp","use-banner-3.webp","use-banner-4.webp"] },
  { id: "slides", label: "Презентации", features: [
    ["Презентация из запроса", "Платформа собирает структуру и черновик слайдов"],
    ["В вашей дизайн-системе", "Шрифты, сетки и компоненты применяются автоматически"],
    ["Редактирование через AI", "Меняйте отдельный слайд или всю историю через чат"],
    ["Экспорт в нужном формате", "Собирайте презентации для встречи, рассылки или публикации"],
  ], images: ["use-slides-1.jpg","use-slides-2.webp","use-slides-3.webp","use-slides-4.webp"] },
];

const faqs = [
  ["Что можно создавать в Снэпбилде?", "Все основные форматы маркетинговых материалов — сайты, изображения, видео, баннеры и презентации. Всё создаётся в рамках вашего бренда: из одной идеи получается полный набор материалов компании."],
  ["Как работает анализ бренда?", "Система анализирует существующие интерфейсы, графические материалы и компоненты. Выделяются цветовые схемы, типографика, сетки, отступы и архитектура элементов. На основе этих данных формируется модель дизайн-системы."],
  ["Можно ли экспортировать решение в существующую инфраструктуру?", "Да. Система формирует чистую структуру интерфейса для React, Vue, Angular и HTML/CSS, интеграции с GitHub, GitLab и CI/CD."],
  ["Действительно ли интерфейс полностью соответствует дизайн-системе?", "Да. Каждый элемент формируется строго по правилам вашей архитектуры: цвета, типографика, отступы и состояния компонентов. Контроль встроен на уровне системы."],
  ["В чем отличие от универсальных систем на базе искусственного интеллекта?", "Универсальные решения гибкие, но нестабильные в применении бренд-правил. Снэпбилд строит интерфейсы в рамках корпоративной архитектуры, с учётом бизнес-логики и требований безопасности."],
  ["Чем это отличается от конструкторов без программирования?", "Конструкторы используют жёсткие шаблоны. Здесь применяется компонентная архитектура с гарантированным соблюдением дизайн-системы — это управляемая система сборки интерфейсов."],
  ["В чем отличие от популярных AI-инструментов для создания сайтов?", "Снэпбилд сочетает скорость генерации с автоматическим соблюдением вашей дизайн-системы, интеграцией бизнес-логики и работой в контуре безопасности компании."],
  ["Возможна ли работа в закрытом корпоративном облаке?", "Да. Поддерживается развёртывание в изолированной инфраструктуре без доступа к внешней сети. Данные и вычисления остаются внутри вашей корпоративной среды."],
];

const roadmap = [
  ["Декабрь, 2025", "Сайты за 5 минут", "Генерация корпоративных сайтов по вашей дизайн-системе — 100% консистентность, без разработчиков"],
  ["Январь, 2026", "Консистентные AI-иллюстрации", "Настраиваете фирменный стиль один раз — графика для каждой секции сайта в едином виде через стилевые пресеты"],
  ["Февраль, 2026", "Дизайн-система из вашего сайта", "Сканируем существующие страницы и собираем из них готовую дизайн-систему; AI сам выстраивает структуру"],
  ["Март, 2026", "Режим изображений", "Брендовая графика в один клик: управление стилями и темами, десятки параметров редактирования"],
  ["Апрель, 2026", "Генерация видео", "Видео из ваших изображений с ключевыми кадрами; AI точнее на 78%, панель рассуждений и управление правами"],
  ["Май, 2026", "Ресайзы изображений", "Одна фокус-точка → все форматы (16:9, 9:16, 1:1 и другие) с автоматическим бюджетом веса на экспорт"],
  ["Июнь, 2026", "Расширенный редактор, как в Figma", "Слои, изменение размеров любого контейнера, превью структуры в чате, версии промптов и ветвление диалогов"],
  ["Июль, 2026", "Канвас, баннеры и презентации", "Канвас во всех режимах; новые режимы — генерация рекламных баннеров и корпоративных презентаций"],
  ["Август, 2026", "ИИ-маркетолог", "Следит за данными, сам обновляет ваши материалы и собирает кампанию целиком — от изображений до сайта"],
  ["Сентябрь, 2026", "Компонентный подход", "AI сам компонует секции сайтов из элементов вашей дизайн-библиотеки"],
  ["Октябрь, 2026", "Предиктивные рекомендации", "Платформа сама предлагает, что обновить в кампаниях — от секций сайта до баннеров"],
  ["Ноябрь, 2026", "Инфраструктура", "Развертывание в вашей сети и контуре"],
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
  const [formatFeature, setFormatFeature] = useState(0);
  const [faq, setFaq] = useState(-1);
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

  useEffect(() => {
    const timer = window.setInterval(() => setFormatFeature((current) => (current + 1) % 4), 4500);
    return () => window.clearInterval(timer);
  }, [format]);

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
          <a href="#formats" onClick={() => setMenuOpen(false)}>Возможности</a>
          <a href="#security" onClick={() => setMenuOpen(false)}>Безопасность</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </nav>
        <a className="button button-dark header-cta" href="#contact"><span>Начать сейчас</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-heading">
            <h1>Платформа, где все создается в рамках вашего бренда и дизайн‑системы</h1>
            <p>Подключите дизайн-систему к Снэпбилду, чтобы каждый участник команды мог создавать профессиональные материалы в фирменном стиле за минуты, а не дни.</p>
          </div>
          <a className="button button-light hero-cta" href="#contact"><span>Начать сейчас</span></a>
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
          <div className="team-output">
            <div className="team-output-head"><div><span>Проект</span><strong>{teams[team].previewTitle}</strong></div><b>{teams[team].stat}</b></div>
            <div className="output-grid">{teams[team].outputs.map(([label,meta,kind])=><article className={`output-card output-${kind}`} key={label}><div className="output-thumb"><i /><i /><i /></div><strong>{label}</strong><span>{meta}</span></article>)}</div>
            <div className="team-output-foot"><span><i /> В рамках дизайн-системы</span><b>{teams[team].note}</b></div>
          </div>
        </div>
      </section>

      <section className="section formats" id="formats" data-reveal>
        <div className="format-header"><h2>Любой контент в фирменном стиле за считанные минуты</h2>
          <div className="format-tabs" role="tablist" aria-label="Форматы">{formats.map((item,index)=><button key={item.id} role="tab" aria-selected={format===index} onClick={()=>{setFormat(index);setFormatFeature(0)}}>{item.label}</button>)}</div>
        </div>
        <div className="format-panel">
          <div className="format-features">{formats[format].features.map(([title,text],index)=><button className={formatFeature===index?"active":""} onClick={()=>setFormatFeature(index)} key={title}><strong>{title}</strong><span>{text}</span></button>)}</div>
          <div className="format-preview"><img src={`/assets/${formats[format].images[formatFeature]}`} alt={`Пример: ${formats[format].features[formatFeature][0]}`} /></div>
        </div>
      </section>

      <section className="section workflow" id="workflow" data-reveal>
        <div className="section-heading split"><div><p className="eyebrow">Как это работает</p><h2>От брифа до кампании —<br />один управляемый процесс</h2></div><p>Снэпбилд сохраняет контекст, дизайн-правила и версии на каждом шаге.</p></div>
        <div className="flow-line">
          {[['01','Дайте контекст','Документ, ссылка или короткий запрос'],['02','Получите основу','Структура, тексты и визуальное направление'],['03','Уточните детали','Правки через чат или визуальный редактор'],['04','Выпустите набор','Все форматы и размеры из одного проекта']].map(([n,t,d])=><article key={n}><span>{n}</span><div className={`flow-icon flow-${n}`}><i /><b /><em /></div><h3>{t}</h3><p>{d}</p></article>)}
        </div>
      </section>

      <section className="section compare" id="compare" data-reveal>
        <div className="section-heading"><h2>Почему команды выбирают Снэпбилд</h2><p>Вы получаете не редактор, а результат: готовые маркетинговые материалы без проблем с настройками</p></div>
        <div className="compare-table" role="table" aria-label="Сравнение решений">
          <div className="tr head" role="row"><span>Особенности</span><b>снэпбилд</b><span>Claude + Figma MCP</span><span>No-code платформы</span><span>Cursor</span><span>Традиционный</span></div>
          {[['Time-to-market','5 минут','30–60 мин','2–3 дня','1–2 дня','3–5 недель'],['Дизайн-система','100% точность','Частично, из Figma','Шаблоны','Вручную в коде','Вручную, через ревью'],['Визуальный редактор','✓ + ИИ','—','✓','—','—'],['Требуемые навыки','Нет','Промпты + код','Дизайн','Разработка','Полная команда']].map((row)=><div className="tr" role="row" key={row[0]}>{row.map((cell,i)=>i===1?<b key={`${i}-${cell}`}>{cell}</b>:<span key={`${i}-${cell}`}>{cell}</span>)}</div>)}
        </div>
      </section>

      <section className="section integrations" id="integrations" data-reveal>
        <div className="integration-shell">
          <div className="integration-copy"><p className="eyebrow">Интеграции</p><h2>Встраивается<br />в ваш процесс</h2><p>Снэпбилд соединяет дизайн, контент и разработку. Результат не заперт внутри платформы.</p><a className="button button-light" href="#contact">Обсудить интеграцию <Arrow /></a></div>
          <div className="integration-board" aria-label="Схема интеграций">
            <div className="integration-board-head"><span>Рабочий контур</span><b><i /> Все системы подключены</b></div>
            <div className="integration-rows">
              {[['Figma','Дизайн-система','Синхронизация токенов'],['CMS','Контент','Данные и публикации'],['GitHub / GitLab','Разработка','Экспорт и контроль версий']].map(([source,area,result])=><div className="integration-row" key={source}><strong>{source}</strong><span>{area}</span><i>→</i><b>{result}</b></div>)}
            </div>
            <div className="integration-stack"><span>React</span><span>Vue</span><span>Angular</span><span>HTML / CSS</span><span>API</span></div>
          </div>
        </div>
      </section>

      <section className="section security" id="security" data-reveal>
        <div className="section-heading"><h2>Безопасность без компромиссов</h2></div>
        <div className="security-grid">
          <article><img src="/assets/security-models.webp" alt="" /><h3>Только одобренные модели</h3><p>Работаем только с российскими и локализованными моделями, без экспортных ограничений</p></article>
          <article><img src="/assets/security-cloud.webp" alt="" /><h3>Ваш контур, ваша юрисдикция</h3><p>Развертывание в частном облаке с полным соответствием 152-ФЗ и внутренними ИБ-требованиями</p></article>
          <article><img src="/assets/security-stack.webp" alt="" /><h3>Собственный AI-стек</h3><p>Вы сами определяете модели, хранилища, доступы и цепочки валидации</p></article>
        </div>
      </section>

      <section className="section deployment" id="deployment" data-reveal>
        <div className="section-heading split"><div><p className="eyebrow">Форматы подключения</p><h2>Подключение под<br />вашу инфраструктуру</h2></div><p>Начните с пилота и масштабируйте решение без смены дизайн-системы и процессов.</p></div>
        <div className="deploy-grid">
          <article><span>Быстрый старт</span><h3>Облачный пилот</h3><p>Проверка сценариев на одной команде и реальных материалах.</p><ul><li>Подключение дизайн-системы</li><li>Совместная настройка</li><li>Готовность к масштабированию</li></ul><a href="#contact">Запросить пилот <Arrow /></a></article>
          <article className="featured"><span>Корпоративный</span><h3>Частное облако</h3><p>Контроль данных, моделей и доступов в вашей инфраструктуре.</p><ul><li>Изолированный контур</li><li>Ролевая модель доступа</li><li>Интеграция с внутренними системами</li></ul><a href="#contact">Обсудить внедрение <Arrow /></a></article>
          <article><span>Расширенный</span><h3>Собственный AI-стек</h3><p>Максимальная гибкость для требований безопасности и архитектуры.</p><ul><li>Выбор моделей и хранилищ</li><li>API и автоматизация</li><li>Приоритетная поддержка</li></ul><a href="#contact">Спроектировать решение <Arrow /></a></article>
        </div>
      </section>

      <section className="section roadmap" id="roadmap" data-reveal>
        <div className="section-heading"><h2>Каждый день — новый релиз</h2><p>Приоритизируем бэклог для ваших целей</p></div>
        <div className="roadmap-viewport"><div className="roadmap-track">{roadmap.map(([date,title,text])=><article key={title}><div className="road-dot"><i /></div><h3>{title}</h3><p>{text}</p><span>{date}</span></article>)}</div></div>
      </section>

      <section className="section faq" id="faq" data-reveal>
        <div className="section-heading"><h2>Часто задаваемые вопросы</h2><p>Ответы, которые помогут вам принять решение уверенно — без рисков для бренда и безопасности</p></div>
        <div className="accordion">{[faqs.slice(0,4),faqs.slice(4)].map((column,columnIndex)=><div className="accordion-column" key={columnIndex}>{column.map(([q,a],rowIndex)=>{const index=columnIndex*4+rowIndex;return <article className={faq===index?"open":""} key={q}><button aria-expanded={faq===index} onClick={()=>setFaq(faq===index?-1:index)}><span>{q}</span><i>{faq===index?'−':'+'}</i></button><div><p>{a}</p></div></article>})}</div>)}</div>
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

      <section className="final-cta" data-reveal><div><BrandMark /><h2>Профессиональные материалы<br />в фирменном стиле<br /><span>за минуты, а не дни</span></h2><a className="button button-light launch-cta" href="#contact"><span>Начать сейчас</span></a></div></section>

      <footer className="footer"><div className="footer-brand"><BrandMark /><p>Платформа, где всё создаётся в рамках вашего бренда и дизайн-системы.</p></div><div><b>Навигация</b><a href="#product">Продукт</a><a href="#formats">Возможности</a><a href="#compare">Преимущества</a><a href="#security">Безопасность</a><a href="#roadmap">Роадмап</a><a href="#faq">Частые вопросы</a></div><div><b>Документация</b><a href="https://snapbuild.ru/privacy" target="_blank" rel="noreferrer">Политика конфиденциальности</a><a href="#faq">FAQ</a></div><div><b>Контакты</b><a href="https://t.me/ochen_darya" target="_blank" rel="noreferrer">Запросить демо</a><a href="https://t.me/snapbuild" target="_blank" rel="noreferrer">Telegram</a></div><p className="copyright">© Сгенерировано в Снэпбилде. Все права защищены.</p><a className="footer-email" href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a></footer>
    </main>
  );
}
