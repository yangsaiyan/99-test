import axios from "axios";

const baseUrl = "https://nine-nine-test-mock-api-yprtj.ondigitalocean.app";

export async function ApiGet<T>(method: string): Promise<T> {
  try {
    const response = await axios.get<T>(`${baseUrl}/${method}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function ApiPost<T>(
  method: string,
  data: Record<string, any>
): Promise<T> {
  try {
    const response = await axios.post<T>(`${baseUrl}/${method}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
