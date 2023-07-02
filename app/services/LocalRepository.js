export default class LocalRepository{
    constructor(){
        this.CART_KEY = "cart";
        this.BEARER_TOKEN_KEY = "auth_token";
    }

    getCart() {
        let cart = localStorage.getItem(this.CART_KEY);
        if(cart==null){
            cart="[]";
        }
        return JSON.parse(cart);
    }

    storeCart(cart){
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }

    addBookToCart(bookToStore){
        let cart = this.getCart();
        let book = cart.find( book => {
            return book.id == bookToStore.id;
        });
        if(book==null){
            const newBook = {...bookToStore, cantidad:1};
            cart.push(newBook);
        }else{
            book.cantidad++;
        }

        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }

    clearCart(){
        localStorage.removeItem(this.CART_KEY);
    }

    storeBearerToken(token){
        localStorage.setItem(this.BEARER_TOKEN_KEY, token);
    }

    getBearerToken(){
        return localStorage.getItem(this.BEARER_TOKEN_KEY);
    }

    deleteBearerToken(){
        localStorage.removeItem(this.BEARER_TOKEN_KEY);
    }
}