"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

const RafflePage = () => {
	const [names, setNames] = useState([
		"Alice",
		"Bob",
		"Charlie",
		"Diana",
		"Eve",
	]);
	const [winnerCount, setWinnerCount] = useState(3);
	const [currentOffset, setCurrentOffset] = useState(0);
	const [slotNames, setSlotNames] = useState<any>([]);

	useEffect(() => {
		setSlotNames([...names, ...names.slice(0, 2)]);
	}, []);

	const createSlot = () => {
		setSlotNames([...names, ...names.slice(0, 2)]);
		setCurrentOffset(0);
	};

	const startConfetti = () => {
		const duration = 5 * 1000;
		const end = Date.now() + duration;

		(function frame() {
			confetti({
				particleCount: 2,
				angle: 60,
				spread: 55,
				origin: { x: 0 },
			});
			confetti({
				particleCount: 2,
				angle: 120,
				spread: 55,
				origin: { x: 1 },
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		})();
	};

	const spinSlot = async () => {
		if (winnerCount < 1 || winnerCount > names.length) {
			alert("Please enter a valid number of winners.");
			return;
		}

		for (let i = 0; i < winnerCount; i++) {
			if (names.length === 0) {
				alert("All participants have already won!");
				return;
			}

			const randomIndex = Math.floor(Math.random() * names.length);
			const offset = randomIndex * 50; // Each name is 50px high
			const totalHeight = names.length * 50;

			setCurrentOffset(-(totalHeight + offset));

			await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for animation

			const winnerName = names[randomIndex];
			startConfetti();

			alert(`Winner ${i + 1}: ${winnerName}`);

			setNames((prevNames) => {
				const updatedNames = [...prevNames];
				updatedNames.splice(randomIndex, 1);
				return updatedNames;
			});

			createSlot();
		}
	};

	return (
		<div
			style={{
				fontFamily: "Poppins, sans-serif",
				textAlign: "center",
				padding: "20px",
				background: "#263B89",
				color: "#FFFFFF",
				minHeight: "100vh",
			}}
		>
			<h1
				style={{ color: "#FFFFFF", marginBottom: "20px", fontSize: "2.5rem" }}
			>
				Random Winner Picker - Vertical Slot
			</h1>
			{/* <input
				type="number"
				value={winnerCount}
				onChange={(e) => setWinnerCount(Number(e.target.value))}
				placeholder="Enter number of winners"
				min="1"
				max={names.length}
				style={{
					margin: "10px",
					padding: "10px",
					fontSize: "1rem",
					borderRadius: "5px",
					border: "2px solid #F6C734",
				}}
			/> */}
			<div
				style={{
					width: "200px",
					height: "50px",
					overflow: "hidden",
					border: "4px solid #FFFFFF",
					borderRadius: "10px",
					backgroundColor: "#F6C734",
					margin: "0 auto",
					position: "relative",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: `${currentOffset}px`,
						transition: "top 3s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
					}}
				>
					{slotNames.map((name: any, index: number) => (
						<div
							key={index}
							style={{
								height: "50px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "1.2rem",
								fontWeight: "bold",
								color: "#263B89",
								background: "#FFFFFF",
								borderBottom: "2px solid #F6C734",
							}}
						>
							{name}
						</div>
					))}
				</div>
			</div>
			<Button
				onClick={spinSlot}
				style={{
					padding: "10px 20px",
					fontSize: "1rem",
					fontWeight: "bold",
					color: "#FFFFFF",
					backgroundColor: "#F6C734",
					border: "none",
					borderRadius: "5px",
					cursor: "pointer",
					marginTop: "20px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
				}}
			>
				Spin the Slot
			</Button>
		</div>
	);
};

export default RafflePage;
