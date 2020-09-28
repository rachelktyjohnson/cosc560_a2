<template>
  <main class="main-status">
    <h3 v-if="loading">Loading...</h3>
    <div v-if="!loading">
      <h2>Order #{{order._id}}</h2>
      <h1>{{order.status}}</h1>
      <div class="order">
        <h4>Your Order</h4>
        <p>{{formatDateTime(order.datetime)}}</p>
        <div v-for="(itemIDs,restaurantID) in order.cart" class="order-contents">
          <h6>{{getRestaurant(restaurantID).name}}</h6>
          <div v-for="itemID in itemIDs" class="row">
            <p>{{getItem(itemID).name}}</p>
            <p>${{ getItem(itemID).price.toFixed(2) }}</p>
          </div>
        </div>
        <div class="totals">
          <div class="row">
            <p>Subtotal</p>
            <p>${{subtotal.toFixed(2)}}</p>
          </div>
          <div class="row">
            <p>Delivery</p>
            <p>${{delivery.toFixed(2)}}</p>
          </div>
          <div class="row">
            <p>Total</p>
            <p>${{total.toFixed(2)}}</p>
          </div>
        </div>
        <h4>Your Details</h4>
        <div class="order-details">
          <div class="customer-details">
            <p>{{this.$store.state.loggedIn.user.firstName}} {{this.$store.state.loggedIn.user.lastName}}</p>
            <p>{{this.$store.state.loggedIn.user.email}}</p>
            <p>{{this.$store.state.loggedIn.user.phoneNumber}}</p>
          </div>
          <div class="delivery-details">
            <p>{{this.$store.state.loggedIn.user.address.add1}}</p>
            <p>{{this.$store.state.loggedIn.user.address.add2}}</p>
            <p>{{this.$store.state.loggedIn.user.address.suburb}}</p>
            <p>{{this.$store.state.loggedIn.user.address.state}} {{this.$store.state.loggedIn.user.address.postcode}}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { dateMixin } from '../mixins/dateMixin.js';
import { dataMixin } from '../mixins/dataMixin';
import axios from 'axios';

export default {
  name: 'Status',
  mixins: [dateMixin,dataMixin],
  components: {
  },
  data() {
    return {
      orderId:0,
      order: [],
      restaurants: [],
      items: [],
      user: [],
      loading: true,
      fiveSecondReload: null
    }
  },
  beforeCreate() {
    this.orderId = this.$route.query.id;
    axios.get("http://localhost:9000/orders/" + this.$route.query.id)
        .then(response => {
          this.order = response.data.data;
          axios.get('http://localhost:9000/restaurants')
              .then (response => {
                this.restaurants = response.data.data
                axios.get('http://localhost:9000/items')
                    .then (response => {
                      this.items = response.data.data
                      this.loading = false
                    })
                    .catch (err =>{
                      this.errors.push(err)
                    })
              })
              .catch (err =>{
                this.errors.push(err)
              })
        })
  },
  computed: {
    subtotal(){
      let subtotal = 0;
      for (const [key, value] of Object.entries(this.order.cart)){
        value.forEach((item)=>{
          const itemPrice = this.getItem(item).price
          subtotal += itemPrice
        })
      }
      return subtotal;
    },
    delivery(){
      //$5 per property in cart object
      const stores = Object.keys(this.order.cart).length
      return stores*5
    },
    total(){
      return this.subtotal+this.delivery;
    }
  },
  methods: {
    getRestaurant(restaurantID){
      const restaurant = this.restaurants.filter(obj => {
        return obj._id === restaurantID
      })
      return restaurant[0];
    },
    getItem(itemID){
      const item = this.items.filter(obj => {
        return obj._id === itemID
      })
      return item[0];
    },
  },
  mounted: function() {
    this.orderId = this.$route.query.id;
    this.fiveSecondReload = setInterval(()=>{
      axios.get("http://localhost:9000/orders/" + this.$route.query.id)
          .then(response => {
            this.order = response.data.data;
          })
    },1000);
  },
  beforeDestroy: function() {
    clearInterval(this.fiveSecondReload);
  }
}
</script>
