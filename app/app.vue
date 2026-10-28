<template>
  <div class="page">
    <!-- Background particles -->
    <div class="bg-particles" aria-hidden="true">
      <span v-for="i in 18" :key="i" class="particle" :style="getParticleStyle(i)"></span>
    </div>

    <div class="layout">
      <!-- ════════════════════════════════════════
           SECTION: Alliance Leaders
      ════════════════════════════════════════ -->
      <section class="alliance-section">
        <div class="alliance-header">
          <div class="alliance-title-group">
            <span class="alliance-icon">⚔️</span>
            <h2 class="alliance-title">Alliance Leaders</h2>
            <span class="alliance-count">{{ LEADER_MEMBERS.length }}</span>
          </div>
          <div class="alliance-actions">
            <span v-if="cacheTimestamp" class="cache-badge">
              🕐 {{ cacheRemainingStr }}
            </span>
            <button
              class="btn-icon"
              :class="{ spinning: membersLoading }"
              :disabled="membersLoading"
              title="Renew data"
              @click="fetchAllMembers(true)"
            >↻</button>
          </div>
        </div>

        <!-- Member Grid -->
        <div class="alliance-grid">
          <!-- Loading skeletons -->
          <template v-if="membersLoading && displayMembers.length === 0">
            <div
              v-for="i in LEADER_MEMBERS.length"
              :key="`sk-${i}`"
              class="member-card member-card--skeleton"
            >
              <div class="member-avatar-wrap">
                <div class="member-avatar skeleton-anim"></div>
              </div>
              <div class="skeleton-anim sk-text"></div>
              <div class="skeleton-anim sk-tag"></div>
            </div>
          </template>

          <!-- Actual members -->
          <template v-else>
            <div
              v-for="(cfg, idx) in LEADER_MEMBERS"
              :key="cfg.uid ?? `empty-${idx}`"
              class="member-card"
              :class="{
                'member-card--error': getDisplayMember(cfg.uid)?.error,
                'member-card--empty': !cfg.uid,
              }"
            >
              <!-- Empty slot -->
              <template v-if="!cfg.uid">
                <div class="member-avatar-wrap">
                  <div class="member-avatar member-avatar--empty">
                    <span class="empty-plus">+</span>
                  </div>
                </div>
                <p class="member-name member-name--muted">Chưa có ID</p>
                <div class="member-meta">
                  <span class="member-role">Leader</span>
                </div>
              </template>

              <!-- Loaded member -->
              <template v-else>
                <div class="member-avatar-wrap">
                  <img
                    v-if="getDisplayMember(cfg.uid)?.headimg"
                    :src="getDisplayMember(cfg.uid).headimg"
                    :alt="getDisplayMember(cfg.uid).name"
                    class="member-avatar"
                    loading="lazy"
                    @error="e => e.target.style.display='none'"
                  />
                  <div v-else class="member-avatar member-avatar--fallback">
                    {{ getDisplayMember(cfg.uid)?.name?.[0] ?? '?' }}
                  </div>
                  <div v-if="getDisplayMember(cfg.uid)?.country" class="member-country">
                    {{ getFlagEmoji(getDisplayMember(cfg.uid).country) }}
                  </div>
                </div>

                <p class="member-name">
                  {{ getDisplayMember(cfg.uid)?.name || cfg.uid.slice(-6) }}
                </p>
                <div class="member-meta">
                  <span v-if="getDisplayMember(cfg.uid)?.level" class="member-level">
                    Lv.{{ getDisplayMember(cfg.uid).level }}
                  </span>
                  <span v-if="getDisplayMember(cfg.uid)?.platform" class="member-platform">
                    {{ formatPlatform(getDisplayMember(cfg.uid).platform) }}
                  </span>
                </div>
              </template>
            </div>
          </template>
        </div>
      </section>

      <!-- ════════════════════════════════════════
           SECTION: Gift Code Card
      ════════════════════════════════════════ -->
      <section class="gift-card" :class="{ 'gift-card--busy': isRedeeming }">
        <!-- Logo -->
        <div class="gift-card__header">
          <div class="logo-flag" aria-label="Cờ Việt Nam">
            <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="40" rx="4" fill="#da251d"/>
              <path d="M30 8 L32.35 14.76 L39.51 14.91 L33.80 19.24 L35.88 26.09 L30 22 L24.12 26.09 L26.20 19.24 L20.49 14.91 L27.65 14.76 Z" fill="#ffde00"/>
            </svg>
          </div>
          <h1 class="gift-title">UNTV</h1>
          <p class="gift-subtitle">Gift Code Redemption</p>
        </div>

        <!-- Gift code input -->
        <div class="gift-card__body">
          <div class="field">
            <label class="field__label" for="code-input">
              <span>🎁</span> Gift Code
            </label>
            <input
              id="code-input"
              v-model="giftCode"
              type="text"
              class="field__input field__input--code"
              placeholder="Enter giftcode..."
              :disabled="isRedeeming"
              autocomplete="off"
              @keyup.enter="startRedeem"
            />
          </div>

          <button
            id="submit-btn"
            class="btn-submit"
            :disabled="isRedeeming || !giftCode.trim()"
            @click="startRedeem"
          >
            <span v-if="!isRedeeming" class="btn-submit__inner">
              <span>⚡</span>
              Active Gift Code
            </span>
            <span v-else class="btn-submit__inner">
              <span class="spinner"></span>
              Processing...
            </span>
          </button>

          <!-- Reset button after done -->
          <button
            v-if="!isRedeeming && redeemResults.size > 0"
            class="btn-reset"
            @click="resetRedeem"
          >
            🔄 Enter other code
          </button>
        </div>

      </section>
    </div>

    <footer class="page-footer">UNTV © 2025 · Gift Code System</footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { LEADER_MEMBERS, ACTIVE_UIDS, UUID_BY_UID } from '../config/members.js'

