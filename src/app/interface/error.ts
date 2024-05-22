export type TErrorSources = {
    field: string | number;
    message: string
  }[] | {issues:any} | null |Error;
  
  export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
  };