// ローカルストレージから読み込み
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
let tourSlots = JSON.parse(localStorage.getItem("tourSlots")) || [];

// 初回ロード時にツアー枠を生成
if (tourSlots.length === 0) {
    let startHour = 9;
    let startMin = 0;

    for (let i = 0; i < 24; i++) {
        let h = String(startHour).padStart(2, "0");
        let m = String(startMin).padStart(2, "0");
        tourSlots.push({ time: `${h}:${m}`, capacity: 15 });
        startMin += 20;
        if (startMin >= 60) {
            startMin = 0;
            startHour++;
        }
    }
    saveData();
}

// データ保存
function saveData() {
    localStorage.setItem("reservations", JSON.stringify(reservations));
    localStorage.setItem("tourSlots", JSON.stringify(tourSlots));
}

// 予約処理
function submitReservation() {
    const name = document.getElementById("name").value;
    const people = Number(document.getElementById("people").value);

    if (!name || !people) {
        alert("名前と人数を入力してください");
        return;
    }

    // 空き枠を探す
    let assignedSlot = null;

    for (let slot of tourSlots) {
        if (slot.capacity >= people) {
            assignedSlot = slot;
            slot.capacity -= people;
            break;
        }
    }

    if (!assignedSlot) {
        alert("全てのツアーが満員です");
        return;
    }

    // 予約データ保存
    reservations.push({
        name: name,
        people: people,
        time: assignedSlot.time
    });

    saveData();

    // 結果表示
    const result = document.getElementById("result");
    result.innerHTML = `
        <h3>予約完了</h3>
        <p>${name} さんの予約は <strong>${assignedSlot.time}</strong> のツアーです。</p>
    `;
    result.classList.remove("hidden");
}

// 管理者ログイン
function adminLogin() {
    const pass = document.getElementById("admin-pass").value;

    if (pass !== "ABC") {
        alert("パスワードが違います");
        return;
    }

    document.getElementById("admin-page").classList.remove("hidden");
    loadAdminTable();
}

// 管理者ページの表を読み込み（時間順にソート）
function loadAdminTable() {
    const table = document.getElementById("reservation-table");
    table.innerHTML = "";

    // 時間順にソート
    const sorted = reservations.sort((a, b) => {
        return a.time.localeCompare(b.time);
    });

    sorted.forEach((r, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${r.name}</td>
            <td>${r.people}</td>
            <td>${r.time}</td>
            <td><button class="delete-btn" onclick="deleteReservation(${index})">削除</button></td>
        `;
        table.appendChild(row);
    });
}

// 予約削除機能
function deleteReservation(index) {
    const r = reservations[index];

    // ツアー枠の人数を戻す
    const slot = tourSlots.find(s => s.time === r.time);
    if (slot) {
        slot.capacity += r.people;
    }

    // 予約削除
    reservations.splice(index, 1);

    saveData();
    loadAdminTable();
}
