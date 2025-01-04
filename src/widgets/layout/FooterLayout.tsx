import { ReactNode } from "react";
import { DefaultFooter } from "@/widgets/footer";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<main>{children}</main>
			<DefaultFooter />
		</>
	);
}