export const BRAND_NAME = "WHY DELUXE";

export const SEO = {
  title: "Відеомонтаж і дизайн каруселей для соцмереж | WHY DELUXE",
  description:
    "Монтую рілси й проєктую каруселі в єдиному стилі: від ідеї й тексту до готових файлів для публікації. Одна послуга, один процес, одна оплата.",
  openGraphTitle: "Відеомонтаж і дизайн каруселей для соцмереж | WHY DELUXE",
  openGraphDescription:
    "Рілси й каруселі в єдиному стилі: від ідеї й тексту до готових файлів для публікації.",
  openGraphType: "website",
};

export const CONTACT_LINKS = {
  TELEGRAM: "https://t.me/deluxeworking",
  INSTAGRAM: "https://www.instagram.com/delya.aep/",
};

export const SECTION_IDS = {
  home: "home",
  services: "services",
  work: "work",
  process: "process",
  pricing: "pricing",
  faq: "faq",
  contact: "contact",
} as const;

export const PAGE_LINKS = {
  home: `#${SECTION_IDS.home}`,
  contact: `#${SECTION_IDS.contact}`,
};

export type Media = {
  type: "image" | "video";
  src: string;
};

export const MEDIA = {
  heroBase: {
    type: "image",
    src: "assets/hero/layer-1.webp",
  },
  heroReveal: {
    type: "image",
    src: "assets/hero/layer-2.webp",
  },
} satisfies Record<string, Media>;

export const HERO = {
  heading: ["Рілси й каруселі", "в єдиному стилі"],
  bottomLeft:
    "Рілси й каруселі в єдиному стилі: від ідеї й тексту до готових файлів для публікації. Один процес, одна оплата.",
  bottomRight:
    "Кожен рілс і кожна карусель — це новий шар. Так бренд у соцмережах росте поступово й упевнено, у єдиному стилі, як жива система.",
  cta: "Обговорити проєкт",
  imageDescription: "Шари каменю як метафора зростання бренду",
};

export const NAV_LINKS = [
  { label: "Послуги", href: `#${SECTION_IDS.services}` },
  { label: "Роботи", href: `#${SECTION_IDS.work}` },
  { label: "Процес", href: `#${SECTION_IDS.process}` },
  { label: "Пакети", href: `#${SECTION_IDS.pricing}` },
  { label: "FAQ", href: `#${SECTION_IDS.faq}` },
  { label: "Контакти", href: PAGE_LINKS.contact },
];

export const UI = {
  home: "WHY DELUXE — на головну",
  openMenu: "Відкрити меню",
  closeMenu: "Закрити меню",
  writeToMe: "Написати мені",
  heroLabel: "Креативні послуги для зростання вашого бренду",
  servicesTitle: "Монтаж рілсів і дизайн каруселей в одній послузі,",
  servicesSecondTitle: "щоб контент виходив регулярно",
  serviceEyebrow: "ПРО ПОСЛУГУ",
  servicesLead:
    "Зазвичай для цього потрібні монтажер і дизайнер, а ще той, хто зведе їх в одному стилі.",
  servicesDescription:
    "Я роблю все це в одній послузі: від ідеї й тексту до готових файлів для публікації. Підходить експертам, блогерам і малому бізнесу в будь‑якій ніші.",
  videoPartTitle: "Відеомонтаж",
  videoPartDescription:
    "Чиста нарізка, видалення пауз, кольорокорекція, саунд-дизайн, акуратні субтитри",
  designPartTitle: "Дизайн",
  designPartDescription:
    "Каруселі в єдиній візуальній системі, копірайтинг українською, адаптація під Instagram, TikTok, Threads",
  sharedDescription:
    "Спільне для обох: структура й сторітелінг, 2 раунди правок, готові файли для публікації.",
  painTitle: "Які болі закриваю",
  workTitle: "Роботи",
  workSubtitle: "Нові кейси скоро з'являться тут",
  processTitle: "Як я працюю",
  pricingTitle: "Пакети",
  faqTitle: "FAQ",
  contactTitle: "Обговоримо ваш проєкт",
  footerTagline: "Ваш бренд. Під ключ.",
  copyright: "© 2026 WHY DELUXE",
  video: "Відеомонтаж",
  design: "Дизайн",
  playPreview: "Відтворити відео",
  closePreview: "Закрити перегляд",
  enableVideoAudio: "Увімкнути звук",
  videoPlaybackError: "Не вдалося відтворити відео. Спробуйте ще раз.",
  viewCase: "Дивитись",
  slideCountSuffix: "слайдів",
  writeToTelegram: "Написати мені →",
  customProject: "Потрібне щось окреме або в іншій кількості?",
  customProjectDetail:
    "Можна замовити лише монтаж або лише дизайн, а також іншу кількість рілсів і каруселей, наприклад 6 + 3. Напишіть, що потрібно, і я прорахую індивідуально.",
  getEstimate: "Отримати розрахунок",
  contactSubtitle: "Напишіть мені: оберу пакет і прорахую під ваш обсяг.",
  telegram: "Telegram",
  instagram: "Instagram",
  play: "Переглянути відео",
  spotlight: "Рілси й каруселі",
  selectedMark: "✓",
};

