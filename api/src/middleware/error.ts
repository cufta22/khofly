interface CustomErrorHandlerArgs {
  code:
    | number
    | "NOT_FOUND"
    | "INTERNAL_SERVER_ERROR"
    | "UNKNOWN"
    | "VALIDATION"
    | "PARSE"
    | "INVALID_COOKIE_SIGNATURE";
  set: any;
  error: any;
}

export const middleware_Error = ({ code, set, error }: CustomErrorHandlerArgs) => {
  // console.log(`Middleware: ${code}`);

  switch (code) {
    case "NOT_FOUND":
      set.status = 404;

      return { error: true, message: "Not Found", data: null };

    case "INTERNAL_SERVER_ERROR":
      set.status = 500;

      return { error: true, message: "Internal Server Error", data: null };

    default:
      set.status = 400;

      return {
        error: true,
        message: error?.response || "An error has occurred",
        data: null,
      };
  }
};
