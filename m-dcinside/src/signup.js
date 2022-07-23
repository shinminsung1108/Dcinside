import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Validator from './validator/index';
import axios from 'axios'

const Register = () => {
  const theme = createTheme();

  // form 전송
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationresult = Validator.email({
      email: email,
      password: password
    })

    const result = Object.keys(validationresult).some((vdr) => {
      if(validationresult[vdr].message === null) {}
    })

    if(!result && password === oneMorePassword) {
      axios.post('/signup', 
      { name : name, password: password, email: email})
    }
    console.log(result)
  };

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  //유효성 검사
  const [oneMorePassword, setOneMorePassword] = useState('');
  const [email, setEmail] = useState(''); 

  const handleName = (event) => setName(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)
  const handleRealPassword = (event) => setOneMorePassword(event.target.value)
  const handleEmail = (event) => setEmail(event.target.value)


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField required fullWidth id="name" name="name" label="이름" 
                   value={name} onChange={handleName}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    onChange={handlePassword}
                    value={password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    onChange={handleRealPassword}
                    value={oneMorePassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    onChange={handleEmail}
                    value={email}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"

              >
                회원가입
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Register;