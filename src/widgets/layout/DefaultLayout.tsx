import { ReactNode } from "react";
import { DefaultHeader } from "@/widgets/header";
import { DefaultFooter } from "@/widgets/footer";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<DefaultHeader />
			<main>{children}</main>
			<DefaultFooter />
		</>
	);
}