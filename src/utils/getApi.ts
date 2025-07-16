export function getApiUrl(): string {
	if (!process.env.NEXT_PUBLIC_API_URL) {
		throw new Error("NEXT_PUBLIC_API_URL n'est pas définie.");
	}
	return process.env.NEXT_PUBLIC_API_URL;
}