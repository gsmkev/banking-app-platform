import HeaderBox from "@/components/Header";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
function Home() {
	const loggedIn = {
		firstName: "Kevin",
		lastName: "Galeano",
		email: "gsmkev@gmail.com",
	} as User;

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
				{/* <RecentTransactions /> */}
			</div>
			<RightSidebar
				user={loggedIn}
				transactions={[]}
				banks={[{ currentBalance: 1345.34 }, {}]}
			/>
		</section>
	);
}
export default Home;
