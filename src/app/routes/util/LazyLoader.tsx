import {
	JSX,
	lazy,
	type LazyExoticComponent,
} from "react";
import * as T from "../@types";

function LazyLoader(filePath: string): JSX.Element {
	const modules: T.Modules = import.meta.glob<T.Module>("/src/pages/**/*.tsx");

	const DynamicModule = modules[`/src/pages/${filePath}`];

	if (!DynamicModule) {
		throw new Error(`File not found: /src/pages/${filePath}`);
	}

	const AsyncComponent: LazyExoticComponent<T.AnyComponent> = lazy(() =>
		DynamicModule().then((module: T.Module): T.Module => ({ default: module.default }))
	);

	return (
		<AsyncComponent />
	);
}

export default LazyLoader;