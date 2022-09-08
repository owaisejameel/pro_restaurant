import React from 'react'
import { useParams } from 'react-router-dom'

const Cart = () => {
  const params = useParams()
  console.log("prama",params)
  return (
    <div>Cart</div>
  )
}

export default Cart