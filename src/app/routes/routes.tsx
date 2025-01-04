import * as U from "./util";
import * as T from "./@types";
import * as L from "@/widgets/layout";

const routes: T.CustomRouteObject[] = [
	{
		path: "/",
		element: U.LazyLoader("Home.tsx"),
		layout: L.DefaultLayout,
	},
	{
		path: "/color-scale",
		element: U.LazyLoader("Img.tsx"),
		layout: L.DefaultLayout,
	},
];

export default routes;
