"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePeople } from "@/hooks/usePeople";
import { cn } from "@/lib/utils";
import { assistanceData, assistenceSchema } from "@/types/people";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z, ZodType } from "zod";

const DashboardHomePage = () => {
	const {
		handleSubmit,
		setError,
		register,
		formState: { errors: errorsForm },
	} = useForm<z.infer<typeof assistenceSchema>>({
		resolver: zodResolver(assistenceSchema),
	});

	const { isLoading, errors, storeAssistance } = usePeople();

	const formRef = useRef<any>(null);

	const handleCheckAssistance = async (data: assistanceData) => {
		const response = await storeAssistance(data);
		if (response?.data) {
			toast("Asistencia registrada", {
				description: `${response.data.attributes.name} ${response.data.attributes.lastName}`,
				duration: 13000,
			});
			console.log(response);
		}

		formRef.current.reset();
	};

	useEffect(() => {
		if (errors) {
			Object.keys(errors).forEach((field) => {
				setError(field as keyof assistanceData, {
					type: "server",
					message: errors[field],
				});
			});
		}
	}, [errors]);

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="my-10 flex flex-col items-center justify-center">
				<img src="/logo_gane2.png" width={200} />
				<h1 className="text-3xl font-bold my-3">Control de asistencia</h1>
			</div>
			<div className="block">
				<form onSubmit={handleSubmit(handleCheckAssistance)} ref={formRef}>
					<div className="grid flex-1 gap-2 space-y-2">
						<div className="w-full space-y-2">
							<Label className="font-semibold">Cedula</Label>
							<Input
								type="text"
								placeholder="123456"
								{...register("identification")}
								className={cn(
									errorsForm.identification ? "border-red-500" : ""
								)}
							/>
							{errorsForm.identification && (
								<p className="text-red-500">
									{errorsForm.identification.message}
								</p>
							)}
						</div>
						<div className="">
							<Button disabled={isLoading} className="w-full">
								Guardar asistencia
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DashboardHomePage;
