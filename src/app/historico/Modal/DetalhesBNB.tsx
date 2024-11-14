import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Historico from "types/historico/Historico";
import dayjs from "dayjs";

const DetalhesBnbModal = ({
  open,
  handleClose,
  matricula,
}: {
  open: boolean;
  handleClose: () => void;
  matricula: string;
}) => {
  const [detalhesBnb, setDetalhesBnb] = useState<Historico | undefined>(
    undefined,
  );

  useEffect(() => {
    const url = `${process.env.NEXT_BACKEND_URL}/recuperarUltimoHistoricoBnb?matriculaOuCpf=${matricula}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if ("error" in data) {
          setDetalhesBnb(undefined);
        } else {
          setDetalhesBnb(data as Historico);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes BNB:", error);
        setDetalhesBnb(undefined);
      });
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>Detalhes BNB</DialogTitle>
      <DialogContent>
        {detalhesBnb === undefined ? (
          <Typography>Não existe essa matrícula ou campo vazio.</Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Nome:</strong> {detalhesBnb.nome}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Matrícula:</strong> {detalhesBnb.matricula}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Matrícula BNB:</strong> {detalhesBnb.matriculaBnb}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Data Início Função:</strong>{" "}
                {dayjs(detalhesBnb.dataInicioFuncao).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Data Fim Função:</strong>{" "}
                {dayjs(detalhesBnb.dataFimFuncao).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Unidade:</strong> {detalhesBnb.unidade}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Cargo:</strong> {detalhesBnb.cargo}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Situação:</strong> {detalhesBnb.situacao}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>CPF Assessor:</strong> {detalhesBnb.cpfAssessor}
              </Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <Button onClick={handleClose}>Fechar</Button>
    </Dialog>
  );
};

export default DetalhesBnbModal;
