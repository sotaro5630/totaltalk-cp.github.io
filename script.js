// ツアー枠生成（9:00〜20分刻み）
const tourSlots = [];
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

// 予約データ
let reservations = [];

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

    // 結果表示
    const result = document.getElementById("result");
    result.innerHTML = `
        <h3>予約完了</h3>
        <p>${name} さんの予約は <strong>${assignedSlot.time}</strong> のツアーです。</p>
    `;
    result.classList.remove("hidden");
}

function adminLogin() {
    const pass = document.getElementById("admin-pass").value;

    if (pass !== "ABC") {
        alert("パスワードが違います");
        return;
    }

    document.getElementById("admin-page").classList.remove("hidden");

    const table = document.getElementById("reservation-table");
    table.innerHTML = "";

    reservations.forEach(r => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${r.name}</td>
            <td>${r.people}</td>
            <td>${r.time}</td>
        `;
        table.appendChild(row);
    });
}
