"use client";
import React, { useState } from "react";
import { Tabs, Tab, Button, Divider, TextField } from "@mui/material";
import ModalInferior from "./modal/Modal";
import BoxInferior from "./box-dados";
import Situacaodepara from "types/situacao/situacaodepara";
import Cargodepara from "types/cargo/cargodepara";
import Unidadedepara from "types/unidade/unidadedepara";
const Index = () => {
  const [value, setValue] = React.useState("1");
  const [modalValue, setModalValue] = useState<
    Situacaodepara | Unidadedepara | Cargodepara | undefined
  >();
  const [open, setOpen] = React.useState(false);
  const [filtroDescricao, setFiltroDescricao] = useState<string>("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setModalValue(undefined);
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setModalValue(undefined);
    setFiltroDescricao("");
  };

  const handleFiltroChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFiltroDescricao(e.target.value);
  };

  return (
    <div className="tw-h-full tw-w-full tw-flex tw-flex-col">
      <div className="tw-flex tw-h-14 tw-w-full tw-mb-auto tw-ml-0">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Unidade" value="1" />
          <Tab label="Cargo" value="2" />
          <Tab label="Situacao" value="3" />
        </Tabs>
        <TextField
          className=" tw-rounded tw-relative tw-h-14 tw-border-none"
          id="outlined-basic"
          label="Descrição/Código"
          variant="outlined"
          name="matricula"
          type="text"
          value={filtroDescricao}
          onChange={handleFiltroChange}
          // InputProps={{
          //   endAdornment: (
          //     <IconButton type="submit">
          //       <SearchIcon />
          //     </IconButton>
          //   ),
          // }}
        />

        <Button
          variant="contained"
          className="tw-rounded tw-h-10 tw-border-none tw-px-2 tw-py-1 tw-my-auto tw-ml-auto"
          onClick={handleClickOpen}
        >
          + Mapear{" "}
          {value === "1" ? "unidade" : value === "2" ? "cargo" : "situacao"}
        </Button>
        {open && (
          <ModalInferior
            open={open}
            handleClose={handleClose}
            page={value}
            item={modalValue}
          />
        )}
      </div>

      <div className="tw-h-5/6 tw-w-full tw-rounded-xl tw-bg-white tw-drop-shadow-default-1 tw-mt-4 tw-overflow-hidden">
        <div className="tw-h-full tw-w-full tw-rounded-xl tw-bg-white tw-drop-shadow-default-1 tw-overflow-y-scroll tw-mb-2">
          <div className="tw-w-11/12 tw-relative tw-mx-auto">
            <ul className="tw-inline-flex tw-gap-1 tw-w-full tw-list-none tw-my-3 tw-text-gray-400">
              <li className="tw-w-[20%]">Descrição</li>
              <li className="tw-w-[15%]">Código INEC</li>
              <li className="tw-w-[15%]">Código BNB</li>
              <li className="tw-w-[10%]">Ações</li>
            </ul>
          </div>

          <Divider className="tw-w-[98%] tw-mx-auto" />

          <BoxInferior
            page={value}
            setOpen={handleClickOpen}
            setModalValue={setModalValue}
            filtroDescricao={filtroDescricao}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
