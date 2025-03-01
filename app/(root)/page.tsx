import HeaderBox from "@/components/Header";
import TotalBalanceBox from "@/components/TotalBalanceBox";
function Home() {
	const loggedIn = { firstName: "Kevin" };

	return (
		<section className="home ">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedIn?.firstName || "Guest"}
						subtext="Access and manage yout account and transactions successfully"
					/>

					<TotalBalanceBox
						accounts={[]}
						totalBanks={1}
						totalCurrentBalance={1250.35}
					/>
				</header>
			</div>
		</section>
	);
}
export default Home;
