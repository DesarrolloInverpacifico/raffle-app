import { useRaffle } from "@/hooks/useRaffle";
import { DataTable } from "../ui/data-table";
import { useEffect } from "react";
import ListPrizeTableColumn from "./(table)/columns";

interface ListPrizeActionTableProps {
	raffleId: string;
}

const ListPrizeComponent = ({ raffleId }: ListPrizeActionTableProps) => {
	const { isLoading, errors, prizes, showPrizes } = useRaffle();

	const fetchPrizes = async () => {
		showPrizes(raffleId);
	};

	useEffect(() => {
		if (raffleId) {
			fetchPrizes();
		}
	}, []);

	return <DataTable data={prizes || []} columns={ListPrizeTableColumn} />;
};

export default ListPrizeComponent;
