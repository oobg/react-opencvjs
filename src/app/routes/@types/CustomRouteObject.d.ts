import type { RouteObject } from "react-router";
import { ComponentType, ReactNode } from "react";

type CustomRouteObject = RouteObject & {
	layout?: ComponentType<{ children: ReactNode }>;
};

export default CustomRouteObject;