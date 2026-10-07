document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 本番では削除してOK（サーバー送信のため）

    // 入力値の取得
    const name = document.getElementById("name").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const people = document.getElementById("people").value;

    // 必須チェック
    if (!name || !tel || !email || !date || !time || !people) {
      alert("必須項目が入力されていません。すべての項目を入力してください。");
      return;
    }

    // メール形式チェック（簡易）
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("メールアドレスの形式が正しくありません。");
      return;
    }

    // 電話番号チェック（数字とハイフンのみ）
    const telPattern = /^[0-9\-]+$/;
    if (!telPattern.test(tel)) {
      alert("電話番号は数字とハイフンのみで入力してください。");
      return;
    }

    // 送信前の確認
    const confirmMessage = `
以下の内容で予約しますか？

【お名前】${name}
【電話番号】${tel}
【メール】${email}
【予約日】${date}
【時間】${time}
【人数】${people}名
    `;

    if (!confirm(confirmMessage)) {
      return;
    }

    // 本番ではここでサーバーへ送信する
    // fetch("/reserve", { method: "POST", body: new FormData(form) })

    alert("予約を受け付けました！店舗からの確認連絡をお待ちください。");

    form.reset(); // フォームをリセット
  });
});