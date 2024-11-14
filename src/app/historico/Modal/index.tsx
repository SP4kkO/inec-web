import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  SelectChangeEvent,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";
import Historico from "types/historico/Historico";
import { useSnackbar } from "notistack";

import useStore from "context/zustand/store";

type HistType = {
  id?: number;
  matricula: string;
  matriculaBnb: string;
  nome: string;
  codCargo: string;
  CodUnidade: string;
  codSituacao: string;
  dataInicioFuncao: Dayjs;
  dataFimFuncao: Dayjs;
  status: string;
  cpfAssessor: string;
  mensagemRetornoBanco: string;
};

const HistoryModal = ({
  handleClose,
  open,
  matricula,
  hist,
}: {
  handleClose: () => void;
  open: boolean;
  matricula?: string | undefined;
  hist?: Historico | undefined;
}) => {
  const { unidadeBNB, situacaoBNB, cargoBNB } = useStore();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = ({
    key,
    value,
  }: {
    key: string;
    value: Dayjs | null;
  }) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [formData, setFormData] = useState<HistType>({
    id: undefined,
    matricula: matricula ? matricula : "",
    matriculaBnb: "",
    nome: "",
    codCargo: "",
    CodUnidade: "",
    codSituacao: "",
    dataInicioFuncao: dayjs(),
    dataFimFuncao: dayjs(),
    status: "",
    cpfAssessor: "",
    mensagemRetornoBanco: "",
  });

  useEffect(() => {
    if (hist !== undefined) {
      setFormData({
        id: hist.id,
        matricula: "" + hist.matricula,
        matriculaBnb: hist.matriculaBnb,
        nome: hist.nome,
        codCargo: hist.cargo,
        CodUnidade: hist.unidade,
        codSituacao: hist.situacao,
        dataInicioFuncao: hist.dataInicioFuncao,
        dataFimFuncao: hist.dataFimFuncao,
        status: hist.status,
        cpfAssessor: hist.cpfAssessor,
        mensagemRetornoBanco: hist.mensagemRetornoBanco,
      });
    }
  }, []);

  const onSave = () => {
    const item = new Historico();

    if ("id" in formData) {
      item.id = formData.id as number;
    }
    item.matricula = +formData.matricula
      .replaceAll(".", "")
      .replaceAll("-", "");
    item.matriculaBnb = formData.matriculaBnb;
    item.nome = formData.nome;
    item.cargo = formData.codCargo;
    item.unidade = formData.CodUnidade;
    item.situacao = formData.codSituacao;
    item.dataInicioFuncao = formData.dataInicioFuncao;
    item.dataFimFuncao = formData.dataFimFuncao;
    item.status = formData.status;
    item.cpfAssessor = formData.cpfAssessor;
    item.mensagemRetornoBanco = formData.mensagemRetornoBanco;

    item
      .save()
      .then((response) => {
        console.log("Dados salvos com sucesso:", response);
        useStore.getState().refetchHistorico();
        enqueueSnackbar("Historico salvo com sucesso", {
          variant: "success",
        });
        handleClose();
      })
      .catch((error) => {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        } else {
          console.error("Falha ao salvar dados:", error);
          enqueueSnackbar("Falha ao salvar historico", {
            variant: "error",
          });
        }
      });
  };

  return (
    <Dialog
      className="tw-mx-auto tw-my-auto tw-rounded-lg tw-overflow-hidden"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          width: "840px",
          maxWidth: "100%",
          borderRadius: "8px",
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        className="tw-text-3xl tw-font-semibold tw-py-4 tw-px-6 tw-text-left tw-mt-7 tw-mb-7 "
      >
        Adicionar ao histórico
      </DialogTitle>
      <DialogContent className="tw-px-6 tw-py-4 tw-mb-4 tw-flex tw-gap-6 tw-flex-col">
        <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-3">
          <FormControl fullWidth variant="outlined" className="tw-col-span-1">
            <TextField
              className="tw-h-14 tw-border-none"
              id="outlined-basic"
              label="Matricula/CPF"
              variant="outlined"
              name="matricula"
              value={formData.matricula}
              onChange={(event) => {
                setFormData({ ...formData, matricula: event.target.value });
              }}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined" className="tw-col-span-1">
            <InputLabel id="cargo-label">Cargo</InputLabel>
            <Select
              labelId="cargo-label"
              id="cargo-select"
              name="codCargo"
              value={formData.codCargo}
              onChange={handleChange}
              label="Cargo"
            >
              {cargoBNB &&
                cargoBNB.map((cargo) => (
                  <MenuItem key={cargo.codigo} value={cargo.codigo}>
                    {cargo.descricao}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="tw-grid tw-grid-cols-2 tw-gap-4">
          <FormControl fullWidth>
            <InputLabel id="situation-label">Situação</InputLabel>
            <Select
              labelId="situation-label"
              id="situation-select"
              name="codSituacao"
              value={formData.codSituacao}
              onChange={handleChange}
              label="Situação"
            >
              {situacaoBNB &&
                situacaoBNB.map((situacao) => (
                  <MenuItem key={situacao.codigo} value={situacao.codigo}>
                    {situacao.descricao}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="unit-label">Unidade</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              name="CodUnidade"
              value={formData.CodUnidade}
              onChange={handleChange}
              label="Unidade"
            >
              {unidadeBNB &&
                unidadeBNB.map((unidade) => (
                  <MenuItem key={unidade.codigo} value={unidade.codigo}>
                    {unidade.descricao}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="tw-grid tw-grid-cols-2 tw-gap-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="tw-h-14 tw-w-full tw-p-0"
              label="Data início"
              value={formData.dataInicioFuncao}
              onChange={(value) => {
                handleDateChange({ value, key: "dataInicioFuncao" });
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="tw-h-14 tw-w-full tw-p-0"
              label="Data retorno"
              value={formData.dataFimFuncao}
              onChange={(value) => {
                handleDateChange({ value, key: "dataFimFuncao" });
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </div>
      </DialogContent>

      <DialogActions className="tw-flex tw-justify-between tw-p-6 ">
        <Button
          onClick={handleClose}
          className=" tw-text-black tw-border-none tw-rounded tw-px-6 tw-py-2"
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          className="tw-rounded tw-h-12 tw-w-44 tw-border-none tw-ml-auto tw-px-2 tw-py-1"
          onClick={() => {
            onSave();
          }}
        >
          Inserir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistoryModal;
