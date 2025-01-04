import { JSX, Suspense } from "react";
import * as R from "react-router";
import * as U from "./util";
import * as T from "./@types";
import routes from "./routes";

const router: R.DataRouter = R.createBrowserRouter(
	routes.map((route: T.CustomRouteObject): R.RouteObject => ({
		...route,
		element: U.RenderElement(route),
	}))
);

export default function Routes(): JSX.Element {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<R.RouterProvider router={router} />
		</Suspense>
	);
}
