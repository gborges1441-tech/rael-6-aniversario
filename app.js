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

function openWhatsApp(message) {
  const url = `https://wa.me/${EVENT.phone}?text=${encodeURIComponent(message)}`;
  window.location.href = url;
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
