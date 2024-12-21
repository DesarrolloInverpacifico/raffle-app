import {
	allPeople,
	checkAssistance,
	uploadByFilePeople,
} from "@/services/people-service";
import { assistanceData, People } from "@/types/people";
import { useState } from "react";

export const usePeople = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [people, setPeople] = useState<People[]>([]);
	const [links, setLinks] = useState<any[]>([]);

	const listPeople = async (config?: any): Promise<void> => {
		setIsLoading(true);

		try {
			const {
				params: { paginate },
			} = config;

			const response = await allPeople(config);
			setPeople(response.data.data);
			console.log(response.data.data);
		} catch (err: any) {
			setErrors(err.data);
		}
	};

	const uploadPeople = async (data: FormData): Promise<any> => {
		setIsLoading(true);
		setErrors({});

		try {
			const response = await uploadByFilePeople(data);
			console.log(response.data);
		} catch (err: any) {
			setErrors(err.data.errors);
		} finally {
			setIsLoading(false);
		}
	};

	const storeAssistance = async (data: assistanceData): Promise<any> => {
		setIsLoading(true);
		setErrors({});

		try {
			const response = await checkAssistance(data);
			return Promise.resolve(response);
		} catch (err: any) {
			setErrors(err.data.errors);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		errors,
		people,
		links,
		listPeople,
		uploadPeople,
		storeAssistance,
	};
};
