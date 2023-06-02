export default class LocalRepository{
    constructor(){
        this.CART_KEY = "cart";
    }

    getCart() {
        let cart = localStorage.getItem(this.CART_KEY);
        if(cart==null){
            cart="[]";
        }
        return JSON.parse(cart);
    }

    addBookToCart(bookID){
        let cart = this.getCart();
        let book = cart.find( book => {
            return book.id == bookID;
            
        });
        if(book==null){
            const newBook = {
                "id": bookID,
                "cantidad": 1
            }
            cart.push(newBook);
        }else{
            book.cantidad++;
        }

        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }
}