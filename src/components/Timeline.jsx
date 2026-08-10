import { useEffect, useRef } from "react";

const timeline = [
    {
        year: "1945",
        title: {
            vi: "Tuyên ngôn Độc lập",
            en: "Declaration of Independence",
        },
        text: {
            vi: "Ngày 02/09/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
            en: "On September 2, 1945, President Ho Chi Minh read the Declaration of Independence at Ba Dinh Square, proclaiming the birth of the Democratic Republic of Vietnam.",
        },
    },
    {
        year: "1954",
        title: {
            vi: "Điện Biên Phủ và Hiệp định Genève",
            en: "Dien Bien Phu and the Geneva Accords",
        },
        text: {
            vi: "Chiến thắng Điện Biên Phủ và Hiệp định Genève năm 1954 mở ra một giai đoạn mới, tạo điều kiện cho công cuộc xây dựng miền Bắc.",
            en: "The victory at Dien Bien Phu and the 1954 Geneva Accords opened a new chapter, creating conditions for the reconstruction and development of Northern Vietnam.",
        },
    },
    {
        year: "1975",
        title: {
            vi: "Đại thắng mùa Xuân, thống nhất đất nước",
            en: "Spring Victory and National Reunification",
        },
        text: {
            vi: "Đại thắng mùa Xuân năm 1975 kết thúc chiến tranh, mở ra thời kỳ hòa bình và thống nhất đất nước.",
            en: "The Spring Victory of 1975 ended the war and opened a new era of peace and national reunification.",
        },
    },
    {
        year: "1976",
        title: {
            vi: "Thành lập nước Cộng hòa Xã hội Chủ nghĩa Việt Nam",
            en: "Establishment of the Socialist Republic of Vietnam",
        },
        text: {
            vi: "Quốc hội khóa VI quyết định tên nước là Cộng hòa Xã hội Chủ nghĩa Việt Nam, khẳng định sự thống nhất và độc lập dân tộc.",
            en: "The 6th National Assembly officially named the country the Socialist Republic of Vietnam, affirming national unity and independence.",
        },
    },
    {
        year: "1986",
        title: {
            vi: "Khởi xướng công cuộc Đổi mới",
            en: "Launch of the Doi Moi Reforms",
        },
        text: {
            vi: "Đại hội VI của Đảng năm 1986 khởi xướng công cuộc Đổi mới, mở ra bước chuyển quan trọng trong phát triển kinh tế và hội nhập quốc tế.",
            en: "The 6th National Party Congress in 1986 launched the Doi Moi reforms, marking a major turning point in economic development and international integration.",
        },
    },
    {
        year: "2007",
        title: {
            vi: "Gia nhập WTO",
            en: "Joining the WTO",
        },
        text: {
            vi: "Ngày 11/01/2007, Việt Nam chính thức trở thành thành viên thứ 150 của Tổ chức Thương mại Thế giới (WTO), đánh dấu bước tiến quan trọng trong quá trình hội nhập quốc tế.",
            en: "On January 11, 2007, Vietnam officially became the 150th member of the World Trade Organization (WTO), marking an important milestone in its international integration.",
        },
    },
    {
        year: "2025",
        title: {
            vi: "Kỷ niệm 80 năm Quốc khánh",
            en: "80th Anniversary of National Day",
        },
        text: {
            vi: "Năm 2025 đánh dấu 80 năm kể từ ngày Quốc khánh 02/09/1945, là dịp nhìn lại chặng đường lịch sử và hướng tới một giai đoạn phát triển mới.",
            en: "2025 marked the 80th anniversary of Vietnam's National Day on September 2, 1945, providing an opportunity to reflect on the nation's historic journey and look toward a new era of development.",
        },
    },
];

