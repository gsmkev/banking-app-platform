import HeaderBox from "@/components/Header";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

async function Home({ searchParams: { id, page } }: SearchParamProps) {
	const loggedIn = await getLoggedInUser();

	const accounts = await getAccounts({ userId: loggedIn?.$id });
	if (!accounts) return null;
	const accountData = accounts?.data;
	const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;
	const account = await getAccount({ appwriteItemId });

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
						accounts={accountData}
						totalBanks={accounts?.totalBanks}
						totalCurrentBalance={accounts?.totalCurrentBalance}
					/>
				</header>
				{/* <RecentTransactions /> */}
			</div>
			<RightSidebar
				user={loggedIn}
				transactions={accounts?.transactions}
				banks={accountData?.slice(0, 2)}
			/>
		</section>
	);
}
export default Home;
