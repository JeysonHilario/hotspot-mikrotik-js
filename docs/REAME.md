# HOTSPOT HILINK APP

## Descrição 

- Esse APP visa fazer uma pagina hotspot personalizado da HiLink para possiveis novos hotspots.

### HOWTO

- Vou personalizar o template da mikrotik e deixar com a cara da hilink.
-- MODIFICADO

- Vou criar uma pagina de cadastro que o cliente vai colocar apenas seu nome e seu Numero de telefone. Esse numero vai ser validado E o Nome precisa pelo menos nome e sobrenome
-- HTML - CSS - JAVASCRIPT
--- Pegar esses dados e jogar em um arquivo json. E depois logar o cliente no hotspot.
--- Como logar esse cliente ? Dando a ele um usuario ou Colocando ele em um trial.

- Vai ter uma opção já sou cliente - Que vai fazer um consulta na API do SGP se o cliente tiver um contrato ativo vai ser liberado o acesso
-- NODE JS axios para consultar a API DO SGP e retornar se o cliente tem contrato.
--- getContractClient() Se for cliente já autenticar o cliente no hotspot.


- Vou analizar e ver como está organizada o template da mikrotik para fazer a integração.
- Vão ser todos trials os usuarios com periodo de 30 minutos 
- Aprensentar o site da HiLink
- Posso fazer um hotspot com anuncios para realizar alguma renda com esse hotspo
- Guardar logs consumindo a API do MikroTik.

## Primeiro passo pe fazer uma pagina de cadastro
- Vou criar um cadastro.html vai ter um formulario para o cliente preencher nesse html vai ter anuncios do google ads. Preenchendo a tela de cadastro vai gravar
o usuario para ter 2 horas de tempo no hotspot.

