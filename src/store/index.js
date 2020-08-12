import Vue from 'vue'
import Vuex from 'vuex'
//import cart from './modules/cart' maybe if I refactor?
//import stores from './modules/stores' maybe if I refactor?

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        suburb: "Riverwood",
        restaurants: [
            {
                restaurantName: "Big B's",
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
                restaurantName: "Rene's Pizza Place",
                restaurantTagline: "Pizza, Pasta, Italian",
                restaurantRating: 4.8,
                numberOfRatings: 155,
                imgSrc: '/img/listing-renes.jpg',
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
                restaurantName: "Golden Ma Lun",
                restaurantTagline: "Chinese, Asian",
                restaurantRating: 3.7,
                numberOfRatings: 149,
                imgSrc: '/img/listing-goldenmalun.jpg',
                menu: [
                    {
                        menuItemName: "Golden Ma Lun Special Rice",
                        menuItemTagline: "Golden Ma Lun Special Rice",
                        menuItemPrice: 15.00,
                        menuItemSrc: '/img/bigb_hungertamer.jpg'
                    },
                    {
                        menuItemName: "Minced Beef Fried Rice with Lettuce",
                        menuItemTagline: "Minced Beef Fried Rice with Lettuce",
                        menuItemPrice: 11.00,
                        menuItemSrc: '/img/bigb_burger1.jpg'
                    },
                    {
                        menuItemName: "Combination Rice Noodles",
                        menuItemTagline: "Combination Rice Noodles",
                        menuItemPrice: 15.00,
                        menuItemSrc: '/img/bigb_burger2.jpg'
                    },
                    {
                        menuItemName: "Thai Green Curry Chicken",
                        menuItemTagline: "Thai Green Curry Chicken",
                        menuItemPrice: 14.50,
                        menuItemSrc: '/img/bigb_burger3.jpg'
                    }
                ]
            },
            {
                restaurantName: "Main Street Kebabs",
                restaurantTagline: "Pizza, Chicken, Casual",
                restaurantRating: 4.2,
                numberOfRatings: 24,
                imgSrc: '/img/listing-kebabs.jpg',
                menu: [
                    {
                        menuItemName: "Mexicana Pizza",
                        menuItemTagline: "tomato base, salami, onion, capsicum, jalapeno & double cheese",
                        menuItemPrice: 17.00,
                        menuItemSrc: '/img/bigb_hungertamer.jpg'
                    },
                    {
                        menuItemName: "Chicken Pide",
                        menuItemTagline: "chicken, mushroom, onion, capsicum, fetta & mozzarella cheese",
                        menuItemPrice: 12.00,
                        menuItemSrc: '/img/bigb_burger1.jpg'
                    },
                    {
                        menuItemName: "Turkey Sausage Pide",
                        menuItemTagline: "Turkish salami, egg, fetta & mozzarella cheese",
                        menuItemPrice: 13.00,
                        menuItemSrc: '/img/bigb_burger2.jpg'
                    },
                    {
                        menuItemName: "Mix Plate",
                        menuItemTagline: "Chicken Shish, Lamb Shish and Adana Served with Rice, Turkish Bread and Salad",
                        menuItemPrice: 25.00,
                        menuItemSrc: '/img/bigb_burger3.jpg'
                    }
                ]
            },
            {
                restaurantName: "The Grounds Keeper Cafe",
                restaurantTagline: "Modern Australian, Cafe",
                restaurantRating: 3,
                numberOfRatings: 21,
                imgSrc: '/img/listing-groundskeeper.jpg',
                menu: [
                    {
                        menuItemName: "Chili Eggs",
                        menuItemTagline: "Spicy avocado and tomato salsa on toasted sourdough, free range poached eggs topped with Dukkah and drizzled with balsamic glaze",
                        menuItemPrice: 19.00,
                        menuItemSrc: '/img/bigb_hungertamer.jpg'
                    },
                    {
                        menuItemName: "Garden Pot",
                        menuItemTagline: "Zaatar free range fried eggs in a clay pot, served with tomatoes, cucumber, olives, labna, mint and pita bread",
                        menuItemPrice: 23.00,
                        menuItemSrc: '/img/bigb_burger1.jpg'
                    },
                    {
                        menuItemName: "Yogurt and Granola",
                        menuItemTagline: "Roasted granola topped with natural yogurt, mixed berries, crushed pistachio and honey",
                        menuItemPrice: 14.00,
                        menuItemSrc: '/img/bigb_burger2.jpg'
                    },
                    {
                        menuItemName: "Shakshouka",
                        menuItemTagline: "Clay pot cooked free range eggs with tomatoes, capsicum and organic merguez sausages ragu served with pita bread",
                        menuItemPrice: 21.00,
                        menuItemSrc: '/img/bigb_burger3.jpg'
                    }
                ]
            },
            {
                restaurantName: "Westpoint Noodle and Dumpling Bar",
                restaurantTagline: "Chinese, Thai, Asian",
                restaurantRating: 4.2,
                numberOfRatings: 3,
                imgSrc: '/img/listing-westpoint.jpg',
                menu: [
                    {
                        menuItemName: "Nasi Goreng",
                        menuItemTagline: "Indonesian fried rice with chicken, prawn, egg, bean sprouts, chilli paste and curry powder.",
                        menuItemPrice: 14.30,
                        menuItemSrc: '/img/bigb_hungertamer.jpg'
                    },
                    {
                        menuItemName: "Combination Pad Thai",
                        menuItemTagline: "Rice noodle with chicken, egg and prawn.",
                        menuItemPrice: 16.80,
                        menuItemSrc: '/img/bigb_burger1.jpg'
                    },
                    {
                        menuItemName: "Pad See Ew",
                        menuItemTagline: "Flat rice noodle with chicken and egg in a sweet soy sauce.",
                        menuItemPrice: 17.80,
                        menuItemSrc: '/img/bigb_burger2.jpg'
                    },
                    {
                        menuItemName: "Mie Goreng",
                        menuItemTagline: "Indonesian fried Hokkien noodles with chicken, prawn, egg, chilli paste and curry powder.",
                        menuItemPrice: 21.00,
                        menuItemSrc: '/img/bigb_burger3.jpg'
                    }
                ]
            },
        ],
        cart: {
            0:[0]
        }
    },
    getters: {
        restaurantsInCart: state =>{
            return Object.keys(state.cart).length;
        },
        cartSubtotal: state => {
            let subtotal = 0;
            for (let [key, values] of Object.entries(state.cart)) {
                values.forEach (item => {
                    subtotal += state.restaurants[key].menu[item].menuItemPrice;
                })
            }
            return subtotal;
        },
        cartDelivery: state => {
            let basePricePerRestaurant = 5;
            let numberOfRestaurants = Object.keys(state.cart).length;
            return basePricePerRestaurant * numberOfRestaurants;
        },
        cartTotal: (state, getters) => {
            return getters.cartSubtotal + getters.cartDelivery;
        }
    },
    mutations: {
        removeFromCart(state,{restaurantID,menuItemID}) {
            //find first occurrence of menuItemID
            let idx = state.cart[restaurantID].indexOf(menuItemID)
            console.log(`removing ${menuItemID} from ${restaurantID}`);

            //splice it out
            state.cart[restaurantID].splice(menuItemID,1);

            if(state.cart[restaurantID].length===0){
                Vue.delete(state.cart,restaurantID)
            }
        },
        addToCart(state,{restaurantID,menuItemID}){
            //if it doesn't exist
            if (!state.cart.hasOwnProperty(restaurantID)){
                console.log("Cart doesn't have this restaurant");
                Vue.set(state.cart,restaurantID,[]);
            }

            console.log(`Adding ${menuItemID} to ${restaurantID}`);
            state.cart[restaurantID].push(menuItemID);
        }
    }
})