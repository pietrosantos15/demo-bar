# Lúpulo Vivo Tap House: site de demonstração para bar

Site estático (HTML, CSS e JavaScript puro, sem build) para mostrar a clientes como ficaria a página do bar deles. Marca, rótulos, cardápio, preços e agenda são fictícios. O visual é inspirado na linguagem de cervejarias e pubs artesanais (preto, osso e azul elétrico, títulos em caixa alta, tap list, marquee), sem copiar nome, logotipo, texto ou imagens de nenhuma marca real. O logotipo é um SVG original inline.

## Ver no ar
No GitHub: **Settings > Pages > Deploy from a branch > `main` / `/ (root)`**. O link fica em `https://SEU-USUARIO.github.io/demo-bar/`.

## Personalizar para um cliente sem editar código
Acrescente parâmetros ao link:

```
https://SEU-USUARIO.github.io/demo-bar/?wa=5515991234567&nome=Bar%20do%20Cliente
```

- `wa`: número com código do país e DDD, só dígitos. Troca todos os botões, a reserva de mesa e o telefone exibido.
- `nome`: troca o nome do bar no topo, no rodapé e na aba do navegador.

## Entregar de verdade ao cliente
Antes de publicar para o cliente, troque:

- [ ] Número do WhatsApp: busque `5500900000000` e `(00) 90000-0000` no `index.html`.
- [ ] Nome (e o logotipo SVG no `index.html`), endereço, horários e link do Google Maps (o mapa da seção "Onde" é uma ilustração).
- [ ] Tap list: array `TAPS` no `script.js` (nome, estilo, ABV, IBU, preços e cor). Cardápio de comida, combos e preços no `index.html`.
- [ ] Agenda semanal e regras do happy hour.
- [ ] **Horário de funcionamento também no `script.js`**: o aviso "Aberto agora" usa a constante `HORARIOS` (dia da semana, abertura e fechamento; valores acima de 24 passam da meia-noite).
- [ ] Mantenha o aviso "Beba com moderação. Venda proibida para menores de 18 anos" no rodapé.
- [ ] Remova a frase "Site de demonstração" do rodapé.

A reserva de mesa monta a mensagem e abre o WhatsApp; a confirmação é feita pelo bar.

## Arquivos
`index.html` (conteúdo) · `style.css` (paleta, tipografia e componentes) · `script.js` (aberto agora, tap list com filtro, aviso de maioridade, reserva, WhatsApp e parâmetros do link)

## Visual
Paleta: `#1A1A18` (preto), `#F0EBE4` (osso), `#146FF8` (azul elétrico), `#F5A623` (âmbar, só destaque de cerveja). Fontes (Google Fonts): Anton, DM Sans e JetBrains Mono, com fallbacks do sistema se estiver offline.
