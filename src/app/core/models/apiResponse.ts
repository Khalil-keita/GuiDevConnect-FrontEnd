export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T | null;
}


export interface ErrorResponse {
  status: number;
  message: string;
  errors?: { [key: string]: string[] };
  timestamp?: string;
}
