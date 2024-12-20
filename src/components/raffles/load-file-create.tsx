import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FilePlus, FilePlus2 } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { useRaffle } from "@/hooks/useRaffle";

interface props {
	raffleId: string;
}

const LoadFileToCreateRaffleParticipant = ({ raffleId }: props) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [uploadStatus, setUploadStatus] = useState("");

	const {
		isLoading: loadinFile,
		errors: errorFile,
		storeParticipants,
	} = useRaffle();

	const processExcel = async (file: any) => {
		if (!selectedFile) {
			setError("Por favor, selecciona un archivo primero");
			return;
		}

		try {
			setIsLoading(true);
			setError("");
			setUploadStatus("");

			// Crear FormData para enviar el archivo
			const formData = new FormData();
			formData.append("file", selectedFile);
			const response = await storeParticipants(raffleId, formData);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	const handleFileChange = (e: any) => {
		const file = e.target.files?.[0];
		console.log(file);
		if (file) {
			if (!file.name.match(/\.(xlsx|xls)$/)) {
				setError("Por favor, sube un archivo Excel válido (.xlsx o .xls)");
				setSelectedFile(null);
				return;
			}
			setError("");
			setSelectedFile(file);
			setUploadStatus("");
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"default"} className="w-full">
					<span className="mr-3">Nuevo usuario</span>
					<FilePlus2 size={15} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>
						<p className="text-2xl">Crear sorteo</p>
					</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="items-center space-x-2">
					<div className="md:flex space-y-2 md:space-y-0 gap-4">
						<div className="w-full space-y-2">
							<Label>Nombre del sorteo</Label>
							<Input
								type="file"
								placeholder="Sorteo 1"
								accept=".xlsx,.xls"
								onChange={handleFileChange}
							/>
						</div>
					</div>
					<div className="my-5 space-y-3">
						<div className="">
							{selectedFile && !isLoading && (
								<Button onClick={processExcel} className="w-full">
									Cargar archivo
								</Button>
							)}
						</div>
						<div>
							<DialogClose asChild>
								<Button className="w-full" variant={"secondary"}>
									Cancelar
								</Button>
							</DialogClose>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default LoadFileToCreateRaffleParticipant;
