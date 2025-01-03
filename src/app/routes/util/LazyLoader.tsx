import {
	JSX,
	lazy,
	Suspense,
	type ComponentType,
	type LazyExoticComponent,
} from "react";

type AnyComponent = ComponentType<unknown>;
type TModule = { default: AnyComponent };
type TModules = Record<string, () => Promise<TModule>>;

function LazyLoader(filePath: string): JSX.Element {
	const modules: TModules = import.meta.glob<TModule>("/src/pages/**/*.tsx");

	const DynamicModule = modules[`/src/pages/${filePath}`];

	if (!DynamicModule) {
		throw new Error(`File not found: ${filePath}`);
	}

	const AsyncComponent: LazyExoticComponent<AnyComponent> = lazy(() =>
		DynamicModule().then((module: TModule): TModule => ({ default: module.default }))
	);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AsyncComponent />
		</Suspense>
	);
}

export default LazyLoader;