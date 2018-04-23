import axios from '@/utils/axios';

export function getClassHwsData(classId) {
  return new Promise((resolve, reject) => {
    axios.get('/api/general/getHws', { classId }).then((result) => {
      if (result.stats === 1) {
        resolve(result.data.class);
      } else {
        reject(result.data.error);
      }
    }).catch(() => {
      reject('网络错误');
    });
  });
}

export function addHomework(classId, params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/teacher/addHw/${classId}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch(() => {
      reject('网络错误');
    });
  });
}

export function uploadCourseware(classId, params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/teacher/uploadCourseware/${classId}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch(() => {
      reject('网络错误');
    });
  });
}

export function updateCoursewareApi(classId, uploadDate, params) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/teacher/updateCourseware/${classId}/${uploadDate}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch(() => {
      reject('网络错误');
    });
  });
}

export function deleteCoursewareApi(classId, uploadDate, params) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/teacher/deleteCourseware/${classId}/${uploadDate}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch(() => {
      reject('网络错误');
    });
  });
}

export function updateClassMsg(classId, params) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/teacher/editClass/${classId}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch(() => {
      reject('网络错误');
    });
  });
}

export function getStuSubs(classId, userId) {
  return new Promise((resolve, reject) => {
    axios.get('/api/teacher/getStuSubs', { classId, userId }).then((result) => {
      if (result.stats === 1) {
        resolve(result.data.subs);
      } else {
        reject(result.data.error);
      }
    }).catch(() => {
      reject('网络错误');
    });
  });
}

export function updateClassTas(classId, params) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/teacher/updateClassTas/${classId}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch(() => {
      reject('网络错误');
    });
  });
}
