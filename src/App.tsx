import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  Play,
  Volume2,
  X,
} from "lucide-react";
import {
  BRAND_NAME,
  CONTACT_LINKS,
  EXTRA_OPTIONS,
  FAQ_ITEMS,
  HERO,
  MEDIA,
  NAV_LINKS,
  PORTFOLIO,
  PORTFOLIO_CATEGORY_LABELS,
  PORTFOLIO_FILTERS,
  PAGE_LINKS,
  PRICING,
  PROCESS_STEPS,
  SERVICE_PAIN_POINTS,
  SEO,
  SECTION_IDS,
  UI,
} from "./content";

type CursorPosition = { x: number; y: number };
type PortfolioEntry = {
  id: string;
  title: string;
  category: (typeof PORTFOLIO)[number]["category"];
  kind: "video" | "carousel";
  thumbnail?: string;
  videoSrc?: string;
  slides: string[];
};

const FALLBACK_PORTFOLIO: PortfolioEntry[] = PORTFOLIO.map((item, index) => ({
  id: `fallback-${index}`,
  title: item.title,
  category: item.category,
  kind: item.category === "video" ? "video" : "carousel",
  thumbnail: item.thumbnail?.src || "",
  videoSrc: item.videoSrc || undefined,
  slides: item.videoSrc ? [] : [],
}));

