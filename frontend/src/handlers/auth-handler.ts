import { UserType } from "@/types/user.types";
import { fetchUrl } from "./handler";

export default class AutHandler {
  public static signup = (userData: UserType): Promise<any> => {
    return fetchUrl("/auth/register", "POST", userData);
  };
}
