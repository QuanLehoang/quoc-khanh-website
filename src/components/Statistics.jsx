import { useEffect, useRef, useState } from "react";

const stats = [
    {
        value: 81,
        suffix: "+",
        label: {
            vi: "Năm",
            en: "Years",
        },
    },
    {
        value: 102,
        suffix: "M+",
        label: {
            vi: "Dân số",
            en: "Citizens",
        },
    },
    {
        value: 34,
        suffix: "",
        label: {
            vi: "Tỉnh & Thành phố",
            en: "Provinces & Cities",
        },
    },
    {
        value: 54,
        suffix: "",
        label: {
            vi: "Dân tộc",
            en: "Ethnic Groups",
        },
    },
];

export default function Statistics({ lang = "vi" }) {
    const ref = useRef(null);

    const [visible, setVisible] = useState(false);
    const [counts, setCounts] = useState(
        stats.map(() => 0)
    );

    const isEnglish = lang === "en";

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            {
                threshold: 0.35,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) {
            setCounts(stats.map(() => 0));
            return;
        }

        const duration = 1600;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 4);

            setCounts(
                stats.map((stat) =>
                    Math.floor(stat.value * eased)
                )
            );

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        return () => {};
    }, [visible]);

    return (
        <section
            className="stats-band"
            ref={ref}
            aria-label={
                isEnglish
                    ? "Vietnam Statistics"
                    : "Thống kê Việt Nam"
            }
        >
            <div className="container max-w-content">
                <div className="stats-grid">

                    {stats.map((stat, index) => (
                        <div
                            className="stat-item group"
                            key={stat.label.en}
                            data-aos="zoom-in"
                            data-aos-delay={index * 100}
                        >
                            {/* SỐ */}
                            <strong
                                className={
                                    visible
                                        ? "count-pop"
                                        : ""
                                }
                            >
                                {counts[index]}
                                {stat.suffix}
                            </strong>

                            {/* CHỈ HIỆN 1 NGÔN NGỮ */}
                            <span>
                                {isEnglish
                                    ? stat.label.en
                                    : stat.label.vi}
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}