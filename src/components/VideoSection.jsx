import { useEffect, useRef } from "react";

export default function Documentary({ lang = "vi" }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add("documentary-visible");
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const text = {
        vi: {
            kicker: "TƯ LIỆU",
            title: (
                <>
                    Tuyên ngôn
                    <br />
                    Độc lập và
                    <br />
                    hành trình dân
                    <br />
                    tộc
                </>
            ),
            description:
                "Một không gian xem phim tư liệu trang trọng, tối ưu tỷ lệ khung hình và giữ trải nghiệm mượt trên mọi thiết bị.",
        },

        en: {
            kicker: "DOCUMENTARY",
            title: (
                <>
                    The Declaration
                    <br />
                    of Independence
                    <br />
                    and the Nation's
                    <br />
                    Journey
                </>
            ),
            description:
                "A dignified documentary viewing space, optimized for the correct aspect ratio and a smooth experience across all devices.",
        },
    };

    const t = text[lang] || text.vi;

    return (
        <section
            ref={sectionRef}
            className="documentary-section"
            id="documentary"
        >
            <div className="documentary-glow documentary-glow-one" />
            <div className="documentary-glow documentary-glow-two" />

            <div className="container max-w-content">
                <div className="documentary-card">

                    {/* LEFT */}
                    <div className="documentary-content">
                        <span className="documentary-kicker">
                            {t.kicker}
                        </span>

                        <h2 className="documentary-title">
                            {t.title}
                        </h2>

                        <p className="documentary-description">
                            {t.description}
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="documentary-video-wrap">
                        <div className="documentary-video-glow" />

                        <div className="documentary-video">
                            <iframe
                                src="https://www.youtube-nocookie.com/embed/t64U1YhgHbo"
                                title={
                                    lang === "vi"
                                        ? "Tuyên ngôn Độc lập và hành trình dân tộc"
                                        : "The Declaration of Independence and the Nation's Journey"
                                }
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}