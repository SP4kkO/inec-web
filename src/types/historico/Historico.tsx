"use client";

import dayjs, { Dayjs } from "dayjs";
import useStore from "context/zustand/store";

// interface HistoricoData {

//   id?: number;
//   matricula: number;
//   matriculaBnb: string;
//   nome: string;
//   codCargo: string;
//   unidade: string;
//   codSituacao: string;
//   dataInicioFuncao: string;
//   dataFimFuncao: string;
//   status: string;
//   cpfAssessor: string;
//   mensagemRetornoBanco: string;
// }

export default class Historico {
  id?: number;
  matricula: number;
  matriculaBnb: string;
  nome: string;
  codCargo: string;
  unidade: string;
  codSituacao: string;

  dataInicioFuncao: Dayjs;
  dataFimFuncao: Dayjs;

  status: string;

  cpfAssessor: string;

  mensagemRetornoBanco: string;

  constructor({
    id = undefined,
    matricula = 0,
    matriculaBnb = "",
    nome = "",
    codCargo = "",
    unidade = "",
    codSituacao = "",
    dataInicioFuncao = dayjs(),
    dataFimFuncao = dayjs(),
    status = "",
    cpfAssessor = "",
    mensagemRetornoBanco = "",
  }: {
    id?: number;
    matricula?: number;
    matriculaBnb?: string;
    nome?: string;
    codCargo?: string;
    unidade?: string;
    codSituacao?: string;
    dataInicioFuncao?: Dayjs;
    dataFimFuncao?: Dayjs;
    status?: string;
    cpfAssessor?: string;
    mensagemRetornoBanco?: string;
  } = {}) {
    this.id = id;
    this.matricula = matricula;
    this.matriculaBnb = matriculaBnb;
    this.nome = nome;
    this.codCargo = codCargo;
    this.unidade = unidade;
    this.codSituacao = codSituacao;
    this.dataInicioFuncao = dataInicioFuncao;
    this.dataFimFuncao = dataFimFuncao;
    this.status = status;
    this.cpfAssessor = cpfAssessor;
    this.mensagemRetornoBanco = mensagemRetornoBanco;
  }

  static getAll(): Promise<Historico[]> {
    return fetch(
      `${process.env.NEXT_BACKEND_URL}/recuperarHistoricosNaoSincronizadosFront`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        if (res.body) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data: Historico[]) => {
        if (data.length === 0) {
          return [];
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map(
          (item) =>
            new Historico({
              ...item,
              dataInicioFuncao: dayjs(item.dataInicioFuncao),
              dataFimFuncao: dayjs(item.dataFimFuncao),
            }),
        );
      });
  }

  save(): Promise<Historico> {
    const url = `${process.env.NEXT_BACKEND_URL}/salvarHistorico`;
    const method = this.id ? "PUT" : "POST";

    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...this,
        dataFimFuncao: this.dataFimFuncao.toISOString(),
        dataInicioFuncao: this.dataInicioFuncao.toISOString(),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save historico");
        }
        return res.json();
      })
      .then(() => {
        return this;
      });
  }

  delete(): Promise<Historico> {
    console.log(this);
    const url = `${process.env.NEXT_BACKEND_URL}/excluirHistorico`;

    if (this.id === undefined) {
      throw new Error("ID is not defined.");
    }

    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: this.id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete.");
        }
        useStore.getState().refetchHistorico();
        return res.json();
      })
      .then(() => {
        return this;
      });
  }
}

// return new Historico(
//     data.matricula,
//     data.matriculaBnb,
//     data.nome,
//     data.codCargo,
//     data.unidade,
//     data.codSituacao,
//     data.dataInicioFuncao,
//     data.dataFimFuncao,
//     data.status,
//     data.cpfAssessor,
//     data.mensagemRetornoBanco,
// );
