"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ accounts }: DoughnutChartProps) {
	const names = accounts.map((account) => account.name);
	const balances = accounts.map((account) => account.currentBalance);

	const generateColor = (name: string) => {
		const colors = [
			"#0747b6",
			"#2265d8",
			"#2f91fa",
			"#1e3a8a",
			"#3b82f6",
			"#60a5fa",
			"#93c5fd",
		];
		let hash = 0;
		for (let i = 0; i < name.length; i++) {
			hash = name.charCodeAt(i) + ((hash << 5) - hash);
		}
		const index = Math.abs(hash % colors.length);
		return colors[index];
	};

	const data = {
		datasets: [
			{
				data: balances,
				backgroundColor: names.map((name) => generateColor(name)),
			},
		],
		labels: names,
	};
	return (
		<Doughnut
			options={{
				cutout: "60%",
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						callbacks: {
							label: (tooltipItem) => {
								const value = tooltipItem.raw as number;
								const formattedValue = new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(value);

								return `${formattedValue}`;
							},
						},
					},
				},
			}}
			data={data}
		/>
	);
}

export default DoughnutChart;
