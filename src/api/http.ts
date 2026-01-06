import axios from "axios";

const baseUrl = "http://localhost:3000";

export function ApiGet<T>(method: string): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get<T>(`${baseUrl}/${method}`);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function ApiPost<T>(method: string, data: Record<string, any>): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post<T>(`${baseUrl}/${method}`, data);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}