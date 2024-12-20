"use client";

import React, { useState, useRef, useEffect } from "react";
import confettiGenerator from "confetti-js"; // Instala la dependencia: npm install confetti-js
import { Button } from "@/components/ui/button";
import image from "@/assets/bg1.jpg";
import { useParams } from "next/navigation";
import { useRaffle } from "@/hooks/useRaffle";
import { RaffleParticipant } from "@/types/raffle-participant";

const RafflePage = () => {
	const [winner, setWinner] = useState("Selecciona un ganador!");
	const [isZooming, setIsZooming] = useState(false);
	const [employees, setEmployees] = useState([]);

	const canvasRef = useRef(null);
	const rouletteSoundRef = useRef(null);
	const winnerSoundRef = useRef(null);

	const { id } = useParams();

	const { isLoading, participants, raffle, showParticipants, showRaffle } =
		useRaffle();

	// const employees = ["Jhon Doe", "Jane Doe", "Smith Jhon", "Diana Williams"];
	const prizes = [
		"$100.000",
		"$300.000",
		"$500.000",
		"$1.000.000",
		"$3.000.000",
	];

	// Play roulette sound
	const playRouletteSound = () => {
		if (rouletteSoundRef.current) {
			const playPromise = rouletteSoundRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((error) =>
					console.error("Error al reproducir el sonido de ruleta:", error)
				);
			}
		}
	};

	const pickWinner = () => {
		let iterations = 0;
		const maxIterations = 100;

		playRouletteSound();

		const interval = setInterval(() => {
			const randomName =
				employees[Math.floor(Math.random() * employees.length)];
			setWinner(randomName);
			iterations++;

			if (iterations >= maxIterations) {
				clearInterval(interval);
				selectFinalWinner();
			}
		}, 80);
	};

	const selectFinalWinner = () => {
		const randomIndex = Math.floor(Math.random() * employees.length);
		const randomName = employees[randomIndex];
		const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
		setWinner(`${randomName}!`);

		// Stop roulette sound and play winner sound
		if (rouletteSoundRef.current) {
			rouletteSoundRef.current.pause();
			rouletteSoundRef.current.currentTime = 0;
		}
		if (winnerSoundRef.current) {
			const playPromise = winnerSoundRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((error) =>
					console.error("Error al reproducir el sonido del ganador:", error)
				);
			}
		}

		// Trigger zoom effect
		setIsZooming(true);
		setTimeout(() => setIsZooming(false), 500);

		// Trigger confetti
		startConfetti();

		// Remove the winner from the list
		const newParticipants = employees.filter(
			(p, index) => index != randomIndex
		);
		setEmployees(newParticipants);
	};

	const startConfetti = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const confetti = confettiGenerator({ target: canvas });
			confetti.render();
			setTimeout(() => confetti.clear(), 5000); // Stop after 5 seconds
		}
	};

	const fetchRaffle = async () => {
		await showRaffle(id as string);
		const participants = await showParticipants(id as string);

		setEmployees(
			participants &&
				participants.map((p: RaffleParticipant) => p.attributes.name)
		);
	};

	useEffect(() => {
		if (id) {
			fetchRaffle();
		}
	}, []);

	return (
		<div
			className="flex flex-col items-center justify-center min-h-screen bg-cover text-white text-center"
			style={{ backgroundImage: "url('/bg2.jpg')" }}
		>
			<h1 className="text-4xl font-bold mb-4 shadow-md uppercase">
				Fiesta de fin de año GANE Buenaventura y dagua 2024
			</h1>
			<h2 className="text-3xl font-bold mb-4 shadow-md">
				{raffle?.attributes.name}
			</h2>
			<div className="bg-white text-black p-6 rounded-lg shadow-lg">
				<div
					className={`text-4xl font-extrabold mb-4 transition-transform duration-500 ${
						isZooming ? "scale-125" : "scale-100"
					}`}
				>
					{winner}
				</div>
				<Button
					disabled={isLoading}
					onClick={pickWinner}
					className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md shadow-md"
				>
					{isLoading ? "Cargando participantes" : "Seleccionar un ganador"}
				</Button>
			</div>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 pointer-events-none"
			></canvas>
			<audio ref={rouletteSoundRef} src="/roue2.ogg" preload="auto"></audio>
			<audio ref={winnerSoundRef} src="/slice3.ogg" preload="auto"></audio>
		</div>
	);
};

export default RafflePage;
