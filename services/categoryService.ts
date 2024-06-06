// services/categoryService.ts
import axiosInstance from "@/helpers/axiosHelper";
import API_URL from "@/config/config";
import { Category, PaginatedResponse } from "@/interfaces/categories";

export const fetchCategories = async (): Promise<PaginatedResponse> => {
  const response = await axiosInstance.get(`${API_URL}/categories`);
  return response.data;
};

export const fetchCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await axiosInstance.get(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};
