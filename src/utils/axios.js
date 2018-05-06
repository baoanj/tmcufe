import axios from 'axios';

function handleError(error) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return '无效请求';
      case 500:
        return '服务器错误';
      case 504:
        return '网络错误';
      default:
        return '未知错误';
    }
  } else {
    return '未知错误';
  }
}

export default {
  get(url, params, responseType) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params, responseType })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      axios.put(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  },
};
