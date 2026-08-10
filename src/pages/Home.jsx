import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import Statistics from "../components/Statistics";
import HolidayNotice from "../components/HolidayNotice";
import Gallery from "../components/Gallery";
import VideoSection from "../components/VideoSection";
import Quote from "../components/Quote";
import Contact from "../components/Contact";
import Wishes from "../components/Wishes";
import Members from "../components/Members";
import Footer from "../components/Footer";
import SocialShare from "../components/SocialShare";

export default function Home(props) {
    const { t, lang } = props;

    return (
        <>
            <Navbar {...props} />

            <main id="main-content">

                <Hero {...props} />

                <Timeline lang={lang} />

                <Statistics lang={lang} />

                <HolidayNotice
                    t={t}
                    lang={lang}
                />

                <Gallery
                    lang={lang}
                />

                <VideoSection
                    t={t}
                    lang={lang}
                />

                <Quote
                    text={t.quote}
                />

                <SocialShare
                    lang={lang}
                />

                <Contact
                    t={t}
                    lang={lang}
                />

                {/* =========================
                    LỜI CHÚC
                ========================= */}
                <Wishes
    t={t}
    lang={lang}
/>

<Members
    lang={lang}
/>

            </main>

            <Footer
                t={t}
                lang={lang}
            />
        </>
    );
}