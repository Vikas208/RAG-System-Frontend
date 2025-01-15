import { COOKIES_STORAGE_KEYS } from "@/config/constant";
import Cookies from "js-cookie";

export const uploadFileAPI = (payload: FormData) =>
  fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_SUBPATH}/v1/upload/`,
    {
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Token ${Cookies.get(COOKIES_STORAGE_KEYS.session_token)}`,
      },
    },
  ).then((res) => res.json());
