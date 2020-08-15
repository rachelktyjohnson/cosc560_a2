<template>
  <main class="main-admin">
    <div class="single-order">
      <div class="order-details">
        <div class="header">
          <h3>Order #{{ orderId }}</h3>
          <select>
            <option hidden selected disabled>Change Status</option>
            <option>Processing</option>
            <option>Received</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <div class="edit">Edit Order</div>
        </div>
        <h4>{{ formatDateTime(order.datetime) }}</h4>

        <div class="order-listing" v-for="(orderContents, restaurantID) in order.orderContents">
          <h4>{{$store.state.restaurants[restaurantID].restaurantName}}</h4>
          <div class="order-item-listing" v-for="item in orderContents">
            <div class="item-contents">
              <h6>{{$store.state.restaurants[restaurantID].menu[item].menuItemName}}</h6>
              <p>{{$store.state.restaurants[restaurantID].menu[item].menuItemTagline}}</p>
            </div>
            <div class="item-price">
              <p>${{$store.state.restaurants[restaurantID].menu[item].menuItemPrice.toFixed(2)}}</p>
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


      <div class="customer-details">
        <div class="dbe-order-statuses">
          <h6>{{ order.status }}</h6>
        </div>
        <h5>Customer Details</h5>
        <div class="customer-details">
          <p>{{ user.firstName }} {{ user.lastName }}</p>
          <p>{{ user.phone }}</p>
          <p>{{ user.email }}</p>
        </div>

        <h5>Delivery Details</h5>
        <div class="delivery-details">
          <p>{{ user.address1 }}</p>
          <p>{{ user.address2 }}</p>
          <p>{{ user.suburb }}</p>
          <p>{{ user.state }} {{ user.postcode }}</p>
        </div>
      </div>
    </div>


  </main>
</template>
<script>
import { dateMixin } from '../mixins/dateMixin';
export default {
  name: 'AdminOrder',
  mixins: [dateMixin],
  components: {
  },
  data() {
    return {
      orderId:15060
    }
  },
  computed:{
    order() {
      return this.$store.getters.getOrder(this.orderId);
    },
    user() {
      return this.$store.getters.getUser(this.order.userId)
    },
    orderDelivery() {
      let numOfRestaurants = Object.keys(this.order.orderContents).length;
      return 5 * numOfRestaurants;
    },
    orderTotal() {
      let subtotal = 0;

      for (let [key, values] of Object.entries(this.order.orderContents)) {
        values.forEach (item => {
          subtotal += this.$store.state.restaurants[key].menu[item].menuItemPrice;
        })
      }

      return subtotal + this.orderDelivery;
    }
  },
  mounted: function() {
    this.orderId = this.$route.query.id;
  },
}
</script>