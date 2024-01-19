import { UserType } from "@/types/user.types";
import { fetchUrl } from "./handler";
import { LoginDataType } from "@/validators/auth-validators";
import { ServiceResponseType } from "@/types/handler-response.types";

export default class AuthHandler {
  public static signup = (userData: Partial<UserType>): Promise<any> => {
    return fetchUrl("/auth/register", "POST", userData);
  };
  public static login = (loginData: LoginDataType): Promise<any> => {
    return fetchUrl("/auth/login", "POST", loginData);
  };
  public static verify = (): Promise<any> => {
    return fetchUrl("/auth/verify", "GET");
  };
  public static getUnverifiedUsers = (): Promise<
    ServiceResponseType<Partial<UserType[]>>
  > => {
    return fetchUrl("/auth/unverifiedUsers", "GET");
  };
}