// ═══════════════════════════════════════════════════
//  CONSTANTS
// ═══════════════════════════════════════════════════
const CACHE_KEY = 'dw_alliance_cache'
const CACHE_TTL = 4 * 60 * 60 * 1000 // 4h

// ═══════════════════════════════════════════════════
//  ALLIANCE STATE
// ═══════════════════════════════════════════════════
const membersLoading  = ref(false)
const displayMembers  = ref([])      // mảng { uid, name, headimg, level, ... }
const cacheTimestamp  = ref(null)

/** Map uid → data, dễ lookup O(1) */
const memberMap = computed(() => {
  const m = new Map()
  displayMembers.value.forEach(d => m.set(d.uid, d))
  return m
})

function getDisplayMember(uid) {
  return memberMap.value.get(uid) ?? null
}

const activeUids = computed(() => ACTIVE_UIDS)

/** Chỉ những uid đã có uuid mới được nhập code (còn lại bỏ qua) */
const redeemUids = computed(() => activeUids.value.filter(uid => UUID_BY_UID[uid]))

const cacheRemainingStr = computed(() => {
  if (!cacheTimestamp.value) return ''
  const remaining = (cacheTimestamp.value + CACHE_TTL) - Date.now()
  if (remaining <= 0) return 'hết hạn'
  const h = Math.floor(remaining / 3600000)
  const m = Math.floor((remaining % 3600000) / 60000)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
})

// ═══════════════════════════════════════════════════
//  REDEEM STATE
// ═══════════════════════════════════════════════════
const giftCode      = ref('')
const isRedeeming   = ref(false)
const redeemResults = ref(new Map())        // uid → { ok, msg } (chỉ dùng nội bộ)

// ═══════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════
function getParticleStyle(i) {
  return {
    left: `${(i * 47) % 100}%`,
    top:  `${(i * 37) % 100}%`,
    width:  `${2 + (i % 4)}px`,
    height: `${2 + (i % 4)}px`,
    animationDelay:    `${(i * 0.3) % 5}s`,
    animationDuration: `${8 + (i % 6)}s`,
  }
}

function getFlagEmoji(country) {
  if (!country || country.length !== 2) return ''
  return country.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(127397 + c.charCodeAt(0))
  )
}

function formatPlatform(p) {
  if (!p) return ''
  return p.replace('market_', '').replace('_', ' ')
}

// ═══════════════════════════════════════════════════
//  CACHE
// ═══════════════════════════════════════════════════
function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { ts, data } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return { ts, data }
  } catch { return null }
}

function saveCache(data) {
  const ts = Date.now()
  localStorage.setItem(CACHE_KEY, JSON.stringify({ ts, data }))
  return ts
}

