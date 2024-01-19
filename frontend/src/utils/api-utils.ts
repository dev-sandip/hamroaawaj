import { ApiErrorResponse } from "@/types/api-types";

class ApiUtils {
  /**
   * Handles the error response from an API request.
   * @param err - The error object.
   * @returns An object representing the API error response.
   */
  public static handleApiResponseError(err: any): ApiErrorResponse {
    const respose: ApiErrorResponse = {
      success: false,
      error: err,
    };
    return respose;
  }
}

export default ApiUtils;
