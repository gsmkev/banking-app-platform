"use client";

import CountUp from "react-countup";

function AnimatedCounter({ number }: { number: number }) {
	return (
		<div className="w-full">
			<CountUp end={number} prefix="$" decimals={2} />
		</div>
	);
}
export default AnimatedCounter;
