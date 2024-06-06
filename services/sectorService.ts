// services/sectorService.ts
import API_URL from "@/config/config";
import axiosInstance from "@/helpers/axiosHelper";
import { PaginatedResponse } from "@/interfaces/sectors";

export const getSectors = async (
  pageNumber: number,
  pageSize: number
): Promise<PaginatedResponse> => {
  const response = await axiosInstance.get(
    `${API_URL}/sectors?page=${pageNumber}&size=${pageSize}`
  );
  return response.data;
};
