import { z } from "zod";
import { FormControl, FormLabel, FormMessage, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Control, Path } from "react-hook-form";

function CustomFormField<T extends z.ZodTypeAny>({
	control,
	name,
	placeholder,
	type,
	label,
}: {
	control: Control<z.infer<T>>;
	name: string;
	placeholder: string;
	type?: string;
	label: string;
}) {
	return (
		<FormField
			control={control}
			name={name as Path<z.infer<T>>}
			render={({ field }) => (
				<div className="form-item">
					<FormLabel className="form-label" htmlFor={label as string}>
						{label}
					</FormLabel>
					<div className="flex flex-col w-full">
						<FormControl>
							<Input
								id={name as string}
								className="input-class"
								type={type}
								placeholder={placeholder}
								{...field}
							/>
						</FormControl>
						<FormMessage className="form-message mt-2" />
					</div>
				</div>
			)}
		/>
	);
}

export default CustomFormField;
