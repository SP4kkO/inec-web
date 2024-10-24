"use client";

import React, { useEffect, useState } from "react";
import { TextField, Button, Divider } from "@mui/material";
import HistoricoModal from "./Modal";
import dayjs from "dayjs";
import DropMenu from "../../components/DropdownMenu/DropdownMenu";
import DetalhesBnbModal from "./Modal/DetalhesBNB";
import Historico from "types/historico/Historico";
import useStore from "context/zustand/store";
import Situacaodepara from "types/situacao/situacaodepara";
import Cargodepara from "types/cargo/cargodepara";
import Unidadedepara from "types/unidade/unidadedepara";
import CargoBNB from "types/cargo/cargoBNB";
import SituacaoBNB from "types/situacao/situacaoBNB";
import UnidadeBNB from "types/unidade/unidadebnb";

const page = () => {
  const [open, setOpen] = useState(false);
  const [histEdit, sethistEdit] = useState<Historico | undefined>();
  const { historico } = useStore();
  const [matricula, setMatricula] = useState("");
  const [openDetalhesBnbModal, setOpenDetalhesBnbModal] = useState(false);

  const [cargoBnbMap, setCargoBnbMap] = useState<Map<number, CargoBNB>>(
    new Map(),
  );
  const [situacaoBnbMap, setSituacaoBnbMap] = useState<
    Map<number, SituacaoBNB>
  >(new Map());
  const [unidadeBnbMap, setUnidadeBnbMap] = useState<Map<number, UnidadeBNB>>(
    new Map(),
  );

  const { cargoBNB, unidadeBNB, situacaoBNB } = useStore();

  useEffect(() => {
    const buscarCargoBnb = async () => {
      const map = new Map(cargoBNB?.map((cargo) => [cargo.codigo, cargo]));
      setCargoBnbMap(map);
    };
    const buscarSituacaoBnb = async () => {
      const map = new Map(situacaoBNB?.map((cargo) => [cargo.codigo, cargo]));
      setSituacaoBnbMap(map);
    };
    const buscarUnidadeBnb = async () => {
      const map = new Map(unidadeBNB?.map((cargo) => [cargo.codigo, cargo]));
      setUnidadeBnbMap(map);
    };

    buscarCargoBnb();
    buscarSituacaoBnb();
    buscarUnidadeBnb();
  }, [situacaoBNB, unidadeBNB, cargoBNB]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    sethistEdit(undefined);
  };

  const handleEdit = (
    item: Situacaodepara | Unidadedepara | Cargodepara | Historico,
  ) => {
    if (
      item instanceof Situacaodepara ||
      item instanceof Unidadedepara ||
      item instanceof Cargodepara
    )
      return;
    sethistEdit(item);
    setOpen(true);
  };

  // Renderizar lista de histórico

  const renderHistoricoList = () => {
    const historicoFiltrado = matricula.trim()
      ? historico?.filter((item) =>
          item.matricula.toString().includes(matricula),
        )
      : historico;

    if (!historicoFiltrado?.length) {
      return (
        <div className="tw-flex tw-justify-center tw-my-2 tw-py-2">
          Não há dados disponíveis.
        </div>
      );
    }
    return historico?.map((item, index) => (
      <div
        key={index}
        className="tw-inline-flex tw-gap-1 tw-w-full tw-list-none tw-text-black "
      >
        <div
          className="tw-w-[10%] tw-self-center tw-overflow-hidden tw-truncate overflow-ellipsis tw-whitespace-nowrap"
          title={`${item.matricula}`}
        >
          {item.matricula}
        </div>
        <div
          className="tw-w-[18%] tw-self-center tw-overflow-hidden tw-truncate overflow-ellipsis tw-whitespace-nowrap"
          title={`${item.nome}`}
        >
          {item.nome}
        </div>
        <div
          className="tw-w-[10%] tw-self-center tw-overflow-hidden tw-truncate overflow-ellipsis tw-whitespace-nowrap"
          title={`${item.codCargo} - ${cargoBnbMap.get(Number(item.codCargo))?.descricao || "Descrição não encontrada"} `}
        >
          {item.codCargo}
         
        </div>
        <div
          className="tw-w-[10%] tw-self-center tw-overflow-hidden tw-truncate overflow-ellipsis tw-whitespace-nowrap"
          title={` ${item.unidade} - ${unidadeBnbMap.get(Number(item.unidade))?.descricao || "Descrição não encontrada"}`}
        >
          {item.unidade}
         
        </div>
        <div
          className="tw-w-[10%] tw-self-center tw-overflow-hidden tw-truncate overflow-ellipsis tw-whitespace-nowrap"
          title={`${item.codSituacao} - ${situacaoBnbMap.get(Number(item.codSituacao))?.descricao || "Descrição não encontrada"}`}
        >
          {item.codSituacao}
        </div>
        <div
          className="tw-w-[10%] tw-self-center tw-overflow-hidden tw-truncate overflow-ellipsis tw-whitespace-nowrap"
          title={`${item.dataInicioFuncao}`}
        >
          {dayjs(item.dataInicioFuncao).format("DD/MM/YYYY")}
        </div>
        <div
          className="tw-w-[10%] tw-self-center tw-overflow-hidden tw-truncate overflow-ellipsis tw-whitespace-nowrap"
          title={`${item.dataFimFuncao}`}
        >
          {dayjs(item.dataFimFuncao).format("DD/MM/YYYY")}
        </div>
        <div
          className="tw-w-[10%] tw-self-center tw-overflow-hidden tw-truncate overflow-ellipsis tw-whitespace-nowrap"
          title={`${item.mensagemRetornoBanco}`}
        >
          {item.mensagemRetornoBanco}
        </div>
        <div
          className="tw-w-[5%] tw-self-center tw-overflow-hidden tw-truncate overflow-ellipsis tw-whitespace-nowrap"
          title={`${item.matricula}`}
        >
          <DropMenu item={item} onEdit={handleEdit} />
        </div>
      </div>
    ));
  };

  return (
    <div className="tw-h-full tw-w-full tw-flex tw-flex-col">
      <div className="tw-flex tw-gap tw-h-14 tw-w-full tw-mb-auto tw-justify-between">
        <div>
          <TextField
            className="tw-rounded tw-relative tw-h-14 tw-border-none tw-my-auto"
            id="outlined-basic"
            label="Matricula/CPF"
            variant="outlined"
            name="matricula"
            value={matricula}
            onChange={(event) => setMatricula(event.target.value)}
            // InputProps={{
            //   endAdornment: (
            //     <IconButton type="submit">
            //       <SearchIcon />
            //     </IconButton>
            //   ),
            // }}
          />
          {matricula && (
            <Button
              variant="contained"
              className="tw-rounded tw-h-14 tw-border-none tw-px-2 tw-py-1 tw-my-auto tw-ml-2"
              onClick={() => setOpenDetalhesBnbModal(true)}
            >
              Detalhes BNB
            </Button>
          )}

          {openDetalhesBnbModal && (
            <DetalhesBnbModal
              open={openDetalhesBnbModal}
              handleClose={() => setOpenDetalhesBnbModal(false)}
              matricula={matricula}
            />
          )}
        </div>
        <Button
          variant="contained"
          className="tw-rounded tw-h-10 tw-border-none tw-px-2 tw-py-1 tw-my-auto"
          onClick={() => {
            handleClickOpen();
          }}
        >
          + Adicionar ao histórico
        </Button>

        {open && (
          <HistoricoModal
            open={open}
            handleClose={handleClose}
            matricula={matricula}
            hist={histEdit}
          />
        )}
      </div>
      <div className="tw-h-5/6 tw-w-full tw-rounded-xl tw-bg-white tw-drop-shadow-default-1 tw-mt-4 tw-overflow-hidden">
        <div className="tw-h-full tw-w-full tw-rounded-xl tw-bg-white tw-drop-shadow-default-1 tw-overflow-y-scroll tw-mb-2">
          <div className="tw-w-11/12 tw-relative tw-mx-auto">
            <ul className="tw-inline-flex tw-gap-1 tw-w-full tw-list-none tw-my-3 tw-text-gray-400">
              <li className="tw-w-[10%]">Matricula</li>
              <li className="tw-w-[18%]">Nome</li>
              <li className="tw-w-[10%]">Funções</li>
              <li className="tw-w-[10%]">Unidade</li>
              <li className="tw-w-[10%]">Situação</li>
              <li className="tw-w-[10%]">Data inicial</li>
              <li className="tw-w-[10%]">Data retorno</li>
              <li className="tw-w-[10%]">Mensagem</li>
              <li className="tw-w-[5%]">Ações</li>
            </ul>
          </div>

          <Divider className="tw-w-[98%] tw-mx-auto" />
          <div className="tw-w-11/12 tw-relative tw-mx-auto">
            {renderHistoricoList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
