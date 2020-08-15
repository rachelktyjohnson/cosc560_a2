<template>
  <main class="main-admin">
    <div class="single-order single-order-edit">
      <div class="order-details">
        <div class="header">
          <h3>Order #{{ orderInfo.orderId }}</h3>
          <select v-model="orderInfo.status">
            <option value="none"hidden selected disabled>Change Status</option>
            <option value="Processing">Processing</option>
            <option value="Received">Received</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <h4>{{ formatDateTime(orderInfo.datetime) }}</h4>

        <div class="order-listing" v-for="(orderContents, restaurantID) in orderInfo.orderContents">
          <h4>{{$store.state.restaurants[restaurantID].restaurantName}}</h4>
          <div class="order-item-listing" v-for="(item,key) in orderContents">
            <div class="item-contents">
              <h6>{{$store.state.restaurants[restaurantID].menu[item].menuItemName}}</h6>
              <p>{{$store.state.restaurants[restaurantID].menu[item].menuItemTagline}}</p>
            </div>
            <div class="item-price">
              <p>${{$store.state.restaurants[restaurantID].menu[item].menuItemPrice.toFixed(2)}}</p>
              <p class="delete" v-on:click="removeItem(restaurantID,key)">x</p>
            </div>
          </div>
        </div>

        <div class="totals">
          <div class="delivery">
            <h6>Delivery</h6>
            <h6>${{ orderDelivery.toFixed(2) }}</h6>
          </div>
          <div class="total">
            <h5>Total</h5>
            <h5>${{ orderTotal.toFixed(2) }}</h5>
          </div>
        </div>
      </div>



      <div class="edit-options">
        <a v-on:click="saveOrder(orderInfo)" class="save">Save Order</a>
        <a v-on:click="returnToOrder(orderInfo.orderId)" class="cancel">Cancel Edit</a>
      </div>
    </div>


  </main>
</template>
<script>
import { dateMixin } from '../mixins/dateMixin';
export default {
  name: 'AdminOrderEdit',
  mixins: [dateMixin],
  components: {
  },
  data() {
    return {
      orderInfo: this.$store.state.editSpace
    }
  },
  computed: {
    userInfo(){
      return this.$store.state.users[this.orderInfo.userId];
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
  },
  methods: {
    removeItem: function(restaurantID,key){
      this.orderInfo.orderContents[restaurantID].splice(key,1);
      if (this.orderInfo.orderContents[restaurantID].length===0){
        delete this.orderInfo.orderContents[restaurantID];
      }
    },
    returnToOrder: function(orderID){
      this.$router.push({ path: 'adminorder', query: { id:orderID } });
    },
    saveOrder: function(orderInfo){
      let userID = orderInfo.userId;
      let message = "Changes have been made to Order #" + orderInfo.orderId;
      this.$store.commit('pushNotification',{userID,message})
      this.$store.commit('saveEdits',orderInfo);
      this.returnToOrder(orderInfo.orderId);
    }
  }
}
</script>