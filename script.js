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
  document.title = NOME + " | Chope gelado, petisco e samba";
}
document.querySelectorAll("a[data-wa]").forEach(a => (a.href = waUrl(a.dataset.wa)));
if (params.get("wa")) document.querySelectorAll("[data-phone]").forEach(el => (el.textContent = fmtPhone(WA)));

/* "Aberto agora": horários por dia da semana (0 = domingo). Segunda fechado; sábado vai até 1h. */
const HORARIOS = { 0: [17, 24], 1: null, 2: [17, 24], 3: [17, 24], 4: [17, 24], 5: [17, 24], 6: [17, 25] };
const NOMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function statusAgora(agora = new Date()) {
  const d = agora.getDay(), h = agora.getHours() + agora.getMinutes() / 60;
  const ontem = HORARIOS[(d + 6) % 7];
  if (ontem && ontem[1] > 24 && h < ontem[1] - 24) return { aberto: true, texto: `Aberto agora, fecha à 1h` };
  const hoje = HORARIOS[d];
  if (hoje && h >= hoje[0] && h < Math.min(hoje[1], 24)) {
    const happy = d >= 2 && d <= 5 && h < 20;
    return { aberto: true, texto: happy ? "Aberto agora, happy hour até 20h" : `Aberto agora, fecha ${hoje[1] > 24 ? "à 1h" : "à meia-noite"}` };
  }
  if (hoje && h < hoje[0]) return { aberto: false, texto: `Abrimos hoje às ${hoje[0]}h` };
  for (let i = 1; i <= 7; i++) {
    const n = (d + i) % 7;
    if (HORARIOS[n]) return { aberto: false, texto: `Abrimos ${i === 1 ? "amanhã" : NOMES[n]} às ${HORARIOS[n][0]}h` };
  }
}
const st = document.getElementById("status"), s = statusAgora();
st.textContent = s.texto;
st.classList.toggle("on", s.aberto);

/* Reserva de mesa: valida e abre o WhatsApp com a mensagem pronta */
const form = document.getElementById("form"), err = document.getElementById("err");
const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
form.data.min = iso(new Date());

form.addEventListener("submit", e => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  let msg = "";
  if (!nome) msg = "Digite o seu nome para continuar.";
  else if (!form.data.value) msg = "Escolha a data da reserva.";
  else if (new Date(form.data.value + "T12:00").getDay() === 1) msg = "Às segundas o bar fica fechado. Escolha outro dia.";
  err.hidden = !msg;
  err.textContent = msg;
  if (msg) return;
  const data = form.data.value.split("-").reverse().join("/");
  const lugar = form.lugar.value === "Tanto faz" ? "" : ` Preferência: ${form.lugar.value.toLowerCase()}.`;
  window.open(waUrl(`Olá! Sou ${nome}. Quero reservar uma mesa para ${form.pessoas.value} pessoas no dia ${data}, às ${form.hora.value}.${lugar}`), "_blank", "noopener");
});
