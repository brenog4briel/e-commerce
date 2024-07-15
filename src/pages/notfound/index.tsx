import { Avatar, Box, Typography } from "@mui/material";
import notfound from "../../assets/pagina_nao_encontrada.jpg"

export function NotFound() {
  return (
     <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center',textAlign:"center",minHeight:"100vh"}}>
          <Typography component="h2" sx={{fontSize:25}}>
            Página não encontrada
          </Typography>
          <Avatar src={notfound} sx={{objectFit:"fill",width:"25%",height:"20%"}}/>
        </Box>
  )
}
