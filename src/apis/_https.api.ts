import axios from 'axios';

export async function get<T>(url: string) {
  const res = await axios.get<T>(url);
  return res.data;
}
