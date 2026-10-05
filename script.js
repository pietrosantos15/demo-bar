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
  document.title = NOME + " | Tap house de cerveja artesanal, petisco e jogo";
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


/* Tap list: rótulos fictícios [nome, estilo, grupo, ABV, IBU, 300 ml, 500 ml, cor] */
const TAPS = [
  ["Fio de Navalha", "Pilsen", "leve", 4.8, 22, 11, 17, "#E8C25B"],
  ["Trigo Doido", "Weiss", "leve", 5.0, 14, 12, 19, "#F0D27A"],
  ["Fumaça Dourada", "Lager defumada", "leve", 5.2, 20, 13, 20, "#D9962B"],
  ["Pé Vermelho", "Red Ale", "ale", 5.4, 28, 13, 20, "#B4501E"],
  ["Sertão Cítrico", "Session IPA", "ipa", 4.5, 38, 13, 20, "#F2B544"],
  ["Névoa Tropical", "Hazy IPA", "ipa", 6.2, 35, 15, 23, "#F5A623"],
  ["Chuva de Lúpulo", "American IPA", "ipa", 6.8, 62, 15, 24, "#E48E1A"],
  ["Dobradinha", "Double IPA", "ipa", 8.2, 78, 18, 29, "#C97514"],
  ["Barão Negro", "Imperial Stout", "escura", 6.0, 30, 16, 25, "#2A1710"],
  ["Azedinha de Jabuticaba", "Sour frutada", "azeda", 4.0, 8, 15, 23, "#7A2147"]
];
const tapsEl = document.getElementById("taps"), countEl = document.getElementById("count");
const brl = n => "R$ " + n;
tapsEl.innerHTML = TAPS.map((t, i) => `
  <article class="tap" data-g="${t[2]}">
    <span class="no mono">Nº ${String(i + 1).padStart(2, "0")}</span>
    <div class="tap-top">
      <svg viewBox="0 0 80 120" style="--b:${t[7]}" aria-hidden="true"><use href="#glass"/></svg>
      <div><h3>${t[0]}</h3><span class="style">${t[1]}</span></div>
    </div>
    <div class="stats"><span>${String(t[3]).replace(".", ",")}% ABV</span><span>${t[4]} IBU</span></div>
    <div><div class="bar" role="img" aria-label="Amargor ${t[4]} de 80"><i style="width:${Math.round(t[4] / 80 * 100)}%"></i></div></div>
    <div class="prices"><div>300 ml<b>${brl(t[5])}</b></div><div>500 ml<b>${brl(t[6])}</b></div></div>
  </article>`).join("");
function filtrar(f) {
  let n = 0;
  tapsEl.querySelectorAll(".tap").forEach(el => {
    const ok = f === "todas" || el.dataset.g === f;
    el.hidden = !ok;
    if (ok) n++;
  });
  countEl.textContent = n + (n === 1 ? " torneira" : " torneiras");
}
document.querySelectorAll(".chip").forEach(c => c.addEventListener("click", () => {
  document.querySelectorAll(".chip").forEach(o => { o.classList.toggle("on", o === c); o.setAttribute("aria-pressed", o === c); });
  filtrar(c.dataset.f);
}));
filtrar("todas");

/* Menu mobile */
const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
const setMenu = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu"); };
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => { if (e.target.tagName === "A") setMenu(false); });

/* Aviso de maioridade (não bloqueia a navegação) */
const age = document.getElementById("age");
let ok18 = false;
try { ok18 = sessionStorage.getItem("maior18") === "1"; } catch (e) {}
age.hidden = ok18;
age.addEventListener("click", e => {
  const v = e.target.dataset && e.target.dataset.age;
  if (v === "sim") { try { sessionStorage.setItem("maior18", "1"); } catch (e2) {} age.hidden = true; }
  if (v === "nao") location.href = "https://www.google.com/";
});

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
