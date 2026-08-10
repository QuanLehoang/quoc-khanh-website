import { ArrowUp, Heart } from "lucide-react";

export default function Footer({ lang }) {

    const year = new Date().getFullYear();

    const text = {
        vi: {
            brand: "Quốc Khánh Việt Nam",
            copyright: "Quốc Khánh Việt Nam.",
            made: "Được tạo với",
            for: "dành cho Việt Nam.",
            links: "Liên kết chân trang",
            contact: "Liên hệ",
            reference: "Tham khảo",
            top: "Trở về đầu trang",
        },

        en: {
            brand: "Vietnam National Day",
            copyright: "Vietnam National Day.",
            made: "Made with",
            for: "for Vietnam.",
            links: "Footer Links",
            contact: "Contact",
            reference: "Reference",
            top: "Back to top",
        },
    };

    const t = text[lang] || text.vi;

    return (
        <footer className="footer">

            <div className="container max-w-content">

                <div className="footer-inner">

                    <a
                        className="brand"
                        href="#home"
                    >
                        <span className="brand-mark">
                            ★
                        </span>

                        <span>
                            {t.brand}
                        </span>
                    </a>

                    <p>
                        © {year} {t.copyright} {t.made}{" "}
                        <Heart
                            size={16}
                            fill="currentColor"
                            aria-hidden="true"
                        />{" "}
                        {t.for}
                    </p>

                    <div
                        className="footer-links"
                        aria-label={t.links}
                    >

                        <a href="#contact">
                            {t.contact}
                        </a>

                        <a href="https://github.com/quanlehoang/test">
                            GitHub
                        </a>

                        <a href="https://vi.wikipedia.org/wiki/Ngày_Quốc_khánh_(Việt_Nam)">
                            {t.reference}
                        </a>

                    </div>

                    <a
                        className="back-top"
                        href="#home"
                        aria-label={t.top}
                    >
                        <ArrowUp size={20} />
                    </a>

                </div>

            </div>

        </footer>
    );
}