import { getAxiosInstance, getAxiosInstanceMultipart } from "./AxiosWrapper";

// const BASE_URL_LOGIN ="https://d83c-182-68-243-236.in.ngrok.io/"
const BASE_URL_SIGNUP = "https://4b00-182-68-243-236.in.ngrok.io/";


const BASE_URL_LOGIN = "https://polar-escarpment-35038.herokuapp.com/";
const BASE_URL_FORGOT = "https://polar-escarpment-35038.herokuapp.com/";
// const BASE_URL_FORGOT = "https://d83c-182-68-243-236.in.ngrok.io/";
const BASE_URL_TERMS = "https://damp-chamber-53422.herokuapp.com/"
const BASE_URL_USER_PROFILE = "https://mysterious-wildwood-02714.herokuapp.com/"


export const performPostRequestLogin = async function performPostRequestLogin(
  endPoint,
  jsonRequest
) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_LOGIN + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ JSON BODY ===========", jsonRequest);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .post(API_URL, jsonRequest)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      throw ex;
    });
};

export async function performPostRequestSignUp(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_SIGNUP + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ JSON BODY ===========", jsonRequest);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .post(API_URL, jsonRequest)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      throw ex;
    });
}

export async function performPostRequestForgot(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_FORGOT + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ JSON BODY ===========", jsonRequest);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .post(API_URL, jsonRequest)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      throw ex;
    });
}




//axios.get method
export async function performGetRequest(endPoint) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_FORGOT + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .get(API_URL)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      console.log("errrrrrrrrrrrrrrror", ex);
      throw ex;
    });
}


//axios.get method for terms and conditon for now
export async function performGetRequestTerms(endPoint) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_TERMS + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .get(API_URL)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      console.log("errrrrrrrrrrrrrrror", ex);
      throw ex;
    });
}




//axios.get method for userprofile
export async function performGetRequestProfile(endPoint) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_USER_PROFILE + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .get(API_URL)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      console.log("errrrrrrrrrrrrrrror", ex);
      throw ex;
    });
}


// patch request for userChange password
export async function performPatchRequest(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_USER_PROFILE + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ JSON BODY ===========", jsonRequest);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .patch(API_URL, jsonRequest)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      throw ex;
    });
}

//patch request for update profile name
export async function performPatchRequestEditProfile(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstanceMultipart();
  let API_URL = BASE_URL_USER_PROFILE + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ JSON BODY ===========", jsonRequest);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .patch(API_URL, jsonRequest)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      throw ex;
    });
}


//perform post request for generate otp
export async function performPostRequest(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_USER_PROFILE + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ JSON BODY ===========", jsonRequest);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .post(API_URL, jsonRequest)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      throw ex;
    });
}