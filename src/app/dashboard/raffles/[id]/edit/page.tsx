"use client";
import ListCriteriaComponent from "@/components/criteria/list-citeria";
import ListParticipantComponent from "@/components/participants/list-participants";
import ListPrizeComponent from "@/components/prize/list-prize";
import LoadFileToCreateRaffleParticipant from "@/components/raffles/load-file-create";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRaffle } from "@/hooks/useRaffle";
import { PlaySquareIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const RaffleEditPage = () => {
	const { id } = useParams();

	const { isLoading, errors, raffle, showRaffle } = useRaffle();

	const fetchRaffle = async () => {
		await showRaffle(id as string);
	};

	useEffect(() => {
		if (id) {
			fetchRaffle();
		}
	}, []);

	return (
		<>
			{/* // General info */}
			<div className="my-10 flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">{raffle?.attributes.name}</h1>
					<span>{raffle?.attributes.description}</span>
				</div>
				<a
					className="flex h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded"
					href={`/raffle/${raffle?.id}`}
					target="_blank"
				>
					<PlaySquareIcon className="mr-2" />
					<span>Lanzar ruleta</span>
				</a>
			</div>
			<div className="flex">
				{/* Participants */}
				<Card className="flex-1 mr-2">
					<CardHeader>
						<div className="flex justify-between items-center">
							<CardTitle>Participantes</CardTitle>
							<div>
								<LoadFileToCreateRaffleParticipant raffleId={id as string} />
								{/* <Button>Agregar participante</Button> */}
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<ListParticipantComponent raffleId={id as string} />
					</CardContent>
				</Card>
				{/* <div className="flex-1"> */}
				{/* // Criteria */}
				{/* <Card className="flex-1">
						<CardHeader>
							<div className="flex justify-between items-center">
								<CardTitle>Criterio</CardTitle>
								<Button>Nuevo criterio</Button>
							</div>
						</CardHeader>
						<CardContent>
							<ListCriteriaComponent raffleId={id as string} />
						</CardContent>
					</Card> */}
			</div>
		</>
	);
};

export default RaffleEditPage;
