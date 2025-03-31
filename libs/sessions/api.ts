import  prisma  from "@/libs/prisma";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

import type { User, Session } from "@prisma/client";

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: number): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		user_id: userId,
		expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await prisma.session.create({
		data: session
	});
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await prisma.session.findUnique({
		where: {
			id: sessionId
		},
		include: {
			user: true
		}
	});
	if (result === null) {
		return { session: null, user: null };
	}
	const { user, ...session } = result;
	if (Date.now() >= session.expires_at.getTime()) {
		await prisma.session.delete({ where: { id: sessionId } });
		return { session: null, user: null };
	}
	if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await prisma.session.update({
			where: {
				id: session.id
			},
			data: {
				expires_at: session.expires_at
			}
		});
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await prisma.session.delete({ where: { id: sessionId } });
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	await prisma.session.deleteMany({
		where: {
			user_id: userId
		}
	});
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };
	export function setSessionTokenCookie(response: Response, token: string, expiresAt: Date): void {
		if (process.env.SECURE) {
			// When deployed over HTTPS

			response.headers.append(
				"Set-Cookie",
				`session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure;`
			);
		} else {
			// When deployed over HTTP (localhost)
			response.headers.append(
				"Set-Cookie",
				`session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/`
			);
		}
	}
	
	export function deleteSessionTokenCookie(response: Response): void {
		if (process.env.SECURE) {
			// When deployed over HTTPS
			response.headers.append(
				"Set-Cookie",
				"session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;"
			);
		} else {
			// When deployed over HTTP (localhost)
			response.headers.append("Set-Cookie", "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/");
		}
	}
	