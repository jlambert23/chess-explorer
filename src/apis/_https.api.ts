import * as https from 'https';
import { IncomingMessage } from 'node:http';

export function get<T>(url: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    https.get(url, (response) => {
      let res = '';
      response.on('data', (chunk) => (res += chunk));
      response.on('end', () => resolve(handleResponse(response, res)));
      response.on('error', (err) => reject(err));
    });
  });
}

function handleResponse(response: IncomingMessage, res: string) {
  if (response.statusCode === 301 && response.headers.location) {
    return get(response.headers.location);
  }

  try {
    return JSON.parse(res);
  } catch (e) {
    if (e instanceof SyntaxError) {
      return res as any;
    } else {
      throw e;
    }
  }
}
