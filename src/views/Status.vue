<template>
  <main class="main-status">
    <h2>Order #{{orderId}}</h2>
    <h1>{{ order.status}}</h1>
    <div class="order">
      <h4>Your Order</h4>
      <div v-for="[restaurant,contents] in Object.entries(order.orderContents)" class="order-contents">
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
          <p>{{user.firstName}} {{user.lastName}}</p>
          <p>{{user.email}}</p>
          <p>{{user.phone}}</p>
        </div>
        <div class="delivery-details">
          <p>{{user.address1}}</p>
          <p>{{user.address2}}</p>
          <p>{{user.suburb}}</p>
          <p>{{user.state}} {{user.postcode}}</p>
        </div>
      </div>
    </div>
  </main>
</template>
<script>

export default {
  name: 'Status',
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
