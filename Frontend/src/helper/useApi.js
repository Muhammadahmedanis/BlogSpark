import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

export const useApi = async (method, api, payload = null) => {
    try {
        const response = payload
        ? await axiosInstance[method](api, payload)
        : await axiosInstance[method](api);
        // console.log(response.data);
        { response?.data?.message.length && toast.success(response.data?.message)}
        return response.data.data;
    } catch (error) {
        toast.error(error.response?.data.message);
    }
}