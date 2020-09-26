<template>
<main class="main-single">
  <h6 class="breadcrumbs"><router-link to="listing">< Back to Restaurants</router-link></h6>
<h2>{{restaurant.name}}</h2>
<p>{{ restaurant.description }}</p>
<div class="restaurant-content pure-g">
  <div class="pure-u-3-4">
    <div class="menu-section">
      <h4>Popular</h4>
      <div class="menu">
        <a v-for="menuItem in restaurant.menu"
           v-on:click="triggerAddToCart(restaurant._id,menuItem._id)"
           href="#">
          <div class="menu-item">
            <div class="item-content">
              <h5>{{ menuItem.name }}</h5>
              <p>{{ menuItem.description }}</p>
              <p><strong>${{ menuItem.price.toFixed(2) }}</strong></p>
            </div>
            <img :src="menuItem.imgSrc" :alt="menuItem.name"/>
          </div>
        </a>
      </div>
    </div>

  </div>
  <div class="pure-u-1-4">
    <basket-component></basket-component>
  </div>
</div>
</main>
</template>

<script>
import { dataMixin } from '../mixins/dataMixin';
import BasketComponent from "./BasketComponent.vue";
import axios from 'axios';

export default {
  name: 'RestaurantComponent',
  mixins: [dataMixin],
  components: {
    BasketComponent
  },
  data() {
    return {
      restaurant: [],
      errors: [],
      restaurantId: 0
    }
  },
  beforeCreate() {
    this.restaurantId = this.$route.query.r;
    const api = `http://localhost:9000/restaurants/${this.$route.query.r}`;
    axios.get(api)
    .then(response => {
      this.restaurant = response.data.data
    })
    .catch(err=>{
      this.errors.push(err)
    })
  },
  methods: {
    triggerAddToCart: function(restaurantID,itemID){
      if (this.isLoggedIn){
        this.$store.commit('addToCart',{restaurantID,itemID});
      }
    }
  }
}
</script>