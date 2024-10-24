export class CargoBNB {
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

  static getAll(): Promise<CargoBNB[]> {
    return fetch(`${process.env.NEXT_BACKEND_URL}/listarCargosBnb`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        return data as CargoBNB[];
      });
  }
}

export default CargoBNB;
