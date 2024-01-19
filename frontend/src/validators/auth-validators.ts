import { UserType } from "@/types/user.types";
import { z } from "zod";

export default class AuthValidator {
  public static UserSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    username: z.string().min(3).max(255),
    validId: z.string().min(3).max(255),
    legaldocImg: z.string(),
  });

  public static validateUser = (userData: Partial<UserType>) => {
    return AuthValidator.UserSchema.safeParse(userData);
  };

  public static LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
  });

  public static validateLogin = (loginData: Partial<UserType>) => {
    return AuthValidator.LoginSchema.safeParse(loginData);
  };
}
