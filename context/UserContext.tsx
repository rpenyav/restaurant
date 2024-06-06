import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { getUserData } from "@/services/userService";
import { getEmail } from "@/services/authService";
import { User } from "@/interfaces/user";

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  fetchUserData: (email: string) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async (email: string) => {
    if (email !== "undefined") {
      const userData = await getUserData(email);
      setUser(userData);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const email = await getEmail();
        if (email) {
          await fetchUserData(email);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
