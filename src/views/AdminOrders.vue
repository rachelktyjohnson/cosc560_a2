<template>
  <main class="main-admin">
    <h1 v-if="loading">Loading...</h1>
    <div v-if="!loading">
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
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in ordersReversed">
          <td><a v-on:click="goToOrder(order._id)">{{order._id}}</a></td>
          <td>{{formatDateTime(order.datetime,'time') }}</td>
          <td>{{formatDateTime(order.datetime,'date')}}</td>
          <td>{{ getUser(order.user).firstName }} {{ getUser(order.user).lastName }}</td>
          <td>
            <ul>
              <li v-for="restaurant in Object.keys(order.cart)">{{getRestaurant(restaurant).name}}</li>
            </ul>
          </td>
          <td>{{ order.status }}</td>
        </tr>

        </tbody>
      </table></div>

  </main>
</template>

<script>
import { dateMixin } from '../mixins/dateMixin';
import axios from 'axios';
export default {
  name: 'AdminOrders',
  mixins:[dateMixin],
  data() {
    return {
      orders: [],
      loading: true,
      restaurants: [],
      items: [],
      users: []
    }
  },
  beforeCreate() {
    axios.get('http://localhost:9000/orders')
    .then(response => {
      this.orders = response.data.data;
      axios.get('http://localhost:9000/restaurants')
          .then (response => {
            this.restaurants = response.data.data
            axios.get('http://localhost:9000/users')
                .then (response => {
                  this.users = response.data.data
                  console.log(this.users);
                  this.loading = false;
                }).catch (err =>{
                  this.errors.push(err)
                })
          }).catch (err =>{
            this.errors.push(err)
          })
    }).catch (err =>{
      this.errors.push(err)
    })
  },
  computed: {
    ordersReversed() {
      return this.orders.reverse()
    },
  },
  methods:{
    getRestaurant(restaurantID){
      const restaurant = this.restaurants.filter(obj => {
        return obj._id === restaurantID
      })
      return restaurant[0];
    },
    getUser(userID){
      const user = this.users.filter(obj => {
        return obj._id === userID
      })
      return user[0];
    },
    goToOrder: function(orderID){
      this.$router.push({ path: 'adminorder', query: { id:orderID } });
    },

  },

}
</script>
