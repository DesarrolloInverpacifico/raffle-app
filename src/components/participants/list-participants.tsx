import { useRaffle } from "@/hooks/useRaffle";
import { DataTable } from "../ui/data-table";
import { useEffect } from "react";
import ListParticipantTableColumn from "./(table)/columns";
import { RaffleParticipant } from "@/types/raffle-participant";

interface ListRaffleParticipantActionTableProps {
  raffleId: string;
  participants: RaffleParticipant[];
  isLoading: boolean;
}

const ListParticipantComponent = ({
  raffleId,
  participants,
  isLoading,
}: ListRaffleParticipantActionTableProps) => {
  // const { isLoading, errors, participants, showParticipants } = useRaffle();

  // const fetchParticipants = async () => {
  // 	showParticipants(raffleId);
  // };

  // useEffect(() => {
  // 	if (raffleId) {
  // 		fetchParticipants();
  // 	}
  // }, []);

  if (isLoading) {
    return <h2>Vacio</h2>;
  } else if (participants) {
    return (
      <DataTable data={participants} columns={ListParticipantTableColumn} />
    );
  }
};

export default ListParticipantComponent;
