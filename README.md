# Boteco Azulejo: site de demonstração para bar

Site estático (HTML, CSS e JavaScript puro, sem build) para mostrar a clientes como ficaria a página do bar deles. Cardápio, preços e agenda são fictícios.

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
- [ ] Nome, endereço, horários e link do Google Maps.
- [ ] Cardápio e preços.
- [ ] Agenda semanal e regras do happy hour.
- [ ] **Horário de funcionamento também no `script.js`**: o aviso "Aberto agora" usa a constante `HORARIOS` (dia da semana, abertura e fechamento; valores acima de 24 passam da meia-noite).
- [ ] Mantenha o aviso "Beba com moderação. Venda proibida para menores de 18 anos" no rodapé.
- [ ] Remova a frase "Site de demonstração" do rodapé.

A reserva de mesa monta a mensagem e abre o WhatsApp; a confirmação é feita pelo bar.

## Arquivos
`index.html` (conteúdo) · `style.css` (visual e padrão de azulejo) · `script.js` (aberto agora, reserva, WhatsApp e parâmetros do link)
