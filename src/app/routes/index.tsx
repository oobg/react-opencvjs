import { JSX } from "react";
import * as R from "react-router";
import * as U from "./util";
import routes from "./routes";

const router: R.DataRouter = R.createBrowserRouter(
	routes.map((route: U.CustomRouteObject): R.RouteObject => ({
		...route,
		element: U.RenderElement(route),
	}))
);

export default function Routes(): JSX.Element {
	return <R.RouterProvider router={router} />;
}
