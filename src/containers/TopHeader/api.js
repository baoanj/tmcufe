import axios from '@/utils/axios';

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
      .catch((error) => {
        reject(error);
      });
  });
}

export function editNameStuId(params) {
  return new Promise((resolve, reject) => {
    axios.put('/api/student/editUserMsg', params)
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
