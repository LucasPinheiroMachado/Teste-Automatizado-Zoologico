class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        id: 1,
        bioma: 'savana',
        tamanhoTotal: 10,
        animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }],
      },
      { id: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
      {
        id: 3,
        bioma: 'savana e rio',
        tamanhoTotal: 7,
        animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }],
      },
      { id: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
      {
        id: 5,
        bioma: 'savana',
        tamanhoTotal: 9,
        animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }],
      },
    ];

    this.animaisValidos = {
      LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
      MACACO: {
        tamanho: 1,
        bioma: ['savana', 'floresta', 'savana e rio'],
        carnivoro: false,
      },
      GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
      HIPOPOTAMO: {
        tamanho: 4,
        bioma: ['savana', 'rio', 'savana e rio'],
        carnivoro: false,
      },
    };
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animaisValidos[animal]) {
      return { erro: 'Animal inválido', recintosViaveis: null };
    }

    if (quantidade <= 0) {
      return { erro: 'Quantidade inválida', recintosViaveis: null };
    }

    const animalInfo = this.animaisValidos[animal];
    const recintosViaveis = [];

    for (let recinto of this.recintos) {
      let espacoOcupado = recinto.animaisExistentes.reduce((total, a) => {
        const tamanhoAnimal =
          this.animaisValidos[a.especie].tamanho * a.quantidade;
        return total + tamanhoAnimal;
      }, 0);

      if (
        animalInfo.bioma.includes(recinto.bioma) &&
        recinto.tamanhoTotal - espacoOcupado >= animalInfo.tamanho * quantidade
      ) {
        const recintosCarnivoros = recinto.animaisExistentes.filter(
          (a) => this.animaisValidos[a.especie].carnivoro,
        );
        const recintosHerbivoros = recinto.animaisExistentes.filter(
          (a) => !this.animaisValidos[a.especie].carnivoro,
        );

        if (
          animalInfo.carnivoro &&
          recintosCarnivoros.length > 0 &&
          recintosCarnivoros[0].especie !== animal
        ) {
          continue;
        }

        if (!animalInfo.carnivoro && recintosCarnivoros.length > 0) {
          continue;
        }
        if (animalInfo.carnivoro && recintosHerbivoros.length > 0) {
          continue;
        }
        if (
          animal === 'HIPOPOTAMO' &&
          recinto.bioma !== 'savana e rio' &&
          recinto.animaisExistentes.length > 0
        ) {
          continue;
        }

        const especiesNoRecinto = new Set(
          recinto.animaisExistentes.map((a) => a.especie),
        );
        if (especiesNoRecinto.size > 0 && !especiesNoRecinto.has(animal)) {
          espacoOcupado += 1;
        }

        if (
          animal === 'MACACO' &&
          quantidade < 2 &&
          recinto.animaisExistentes.length < 1
        ) {
          continue;
        }

        const espacoLivre =
          recinto.tamanhoTotal -
          espacoOcupado -
          animalInfo.tamanho * quantidade;
        if (espacoLivre >= 0) {
          recintosViaveis.push(
            `Recinto ${recinto.id} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`,
          );
        }
      }
    }

    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável', recintosViaveis: null };
    }

    return { erro: null, recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };
