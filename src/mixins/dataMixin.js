export const dataMixin = {
    computed: {
        userInfo() {
            return this.$store.getters.getCurrentUser;
        },
        isLoggedIn() {
            return this.userInfo.userId !== null;
        },
        getUserOrders() {
            return this.$store.getters.getOrdersByUser(this.userInfo.userId);
        },
        orderInfo() {
            return this.$store.getters.getOrder(this.orderId);
        },
        orderDelivery() {
            let numOfRestaurants = Object.keys(this.orderInfo.orderContents).length;
            return 5 * numOfRestaurants;
        },
        orderTotal() {
            let subtotal = 0;

            for (let [key, values] of Object.entries(this.orderInfo.orderContents)) {
                values.forEach(item => {
                    subtotal += this.$store.state.restaurants[key].menu[item].menuItemPrice;
                })
            }

            return subtotal + this.orderDelivery;
        },
    }
}

//to import into a component
//import { dataMixin } from '../mixins/dataMixin';
//mixins:[dataMixin]