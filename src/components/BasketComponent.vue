<template>
  <div class="basket">
    <div v-if="isLoggedIn">
      <h4>Basket</h4>
      <div v-for="(itemIDs,restaurantID) in $store.state.cart">
        <div class="cart-contents">
          <h5>{{getRestaurant(restaurantID).name}}</h5>
          <div v-for="itemID in itemIDs" class="cart-item-listing">
            <div class="item-contents">
              <h6>{{ getItem(itemID).name }}</h6>
              <p><a v-if="!ifCheckoutPage" v-on:click="triggerRemoveCart(restaurantID,itemID)">Remove</a></p>
            </div>
            <div class="item-price">
              <p>${{getItem(itemID).price.toFixed(2)}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!cartIsEmpty()" class="totals">
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

      <p class="basketIsEmpty" v-if="cartIsEmpty()">
        I hear your stomach rumbling... get adding!
      </p>
      <a>
        <router-link to="/checkout">
          <div v-if="!cartIsEmpty() && !ifCheckoutPage" class="checkout-button">Checkout</div>
        </router-link>
      </a>
    </div>
    <div v-else>
      <router-link to="/login"><h5>Hungry? Log in to start dropping that feeling!</h5></router-link>
    </div>
  </div>
</template>
<script>
import { dataMixin } from '../mixins/dataMixin';
import axios from 'axios';

export default {
  name: 'BasketComponent',
  mixins: [dataMixin],
  data() {
    return {
      restaurants:[],
      items:[],
      errors:[]
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.state.loggedIn.userID !== null;
    },
    ifCheckoutPage() {
      return this.$route.name === 'checkout';
    },
    subtotal(){
      let subtotal = 0;
      for (const [key, value] of Object.entries(this.$store.state.cart)){
        value.forEach((item)=>{
          const itemPrice = this.getItem(item).price
          subtotal += itemPrice
        })
      }
      return subtotal;
    },
    delivery(){
      //$5 per property in cart object
      const stores = Object.keys(this.$store.state.cart).length
      return stores*5
    },
    total(){
      return this.subtotal+this.delivery;
    }
  },
  created () {
    axios.get('http://localhost:9000/restaurants')
        .then (response => {
          this.restaurants = response.data.data
        })
        .catch (err =>{
          this.errors.push(err)
        })
    axios.get('http://localhost:9000/items')
        .then (response => {
          this.items = response.data.data
        })
        .catch (err =>{
          this.errors.push(err)
        })
  },
  methods: {
    triggerRemoveCart: function(restaurantID, itemID){
      this.$store.commit('removeFromCart',{restaurantID,itemID});
    },
    cartIsEmpty: function () {
      for(let key in this.$store.state.cart) {
        if(this.$store.state.cart.hasOwnProperty(key))
          return false;
      }
      return true;
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
  }
}
</script>