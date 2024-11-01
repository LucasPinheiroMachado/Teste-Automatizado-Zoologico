# Teste automatizado de um zoológico

Este projeto é uma aplicação desenvolvida em Node.js e o framework Jest para gerenciar a alocação de animais em recintos, seguindo uma série de regras específicas para garantir o conforto e a segurança de cada espécie. A aplicação analisa os recintos disponíveis e determina onde um lote de animais pode ser alocado, considerando o tipo e a quantidade especificada.

# Regras de Alocação para Encontrar um Recinto Viável

1. Bioma e Espaço Suficiente: Cada recinto deve ser adequado ao bioma do animal e ter espaço suficiente para cada indivíduo do lote.
   
2. Convivência dos Carnívoros: Animais carnívoros só podem habitar com outros da mesma espécie.
   
3. Conforto dos Animais Existentes: A inclusão de novos animais não pode comprometer o conforto dos animais que já habitam o recinto.
   
4. Exceção para Hipopótamos: Hipopótamos só toleram outras espécies se o recinto tiver os biomas de savana e rio.
   
5. Condição para Macacos: Um macaco não se sente confortável sem outro animal no recinto, podendo ser da mesma espécie ou não.
   
6. Espaço Extra para Múltiplas Espécies: Caso um recinto contenha mais de uma espécie, deve haver espaço adicional para comportar a diversidade.
   
7. Lotes Fixos de Animais: Não é permitido dividir lotes de animais nem transferir os animais já residentes para outros recintos. Cada lote deve ser mantido completo no mesmo recinto.
