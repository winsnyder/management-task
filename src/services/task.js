import { axiosClient } from ".";

export const taskApi = {
  async get(id, token) {
    const url = `v1/api/task/${id}`;
    return await axiosClient.get(url, {
      headers: {
        "btn-access-token": token,
      },
    });
  },

  async add(data, token) {
    const url = `v1/api/task`;
    return await axiosClient.post(url, data, {
      headers: {
        "btn-access-token": token,
        // "Content-Type": "multipart/form-data",
      },
    });
  },

  async update(id, data, token) {
    const url = `v1/api/task/${id}`;
    return await axiosClient.put(url, data, {
      headers: {
        "btn-access-token": token,
        // "Content-Type": "multipart/form-data",
      },
    });
  },

  async remove(id, token) {
    const url = `v1/api/task/${id}`;
    return await axiosClient.delete(url, {
      headers: {
        "btn-access-token": token,
      },
    });
  },
};
