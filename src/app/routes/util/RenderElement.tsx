import { JSX } from "react";
import { CustomRouteObject } from "./index.ts";

function RenderElement(route: CustomRouteObject): JSX.Element {
	return (
		route.layout
			? ( <route.layout>{route.element}</route.layout> )
			: ( route.element )
	) as JSX.Element;
}

export default RenderElement;
