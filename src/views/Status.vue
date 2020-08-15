<template>
  <main class="main-status">
    <h2>Order #{{orderId}}</h2>
    <h1>{{ orderInfo.status}}</h1>
    <div class="order">
      <h4>Your Order</h4>
      <p>{{ formatDateTime(orderInfo.datetime) }}</p>
      <div v-for="[restaurant,contents] in Object.entries(orderInfo.orderContents)" class="order-contents">
        <h6>{{$store.state.restaurants[restaurant].restaurantName}}</h6>
        <div v-for="item in contents" class="row">
          <p>{{ $store.state.restaurants[restaurant].menu[item].menuItemName }}</p>
          <p>${{ $store.state.restaurants[restaurant].menu[item].menuItemPrice.toFixed(2) }}</p>
        </div>
      </div>
      <div class="totals">
        <div class="row">
          <p>Delivery</p>
          <p>${{orderDelivery.toFixed(2)}}</p>
        </div>
        <div class="row">
          <p>Total</p>
          <p>${{orderTotal.toFixed(2)}}</p>
        </div>
      </div>
      <h4>Your Details</h4>
      <div class="order-details">
        <div class="customer-details">
          <p>{{userInfo.firstName}} {{userInfo.lastName}}</p>
          <p>{{userInfo.email}}</p>
          <p>{{userInfo.phone}}</p>
        </div>
        <div class="delivery-details">
          <p>{{userInfo.address1}}</p>
          <p>{{userInfo.address2}}</p>
          <p>{{userInfo.suburb}}</p>
          <p>{{userInfo.state}} {{userInfo.postcode}}</p>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { dateMixin } from '../mixins/dateMixin.js';
import { dataMixin } from '../mixins/dataMixin';
export default {
  name: 'Status',
  mixins: [dateMixin,dataMixin],
  components: {
  },
  data() {
    return {
      orderId:15060
    }
  },
  mounted: function() {
    this.orderId = this.$route.query.id;
  },
}
</script>
