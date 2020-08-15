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
        <td><a v-on:click="goToOrder(order.orderId)">{{order.orderId}}</a></td>
        <td>{{ formatDateTime(order.datetime,'time') }}</td>
        <td>{{formatDateTime(order.datetime,'date')}}</td>
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
import { dateMixin } from '../mixins/dateMixin';
export default {
  name: 'AdminOrders',
  mixins:[dateMixin],
  data() {
    return {
      allOrders: this.$store.getters.getAllOrders
    }
  },
  methods:{
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
    goToOrder: function(orderID){
      this.$router.push({ path: 'adminorder', query: { id:orderID } });
    },
  }
}
</script>
