import { useRaffle } from "@/hooks/useRaffle";
import { DataTable } from "../ui/data-table";
import { useEffect } from "react";
import ListCriteriaTableColumn from "./(table)/columns";

interface ListRaffleParticipantActionTableProps {
	raffleId: string;
}

const ListCriteriaComponent = ({
	raffleId,
}: ListRaffleParticipantActionTableProps) => {
	const { isLoading, errors, criterias, showCriterias } = useRaffle();

	const fetchCriterias = async () => {
		showCriterias(raffleId);
	};

	useEffect(() => {
		if (raffleId) {
			fetchCriterias();
		}
	}, []);

	if (isLoading) {
		return <h2>Vacio</h2>;
	} else if (criterias) {
		return <DataTable data={criterias} columns={ListCriteriaTableColumn} />;
	}
};

export default ListCriteriaComponent;
