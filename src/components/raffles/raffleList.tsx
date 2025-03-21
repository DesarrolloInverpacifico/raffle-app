import { useRaffle } from "@/hooks/useRaffle";
import { useEffect } from "react";
import { DataTable } from "../ui/data-table";
import ListRaffleTableColumn from "./(table)/columns";

const RaffleListComponent = () => {
  const { isLoading, raffles, listRaffles } = useRaffle();

  const fetchRaffles = async () => {
    await listRaffles();
  };

  useEffect(() => {
    fetchRaffles();
  }, []);

  return <DataTable data={raffles || []} columns={ListRaffleTableColumn} />;
};

export default RaffleListComponent;
