// Server API proxy: /api/redeem?uid=...&code=...
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

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { uid, code } = query

    if (!uid || !code) {
        throw createError({ statusCode: 400, statusMessage: 'Missing uid or code parameter' })
    }

    const userAgent = getRandomUA()
    const url = `https://giftcenter.darkwar-survival.com/code.php?uid=${encodeURIComponent(uid)}&code=${encodeURIComponent(code)}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'host': 'giftcenter.darkwar-survival.com',
                'usertoken': uid,
                'sec-ch-ua-platform': '"Windows"',
                'user-agent': userAgent,
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

        const text = await response.text()

        // Thử parse JSON
        try {
            const json = JSON.parse(text)
            return json
        } catch {
            return { code: response.ok ? 0 : -1, message: text, raw: true }
        }
    } catch (err) {
        throw createError({ statusCode: 502, statusMessage: `Proxy fetch failed: ${err.message}` })
    }
})
