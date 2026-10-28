/**
 * Cấu hình danh sách thành viên liên minh Darkwar Survival
 * - Sửa uid để thêm/đổi ID thành viên
 * - Để uid: null nếu chưa có ID (slot trống - chỉ áp dụng cho leader)
 * - role: 'leader' | 'member'
 *   → leader : hiển thị avatar lên giao diện + nhập code
 *   → member : chỉ nhập code, không hiển thị avatar
 * - uuid: mã định danh thiết bị/tài khoản của từng người, dùng để nối vào
 *   link redeem: code.php?uid=...&code=...&uuid=...&fromkoc=
 *   Để uuid: '' nếu chưa biết → thành viên đó sẽ bị BỎ QUA khi nhập code
 *   (chỉ uid có uuid mới thực sự gọi lên giftcenter)
 */
export const ALLIANCE_MEMBERS = [
    // ── Leaders (hiển thị avatar) ──────────────
    {
        uid: '1036496691000515',
        uuid: '',
        role: 'leader',
        note: '',
    },
    {
        uid: '1318540803000515',
        uuid: '',
        role: 'leader',
        note: '',
    },
    {
        uid: '1134545140000515',
        uuid: '',
        role: 'leader',
        note: '',
    },    
    // ── Members (nhập code, không hiển thị) ───
    {
        uid: '1197327362000516', //BAТISTA1
        uuid: '2e9d7050-a6d2-4d87-b1fc-78833a2586bc',
        role: 'member',
        note: '',
    },
    {
        uid: '1017777901000516',  //DTA
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1334382818000516', //ŢầnThuỷĦoànɠ
        uuid: 'f4552161-67bd-4420-8f5e-ca549f9ce032',
        role: 'member',
        note: '',
    },
    {
        uid: '1484485116000516', //Wild-apple
        uuid: '8a46e3c1-8d86-4377-b8f5-db5df48d45f1',
        role: 'member',
        note: '',
    },{
        uid: '1075487178000516', //๛ Thíck ﹏
        uuid: '9bb13a2a-8939-4dfa-9e33-918e341e7181',
        role: 'member',
        note: '',
    },
    {
        uid: '1126547016000516', //more7
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1033829964000492', //Reikitsune
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1567658928000516', //RoNinVN
        uuid: '9719d0cf-5803-4ee4-bf88-4832271faf0d',
        role: 'member',
        note: '',
    },
    {
        uid: '1171588137000516', //Cis2
        uuid: '',
        role: 'member',
        note: '',
    },{
        uid: '1066263135000516', //Yumie
        uuid: '',
        role: 'member',
        note: '',
    },{
        uid: '1614030264000516', //Bye
        uuid: '3761e307-c51e-4ba6-843c-61ac9228dba0',
        role: 'member',
        note: '',
    },{
        uid: '1104165322000516', //Hùng 3 số
        uuid: '',
        role: 'member',
        note: '',
    },{
        uid: '1363122788000516', //iori
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1619547292000516', //Apocalip
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1025667545000515', //Anitata
        uuid: 'bcc2e89e-89a3-4361-a6bd-80c521635e29',
        role: 'member',
        note: '',
    },
    {
        uid: '1309027196000515', //Ayush
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1063522371000516', //Hej
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1371815522000516', //Huy•Nh
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1139528892000516', //Silver kate
        uuid: 'f9104478-ac8f-405b-9aa3-a5c663903a97',
        role: 'member',
        note: '',
    },
    {
        uid: '1688016525000516', //NinoR•
        uuid: '',
        role: 'member',
        note: '',
    },
     {
        uid: '1681468324000516', //Vivian•
        uuid: '8aa189a7-8ee0-49b4-bb25-e19e2f910924',
        role: 'member',
        note: '',
    },
    // ── Thành viên bổ sung mới ────────────────
    {
        uid: '1157609711000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1036865322000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1129322855000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1034333512000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1015675828000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1495725840000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1404845697000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1067906268000514',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1643099529000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1061093534000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1148739506000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1415383252000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1192745479000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1540571660000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1234373673000505',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1329331637000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1439517830000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1003660815000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1027246884000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1495725840000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1015675828000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1318540803000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    // ── Thành viên bổ sung (13 UID mới) ───────
    {
        uid: '1667441545000505',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1410948417000512',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1029689251000508',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1255443600000505',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1061408478000505',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1002026826000510',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1037901017000512',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1295385318000512',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1234983918000512',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1781667537000505',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1365238736000512',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1497088190000512',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1257291257000516',
        uuid: '',
        role: 'member',
        note: '',
    },
    // ── Thành viên bổ sung từ all_id.txt (6 UID mới) ──
    {
        uid: '1097606932000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1461520851000508',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1271818963000505',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1382733592000505',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1202962510000515',
        uuid: '',
        role: 'member',
        note: '',
    },
    {
        uid: '1010785163000515',
        uuid: '',
        role: 'member',
        note: '',
    },
]

/** Leaders — hiển thị trên giao diện */
export const LEADER_MEMBERS = ALLIANCE_MEMBERS.filter(m => m.role === 'leader')

/** Tất cả UID hợp lệ để nhập code (cả leader + member) */
export const ACTIVE_UIDS = ALLIANCE_MEMBERS
    .filter(m => m.uid)
    .map(m => m.uid)

/** Map uid → uuid, chỉ gồm thành viên đã điền uuid */
export const UUID_BY_UID = Object.fromEntries(
    ALLIANCE_MEMBERS
        .filter(m => m.uid && m.uuid)
        .map(m => [m.uid, m.uuid])
)
