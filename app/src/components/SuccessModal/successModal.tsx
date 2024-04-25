"use client"
import React from 'react';
import {
  Modal,
  Box,
  Typography
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const style = {
  position: 'absolute' as 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  bottom: '0',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: 500,
  border: '1px solid grey',
  bgcolor: 'background.paper',
  color: 'rgba(0, 0, 0, 0.8)',
  boxShadow: 24,
  p: 4,
};

export default function successModal(props: { open: boolean, closeModal: Function }) {
  const handleClose = (data: any) => {
    if (props.closeModal)
      props.closeModal();
  };

  return (
    <>
      <Modal
        open={ props.open }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ style }>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 84 }} />
          <Typography id="modal-modal-title" variant="h6" sx={{ mt: 2 }}>
            完成送機行程
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
