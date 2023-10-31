import { FC, FunctionComponent, ReactNode, lazy } from "react";

import { PATHS } from "./Common";
import { GuestGuard, EmptyGuard } from "../Auth/guards";
import AuthGuard from "../Auth/guards/AuthGuard";

interface PlatformRoute<P = {}> {
  path: string;
  guard: FC<{ children: ReactNode }>;
  component: FunctionComponent<P>;
}

export const ROUTES: Array<PlatformRoute<any>> = [
  {
    path: PATHS.root,
    guard: AuthGuard,
    component: lazy(() => import("../pages/private/Home")),
  },
  {
    path: PATHS.login,
    guard: GuestGuard,
    component: lazy(() => import("../pages/public/Login")),
  },
  {
    path: PATHS.error404,
    guard: EmptyGuard,
    component: lazy(() => import("../pages/public/ErrorPage")),
  },
];
