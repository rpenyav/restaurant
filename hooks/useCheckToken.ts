import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getToken } from "@/services/authService";

const useCheckToken = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (!token) {
        router.replace("/auth/login");
      }
    };
    checkToken();
  }, [router]);
};

export default useCheckToken;
