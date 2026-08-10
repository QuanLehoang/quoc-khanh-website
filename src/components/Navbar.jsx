import { useEffect, useState } from "react";
import {
    Languages,
    Menu,
    Moon,
    Music,
    Search,
    Sparkles,
    Sun,
    X,
} from "lucide-react";

const ids = [
    "home",
    "history",
    "events",
    "notice",
    "promotion",
    "gallery",
    "contact",
];

export default function Navbar({
    t,
    lang,
    setLang,
    dark,
    setDark,
    music,
    setMusic,
    fireworks,
    setFireworks,
}) {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 18);

        onScroll();

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        return () =>
            window.removeEventListener(
                "scroll",
                onScroll
            );
    }, []);

    const text = {
        vi: {
            nav: "Điều hướng chính",
            brand: "Quốc Khánh Việt Nam",
            search: "Tìm kiếm",
            searchLabel: "Tìm kiếm nội dung",
            searchPlaceholder: "Tìm...",
            music: "Bật / tắt nhạc nền",
            fireworks: "Bật / tắt pháo hoa",
            theme: "Đổi giao diện",
            menu: "Mở menu",
        },

        en: {
            nav: "Main Navigation",
            brand: "Vietnam National Day",
            search: "Search",
            searchLabel: "Search content",
            searchPlaceholder: "Search...",
            music: "Toggle background music",
            fireworks: "Toggle fireworks",
            theme: "Toggle theme",
            menu: "Open menu",
        },
    };

    const ui = text[lang] || text.vi;

    return (
        <header
            className={`site-nav ${
                scrolled
                    ? "site-nav--scrolled"
                    : ""
            }`}
        >
            <nav
                className="container max-w-content"
                aria-label={ui.nav}
            >
                <a
                    className="brand"
                    href="#home"
                    aria-label={ui.brand}
                >
                    <span className="brand-mark">
                        ★
                    </span>

                    <span>
                        🇻🇳{" "}
                        {lang === "vi"
                            ? "Quốc Khánh Việt Nam"
                            : "Vietnam National Day"}
                    </span>
                </a>

                <div
                    className={`nav-links ${
                        open
                            ? "nav-links--open"
                            : ""
                    }`}
                >
                    {t.nav.map(
                        (item, index) => (
                            <a
                                key={item}
                                href={`#${ids[index]}`}
                                onClick={() =>
                                    setOpen(false)
                                }
                            >
                                {item}
                            </a>
                        )
                    )}
                </div>

                <div
                    className="nav-actions"
                    aria-label={ui.nav}
                >
                    <form
                        className={`site-search ${
                            searchOpen
                                ? "site-search--open"
                                : ""
                        }`}
                        role="search"
                        onSubmit={(e) =>
                            e.preventDefault()
                        }
                    >
                        <label
                            className="sr-only"
                            htmlFor="site-search"
                        >
                            {ui.searchLabel}
                        </label>

                        <input
                            id="site-search"
                            value={query}
                            onChange={(e) =>
                                setQuery(
                                    e.target.value
                                )
                            }
                            placeholder={
                                ui.searchPlaceholder
                            }
                        />

                        {query && (
                            <span>
                                {query.length}
                            </span>
                        )}
                    </form>

                    <button
                        className="icon-btn d-none d-md-inline-flex"
                        type="button"
                        aria-label={ui.search}
                        aria-expanded={searchOpen}
                        onClick={() =>
                            setSearchOpen(
                                !searchOpen
                            )
                        }
                    >
                        <Search size={18} />
                    </button>

                    <button
                        className="icon-btn"
                        type="button"
                        aria-label={ui.music}
                        aria-pressed={music}
                        onClick={() =>
                            setMusic(!music)
                        }
                    >
                        <Music size={18} />
                    </button>

                    <button
                        className="icon-btn"
                        type="button"
                        aria-label={ui.fireworks}
                        aria-pressed={fireworks}
                        onClick={() =>
                            setFireworks(
                                !fireworks
                            )
                        }
                    >
                        <Sparkles size={18} />
                    </button>

                    <button
                        className="icon-btn"
                        type="button"
                        aria-label={ui.theme}
                        onClick={() =>
                            setDark(!dark)
                        }
                    >
                        {dark ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>

                    <button
                        className="lang-btn"
                        type="button"
                        onClick={() =>
                            setLang(
                                lang === "vi"
                                    ? "en"
                                    : "vi"
                            )
                        }
                    >
                        <Languages size={16} />
                        {lang.toUpperCase()}
                    </button>

                    <button
                        className="icon-btn nav-toggle"
                        type="button"
                        aria-label={ui.menu}
                        aria-expanded={open}
                        onClick={() =>
                            setOpen(!open)
                        }
                    >
                        {open ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}