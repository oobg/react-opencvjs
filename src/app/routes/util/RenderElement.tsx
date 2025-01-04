import { JSX } from "react";
import * as T from "../@types";
import * as L from "@/widgets/layout";

function RenderElement(route: T.CustomRouteObject): JSX.Element {
	return (
		route.layout
			? ( <route.layout>{route.element}</route.layout> )
			: ( <L.DefaultLayout>{route.element}</L.DefaultLayout> )
	) as JSX.Element;
}

export default RenderElement;
