import HeaderBox from "@/components/Header";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
async function Home() {
	const loggedIn = await getLoggedInUser();

	return (
		<section className="home ">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedIn?.name.split(" ")[0] || "Guest"}
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
