const initialState = {
    cartCount : 0,
    whishListCount : 1,
    totalAmount : 0,
}


export const cartReducer = (state = initialState, action) => {
   
    switch(action.type){
        case "ADD_ITEMS" :
        return {
         ...state,
         cartCount : state.cartCount + 1,
         totalAmount : action.data + state.totalAmount
            }
       default : 
       return {
        ...state
       }

    }
}