class HKLibraryAPI{
    constructor(){
        this.baseUrl = 'https://pixel-pioneers-laravel-git-entregapromocion-pixel-pioneer.vercel.app/rest/v1';
    }
    

    async getBooks() {
        const END_POINT = "/libros/";
        const response = await fetch(this.baseUrl+END_POINT);
        const data = await response.json();

        return data.data;
    }
    
    async getBooksByTitle(title) {
        const END_POINT = "/libros/"+title+"/searchTitle";
        const response = await fetch(this.baseUrl+END_POINT);
        const data = await response.json();
        let result = [];
        if(data.data){
            result = data.data;
        }
        return result;
    }

    async getBooksByAuthor(author) {
        const END_POINT = "/libros/"+author+"/searchAuthor";
        const response = await fetch(this.baseUrl+END_POINT);
        const data = await response.json();
        let result = [];
        if(data.data){
            result = data.data;
        }
        return result;
    }

    async getBooksByGenre(genre) {
        const END_POINT = "/libros/"+genre+"/searchGenre";
        const response = await fetch(this.baseUrl+END_POINT);
        const data = await response.json();
        let result = [];
        if(data.data){
            result = data.data;
        }
        return result;
    }



    async getBook(id){
        const END_POINT = "/libros/";
        const EMPTYBOOK={};
        const resultFetch = fetch(this.baseUrl+END_POINT+id)
            .then(response => {
                return response.json();
            })
            .then( data => {
                let result = EMPTYBOOK;
                if(data.data){
                    result = data.data;
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

    //Retorna un json con "message" con el mensaje de error, o "data" con los datos de la compra.
    async makePurchase(purchaseData){
        const END_POINT = "/pedidos";

        const message = {
            method: "POST",
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(purchaseData)
        }

        return fetch(this.baseUrl+END_POINT, message)
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            });
    }
}

export default HKLibraryAPI;