export default function Timeline({ lang = "vi" }) {
    const timelineRef = useRef(null);

    const isEnglish = lang === "en";

    const sectionTitle = isEnglish
        ? "History & Significance"
        : "Lịch sử & Ý nghĩa";

    const mainTitle = isEnglish
        ? "Sacred Milestones of the Nation"
        : "Dấu mốc thiêng liêng của dân tộc";

    const description = isEnglish
        ? "From the historic independence of 1945 to today, the spirit of National Day continues to inspire peace, unity, and development."
        : "85 năm từ mùa thu độc lập năm 1945 đến hôm nay, tinh thần Quốc khánh là nguồn cảm hứng cho hòa bình, đoàn kết và phát triển.";

    /*
     * Animation khi timeline xuất hiện trên màn hình
     */
    useEffect(() => {
        const container = timelineRef.current;

        if (!container) return;

        const elements = container.querySelectorAll(
            ".timeline-animated-item"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "timeline-visible"
                        );

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
            }
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            id="events"
            className="
                relative
                py-20
                md:py-28
                overflow-hidden
            "
        >
            {/* =========================================
                BACKGROUND GLOW
            ========================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    top-20
                    left-[-150px]
                    w-[320px]
                    h-[320px]
                    rounded-full
                    bg-red-600/10
                    blur-[110px]
                    animate-pulse
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-20
                    right-[-150px]
                    w-[320px]
                    h-[320px]
                    rounded-full
                    bg-yellow-400/10
                    blur-[110px]
                    animate-pulse
                "
                style={{
                    animationDelay: "1.5s",
                }}
            />

            <div className="container mx-auto px-4 relative z-10">

                {/* =========================================
                    HEADER
                ========================================== */}

                <div
                    className="
                        text-center
                        max-w-4xl
                        mx-auto
                        mb-14
                        md:mb-20
                    "
                    data-aos="fade-up"
                >
                    <p
                        className="
                            text-sm
                            md:text-base
                            font-bold
                            tracking-[0.18em]
                            uppercase
                            text-red-600
                            mb-3
                        "
                    >
                        {sectionTitle}
                    </p>

                    <h2
                        className="
                            text-3xl
                            sm:text-4xl
                            md:text-5xl
                            lg:text-6xl
                            font-bold
                            leading-tight
                        "
                    >
                        {mainTitle}
                    </h2>

                    <p
                        className="
                            mt-5
                            text-[15px]
                            sm:text-base
                            md:text-lg
                            leading-relaxed
                            opacity-75
                        "
                    >
                        {description}
                    </p>
                </div>

                {/* =========================================
                    TIMELINE
                ========================================== */}

                <div
                    ref={timelineRef}
                    className="
                        relative
                        max-w-6xl
                        mx-auto
                    "
                >

                    {/* Desktop line */}
                    <div
                        className="
                            hidden
                            md:block
                            absolute
                            left-1/2
                            top-0
                            bottom-0
                            w-[2px]
                            -translate-x-1/2
                            bg-red-600/15
                        "
                    >
                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-b
                                from-transparent
                                via-red-600
                                to-transparent
                                animate-pulse
                            "
                        />
                    </div>

                    {/* Mobile line */}
                    <div
                        className="
                            md:hidden
                            absolute
                            left-[10px]
                            top-0
                            bottom-0
                            w-[2px]
                            bg-red-600/15
                        "
                    >
                        <div
                            className="
                                absolute
                                inset-0
                                bg-red-600/50
                                animate-pulse
                            "
                        />
                    </div>

                    {/* =====================================
                        TIMELINE ITEMS
                    ====================================== */}

                    {timeline.map((item, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <div
                                key={item.year}
                                className={`
                                    timeline-animated-item

                                    relative
                                    grid
                                    grid-cols-1
                                    md:grid-cols-2

                                    gap-4
                                    md:gap-16

                                    mb-10
                                    md:mb-20

                                    pl-8
                                    md:pl-0

                                    opacity-0
                                    translate-y-10

                                    transition-all
                                    duration-1000
                                    ease-out
                                `}
                                style={{
                                    transitionDelay: `${index * 120}ms`,
                                }}
                            >

                                {/* =================================
                                    MOBILE DOT
                                ================================== */}

                                <div
                                    className="
                                        md:hidden
                                        absolute
                                        left-[4px]
                                        top-[7px]

                                        w-[13px]
                                        h-[13px]

                                        rounded-full

                                        bg-red-600

                                        ring-4
                                        ring-white
                                        dark:ring-[#160b09]

                                        shadow-[0_0_18px_rgba(218,37,29,0.75)]

                                        animate-pulse
                                    "
                                />

                                {/* =================================
                                    DESKTOP DOT
                                ================================== */}

                                <div
                                    className="
                                        hidden
                                        md:block

                                        absolute
                                        left-1/2
                                        top-7

                                        -translate-x-1/2

                                        w-4
                                        h-4

                                        rounded-full

                                        bg-red-600

                                        ring-4
                                        ring-white
                                        dark:ring-[#160b09]

                                        shadow-[0_0_20px_rgba(218,37,29,0.8)]

                                        z-20

                                        transition-all
                                        duration-500
                                    "
                                />

                                {/* =================================
                                    YEAR
                                ================================== */}

                                <div
                                    className={`
                                        flex
                                        items-start

                                        ${
                                            isLeft
                                                ? "md:justify-end md:text-right"
                                                : "md:order-2 md:justify-start md:text-left"
                                        }
                                    `}
                                >
                                    <div
                                        className="
                                            font-serif
                                            font-black
                                            italic
                                            tracking-[-0.05em]
                                            leading-none

                                            text-5xl
                                            sm:text-6xl
                                            md:text-6xl
                                            lg:text-7xl

                                            text-transparent
                                            bg-clip-text
                                            bg-gradient-to-b
                                            from-red-500
                                            via-red-600
                                            to-red-800

                                            select-none
                                            cursor-default

                                            transition-all
                                            duration-500
                                            ease-out

                                            hover:scale-110
                                            hover:-translate-y-1

                                            drop-shadow-[0_5px_15px_rgba(218,37,29,0.18)]
                                            hover:drop-shadow-[0_8px_25px_rgba(218,37,29,0.45)]
                                        "
                                    >
                                        {item.year}
                                    </div>
                                </div>

                                {/* =================================
                                    CARD
                                ================================== */}

                                <div
                                    className={
                                        isLeft
                                            ? ""
                                            : "md:order-1"
                                    }
                                >
                                    <article
                                        className="
                                            group
                                            relative

                                            w-full

                                            rounded-2xl

                                            p-5
                                            sm:p-6
                                            md:p-8

                                            bg-white/80
                                            dark:bg-white/5

                                            border
                                            border-red-600/10

                                            shadow-lg

                                            backdrop-blur-md

                                            overflow-hidden

                                            transition-all
                                            duration-500
                                            ease-out

                                            hover:-translate-y-2
                                            hover:scale-[1.015]

                                            hover:shadow-[0_20px_50px_rgba(218,37,29,0.15)]

                                            hover:border-red-600/30
                                        "
                                    >

                                        {/* Light sweep */}
                                        <div
                                            className="
                                                pointer-events-none

                                                absolute
                                                top-0
                                                left-[-100%]

                                                w-[60%]
                                                h-full

                                                bg-gradient-to-r
                                                from-transparent
                                                via-white/20
                                                to-transparent

                                                skew-x-[-20deg]

                                                transition-all
                                                duration-700

                                                group-hover:left-[130%]
                                            "
                                        />

                                        {/* Year badge */}
                                        <div
                                            className="
                                                relative
                                                inline-flex
                                                items-center

                                                px-3
                                                py-1

                                                mb-4

                                                rounded-full

                                                bg-red-600/10
                                                text-red-600

                                                text-xs
                                                font-bold

                                                tracking-wider
                                            "
                                        >
                                            {item.year}
                                        </div>

                                        {/* =================================
                                            ONLY ONE LANGUAGE
                                        ================================== */}

                                        <h3
                                            className="
                                                relative

                                                text-xl
                                                sm:text-2xl
                                                md:text-2xl
                                                lg:text-3xl

                                                font-bold

                                                leading-tight

                                                transition-colors
                                                duration-300

                                                group-hover:text-red-600
                                            "
                                        >
                                            {isEnglish
                                                ? item.title.en
                                                : item.title.vi}
                                        </h3>

                                        <p
                                            className="
                                                relative

                                                mt-3
                                                md:mt-4

                                                text-[15px]
                                                sm:text-base
                                                md:text-lg

                                                leading-relaxed

                                                opacity-80
                                            "
                                        >
                                            {isEnglish
                                                ? item.text.en
                                                : item.text.vi}
                                        </p>

                                        {/* Bottom glow */}
                                        <div
                                            className="
                                                absolute
                                                bottom-0
                                                left-0

                                                h-[2px]
                                                w-0

                                                bg-gradient-to-r
                                                from-red-600
                                                via-yellow-400
                                                to-transparent

                                                transition-all
                                                duration-500

                                                group-hover:w-full
                                            "
                                        />

                                    </article>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* =========================================
                LOCAL ANIMATION
            ========================================== */}

            <style>
                {`
                    .timeline-visible {
                        opacity: 1 !important;
                        transform: translateY(0) !important;
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .timeline-animated-item {
                            opacity: 1 !important;
                            transform: none !important;
                            transition: none !important;
                        }
                    }
                `}
            </style>
        </section>
    );
}