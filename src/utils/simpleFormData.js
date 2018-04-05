import utils from '@/utils';

export default class SimpleFormData {
  constructor(data) {
    const formData = new FormData();
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i += 1) {
      if (data[keys[i]] !== undefined) {
        if (utils.isArray(data[keys[i]])) {
          for (let j = 0; j < data[keys[i]].length; j += 1) {
            formData.append(keys[i], data[keys[i]][j]);
          }
        } else {
          formData.append(keys[i], data[keys[i]]);
        }
      }
    }
    return formData;
  }
}
