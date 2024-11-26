export const getBasket = () => {
    const basket = localStorage.getItem('basket');
    return basket ? JSON.parse(basket) : []; 
};


export const saveBasket = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket)); 
};


export const addToBasket = async (item) => {
    try {
        const currentBasket = getBasket(); 
        const existingItemIndex = currentBasket.findIndex((product) => product.id === item.id);

        if (existingItemIndex !== -1) {
            
            currentBasket[existingItemIndex].quantity += 1;
        } else {
           
            item.quantity = 1;
            currentBasket.push(item);
        }

        
        saveBasket(currentBasket);

       
        return Promise.resolve('Товар успішно доданий до кошика!');
    } catch (error) {
        console.error("Помилка додавання до кошика:", error);
        return Promise.reject("Не вдалося додати товар до кошика");
    }
};


export const removeFromBasket = (itemId) => {
    const currentBasket = getBasket(); 
    const updatedBasket = currentBasket.filter(item => item.id !== itemId); 
    saveBasket(updatedBasket); 
};


export const clearBasket = () => {
    localStorage.removeItem('basket'); 
};


export const getTotalPrice = () => {
    const currentBasket = getBasket();
    return currentBasket.reduce((total, item) => total + (item.price * item.quantity), 0);
};


export const getTotalItems = () => {
    const currentBasket = getBasket();
    return currentBasket.reduce((total, item) => total + item.quantity, 0);
};
