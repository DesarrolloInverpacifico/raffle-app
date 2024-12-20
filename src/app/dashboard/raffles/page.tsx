"use client";
import { DialogRaffleCreate } from "@/components/raffles/create-raffle";
import LoadFileToCreateRaffleParticipant from "@/components/raffles/load-file-create";
import RaffleListComponent from "@/components/raffles/raffleList";
import { Button } from "@/components/ui/button";

const DashboardRafflePage = () => {
	return (
		<div className="w-full">
			<div className="w-full flex justify-between my-10">
				<h1 className="text-4xl font-bold">Sorteos</h1>
				<div>
					{/* <Button variant={"default"}>Nuevo sorteo</Button> */}
					<DialogRaffleCreate />
				</div>
			</div>
			<div>
				<RaffleListComponent />
			</div>
		</div>
	);
};

export default DashboardRafflePage;
