export const dynamic = "force-dynamic";

import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/Header";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

async function MyBanks() {
	const loggedIn = await getLoggedInUser();
	const accounts = await getAccounts({ userId: loggedIn?.$id });
	return (
		<section className="flex">
			<div className="my-banks">
				<HeaderBox title="My Banks" subtext="Manage your banks" />
				<div className="space-y-4">
					<h2 className="header-2">Your cards</h2>
					<div className="flex flex-wrap gap-6">
						{accounts?.data.map((account: Account) => (
							<BankCard
								key={account.id}
								userName={loggedIn.firstName}
								account={account}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
export default MyBanks;
