export class Unidade {
  codigo: string;
  descricao: string;
  dataInclusao: string;
  status: boolean;

  constructor(codigo = "", descricao = "", dataInclusao = "", status = true) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.dataInclusao = dataInclusao;
    this.status = status;
  }
  static getAll(): Promise<Unidade[]> {
    return fetch(`${process.env.NEXT_BACKEND_URL}/listarUnidadesBnb`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        return data as Unidade[];
      });
  }
}
export default Unidade;
