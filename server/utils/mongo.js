import { MongoClient } from 'mongodb'
import { UUID_BY_UID } from '../../config/members.js'

let client = null
let db = null

const DEFAULT_URI =
  'mongodb+srv://luongtienluat1997_db_user:SEyYwjXst1wGpYdE@cluster0.vzva05q.mongodb.net/darkwar'

export async function getDb() {
  if (db) return db
  const uri = process.env.MONGODB_URI || DEFAULT_URI
  client = new MongoClient(uri, {
    maxPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  })
  try {
    await client.connect()
    db = client.db('darkwar')
    return db
  } catch (err) {
    client = null
    db = null
    console.error('[mongo-darkwar] connect error:', err.message)
    return null
  }
}

let uuidCache = null
let uuidCacheExpires = 0

/**
 * Lấy map toàn bộ { [uid]: uuid } từ collection checkin_accounts
 */
export async function getUuidMap() {
  const now = Date.now()
  if (uuidCache && now < uuidCacheExpires) {
    return uuidCache
  }

  const map = { ...UUID_BY_UID }

  try {
    const database = await getDb()
    if (database) {
      const docs = await database
        .collection('checkin_accounts')
        .find(
          { uuid: { $exists: true, $nin: [null, ''] } },
          { projection: { uid: 1, uuid: 1, _id: 0 } }
        )
        .toArray()

      for (const d of docs) {
        if (d.uid && d.uuid) {
          map[String(d.uid)] = String(d.uuid).trim()
        }
      }
    }
  } catch (err) {
    console.warn('[mongo-darkwar] getUuidMap warning, fallback to file cứng:', err.message)
  }

  uuidCache = map
  uuidCacheExpires = now + 60 * 1000 // cache 60s
  return map
}

/**
 * Lấy uuid theo uid đơn lẻ
 */
export async function getUuidForUid(uid) {
  const key = String(uid)
  const map = await getUuidMap()
  return map[key] || null
}