import { useCallback, useEffect, useState } from "react";

const GOOGLE_SHEETS_URL =
    import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;


export default function Wishes({ lang = "vi" }) {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const isVietnamese = lang !== "en";


    const loadWishes = useCallback(async () => {
        if (!GOOGLE_SHEETS_URL) {
            setError(
                "Chưa cấu hình VITE_GOOGLE_SHEETS_WEB_APP_URL."
            );
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const url =
                `${GOOGLE_SHEETS_URL}?t=${Date.now()}`;

            const response = await fetch(url, {
                method: "GET",
                cache: "no-store",
                redirect: "follow",
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const result = await response.json();

            console.log(
                "[Wishes] Google Sheets:",
                result
            );

            if (!result.success) {
                throw new Error(
                    result.error ||
                    "Không thể tải lời chúc."
                );
            }

            setWishes(
                Array.isArray(result.wishes)
                    ? result.wishes
                    : []
            );

        } catch (err) {
            console.error(
                "[Wishes] Load error:",
                err
            );

            setError(
                isVietnamese
                    ? "Không thể tải lời chúc."
                    : "Unable to load wishes."
            );

        } finally {
            setLoading(false);
        }
    }, [isVietnamese]);


    /*
     * Load lần đầu
     */

    useEffect(() => {
        loadWishes();
    }, [loadWishes]);


    /*
     * Khi Contact gửi lời chúc thành công,
     * Contact có thể phát event:
     *
     * window.dispatchEvent(
     *   new Event("wish:submitted")
     * );
     */

    useEffect(() => {
        const handleWishSubmitted = () => {
            loadWishes();
        };

        window.addEventListener(
            "wish:submitted",
            handleWishSubmitted
        );

        return () => {
            window.removeEventListener(
                "wish:submitted",
                handleWishSubmitted
            );
        };
    }, [loadWishes]);


    return (
        <section
            id="wishes"
            style={styles.section}
        >
            <div style={styles.container}>

                {/* HEADER */}

                <div style={styles.header}>

                    <div style={styles.kicker}>
                        <span style={styles.kickerIcon}>
                            ♥
                        </span>

                        <span>
                            {isVietnamese
                                ? "LỜI CHÚC TỪ MỌI MIỀN"
                                : "MESSAGES FROM EVERYWHERE"}
                        </span>
                    </div>


                    <h2 style={styles.title}>
                        {isVietnamese
                            ? "Những lời chúc gửi đến Việt Nam"
                            : "Messages for Vietnam"}
                    </h2>


                    <p style={styles.subtitle}>
                        {isVietnamese
                            ? "Mỗi lời chúc là một tình cảm nhỏ dành cho Việt Nam."
                            : "Every message carries a little love for Vietnam."}
                    </p>

                </div>


                {/* LOADING */}

                {loading && (
                    <div style={styles.centerBox}>
                        <div style={styles.spinner} />

                        <p>
                            {isVietnamese
                                ? "Đang tải lời chúc..."
                                : "Loading wishes..."}
                        </p>
                    </div>
                )}


                {/* ERROR */}

                {!loading && error && (
                    <div style={styles.errorBox}>

                        <div style={styles.errorTitle}>
                            Không thể tải lời chúc
                        </div>

                        <div style={styles.errorText}>
                            {error}
                        </div>

                        <button
                            type="button"
                            onClick={loadWishes}
                            style={styles.retryButton}
                        >
                            {isVietnamese
                                ? "Thử lại"
                                : "Try again"}
                        </button>

                    </div>
                )}


                {/* EMPTY */}

                {!loading &&
                    !error &&
                    wishes.length === 0 && (
                        <div style={styles.centerBox}>

                            <div style={styles.emptyIcon}>
                                ♥
                            </div>

                            <h3>
                                {isVietnamese
                                    ? "Chưa có lời chúc nào"
                                    : "No wishes yet"}
                            </h3>

                            <p style={styles.muted}>
                                {isVietnamese
                                    ? "Hãy là người đầu tiên gửi lời chúc đến Việt Nam!"
                                    : "Be the first to send a message to Vietnam!"}
                            </p>

                        </div>
                    )}


                {/* WISHES */}

                {!loading &&
                    !error &&
                    wishes.length > 0 && (

                        <div style={styles.grid}>

                            {wishes.map((wish, index) => (
                                <WishCard
                                    key={
                                        wish.id ??
                                        `${wish.createdAt}-${index}`
                                    }
                                    wish={wish}
                                    lang={lang}
                                />
                            ))}

                        </div>
                    )}

            </div>
        </section>
    );
}



/*
 * =====================================================
 * WISH CARD
 * =====================================================
 */

function WishCard({ wish, lang }) {

    const isVietnamese = lang !== "en";

    const name =
        String(
            wish?.name || ""
        ).trim() ||
        (
            isVietnamese
                ? "Một người yêu Việt Nam"
                : "A friend of Vietnam"
        );


    const message =
        String(
            wish?.message || ""
        ).trim() ||
        (
            isVietnamese
                ? "Một lời chúc dành cho Việt Nam."
                : "A message for Vietnam."
        );


    const initial =
        name.charAt(0).toUpperCase();


    const date =
        formatDate(
            wish?.createdAt,
            lang
        );


    return (
        <article style={styles.card}>

            <div style={styles.cardTop}>

                <div style={styles.avatar}>
                    {initial}
                </div>


                <div style={styles.author}>

                    <strong style={styles.name}>
                        {name}
                    </strong>

                    <span style={styles.country}>
                        🇻🇳 {isVietnamese
                            ? "Việt Nam"
                            : "Vietnam"}
                    </span>

                </div>

            </div>


            <div style={styles.message}>
                <span style={styles.quote}>
                    “
                </span>

                <p>
                    {message}
                </p>
            </div>


            <div style={styles.footer}>

                <span>
                    {date}
                </span>

                <span>
                    🇻🇳
                </span>

            </div>

        </article>
    );
}



/*
 * =====================================================
 * DATE
 * =====================================================
 */

function formatDate(value, lang) {

    if (!value) {
        return lang === "en"
            ? "Just now"
            : "Vừa xong";
    }


    const date = new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return lang === "en"
            ? "Just now"
            : "Vừa xong";
    }


    try {

        return new Intl.DateTimeFormat(
            lang === "en"
                ? "en-US"
                : "vi-VN",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        ).format(date);

    } catch {

        return lang === "en"
            ? "Just now"
            : "Vừa xong";
    }
}



/*
 * =====================================================
 * STYLES
 * =====================================================
 */

const styles = {

    section: {
        position: "relative",
        width: "100%",
        padding: "100px 24px",
        background:
            "linear-gradient(180deg, #11100f 0%, #17120d 100%)",
        color: "#fff",
        overflow: "hidden",
    },


    container: {
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
    },


    header: {
        textAlign: "center",
        marginBottom: "50px",
    },


    kicker: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        color: "#ffd21c",
        fontSize: "12px",
        fontWeight: 800,
        letterSpacing: "2px",
        marginBottom: "14px",
    },


    kickerIcon: {
        width: "28px",
        height: "28px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "rgba(255,210,28,.12)",
        border: "1px solid rgba(255,210,28,.4)",
        color: "#ffcf00",
    },


    title: {
        margin: 0,
        fontSize: "clamp(32px, 5vw, 58px)",
        lineHeight: 1.05,
        fontWeight: 900,
        letterSpacing: "-2px",
    },


    subtitle: {
        margin:
            "18px auto 0",
        maxWidth: "650px",
        color: "rgba(255,255,255,.62)",
        fontSize: "16px",
        lineHeight: 1.7,
    },


    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
    },


    card: {
        position: "relative",
        padding: "24px",
        borderRadius: "20px",
        background:
            "linear-gradient(145deg, rgba(38,38,38,.96), rgba(25,24,23,.96))",
        border:
            "1px solid rgba(255,210,28,.22)",
        boxShadow:
            "0 20px 60px rgba(0,0,0,.25)",
        transition:
            "transform .25s ease, border-color .25s ease",
    },


    cardTop: {
        display: "flex",
        alignItems: "center",
        gap: "13px",
        marginBottom: "22px",
    },


    avatar: {
        width: "48px",
        height: "48px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background:
            "linear-gradient(135deg, #ffdf32, #ffb800)",
        color: "#16130b",
        fontWeight: 900,
        fontSize: "19px",
    },


    author: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        minWidth: 0,
    },


    name: {
        fontSize: "15px",
        color: "#fff",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },


    country: {
        fontSize: "12px",
        color: "rgba(255,255,255,.5)",
    },


    message: {
        position: "relative",
        minHeight: "90px",
        padding:
            "8px 4px 8px 24px",
        color: "rgba(255,255,255,.84)",
        lineHeight: 1.7,
        fontSize: "15px",
    },


    quote: {
        position: "absolute",
        left: 0,
        top: "-4px",
        fontSize: "38px",
        lineHeight: 1,
        color: "#ffd21c",
        opacity: .8,
    },


    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "18px",
        marginTop: "10px",
        borderTop:
            "1px solid rgba(255,255,255,.08)",
        color: "rgba(255,255,255,.4)",
        fontSize: "12px",
    },


    centerBox: {
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "rgba(255,255,255,.6)",
    },


    spinner: {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border:
            "3px solid rgba(255,255,255,.12)",
        borderTopColor: "#ffd21c",
        animation:
            "wishes-spin 1s linear infinite",
        marginBottom: "15px",
    },


    emptyIcon: {
        width: "64px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background:
            "rgba(255,210,28,.1)",
        border:
            "1px solid rgba(255,210,28,.3)",
        color: "#ffd21c",
        fontSize: "26px",
        marginBottom: "18px",
    },


    muted: {
        color: "rgba(255,255,255,.45)",
    },


    errorBox: {
        maxWidth: "650px",
        margin: "0 auto",
        padding: "24px",
        textAlign: "center",
        borderRadius: "16px",
        background:
            "rgba(220,40,40,.08)",
        border:
            "1px solid rgba(220,70,70,.25)",
    },


    errorTitle: {
        fontWeight: 800,
        marginBottom: "8px",
    },


    errorText: {
        color: "rgba(255,255,255,.55)",
        fontSize: "14px",
        marginBottom: "18px",
    },


    retryButton: {
        border: "none",
        borderRadius: "999px",
        padding: "11px 22px",
        background: "#ffd21c",
        color: "#17130a",
        fontWeight: 800,
        cursor: "pointer",
    },
};


/*
 * CSS animation.
 * Chèn một lần vào document.
 */

if (
    typeof document !== "undefined" &&
    !document.getElementById("wishes-animation-style")
) {

    const style =
        document.createElement("style");

    style.id =
        "wishes-animation-style";

    style.textContent = `
        @keyframes wishes-spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }

        #wishes article:hover {
            transform: translateY(-5px);
            border-color: rgba(255,210,28,.5);
        }

        @media (max-width: 600px) {
            #wishes {
                padding-left: 16px !important;
                padding-right: 16px !important;
            }
        }
    `;

    document.head.appendChild(style);
}