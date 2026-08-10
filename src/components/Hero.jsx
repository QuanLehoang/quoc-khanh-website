import { ArrowDown, CalendarDays, PlayCircle } from 'lucide-react';

const sparks = Array.from({ length: 20 }, (_, index) => index);

export default function Hero({ t, fireworks }) {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="mouse-glow" aria-hidden="true" />
      {fireworks && (
        <div className="fireworks-layer" aria-hidden="true">
          {sparks.map((item) => <span key={item} style={{ '--i': item }} />)}
        </div>
      )}
      <div className="container max-w-content hero-content">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-7">
            <p className="section-kicker" data-aos="fade-up">02.09.2026</p>
            <h1 id="hero-title" className="hero-title" data-aos="fade-up" data-aos-delay="80">
              {t.heroTitle.split('\n').map((line) => <span key={line}>{line}</span>)}
            </h1>
            <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="160">{t.heroSubtitle}</p>
            <div className="hero-actions" data-aos="fade-up" data-aos-delay="240">
              <a className="btn-premium btn-primary-red" href="#history">
                <PlayCircle size={20} aria-hidden="true" />
                {t.explore}
              </a>
              <a className="btn-premium btn-outline-gold" href="#events">
                <CalendarDays size={20} aria-hidden="true" />
                {t.history}
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="flag-stage" data-aos="zoom-in" data-aos-delay="180" aria-label="Cờ Việt Nam chuyển động">
              <div className="flag-wave"><span>★</span></div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="hero-stat">
                <strong>81+</strong>
                <small>Years of Independence</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#history" aria-label="Cuộn xuống phần lịch sử">
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
