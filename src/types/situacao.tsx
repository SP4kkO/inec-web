export class Situacao {
  idCodInec: number;
  idCodBnb: number;
  descricao: string;
  status: boolean;

  constructor(idCodInec = 0, idCodBnb = 0, descricao = "", status = true) {
    this.idCodInec = idCodInec;
    this.idCodBnb = idCodBnb;
    this.descricao = descricao;
    this.status = status;
  }

  static getAll(): Promise<Situacao[]> {
    return fetch(`${process.env.NEXT_BACKEND_URL}/listarSituacoesInec`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        return data as Situacao[];
      });
  }
}

export default Situacao;
