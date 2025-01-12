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
	{
		path: "/img-contour",
		element: U.LazyLoader("Contour.tsx"),
		layout: L.DefaultLayout,
	},
	{
		path: "/img-watermark",
		element: U.LazyLoader("WaterMark.tsx"),
		layout: L.DefaultLayout,
	},
	{
		path: "/ww/watermark/canvas",
		element: U.LazyLoader("web-worker/WaterMarkCanvas.tsx"),
		layout: L.DefaultLayout,
	},
	{
		path: "/ww/watermark/img",
		element: U.LazyLoader("web-worker/WaterMarkImg.tsx"),
		layout: L.DefaultLayout,
	},
	{
		path: "/ww/watermark/img-30",
		element: U.LazyLoader("web-worker/WaterMarkImg30.tsx"),
		layout: L.DefaultLayout,
	},
	{
		path: "/ww/watermark/img-batch",
		element: U.LazyLoader("web-worker/WaterMarkImgBatch.tsx"),
		layout: L.DefaultLayout,
	},
	{
		path: "/ww/watermark/img-delay",
		element: U.LazyLoader("web-worker/WaterMarkImgDelay.tsx"),
		layout: L.DefaultLayout,
	},
];

export default routes;
