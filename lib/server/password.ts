import { hash, verify } from "@node-rs/argon2";
import { sha1 } from "@oslojs/crypto/sha1";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { pbkdf2Sync, randomBytes } from "crypto";
export function hashPassword(password: string) {
	const salt = randomBytes(16).toString('hex'); 
  
	// Hash the salt and password with 1000 iterations, 64 length and sha512 digest 
	const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return {salt, hash};
}

export function verifyPasswordHash(hash: string, password: string, salt: string): boolean {
  
	// Hash the salt and password with 1000 iterations, 64 length and sha512 digest 
	const newHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return hash==newHash
}

export async function verifyPasswordStrength(password: string): Promise<boolean> {
	if (password.length < 8 || password.length > 255) {
		return false;
	}
	const hash = encodeHexLowerCase(sha1(new TextEncoder().encode(password)));
	const hashPrefix = hash.slice(0, 5);
	const response = await fetch(`https://api.pwnedpasswords.com/range/${hashPrefix}`);
	const data = await response.text();
	const items = data.split("\n");
	for (const item of items) {
		const hashSuffix = item.slice(0, 35).toLowerCase();
		if (hash === hashPrefix + hashSuffix) {
			return false;
		}
	}
	return true;
}
