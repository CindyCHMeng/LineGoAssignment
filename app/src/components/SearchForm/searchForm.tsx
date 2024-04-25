"use client"
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button as MuiButton, InputLabel, OutlinedInput } from '@mui/material';
import { styled } from '@mui/system';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[700],
    },
  },
});

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const StyledForm = styled('form')({
  width: '80%',
  maxHeight: '100%',
  maxWidth: '500px',
  padding: '20px',
  overflow: 'auto',
  borderRadius: '10px',
  border: '1px solid grey',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  backgroundColor: '#ffffff',
});

const FormTitle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0.5rem',
  fontSize: '2rem',
  color: 'rgba(0, 0, 0, 0.8)',
});

const FormSubTitle = styled('div')({
  marginBottom: '0.5rem',
  fontSize: '1.5rem',
  color: 'rgba(0, 0, 0, 0.8)',
});

const StyledOutlinedInput = styled(OutlinedInput)({
  marginBottom: '1rem',
  width: '100%',
});

const StyledMuiButton = styled(MuiButton)({
  marginTop: '1rem',
  width: '100%',
  color: 'white',
});

export type FlightInfo = {
  flightNum: string
  custName: string
  custTEL: string
  custID: string
  custMemo: string
};

export default function SearchForm(props: { flightInfo: FlightInfo, searchFlight: Function }) {
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: props.flightInfo
  });

  useEffect(() => {
    reset(props.flightInfo);
  }, [props.flightInfo]);

  const onSubmit = (data: any) => {
    props.searchFlight(data);
  };

  return (
    <>
      <FormContainer>
        <StyledForm onSubmit={ handleSubmit(onSubmit) }>
          <FormTitle>送機行程</FormTitle>
          <FormSubTitle>送機計畫</FormSubTitle>

          <InputLabel htmlFor="flightLoc">下車機場</InputLabel>
          <StyledOutlinedInput id="flightLoc" disabled={ true } value="桃園國際機場 第一航廈" />

          <InputLabel htmlFor="flightNum">航班編號</InputLabel>
          <StyledOutlinedInput
            id="flightNum"
            error={ !!errors?.flightNum }
            {...register('flightNum', {
              required: true,
              pattern: /^[A-Za-z0-9]*$/
            })}
          />

          <FormSubTitle>旅客資訊</FormSubTitle>

          <InputLabel htmlFor="custName">姓名</InputLabel>
          <StyledOutlinedInput
            id="custName"
            error={ !!errors?.custName }
            {...register('custName', {
              required: true,
              pattern: /^[A-Za-z\s]*$/
            })}
          />

          <InputLabel htmlFor="custTEL">電話</InputLabel>
          <StyledOutlinedInput
            id="custTEL"
            error={ !!errors?.custTEL }
            {...register('custTEL', {
              required: true,
              pattern: /^[0-9]*$/
            })}
          />

          <InputLabel htmlFor="custID">身分證字號 / 護照編號</InputLabel>
          <StyledOutlinedInput
            id="custID"
            error={ !!errors?.custID }
            {...register('custID', {
              required: true,
              pattern: /^[A-Za-z0-9]*$/
            })}
          />

          <InputLabel htmlFor="custMemo">乘車備註</InputLabel>
          <StyledOutlinedInput
            id="custMemo"
            multiline={ true }
            rows="3"
            { ...register('custMemo') }
          />

          <ThemeProvider theme={ theme }>
            <StyledMuiButton
              type="submit"
              variant="contained"
              color='primary'
            >
              下一步
            </StyledMuiButton>
          </ThemeProvider>
        </StyledForm>
      </FormContainer>
    </>
  );
}