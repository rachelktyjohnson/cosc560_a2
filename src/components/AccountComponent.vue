<template>
  <main class="main-account">
    <h2>My Account</h2>
    <div class="account-content">
      <div class="past-orders">
        <h4>Past Orders</h4>
        <div class="past-orders-group">
          <a v-for="order in userOrders" href="status.html">
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
          <p>{{user.firstName}} {{user.lastName}}</p>
          <p>{{user.phone}}</p>
          <p>{{user.email}}</p>
        </div>

        <h4>My Delivery Details</h4>
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
  name: 'AccountComponent',
  data() {
    return {
      userId: 2
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser(this.userId)
    },
    userOrders() {
      return this.$store.getters.getOrdersByUser(this.userId)
    }
  }
}
</script>