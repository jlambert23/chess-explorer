import * as https from 'https';

export function get<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    https.get(url, (response) => {
      let res = '';
      response.on('data', (chunk) => (res += chunk));
      response.on('end', () => {
        try {
          resolve(JSON.parse(res));
        } catch (e) {
          resolve(res as any);
        }
      });
      response.on('error', (err) => reject(err));
    });
  });
}
