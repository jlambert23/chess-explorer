import * as https from 'https';
import { IncomingMessage } from 'node:http';

export function get<T>(url: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    https.get(url, (response) => {
      let res = '';
      response.on('data', (chunk) => (res += chunk));
      response.on('end', () => {
        try {
          const result = handleResponse(response, res, url);
          resolve(result);
        } catch (ex) {
          reject(ex);
        }
      });
      response.on('error', (err) => reject(err));
    });
  });
}

function handleResponse(response: IncomingMessage, res: string, url: string) {
  if (response.statusCode === 301 && response.headers.location) {
    return get(response.headers.location);
  }
  if (response.statusCode === 429) {
    throw {
      statusCode: 429,
      message: `oh shit we're getting rate limited @ ${url}`,
    };
  }

  if (response.statusCode < 200 || response.statusCode > 299) {
    const val = attemptJsonParse(res);
    let msg = '';
    if (typeof val === 'string') msg = val;
    if (typeof val === 'object' && val.message) msg = val.message;
    throw {
      statusCode: response.statusCode,
      message: msg,
    };
  }

  return attemptJsonParse(res);
}

function attemptJsonParse(res: string) {
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
