import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";
import User from "../models/User.model";
import ResponseController from "./ResponseController";
import { CookieHandler } from "../utils/cookies";

/**
 * Controller class for user authentication related operations.
 */
class UserAuthController {
  /**
   * Creates a new user with email authentication method.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @returns A success response with the created user data or a 500 error response.
   */
  public static Register = async (req: Request, res: Response) => {
    try {
      const { validId, name, email, password, legaldocImg } = req.body;
      const hashedPassword = await hash(password, 10);
      const newUser = new User({
        name,
        validId,
        email,
        legaldocImg,
        password: hashedPassword,
      });
      console.log(newUser);
      await newUser.save();

      // Register cookies
      CookieHandler.registerCookies(res, newUser._id.toString());

      return ResponseController.HandleSuccessResponse(res, {
        status: 201,
        message: "Account created successfully!",
        data: newUser,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };

  /**
   * Logs in a user with email authentication method.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @returns A Promise that resolves to the response object or rejects with an error response.
   */
  public static Login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userAuth = await User.findOne({ email: email });

      // Check if user exists
      if (!userAuth) {
        return ResponseController.HandleResponseError(res, {
          status: 404,
          message: "User not found, Please create an account!",
          errors: [],
        });
      }

      const isPasswordValid = await compare(password, userAuth.password);

      // Check if password is valid
      if (!isPasswordValid) {
        return ResponseController.HandleResponseError(res, {
          status: 401,
          message: "Invalid credentials!",
          errors: [],
        });
      }

      //   // Register cookies
      console.log("I am about to register cookies");

      CookieHandler.registerCookies(res, userAuth._id.toString());

      console.log("I have registered cookies");

      //return user data
      const user = await User.findById(userAuth._id);
      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "Login successful!",
        data: user,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };

  public static verifyUser = async (req: Request, res: Response) => {
    try {
      // Check if user exists
      // res.locals.jwtData.id is the user id from the jwt token returned by the auth middleware called verifyToken
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return ResponseController.HandleResponseError(res, {
          status: 404,
          message: "User not found!",
          errors: [],
        });
      }

      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "User verified!",
        data: user,
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };
<<<<<<< HEAD
=======
  /**
   * Logout user.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A success response with status 200 and an empty data object.
   */
  public static logout = async (req: Request, res: Response) => {
    try {
      //logout user
      CookieHandler.clearCookies(res);
      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "Logout successful!",
        data: {},
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };

  public static VerifyUserByValidDoc = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return ResponseController.HandleResponseError(res, {
          status: 400,
          message: "userId is required for verification.",
          errors: [],
        });
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId, isVerified: false },
        { $set: { isVerified: true, updatedAt: new Date() } },
        { new: true }
      );

      if (updatedUser) {
        return ResponseController.HandleSuccessResponse(res, {
          status: 200,
          message: "User verified successfully!",
          data: updatedUser,
        });
      } else {
        return ResponseController.HandleResponseError(res, {
          status: 404,
          message: "User not found or already verified.",
          errors: [],
        });
      }
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };

  public static getUnverifiedUsers = async (req: Request, res: Response) => {
    try {
      const unverifiedUsers = await User.find({ isVerified: false });

      return ResponseController.HandleSuccessResponse(res, {
        status: 200,
        message: "Unverified users fetched successfully!",
        data: unverifiedUsers.map((user) => {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImg: user.profileImg,
          };
        }),
      });
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };

  public static getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return ResponseController.HandleResponseError(res, {
          status: 400,
          message: "User id is required.",
          errors: [],
        });
      }

      const user = await User.findById(id);

      if (user) {
        return ResponseController.HandleSuccessResponse(res, {
          status: 200,
          message: "User fetched successfully!",
          data: user,
        });
      } else {
        return ResponseController.HandleResponseError(res, {
          status: 404,
          message: "User not found!",
          errors: [],
        });
      }
    } catch (error) {
      return ResponseController.Handle500Error(res, error);
    }
  };
>>>>>>> main
}
export default UserAuthController;
