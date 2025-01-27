interface Options {
  expires: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export const getCookie = (name: string, req?: Request, defaultValue?: any) => {
  // Check if the function is being executed on the server or client
  if (req) {
    // Server-side rendering
    const cookieHeader = req.headers.get("Cookie");
    if (!cookieHeader) return defaultValue;

    const cookies = cookieHeader
      .split(";")
      .map((cookie) => cookie.trim().split("="));
    const cookie = cookies.find((cookie) => cookie[0] === name);
    return cookie ? decodeURIComponent(cookie[1]) : defaultValue;
  } else {
    // Client-side rendering
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("="));
    const cookie = cookies.find((cookie) => cookie[0] === name);
    return cookie ? decodeURIComponent(cookie[1]) : defaultValue;
  }
};

export const setCookie = (name: string, value: string, options: Options) => {
  const encodedValue = encodeURIComponent(value);
  let cookieString = `${name}=${encodedValue}`;

  // Add optional options
  if (options.expires) {
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + options.expires * 1000);
    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};

export const removeCookie = (name: string, res?: Response) => {
  // Check if the function is being executed on the server or client
  if (res) {
    // Server-side rendering
    res.headers.set(
      "Set-Cookie",
      `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );
  } else {
    // Client-side rendering
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};
