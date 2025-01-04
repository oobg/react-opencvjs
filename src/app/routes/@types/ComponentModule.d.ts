import type { ComponentType } from "react";

type AnyComponent = ComponentType<unknown>;
type Module = { default: AnyComponent };
type Modules = Record<string, () => Promise<Module>>;

export {
	AnyComponent,
	Module,
	Modules,
}