const EVENT = {
  name: "Rael",
  age: 6,
  date: "31/10/2026",
  dateLong: "31 de outubro de 2026",
  weekday: "sábado",
  time: "10h às 17h",
  place: "Termas da Mata, Cotia, SP",
  phone: "5511973883544"
};

const messages = {
  going: ({ family, adults, children }) => `Olá! Confirmo nossa presença no aniversário de 6 anos do Rael!\nFamília: ${family}\nAdultos: ${adults}\nCrianças: ${children}\nData: 31/10/2026, das 10h às 17h.\nObrigado pelo convite!`,
  pending: "Olá! Recebi o convite do aniversário do Rael. Ainda preciso confirmar nossa presença e retorno assim que possível. Obrigado!",
  decline: "Olá! Obrigado pelo convite do aniversário do Rael! Infelizmente não poderemos comparecer, mas desejamos uma comemoração maravilhosa!"
};

const form = document.querySelector("#rsvp-form");
const familyInput = document.querySelector("#family-name");
const adultsInput = document.querySelector("#adults");
const childrenInput = document.querySelector("#children");
const errorMessage = document.querySelector("#form-error");
const birthdaySong = document.querySelector("#birthday-song");
const musicToggle = document.querySelector("#music-toggle");
const musicStatus = document.querySelector("#music-status");
const musicState = document.querySelector(".music-state");

document.documentElement.classList.add("js");

const progressBar = document.querySelector("#scroll-progress");
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

function updateMusicUi() {
  const playing = birthdaySong && !birthdaySong.paused;
  if (!musicToggle || !birthdaySong) return;
  musicToggle.classList.toggle("is-playing", playing);
  musicToggle.setAttribute("aria-pressed", String(playing));
  musicToggle.setAttribute("aria-label", playing ? "Pausar a trilha sonora" : "Tocar a trilha sonora");
  musicStatus.textContent = playing ? "tocando agora" : "tocar trilha";
  musicState.textContent = playing ? "Ⅱ" : "▶";
}

async function playBirthdaySong() {
  if (!birthdaySong) return false;
  try {
    await birthdaySong.play();
    updateMusicUi();
    return true;
  } catch {
    updateMusicUi();
    return false;
  }
}

if (birthdaySong && musicToggle) {
  birthdaySong.addEventListener("play", updateMusicUi);
  birthdaySong.addEventListener("pause", updateMusicUi);
  musicToggle.addEventListener("click", async () => {
    if (birthdaySong.paused) await playBirthdaySong();
    else birthdaySong.pause();
  });
  window.addEventListener("pointerdown", () => { if (birthdaySong.paused) playBirthdaySong(); }, { once: true, passive: true });
  window.addEventListener("keydown", () => { if (birthdaySong.paused) playBirthdaySong(); }, { once: true, passive: true });
  window.addEventListener("pageshow", () => { if (birthdaySong.paused) playBirthdaySong(); }, { once: true });
  window.addEventListener("focus", () => { if (birthdaySong.paused) playBirthdaySong(); }, { passive: true });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && birthdaySong.paused) playBirthdaySong(); }, { passive: true });
  birthdaySong.autoplay = true;
  playBirthdaySong();
  updateMusicUi();
}

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

function openWhatsApp(message) {
  const url = `https://api.whatsapp.com/send?phone=${EVENT.phone}&text=${encodeURIComponent(message)}`;
  window.location.assign(url);
}

function getNonNegativeInteger(input) {
  const value = Number(input.value);
  if (!Number.isInteger(value) || value < 0) return null;
  return value;
}

function validateRsvp() {
  const family = familyInput.value.trim();
  const adults = getNonNegativeInteger(adultsInput);
  const children = getNonNegativeInteger(childrenInput);

  if (!family) return { error: "Digite o nome da família para continuar." };
  if (adults === null || children === null) return { error: "Informe apenas números inteiros iguais ou maiores que zero." };
  if (adults + children < 1) return { error: "Informe pelo menos um adulto ou uma criança para confirmar a presença." };

  return { family, adults, children };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = validateRsvp();
  if (result.error) {
    errorMessage.textContent = result.error;
    (result.error.includes("família") ? familyInput : adultsInput).focus();
    errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  errorMessage.textContent = "";
  openWhatsApp(messages.going(result));
});

document.querySelector("#pending-button").addEventListener("click", () => {
  errorMessage.textContent = "";
  openWhatsApp(messages.pending);
});

document.querySelector("#decline-button").addEventListener("click", () => {
  errorMessage.textContent = "";
  openWhatsApp(messages.decline);
});

document.querySelector("#quick-pending").addEventListener("click", () => openWhatsApp(messages.pending));
document.querySelector("#quick-decline").addEventListener("click", () => openWhatsApp(messages.decline));

[familyInput, adultsInput, childrenInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (errorMessage.textContent) errorMessage.textContent = "";
  });
});
