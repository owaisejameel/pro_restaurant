export const addToCart = (data) => {
    // console.log("add to cart",data)
    return {
        type: "ADD_ITEMS",
        data : data
    }

}