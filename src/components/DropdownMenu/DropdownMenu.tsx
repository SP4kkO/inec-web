import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton"; // Adicionado para uso com ícone
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Importe o ícone
import Historico from "types//historico/Historico";
import Situacaodepara from "types/situacao/situacaodepara";
import Unidadedepara from "types/unidade/unidadedepara";
import Cargodepara from "types/cargo/cargodepara";

function DropdownMenu({
  onEdit,
  item,
}: {
  item: Situacaodepara | Unidadedepara | Cargodepara | Historico;
  onEdit: (
    item: Situacaodepara | Unidadedepara | Cargodepara | Historico,
  ) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="tw-w-[31%]">
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            onEdit(item);
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            item.delete();
          }}
        >
          Deletar
        </MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu;
