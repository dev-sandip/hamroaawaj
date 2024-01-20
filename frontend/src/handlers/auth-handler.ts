import { UserType } from "@/types/user.types";
import { fetchUrl } from "./handler";
import { LoginDataType } from "@/validators/auth-validators";
import { ServiceResponseType } from "@/types/handler-response.types";
import { User } from "lucide-react";

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
  public static getUserById = (
    id: string
  ): Promise<ServiceResponseType<UserType>> => {
    return fetchUrl(`/auth/id/${id}`, "GET");
  };

  public static verifyUserByDoc = (
    userId: string
  ): Promise<ServiceResponseType<UserType>> => {
    return fetchUrl(`/auth/verfiyUserByDoc`, "PUT", { userId });
  };
  public static logout = (): Promise<ServiceResponseType<any>> => {
    return fetchUrl("/auth/logout", "POST");
  };
}
