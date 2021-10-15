export class AppConstants {

	public static get baseServidor(): string { return 'http://localhost:8080/' }

	public static get baseLogin(): string { return this.baseServidor + 'login' }

	public static get baseUrlUsuarios(): string { return this.baseServidor + 'usuarios/' }

	public static get baseUrlAnuncios(): string { return this.baseServidor + 'anuncios/' }

}
