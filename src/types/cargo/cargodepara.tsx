import useStore from "context/zustand/store";

export default class Cargodepara {
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
    if (id !== undefined) {
      this.id = id;
    }
  }

  static getAll(): Promise<Cargodepara[]> {
    return fetch(`${process.env.NEXT_BACKEND_URL}/listarCargosDePara`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        return data as Cargodepara[];
      });
  }

  save(): Promise<Cargodepara> {
    const url = `${process.env.NEXT_BACKEND_URL}/salvarCargoDePara`;
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
      useStore.getState().refetchCargoDePara();
      return this;
    });
  }

  delete(): Promise<Cargodepara> {
    const url = `${process.env.NEXT_BACKEND_URL}/excluirCargoDePara`;

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
        useStore.getState().refetchCargoDePara();
        return res.json();
      })
      .then(() => {
        return this;
      });
  }
}
