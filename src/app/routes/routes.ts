import * as U from "./util";
import * as L from "../../widgets/layout";

const routes: U.CustomRouteObject[] = [
	{
		path: "/",
		element: U.LazyLoader("Home.tsx"),
		layout: L.DefaultLayout,
	},
	{
		path: "/img",
		element: U.LazyLoader("Img.tsx"),
		layout: L.DefaultLayout,
	},
];

export default routes;
