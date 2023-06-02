import { EMPTYBOOK } from "../data/Models";

//Error constanst
export const ERROR_404 = "404";
export const ERROR_422 = "422"; 

class HKLibraryAPI{
    constructor(){
        this.baseUrl = 'https://pixel-pioneers-laravel-git-etapa2-pixel-pioneer.vercel.app/rest/v1';
    }
    

    async getBooks() {
        const END_POINT = "/libros/";
        const response = await fetch(this.baseUrl+END_POINT);
        const data = await response.json();

        return data.data;
    }

    async getBook(id){
        const END_POINT = "/libros/";
        const resultFetch = fetch(this.baseUrl+END_POINT+id)
            .then(response => {
                return response.json();
            })
            .then( data => {
                let result = data;
                if(data.error){
                   result = EMPTYBOOK; 
                }
                return result;
            });

        return resultFetch;
    }

    async getAuthor(id){
        const END_POINT = "/autores/";
        const response = await fetch(this.baseUrl+END_POINT+id);
        const data = await response.json();
    
        return data.data;
    }
    
    async getAuthors(){
        const END_POINT = "/autores/";
        const response = await fetch(this.baseUrl+END_POINT);
        const data = await response.json();
    
        return data.data;
    }

    async getGenres(){
        const END_POINT = "/generos/";
        const response = await fetch(this.baseUrl+END_POINT);
        const data = await response.json();
    
        return data.data;
    }

    async getGenre(id){
        const END_POINT = "/generos/";
        const response = await fetch(this.baseUrl+END_POINT+id);
        const data = await response.json();
    
        return data.data;
    }
}

export default HKLibraryAPI;