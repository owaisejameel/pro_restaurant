import { put, call } from "redux-saga/effects";
import * as CONST from "../../utils/Constants";

import { performPostRequestWishList } from "../../services/apiService/AxiosUtils";

//post add wishlist
// export const addWishList = function* addWishListSaga(action) {
//   yield put({ type: "LOADER" });
//   console.log("addWishList on click", action);

//   let formdata = new FormData();

//   formdata.append("user_id", 1);
//   formdata.append("item_id", 3);

//   let body = formdata;

//   try {
//     const path = "api/v1/favourites/add";
//     const res = yield call(performPostRequestWishList, path, body);
//     console.log(
//       "@@@ Add To Cart Response =======",
//       res,
//       "RES STATUS",
//       // res.data.status.message
//       res?.data?.message
//     );
//     if (res !== undefined && res.status === 200) {
//       console.log("res", res);
//     } else {
//       console.log("api does'nt run.....");
//       yield put({ type: "LOADER_CLOSE" });
//     }
//   } catch (error) {
//     console.log("@@@ LOGIN API error ========", error);
//     yield put({ type: "LOADER_CLOSE" });
//     yield put({
//       type: "SHOW_TOAST",
//       payload: { severity: "error", message: error?.response?.data?.message },
//     });
//   }
// };
