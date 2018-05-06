import axios from '@/utils/axios';

export function getClasses() {
  return new Promise((resolve, reject) => {
    axios.get('/api/general/getClasses')
      .then((result) => {
        if (result.stats === 1) {
          resolve(result.data);
        } else {
          reject(result.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addClass(params) {
  return new Promise((resolve, reject) => {
    axios.post('/api/teacher/addClass', params)
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

export function submitMoveClasses(params) {
  return new Promise((resolve, reject) => {
    axios.put('/api/general/moveClasses', params)
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

export function checkClassIdUnique(classId) {
  return new Promise((resolve, reject) => {
    axios.post('/api/teacher/checkClassIdUnique', { classId })
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

export function enterClass(params) {
  return new Promise((resolve, reject) => {
    axios.post('/api/student/enterClass', params)
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
