import React from "react";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import Situacaodepara from "types/situacao/situacaodepara";
import Unidadedepara from "types/unidade/unidadedepara";
import Cargodepara from "types/cargo/cargodepara";
import useStore from "context/zustand/store";
import Historico from "types/historico/Historico";

const isInteger = (value: string) => {
  const num = Number(value);
  return !isNaN(num) && Number.isInteger(num);
};

const BoxInferior = ({
  page,
  setOpen,
  setModalValue,
  filtroDescricao,
}: {
  page: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalValue: React.Dispatch<
    React.SetStateAction<
      Situacaodepara | Unidadedepara | Cargodepara | undefined
    >
  >;
  filtroDescricao: string;
}) => {
  const { cargoDePara, situacaoDePara, unidadeDePara } = useStore();
  let depara: Situacaodepara[] | Unidadedepara[] | Cargodepara[] | undefined;

  switch (page) {
    case "1":
      depara = unidadeDePara;
      break;
    case "2":
      depara = cargoDePara;
      break;
    case "3":
      depara = situacaoDePara;
      break;
    default:
      depara = unidadeDePara;
      break;
  }

  const handleEdit = (
    item: Situacaodepara | Unidadedepara | Cargodepara | Historico,
  ) => {
    if (item instanceof Historico) return;

    setModalValue(item);
    setOpen(true);
  };

  const deparaFiltrados =
    depara?.filter((item) => {
      if (isInteger(filtroDescricao)) {
        const filtroNum = parseInt(filtroDescricao, 10);
        return (
          item.idCodInec === filtroNum ||
          item.idCodBnb === filtroNum ||
          item.idCodInec.toString().includes(filtroDescricao) ||
          item.idCodBnb.toString().includes(filtroDescricao)
        );
      } else {
        return item.descricao
          .toLowerCase()
          .includes(filtroDescricao.toLowerCase());
      }
    }) || [];

  return (
    <div className="tw-w-11/12 tw-relative tw-mx-auto tw-my-3">
      {deparaFiltrados &&
        deparaFiltrados.map((item, index) => {
          return (
            <div key={index} className="tw-flex tw-gap-1 tw-w-full ">
              <div className="tw-w-[20%] tw-self-center tw-text-gray-900">
                {item.descricao}
              </div>
              <div className="tw-w-[15%] tw-self-center tw-text-gray-900">
                {item.idCodInec}
              </div>
              <div className="tw-w-[15%] tw-self-center tw-text-gray-900">
                {item.idCodBnb || ""}
              </div>

              <DropdownMenu item={item} onEdit={handleEdit} />
            </div>
          );
        })}
    </div>
  );
};

export default BoxInferior;
