import React from "react";
import { Box, Modal, Typography } from "@mui/material";

export type IBasicModalProps = {
  isOpen: boolean;
  OpenCloseHandler:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  title: string;
  description: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<IBasicModalProps> = (props) => {
  const { isOpen, OpenCloseHandler, title, description } = props;
  return (
    <Modal
      open={isOpen}
      onClose={OpenCloseHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default BasicModal;
