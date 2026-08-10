import { Copy, Facebook, Share2 } from 'lucide-react';

const shareText = 'Chào mừng Quốc Khánh Việt Nam 2/9';

export default function SocialShare() {
  const pageUrl = typeof window === 'undefined' ? 'https://quanlehoang.github.io/test/' : window.location.href;

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ title: shareText, text: shareText, url: pageUrl });
      return;
    }

    await navigator.clipboard.writeText(pageUrl);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(pageUrl);
  };

  return (
    <section className="share-band" aria-label="Chia sẻ trang">
      <div className="container max-w-content">
        <div className="share-inner" data-aos="fade-up">
          <p>Lan tỏa tinh thần Quốc Khánh</p>
          <div className="share-actions">
            <button className="btn-premium btn-primary-red" type="button" onClick={shareNative}>
              <Share2 size={18} />
              Chia sẻ
            </button>
            <a
              className="btn-premium btn-outline-dark"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Facebook size={18} />
              Facebook
            </a>
            <a
              className="btn-premium btn-outline-dark"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noreferrer"
            >
              X
            </a>
            <button className="btn-premium btn-outline-dark" type="button" onClick={copyLink}>
              <Copy size={18} />
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
