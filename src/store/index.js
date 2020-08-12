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
                        menuItemSrc: '/img/rene_1.jpg'
                    },
                    {
                        menuItemName: "Classic Cheeseburger",
                        menuItemTagline: "Mince, cheese, burger sauce",
                        menuItemPrice: 14.50,
                        menuItemSrc: '/img/rene_2.jpg'
                    },
                    {
                        menuItemName: "The Riverwood",
                        menuItemTagline: "Questionable meat, surprise cheese",
                        menuItemPrice: 14.50,
                        menuItemSrc: '/img/rene_3.jpg'
                    },
                    {
                        menuItemName: "Garlic Bread (Side)",
                        menuItemTagline: "Exactly what it says",
                        menuItemPrice: 4.50,
                        menuItemSrc: '/img/rene_4.jpg'
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
                        menuItemSrc: '/img/golden_1.jpg'
                    },
                    {
                        menuItemName: "Minced Beef Fried Rice with Lettuce",
                        menuItemTagline: "Minced Beef Fried Rice with Lettuce",
                        menuItemPrice: 11.00,
                        menuItemSrc: '/img/golden_2.jpg'
                    },
                    {
                        menuItemName: "Combination Rice Noodles",
                        menuItemTagline: "Combination Rice Noodles",
                        menuItemPrice: 15.00,
                        menuItemSrc: '/img/golden_3.jpg'
                    },
                    {
                        menuItemName: "Thai Green Curry Chicken",
                        menuItemTagline: "Thai Green Curry Chicken",
                        menuItemPrice: 14.50,
                        menuItemSrc: '/img/golden_4.jpg'
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
                        menuItemSrc: '/img/kebabs_1.jpg'
                    },
                    {
                        menuItemName: "Chicken Pide",
                        menuItemTagline: "chicken, mushroom, onion, capsicum, fetta & mozzarella cheese",
                        menuItemPrice: 12.00,
                        menuItemSrc: '/img/kebabs_2.jpg'
                    },
                    {
                        menuItemName: "Turkey Sausage Pide",
                        menuItemTagline: "Turkish salami, egg, fetta & mozzarella cheese",
                        menuItemPrice: 13.00,
                        menuItemSrc: '/img/kebabs_3.jpg'
                    },
                    {
                        menuItemName: "Mix Plate",
                        menuItemTagline: "Chicken Shish, Lamb Shish and Adana Served with Rice, Turkish Bread and Salad",
                        menuItemPrice: 25.00,
                        menuItemSrc: '/img/kebabs_4.jpg'
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
                        menuItemSrc: '/img/grounds_1.jpg'
                    },
                    {
                        menuItemName: "Garden Pot",
                        menuItemTagline: "Zaatar free range fried eggs in a clay pot, served with tomatoes, cucumber, olives, labna, mint and pita bread",
                        menuItemPrice: 23.00,
                        menuItemSrc: '/img/grounds_2.jpg'
                    },
                    {
                        menuItemName: "Yogurt and Granola",
                        menuItemTagline: "Roasted granola topped with natural yogurt, mixed berries, crushed pistachio and honey",
                        menuItemPrice: 14.00,
                        menuItemSrc: '/img/grounds_3.jpg'
                    },
                    {
                        menuItemName: "Shakshouka",
                        menuItemTagline: "Clay pot cooked free range eggs with tomatoes, capsicum and organic merguez sausages ragu served with pita bread",
                        menuItemPrice: 21.00,
                        menuItemSrc: '/img/grounds_4.jpg'
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
                        menuItemSrc: '/img/noodles_1.jpg'
                    },
                    {
                        menuItemName: "Combination Pad Thai",
                        menuItemTagline: "Rice noodle with chicken, egg and prawn.",
                        menuItemPrice: 16.80,
                        menuItemSrc: '/img/noodles_2.jpg'
                    },
                    {
                        menuItemName: "Pad See Ew",
                        menuItemTagline: "Flat rice noodle with chicken and egg in a sweet soy sauce.",
                        menuItemPrice: 17.80,
                        menuItemSrc: '/img/noodles_3.jpg'
                    },
                    {
                        menuItemName: "Mie Goreng",
                        menuItemTagline: "Indonesian fried Hokkien noodles with chicken, prawn, egg, chilli paste and curry powder.",
                        menuItemPrice: 21.00,
                        menuItemSrc: '/img/noodles_4.jpg'
                    }
                ]
            },
        ],
        cart: {
            0:[0]
        },
        users: [
            {
                userId: 0,
                firstName: "George",
                lastName: "McGregor",
                email: "george@mcgregor.com",
                phone: "0411 111 111",
                address1: "Suite 207",
                address2: "30 Campbell Street",
                suburb: "Riverwood",
                postcode: "2147",
                state: "NSW"
            },
            {
                userId:1,
                firstName: "Ewan",
                lastName: "McEugene",
                email: "ewan@mceugene.com",
                phone: "0422 222 222",
                address1: "Suite 208",
                address2: "31 Campbell Street",
                suburb: "Riverwood",
                postcode: "2147",
                state: "NSW"
            },
            {
                userId:2,
                firstName: "Geralt",
                lastName: "Rivia",
                email: "geralt@rivia.com",
                phone: "0422 222 222",
                address1: "Suite 208",
                address2: "31 Campbell Street",
                suburb: "Riverwood",
                postcode: "2147",
                state: "NSW"
            }
        ],
        orders: [
            {
                orderId: 15060,
                userId: 2,
                status: "Delivered",
                date: "10/08/2020",
                time: "19:32:11",
                orderContents: {
                    0: [0]
                }
            },
            {
                orderId: 15061,
                userId: 1,
                status: "Delivered",
                date: "10/08/2020",
                time: "19:34:11",
                orderContents: {
                    4: [0,3]
                }
            },
            {
                orderId: 15062,
                userId: 2,
                status: "Delivered",
                date: "11/08/2020",
                time: "17:56:01",
                orderContents: {
                    0: [0,0,1]
                }
            }
            ,
            {
                orderId: 15063,
                userId: 0,
                status: "Delivered",
                date: "11/08/2020",
                time: "18:04:44",
                orderContents: {
                    2: [0,0,1],
                    3: [3,2]
                }
            }
        ]
    },
    getters: {
        cartSubtotal: function(state){
            let subtotal = 0;
            for (let [key, values] of Object.entries(state.cart)) {
                values.forEach (item => {
                    subtotal += state.restaurants[key].menu[item].menuItemPrice;
                })
            }
            return subtotal;
        },
        cartDelivery: function(state){
            let numberOfRestaurants = Object.keys(state.cart).length;
            return 5 * numberOfRestaurants;
        },
        cartTotal: function(state, getters){
            return getters.cartSubtotal + getters.cartDelivery;
        },
        getOrder: (state) => (orderID) => {
            return state.orders.find(o => o.orderId===orderID);
        },
        getUser: (state) => (userID) => {
            return state.users.find(u => u.userId===userID);
        },
        getOrdersByUser: (state) => (userID) => {
            return state.orders.filter(o => o.userId===userID);
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