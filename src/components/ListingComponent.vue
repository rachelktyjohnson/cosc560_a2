<template>
  <main class="main-listing">
    <h3 id="suburb-title">{{ $store.getters.getSuburb }}</h3>
    <h6><router-link to="/">Change Location?</router-link></h6>
    <div class="pure-g">
      <div class="pure-u-3-4">
        <div class="restaurants">
          <a v-for="restaurant in restaurants.data">
            <section v-on:click="goToRestaurant(restaurant._id)" class="restaurant">
              <img :src="restaurant.imgSrc" :alt="restaurant.name"/>
              <div class="content">
                <h4>{{ restaurant.name }}</h4>
                <p>{{ restaurant.description }}</p>
                <p>{{ restaurant.stars }} &#9733; ({{ restaurant.ratings }})</p>
              </div>
            </section>
          </a>
        </div>
      </div>
      <div class="pure-u-1-4">
        <basket-component></basket-component>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import BasketComponent from "./BasketComponent.vue";

export default {
  name: 'StoresListingComponent',
  components: {
    BasketComponent
  },
  data() {
    return {
      restaurants: [],
      errors: []
    }
  },
  created () {
    axios.get('http://localhost:9000/restaurants')
    .then (response => {
      this.restaurants = response.data
    })
    .catch (err =>{
      this.errors.push(e)
    })
  },
  methods: {
    goToRestaurant: function(restaurantId){
      this.$router.push({ path: 'restaurant', query: { r: restaurantId } });
    }
  }
}
</script>