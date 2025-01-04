import { JSX } from "react";
import * as T from "../@types";

function RenderElement(route: T.CustomRouteObject): JSX.Element {
	return (
		route.layout
			? ( <route.layout>{route.element}</route.layout> )
			: ( route.element )
	) as JSX.Element;
}

export default RenderElement;
