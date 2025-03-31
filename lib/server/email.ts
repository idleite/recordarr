import prisma from "@/libs/prisma";

export function verifyEmailInput(email: string): boolean {
	return /^.+@.+\..+$/.test(email) && email.length < 256;
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
	const row = await prisma.user.count({
		where: {
			email: email
	}
	})
	if (row === null) {
		throw new Error();
	}
	return row === 0;
}
checkEmailAvailability("harryesses@harryesses.com")