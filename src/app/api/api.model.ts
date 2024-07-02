export interface IFullResponse<T> {
  data: {
    code: number;
    message: string;
    response: T;
    sid: string;
    success: boolean;
    error?: string;
  };
}
