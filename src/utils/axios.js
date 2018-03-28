import axios from 'axios';

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch(() => {
          reject();
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch(() => {
          reject();
        });
    });
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      axios.put(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch(() => {
          reject();
        });
    });
  },
};
