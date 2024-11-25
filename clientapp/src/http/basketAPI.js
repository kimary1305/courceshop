// basketAPI.js

// Функция для получения корзины из локального хранилища
export const getBasket = () => {
    const basket = localStorage.getItem('basket');
    return basket ? JSON.parse(basket) : []; // Если корзина пустая, возвращаем пустой массив
};

// Функция для сохранения корзины в локальное хранилище
export const saveBasket = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket)); // Сохраняем корзину в локальном хранилище
};

// Функция для добавления товара в корзину
export const addToBasket = async (item) => {
    try {
        const currentBasket = getBasket(); // Получаем текущую корзину
        const existingItemIndex = currentBasket.findIndex((product) => product.id === item.id);

        if (existingItemIndex !== -1) {
            // Если товар уже есть в корзине, увеличиваем его количество
            currentBasket[existingItemIndex].quantity += 1;
        } else {
            // Если товара нет в корзине, добавляем новый
            item.quantity = 1; // Добавляем свойство количества товара
            currentBasket.push(item);
        }

        // Сохраняем обновленную корзину
        saveBasket(currentBasket);

        // Возвращаем подтверждение добавления товара
        return Promise.resolve('Товар успішно доданий до кошика!');
    } catch (error) {
        console.error("Помилка додавання до кошика:", error);
        return Promise.reject("Не вдалося додати товар до кошика");
    }
};

// Функция для удаления товара из корзины
export const removeFromBasket = (itemId) => {
    const currentBasket = getBasket(); // Получаем текущую корзину
    const updatedBasket = currentBasket.filter(item => item.id !== itemId); // Удаляем товар по ID
    saveBasket(updatedBasket); // Сохраняем обновленную корзину
};

// Функция для очистки корзины
export const clearBasket = () => {
    localStorage.removeItem('basket'); // Удаляем корзину из локального хранилища
};

// Функция для получения общей стоимости корзины
export const getTotalPrice = () => {
    const currentBasket = getBasket();
    return currentBasket.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Функция для получения общего количества товаров в корзине
export const getTotalItems = () => {
    const currentBasket = getBasket();
    return currentBasket.reduce((total, item) => total + item.quantity, 0);
};
