/* Greff Car — dados do site
   Estoque: retrato do site atual (greffcar.com.br) em 13/11/2026.
   Em produção, troque ESTOQUE_RAW pela integração com o sistema de estoque (Altimus). */

const LOJA = {
  nome: 'Greff Car Multimarcas',
  whatsapp: '5547997679004',
  whatsappLabel: '(47) 99767-9004',
  telefone: '+5547999889002',
  telefoneLabel: '(47) 99988-9002',
  endereco: 'Rua Bernardo Dornbusch, 1670 — Vila Lalau, Jaraguá do Sul/SC',
  // 0 = domingo … 6 = sábado  |  [abre, fecha] em horas decimais
  horario: { 1: [8.5, 18], 2: [8.5, 18], 3: [8.5, 18], 4: [8.5, 18], 5: [8.5, 18], 6: [8.5, 13] },
  fotoBase: 'https://s3.amazonaws.com/altimus2.arquivos.prod/9c62b864-acda-445d-a8e2-1193f342fb41/fotos/veiculo/'
};

/* marca|modelo|versão|ano|km|preço|combustível(F/G/D)|cor|câmbio(A/M/Z)|categoria|foto */
const ESTOQUE_RAW = `
Chevrolet|Equinox|Premier 1.5 Turbo 172cv Aut.|2022|66000|157900|G|Preta|A|SUV|d293d8aa-cad2-4f4e-a2e5-4ce177e4a3f2/3e2f81457db1460f9effead340c340d6_1785332518443.jpg
Jaguar|XF|2.0 R-Sport Aut.|2017|94544|156900|G|Preta|A|Sedan|5b067ad7-5b8b-468b-a97c-5e72bb11a432/a0da0c25b17c4faca36b6c654c0066e8_1790792185187.jpg
Volkswagen|T-Cross|Comfortline 200 TSI 1.0 Flex Aut.|2025|47998|140900|F|Branca|A|SUV|8c04f89f-0573-4702-a879-67a52ed144ce/9f16c005ab434d6a9d269a979ae7c547_1790610457427.jpg
BMW|320i|Modern/Sport 2.0 Turbo ActiveFlex|2017|97000|127900|G|Cinza|A|Sedan|785b9934-bfa9-4e6c-ab20-e5a677da5cf9/f929f8a899ea4230b7b05110c2ee5870_1791227059055.jpg
Fiat|Toro|Freedom 1.3 T270 4x2 Flex Aut.|2023|71000|125900|F|Branca|A|Picape|8ee5d191-be61-486b-87dc-509902eff843/36a8243a7be04c5cad5d06c247e6c2ef_1788611290126.jpg
Chevrolet|Spin|Premier 1.8 8V Econo.Flex Aut.|2025|45268|125900|F|Prata|A|Minivan|88f8aa2b-a1b0-4d72-9c6f-0837f0439818/c4e91cd1a369486da1b125185a1c0097_1787595819562.jpg
Volvo|XC60|D5 Momentum 2.4 AWD Diesel|2017|152000|114900|D|Azul|A|SUV|556290b0-f34d-442f-8b79-1d454a26eac1/26bd3b4aacce431880f6fb6eb3d4dd35_1782847750433.jpg
Honda|Civic|Sedan Sport 2.0 Flex 16V Aut.|2017|122000|108900|F|Preta|A|Sedan|a321b8e3-fe45-45a5-bb84-b98dcf67b1b2/5f1417fb1f4c4930989274aae4269f35_1792510000659.jpg
Volkswagen|Nivus|Comfortline 1.0 200 TSI Flex Aut.|2021|52000|102900|F|Cinza|A|SUV|ee17e81c-3dc8-409c-9697-75f85dc7d3d8/2620d647518d4576a61e1e0122624625_1792509790126.jpg
Volvo|V40|T4 Momentum 2.0 Aut.|2018|85500|100900|G|Branca|A|Hatch|4ad7b8c2-6b73-4001-8f1f-def05e599475/71436289e5b642929278b45e59638880_1787151080569.jpg
Toyota|Corolla|GLi Upper 1.8 Flex 16V Aut.|2019|79000|98900|F|Preta|A|Sedan|e1a35c9e-09ad-4ba2-9d49-a12437fe8a88/32f0d68f982e4a28839f7518d9ded96f_1791400551459.jpg
Jeep|Compass|Longitude 2.0 4x2 Flex 16V Aut.|2017|120000|95900|F|Preta|A|SUV|fc20b62a-a910-43ef-b8e1-7d746b3e9811/1d4f48c324924cc3a64c2ead75a2aa2c_1790104796382.jpg
Hyundai|HB20|Comfort 1.0 TB Flex 12V Aut.|2024|45174|94900|F|Cinza|A|Hatch|17b40849-7d55-4b0a-8a1e-88728a71bbcf/43ae4213961443c5a3b4c2b41bb57e84_1791921046433.jpg
Fiat|Cronos|Drive 1.3 8V Flex|2024|34111|90900|F|Branca|M|Sedan|42304403-3a17-431b-8242-d2c42137ce8b/cad67271e51d453fbdec7bb4c0ca2968_1790020585904.jpg
Fiat|Toro|Freedom AT|2017|77000|90900|F|Prata|A|Picape|0ace9a69-a000-4483-9a36-1ce0472ab03c/6b6f645514424c89b0e655d53c37c6e5_1792609456177.jpg
Chevrolet|Cruze Sport|LT 1.4 16V Turbo Flex Aut.|2018|109144|88900|F|Preta|A|Hatch|a1b724d6-003c-40c0-b398-4978a893f140/0e8732b9f58d4318bbbaa2c9f355c32c_1793735169465.jpg
Fiat|Fiorino|Endurance EVO 1.4 Flex 8V|2023|46300|84900|F|Branca|M|Utilitário|5847397d-ba0c-4211-bbfb-fd7a984a270f/383220e2eb244f7dbc0de6381a9ee89c_1793735360465.jpg
Fiat|Cronos|Drive 1.3 8V Flex|2023|67100|83900|F|Branca|M|Sedan|c087a633-22e5-44fd-b449-a6432721815e/7786b69c4cfd4a40a014e0964c48d0ad_1790019905543.jpg
Honda|City|Sedan LX 1.5 Flex 16V Aut.|2017|98127|83900|F|Preta|A|Sedan|21bcf41b-df39-4193-9c0c-077f05e9583a/6a6b375e68da4898a2dafffe7876d246_1792608988258.jpg
Fiat|Cronos|1.3 8V Flex|2022|59500|80900|F|Branca|M|Sedan|
Fiat|Strada|Endurance 1.4 Flex 8V CS Plus|2023|70862|79900|F|Branca|M|Picape|cfd26727-ec07-49fc-b079-2e4b2b48d746/18262dc404d14e2891a0f1ba5fc9744d_1781719906075.jpg
Chevrolet|S10|LS 2.8 TDI 4x4 CS Diesel|2015|255000|79900|D|Prata|M|Picape|
Nissan|Versa|V-Drive Premium 1.6 16V Flex Aut.|2021|77646|79900|F|Branca|A|Sedan|3ee41c44-2b57-4db7-805f-5c3e91c1209e/b5413d1d995c44759e207fe4ce4f0c47_1793196486376.jpg
Peugeot|2008|Griffe 1.6 Flex 16V Aut.|2019|121747|76900|F|Vermelha|A|SUV|4599b4aa-96c4-4a9a-8b7f-06821842043a/d6ff3581ca5a479bb014e37b93dc5c5f_1793196414422.jpg
Fiat|Argo|1.0|2024|30543|75900|F|Branca|M|Hatch|05084579-1c99-4ea6-8ce2-6224087ea7f5/e0205aedbd334ecfa49a58a66b922385_1790610602591.jpg
Peugeot|208|Like MT|2024|57733|75900|F|Branca|M|Hatch|657311db-f0c5-46b4-8cc1-5b065b7ece4e/74f1c599d8cb4b9593d3fa25f035825d_1793735220732.jpg
Mitsubishi|Pajero TR4|2.0 Flex 16V 4x4 Aut.|2012|170291|73900|G|Prata|A|SUV|e60da6f1-6b1b-4c13-9ac9-742e147430f8/d54b6a136c0140c29650117d30c08972_1789397491674.jpg
Chevrolet|Cruze|LTZ 1.8 16V FlexPower Aut.|2014|179764|72900|F|Branca|A|Sedan|bbb94878-afd1-431f-bbd4-8b4460e7e207/c580954bdd16490dadebb5090b5a4db8_1791031842797.jpg
Chevrolet|Cobalt|Elite 1.8 8V Econo.Flex Aut.|2019|123000|71900|F|Cinza|A|Sedan|401c576d-85b5-42f8-961b-300effdaddcf/31cf328400ec49c486078259df009951_1791921112592.jpg
Chevrolet|Onix|Hatch LT 1.0 12V Turbo Flex Mec.|2020|102000|70900|F|Prata|M|Hatch|492e28c2-0f82-4121-b9e5-fe3acd557522/7237c54117384f5e98f7face8200dd5c_1792609628863.jpg
Hyundai|HB20|Comfort Plus 1.0 Flex 12V|2019|74392|70900|F|Branca|M|Hatch|395cea07-07a4-4a55-895b-62bfd2b72a62/1f07c07bd2944394bd4f3fcfd23de9dc_1793196665668.jpg
Ford|Fiesta|SEL Style 1.0 EcoBoost Aut.|2018|73293|68900|G|Vermelha|A|Hatch|0a9e4325-68e8-4767-a960-1adb0300549b/6d361d1a81fe4fea998a517ed9ab040d_1787596447503.jpg
Chevrolet|Cruze|LT|2014|133000|66900|F|Cinza||Sedan|bc774882-1d27-4a38-9ba9-02f2a5c1cd75/02d8c0411af349399dd4d539df8d3ebd_1790017167164.jpg
Volkswagen|New Beetle|2.0 Mi|2009|113000|64900|G|Cinza||Hatch|694a9e5f-1002-4c69-a15e-534e42ff5f01/2d6c9465d31f46aba955be185d9326bf_1781804079258.jpg
Ford|Focus|Titanium 2.0 Flex Aut.|2015|95000|64900|F|Preta|A|Hatch|3f6a8648-d791-4129-b139-fcfa1bac36a6/68170f83faa34ecb8a655ae43c6ab666_1791397244187.jpg
Chevrolet|Onix|Hatch Joy 1.0 8V Flex Mec.|2020|102000|64900|F|Prata|M|Hatch|412fc072-d186-4c53-946c-a5d75a5c48ec/7ec39cf8f5a44ded87950ac028e79a46_1792680025306.jpg
Renault|Kwid|Zen 1.0 Flex 12V Mec.|2025|35874|64900|F|Branca|M|Hatch|abd75ee9-67e8-4a48-a08d-4d868f33b0d8/16bc1f995a3b4f2481b0919ad43928e2_1793820008879.jpg
Volkswagen|Fusca|1600|1996|416000|63900|G|Prata|M|Hatch|61f2e54e76c94c05a5b528b7d37da474_1780512351621.jpg
Volkswagen|Fox|Trendline 1.0 Flex 12V|2016|114000|62900|F|Branca|M|Hatch|a71dfd14-e04e-4c3d-8169-a092c648d9a6/7aaa937e6a434ca9ac6e6d1b06d676a6_1792609137704.jpg
Hyundai|HB20|Unique 1.0 Flex 12V Mec.|2019|106000|62900|F|Branca|M|Hatch|59983c3b-9d20-4301-a895-a4d39343b5cc/215a7ffdd4c54f0a853a9e26d3f195f8_1794322256594.jpg
Chevrolet|Prisma|Sedan LT 1.4 8V FlexPower|2016|120212|60900|F|Cinza||Sedan|
Ford|Ka|1.0 SE Plus|2018|111000|55900|F|Branca|M|Hatch|96becd30-a68e-4285-b3a5-eba6c451a57d/5e0c473e17834ea09de8175d44b6e952_1792680230383.jpg
Ford|Ka+|Sedan 1.5 SE Plus 16V Flex|2018||55900|F|Branca|M|Sedan|
Volkswagen|Up|High I-Motion 1.0 Flex 12V|2015|119000|54900|F|Vermelha|Z|Hatch|86a5c917-0ad4-4611-913f-5d178527b90f/28f77c81a38743f789d639660237cf08_1790193268385.jpg
Nissan|Livina|Grand S 1.8 16V Flex Mec.|2013|150000|52900|F|Preta|M|Minivan|d6443f53-3e15-4147-9410-10e8544e3996/405e75c32aae461092751372c00ce2bc_1783433309525.jpg
Chevrolet|Montana|LS 1.4 EconoFlex 8V|2013|169700|52900|F|Branca|M|Picape|71f24cad-4c67-4120-842f-9ddb5405c3de/73f1ce0ccf7045779bee0def3bd8e7f4_1786394127987.jpg
Nissan|Livina|Grand S 1.8 16V Flex Mec.|2014|180000|50900|F|Branca|M|Minivan|
Ford|Fiesta|Titanium 1.6 16V Flex Aut.|2014|81096|50900|F|Prata|A|Hatch|c4a68130-3e5b-478b-8719-b65f08002fd0/a745bbbc9dd240cda1fbe91d9cc4b749_1794489702732.jpg
Volkswagen|Gol|Trendline 1.0 Total Flex 8V|2015|110000|46900|F|Branca|M|Hatch|f3c85577-b183-4397-a177-d2367f6d981a/465a63969fd34299bf275f1b7566567c_1790104701820.jpg
Volkswagen|Fox|1.0 Mi Total Flex 8V|2012|150271|44900|F|Preta|M|Hatch|73eecd02-7f91-4741-9b3d-c53f0ac19a58/fa98cc6f153f4a7a94a524495f45e654_1789826346016.jpg
Ford|Fiesta|1.6 8V Flex|2013|142000|42900|F|Prata|M|Hatch|a757b238-8337-4db1-95ef-8c7f660b3609/ce9d00389ac04fa9969cb1f509e62197_1784646033681.jpg
Nissan|March|SV 1.6 16V Flex|2012|128894|42900|F|Cinza|M|Hatch|ee767f9c-854f-4789-a2d3-6232cbe8d03f/ddc4aa57ddb9433fa569169ba2d5c11c_1791228423580.jpg
Renault|Sandero|Expression Hi-Flex 1.0 16V|2012|190000|39900|F|Branca|M|Hatch|
Kawasaki|Z 650|SE ABS|2021|13500|38900|G|Preta|M|Moto|16b07d83-16e4-4d24-af6d-83024cd2e740/2a8e4f4d82004138b0007ff1d48eb876_1792852071716.jpg
Chevrolet|Celta|Life/LS 1.0 MPFI 8V FlexPower 3p|2011|110000|32900|F|Vermelha|M|Hatch|85a9df32-22cb-44db-9e45-0c03c473ac17/c2744ce5ad924f64939fd494711fdbe3_1791228554347.jpg
Peugeot|206|Presence 1.4 Flex 8V|2008|220000|20900|G|Cinza|M|Hatch|
Volkswagen|Polo|Hatch|2019|||F|Branca||Hatch|
Chevrolet|Prisma|Sedan LTZ 1.4 8V FlexPower|2014|||F|Branca||Sedan|
Honda|CR-V|Touring 1.5 16V 4WD Aut.|2021|||G|Branca|A|SUV|
Ford|Fusion|Titanium 2.0 GTDi Eco AWD Aut.|2017|||G|Branca|A|Sedan|4d8eda31-487f-447b-a21a-45b9a03fe11d/3152a6a07b7a41059613f91c76952911_1793735111962.jpg
Volkswagen|Gol|CL 1.6 Copa|1992|||G|Azul|M|Hatch|
Citroën|C4 Lounge|Tendance 1.6 Turbo Flex Aut.|2015|||F|Branca|A|Sedan|
Fiat|Cronos|Drive 1.3 8V Flex Aut.|2025|||F|Branca|A|Sedan|
Fiat|Argo|1.0 6V Flex|2024|||F|Branca|M|Hatch|
Fiat|Mobi|Like 1.0 Fire Flex|2025|||F|Branca|M|Hatch|
Renault|Kwid|Zen|2025|||F|Branca|M|Hatch|d32e39ad-e437-4bf9-acc8-6163bd9f21b1/4dcdf20e00714ac3b7fe609dc516e30d_1794322191115.jpg
`;

const COMBUSTIVEL = { F: 'Flex', G: 'Gasolina', D: 'Diesel' };
const CAMBIO = { A: 'Automático', M: 'Manual', Z: 'Automatizado' };

const ESTOQUE = ESTOQUE_RAW.trim().split('\n').map((linha, i) => {
  const [marca, modelo, versao, ano, km, preco, comb, cor, cambio, categoria, foto] = linha.split('|');
  return {
    id: i, marca, modelo, versao,
    ano: +ano,
    km: km ? +km : null,
    preco: preco ? +preco : null,
    combustivel: COMBUSTIVEL[comb] || '',
    cor,
    cambio: CAMBIO[cambio] || '',
    categoria,
    foto: foto ? LOJA.fotoBase + foto : ''
  };
});

/* Destaques da semana (como no site atual) */
const DESTAQUES = ['2008', 'Nivus'];
