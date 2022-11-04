/*password regex that a Password must contain minimum 8 characters, atleast a capital letter, a lowercase letter,
 a number and a special character. */

//name reg
const regName = /[a-zA-Z][a-zA-Z]*$/;

const regPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/;

//email reg
const regEmail = /\S+@\S+\.\S+/;

//new phone reg
const regMobile = /^[0-9]{10}$/;

//phone reg that a phone contain only number and 10 digits
const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

//Functions for validating errors
export const isNameValid = (name) => {
  return regName.test(name);
};

export const isEmail = (email) => {
  return regEmail.test(email);
};

export const isPhone = (val) => {
  return regPhone.test(val);
};

export const isPasswordValid = (password) => {
  return regPassword.test(password);
};

export const isMobile = (val) => {
  return regMobile.test(val);
};

// const isEmail = (email) => {
//   return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
// };
