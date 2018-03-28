import axios from '@/utils/axios';

export function registUser(params) {
  return new Promise((resolve, reject) => {
    axios.post('/api/general/regist', params)
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch(() => {
        reject('网络错误');
      });
  });
}

export function loginUser(params) {
  return new Promise((resolve, reject) => {
    axios.post('/api/general/login', params)
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch(() => {
        reject('网络错误');
      });
  });
}

export function checkEmailExist(email) {
  return new Promise((resolve, reject) => {
    axios.post('/api/general/checkEmail', { email })
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch(() => {
        reject('网络错误');
      });
  });
}
