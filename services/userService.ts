import axiosInstance from "@/helpers/axiosHelper";
import { User } from "@/interfaces/user";

export const getUserData = async (email: string): Promise<User> => {
  if (!email) {
    throw new Error("Email is undefined");
  }

  try {
    const response = await axiosInstance.get(`/users/email/${email}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
