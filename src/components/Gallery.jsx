import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "../utils/content";

export default function Gallery({ lang }) {
    const images = gallery[lang] || gallery.vi;

    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    const touchStartX = useRef(null);

    const text = {
        vi: {
            kicker: "Thư viện",
            title: "Minh họa ngày hội non sông",
            description: "Những hình ảnh tiêu biểu về Quốc khánh Việt Nam.",
            close: "Đóng ảnh",
            prev: "Ảnh trước",
            next: "Ảnh tiếp theo",
            counter: "Ảnh",
        },

        en: {
            kicker: "Gallery",
            title: "Vietnam National Day Gallery",
            description:
                "A collection of representative images celebrating Vietnam National Day.",
            close: "Close image",
            prev: "Previous image",
            next: "Next image",
            counter: "Image",
        },
    };

    const t = text[lang] || text.vi;

    /*
     * ============================================================
     * ĐIỀU HƯỚNG
     * ============================================================
     */

    const next = useCallback(() => {
        if (images.length <= 1) return;

        setActiveIndex((index) => {
            return (index + 1) % images.length;
        });
    }, [images.length]);

    const previous = useCallback(() => {
        if (images.length <= 1) return;

        setActiveIndex((index) => {
            return (index - 1 + images.length) % images.length;
        });
    }, [images.length]);

    /*
     * ============================================================
     * TÍNH VỊ TRÍ CARD
     *
     * Không cố định theo 6 / 8 / 10 ảnh.
     * Tự tính dựa trên images.length.
     * ============================================================
     */

    const getOffset = useCallback(
        (index) => {
            const total = images.length;

            if (total === 0) return 0;

            let offset = index - activeIndex;

            /*
             * Đưa offset về khoảng gần trung tâm nhất.
             *
             * Ví dụ 6 ảnh:
             * -3 -2 -1 0 1 2
             *
             * Khi chuyển slide:
             * -2 -1 0 1 2 -2
             */

            if (offset > total / 2) {
                offset -= total;
            }

            if (offset < -total / 2) {
                offset += total;
            }

            return offset;
        },
        [activeIndex, images.length]
    );

    /*
     * ============================================================
     * CHỈ HIỂN THỊ CARD GẦN TRUNG TÂM
     *
     * 5 card tối đa:
     *       -2  -1   0   1   2
     *
     * Điều này giúp carousel không bị nát khi có nhiều ảnh.
     * ============================================================
     */

    const isCardVisible = (offset) => {
        return Math.abs(offset) <= 2;
    };

    /*
     * ============================================================
     * AUTO SLIDE
     * ============================================================
     */

    useEffect(() => {
        if (
            isPaused ||
            lightboxIndex !== null ||
            images.length < 2
        ) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            next();
        }, 4500);

        return () => {
            window.clearInterval(timer);
        };
    }, [
        isPaused,
        lightboxIndex,
        images.length,
        next,
    ]);

    /*
     * ============================================================
     * KEYBOARD LIGHTBOX
     * ============================================================
     */

    useEffect(() => {
        if (lightboxIndex === null) return undefined;

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setLightboxIndex(null);
            }

            if (event.key === "ArrowLeft") {
                setLightboxIndex((index) => {
                    if (index === null) return null;

                    return (
                        (index - 1 + images.length) %
                        images.length
                    );
                });
            }

            if (event.key === "ArrowRight") {
                setLightboxIndex((index) => {
                    if (index === null) return null;

                    return (
                        (index + 1) %
                        images.length
                    );
                });
            }
        };

        window.addEventListener(
            "keydown",
            onKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                onKeyDown
            );
        };
    }, [lightboxIndex, images.length]);

    /*
     * ============================================================
     * TOUCH / SWIPE
     * ============================================================
     */

    const handlePointerDown = (event) => {
        touchStartX.current = event.clientX;
    };

    const handlePointerUp = (event) => {
        if (touchStartX.current === null) return;

        const distance =
            event.clientX - touchStartX.current;

        touchStartX.current = null;

        if (Math.abs(distance) < 45) return;

        if (distance < 0) {
            next();
        } else {
            previous();
        }
    };

    /*
     * ============================================================
     * LIGHTBOX
     * ============================================================
     */

    const openLightbox = (index) => {
        setActiveIndex(index);
        setLightboxIndex(index);
    };

    const showLightboxPrevious = () => {
        setLightboxIndex((index) => {
            if (index === null) return null;

            return (
                (index - 1 + images.length) %
                images.length
            );
        });
    };

    const showLightboxNext = () => {
        setLightboxIndex((index) => {
            if (index === null) return null;

            return (
                (index + 1) %
                images.length
            );
        });
    };

    const activeLightbox =
        lightboxIndex === null
            ? null
            : images[lightboxIndex];

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (
        <section
            id="gallery"
            className="section-pad gallery-section"
        >
            <div className="gallery-orb gallery-orb-one" />
            <div className="gallery-orb gallery-orb-two" />

            <div className="container max-w-content">

                {/* HEADER */}
                <div
                    className="section-heading gallery-heading"
                    data-aos="fade-up"
                >
                    <p className="section-kicker">
                        {t.kicker}
                    </p>

                    <h2>{t.title}</h2>

                    <p>{t.description}</p>
                </div>

                {/* CAROUSEL */}
                <div
                    className="gallery-carousel"
                    onMouseEnter={() =>
                        setIsPaused(true)
                    }
                    onMouseLeave={() =>
                        setIsPaused(false)
                    }
                    onPointerDown={
                        handlePointerDown
                    }
                    onPointerUp={
                        handlePointerUp
                    }
                    onPointerCancel={() => {
                        touchStartX.current = null;
                    }}
                >

                    {/* PREVIOUS */}
                    <button
                        type="button"
                        className="gallery-nav gallery-nav-prev"
                        onClick={previous}
                        aria-label={t.prev}
                    >
                        <ChevronLeft
                            size={26}
                            strokeWidth={2.5}
                        />
                    </button>

                    {/* STAGE */}
                    <div className="gallery-stage">

                        {images.map((item, index) => {
                            const offset =
                                getOffset(index);

                            const isActive =
                                offset === 0;

                            const isVisible =
                                isCardVisible(offset);

                            /*
                             * Card nằm ngoài vùng hiển thị
                             * sẽ không được render ra giao diện.
                             *
                             * Điều này đặc biệt quan trọng
                             * khi gallery có nhiều ảnh.
                             */

                            if (!isVisible) {
                                return null;
                            }

                            return (
                                <button
                                    key={`${item.src}-${index}`}
                                    type="button"
                                    className={[
                                        "gallery-card",
                                        "gallery-card-3d",
                                        `gallery-offset-${offset}`,
                                        isActive
                                            ? "is-active"
                                            : "",
                                        "is-visible",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    onClick={() => {
                                        if (isActive) {
                                            openLightbox(
                                                index
                                            );
                                        } else {
                                            setActiveIndex(
                                                index
                                            );
                                        }
                                    }}
                                    aria-label={
                                        item.title
                                    }
                                    tabIndex={0}
                                >
                                    <span className="gallery-card-image">
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            loading={
                                                isActive
                                                    ? "eager"
                                                    : "lazy"
                                            }
                                            draggable="false"
                                        />
                                    </span>

                                    <span className="gallery-card-caption">
                                        <span>
                                            {item.title}
                                        </span>

                                        <small>
                                            {String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </small>
                                    </span>
                                </button>
                            );
                        })}

                    </div>

                    {/* NEXT */}
                    <button
                        type="button"
                        className="gallery-nav gallery-nav-next"
                        onClick={next}
                        aria-label={t.next}
                    >
                        <ChevronRight
                            size={26}
                            strokeWidth={2.5}
                        />
                    </button>
                </div>

                {/* CONTROLS */}
                <div className="gallery-controls">

                    <div
                        className="gallery-dots"
                        role="tablist"
                        aria-label={t.kicker}
                    >
                        {images.map(
                            (item, index) => (
                                <button
                                    key={`dot-${item.src}-${index}`}
                                    type="button"
                                    className={[
                                        "gallery-dot",
                                        index ===
                                        activeIndex
                                            ? "is-active"
                                            : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    onClick={() =>
                                        setActiveIndex(
                                            index
                                        )}
                                    aria-label={`${t.counter} ${
                                        index + 1
                                    }`}
                                    aria-selected={
                                        index ===
                                        activeIndex
                                    }
                                    role="tab"
                                />
                            )
                        )}
                    </div>

                    <span className="gallery-counter">
                        {String(
                            activeIndex + 1
                        ).padStart(2, "0")}{" "}
                        /{" "}
                        {String(
                            images.length
                        ).padStart(2, "0")}
                    </span>

                </div>
            </div>

            {/* ====================================================
                LIGHTBOX
            ==================================================== */}

            {activeLightbox && (
                <div
                    className="lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={
                        activeLightbox.title
                    }
                    onClick={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            setLightboxIndex(null);
                        }
                    }}
                >

                    {/* CLOSE */}
                    <button
                        type="button"
                        className="icon-btn lightbox-close"
                        onClick={() =>
                            setLightboxIndex(null)
                        }
                        aria-label={t.close}
                    >
                        <X size={22} />
                    </button>

                    {/* PREVIOUS */}
                    <button
                        type="button"
                        className="icon-btn lightbox-prev"
                        onClick={
                            showLightboxPrevious
                        }
                        aria-label={t.prev}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* CONTENT */}
                    <div className="lightbox-content">
                        <img
                            src={activeLightbox.src}
                            alt={
                                activeLightbox.alt
                            }
                        />

                        <p>
                            {
                                activeLightbox.title
                            }
                        </p>
                    </div>

                    {/* NEXT */}
                    <button
                        type="button"
                        className="icon-btn lightbox-next"
                        onClick={
                            showLightboxNext
                        }
                        aria-label={t.next}
                    >
                        <ChevronRight size={24} />
                    </button>

                </div>
            )}
        </section>
    );
}