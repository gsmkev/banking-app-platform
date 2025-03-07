import HeaderBox from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import TransactionTable from "@/components/TransactionTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";

async function TransactionHistory({
	searchParams: { id, page },
}: SearchParamProps) {
	const loggedIn = await getLoggedInUser();
	const accounts = await getAccounts({ userId: loggedIn?.$id });
	if (!accounts) return null;
	const accountsData = accounts?.data;
	const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
	const account = await getAccount({ appwriteItemId });
	const points = (number: number) => {
		return "\u25CF".repeat(number);
	};
	const currentPage = Number(page as string) || 1;
	const rowsPerPage = 10;
	const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);
	const indexOfLastTransaction = currentPage * rowsPerPage;
	const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
	const currentTransactions = account?.transactions.slice(
		indexOfFirstTransaction,
		indexOfLastTransaction
	);
	return (
		<section className="transactions">
			<div className="transactions-header">
				<HeaderBox
					title="Transaction History"
					subtext="View your recent transactions here"
				/>
			</div>
			<div className="space-y-6">
				<div className="transactions-account">
					<div className="flex flex-col gap-2">
						<h2 className="text-18 font-bold text-white">
							{account?.data.name}
						</h2>
						<p className="text-14 text-blue-25">{account?.data.officialName}</p>
						<p className="text-14 font-semibold tracking-[1.1px] text-white">
							{points(4)} {points(4)} {points(4)}
							<span className="text-16"> {account?.data.mask}</span>
						</p>
					</div>
					<div className="transactions-account-balance">
						<p className="text-14">Current Balance</p>
						<p className="text-24 text-center font-bold">
							{formatAmount(account?.data.currentBalance)}
						</p>
					</div>
				</div>
				<section className="flex w-full flex-col gap-6">
					<TransactionTable transactions={currentTransactions} />
					{totalPages > 1 && (
						<div className="my-4 w-full">
							<Pagination page={currentPage} totalPages={totalPages} />
						</div>
					)}
				</section>
			</div>
		</section>
	);
}
export default TransactionHistory;
