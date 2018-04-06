export default {
  formateDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = this.zeroFill(date.getMonth() + 1);
    const day = this.zeroFill(date.getDate());
    const hour = this.zeroFill(date.getHours());
    const minute = this.zeroFill(date.getMinutes());
    const second = this.zeroFill(date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  },

  zeroFill(num) {
    return `0${num}`.slice(-2);
  },

  isString(str) {
    return typeof str === 'string';
  },

  isArray(v) {
    // https://msdn.microsoft.com/en-us/library/gg622930(v=vs.85).aspx
    return ({}).toString.apply(v) === '[object Array]';
  },

  isPureObject(v) {
    return ({}).toString.apply(v) === '[object Object]';
  },

  isFile(v) {
    return ({}).toString.apply(v) === '[object File]';
  },

  isInteger(obj) {
    return typeof obj === 'number' && obj % 1 === 0;
  },

  isPositiveInteger(obj) {
    return typeof obj === 'number' && obj % 1 === 0 && obj > 0;
  },

  isNaturalNumber(obj) {
    return typeof obj === 'number' && obj % 1 === 0 && obj >= 0;
  },

  isIntegerStr(str) {
    return typeof str === 'string' && /^-?\d+$/.test(str);
  },

  isNaturalNumberStr(str) {
    return typeof str === 'string' && /^\d+$/.test(str);
  },

  isPositiveIntegerStr(str) {
    return typeof str === 'string' && /^[0-9]*[1-9][0-9]*$/.test(str);
  },

  isFloatStr(str) {
    return typeof str === 'string' && /^(-?\d+)(\.\d+)?$/.test(str);
  },

  validEmail(email) {
    const pattern = /^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]+$/; // eslint-disable-line
    return pattern.test(email);
  },

  validPhone(phone) {
    const pattern = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return pattern.test(phone);
  },

  validPassword(pwd) {
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9^\S]{6,32}$/;
    return pattern.test(pwd);
  },
};
