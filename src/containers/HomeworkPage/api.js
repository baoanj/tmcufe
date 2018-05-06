import axios from '@/utils/axios';

export function getHwSubsData(classId, createDate) {
  return new Promise((resolve, reject) => {
    axios.get('/api/general/getSubs', { classId, createDate })
      .then((result) => {
        if (result.stats === 1) {
          resolve(result.data.homework);
        } else {
          reject(result.data.error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function submitHw(classId, createDate, params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/student/submitHw/${classId}/${createDate}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function updateAnswerApi(classId, createDate, params) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/student/editHwSub/${classId}/${createDate}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function deleteHwSubApi(classId, createDate, params) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/student/deleteHwSub/${classId}/${createDate}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function checkStuSub(classId, createDate, userId, feedback) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/teacher/feedbackHw/${classId}/${createDate}/${userId}`, {
      feedback,
    }).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function uploadHwAnswer(classId, createDate, params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/teacher/uploadHwAnswer/${classId}/${createDate}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function deleteHwAnswer(classId, createDate) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/teacher/deleteHwAnswer/${classId}/${createDate}`).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function updateHomeworkMsg(classId, createDate, params) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/teacher/editHw/${classId}/${createDate}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function updateHwDraft(classId, createDate, params) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/student/updateHwDraft/${classId}/${createDate}`, params).then((result) => {
      if (result.stats === 0) {
        reject(result.data.error);
      } else {
        resolve();
      }
    }).catch((error) => {
      reject(error);
    });
  });
}
