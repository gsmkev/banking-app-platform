"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ accounts }: DoughnutChartProps) {
	const data = {
		datasets: [
			{
				label: "Banks",
				data: [1250, 2500, 3656],
				backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
			},
		],
		labels: ["Bank of America", "Chase", "Wells Fargo"],
	};
	return (
		<Doughnut
			options={{
				cutout: "60%",
				plugins: {
					legend: {
						display: false,
					},
				},
			}}
			data={data}
		/>
	);
}
export default DoughnutChart;
