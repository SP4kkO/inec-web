export class SituacaoINEC {
  codigo: number;
  descricao: string;
  dataInclusao: string;
  status: boolean;

  constructor(codigo = 0, descricao = "", dataInclusao = "", status = true) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.dataInclusao = dataInclusao;
    this.status = status;
  }

  static getAll(): Promise<SituacaoINEC[]> {
    return fetch(`${process.env.NEXT_BACKEND_URL}/listarSituacoesInec`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        return data as SituacaoINEC[];
      });
  }
}

export default SituacaoINEC;
