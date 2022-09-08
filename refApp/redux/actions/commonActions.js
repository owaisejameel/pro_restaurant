
import * as USER_CONST from "../../utils/Constants";


export function startSpinner() {
	return { type: USER_CONST.START_SPINNER };
}

// This action stops the common spinner.
export function stopSpinner() {
	return { type: USER_CONST.STOP_SPINNER };
}

export function startSpinnerForProduct() {
	return { type: USER_CONST.START_SPINNER_FOR_PRODUCT };
}

// This action stops the common spinner.
export function stopSpinnerForProduct() {
	return { type: USER_CONST.STOP_SPINNER_FOR_PRODUCT };
}

export function showErrorModal(message, isShowError = true) {
	return { 
		type: USER_CONST.SHOW_ERROR_MODAL,
		payload: {
			message,
			isShowError
		} 
	};
}

export function hideErrorModal() {
	return { type: USER_CONST.HIDE_ERROR_MODAL };
}