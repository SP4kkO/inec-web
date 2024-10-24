import useStore from "context/zustand/store";

export default class Situacaodepara {
  idCodInec: number;
  idCodBnb: number;
  descricao: string;
  status: boolean;
  id?: number;

  constructor({
    idCodInec = 0,
    idCodBnb = 0,
    descricao = "",
    status = true,
    id = undefined,
  }: {
    idCodInec?: number;
    idCodBnb?: number;
    descricao?: string;
    status?: boolean;
    id?: number;
  } = {}) {
    this.idCodInec = idCodInec;
    this.idCodBnb = idCodBnb;
    this.descricao = descricao;
    this.status = status;
    this.id = id;
  }

  static getAll(): Promise<Situacaodepara[]> {
    return fetch(`${process.env.NEXT_BACKEND_URL}/listarSituacoesDePara`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        return data as Situacaodepara[];
      })
      .then((resp) => {
        return resp.map((item) => new Situacaodepara({ ...item }));
      });
  }

  save(): Promise<Situacaodepara> {
    const url = `${process.env.NEXT_BACKEND_URL}/salvarSituacaoDePara`;
    const method = this.id ? "PUT" : "POST";

    if (this.idCodBnb === undefined || this.idCodInec === undefined) {
      throw new Error("ID bnb or ID inec is empty.");
    }

    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to save cargodepara");
      }
      useStore.getState().refetchSituacaoDePara();
      return this;
    });
  }

  delete(): Promise<Situacaodepara> {
    const url = `${process.env.NEXT_BACKEND_URL}/excluirSituacaoDePara`;

    if (this.idCodBnb === undefined || this.idCodInec === undefined) {
      throw new Error("ID bnb or ID inec is empty.");
    }

    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete.");
        }
        useStore.getState().refetchSituacaoDePara();
        return res.json();
      })
      .then(() => {
        return this;
      });
  }
}
