import axios from '@/utils/axios';

export function getClassHwsData(classId) {
  return new Promise((resolve, reject) => {
    axios.get('/api/general/getHws', { classId })
      .then((result) => {
        if (result.stats === 1) {
          resolve(result.data.class);
        } else {
          reject(result.data.error);
        }
      })
      .catch(() => {
        reject('网络错误');
      });
  });
}

export function addHomework(classId, params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/teacher/addHw/${classId}`, params)
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
