import { Box } from "@mui/material";

export function Sobre() {
  return (
     <Box sx={{display:"flex",flexDirection:"column",alignItems:"flex-start", padding:10,minHeight:"100vh", textAlign:"flex-start",backgroundColor:"white"}}>
      <h4>Este projeto foi desenvolvido com a finalidade de melhorar minhas habilidades em programação, na qual foi desenvolvido um protótipo de e-commerce</h4> <br/>
      <h4>Neste projeto o usuário poderá realizar uma compra de forma simulada, cadastrar produtos e navegar através dos produtos cadastrados do seu interesse. 
        Cada produto foi inserido em uma categoria, o que possibilita o usuário a navegar somente pela sua área de interesse. 
        Além disso, foi implementado funções secundárias como adição em lista de desejos e visualização do pedido de compra. </h4> <br/>

      <h4>Tecnologias utilizadas:</h4> <br/>
      <ul>
        <li>NodeJS</li>
        <li>Fastify</li>
        <li>React</li>
        <li>MySQL</li>
      </ul>
    </Box> 
    )
}
