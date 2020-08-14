<template>
  <main class="main-admin">
    <h3>Orders</h3>

    <table class="pure-table pure-table-bordered">
      <thead>
      <tr>
        <th>#</th>
        <th>Time</th>
        <th>Date</th>
        <th>Customer</th>
        <th>Restaurant(s)</th>
        <th>Status</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in allOrders">
        <td><a >{{order.orderId}}</a></td>
        <td>{{ formatTime(order.datetime) }}</td>
        <td>{{formatDate(order.datetime)}}</td>
        <td>{{ $store.state.users[order.userId].firstName }} {{ $store.state.users[order.userId].lastName }}</td>
        <td>
          <ul>
            <li v-for="(contents, restaurantID) in order.orderContents">{{ $store.state.restaurants[restaurantID].restaurantName}}</li>
          </ul>
        </td>
        <td>{{ order.status }}</td>
        <td>${{ orderTotal(order).toFixed(2) }}</td>
      </tr>

      </tbody>
    </table>
  </main>
</template>
<script>

export default {
  name: 'AdminOrders',
  components: {

  },
  data() {
    return {
      allOrders: this.$store.getters.getAllOrders
    }
  },
  methods:{
    formatDate(datetime){
      return datetime.getDate() + "-" + (datetime.getMonth()) + "-" + datetime.getFullYear()
    },
    formatTime(datetime){
      return datetime.getHours() + ":" + this.addZeroes(datetime.getMinutes()) + ":" + this.addZeroes(datetime.getSeconds())
    },
    orderDelivery(order) {
      let numOfRestaurants = Object.keys(order.orderContents).length;
      return 5 * numOfRestaurants;
    },
    orderTotal(order) {
      let subtotal = 0;

      for (let [key, values] of Object.entries(order.orderContents)) {
        values.forEach (item => {
          subtotal += this.$store.state.restaurants[key].menu[item].menuItemPrice;
        })
      }

      return subtotal + this.orderDelivery(order);
    },
    addZeroes(i){
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
  }
}
</script>
