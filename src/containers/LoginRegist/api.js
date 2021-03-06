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
      .catch((error) => {
        reject(error);
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
      .catch((error) => {
        reject(error);
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
      .catch((error) => {
        reject(error);
      });
  });
}

export function getCaptcha() {
  return new Promise((resolve, reject) => {
    axios.get('/api/general/getCaptcha')
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve(result.data.captcha);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function checkCaptcha(captcha) {
  return new Promise((resolve, reject) => {
    axios.post('/api/general/checkCaptcha', { captcha })
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function forgotPass(params) {
  return new Promise((resolve, reject) => {
    axios.post('/api/general/forgotPass', params)
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function checkResetValid(resetId) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/general/checkReset/${resetId}`)
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function resetPass(resetId, params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/general/resetPass/${resetId}`, params)
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function sendEmailAgain(params) {
  return new Promise((resolve, reject) => {
    axios.post('/api/general/sendEmail', params)
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function activateEmail(activateId) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/general/activateEmail/${activateId}`)
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
