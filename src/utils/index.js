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
};
