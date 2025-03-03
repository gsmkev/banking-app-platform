import { signOut } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Footer({ user, type = "desktop" }: FooterProps) {
	const router = useRouter();

	const handleLogout = async () => {
		const loggedOut = await signOut();
		if (loggedOut) router.push("/sign-in");
	};

	return (
		<footer className="footer">
			<div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
				<p className="text-xl font-bold text-gray-700 rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
					{user?.name[0]}
				</p>
			</div>

			<div
				className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
			>
				<h1 className="text-14 truncate text-gray-700 font-semibold">
					{user?.name}
				</h1>
				<p className="text-14 truncate font-normal text-gray-600">
					{user?.email}
				</p>
			</div>
			<div className="footer_image" onClick={handleLogout}>
				<Image src="/icons/logout.svg" fill alt="logout" />
			</div>
		</footer>
	);
}
export default Footer;
