import { useEffect, useState } from "react";

import {
    Facebook,
    Github,
    Mail,
    MapPin,
    Phone,
    Send,
    Youtube,
    Sparkles,
    Heart,
    Star,
    CheckCircle2,
} from "lucide-react";

import {
    isSheetsConfigured,
    sendWishToGoogleSheets,
} from "../utils/googleSheets";


export default function Contact({ t, lang = "vi" }) {

    const [status, setStatus] = useState("idle");

    const [mousePosition, setMousePosition] = useState({
        x: 50,
        y: 50,
    });

    const [messageLength, setMessageLength] = useState(0);


    /*
     * =====================================================
     * TEXT
     * =====================================================
     */

    const text = {

        vi: {
            kicker: "LIÊN HỆ",

            title1: "Kết nối cùng",
            title2: "tinh thần",
            title3: "Việt Nam",

            name: "Họ và tên",
            namePlaceholder: "Nhập họ và tên...",

            email: "Email",
            emailPlaceholder: "ten@gmail.com",

            message: "Thông điệp",

            defaultMessage:
                "Chúc mừng Quốc Khánh Việt Nam 2/9!",

            send: "Gửi lời chúc",
            sending: "Đang gửi...",

            success:
                "Lời chúc của bạn đã được gửi thành công!",

            error:
                "Không thể gửi lời chúc. Vui lòng thử lại.",

            notConfigured:
                "Hệ thống gửi lời chúc chưa được cấu hình.",

            online:
                "Kết nối để lan tỏa tinh thần Việt Nam",

            location:
                "Ba Đình, Hà Nội, Việt Nam",

            emailAddress:
                "hello@quockhanhvietnam.vn",

            phone:
                "+84 24 0902 1945",

            map:
                "Bản đồ khu vực Ba Đình, Hà Nội",
        },

        en: {
            kicker: "CONTACT",

            title1: "Connect with",
            title2: "the spirit of",
            title3: "Vietnam",

            name: "Full Name",
            namePlaceholder: "Enter your name...",

            email: "Email",
            emailPlaceholder: "name@gmail.com",

            message: "Message",

            defaultMessage:
                "Happy Vietnam National Day!",

            send: "Send Message",
            sending: "Sending...",

            success:
                "Your message has been sent successfully!",

            error:
                "Unable to send your message. Please try again.",

            notConfigured:
                "The message system has not been configured.",

            online:
                "Connect and spread the spirit of Vietnam",

            location:
                "Ba Dinh, Hanoi, Vietnam",

            emailAddress:
                "hello@quockhanhvietnam.vn",

            phone:
                "+84 24 0902 1945",

            map:
                "Map of Ba Dinh District, Hanoi",
        },

    };

    const copy =
        text[lang] || text.vi;



    /*
     * =====================================================
     * MOUSE GLOW
     * =====================================================
     */

    useEffect(() => {

        const handleMouseMove = (event) => {

            const section =
                document.querySelector(
                    ".contact-section"
                );

            if (!section) return;

            const rect =
                section.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) /
                    rect.width) *
                100;

            const y =
                ((event.clientY - rect.top) /
                    rect.height) *
                100;

            setMousePosition({
                x,
                y,
            });
        };


        window.addEventListener(
            "mousemove",
            handleMouseMove
        );


        return () => {

            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

        };

    }, []);



    /*
     * =====================================================
     * SUBMIT
     * =====================================================
     */

    const handleSubmit =
        async (event) => {

            event.preventDefault();

            if (
                !isSheetsConfigured ||
                status === "sending"
            ) {
                return;
            }


            const form =
                event.currentTarget;

            const formData =
                new FormData(form);


            const name =
                String(
                    formData.get("name") || ""
                ).trim();

            const email =
                String(
                    formData.get("email") || ""
                ).trim();

            const message =
                String(
                    formData.get("message") || ""
                ).trim();


            if (!name || !email || !message) {

                setStatus("error");

                return;

            }


            setStatus("sending");


            try {

                /*
                 * Gửi Google Sheets
                 */

                await sendWishToGoogleSheets({

                    name,

                    email,

                    message,

                    lang,

                });


                /*
                 * Reset form
                 */

                form.reset();

                setMessageLength(0);


                /*
                 * Thành công
                 */

                setStatus("success");


                /*
                 * =================================================
                 * QUAN TRỌNG:
                 *
                 * Báo cho Wishes.jsx biết có lời chúc mới.
                 * Wishes.jsx có thể lắng nghe event này để reload.
                 * =================================================
                 */

                window.dispatchEvent(
                    new CustomEvent(
                        "wish:submitted"
                    )
                );


                /*
                 * Sau vài giây trở lại trạng thái bình thường
                 */

                setTimeout(() => {

                    setStatus("idle");

                }, 5000);


            } catch (error) {

                console.error(
                    "Send wish error:",
                    error
                );

                setStatus("error");

            }

        };



    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (

        <section
            id="contact"
            className="section-pad contact-section contact-premium"
            style={{
                "--mouse-x":
                    `${mousePosition.x}%`,

                "--mouse-y":
                    `${mousePosition.y}%`,
            }}
        >

            {/* =========================================
                BACKGROUND
            ========================================= */}

            <div
                className="contact-bg-glow contact-bg-glow-1"
            />

            <div
                className="contact-bg-glow contact-bg-glow-2"
            />


            <div className="contact-floating-stars">

                {Array.from({
                    length: 22,
                }).map((_, index) => (

                    <span
                        key={index}
                        style={{
                            "--i": index,
                        }}
                    >
                        ✦
                    </span>

                ))}

            </div>



            <div className="container max-w-content">

                <div className="row g-4 align-items-stretch">


                    {/* =================================================
                        LEFT
                    ================================================= */}

                    <div className="col-12 col-lg-5">

                        <div
                            className="contact-panel contact-panel-premium h-100"
                            data-aos="fade-right"
                        >

                            <div className="contact-panel-shine" />


                            {/* KICKER */}

                            <div className="contact-kicker-wrap">

                                <Sparkles size={15} />

                                <p className="section-kicker">
                                    {copy.kicker}
                                </p>

                            </div>


                            {/* TITLE */}

                            <h2 className="contact-title">

                                <span>
                                    {copy.title1}
                                </span>

                                <span>
                                    {copy.title2}
                                </span>

                                <span className="contact-title-gold">
                                    {copy.title3}
                                </span>

                            </h2>


                            {/* DECORATION */}

                            <div className="contact-title-line">

                                <span />

                                <Star size={22} />

                                <span />

                            </div>


                            {/* CONTACT INFO */}

                            <ul className="contact-list contact-list-premium">


                                <li>

                                    <span className="contact-icon">

                                        <MapPin size={18} />

                                    </span>

                                    <span>
                                        {copy.location}
                                    </span>

                                </li>


                                <li>

                                    <span className="contact-icon">

                                        <Mail size={18} />

                                    </span>

                                    <span>
                                        {copy.emailAddress}
                                    </span>

                                </li>


                                <li>

                                    <span className="contact-icon">

                                        <Phone size={18} />

                                    </span>

                                    <span>
                                        {copy.phone}
                                    </span>

                                </li>


                            </ul>



                            {/* SOCIAL */}

                            <div className="social-row contact-social">


                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Facebook"
                                >

                                    <Facebook size={18} />

                                </a>


                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="YouTube"
                                >

                                    <Youtube size={18} />

                                </a>


                                <a
                                    href="https://www.tiktok.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="TikTok"
                                >

                                    <i className="bi bi-tiktok" />

                                </a>


                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub"
                                >

                                    <Github size={18} />

                                </a>

                            </div>



                            {/* MAP */}

                            <div
                                className="map-frame contact-map-premium"
                                role="img"
                                aria-label={copy.map}
                            >

                                <div className="map-overlay">

                                    <span>
                                        📍 Ba Đình
                                    </span>

                                </div>


                                <iframe
                                    title={copy.map}
                                    src="https://www.google.com/maps?q=Ba%20Dinh%20Square%20Hanoi&output=embed"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />

                            </div>

                        </div>

                    </div>



                    {/* =================================================
                        RIGHT
                    ================================================= */}

                    <div className="col-12 col-lg-7">

                        <form
                            className="contact-form contact-form-premium"
                            data-aos="fade-left"
                            onSubmit={handleSubmit}
                        >

                            <div className="form-top-glow" />


                            {/* HEADER */}

                            <div className="form-heading">

                                <div className="form-heart">

                                    <Heart
                                        size={21}
                                        fill="currentColor"
                                    />

                                </div>


                                <div>

                                    <span>
                                        {lang === "vi"
                                            ? "Việt Nam"
                                            : "Vietnam"}
                                    </span>

                                    <h3>
                                        {t?.formTitle ||
                                            (lang === "vi"
                                                ? "Gửi lời chúc đến Việt Nam"
                                                : "Send a message to Vietnam")}
                                    </h3>

                                </div>

                            </div>


                            {/* DECORATION */}

                            <div className="form-decoration">

                                <span />
                                <span />
                                <span />

                            </div>



                            <div className="row g-3">


                                {/* =================================
                                    NAME
                                ================================= */}

                                <div className="col-12 col-md-6">

                                    <div className="premium-field">

                                        <label htmlFor="contact-name">
                                            {copy.name}
                                        </label>


                                        <div className="input-shell">

                                            <input
                                                id="contact-name"
                                                name="name"
                                                type="text"
                                                autoComplete="name"
                                                placeholder={
                                                    copy.namePlaceholder
                                                }
                                                maxLength={80}
                                                required
                                            />

                                        </div>

                                    </div>

                                </div>



                                {/* =================================
                                    EMAIL
                                ================================= */}

                                <div className="col-12 col-md-6">

                                    <div className="premium-field">

                                        <label htmlFor="contact-email">
                                            {copy.email}
                                        </label>


                                        <div className="email-input-wrapper premium-email">

                                            <input
                                                id="contact-email"
                                                name="email"
                                                type="email"
                                                inputMode="email"
                                                autoComplete="email"
                                                placeholder={
                                                    copy.emailPlaceholder
                                                }
                                                maxLength={120}
                                                required
                                            />

                                        </div>

                                    </div>

                                </div>



                                {/* =================================
                                    MESSAGE
                                ================================= */}

                                <div className="col-12">

                                    <div className="premium-field">


                                        <div className="message-label-row">

                                            <label htmlFor="contact-message">
                                                {copy.message}
                                            </label>

                                            <span>
                                                {messageLength}/500
                                            </span>

                                        </div>


                                        <div className="textarea-shell">

                                            <textarea
                                                id="contact-message"
                                                name="message"
                                                rows="6"
                                                maxLength={500}
                                                required
                                                defaultValue={
                                                    copy.defaultMessage
                                                }
                                                onChange={(
                                                    event
                                                ) => {

                                                    setMessageLength(
                                                        event
                                                            .target
                                                            .value
                                                            .length
                                                    );

                                                }}
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>



                            {/* =================================
                                STATUS
                            ================================= */}

                            {!isSheetsConfigured && (

                                <div className="form-status form-status--warning">

                                    <span>
                                        {copy.notConfigured}
                                    </span>

                                </div>

                            )}


                            {status === "success" && (

                                <div
                                    className="form-status form-status--success"
                                    role="status"
                                >

                                    <CheckCircle2
                                        size={17}
                                    />

                                    <span>
                                        {copy.success}
                                    </span>

                                </div>

                            )}


                            {status === "error" && (

                                <div
                                    className="form-status form-status--error"
                                    role="alert"
                                >

                                    <span>
                                        {copy.error}
                                    </span>

                                </div>

                            )}



                            {/* =================================
                                SUBMIT
                            ================================= */}

                            <button
                                className="btn-premium btn-primary-red contact-submit-btn mt-4"
                                type="submit"
                                disabled={
                                    status === "sending" ||
                                    !isSheetsConfigured
                                }
                            >

                                <span className="button-shine" />


                                <Send
                                    size={18}
                                    className={
                                        status === "sending"
                                            ? "send-loading"
                                            : ""
                                    }
                                />


                                <span>

                                    {status === "sending"
                                        ? copy.sending
                                        : copy.send}

                                </span>


                                <span className="button-arrow">
                                    →
                                </span>

                            </button>



                            {/* =================================
                                FOOTER
                            ================================= */}

                            <div className="form-footer-note">

                                <span className="online-dot" />

                                <span>
                                    {copy.online}
                                </span>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </section>

    );
}