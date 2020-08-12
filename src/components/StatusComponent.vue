<template>
  <main class="main-status">
    <h2>Order #{{order.orderId}}</h2>
    <h1>{{ order.status }}</h1>
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
          <p>$8.00</p>
        </div>
        <div class="row">
          <p>Total</p>
          <p>$24.30</p>
        </div>
      </div>
      <h4>Your Details</h4>
      <div class="order-details">
        <div class="customer-details">
          <p>Rachel Johnson</p>
          <p>rachelktyjohnson@gmail.com</p>
          <p>+61 432 633 453</p>
        </div>
        <div class="delivery-details">
          <p>Suite 209</p>
          <p>30 Campbell Street</p>
          <p>Blacktown</p>
          <p>NSW 2148</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'StatusComponent',
  data() {
    return {
      order: this.$store.getters.specificOrder(15063)
    }
  }
}
</script>