import { JSX } from "react";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router";
import {
	LazyLoader,
	RenderElement,
	type CustomRouteObject,
} from "./util";
import {
	DefaultLayout
} from "../../widgets/layout";

const routes: CustomRouteObject[] = [
	{
		path: "/",
		element: LazyLoader("Home.tsx"),
		layout: DefaultLayout,
	},
	{
		path: "/img",
		element: LazyLoader("Img.tsx"),
		layout: DefaultLayout,
	},
];

const router = createBrowserRouter(
	routes.map((route: CustomRouteObject) => ({
		...route,
		element: RenderElement(route),
	}))
);

export default function Routes(): JSX.Element {
	return <RouterProvider router={router} />;
}
