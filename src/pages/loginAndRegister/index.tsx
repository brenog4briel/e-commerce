import styles from "./loginAndRegister.module.css"
import {useForm} from "react-hook-form"
import { LoginSchema,loginSchema } from "../../validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, CircularProgress, IconButton, InputAdornment, Tab, Tabs, TextField, Typography } from "@mui/material";
import { RegistroSchema, registroSchema } from "../../validations/register";
import AxiosInstance from "../../axiosInstance";
import { Popup } from "../../components/popup";
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

interface IRequestError {
  mensagem:string;
  sucesso:boolean;
}

export function LoginAndRegister() {
  
  const navigate = useNavigate();
  const {Authenticate} = useAuth();
  const [emailLogin,setEmailLogin] = useState<string>("")
  const [senhaLogin,setSenhaLogin] = useState<string>("")

  const [emailRegistro,setEmailRegistro] = useState<string>("")
  const [senhaRegistro,setSenhaRegistro] = useState<string>("")
  const [endereco,setEndereco] = useState<string>("")
  const [CEP,setCEP] = useState<string>("")
  const [nome,setNome] = useState<string>("")


  const [loginLoading,setLoginLoading] = useState<boolean>(false);
  const [registerLoading,setRegisterLoading] = useState<boolean>(false);
  const [loginError,setLoginError] = useState<boolean | undefined>(undefined)
  const [registroError,setRegistroError] = useState<boolean | undefined>(undefined)

  const [loginRequestError,setLoginRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})
  const [registerRequestError,setRegisterRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})

  const {register:loginRegister,handleSubmit:handleSubmitLogin,formState:{errors:login_errors}} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  function counterTimePopup() {
    setTimeout(() => {
      setLoginError(undefined);
      setRegistroError(undefined)
    },3000)
  }

  const [isPasswordVisible,setIsPaswordVisible] = useState<boolean>(false)

  const handlePasswordVisibility = () => {
    setIsPaswordVisible((oldValue => !oldValue))
  }

  async function Auth({email,senha}: LoginSchema) {
    setLoginLoading(true);
    Authenticate({email,senha})
    .then(() => {
      setLoginError(false);
      setLoginLoading(false);
      navigate("/")
    })
    .catch((err) => {
      console.log(err.response.data.message);
      setLoginRequestError(prev => ({...prev,mensagem:err.response.data.message,sucesso:false}))
      setLoginError(true);
      setLoginLoading(false);
      setEmailLogin("")
      setSenhaLogin("")
      counterTimePopup()
    })
  }

const [tabValue, setTabValue] = useState<number>(0);

const handleChangeTab = (event: React.SyntheticEvent, tab: number) => {
  setTabValue(tab);
  setIsPaswordVisible(false)
};


const {register:signupRegister,handleSubmit:handleSubmitRegister,formState:{errors:register_errors}} = useForm<RegistroSchema>({
  resolver: zodResolver(registroSchema)
});

