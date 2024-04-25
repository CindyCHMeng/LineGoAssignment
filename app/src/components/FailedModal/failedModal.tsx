"use client"
import React from 'react';
import { styled } from '@mui/system';
import {
  Modal,
  Box,
  Typography,
  Button as MuiButton
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[700],
    },
  },
});

const style = {
  position: 'absolute' as 'absolute',
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

const StyledMuiButton = styled(MuiButton)({
  marginTop: '1rem',
  width: '100%',
  color: 'white',
});

const StyledMuiOutlinedButton = styled(MuiButton)({
  marginTop: '1rem',
  width: '100%',
  color: 'grey',
});

export default function failedModal(
  props: {
    open: boolean,
    closeModal: Function,
    resetForm: Function,
    confirm: Function,
    flightNum: string
  }
) {
  const handleClose = () => {
    if (props.closeModal)
      props.closeModal();
  };

  const handleReset = () => {
    if (props.resetForm)
      props.resetForm();
  };

  const handleConfirm = (data: any) => {
    if (props.confirm)
      props.confirm();
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            查不到「{ props.flightNum }」航班資訊
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            請確認航班資訊、起飛時間等。你也可以直接填寫此航班作為機場接送資訊。
          </Typography>
          <ThemeProvider theme={ theme }>
            <StyledMuiButton
              variant="contained"
              onClick={ handleConfirm }
            >
              確認航班資訊，並送出
            </StyledMuiButton>
            <StyledMuiOutlinedButton
              variant="outlined"
              onClick={ handleReset }
            >
              重新填寫
            </StyledMuiOutlinedButton>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
}
