import axios from "axios";

export class Http {
  // static HEADERS = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  //   Accept: "application/json",
  // };
  // static NOT_AUTH_HEADERS = {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // };

  static async get(url, headers) {
    try {
      return await request(url, "GET", headers);
    } catch (e) {
      throw e;
    }
  }

  static async post(url, headers, data) {
    try {
      return await request(url, "POST", headers, data);
    } catch (e) {
      throw e;
    }
  }

  static async delete(url, headers) {
    try {
      return await request(url, "DELETE", headers);
    } catch (e) {
      throw e;
    }
  }

  static async patch(url, headers, data) {
    try {
      return await request(url, "PATCH", headers, data);
    } catch (e) {
      throw e;
    }
  }
}

async function request(url, method = "GET", headers, data) {
  const config = {
    method,
    headers,
  };

  if (method === "POST" || method === "PATCH") {
    config.data = data;
  }
  const response = await axios(url, config);
  return await response.data;
}
