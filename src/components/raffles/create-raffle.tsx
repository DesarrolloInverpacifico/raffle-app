import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRaffle } from "@/hooks/useRaffle";
import { raffleData, raffleSchema } from "@/types/raffle";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

export const DialogRaffleCreate = () => {
	const {
		handleSubmit,
		setError,
		formState: {},
		register,
	} = useForm<z.infer<typeof raffleSchema>>({
		resolver: zodResolver(raffleSchema),
	});

	const { isLoading, errors, storeRaffle } = useRaffle();

	const router = useRouter();

	const handleCreateRaffle = (data: raffleData) => {
		storeRaffle(data)
			.then((resp) => {
				console.log(resp);
				router.push(`/dashboard/raffles/${resp.id}/edit`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"default"} className="w-full">
					<span className="mr-3">Nuevo usuario</span>
					<UserPlus size={15} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>
						<p className="text-2xl">Crear sorteo</p>
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(handleCreateRaffle)}
					className="flex items-center space-x-2"
				>
					<div className="grid flex-1 gap-2 space-y-2">
						<div className="md:flex space-y-2 md:space-y-0 gap-4">
							<div className="w-full space-y-2">
								<Label>Nombre del sorteo</Label>
								<Input
									type="text"
									placeholder="Sorteo 1"
									{...register("name")}
								/>
							</div>
						</div>
						<div className=" space-y-2">
							<div className="">
								<Button disabled={isLoading} className="w-full">
									Crear
								</Button>
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
				</form>
			</DialogContent>
		</Dialog>
	);
};
