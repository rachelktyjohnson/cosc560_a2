import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        suburb: null,
        cart: {},
        editSpace: {

        },
        loggedIn: {
          userID: 1
        },
        users: [
            {
                userId: 0,
                userType: 'admin',
                firstName: "Rachel",
                lastName: "McJohnson",
                email: "rachel@,mcjohnson.com",
                phone: "0411 111 111",
                address1: "27",
                address2: "Turtledove Lane",
                suburb: "Marlen Park",
                postcode: "2765",
                state: "NSW",
                notifications: []
            },
            {
                userId:1,
                userType: 'user',
                firstName: "Adam",
                lastName: "Driver",
                email: "adam@driver.com",
                phone: "0422 222 222",
                address1: "Suite 208",
                address2: "31 Campbell Street",
                suburb: "Riverwood",
                postcode: "2147",
                state: "NSW",
                notifications: [
                    {
                        read: true,
                        contents: "Your Order #15061 has been Delivered!",
                        datetime: new Date(2020,7,10,20,27,21)
                    },
                    {
                        read: true,
                        contents: "Your Order #15061 has been Received!",
                        datetime: new Date(2020,7,10,20,5,23)
                    },
                    {
                        read: true,
                        contents: "Your Order #15061 has been Processed!",
                        datetime: new Date(2020,7,10,20,0,1)
                    },
                    {
                        read: true,
                        contents: "Welcome to DropBearEats!",
                        datetime: new Date(2020,6,15,16,53,33)
                    }

                ],
            },
            {
                userId:2,
                userType: 'user',
                firstName: "Ben",
                lastName: "Jamming",
                email: "ben@jamming.com",
                phone: "0422 222 222",
                address1: "Suite 208",
                address2: "31 Campbell Street",
                suburb: "Riverwood",
                postcode: "2147",
                state: "NSW",
                notifications: []
            },
            {
                userId:3,
                userType:'user',
                firstName: 'Charlie',
                lastName: 'Bucket',
                email: 'charlie@bucket.com',
                phone: '0433 333 333',
                address1: 'Suite 209',
                address2: '32 Campbell Street',
                suburb: 'Riverwood',
                postcode: '2148',
                state: 'NSW',
                notifications: []
            }
        ],
        orders: [
            {
                orderId: 15060,
                userId: 2,
                status: "Delivered",
                datetime: new Date(2020,7,10,19,32,11),
                orderContents: {
                    0: [0]
                }
            },
            {
                orderId: 15061,
                userId: 1,
                status: "Delivered",
                datetime: new Date(2020,7,10,19,34,56),
                orderContents: {
                    4: [0,3]
                }
            },
            {
                orderId: 15062,
                userId: 2,
                status: "Cancelled",
                datetime: new Date(2020,7,11,17,56,23),
                orderContents: {
                    0: [0,0,0,0,0,0,0,0,1]
                }
            }
            ,
            {
                orderId: 15063,
                userId: 3,
                status: "Delivered",
                datetime: new Date(2020,7,11,18,4,44),
                orderContents: {
                    2: [0,0,1],
                    3: [3,2]
                }
            }
        ]
    },
    getters: {
        cartSubtotal: function(state){
            //gets raw float of items in the cart before delivery
            let subtotal = 0;
            for (let [key, values] of Object.entries(state.cart)) {
                values.forEach (item => {
                    subtotal += state.restaurants[key].menu[item].menuItemPrice;
                })
            }
            return subtotal;
        },
        getAllOrders: function(state){
            //gets all existing orders in reverse
            return state.orders;
        },
        cartDelivery: function(state){
            //gets raw float of delivery cost based on the cart
            //$5 per restaurant
            let numberOfRestaurants = Object.keys(state.cart).length;
            return 5 * numberOfRestaurants;
        },
        cartTotal: function(state, getters){
            //gets total $ of the cart, including delivery
            return getters.cartSubtotal + getters.cartDelivery;
        },
        getOrder: (state) => (orderID) => {
            //gets orderObject by orderID
            return state.orders.find(o => o.orderId===orderID);
        },
        getOrderIndex: (state) => (orderID) => {
            //gets order index by orderID
           return state.orders.map(function(e) {
               return e.orderId;
           }).indexOf(orderID);
        },
        getCurrentUser: function(state) {
            //gets userObject based on who's logged in
            //if no-one logged in, then return empty userObj
            let currentUserId = state.loggedIn.userID;
            if (currentUserId === null) {
                return {
                    userId: null,
                    userType: 'user',
                    notifications: []
                }
            }
             else {
                return state.users.find(u => u.userId===currentUserId);
            }
        },
        getUser: (state) => (userID) => {
            //gets user by userID
            return state.users.find(u => u.userId===userID);
        },
        getOrdersByUser: (state) => (userID) => {
            //gets all orders by a user by userID
            return state.orders.filter(o => o.userId===userID).reverse();
        },
        getSuburb: function(state){
            //gets string for suburb heading, or returns generic if no suburb assigned
            if (state.suburb===null){
                return "Restaurants near you";
            } else {
                return `Restaurants near ${state.suburb}`
            }
        }
    },
    mutations: {
        removeFromCart(state,{restaurantID,itemID}) {
            //removes specific item from the cart
            //finds the restaurant property first
            //then removes the item from that property's array

            //splice it out
            const index = state.cart[restaurantID].indexOf(itemID);

            state.cart[restaurantID].splice(index,1);

            if(state.cart[restaurantID].length===0){
                Vue.delete(state.cart,restaurantID)
            }
        },
        addToCart(state,{restaurantID,itemID}){
            //if restaurant doesn't exist
            if (!state.cart.hasOwnProperty(restaurantID)){
                Vue.set(state.cart,restaurantID,[]);
            }
            //adds menu item to the correct restaurant property in the cart
            state.cart[restaurantID].push(itemID);
        },
        changeSuburb(state,newSuburb){
            //changes suburb?
            state.suburb = newSuburb;
        },
        changeUser(state,userId){
            //changes the logged in user
            state.loggedIn.userID = userId;
            state.cart = {};
        },
        editUserInfo(state,newUserInfo){
            //first grabs the user based on their ID
            let userID = newUserInfo.userId;

            //changes all their details
            state.users[userID].firstName = newUserInfo.firstName;
            state.users[userID].lastName = newUserInfo.lastName;
            state.users[userID].phone = newUserInfo.phone;
            state.users[userID].email = newUserInfo.email;
            state.users[userID].address1 = newUserInfo.address1;
            state.users[userID].address2 = newUserInfo.address2;
            state.users[userID].suburb = newUserInfo.suburb;
            state.users[userID].state = newUserInfo.state;
            state.users[userID].postcode = newUserInfo.postcode;
        },
        pushOrder(state){
            //adds a new order to the state order array with relevant information
            let newOrderID = state.orders[state.orders.length-1].orderId +1;
            state.orders.push({
                orderId: newOrderID,
                userId: state.loggedIn.userID,
                status: "Received",
                datetime: new Date(),
                orderContents: state.cart
            });
            state.cart = {};

            //also pushes a notiication saying that the order has been received
            state.users[state.loggedIn.userID].notifications.unshift({
                read: false,
                contents: `Order #${newOrderID} update: Received`,
                datetime: new Date()
            })
        },
        prepareForEditing(state,orderInfo){
            //when admin edits an order, place a CLONE in temp area
            //this is so an admin can cancel an edit and not have data persist
            let objForEdit = JSON.parse(JSON.stringify(orderInfo))
            console.log(objForEdit);
            objForEdit.datetime = new Date(objForEdit.datetime);
            state.editSpace = objForEdit;
            console.log(objForEdit);
        },
        saveEdits(state,orderInfo){
            //admin edits and order and saves. The temp gets pushed to the orders array at the right position
            let orderIDX = this.getters.getOrderIndex(orderInfo.orderId);
            console.log(orderIDX);
            state.orders[orderIDX] = {};
            state.orders[orderIDX] = orderInfo;

            //finally clear the editing Space
            state.editSpace = {};
        },
        changeOrderStatus(state,{orderID, newStatus}){
            //changes the status of the order in the orders Array
            localStorage.setItem('orderID', orderID);
            localStorage.setItem('newStatus', newStatus);
            let orderIDX = this.getters.getOrderIndex(orderID);

            state.orders[orderIDX].status = newStatus;
            let orderUser = state.orders[orderIDX].userId;

            //also sends a notification
            state.users[orderUser].notifications.unshift({
                read: false,
                contents: `Order #${orderID} update: ${newStatus}`,
                datetime: new Date()
            })
        },
        pushNotification(state,{userID,message}){
            //adds a notification to userID's message bank
            //unread, timestamped
            state.users[userID].notifications.unshift({
                read: false,
                contents: message,
                datetime: new Date()
            })
        },
        readAllNotifications(state){
            //when user opens their notification feed, all items are read
            state.users[state.loggedIn.userID].notifications.some(function(item){
                if(!item.read){
                    item.read = true;
                } else {
                    return true;
                }
            })
        }
    }
})