import { axiosClient } from ".";

export const commentApi = {
  async getList(params) {
    var qs = require("qs");
    const response = await axiosClient.get("v1/api/comments", {
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

  async add(data) {
    const url = `v1/api/comment`;
    return await axiosClient.post(url, data, {
      headers: {
        // "btn-access-token": token,
        // "Content-Type": "multipart/form-data",
      },
    });
  },

  async remove(id, token) {
    const url = `v1/api/comment/${id}`;
    return await axiosClient.delete(url, {
      headers: {
        "btn-access-token": token,
      },
    });
  },
};
