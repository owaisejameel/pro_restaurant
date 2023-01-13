import { getAxiosInstance, getAxiosInstanceMultipart } from "./AxiosWrapper";

// const BASE_URL_LOGIN ="https://d83c-182-68-243-236.in.ngrok.io/"
// const BASE_URL_SIGNUP = "https://4b00-182-68-243-236.in.ngrok.io/";

// const BASE_URL_LOGIN = "https://polar-escarpment-35038.herokuapp.com/";
// const BASE_URL_FORGOT = "https://polar-escarpment-35038.herokuapp.com/";

// const BASE_URL_TERMS = "https://damp-chamber-53422.herokuapp.com/";
// const BASE_URL_USER_PROFILE =
//   "https://mysterious-wildwood-02714.herokuapp.com/";
// const BASE_URL_ADDRESSESS = "https://bc3d-182-68-162-91.in.ngrok.io/";

//----------------------------------------------------------------------------------
const BASE_URL = "https://gentle-dusk-70757.herokuapp.com/";

const BASE_URL_SIGNUP = "https://gentle-dusk-70757.herokuapp.com/";

const BASE_URL_LOGIN = "https://gentle-dusk-70757.herokuapp.com/";
const BASE_URL_FORGOT = "https://gentle-dusk-70757.herokuapp.com/";

const BASE_URL_TERMS = "https://gentle-dusk-70757.herokuapp.com/";
const BASE_URL_USER_PROFILE = "https://gentle-dusk-70757.herokuapp.com/";
const BASE_URL_ADDRESSESS = "https://gentle-dusk-70757.herokuapp.com/";

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

//ADDRESS REQUESTS------------------------------------------------------------------------------------------
export async function performPostAddress(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_ADDRESSESS + endPoint;
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

export async function performGetAddress(endPoint) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_ADDRESSESS + endPoint;
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

export async function performPatchAddress(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_ADDRESSESS + endPoint;
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

export async function performDeleteRequest(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL_ADDRESSESS + endPoint;
  console.log("@@@ Options ===========", wrapper);
  console.log("@@@ JSON REQUEST ===========", jsonRequest);
  console.log("@@@ URL ==============", endPoint);

  return wrapper
    .delete(API_URL, jsonRequest)
    .then((res) => {
      console.log("@@@ RESPONSE ==============", res);
      return res;
    })
    .catch((ex) => {
      throw ex;
    });
}

//--------------------------------------------------------------------------------------
export async function performPostRequestWishList(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstanceMultipart();
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

export async function performPostRequestAddToWhishlist(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstanceMultipart();
  let API_URL = BASE_URL + endPoint;
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

export async function performGetRequestWishlist(endPoint) {

  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL + endPoint;
  // console.log("@@@ Options ===========", wrapper);
  console.log("@@@ URL ==============", API_URL);

  // return wrapper
  //   .get(API_URL)
  //   .then((res) => {
  //     console.log("@@@ RESPONSE ==============", res);
  //     return res;
  //   })
  //   .catch((ex) => {
  //     console.log("errrrrrrrrrrrrrrror", ex);
  //     throw ex;
  //   });

  return fetch(API_URL, {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})
    .then(res => res.json())
    .then((data) => {
        console.log('Wishlist JSON data====================== >>>>>>>>>>>>>>>>>>>>>>>> ', data)
        return data;
    })
    .catch((e) => {
        console.log('JSON error======================', e)
        throw e;
    });
}

export async function performPostRequestRemoveFromWhishlist(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstanceMultipart();
  let API_URL = BASE_URL + endPoint;
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