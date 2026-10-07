import type { Response } from "express";

import { env } from "../config/env.js";

export const setAccessTokenCookie = (
  res: Response,
  accessToken: string,
): void => {
  res.cookie(
    env.accessCookieName,
    accessToken,
    {
      httpOnly: env.accessCookieHttpOnly,
      secure: env.accessCookieSecure,
      sameSite: env.accessCookieSameSite as
        | "strict"
        | "lax"
        | "none",
      path: env.accessCookiePath,
      maxAge: env.accessCookieMaxAge,
    },
  );
};

export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string,
): void => {
  res.cookie(
    env.refreshCookieName,
    refreshToken,
    {
      httpOnly: env.refreshCookieHttpOnly,
      secure: env.refreshCookieSecure,
      sameSite: env.refreshCookieSameSite as
        | "strict"
        | "lax"
        | "none",
      path: env.refreshCookiePath,
      maxAge: env.refreshCookieMaxAge,
    },
  );
};

export const clearAccessTokenCookie = (
  res: Response,
): void => {
  res.clearCookie(
    env.accessCookieName,
    {
      httpOnly: env.accessCookieHttpOnly,
      secure: env.accessCookieSecure,
      sameSite: env.accessCookieSameSite as
        | "strict"
        | "lax"
        | "none",
      path: env.accessCookiePath,
    },
  );
};

export const clearRefreshTokenCookie = (
  res: Response,
): void => {
  res.clearCookie(
    env.refreshCookieName,
    {
      httpOnly: env.refreshCookieHttpOnly,
      secure: env.refreshCookieSecure,
      sameSite: env.refreshCookieSameSite as
        | "strict"
        | "lax"
        | "none",
      path: env.refreshCookiePath,
    },
  );
};