import { Box, Button, Stack } from "@mui/material";

export function Contato() {
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"space-evenly",padding:10,minHeight:"100vh", textAlign:"flex-start",backgroundColor:"white"}}>
      <h4>Olá, me chamo Breno Gabriel, sou um graduando em Ciência da Computação pela Universidade Federal de Sergipe</h4> <br/>
      <h4>Sempre entusiasta de games, possivelmente surgiu daí a inspiração para seguir a carreira na área de TI </h4>
      <Stack direction="row" width='50%' display="flex" justifyContent="space-evenly" alignItems='center'>
        <Button variant="contained" sx={{backgroundColor:"white",color:"blue","&:hover":{backgroundColor:"white",color:"blue"}}} href="https://www.linkedin.com/in/breno-gabriel-da-silva-sacerdote" target="_blank">Linkedin</Button>
        <Button variant="contained" sx={{backgroundColor:"white",color:"blue","&:hover":{backgroundColor:"white",color:"blue"}}} href="https://github.com/brenog4briel" target="_blank">Github</Button>
      </Stack>
      <h4>Email para contato: brenosacerdotr@gmail.com</h4>

    </Box> 
    )
}
