export class ResponseModel<T> {
  statusCode: number;
  success: boolean;
  errors?: string[];
  content: T;
}
