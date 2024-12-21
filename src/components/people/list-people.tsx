"use client";
import { DataTable } from "../ui/data-table";
import { useEffect } from "react";
import ListPeopleTableColumn from "./(table)/column";
import { usePeople } from "@/hooks/usePeople";

interface props {}

const ListPeopleComponent = ({}: props) => {
	const { isLoading, errors, people, listPeople } = usePeople();

	const fetchPeople = async () => {
		listPeople({
			params: {
				paginate: false,
			},
		});
	};

	useEffect(() => {
		fetchPeople();
	}, []);

	return <DataTable data={people} columns={ListPeopleTableColumn} />;
};

export default ListPeopleComponent;
