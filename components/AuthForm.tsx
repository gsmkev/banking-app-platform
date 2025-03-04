"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { signInFormSchema, signUpFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const signInFields: Array<{
	name: keyof z.infer<typeof signInFormSchema>;
	label: string;
	placeholder: string;
	size?: "1" | "2";
	type?: "email" | "password";
}> = [
	{
		name: "email",
		label: "Email",
		placeholder: "Enter your email",
		type: "email",
	},
	{
		name: "password",
		label: "Password",
		placeholder: "Enter your password",
		type: "password",
	},
];

const signUpFields: Array<{
	name: keyof z.infer<typeof signUpFormSchema>;
	label: string;
	placeholder: string;
	size?: "1" | "2";
	type?: "email" | "password" | "text" | "number" | "date";
}> = [
	{
		name: "firstName",
		label: "First Name",
		placeholder: "Enter your first name",
		size: "1",
		type: "text",
	},
	{
		name: "lastName",
		label: "Last Name",
		placeholder: "Enter your last name",
		size: "1",
		type: "text",
	},
	{
		name: "address1",
		label: "Address",
		placeholder: "Enter your address",
		size: "2",
		type: "text",
	},
	{
		name: "city",
		label: "City",
		placeholder: "Enter your city",
		size: "2",
		type: "text",
	},
	{
		name: "state",
		label: "State",
		placeholder: "Enter your state",
		size: "1",
		type: "text",
	},
	{
		name: "dateOfBirth",
		label: "Date of Birth",
		placeholder: "YYYY-MM-DD",
		size: "1",
		type: "date",
	},
	{
		name: "ssn",
		label: "SSN",
		placeholder: "Enter your SSN",
		size: "1",
		type: "number",
	},
	{
		name: "postalCode",
		label: "Postal Code",
		placeholder: "Enter your postal code",
		size: "1",
		type: "text",
	},
	{
		name: "email",
		label: "Email",
		placeholder: "Enter your email",
		size: "1",
		type: "email",
	},
	{
		name: "password",
		label: "Password",
		placeholder: "Enter your password",
		size: "1",
		type: "password",
	},
];

function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const isSignIn = type === "sign-in";
	const schema = isSignIn ? signInFormSchema : signUpFormSchema;
	const fields = isSignIn ? signInFields : signUpFields;

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: Object.fromEntries(
			Object.keys(schema.shape).map((key) => [key, ""])
		),
	});

	async function handleSignIn(values: z.infer<typeof signInFormSchema>) {
		setIsLoading(true);

		const response = await signIn({
			email: values.email,
			password: values.password,
		});

		console.log("authForm", response);

		if (response) router.push("/");

		setIsLoading(false);
	}

	async function handleSignUp(values: z.infer<typeof signUpFormSchema>) {
		setIsLoading(true);

		const userData = {
			firstName: values.firstName!,
			lastName: values.lastName!,
			address1: values.address1!,
			city: values.city!,
			state: values.state!,
			postalCode: values.postalCode!,
			dateOfBirth: values.dateOfBirth!,
			ssn: values.ssn!,
			email: values.email,
			password: values.password,
		};

		const user = await signUp(userData);
		setUser(user);

		setIsLoading(false);
	}

	function handleSubmit(values: z.infer<typeof schema>) {
		if (isSignIn) {
			handleSignIn(values as z.infer<typeof signInFormSchema>);
		} else {
			handleSignUp(values as z.infer<typeof signUpFormSchema>);
		}
	}

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
					<Image
						src="/icons/logo.svg"
						width={34}
						height={34}
						alt="Horizon logo"
					/>
					<h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
						Horizon
					</h1>
				</Link>
				<div className="flex flex-col gap-1 md:gap-3">
					<h1 className="text-24 lg:text-36 font-semibold text-gray-900">
						{user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
						<p className="text-16 font-normal text-gray-600">
							{user
								? "Link your account to get started"
								: "Please enter your details to continue"}
						</p>
					</h1>
				</div>
			</header>
			{user ? (
				<div className="flex flex-col gap-4">
					<PlaidLink user={user} variant="primary" />
				</div>
			) : (
				<>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<div
								className={`pb-8 ${
									isSignIn
										? "space-y-8"
										: "grid grid-cols-1 md:grid-cols-2 gap-8"
								}`}
							>
								{fields.map((field) => (
									<div
										key={field.name}
										className={
											isSignIn
												? ""
												: field.size === "2"
												? "md:col-span-2"
												: "md:col-span-1"
										}
									>
										<CustomFormField
											control={form.control}
											name={field.name}
											label={field.label}
											type={field.type ?? "text"}
											placeholder={field.placeholder}
										/>
									</div>
								))}
							</div>

							<Button
								className="form-btn w-full pt"
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? (
									<Loader2 size={20} className="animate-spin" />
								) : isSignIn ? (
									"Sign In"
								) : (
									"Sign Up"
								)}
							</Button>
						</form>
					</Form>
					<footer className="flex justify-center gap-1">
						<p className="text-14 text-gray-600">
							{type === "sign-in"
								? "Don't have an account?"
								: "Already have an account?"}
						</p>
						<Link
							href={`/sign-${type.includes("in") ? "up" : "in"}`}
							className="form-link"
						>
							{type === "sign-in" ? "Sign Up" : "Sign In"}
						</Link>
					</footer>
				</>
			)}
		</section>
	);
}
export default AuthForm;
