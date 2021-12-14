export const validatePhone = (num = '') => num.toString().match(/^\d{10}$/);
export const validateOtp = (num = '') => num.toString().match(/^\d{4}$/);