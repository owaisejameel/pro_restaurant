import React from 'react'
import { Grid, Box, Button, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonSecondary, ItemsBox, StyledGridHelpCenter, StyledGridMiddle, StyledGridShop, TypographyText } from '../../components/StyledComponents/StyledComponents '
import { useDispatch } from 'react-redux'


import { addToCart } from '../../redux/actions/cartActions'
const products = [
  {id: 0, title: "noodles", price : 200},
  {id: 1, title: "maggi", price : 200},
  {id: 2, title: "juice", price : 80},

]

const Shops = () => {
  const dispatch = useDispatch()
  return (
    <StyledGridMiddle container justifyContent="center" alignItems="flex-start">
    
      <StyledGridShop
       sx={{gap : 2}} item xs={10} container alignItems="flex-start" >
        

        {
          products.map( (item)=> (
            <ItemsBox
            item xs={2}
            container
            direction="column"
            alignItems="center"
            sx={{gap: 1}}
           >
           <Box
           component="img"
           sx={{ height: 100, border: 1, width: 1 }}
           />
           <TypographyText >{item.title}</TypographyText>
           <TypographyText >{item.price}</TypographyText>
           <Button fullWidth variant="outlined" 
           onClick={()=>dispatch(addToCart(item.price))}> Add to cart</Button>
           </ItemsBox>
          ))
        }
        

        <ItemsBox
            item xs={2}
            container
            direction="column"
            alignItems="center"
            sx={{gap: 1, p: 0}}
            style={{
              transition : "0.5s",
              transform : `scale(1.1)`,

              "&:hover":{
                transform : `scale(1.01)`
              }
            }}
           >
           <Box
           component="img"
           sx={{ height: 100, border: 1, width: 1 }}
           />
           <TypographyText >title</TypographyText>
           <TypographyText >200</TypographyText>

           <Grid container alignItems="center" justifyContent="space-between" sx={{backgroundColor:"#e6e6e6"}}>
            <ButtonSecondary
            style={{
              borderRadius: "0px 0px 0px 0px"
            }}>-</ButtonSecondary>
            <Box sx={{backgroundColor:"#e6e6e6", p: 1}}>1</Box>
            <ButtonSecondary>+</ButtonSecondary>
          </Grid>
        
           </ItemsBox>

          

        
        
        <Typography color="text.subHeading">HEading</Typography>
      </StyledGridShop>

    </StyledGridMiddle>
  )
}

export default Shops