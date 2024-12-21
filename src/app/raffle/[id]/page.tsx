"use client";

import React, { useState, useRef, useEffect } from "react";
import confettiGenerator from "confetti-js"; // Instala la dependencia: npm install confetti-js
import { Button } from "@/components/ui/button";
import image from "@/assets/bg1.jpg";
import { useParams } from "next/navigation";
import { useRaffle } from "@/hooks/useRaffle";
import { RaffleParticipant } from "@/types/raffle-participant";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface Participanttype {
	id: string;
	name: string;
	lastName: string;
}

const RafflePage = () => {
	const [winner, setWinner] = useState("Selecciona un ganador!");
	const [isZooming, setIsZooming] = useState(false);
	const [employees, setEmployees] = useState<Participanttype[]>([]);
	const [winners, setWinners] = useState<Participanttype[]>([]);

	const canvasRef = useRef(null);
	const rouletteSoundRef = useRef(null);
	const winnerSoundRef = useRef(null);
	const winnerSoundRef2 = useRef(null);

	const { id } = useParams();

	const {
		isLoading,
		participants,
		raffle,
		showParticipants,
		showRaffle,
		storeWinner,
	} = useRaffle();

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
		const maxIterations = 50;

		playRouletteSound();

		const interval = setInterval(() => {
			const randomName: Participanttype =
				employees[Math.floor(Math.random() * employees.length)];
			setWinner(`${randomName.name} ${randomName.lastName}`);
			iterations++;

			if (iterations >= maxIterations) {
				clearInterval(interval);
				selectFinalWinner();
			}
		}, 80);
	};

	const selectFinalWinner = () => {
		const randomIndex = Math.floor(Math.random() * employees.length);
		const randomName: Participanttype = employees[randomIndex];
		// const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
		setWinner(`${randomName.name} ${randomName.lastName}!`);
		setWinners([...winners, randomName]);

		storeWinner(id as string, { people_id: randomName.id })
			.then((resp) => {
				console.log("Update winner");
			})
			.catch((err) => {
				console.log("Error al actualizar");
			});

		// Stop roulette sound and play winner sound
		if (rouletteSoundRef.current) {
			rouletteSoundRef.current.pause();
			rouletteSoundRef.current.currentTime = 0;
		}
		if (winnerSoundRef.current) {
			const playPromise = winnerSoundRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((error: any) =>
					console.error("Error al reproducir el sonido del ganador:", error)
				);
			}
		}
		if (winnerSoundRef2.current) {
			const playPromise = winnerSoundRef2.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((error: any) =>
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
			setTimeout(() => confetti.clear(), 10000); // Stop after 5 seconds
		}
	};

	const fetchRaffle = async () => {
		await showRaffle(id as string);
		const participants = await showParticipants(id as string);
		const p = participants
			.filter(
				(p: RaffleParticipant) =>
					!p.attributes.is_winner && p.attributes.is_active
			)
			.map((p: RaffleParticipant) => {
				return {
					id: p.id,
					name: p.attributes.name,
					lastName: p.attributes.lastName,
				};
			});
		setEmployees(p);
	};

	useEffect(() => {
		if (id) {
			fetchRaffle();
		}
	}, []);

	return (
		<div
			className=" min-h-screen bg-cover text-white text-center py-10"
			style={{ backgroundImage: "url('/bg2.jpg')" }}
		>
			<div className="flex flex-col items-center justify-center">
				<div className="bg-black p-5">
					<h1 className="text-4xl font-bold mb-4 shadow-md uppercase">
						Fiesta de fin de año GANE Buenaventura y dagua 2024
					</h1>
				</div>
				{/* <h2 className="text-3xl font-bold mb-4 shadow-md">
				{raffle?.attributes.name}
			</h2> */}
				<div className="bg-white text-black p-6 rounded-lg shadow-lg">
					<div
						className={`text-4xl uppercase font-extrabold mb-4 transition-transform duration-500 ${
							isZooming ? "scale-125" : "scale-100"
						}`}
					>
						{winner}
					</div>
					<Button
						disabled={isLoading || employees.length == 0}
						onClick={pickWinner}
						className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md shadow-md"
					>
						{isLoading ? "Cargando participantes" : "Seleccionar un ganador"}
					</Button>
				</div>
				<div className="mt-10">
					<h2 className="text-4xl font-bold">Ganadores</h2>
					<Table>
						<TableBody>
							{winners.map((w: Participanttype, index: number) => (
								<TableRow key={index}>
									<TableCell>
										<h3 className="text-2xl font-bold uppercase">
											{index + 1} - {w.name} {w.lastName}
										</h3>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<img
					src="/logo_gane.png"
					width={250}
					className="fixed bottom-5 right-5"
				/>
			</div>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 pointer-events-none"
			></canvas>
			<audio ref={rouletteSoundRef} src="/redoble.mp3" preload="auto"></audio>
			<audio ref={winnerSoundRef} src="/slice3.ogg" preload="auto"></audio>
			<audio ref={winnerSoundRef2} src="/wining2.mp3" preload="auto"></audio>
		</div>
	);
};

export default RafflePage;
