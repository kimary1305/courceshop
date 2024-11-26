import { makeAutoObservable } from "mobx";

class BasketStore {
    items = JSON.parse(localStorage.getItem('basket')) || []; 

    constructor() {
        makeAutoObservable(this);
    }

    
    saveToLocalStorage() {
        localStorage.setItem('basket', JSON.stringify(this.items));
    }

   
    addToBasket(item) {
        const existingItemIndex = this.items.findIndex(product => product.id === item.id);
        if (existingItemIndex !== -1) {
            
            this.items[existingItemIndex].quantity += 1;
        } else {
           
            item.quantity = 1;
            this.items.push(item);
        }
        this.saveToLocalStorage(); 
    }

  
    removeFromBasket(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToLocalStorage(); 
    }

   
    increaseQuantity(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity += 1;
            this.saveToLocalStorage(); 
        }
    }

   
    decreaseQuantity(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            this.saveToLocalStorage(); 
        }
    }

   
    clearBasket() {
        this.items = [];
        this.saveToLocalStorage(); 
    }
}

export const basketStore = new BasketStore();
