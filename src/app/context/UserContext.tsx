import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/app.store.selector";
import { isEmpty } from "../utils/Utils";

interface UserContextProps {
  isUserLogged: () => boolean;
  hasRole: (role: string) => boolean;
}

export const UserContext = createContext<UserContextProps>({
  isUserLogged: () => false,
  hasRole: (role) => false,
});

export const UserContextProvider = ({ children }) => {
  const user = useSelector(selectUser);

  const isUserLogged = (): boolean => {
    return !isEmpty(user);
  };

  const hasRole = (role: string): boolean => {
    return user.role === role;
  };

  return (
    <UserContext.Provider value={{ isUserLogged, hasRole }}>
      {children}
    </UserContext.Provider>
  );
};
