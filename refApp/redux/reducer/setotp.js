import { SET_OTP } from '../../utils/Constants'

const initialState = {
    otp: ''
}
const setOTP = (state = initialState, action, payload) => {
//console.log(`***********************Reducer have value`, payload)
    if(action.type===SET_OTP){
        return  { ...state, otp: action.payload.setOtpforhome }
    }
    else{
        return state
    }
    // switch (action.type) {
    //     case SET_OTP:
    //         return { ...state, otp: action.payload }

    //      case SUBSTRACTION:
    //          return { ...state, counter: state.counter - 1 }

    //     default: 
    //     return state
    // }
}
export default setOTP;