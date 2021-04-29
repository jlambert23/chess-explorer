import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

axios.defaults.baseURL = process.env.REACT_APP_API;

export const useFetch = <T = any, U = any>(
  url: string,
  options?: SWRConfiguration
) => useSWR<T, U>(url, fetcher, options);

export const useFetchBody = <T = any, U = any>(
  url: string,
  data?: any,
  options?: SWRConfiguration
) => useSWR<T, U>(url, () => poster(url, data), options);

export const fetcher = <T>(url: string) =>
  axios.get<T>(url).then((res) => res.data);

export const poster = <T>(url: string, data?: any) =>
  axios.post<T>(url, data).then((res) => res.data);
