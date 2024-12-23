import {
  axiosInstance,
  axiosInstancePostman,
} from "@/utils/config/axiosInstance";

export async function CreateFunction(path: string, body: any) {
  try {
    const res = await axiosInstance.post(path, body);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при создании. Попробуйте еще раз");
  }
}
export async function CreateFunctionPostman(path: string, body: any) {
  try {
    const res = await axiosInstancePostman.post(path, body);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при создании. Попробуйте еще раз");
  }
}

export async function ReadFunction<T>(path: string) {
  try {
    const res = await axiosInstance.get<T>(path);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при загрузке списка. Попробуйте еще раз");
  }
}

export async function ReadFunctionPostman<T>(path: string) {
  try {
    const res = await axiosInstancePostman.get<T>(path);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Произошла ошибка при загрузке списка. Попробуйте еще раз");
  }
}

export async function UpdateFunction(path: string, body: any) {
  try {
    const res = await axiosInstance.patch(path, body);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при редактировании. Попробуйте еще раз");
  }
}

export async function DeleteFunction(path: string) {
  try {
    const res = await axiosInstance.delete(path);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при удалении. Попробуйте еще раз");
  }
}
