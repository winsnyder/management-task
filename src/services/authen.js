import { axiosClient } from ".";

export const authenApi = {
  async login(data) {
    let response = await axiosClient.post(`v1/api/login`, data);
    return response;
  },

  async signup(data) {
    let response = await axiosClient.post(`v1/api/signup`, data);
    return response;
  },
};