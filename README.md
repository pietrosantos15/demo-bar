# Casa Tonico: site de demonstração para bar e petiscaria

Site estático (HTML, CSS e JavaScript puro, sem build) para mostrar a clientes como ficaria a página do bar deles. Marca, endereço, cardápio, preços e programação são fictícios. A estrutura segue a de sites de bares e casas de chope reais: hero com foto e horário de hoje, cardápio em lista com preços, happy hour, programação semanal, reservas e como chegar. O logotipo é um SVG original inline.

## Ver no ar
No GitHub: **Settings > Pages > Deploy from a branch > `main` / `/ (root)`**. Link: `https://SEU-USUARIO.github.io/demo-bar/`.

## Personalizar para um cliente sem editar código
```
https://SEU-USUARIO.github.io/demo-bar/?wa=5515991234567&nome=Bar%20do%20Cliente
```
- `wa`: número com código do país e DDD, só dígitos. Troca todos os botões, a reserva e o telefone exibido.
- `nome`: troca o nome do bar no topo, no rodapé e na aba do navegador.

## Imagens (hotlink do Unsplash, licença de uso comercial)
| Onde | Descrição |
|---|---|
| Hero | Balcão de madeira de bar com luz quente (photo-1514933651103) |
| Happy hour | Copo de chope gelado com condensação (photo-1571613316887) |
| Galeria 1 | Lâmpadas pendentes sobre o balcão (photo-1572116469696) |
| Galeria 2 | Torneiras de chope (photo-1567696911980) |
| Galeria 3 | Hambúrguer com fritas (photo-1619290463528) |
| Galeria 4 | Asinhas de frango (photo-1643405510853) |
| Galeria 5 | Balcão com banquetas e luz baixa (photo-1723309765458) |

Na entrega, substitua por fotos do próprio cliente: coloque os arquivos em `assets/` e troque o `src` em `index.html`.

## Entregar de verdade ao cliente
- Trocar nome, endereço, telefone, mapa, horários (constante `HORARIOS` no `script.js`), cardápio, preços e programação.
- Remover a faixa "Proposta de demonstração" e a linha "Site de demonstração" do rodapé.
- Manter o aviso "Beba com moderação. Venda proibida para menores de 18 anos".
