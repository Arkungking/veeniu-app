import axios from "axios";

export const veeniuApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VEENIU_API,
});
