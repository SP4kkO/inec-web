// store.js
import { create } from "zustand";

import CargoBNB from "types/cargo/cargoBNB";
import CargoINEC from "types/cargo/cargoINEC";
import Cargodepara from "types/cargo/cargodepara";
import SituacaoBNB from "types/situacao/situacaoBNB";
import SituacaoINEC from "types/situacao/situacaoINEC";
import Situacaodepara from "types/situacao/situacaodepara";
import UnidadeBNB from "types/unidade/unidadebnb";
import UnidadeINEC from "types/unidade/unidadeince";
import Unidadedepara from "types/unidade/unidadedepara";
import Historico from "types/historico/Historico";

type StoreState = {
  cargoBNB?: CargoBNB[];
  cargoINEC?: CargoINEC[];
  cargoDePara?: Cargodepara[];
  situacaoBNB?: SituacaoBNB[];
  situacaoINEC?: SituacaoINEC[];
  situacaoDePara?: Situacaodepara[];
  unidadeBNB?: UnidadeBNB[];
  unidadeINEC?: UnidadeINEC[];
  unidadeDePara?: Unidadedepara[];
  historico?: Historico[];
};

type StoreActions = {
  loadInitialData: () => Promise<void>;
  refetchCargoDePara: () => Promise<void>;
  refetchSituacaoDePara: () => Promise<void>;
  refetchUnidadeDePara: () => Promise<void>;
  refetchHistorico: () => Promise<void>;
};

type StoreType = StoreState & StoreActions;

const store = (
  set: (arg0: {
    cargoBNB?: CargoBNB[];
    cargoINEC?: CargoINEC[];
    cargoDePara?: Cargodepara[];
    situacaoBNB?: SituacaoBNB[];
    situacaoINEC?: SituacaoINEC[];
    situacaoDePara?: Situacaodepara[];
    unidadeBNB?: UnidadeBNB[];
    unidadeINEC?: UnidadeINEC[];
    unidadeDePara?: Unidadedepara[];
    historico?: Historico[];
  }) => void,
) => ({
  historico: [],
  cargoBNB: [],
  cargoINEC: [],
  cargoDePara: [],
  situacaoBNB: [],
  situacaoINEC: [],
  situacaoDePara: [],
  unidadeBNB: [],
  unidadeINEC: [],
  unidadeDePara: [],

  loadInitialData: async () => {
    console.log("Iniciando carga de dados");

    CargoBNB.getAll()
      .then((res) => set({ cargoBNB: res }))
      .catch((error) => console.error("Erro ao buscar cargoBNB", error));
    CargoINEC.getAll()
      .then((res) => set({ cargoINEC: res }))
      .catch((error) => console.error("Erro ao buscar cargoINEC", error));
    Cargodepara.getAll()
      .then((res) => set({ cargoDePara: res }))
      .catch((error) => console.error("Erro ao buscar cargoDePara", error));
    SituacaoBNB.getAll()
      .then((res) => set({ situacaoBNB: res }))
      .catch((error) => console.error("Erro ao buscar situacaoBNB", error));
    SituacaoINEC.getAll()
      .then((res) => set({ situacaoINEC: res }))
      .catch((error) => console.error("Erro ao buscar situacaoINEC", error));
    Situacaodepara.getAll()
      .then((res) => set({ situacaoDePara: res }))
      .catch((error) => console.error("Erro ao buscar situacaoDePara", error));
    UnidadeBNB.getAll()
      .then((res) => set({ unidadeBNB: res }))
      .catch((error) => console.error("Erro ao buscar unidadeBNB", error));
    UnidadeINEC.getAll()
      .then((res) => set({ unidadeINEC: res }))
      .catch((error) => console.error("Erro ao buscar unidadeINEC", error));
    Unidadedepara.getAll()
      .then((res) => set({ unidadeDePara: res }))
      .catch((error) => console.error("Erro ao buscar unidadeDePara", error));
    Historico.getAll()
      .then((res) => set({ historico: res }))
      .catch((error) => console.error("Erro ao buscar historico", error));

    console.log("Carga de dados finalizada");
  },

  // Métodos refetch ajustados para usar then e catch
  refetchCargoDePara: async () => {
    Cargodepara.getAll()
      .then((res) => set({ cargoDePara: res }))
      .catch((error) => console.error("Erro ao refetch cargoDePara", error));
  },

  refetchSituacaoDePara: async () => {
    Situacaodepara.getAll()
      .then((res) => set({ situacaoDePara: res }))
      .catch((error) => console.error("Erro ao refetch situacaoDePara", error));
  },

  refetchUnidadeDePara: async () => {
    Unidadedepara.getAll()
      .then((res) => set({ unidadeDePara: res }))
      .catch((error) => console.error("Erro ao refetch unidadeDePara", error));
  },

  refetchHistorico: async () => {
    Historico.getAll()
      .then((res) => set({ historico: res }))
      .catch((error) => console.error("Erro ao refetch historico", error));
  },
});

const useStore = create<StoreType>(store);

export default useStore;
