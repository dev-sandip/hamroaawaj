import { UserType } from "@/types/user.types";
import { fetchUrl } from "./handler";
import { LoginDataType } from "@/validators/auth-validators";

export default class AuthHandler {
  public static signup = (userData: Partial<UserType>): Promise<any> => {
    return fetchUrl("/auth/register", "POST", userData);
  };
  public static login = (loginData: LoginDataType): Promise<any> => {
    return fetchUrl("/auth/login", "POST", loginData);
  };
}