const DISCOVERED_PORTFOLIO = (() => {
  const entries = import.meta.glob("./assets/optimized/works/**/*.{webp,mp4}", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const carouselMap = new Map<string, PortfolioEntry>();
  const videoMap = new Map<string, PortfolioEntry>();

  Object.entries(entries).forEach(([key, resolved]) => {
    const normalized = key.replace(/\\/g, "/");
    const matchCarousel = normalized.match(/\/carousels\/([^/]+)\/(.+\.webp)$/);
    if (matchCarousel) {
      const [, folderName, fileName] = matchCarousel;
      const item = carouselMap.get(folderName) ?? {
        id: `carousel-${folderName}`,
        title: folderName.replace(/[-_]+/g, " "),
        category: "design",
        kind: "carousel",
        thumbnail: "",
        slides: [],
      };

      if (!item.thumbnail && fileName) {
        item.thumbnail = resolved;
      }

      item.slides.push(resolved);
      carouselMap.set(folderName, item);
      return;
    }

    const matchVideo = normalized.match(/\/videos\/([^/]+)\.(mp4|webp)$/);
    if (matchVideo) {
      const [, baseName, extension] = matchVideo;
      const localizedTitle = baseName
        .replace(/^video(?=[\s_-]|$)/i, "Відео")
        .replace(/[-_]+/g, " ")
        .trim();
      const item = videoMap.get(baseName) ?? {
        id: `video-${baseName}`,
        title: localizedTitle,
        category: "video",
        kind: "video",
        slides: [],
      };

      if (extension.toLowerCase() === "mp4") {
        item.videoSrc = resolved;
      } else if (!item.thumbnail) {
        item.thumbnail = resolved;
      }

      videoMap.set(baseName, item);
    }
  });

  const sortedCarousels = [...carouselMap.values()].map((item) => ({
    ...item,
    slides: [...item.slides].sort((left, right) => {
      const a = Number.parseInt(left.match(/(\d+)/)?.[1] ?? "0", 10);
      const b = Number.parseInt(right.match(/(\d+)/)?.[1] ?? "0", 10);
      return a - b;
    }),
  }));

  sortedCarousels.forEach((item) => {
    item.thumbnail = item.slides[0] || item.thumbnail;
    item.title = item.title.trim() || "Кейс";
  });

  const sortedVideos = [...videoMap.values()].sort((left, right) => {
    const leftNumber = Number.parseInt(left.title.match(/\d+/)?.[0] ?? "0", 10);
    const rightNumber = Number.parseInt(right.title.match(/\d+/)?.[0] ?? "0", 10);
    return leftNumber - rightNumber || left.title.localeCompare(right.title, "uk");
  });

  return [...sortedCarousels, ...sortedVideos];
})();

const PORTFOLIO_ITEMS = [
  ...DISCOVERED_PORTFOLIO,
  ...FALLBACK_PORTFOLIO.filter(
    (fallback) =>
      !DISCOVERED_PORTFOLIO.some((discovered) => discovered.category === fallback.category),
  ),
];

function BrandLogo() {
  return (
    <a className="flex items-center" href={PAGE_LINKS.home} aria-label={UI.home}>
      <span className="font-playfair text-2xl italic text-white">{BRAND_NAME}</span>
    </a>
  );
}

function Hero() {
  const mouse = useRef<CursorPosition>({ x: -999, y: -999 });
  const smooth = useRef<CursorPosition>({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      const deltaX = mouse.current.x - smooth.current.x;
      const deltaY = mouse.current.y - smooth.current.y;
      smooth.current.x += deltaX * 0.1;
      smooth.current.y += deltaY * 0.1;

      const reveal = revealRef.current;
      reveal?.style.setProperty("--cursor-x", `${smooth.current.x}px`);
      reveal?.style.setProperty("--cursor-y", `${smooth.current.y}px`);

      if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
        rafRef.current = window.requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    const scheduleAnimation = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(animate);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
      scheduleAnimation();
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        mouse.current = { x: touch.clientX, y: touch.clientY };
        scheduleAnimation();
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ height: "100dvh" }}
      aria-label={UI.heroLabel}
    >
      <div
        className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${MEDIA.heroBase.src}")` }}
      />
      <div
        ref={revealRef}
        aria-hidden="true"
        className="hero-reveal-layer pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${MEDIA.heroReveal.src}")` }}
      />

      <div className="pointer-events-none absolute left-0 right-0 top-[14%] z-50 flex flex-col items-center px-5 text-center">
        <h1 className="text-white leading-[0.95]">
          <span
            className="hero-anim hero-reveal font-playfair block text-5xl font-normal italic sm:text-7xl md:text-8xl"
            style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
          >
            {HERO.heading[0]}
          </span>
          <span
            className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl"
            style={{ letterSpacing: "-0.08em", animationDelay: "0.42s" }}
          >
            {HERO.heading[1]}
          </span>
        </h1>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-14 left-10 z-50 hidden max-w-[360px] md:left-14 sm:block"
        style={{ animationDelay: "0.7s" }}
      >
        <p className="text-sm leading-relaxed text-white/80">{HERO.bottomLeft}</p>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[400px] sm:gap-5 md:right-14"
        style={{ animationDelay: "0.85s" }}
      >
        <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
          {HERO.bottomRight}
        </p>
        <a
          href={PAGE_LINKS.contact}
          className="hero-cta rounded-full px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] active:scale-95"
        >
          {HERO.cta}
        </a>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-heading scroll-reveal">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="content-section" id={SECTION_IDS.services}>
      <div className="page-container">
        <article className="service-feature scroll-reveal">
          <p className="service-eyebrow">{UI.serviceEyebrow}</p>
          <h2 className="service-feature-title">
            {UI.servicesTitle}
            <span className="font-playfair">{UI.servicesSecondTitle}</span>
          </h2>
          <p className="service-intro">
            <span>{UI.servicesLead}</span>{" "}
            <span className="service-description">{UI.servicesDescription}</span>
          </p>

          <div className="service-parts">
            <article className="service-part">
              <h3>{UI.videoPartTitle}</h3>
              <p>{UI.videoPartDescription}</p>
            </article>
            <article className="service-part">
              <h3>{UI.designPartTitle}</h3>
              <p>{UI.designPartDescription}</p>
            </article>
          </div>

          <p className="service-shared">{UI.sharedDescription}</p>

          <div className="service-pains">
            <h3>{UI.painTitle}</h3>
            <ul>
              {SERVICE_PAIN_POINTS.map((pain) => <li key={pain}>{pain}</li>)}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

function PortfolioCard({
  item,
  index,
  onPreview,
}: {
  item: PortfolioEntry;
  index: number;
  onPreview: (item: PortfolioEntry) => void;
}) {
  const thumbnail = item.thumbnail || "";
  const isVideoItem = item.kind === "video";
  const showPreview = isVideoItem ? Boolean(item.videoSrc) : Boolean(item.slides.length);

  return (
    <article
      className="portfolio-card"
      style={{ transitionDelay: `${(index % 3) * 75}ms` }}
    >
      <button
        type="button"
        className={`portfolio-visual${thumbnail ? " has-thumbnail" : ""}${isVideoItem ? " is-video" : ""}`}
        aria-label={showPreview ? `${UI.play}: ${item.title}` : item.title}
        onClick={() => showPreview && onPreview(item)}
        disabled={!showPreview}
      >
        {thumbnail ? (
          <img src={thumbnail} alt="" loading="lazy" decoding="async" />
        ) : (
          <span className="portfolio-empty" aria-hidden="true" />
        )}
        <span className="portfolio-glow" aria-hidden="true" />
        {item.kind === "carousel" && item.slides.length > 0 && (
          <span className="portfolio-badge">{item.slides.length} {UI.slideCountSuffix}</span>
        )}
        <span className="portfolio-play" aria-hidden="true"><Play size={19} fill="currentColor" /></span>
        {item.kind === "carousel" && item.slides.length > 0 && (
          <span className="portfolio-view-button">{UI.viewCase}</span>
        )}
        <span className="portfolio-number">{String(index + 1).padStart(2, "0")}</span>
      </button>
      <div className="portfolio-caption">
        <h3>{item.title}</h3>
        <span>{PORTFOLIO_CATEGORY_LABELS[item.category]}</span>
      </div>
    </article>
  );
}

function WorkSection({
  onPreview,
}: {
  onPreview: (item: PortfolioEntry) => void;
}) {
  const [activeCategory, setActiveCategory] =
    useState<(typeof PORTFOLIO_FILTERS)[number]["id"]>("design");
  const activeItems = PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      className="content-section content-section-muted portfolio-section"
      id={SECTION_IDS.work}
    >
      <div className="page-container">
        <SectionHeading
          eyebrow={BRAND_NAME}
          title={UI.workTitle}
          subtitle={UI.workSubtitle}
        />
        <div className="portfolio-switcher" role="group" aria-label={UI.workTitle}>
          {PORTFOLIO_FILTERS.map((filter) => (
            <button
              type="button"
              className={`portfolio-filter${activeCategory === filter.id ? " is-active" : ""}`}
              key={filter.id}
              aria-pressed={activeCategory === filter.id}
              onClick={() => setActiveCategory(filter.id)}
            >
              {filter.id === "video" ? "Відео" : "Фото"}
              <span>{PORTFOLIO_ITEMS.filter((item) => item.category === filter.id).length}</span>
            </button>
          ))}
        </div>
        <section
          className="portfolio-category"
          aria-live="polite"
          aria-label={activeCategory === "video" ? "Відео робіт" : "Фото робіт"}
        >
          <h3>{activeCategory === "video" ? "Відео" : "Фото"}</h3>
          <div className="portfolio-grid">
            {activeItems.map((item, index) => (
              <PortfolioCard
                item={item}
                index={index}
                key={item.id}
                onPreview={onPreview}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="content-section" id={SECTION_IDS.process}>
      <div className="page-container">
        <SectionHeading eyebrow={BRAND_NAME} title={UI.processTitle} />
        <div className="process-track scroll-reveal">
          {PROCESS_STEPS.map((step, index) => (
            <article className="process-step" key={step.title}>
              <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="process-copy">
                <p>{step.title}</p>
                <span>{step.description}</span>
              </div>
              <span className="process-layer" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="content-section content-section-muted" id={SECTION_IDS.pricing}>
      <div className="page-container">
        <SectionHeading eyebrow={BRAND_NAME} title={UI.pricingTitle} />
        <div className="pricing-grid">
          {PRICING.map((plan, index) => (
            <article
              className={`pricing-card scroll-reveal${plan.featured ? " pricing-card-featured" : ""}`}
              style={{ transitionDelay: `${index * 75}ms` }}
              key={plan.name}
            >
              <h3>{plan.name}</h3>
              <p className="plan-price">{plan.price}</p>
              <ul>
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <a className="plan-link" href={CONTACT_LINKS.TELEGRAM} target="_blank" rel="noreferrer">
                {UI.writeToTelegram}
              </a>
            </article>
          ))}
        </div>
        <div className="pricing-subnote scroll-reveal">
          <p>У каруселі до 8 слайдів, у відео до 60 секунд. Пакети оплачуються наперед за місяць і діють 30 днів від першої оплати.</p>
        </div>
        <div className="custom-project scroll-reveal">
          <div>
            <p>{UI.customProject}</p>
            <span>{UI.customProjectDetail}</span>
          </div>
          <a className="button-outline" href={PAGE_LINKS.contact}>{UI.getEstimate} <ArrowUpRight size={16} /></a>
        </div>
        <div className="pricing-extra scroll-reveal">
          <h3>Додаткові опції</h3>
          <div className="extra-options">
            {EXTRA_OPTIONS.map((option) => option.description ? (
              <details className="faq-item extra-option" key={option.option}>
                <summary>
                  <span>{option.option}</span>
                  <strong>{option.price}</strong>
                </summary>
                <p>{option.description}</p>
              </details>
            ) : (
              <div className="faq-item extra-option extra-option-heading" key={option.option}>
                <span>{option.option}</span>
                <strong>{option.price}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="content-section content-section-muted" id={SECTION_IDS.faq}>
      <div className="page-container">
        <SectionHeading eyebrow={BRAND_NAME} title={UI.faqTitle} />
        <div className="faq-list scroll-reveal">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="content-section" id={SECTION_IDS.contact}>
      <div className="page-container">
        <SectionHeading eyebrow={BRAND_NAME} title={UI.contactTitle} />
        <p className="contact-subtitle">{UI.contactSubtitle}</p>
        <div className="contact-cards scroll-reveal">
          <a href={CONTACT_LINKS.TELEGRAM} target="_blank" rel="noreferrer" className="contact-card">
            <span>{UI.telegram}</span>
            <strong>@deluxeworking</strong>
            <ArrowUpRight size={21} />
          </a>
          <a href={CONTACT_LINKS.INSTAGRAM} target="_blank" rel="noreferrer" className="contact-card">
            <span>{UI.instagram}</span>
            <strong>delya.aep</strong>
            <ArrowUpRight size={21} />
          </a>
        </div>
      </div>
    </section>
  );
}

function PreviewModal({
  item,
  onClose,
}: {
  item: PortfolioEntry | null;
  onClose: () => void;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioError, setAudioError] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setActiveSlide(0);
    setAudioEnabled(false);
    setAudioError("");
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (item.kind !== "carousel") return;
      if (event.key === "ArrowRight") setActiveSlide((index) => Math.min(index + 1, item.slides.length - 1));
      if (event.key === "ArrowLeft") setActiveSlide((index) => Math.max(index - 1, 0));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  useEffect(() => {
    if (!item || item.kind !== "carousel") return;
    const slide = carouselRef.current?.children[activeSlide] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [item, activeSlide]);

  if (!item) return null;

  const isCarousel = item.kind === "carousel" && item.slides.length > 0;

  const enableAudio = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    try {
      await video.play();
      setAudioEnabled(true);
      setAudioError("");
    } catch (error) {
      setAudioError(error instanceof Error ? error.message : UI.videoPlaybackError);
    }
  };

  return (
    <div className="preview-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className={`preview-dialog${isCarousel ? " preview-dialog-carousel" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
      >
        <button className="preview-close" type="button" onClick={onClose} aria-label={UI.closePreview}>
          <X size={20} />
        </button>

        {isCarousel ? (
          <>
            <div className="carousel-track" ref={carouselRef}>
              {item.slides.map((slide, index) => (
                <figure className="carousel-slide" key={`${item.id}-${index}`}>
                  <img src={slide} alt={`${item.title} ${index + 1}`} loading="lazy" />
                </figure>
              ))}
            </div>
            <div className="carousel-controls">
              <button type="button" onClick={() => setActiveSlide((index) => Math.max(index - 1, 0))} aria-label="Previous slide">
                ←
              </button>
              <div className="carousel-meta">
                <span>{activeSlide + 1} / {item.slides.length}</span>
                <div className="carousel-progress">
                  <span style={{ width: `${((activeSlide + 1) / item.slides.length) * 100}%` }} />
                </div>
              </div>
              <button type="button" onClick={() => setActiveSlide((index) => Math.min(index + 1, item.slides.length - 1))} aria-label="Next slide">
                →
              </button>
            </div>
          </>
        ) : (
          <div className="preview-video">
            <video
              ref={videoRef}
              src={item.videoSrc}
              poster={item.thumbnail}
              controls
              autoPlay
              playsInline
              preload="metadata"
              onVolumeChange={(event) => {
                if (!event.currentTarget.muted && event.currentTarget.volume > 0) {
                  setAudioEnabled(true);
                  setAudioError("");
                } else if (audioEnabled) {
                  setAudioEnabled(false);
                }
              }}
            />
            {!audioEnabled && (
              <button className="preview-audio-button" type="button" onClick={enableAudio}>
                <Volume2 size={18} />
                {UI.enableVideoAudio}
              </button>
            )}
            {audioError && <p className="preview-video-error" role="alert">{audioError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<PortfolioEntry | null>(null);

  useEffect(() => {
    document.documentElement.lang = "uk";
    document.title = SEO.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", SEO.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", SEO.openGraphTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", SEO.openGraphDescription);
    document.querySelector('meta[property="og:type"]')?.setAttribute("content", SEO.openGraphType);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="site-shell min-h-screen tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <BrandLogo />
        <div className="desktop-nav-pill absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/20 hover:text-white ${index === 0 ? "text-white" : "text-white/80"}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100 md:block"
            href={PAGE_LINKS.contact}
          >
            {UI.writeToMe}
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md md:hidden"
            aria-label={mobileMenuOpen ? UI.closeMenu : UI.openMenu}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-nav-panel">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMobileMenu}>{link.label}</a>
            ))}
          </div>
        )}
      </nav>

      <main id={SECTION_IDS.home}>
        <Hero />
        <ServicesSection />
        <WorkSection onPreview={setPreviewItem} />
        <ProcessSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>

      <footer className="site-footer">
        <div className="page-container footer-inner">
          <div className="footer-brand">
            <BrandLogo />
            <p>{UI.footerTagline}</p>
          </div>
          <nav className="footer-nav" aria-label={UI.footerTagline}>
            {NAV_LINKS.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <div className="footer-socials">
            <a href={CONTACT_LINKS.TELEGRAM} target="_blank" rel="noreferrer">{UI.telegram}</a>
            <a href={CONTACT_LINKS.INSTAGRAM} target="_blank" rel="noreferrer">{UI.instagram}</a>
          </div>
          <p className="copyright">{UI.copyright}</p>
        </div>
      </footer>

      <PreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />
    </div>
  );
}

export default App;