async function RegisterUser({nome,senha,email,endereco,CEP} : RegistroSchema) {
  setRegisterLoading(true);
  AxiosInstance.post('/usuarios', {nome,senha,email,endereco,CEP})
  .then(() => {
    console.log("Usuário cadastrado com sucesso"); 
    setRegisterRequestError(prev => ({...prev,mensagem:"Usuário cadastrado com sucesso",sucesso:true}))
    setRegistroError(false)
    setRegisterLoading(false);
    counterTimePopup()
    navigate("/")
  })
  .catch((err) => {
    console.log(err.response.data.message);
    setRegisterRequestError(prev => ({...prev,mensagem:err.response.data.message,sucesso:false}))
    setRegistroError(true)
    setRegisterLoading(false);
    setEmailRegistro("")
    setSenhaRegistro("")
    counterTimePopup()

  });
}

  return (
    <div className={styles.container}>
        <div className={styles.containerUser}>

        <Tabs value={tabValue} onChange={handleChangeTab}>
          <Tab label="Entrar" sx={{width:"50%"}}/>
          <Tab label="Registrar" sx={{width:"50%"}}/>
        </Tabs>
          <Box sx={{display:"flex",flexDirection:"column", justifyItems:"center",alignItems:"center",margin:"30px 0"}}>
            <Typography variant="h5" sx={{fontWeight:"800"}}>Bem vindo ao E-commerce</Typography>
          </Box>
        {tabValue === 0 ? 
          <Box sx={{display:"flex",flexDirection:"column", justifyItems:"center",alignItems:"center",gap:"20px"}}>
            
            <TextField
              autoComplete="off" 
              fullWidth
              size="small"
              error={login_errors.email ? true:  false}
              helperText={login_errors.email? login_errors.email.message : ""}
              placeholder="Email" 
              {...loginRegister("email")} 
              value={emailLogin} 
              onChange={(e) => setEmailLogin(e.target.value)} 
              InputProps={
                {endAdornment: 
                        <InputAdornment position="end">
                            <EmailIcon sx={{cursor:"pointer"}}/>
                        </InputAdornment>,
                }}/>

            <TextField
              autoComplete="off" 
              fullWidth
              size="small"
              error={login_errors.senha ? true:  false}
              helperText={login_errors.senha? login_errors.senha.message : ""}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Senha" 
              {...loginRegister("senha")} 
              value={senhaLogin} 
              onChange={(e) => setSenhaLogin(e.target.value)} 
              InputProps={
                {endAdornment: 
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordVisibility}>
                            <VisibilityIcon sx={{cursor:"pointer"}}/>
                          </IconButton>
                        </InputAdornment>,
                }}
                />
              <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <Typography component="a" sx={{textDecoration:"none", cursor:"pointer",color:"#006ca5"}} onClick={() => navigate("/recuperacao")}>Esqueceu sua senha?</Typography>
              </Box>
              {(tabValue === 0 && !loginLoading) && <Button type="submit" variant="contained" sx={{backgroundColor:"green","&:hover":{backgroundColor:"green"}}} name="Entrar" onClick={handleSubmitLogin(Auth)}>Entrar</Button>} 
              {(tabValue === 0 && loginLoading) && <CircularProgress size={25} />}
          </Box>
        :
              
        <Box sx={{display:"flex",flexDirection:"column", justifyItems:"center",alignItems:"center",gap:"20px"}}>
               <TextField
                 autoComplete="off" 
              fullWidth
              error={register_errors.nome ? true:  false}
              helperText={register_errors.nome? register_errors.nome.message : ""}
              size="small"
              type="text"
              placeholder="Nome" 
              {...signupRegister("nome")} 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              InputProps={
                {endAdornment: 
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordVisibility}>
                            <PermIdentityIcon sx={{cursor:"pointer"}}/>
                          </IconButton>
                        </InputAdornment>,
                }}
                />
               <TextField
                 autoComplete="off" 
              fullWidth
              error={register_errors.senha ? true:  false}
              helperText={register_errors.senha? register_errors.senha.message : ""}
              size="small"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Senha" 
              {...signupRegister("senha")} 
              value={senhaRegistro} 
              onChange={(e) => setSenhaRegistro(e.target.value)} 
              InputProps={
                {endAdornment: 
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordVisibility}>
                            <VisibilityIcon sx={{cursor:"pointer"}}/>
                          </IconButton>
                        </InputAdornment>,
                }}
                />
               <TextField
                 autoComplete="off" 
              fullWidth
              error={register_errors.email ? true:  false}
              helperText={register_errors.email? register_errors.email.message : ""}
              size="small"
              type="email"
              placeholder="Email" 
              {...signupRegister("email")} 
              value={emailRegistro} 
              onChange={(e) => setEmailRegistro(e.target.value)}
              InputProps={
                {endAdornment: 
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordVisibility}>
                            <EmailIcon sx={{cursor:"pointer"}}/>
                          </IconButton>
                        </InputAdornment>,
                }}
                />
              <TextField
                autoComplete="off" 
              fullWidth
              error={register_errors.endereco ? true:  false}
              helperText={register_errors.endereco? register_errors.endereco.message : ""}
              size="small"
              type="text"
              placeholder="Endereço" 
              {...signupRegister("endereco")} 
              value={endereco} 
              onChange={(e) => setEndereco(e.target.value)}
              InputProps={
                {endAdornment: 
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordVisibility}>
                            <HomeIcon sx={{cursor:"pointer"}}/>
                          </IconButton>
                        </InputAdornment>,
                }}
                />
               <TextField
                 autoComplete="off" 
              fullWidth
              error={register_errors.CEP ? true:  false}
              helperText={register_errors.CEP? register_errors.CEP.message : ""}
              size="small"
              type="text"
              placeholder="CEP" 
              {...signupRegister("CEP")} 
              value={CEP} 
              onChange={(e) => setCEP(e.target.value)}
              InputProps={
                {endAdornment: 
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordVisibility}>
                            <LocationCityIcon sx={{cursor:"pointer"}}/>
                          </IconButton>
                        </InputAdornment>,
                }}
                />
              {(tabValue === 1 && !registerLoading) && <Button type="submit" variant="contained" sx={{backgroundColor:"green","&:hover":{backgroundColor:"green"}}} onClick={handleSubmitRegister(RegisterUser)}>Registrar</Button>} 
              {(tabValue === 1 && registerLoading) && <CircularProgress size={25} />}
        </Box>
      }
        </div>  
        
        {((loginError === true) || (loginError === false)) && <Popup mensagem={loginRequestError.mensagem} sucesso={loginRequestError.sucesso}/>}
        {((registroError === true) || (registroError === false)) && <Popup mensagem={registerRequestError.mensagem} sucesso={registerRequestError.sucesso}/>}
        

    </div>
  )
}


