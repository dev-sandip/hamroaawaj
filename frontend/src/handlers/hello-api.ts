import { ServiceResponseType } from "@/types/handler-response.types";

import { fetchUrl } from "./handler";

export default class HelloHandler {
  /**
   * Retrieves a greeting message from the backend API.
   * @returns A promise that resolves to an ApiResponse containing the greeting message.
   */
  public static sayHello = (): Promise<ServiceResponseType<any>> => {
    return fetchUrl<any>(`/hello`, "GET");
  };
}
