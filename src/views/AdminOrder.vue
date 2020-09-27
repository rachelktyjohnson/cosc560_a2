<template>
  <main class="main-admin">
    <h1 v-if="loading">Loading...</h1>
    <div v-if="!loading">
      <router-link to="/adminorders">< Back to all orders</router-link>
      <br><br>
      <div class="single-order">
        <div class="order-details">
          <div class="header">
            <h3>Order #{{ orderID }}</h3>
            <div class="edit" v-on:click="goToEdit">Edit Order</div>
          </div>
          <h4>{{ formatDateTime(order.datetime) }}</h4>

          <div class="order-listing" v-for="(items, restaurantID) in order.cart">
            <h4>{{ getRestaurant(restaurantID).name }}</h4>
            <div class="order-item-listing" v-for="item in items">
              <div class="item-contents">
                <h6>{{ getItem(item).name }}</h6>
                <p>{{ getItem(item).description }}</p>
              </div>
              <div class="item-price">
                <p>${{ getItem(item).price.toFixed(2) }}</p>
              </div>
            </div>
          </div>


          <div class="totals">
            <div class="subtotal">
              <h6>Subtotal</h6>
              <h6>${{subtotal.toFixed(2)}}</h6>
            </div>
            <div class="delivery">
              <h6>Delivery</h6>
              <h6>${{delivery.toFixed(2)}}</h6>
            </div>
            <div class="total">
              <h5>Total</h5>
              <h5>${{total.toFixed(2)}}</h5>
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
            <p>{{ user.address.add1 }}</p>
            <p>{{ user.address.add2 }}</p>
            <p>{{ user.address.suburb }}</p>
            <p>{{ user.address.state }} {{ user.address.postcode }}</p>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>
<script>
import { dateMixin } from '../mixins/dateMixin';
import { dataMixin } from '../mixins/dataMixin';
import axios from 'axios';
export default {
  name: 'AdminOrder',
  mixins: [dateMixin,dataMixin],
  components: {
  },
  data() {
    return {
      orderID:0,
      loading:true,
      order: {},
      restaurants: [],
      user: []
    }
  },
  beforeCreate() {
    axios.get('http://localhost:9000/orders/'+this.$route.query.id)
    .then( response => {
      this.order = response.data.data;
      console.log(response.data.data);
      axios.get('http://localhost:9000/restaurants')
          .then (response => {
            this.restaurants = response.data.data
            axios.get('http://localhost:9000/users/'+this.order.user)
                .then (response => {
                  this.user = response.data.data
                  axios.get('http://localhost:9000/items')
                  .then (response => {
                    this.items = response.data.data;
                    console.log(this.items)
                    this.loading = false;
                  })

                }).catch (err =>{
              this.errors.push(err)
            })
          }).catch (err =>{
        this.errors.push(err)
      })
    })
  },
  methods: {
    goToEdit:function(){
      this.$store.commit('prepareForEditing',this.orderInfo);
      this.$router.push('adminorderedit');
    },
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
    }
  },
  mounted: function() {
    this.orderID = this.$route.query.id;
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
  }
}
</script>