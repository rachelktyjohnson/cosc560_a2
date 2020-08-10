import Vue from 'vue'
import Vuex from 'vuex'
//import cart from './modules/cart' maybe if I refactor?
//import stores from './modules/stores' maybe if I refactor?

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        restaurants: [
            {
                restaurantName: "Big B's Chicken and Burgers",
                restaurantTagline: "Chicken, burgers, chips, American",
                restaurantRating: 4.9,
                numberOfRatings: 203,
                imgSrc: '/img/listing-bigb.jpg',
                menu: [
                    {
                        menuItemName: "The Hunger Tamer",
                        menuItemTagline: "Quarter Chicken of the Day, chips, random 500ml can",
                        menuItemPrice: 6.50,
                        menuItemSrc: '/img/bigb_hungertamer.jpg'
                    },
                    {
                        menuItemName: "Double Beef Burger",
                        menuItemTagline: "Two beef patties, cheese, tomato, onion, lettuce",
                        menuItemPrice: 9.80,
                        menuItemSrc: '/img/bigb_burger1.jpg'
                    },
                    {
                        menuItemName: "Poured Egg Burger",
                        menuItemTagline: "Beef patty, cheese, tomato, lettuce, scrambled egg",
                        menuItemPrice: 10.80,
                        menuItemSrc: '/img/bigb_burger2.jpg'
                    },
                    {
                        menuItemName: "Barbe-Q Galore",
                        menuItemTagline: "Beef patty, bacon, red onion, tomato, lettuce, bbq sauce",
                        menuItemPrice: 12.10,
                        menuItemSrc: '/img/bigb_burger3.jpg'
                    }
                ]
            },
            {
                restaurantName: "Crust Pizza",
                restaurantTagline: "Chicken, Lebanese",
                restaurantRating: 3.8,
                numberOfRatings: 46,
                imgSrc: '/img/listing-crustpizza.jpg',
                menu: [
                    {
                        menuItemName: "The Grand Pepperoni",
                        menuItemTagline: "Pepperoni, chives, cheese",
                        menuItemPrice: 13.50,
                        menuItemSrc: '/img/bigb_hungertamer.jpg'
                    },
                    {
                        menuItemName: "Classic Cheeseburger",
                        menuItemTagline: "Mince, cheese, burger sauce",
                        menuItemPrice: 14.50,
                        menuItemSrc: '/img/bigb_burger1.jpg'
                    },
                    {
                        menuItemName: "The Riverwood",
                        menuItemTagline: "Questionable meat, surprise cheese",
                        menuItemPrice: 14.50,
                        menuItemSrc: '/img/bigb_burger2.jpg'
                    },
                    {
                        menuItemName: "Garlic Bread (Side)",
                        menuItemTagline: "Exactly what it says",
                        menuItemPrice: 4.50,
                        menuItemSrc: '/img/bigb_burger3.jpg'
                    }
                ]
            },
            {
                restaurantName: "El Jannah",
                restaurantTagline: "Chicken, Middle Eastern",
                restaurantRating: 3.8,
                numberOfRatings: 263,
                imgSrc: '/img/listing-eljannah.jpg'
            },
            {
                restaurantName: "Golden Ma Lun",
                restaurantTagline: "Chinese, Asian",
                restaurantRating: 3.7,
                numberOfRatings: 149,
                imgSrc: '/img/listing-goldenmalun.jpg'
            },
            {
                restaurantName: "Main Street Kebabs",
                restaurantTagline: "Pizza, Chicken, Casual",
                restaurantRating: 4.2,
                numberOfRatings: 24,
                imgSrc: '/img/listing-kebabs.jpg'
            },
            {
                restaurantName: "Rene's Pizza Place",
                restaurantTagline: "Pizza, Pasta, Italian",
                restaurantRating: 4.8,
                numberOfRatings: 155,
                imgSrc: '/img/listing-renes.jpg'
            },
            {
                restaurantName: "The Grounds Keeper Cafe",
                restaurantTagline: "Modern Australian, Cafe",
                restaurantRating: 3,
                numberOfRatings: 21,
                imgSrc: '/img/listing-groundskeeper.jpg'
            },
            {
                restaurantName: "Westpoint Noodle and Dumpling Bar",
                restaurantTagline: "Chinese, Thai, Asian",
                restaurantRating: 4.2,
                numberOfRatings: 3,
                imgSrc: '/img/listing-westpoint.jpg'
            },
            {
                restaurantName: "Chaska Indian Street Food",
                restaurantTagline: "Indian, Street Food",
                restaurantRating: 3.8,
                numberOfRatings: 5,
                imgSrc: '/img/listing-chaska.jpg'
            },
        ],
        cart: {
            1: [0, 2, 2],
            0: [0]
        }
    },
    mutations: {
        removeFromCart(state,restaurantID,menuItemID) {
            //find first occurrence of menuItemID
            let idx = state.cart[restaurantID].indexOf(menuItemID)

            //splice it out
            state.cart[restaurantID].splice(idx,1);
        }
    }
})