export const SERVICE_PAIN_POINTS = [
  "Контент виходить нерегулярно, бо немає часу й рук",
  "Монтажер в одному місці, дизайнер в іншому, і стиль «пливе»",
  "Доводиться пояснювати одне й те саме двічі й координувати кількох людей",
  "Є ідеї та сирі матеріали, але до готового посту вони не доходять",
];

export const PORTFOLIO_CATEGORY_LABELS = {
  video: "Відеомонтаж",
  design: "Дизайн",
} as const;

export const PORTFOLIO_FILTERS = [
  { id: "video" },
  { id: "design" },
] as const;

// Replace a placeholder entry with your own title, category, thumbnail and videoSrc.
// One line can define a ready-to-preview item; leave thumbnail.src empty for the gradient placeholder.
export const PORTFOLIO = [
  { title: "Кейс 01", category: "video", thumbnail: { type: "image", src: "" }, videoSrc: "" },
  { title: "Кейс 02", category: "design", thumbnail: { type: "image", src: "" }, videoSrc: "" },
] satisfies Array<{
  title: string;
  category: keyof typeof PORTFOLIO_CATEGORY_LABELS;
  thumbnail: Media;
  videoSrc: string;
}>;

export const PROCESS_STEPS = [
  {
    title: "Ви надсилаєте тему, мету й матеріали",
    description: "Або просто ідею: я допоможу структурувати, що знімати й як подати.",
  },
  {
    title: "Я пропоную структуру",
    description: "Що стане каруселлю, що рілсом, які хуки.",
  },
  {
    title: "Роблю монтаж і дизайн в одному стилі",
    description: "Надсилаю на перегляд.",
  },
  {
    title: "Правки й фінальні файли",
    description: "Вношу правки (до 2 раундів) і віддаю готові файли для публікації.",
  },
];

export const PRICING = [
  {
    name: "Разова",
    price: "2 200 грн",
    features: [
      "1 карусель + 1 рілс (до 60 сек)",
      "2 раунди правок",
      "Готові файли для публікації",
    ],
  },
  {
    name: "Start",
    price: "8 600 грн / міс",
    features: [
      "4 каруселі + 4 рілси",
      "2 раунди правок на кожну одиницю",
      "Файли для Instagram, TikTok, Threads",
    ],
  },
  {
    name: "Growth",
    price: "16 400 грн / міс",
    features: [
      "8 каруселей + 8 рілсів",
      "Вигода 1 200 грн",
      "Знижка на монтаж −5%",
    ],
  },
  {
    name: "Pro",
    price: "22 800 грн / міс",
    featured: true,
    features: [
      "12 каруселей + 12 рілсів",
      "Вигода 3 600 грн",
      "Знижка на монтаж −10%",
      "Пріоритет у черзі на правки",
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: "Як почати роботу?",
    answer:
      "Напишіть мені в Telegram або Instagram, оберіть пакет, надішліть тему та матеріали, і я запропоную структуру.",
  },
  {
    question: "Чи входять правки в ціну?",
    answer: "Так, до 2 кіл правок входять у ціну кожної каруселі й кожного відео.",
  },
  {
    question: "Чи відрізняються ціни для різних ніш?",
    answer: "Ні, ціни єдині для всіх.",
  },
  {
    question: "Чи є знижки?",
    answer:
      "Так, у пакетах: чим більший пакет, тим вигідніше. Знижка на монтаж: від 5 відео −5%, від 10 відео −10%.",
  },
  {
    question: "Як відбувається оплата?",
    answer:
      "Разове замовлення оплачується повністю наперед, пакети за місяць наперед. Пакет діє 30 днів від першої оплати.",
  },
];

export const EXTRA_OPTIONS = [
  {
    option: "Кожен слайд каруселі понад 8",
    price: "+100 грн",
    description: "",
  },
  {
    option: "Апгрейд відео до «Креативний Максимум» (до 60 сек)",
    price: "+800 грн за відео",
    description: "Motion design, speed ramps, переходи через маски, глибокий sound design.",
  },
  {
    option: "Спрощений монтаж «Старт» (до 60 сек)",
    price: "−300 грн за відео",
    description: "Статичні субтитри, без анімації тексту.",
  },
  {
    option: "Відео довше 60 секунд",
    price: "від 1 200 грн за відео",
    description: "Розраховується окремо.",
  },
  {
    option: "Термінове виконання каруселі (за 24 години)",
    price: "+30%",
    description: "Ставлю вашу карусель у пріоритет і віддаю за 24 години.",
  },
  {
    option: "Версія каруселі під іншу аудиторію чи мову",
    price: "50% від ціни каруселі",
    description: "Окрема адаптація каруселі під іншу аудиторію чи мову.",
  },
  {
    option: "Додатковий раунд правок",
    price: "150 грн",
    description: "Понад 2 раунди, що входять у пакет.",
  },
  {
    option: "Повний комплекс «Під ключ»",
    price: "від 3 000 грн",
    description: "Виїзд на локацію, світло, зйомка, преміум-монтаж; розраховується окремо.",
  },
];
