import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<header>
				<h1>My Site</h1>
			</header>
			<main>{children}</main>
			<footer>
				<p>&copy; {new Date().getFullYear()}</p>
			</footer>
		</>
	);
}