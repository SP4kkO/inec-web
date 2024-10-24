import useStore from "context/zustand/store";

export default class Unidadedepara {
  idCodInec: string;
  idCodBnb: string;
  descricao: string;
  status: boolean;
  id?: number;

  constructor({
    idCodInec = "",
    idCodBnb = "",
    descricao = "",
    status = true,
    id = undefined,
  }: {
    idCodInec?: string;
    idCodBnb?: string;
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

  static getAll(): Promise<Unidadedepara[]> {
    return fetch(`${process.env.NEXT_BACKEND_URL}/listarUnidadesDePara`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        return data as Unidadedepara[];
      })
      .then((resp) => {
        return resp.map((item) => new Unidadedepara({ ...item }));
      });
  }

  save(): Promise<Unidadedepara> {
    const url = `${process.env.NEXT_BACKEND_URL}/salvarUnidadeDePara`;
    const method = this.id ? "PUT" : "POST";

    if (!this.idCodBnb || !this.idCodInec) {
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
      useStore.getState().refetchUnidadeDePara();
      return this;
    });
  }

  delete(): Promise<Unidadedepara> {
    const url = `${process.env.NEXT_BACKEND_URL}/excluirUnidadeDePara`;

    if (!this.idCodBnb || !this.idCodInec) {
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
        useStore.getState().refetchUnidadeDePara();
        return res.json();
      })
      .then(() => {
        return this;
      });
  }
}
