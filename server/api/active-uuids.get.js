// GET /api/active-uuids
// Trả về map { [uid]: uuid } lấy thời gian thực từ MongoDB checkin_accounts

import { getUuidMap } from '../utils/mongo.js'

export default defineEventHandler(async () => {
  try {
    const map = await getUuidMap()
    return { ok: true, uids: Object.keys(map), map }
  } catch (err) {
    return { ok: false, error: err.message, map: {} }
  }
})