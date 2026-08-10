import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import $ from "jquery";

import Home from "./pages/Home";
import LanguageGate from "./components/LanguageGate";
import { copy } from "./utils/content";

export default function App() {

    const [lang, setLang] = useState(
        localStorage.getItem("lang") || "vi"
    );

    // Luôn hiện màn chọn ngôn ngữ khi mở web
    const [entered, setEntered] = useState(false);

    const [dark, setDark] = useState(true);
    const [music, setMusic] = useState(false);
    const [fireworks, setFireworks] = useState(true);
    const [progress, setProgress] = useState(0);

    const t = useMemo(() => copy[lang], [lang]);

    /* =========================
       AOS
    ========================= */

    useEffect(() => {

        AOS.init({
            duration: 900,
            once: true,
            easing: "ease-out-cubic",
            offset: 80,
        });

    }, []);

    /* =========================
       Dark Mode
    ========================= */

    useEffect(() => {

        document.documentElement.classList.toggle(
            "dark",
            dark
        );

    }, [dark]);

    /* =========================
       Smooth Scroll
    ========================= */

    useEffect(() => {

        $('a[href^="#"]').on(
            "click.smooth",
            function (e) {

                const target = $(this.getAttribute("href"));

                if (target.length) {

                    e.preventDefault();

                    $("html, body").animate(
                        {
                            scrollTop:
                                target.offset().top - 70,
                        },
                        500
                    );

                }

            }
        );

        return () => {

            $('a[href^="#"]').off("click.smooth");

        };

    }, []);

    /* =========================
       Scroll Progress
    ========================= */

    useEffect(() => {

        const update = () => {

            const max =
                document.documentElement.scrollHeight -
                window.innerHeight;

            setProgress(
                max > 0
                    ? (window.scrollY / max) * 100
                    : 0
            );

        };

        update();

        window.addEventListener(
            "scroll",
            update,
            {
                passive: true,
            }
        );

        return () =>
            window.removeEventListener(
                "scroll",
                update
            );

    }, []);

    /* =========================
       Music
    ========================= */

    useEffect(() => {

        let context;
        let osc;
        let gain;

        if (music) {

            context = new AudioContext();

            osc = context.createOscillator();
            gain = context.createGain();

            osc.type = "sine";
            osc.frequency.value = 246.94;

            gain.gain.value = 0.02;

            osc.connect(gain);
            gain.connect(context.destination);

            osc.start();

        }

        return () => {

            osc?.stop();
            context?.close();

        };

    }, [music]);

    /* =========================
       Language Gate
    ========================= */

    if (!entered) {

        return (
            <LanguageGate
                onSelect={(language) => {

                    localStorage.setItem(
                        "lang",
                        language
                    );

                    setLang(language);

                    setEntered(true);

                }}
            />
        );

    }

    /* =========================
       Main Website
    ========================= */

    return (

        <div
            className="
                min-h-screen
                bg-flag-cream
                text-flag-dark
                transition-all
                duration-500
                dark:bg-[#111111]
                dark:text-white
            "
        >

            <div
                className="progress-bar"
                style={{
                    width: `${progress}%`,
                }}
            />

            <Home
                t={t}
                lang={lang}
                setLang={setLang}
                dark={dark}
                setDark={setDark}
                music={music}
                setMusic={setMusic}
                fireworks={fireworks}
                setFireworks={setFireworks}
            />

        </div>

    );

}