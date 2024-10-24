"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import useStore from "context/zustand/store";
import SituacaoINEC from "types/situacao/situacaoINEC";
import UnidadeINEC from "types/unidade/unidadeince";
import CargoINEC from "types/cargo/cargoINEC";
import SituacaoBNB from "types/situacao/situacaoBNB";
import UnidadeBNB from "types/unidade/unidadebnb";
import CargoBNB from "types/cargo/cargoBNB";
import Situacaodepara from "types/situacao/situacaodepara";
import Unidadedepara from "types/unidade/unidadedepara";
import Cargodepara from "types/cargo/cargodepara";
import { useSnackbar } from "notistack";

type formData = {
  id?: number;
  codigoBnb: string;
  codigoINEC: string;
};

function ModalInferior({
  open,
  handleClose,
  page,
  item,
}: {
  open: boolean;
  handleClose: () => void;
  page: string;
  item?: Situacaodepara | Unidadedepara | Cargodepara | undefined;
}) {
  let type = "",
    inec: SituacaoINEC[] | UnidadeINEC[] | CargoINEC[] | undefined,
    bnb: SituacaoBNB[] | UnidadeBNB[] | CargoBNB[] | undefined;
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const {
    unidadeINEC,
    unidadeBNB,
    cargoINEC,
    cargoBNB,
    situacaoINEC,
    situacaoBNB,
  } = useStore();

  switch (page) {
    case "1":
      console.log();
      type = "unidade";
      inec = unidadeINEC;
      bnb = unidadeBNB;
      break;
    case "2":
      type = "cargo";
      inec = cargoINEC;
      bnb = cargoBNB;
      break;
    case "3":
      type = "situacao";
      inec = situacaoINEC;
      bnb = situacaoBNB;
      break;
  }

  const [formData, setFormData] = useState<formData>({
    codigoBnb: "",
    codigoINEC: "",
  });

  const handleOpenConfirmDialog = () => setOpenConfirmDialog(true);
  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  useEffect(() => {
    if (item !== undefined) {
      setFormData({
        id: item.id,
        codigoBnb: "" + item.idCodBnb,
        codigoINEC: "" + item.idCodInec,
      });
    }
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    let item: Situacaodepara | Unidadedepara | Cargodepara | undefined;

    switch (page) {
      case "1":
        item = new Unidadedepara();
        item.idCodBnb = formData.codigoBnb;
        item.idCodInec = formData.codigoINEC;

        break;
      case "2":
        item = new Cargodepara();
        item.idCodBnb = +formData.codigoBnb;
        item.idCodInec = +formData.codigoINEC;
        break;
      case "3":
        item = new Situacaodepara();
        item.idCodBnb = +formData.codigoBnb;
        item.idCodInec = +formData.codigoINEC;
        break;
    }

    if (item === undefined) return;

    item
      .save()
      .then(() => {
        switch (page) {
          case "1":
            useStore.getState().refetchUnidadeDePara();
            enqueueSnackbar("Mapeamento de unidade inserido com sucesso.", {
              variant: "success",
            });
            break;
          case "2":
            useStore.getState().refetchCargoDePara();
            enqueueSnackbar("Mapeamento de cargo inserido com sucesso.", {
              variant: "success",
            });
            break;
          case "3":
            useStore.getState().refetchSituacaoDePara();
            enqueueSnackbar("Mapeamento de situacao inserido com sucesso.", {
              variant: "success",
            });
            break;
        }

        setOpenConfirmDialog(false);
        handleClose();
      })
      .catch(() => {
        switch (page) {
          case "1":
            enqueueSnackbar("Falha ao inserir mapeamento de unidade.", {
              variant: "error",
            });
            break;
          case "2":
            enqueueSnackbar("Falha ao inserir mapeamento de cargo.", {
              variant: "error",
            });
            break;
          case "3":
            enqueueSnackbar("Falha ao inserir mapeamento de situacao.", {
              variant: "error",
            });
            break;
        }
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        Adicionar mapeamento de {type}
      </DialogTitle>
      <DialogContent>
        <div className="tw-p-4">
          <FormControl
            fullWidth
            className="tw-mb-4"
            variant="outlined"
          ></FormControl>
          <FormControl fullWidth className="tw-mb-4" variant="outlined">
            <InputLabel>Código BNB</InputLabel>
            <Select
              name="codigoBnb"
              value={formData.codigoBnb}
              onChange={handleChange}
              label="Código BNB"
            >
              {bnb &&
                bnb.map((item) => (
                  <MenuItem key={item.codigo} value={item.codigo}>
                    {item.codigo} - {item.descricao}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className="tw-mb-4" variant="outlined">
            <InputLabel>Código INEC</InputLabel>
            <Select
              name="codigoINEC"
              value={formData.codigoINEC}
              onChange={handleChange}
              label="Código INEC"
            >
              {inec &&
                inec.map((item) => (
                  <MenuItem key={item.codigo} value={item.codigo}>
                    {item.codigo} - {item.descricao}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <DialogActions className="tw-flex tw-justify-between tw-py-6 tw-px-0">
            <Button
              onClick={handleClose}
              className=" tw-text-black tw-border-none tw-rounded tw-px-6 tw-py-2"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              className="tw-rounded tw-h-12 tw-w-44 tw-border-none tw-ml-auto tw-px-2 tw-py-1"
              onClick={handleOpenConfirmDialog}
            >
              Inserir
            </Button>
          </DialogActions>

          {/* Diálogo de Confirmação */}
          <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
            <DialogTitle>Confirmar envio</DialogTitle>
            <DialogActions className="tw-flex tw-justify-between tw-p-6 ">
              <Button
                onClick={handleCloseConfirmDialog}
                className=" tw-text-black tw-border-none tw-rounded tw-px-6 tw-py-2"
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                className="tw-rounded tw-h-12 tw-w-44 tw-border-none tw-ml-auto tw-px-2 tw-py-1"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Inserir
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalInferior;
