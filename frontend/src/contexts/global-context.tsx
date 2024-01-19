import AuthHandler from "@/handlers/auth-handler";
import { GlobalContext } from "@/hooks/use-global-context";
import { UserType } from "@/types/user.types";
import React, { ReactNode, useEffect, useState } from "react";

export interface GlobalContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}
// global provider component
export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const globalContextValue: GlobalContextType = {
    user,
    setUser,
    isLoaded,
    setIsLoaded,
  };

  useEffect(() => {
    const verifyUser = async () => {
      const res = await AuthHandler.verify();
      if (res.success) {
        setUser(res.data);
        setIsLoaded(true);
      }
    };
    verifyUser();
  }, []);

  useEffect(() => {
    console.log("user changed", user);
  }, [user]);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
