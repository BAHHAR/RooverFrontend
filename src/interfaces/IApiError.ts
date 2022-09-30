export type IApiError = {
  data: {
    code: number;
    message: string;
  };
  status: number;
};
