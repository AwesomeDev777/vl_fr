import axios from "axios";
import { parseCookies } from "nookies";
import isEmpty from "./is-empty";

const cookies = parseCookies();
const headers = { Authorization: cookies.admintoken };

export default function apiCall(url: string, method: string, data: any) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      data,
      headers
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        if (!isEmpty(e.response.data)) {
          if (e.response.data === "Unauthorized") {
            resolve(e.response.data);
          } else {
            reject(e);
          }
        }
        reject(e);
      });
  });
}
