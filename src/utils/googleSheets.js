const GOOGLE_SHEETS_URL =
    import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;


/*
|--------------------------------------------------------------------------
| KIỂM TRA CẤU HÌNH
|--------------------------------------------------------------------------
*/

export const isSheetsConfigured =
    Boolean(GOOGLE_SHEETS_URL);


/*
|--------------------------------------------------------------------------
| LẤY IP PUBLIC
|--------------------------------------------------------------------------
*/

async function getPublicIP() {
    try {
        const response = await fetch(
            "https://api64.ipify.org?format=json", {
                method: "GET",
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return "Unknown";
        }

        const data = await response.json();

        return data.ip || "Unknown";

    } catch (error) {
        console.warn(
            "[Google Sheets] Không lấy được IP:",
            error
        );

        return "Unknown";
    }
}


/*
|--------------------------------------------------------------------------
| GỬI LỜI CHÚC
|--------------------------------------------------------------------------
*/

export async function sendWishToGoogleSheets({
    name,
    email,
    message,
    lang = "vi",
}) {
    if (!GOOGLE_SHEETS_URL) {
        throw new Error(
            "Chưa cấu hình VITE_GOOGLE_SHEETS_WEB_APP_URL trong file .env"
        );
    }


    /*
     * Kiểm tra dữ liệu
     */

    const cleanName =
        String(name || "").trim();

    const cleanEmail =
        String(email || "").trim();

    const cleanMessage =
        String(message || "").trim();

    const cleanLang =
        String(lang || "vi").trim();


    if (!cleanName) {
        throw new Error("Vui lòng nhập họ và tên.");
    }

    if (!cleanEmail) {
        throw new Error("Vui lòng nhập email.");
    }

    if (!cleanMessage) {
        throw new Error("Vui lòng nhập lời chúc.");
    }


    /*
     * Lấy IP public
     */

    const ip =
        await getPublicIP();


    /*
     * Dữ liệu gửi sang Google Apps Script
     */

    const payload = {
        name: cleanName,

        email: cleanEmail,

        message: cleanMessage,

        lang: cleanLang,

        ip: ip,

        page: typeof window !== "undefined" ?
            window.location.href : "",

        userAgent: typeof navigator !== "undefined" ?
            navigator.userAgent : "",
    };


    console.log(
        "[Google Sheets] Đang gửi:",
        payload
    );


    /*
     * POST tới Apps Script
     *
     * Dùng text/plain để tránh CORS preflight
     */

    let response;

    try {
        response = await fetch(
            GOOGLE_SHEETS_URL, {
                method: "POST",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },

                body: JSON.stringify(payload),

                redirect: "follow",
            }
        );

    } catch (error) {

        console.error(
            "[Google Sheets] Fetch error:",
            error
        );

        throw new Error(
            "Không thể kết nối tới Google Sheets."
        );
    }


    /*
     * Kiểm tra HTTP
     */

    if (!response.ok) {
        throw new Error(
            "Google Apps Script trả về HTTP " +
            response.status
        );
    }


    /*
     * Đọc JSON
     */

    let result;

    try {

        result =
            await response.json();

    } catch (error) {

        console.error(
            "[Google Sheets] JSON error:",
            error
        );

        throw new Error(
            "Google Apps Script không trả về dữ liệu JSON hợp lệ."
        );
    }


    console.log(
        "[Google Sheets] Response:",
        result
    );


    /*
     * Kiểm tra kết quả
     */

    if (!result ||
        result.success !== true
    ) {

        throw new Error(
            result &&
            result.error ?
            result.error :
            "Google Sheets không lưu được lời chúc."
        );
    }


    return result;
}


/*
|--------------------------------------------------------------------------
| LẤY DANH SÁCH LỜI CHÚC
|--------------------------------------------------------------------------
*/

export async function getWishes() {

    if (!GOOGLE_SHEETS_URL) {
        throw new Error(
            "Chưa cấu hình VITE_GOOGLE_SHEETS_WEB_APP_URL trong file .env"
        );
    }


    const separator =
        GOOGLE_SHEETS_URL.includes("?") ?
        "&" :
        "?";


    const url =
        GOOGLE_SHEETS_URL +
        separator +
        "action=getWishes" +
        "&t=" +
        Date.now();


    console.log(
        "[Google Sheets] Đang tải lời chúc..."
    );


    let response;

    try {

        response = await fetch(
            url, {
                method: "GET",
                cache: "no-store",
                redirect: "follow",
            }
        );

    } catch (error) {

        console.error(
            "[Google Sheets] GET error:",
            error
        );

        throw new Error(
            "Không thể kết nối tới Google Sheets."
        );
    }


    if (!response.ok) {
        throw new Error(
            "Không thể tải lời chúc. HTTP " +
            response.status
        );
    }


    let result;

    try {

        result =
            await response.json();

    } catch (error) {

        console.error(
            "[Google Sheets] GET JSON error:",
            error
        );

        throw new Error(
            "Google Apps Script trả về dữ liệu không hợp lệ."
        );
    }


    console.log(
        "[Google Sheets] Wishes:",
        result
    );


    if (!result ||
        result.success !== true
    ) {

        throw new Error(
            result &&
            result.error ?
            result.error :
            "Không thể tải danh sách lời chúc."
        );
    }


    if (!Array.isArray(result.wishes)) {
        return [];
    }


    return result.wishes;
}