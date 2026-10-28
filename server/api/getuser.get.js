// Server API proxy: /api/getuser?uid=...
// Tránh CORS khi browser gọi trực tiếp sang giftcenter.darkwar-survival.com

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15',
]

function getRandomUA() {
    return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
}
async function fetchUuidFromOldId(oldUid) {
    try {
        const res = await fetch(`https://giftcenter.darkwar-survival.com/api/getuser?uid=${oldUid}`);
        const data = await res.json();

        console.log("Toàn bộ dữ liệu trả về:", data);

        // Giả sử trường chứa UUID trong JSON trả về tên là 'uuid' hoặc 'account_uuid'
        // Bạn hãy đổi lại tên thuộc tính `data.uuid` cho khớp với kết quả thực tế của API trả về nhé
        console.log("UUID của bạn là:", data.uuid || data.data?.uuid);
    } catch (error) {
        console.error("Lỗi lấy UUID:", error);
    }
}

export default defineEventHandler(async (event) => {
    // Chạy thử với ID cũ của bạn
    await fetchUuidFromOldId('1056105620000487');
    const query = getQuery(event)
    const uid = query.uid

    if (!uid) {
        throw createError({ statusCode: 400, statusMessage: 'Missing uid parameter' })
    }

    const url = `https://giftcenter.darkwar-survival.com/getcodeuser.php?uid=${encodeURIComponent(uid)}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'host': 'giftcenter.darkwar-survival.com',
                'sec-ch-ua-platform': '"Windows"',
                'user-agent': getRandomUA(),
                'accept': 'application/json, text/plain, */*',
                'sec-ch-ua': '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
                'sec-ch-ua-mobile': '?0',
                'origin': 'https://darkwar-survival.com',
                'sec-fetch-site': 'same-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://darkwar-survival.com/',
                'accept-language': 'en-US,en;q=0.9',
                'priority': 'u=1, i',
            },
        })

        if (!response.ok) {
            throw createError({ statusCode: response.status, statusMessage: `Upstream error: ${response.statusText}` })
        }

        const data = await response.json()
        return data
    } catch (err) {
        if (err.statusCode) throw err
        throw createError({ statusCode: 502, statusMessage: `Proxy fetch failed: ${err.message}` })
    }
})
