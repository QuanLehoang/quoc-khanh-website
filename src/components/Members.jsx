import "../styles/members.css";

const members = [
    {
        name: "Quân Lê",
        role: {
            vi: "Founder & Developer",
            en: "Founder & Developer",
        },
        image: "./images/member1.jpg",
        description: {
            vi: "Người xây dựng và phát triển website Quốc Khánh Việt Nam.",
            en: "The creator and developer behind the Vietnamese National Day website.",
        },
        facebook: "https://www.facebook.com/quan.le.51371/",
        tiktok: "https://www.tiktok.com/@hong.qun5396",
        discord: "https://discord.com/users/1361694396503953508",
    },
    {
        name: "Phan Hữu Đăng",
        role: {
            vi: "Designer",
            en: "Designer",
        },
        image: "./images/member2.jpg",
        description: {
            vi: "Cùng đóng góp ý tưởng và phát triển dự án Quốc Khánh Việt Nam.",
            en: "Contributing ideas and helping develop the Vietnamese National Day project.",
        },
        facebook: "https://www.facebook.com/profile.php?id=61587307526044",
        tiktok: "https://www.tiktok.com/@dang.0812",
        discord: "https://discord.com/users/1445288199642415155",
    },
];

export default function Members({ lang = "vi" }) {
    const isEnglish = lang === "en";

    const text = {
        vi: {
            kicker: "ĐỘI NGŨ PHÁT TRIỂN",
            title: "Những người đứng",
            titleHighlight: " phía sau dự án",
            subtitle:
                "Một dự án được tạo nên từ sự sáng tạo, đam mê và tinh thần Việt Nam.",
            member: "THÀNH VIÊN",
        },

        en: {
            kicker: "DEVELOPMENT TEAM",
            title: "The people behind",
            titleHighlight: " the project",
            subtitle:
                "A project built with creativity, passion and the spirit of Vietnam.",
            member: "MEMBER",
        },
    };

    const currentText = isEnglish ? text.en : text.vi;

    return (
        <section className="members" id="members">

            {/* HEADER */}
            <div className="members-header">

                <div className="members-kicker">
                    <span className="members-kicker-line" />

                    <span>
                        {currentText.kicker}
                    </span>

                    <span className="members-kicker-line" />
                </div>

                <h2>
                    {currentText.title}
                    <span>
                        {currentText.titleHighlight}
                    </span>
                </h2>

                <p>
                    {currentText.subtitle}
                </p>

            </div>


            {/* CARDS */}
            <div className="members-list">

                {members.map((member, index) => (

                    <article
                        className="member"
                        key={member.name}
                    >

                        {/* Background glow */}
                        <div className="member-light" />

                        {/* Shine */}
                        <div className="member-shine" />


                        {/* Number */}
                        <span className="member-index">
                            0{index + 1}
                        </span>


                        {/* Avatar */}
                        <div className="member-image-box">

                            <div className="member-image-ring">

                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="member-image"
                                />

                            </div>

                            <span className="member-status" />

                        </div>


                        {/* Content */}
                        <div className="member-content">

                            <span className="member-small-title">
                                {currentText.member}
                            </span>

                            <h3>
                                {member.name}
                            </h3>

                            <div className="member-role">
                                {isEnglish
                                    ? member.role.en
                                    : member.role.vi}
                            </div>

                            <div className="member-line" />

                            <p>
                                {isEnglish
                                    ? member.description.en
                                    : member.description.vi}
                            </p>


                            <div className="member-actions">

    {/* FACEBOOK */}
    <a
        href={member.facebook}
        target="_blank"
        rel="noreferrer"
        className="member-social"
        aria-label="Facebook"
    >
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1z"
            />
        </svg>
    </a>


    {/* TIKTOK */}
    <a
        href={member.tiktok}
        target="_blank"
        rel="noreferrer"
        className="member-social"
        aria-label="TikTok"
    >
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M16.6 5.8a4.8 4.8 0 0 0 3 1v3.2a8 8 0 0 1-3-.6v6.1a5.5 5.5 0 1 1-4.7-5.4v3.3a2.2 2.2 0 1 0 1.5 2.1V3h3.2z"
            />
        </svg>
    </a>


    {/* DISCORD */}
    <a
        href={member.discord}
        target="_blank"
        rel="noreferrer"
        className="member-social"
        aria-label="Discord"
    >
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                fill="currentColor"
                d="M19.54 5.1A16.9 16.9 0 0 0 15.36 4l-.52 1.06a15.6 15.6 0 0 0-5.68 0L8.64 4a16.9 16.9 0 0 0-4.18 1.1C1.82 8.97 1.1 12.72 1.47 16.42a16.9 16.9 0 0 0 5.13 2.6l1.24-1.68c-.68-.24-1.33-.54-1.94-.89l.47-.36c3.74 1.72 7.78 1.72 11.48 0l.48.36c-.62.35-1.27.65-1.95.89l1.24 1.68a16.9 16.9 0 0 0 5.13-2.6c.43-4.29-.73-8-3.21-11.32zM8.77 14.4c-1.1 0-2-.99-2-2.21s.88-2.21 2-2.21 2 .99 2 2.21-.9 2.21-2 2.21zm6.46 0c-1.1 0-2-.99-2-2.21s.88-2.21 2-2.21 2 .99 2 2.21-.9 2.21-2 2.21z"
            />
        </svg>
    </a>

</div>

                        </div>


                        {/* Arrow */}
                        <div className="member-arrow">
                            ↗
                        </div>

                    </article>

                ))}

            </div>

        </section>
    );
}