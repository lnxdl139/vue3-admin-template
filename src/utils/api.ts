import router from '@/router';
import type { IBaseRespone } from '@/types/response.interface';
import { HttpStatusCode, type AxiosError, type AxiosResponse } from 'axios';
import { toastError, toastSuccess } from './toast';

export const handleError = (error: AxiosError): never => {
  throw new Error(error.message);
};

export const handleResponse = (response: AxiosResponse<IBaseRespone>) => {
  const { status, message } = response.data.meta;

  switch (status) {
    case HttpStatusCode.Unauthorized:
      router.push({ path: '/login' });
      break;

    case HttpStatusCode.NotFound:
    case HttpStatusCode.InternalServerError:
      toastError({ title: message });
      router.push({ path: `/${status}` });
      break;

    default:
      toastSuccess({ title: message });
      break;
  }

  return response;
};
