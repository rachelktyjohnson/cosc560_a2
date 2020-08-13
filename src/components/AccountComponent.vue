<template>
  <main class="main-account">
    <h2>My Account</h2>
    <div class="account-content">
      <div class="past-orders">
        <h4>Past Orders</h4>
        <div class="past-orders-group">
          <a v-for="order in userOrders" v-on:click="goToOrderStatus(order.orderId)">
            <div class="past-order">
              <p>Order #{{ order.orderId }}</p>
              <p>{{ order.date }}</p>
            </div>
          </a>
        </div>
      </div>
      <div class="account-details">
        <h4>My Details</h4>
        <div class="customer-details">
          <p>{{userInfo.firstName}} {{userInfo.lastName}}</p>
          <p>{{userInfo.phone}}</p>
          <p>{{userInfo.email}}</p>
        </div>

        <h4>My Delivery Details</h4>
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

export default {
  name: 'AccountComponent',
  data() {
    return {

    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getCurrentUser;
    },
    userOrders() {
      return this.$store.getters.getOrdersByUser(this.userInfo.userId)
    }
  },
  methods:{
    goToOrderStatus: function(orderID){
      this.$router.push({ path: 'status', query: { id:orderID } });
    }
  }
}
</script>