class HKLibraryAPI{
    constructor(){
        this.baseUrl = 'https://pixel-pioneers-laravel-git-etapa2-pixel-pioneer.vercel.app/rest/v1/libros/1';
    }
    

    async getLibros() {
        const response = await fetch(this.baseUrl) // Reemplaza la URL con la URL de tu API
        const data = await response.json();
        return data;
    }
}

export default HKLibraryAPI;