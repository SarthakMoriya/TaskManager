/* eslint-disable no-unused-vars */
const BASE_URL = "http://localhost:5000";

export const request = async (url, method, headers = {}, body = {}) => {
  let res;
  let data;

  switch (method) {
    case "GET":
      res = await fetch(BASE_URL + url, { headers });
      data = await res.json();
      return data;

    case "POST": {
      res = await fetch(BASE_URL + url, {
        headers,
        method,
        body: JSON.stringify({ ...body }),
      });
      data=await res.json();
      return data;
    }
    case "DELETE": {
      res = await fetch(BASE_URL + url, {
        headers,
        method,
        body: JSON.stringify({ ...body }),
      });
      data=await res.json();
      return data;
    }
    case "PATCH": {
      res = await fetch(BASE_URL + url, {
        headers,
        method,
        body: JSON.stringify({ ...body }),
      });
      data=await res.json();
      return data;
    }
  }
};
