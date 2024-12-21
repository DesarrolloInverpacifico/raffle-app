import ListPeopleComponent from "@/components/people/list-people";
import LoadPeopleByExcel from "@/components/people/load-people-file";

const PeoplePage = () => {
	return (
		<div className="w-full">
			<div className="w-full flex justify-between my-10">
				<h1 className="text-4xl font-bold">Personas</h1>
				<div>
					<LoadPeopleByExcel />
				</div>
			</div>
			<div>
				<ListPeopleComponent />
			</div>
		</div>
	);
};

export default PeoplePage;
