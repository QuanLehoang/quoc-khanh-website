import { Quote as QuoteIcon } from 'lucide-react';


export default function Quote({ text }) {
  return (
    <section className="quote-section" aria-label="Trích dẫn yêu nước">
      <div className="container max-w-content">
        <blockquote className="quote-card" data-aos="zoom-in">
          <QuoteIcon size={42} aria-hidden="true" />
          <p>{text}</p>
          <cite>Chủ tịch Hồ Chí Minh</cite>
        </blockquote>
      </div>
    </section>
  );
}
