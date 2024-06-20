export interface IFullResponse<T> {
  code: number;
  message: string;
  response: T;
  sid: string;
  success: boolean;
  error?: string;
}
