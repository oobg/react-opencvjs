import { useNavigate } from "react-router-dom";
import routerMap from "@/app/routes/routes.tsx";

export default function Header() {
	const navigate = useNavigate();

	return (
		<header>
			<nav className="flex justify-between">
				{routerMap.map((route, index) => (
					<button
						key={index}
						onClick={() => navigate(route.path || "/")} // 경로로 이동
						style={{ margin: "5px", padding: "10px" }}
					>
						{route.path || "경로 없어요"} {/* 라우터 레이블 */}
					</button>
				))}
			</nav>
		</header>
	);
}