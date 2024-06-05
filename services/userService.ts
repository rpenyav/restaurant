import { User } from "@/interfaces/user";
import axios from "axios";

export const getUserData = async (email: string): Promise<User> => {
  try {
    const response = await axios.get(
      `https://backend-tester-741806943268.herokuapp.com/testsuite/users/${email}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
