import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        suburb: null,
        cart: {},
        editSpace: {},
        loggedIn: {
          user: null,
          token: null
        },
        newAlert: ""
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
        changeUser(state,{user, token}){
            state.loggedIn.user = user;
            state.loggedIn.token = token;
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
        resetCart(state){
            state.cart = {};
        },
        prepareForEditing(state,order){
            //when admin edits an order, place a CLONE in temp area
            //this is so an admin can cancel an edit and not have data persist
            let objForEdit = JSON.parse(JSON.stringify(order))
            order.datetime = new Date(order.datetime);
            state.editSpace = order;
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
        }
    }
})