// ═══════════════════════════════════════════════════
//  FETCH ALLIANCE MEMBERS
// ═══════════════════════════════════════════════════
async function fetchMember(uid) {
  const res = await fetch(`/api/getuser?uid=${encodeURIComponent(uid)}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  if (json.code === 0 && json.result) return { uid, ...json.result }
  throw new Error(json.message || 'Unknown error')
}

async function fetchAllMembers(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = loadCache()
    if (cached) {
      displayMembers.value  = cached.data
      cacheTimestamp.value  = cached.ts
      return
    }
  }

  membersLoading.value  = true
  displayMembers.value  = []

  const results = await Promise.allSettled(
    activeUids.value.map(uid => fetchMember(uid))
  )

  displayMembers.value = results.map((r, i) =>
    r.status === 'fulfilled'
      ? r.value
      : { uid: activeUids.value[i], error: r.reason?.message || 'Lỗi kết nối' }
  )

  if (displayMembers.value.some(m => !m.error)) {
    cacheTimestamp.value = saveCache(displayMembers.value)
  }

  membersLoading.value = false
}

// ═══════════════════════════════════════════════════
//  REDEEM GIFT CODE — chạy cho tất cả UID (không hiển thị kết quả)
// ═══════════════════════════════════════════════════
async function redeemForOne(uid, code) {
  try {
    const res  = await fetch(`/api/redeem?uid=${encodeURIComponent(uid)}&code=${encodeURIComponent(code)}`)
    const json = await res.json()
    const ok   = json?.code === 0 || json?.status === 'success'
    const msg  = json?.message || json?.msg || (ok ? 'Thành công' : 'Thất bại')
    redeemResults.value.set(uid, { ok, msg: String(msg) })
  } catch (err) {
    redeemResults.value.set(uid, { ok: false, msg: err.message })
  }
}

async function startRedeem() {
  const code = giftCode.value.trim().toUpperCase()
  if (!code || isRedeeming.value) return

  const targets = redeemUids.value

  isRedeeming.value   = true
  redeemResults.value = new Map()

  const skipped = activeUids.value.length - targets.length
  if (skipped > 0) console.info(`[redeem] bỏ qua ${skipped} thành viên chưa có uuid`)

  // Chạy tuần tự để tránh rate-limit (thêm delay nhỏ giữa mỗi request)
  for (const uid of targets) {
    await redeemForOne(uid, code)
    // Delay 300ms giữa các request
    if (uid !== targets.at(-1)) {
      await new Promise(r => setTimeout(r, 300))
    }
  }

  isRedeeming.value = false
}

function resetRedeem() {
  redeemResults.value = new Map()
  giftCode.value      = ''
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
onMounted(() => fetchAllMembers(false))
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --amber:       #f59e0b;
  --amber-light: #fcd34d;
  --amber-dark:  #d97706;
  --red:         #ef4444;
  --green:       #10b981;
  --bg:          #080c10;
  --bg-card:     rgba(14, 19, 27, 0.93);
  --border:      rgba(245, 158, 11, 0.15);
  --border-h:    rgba(245, 158, 11, 0.45);
  --text:        #f1f5f9;
  --text-muted:  #94a3b8;
  --radius:      16px;
}

html, body {
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
}

/* ══ Page wrapper ══════════════════════════════ */
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px 40px;
  position: relative;
  overflow-x: hidden;
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245,158,11,0.13) 0%, transparent 65%),
    radial-gradient(ellipse 55% 40% at 85% 100%, rgba(239,68,68,0.08) 0%, transparent 60%),
    #080c10;
}

.layout {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ══ Particles ═════════════════════════════════ */
.bg-particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.particle {
  position: absolute; background: var(--amber); border-radius: 50%;
  opacity: 0; animation: floatP linear infinite;
}
@keyframes floatP {
  0%   { opacity: 0;   transform: translateY(0)      scale(0.5); }
  10%  { opacity: 0.4; }
  90%  { opacity: 0.2; }
  100% { opacity: 0;   transform: translateY(-130px) scale(1.2); }
}

/* ══════════════════════════════════════════════
   ALLIANCE SECTION
══════════════════════════════════════════════ */
.alliance-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 40px rgba(0,0,0,0.45);
}

/* Header */
.alliance-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}

.alliance-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.alliance-icon { font-size: 1.1rem; }

.alliance-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--text);
}

.alliance-count {
  font-size: 0.7rem;
  font-weight: 700;
  background: rgba(245,158,11,0.15);
  border: 1px solid rgba(245,158,11,0.3);
  color: var(--amber);
  border-radius: 99px;
  padding: 1px 8px;
}

.alliance-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cache-badge {
  font-size: 0.68rem;
  color: var(--text-muted);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 99px;
  padding: 2px 10px;
}

.btn-icon {
  background: rgba(245,158,11,0.1);
  border: 1px solid rgba(245,158,11,0.25);
  border-radius: 8px;
  color: var(--amber);
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
  line-height: 1;
}
.btn-icon:hover:not(:disabled) { background: rgba(245,158,11,0.22); }
.btn-icon.spinning { animation: spin 0.8s linear infinite; }
.btn-icon:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Alliance Grid ─────────────────────────── */
.alliance-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

/* Tablet: 4 cột */
@media (max-width: 600px) {
  .alliance-grid { grid-template-columns: repeat(4, 1fr); gap: 8px; }
}

/* Mobile nhỏ: 3 cột */
@media (max-width: 380px) {
  .alliance-grid { grid-template-columns: repeat(3, 1fr); gap: 6px; }
}

/* ── Member Card ───────────────────────────── */
.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px 4px 8px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(245,158,11,0.1);
  border-radius: 12px;
  transition: border-color 0.25s, transform 0.2s, box-shadow 0.2s;
  min-width: 0;
}

.member-card:not(.member-card--skeleton):not(.member-card--empty):hover {
  border-color: rgba(245,158,11,0.38);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.35), 0 0 14px rgba(245,158,11,0.07);
}

.member-card--empty {
  border-color: rgba(255,255,255,0.06);
  border-style: dashed;
  opacity: 0.55;
}

.member-card--redeeming {
  border-color: var(--amber) !important;
  box-shadow: 0 0 16px rgba(245,158,11,0.25);
}

.member-card--done-ok {
  border-color: rgba(16,185,129,0.5) !important;
  box-shadow: 0 0 14px rgba(16,185,129,0.15);
}

.member-card--done-fail {
  border-color: rgba(239,68,68,0.4) !important;
}

/* ── Avatar ──────────────────────────────── */
.member-avatar-wrap {
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

@media (max-width: 380px) {
  .member-avatar-wrap { width: 42px; height: 42px; }
}

.member-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(245,158,11,0.35);
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-avatar--fallback {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--amber);
  background: rgba(245,158,11,0.1);
}

.member-avatar--empty {
  border-color: rgba(255,255,255,0.1);
  border-style: dashed;
  background: rgba(255,255,255,0.03);
  color: var(--text-muted);
}

.empty-plus {
  font-size: 1.5rem;
  line-height: 1;
  color: rgba(255,255,255,0.2);
}

.member-country {
  position: absolute;
  bottom: -2px;
  right: -4px;
  font-size: 0.8rem;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.7));
  line-height: 1;
}

/* Spinner overlay on avatar */
.avatar-spinner-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.mini-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(245,158,11,0.3);
  border-top-color: var(--amber);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.result-badge {
  position: absolute;
  top: -4px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  z-index: 3;
  border: 2px solid var(--bg-card);
}
.result-badge--ok   { background: var(--green); color: #fff; }
.result-badge--fail { background: var(--red);   color: #fff; }

/* ── Member Info ─────────────────────────── */
.member-name {
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--text);
  text-align: center;
  word-break: break-word;
  line-height: 1.3;
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.member-name--muted { color: var(--text-muted); font-weight: 400; }

.member-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  justify-content: center;
}

.member-level {
  font-size: 0.55rem;
  font-weight: 700;
  color: var(--amber-dark);
  background: rgba(245,158,11,0.12);
  border: 1px solid rgba(245,158,11,0.25);
  border-radius: 4px;
  padding: 1px 4px;
}

.member-platform {
  font-size: 0.52rem;
  color: var(--text-muted);
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
  padding: 1px 4px;
  text-transform: capitalize;
}

.member-role {
  font-size: 0.52rem;
  color: rgba(245,158,11,0.5);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.member-error {
  font-size: 0.55rem;
  color: var(--red);
  text-align: center;
}

.redeem-msg {
  font-size: 0.55rem;
  text-align: center;
  line-height: 1.3;
  word-break: break-word;
}
.redeem-msg--ok   { color: var(--green); }
.redeem-msg--fail { color: var(--red); }

/* ── Skeleton ──────────────────────────── */
.member-card--skeleton { pointer-events: none; }

.skeleton-anim {
  border-radius: 50%;
  background: linear-gradient(90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.09) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.skeleton-anim.member-avatar { border: none; }
.sk-text { width: 65%; height: 9px; border-radius: 4px; }
.sk-tag  { width: 40%; height: 7px; border-radius: 4px; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* ══════════════════════════════════════════════
   GIFT CARD
══════════════════════════════════════════════ */
.gift-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px 32px 28px;
  backdrop-filter: blur(24px);
  box-shadow: 0 0 0 1px rgba(245,158,11,0.05), 0 20px 60px rgba(0,0,0,0.55);
  transition: border-color 0.3s;
}
.gift-card:hover { border-color: var(--border-h); }
.gift-card--busy { pointer-events: none; }

@media (max-width: 480px) {
  .gift-card { padding: 28px 20px 22px; }
}

/* Header */
.gift-card__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
}

.logo-flag {
  width: 72px;
  height: 48px;
  filter: drop-shadow(0 0 14px rgba(218,37,29,0.5));
  animation: pulse-logo 3s ease-in-out infinite;
}
.logo-flag svg {
  display: block;
  width: 100%;
  height: 100%;
}
@keyframes pulse-logo {
  0%, 100% { filter: drop-shadow(0 0 14px rgba(218,37,29,0.5)); }
  50%       { filter: drop-shadow(0 0 26px rgba(218,37,29,0.85)); }
}

.gift-title {
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--amber-light), var(--amber), var(--red));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gift-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* Progress */
.progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.progress-bar-wrap {
  flex: 1;
  height: 6px;
  background: rgba(255,255,255,0.07);
  border-radius: 99px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--amber-dark), var(--amber));
  border-radius: 99px;
  transition: width 0.4s ease;
  box-shadow: 0 0 10px rgba(245,158,11,0.5);
}

.progress-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--amber);
  min-width: 32px;
  text-align: right;
}

/* Body */
.gift-card__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Field */
.field { display: flex; flex-direction: column; gap: 8px; }

.field__label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.field__input {
  width: 100%;
  padding: 14px 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  color: var(--text);
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.field__input::placeholder { color: rgba(148,163,184,0.45); }
.field__input:focus {
  border-color: var(--amber);
  background: rgba(245,158,11,0.05);
  box-shadow: 0 0 0 3px rgba(245,158,11,0.12);
}
.field__input:disabled { opacity: 0.5; cursor: not-allowed; }
.field__input--code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Submit button */
.btn-submit {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--amber-dark), var(--amber), #fbbf24);
  color: #1a0a00;
  font-size: 0.95rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  box-shadow: 0 4px 22px rgba(245,158,11,0.32), 0 1px 0 rgba(255,255,255,0.18) inset;
}
.btn-submit::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.14), transparent);
  border-radius: inherit;
}
.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(245,158,11,0.48), 0 1px 0 rgba(255,255,255,0.2) inset;
}
.btn-submit:active:not(:disabled) { transform: translateY(0); }
.btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-submit__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  flex-wrap: wrap;
}

/* Reset button */
.btn-reset {
  width: 100%;
  padding: 11px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  background: rgba(255,255,255,0.04);
  color: var(--text-muted);
  font-size: 0.85rem;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.btn-reset:hover {
  background: rgba(255,255,255,0.08);
  color: var(--text);
  border-color: rgba(255,255,255,0.2);
}

/* Spinner */
.spinner {
  width: 17px;
  height: 17px;
  border: 2.5px solid rgba(26,10,0,0.3);
  border-top-color: #1a0a00;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Summary Panel ────────────────────────── */
.summary-panel {
  margin-top: 16px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  overflow: hidden;
  max-height: 280px;
  overflow-y: auto;
}

.summary-panel::-webkit-scrollbar { width: 5px; }
.summary-panel::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

.summary-row {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.8rem;
}
.summary-row:last-child { border-bottom: none; }
.summary-row--ok   { background: rgba(16,185,129,0.04); }
.summary-row--fail { background: rgba(239,68,68,0.04); }

.summary-icon  { font-size: 0.85rem; }
.summary-name  { font-weight: 600; color: var(--text); }
.summary-msg   { color: var(--text-muted); font-size: 0.75rem; text-align: right; }

/* ── Transitions ──────────────────────────── */
.fade-up-enter-active, .fade-up-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-up-enter-from { opacity: 0; transform: translateY(10px); }
.fade-up-leave-to   { opacity: 0; transform: translateY(-6px); }

/* ── Footer ───────────────────────────────── */
.page-footer {
  position: relative;
  z-index: 1;
  margin-top: 28px;
  font-size: 0.7rem;
  color: rgba(148,163,184,0.35);
  letter-spacing: 0.05em;
}
</style>
