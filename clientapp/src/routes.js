import Admin from "./pages/Admin";
import { ADMIN_ROUTE, JEWELERY_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CHECKOUT_ROUTE } from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import JeweleryPage from "./pages/JeweleryPage";
import CheckoutPage from "./pages/CheckoutPage"; // Import your Checkout page component

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: JEWELERY_ROUTE + '/:id',
        Component: JeweleryPage
    },
    {
        path: CHECKOUT_ROUTE,  // Add the Checkout route
        Component: CheckoutPage
    }
]
