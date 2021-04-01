import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

export const baseUrl = 'http://localhost:3001/';

export const buildUrl = (url: string) => `${baseUrl}${url}`;

export const useFetch = <T = any, U = any>(
  url: string,
  options?: SWRConfiguration
) => useSWR<T, U>(url, fetcher, options);

export const fetcher = <T>(url: string) =>
  axios.get<T>(buildUrl(url)).then((res) => res.data);
