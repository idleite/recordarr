import  prisma  from "@/libs/prisma";
import { decrypt, decryptToString, encrypt, encryptString } from "./encryption";
import { hashPassword, verifyPasswordHash } from "./password";
import { generateRandomRecoveryCode } from "./utils";

export function verifyUsernameInput(username: string): boolean {
	return username.length > 3 && username.length < 32 && username.trim() === username;
}

export async function createUser(email: string, username: string, password: string): Promise<User> {
	"use server"
	const {salt, hash} = hashPassword(password);
	const row = await prisma.user.create({
		data: {
			email,
			username,
			password_hash: hash,
			salt
		}
	})
	

	if (row === null) {
		throw new Error("Unexpected error");
	}
	const user: User = {
		id: row.id,
		username,
		email
	};
	return user;
}

export async function updateUserPassword(userId: number, password: string): Promise<void> {
	const {salt, hash} = hashPassword(password);
	prisma.user.update({
		where: {
			id: userId
		},
		data: {
			salt,
			password_hash: hash
		}
	})
}



export async function checkUserPassword(userId: number, password: string): Promise<boolean> {
	var user = await prisma.user.findUnique({
		where: {
			id: userId,
		}
	}); 
	if (user === null) {
		throw new Error("Invalid user ID");
	}

	return 	verifyPasswordHash(user.password_hash, password, user.salt);
}



export async function getUserFromEmail(email: string): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	})

	return user;
}

export interface User {
	id: number;
	email: string;
	username: string;
}
