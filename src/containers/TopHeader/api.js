import axios from '@/utils/axios';

export function getProfile() {
  return new Promise((resolve) => {
    axios.get('/api/general/profile')
      .then((result) => {
        if (result.stats === 0) {
          resolve({});
        } else {
          resolve(result.data.profile);
        }
      })
      .catch(() => {
        resolve({});
      });
  });
}

export function uerLogout() {
  return new Promise((resolve, reject) => {
    axios.post('/api/general/logout')
      .then((result) => {
        if (result.stats === 0) {
          reject(result.data.error);
        } else {
          resolve();
        }
      })
      .catch(() => {
        resolve();
      });
  });
}
