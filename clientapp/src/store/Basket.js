// basketStore.js
import { makeAutoObservable } from "mobx";

class BasketStore {
    items = JSON.parse(localStorage.getItem('basket')) || []; // Загружаем корзину из localStorage

    constructor() {
        makeAutoObservable(this);
    }

    // Сохранение корзины в localStorage
    saveToLocalStorage() {
        localStorage.setItem('basket', JSON.stringify(this.items));
    }

    // Добавление товара в корзину
    addToBasket(item) {
        const existingItemIndex = this.items.findIndex(product => product.id === item.id);
        if (existingItemIndex !== -1) {
            // Если товар уже в корзине, увеличиваем его количество
            this.items[existingItemIndex].quantity += 1;
        } else {
            // Если товар новый, добавляем его в корзину
            item.quantity = 1;
            this.items.push(item);
        }
        this.saveToLocalStorage(); // Сохраняем корзину в localStorage
    }

    // Удаление товара из корзины
    removeFromBasket(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToLocalStorage(); // Сохраняем изменения в localStorage
    }

    // Увеличение количества товара
    increaseQuantity(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity += 1;
            this.saveToLocalStorage(); // Сохраняем изменения в localStorage
        }
    }

    // Уменьшение количества товара
    decreaseQuantity(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            this.saveToLocalStorage(); // Сохраняем изменения в localStorage
        }
    }

    // Очистка корзины
    clearBasket() {
        this.items = [];
        this.saveToLocalStorage(); // Сохраняем изменения в localStorage
    }
}

export const basketStore = new BasketStore();
