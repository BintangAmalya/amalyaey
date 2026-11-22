// ===== Efek mengetik =====
// Cara kerja: teks awal dibaca dari HTML, dikosongkan, lalu diketik huruf demi huruf.
// Jadi kalau JavaScript gagal jalan, teks asli tetap terlihat.

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function typeText(el, text, speed = 110) {
  for (let i = 1; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    await sleep(speed);
  }
}

async function deleteText(el, speed = 55) {
  let text = el.textContent;
  while (text.length > 0) {
    text = text.slice(0, -1);
    el.textContent = text;
    await sleep(speed);
  }
}

async function startTyping() {
  const nameEl = document.getElementById("typedName");
  const roleEl = document.getElementById("typedRole");
  if (!nameEl || reduceMotion) return;

  // 1) Nama diketik sekali
  const name = nameEl.textContent.trim();
  nameEl.textContent = "";
  nameEl.classList.add("typing");
  await sleep(600);
  await typeText(nameEl, name, 140);
  await sleep(400);
  nameEl.classList.remove("typing");

  // 2) Peran berganti-ganti terus (ketik, tahan, hapus, ketik yang berikutnya)
  if (!roleEl) return;
  const words = (roleEl.dataset.words || roleEl.textContent)
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean);

  roleEl.textContent = "";
  roleEl.classList.add("typing");

  let i = 0;
  while (true) {
    await typeText(roleEl, words[i], 90);
    await sleep(1600);
    await deleteText(roleEl);
    await sleep(350);
    i = (i + 1) % words.length;
  }
}

startTyping();

// ===== Skill muncul bergiliran =====
document.querySelectorAll(".skills .chip").forEach((chip, i) => {
  chip.style.setProperty("--i", i);
});