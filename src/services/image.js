import { axiosClient } from ".";

export const imageApi = {
  async getList(params, token) {
    var qs = require("qs");
    const response = await axiosClient.get("v1/api/images", {
      params: {
        ...params,
      },
      paramsSerializer: (params) => {
        //ví dụ với trường hợp size=[1,2] => &size=1&size=2
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    return response;
  },

  async get(id, token) {
    const url = `v1/api/image/${id}`;
    return await axiosClient.get(url, {
      headers: {
        "btn-access-token": token,
      },
    });
  },

  async add(data, token) {
    const url = `v1/api/image`;
    return await axiosClient.post(url, data, {
      headers: {
        "btn-access-token": token,
        // "Content-Type": "multipart/form-data",
      },
    });
  },

  async update(id, data, token) {
    const url = `v1/api/image/${id}`;
    return await axiosClient.put(url, data, {
      headers: {
        "btn-access-token": token,
        // "Content-Type": "multipart/form-data",
      },
    });
  },

  async remove(id, token) {
    const url = `v1/api/image/${id}`;
    return await axiosClient.delete(url, {
      headers: {
        "btn-access-token": token,
      },
    });
  },
};
