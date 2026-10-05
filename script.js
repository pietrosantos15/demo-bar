/* Personalização por link: ?wa=5511999998888&nome=Nome%20do%20Bar */
const params = new URLSearchParams(location.search);
const WA = (params.get("wa") || "5500900000000").replace(/\D/g, "");
const NOME = params.get("nome");
const waUrl = msg => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const fmtPhone = n => {
  const d = n.replace(/^55/, "");
  return d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
       : d.length === 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : n;
};

if (NOME) {
  document.querySelectorAll("[data-brand]").forEach(el => (el.textContent = NOME));
  document.title = NOME + " | Bar e petiscaria com chope, happy hour e música ao vivo";
}
document.querySelectorAll("a[data-wa]").forEach(a => (a.href = waUrl(a.dataset.wa)));
if (params.get("wa")) document.querySelectorAll("[data-phone]").forEach(el => (el.textContent = fmtPhone(WA)));

/* Horários por dia da semana (0 = domingo): [abre, fecha]. Fecha > 24 = passa da meia-noite. Segunda fechado. */
const HORARIOS = { 0: [12, 22], 1: null, 2: [17, 24], 3: [17, 24], 4: [17, 24], 5: [17, 25], 6: [12, 25] };
const NOMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const fmtH = h => (h % 24 === 0 ? "meia-noite" : (h % 24) + "h");

function statusAgora(agora = new Date()) {
  const d = agora.getDay(), h = agora.getHours() + agora.getMinutes() / 60;
  const ontem = HORARIOS[(d + 6) % 7];
  if (ontem && ontem[1] > 24 && h < ontem[1] - 24) return { aberto: true, texto: `Aberto agora, até ${fmtH(ontem[1])}` };
  const hoje = HORARIOS[d];
  if (hoje && h >= hoje[0] && h < hoje[1]) return { aberto: true, texto: `Aberto agora, hoje até ${fmtH(hoje[1])}` };
  if (hoje && h < hoje[0]) return { aberto: false, texto: `Fechado agora, abrimos hoje às ${hoje[0]}h` };
  for (let i = 1; i <= 7; i++) {
    const n = (d + i) % 7;
    if (HORARIOS[n]) return { aberto: false, texto: `Fechado agora, abrimos ${i === 1 ? "amanhã" : NOMES[n]} às ${HORARIOS[n][0]}h` };
  }
}
const s = statusAgora();
document.getElementById("status").textContent = s.texto;
document.getElementById("dot").classList.toggle("on", s.aberto);

/* Destaca o dia de hoje na programação e na tabela de horários */
const hojeN = String(new Date().getDay());
document.querySelectorAll("#week li, #hours tr").forEach(el => el.classList.toggle("hoje", el.dataset.d === hojeN));

/* Menu mobile */
const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

/* Reserva: monta a mensagem e abre o WhatsApp */
const form = document.getElementById("resForm"), err = document.getElementById("err");
const dataMin = new Date(); form.data.min = dataMin.toISOString().slice(0, 10);
form.addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(form);
  const nome = (f.get("nome") || "").trim();
  if (!nome || !f.get("data")) { err.textContent = "Preencha o nome e a data para continuar."; return; }
  err.textContent = "";
  const [a, m, d] = f.get("data").split("-");
  const obs = (f.get("obs") || "").trim();
  const msg = `Olá! Quero reservar uma mesa.\nNome: ${nome}\nPessoas: ${f.get("pessoas")}\nData: ${d}/${m}/${a} às ${f.get("hora")}\nOcasião: ${f.get("ocasiao")}` + (obs ? `\nObservações: ${obs}` : "");
  window.open(waUrl(msg), "_blank", "noopener");
});
