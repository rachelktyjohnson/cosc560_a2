<template>
  <main class="main-listing">
    <h3>{{ $store.getters.getSuburb }}</h3>
    <h6><router-link to="/">Change Location?</router-link></h6>
    <div class="pure-g">
      <div class="pure-u-3-4">
        <div class="restaurants">
          <a v-for="restaurant in $store.state.restaurants">
            <section v-on:click="goToRestaurant(restaurant.restaurantId)" class="restaurant">
              <img :src="restaurant.imgSrc" :alt="restaurant.restaurantName"/>
              <div class="content">
                <h4>{{ restaurant.restaurantName }}</h4>
                <p>{{ restaurant.restaurantTagline }}</p>
                <p>{{ restaurant.restaurantRating }} &#9733; ({{ restaurant.numberOfRatings }})</p>
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

import BasketComponent from "./BasketComponent.vue";
export default {
  name: 'StoresListingComponent',
  components: {
    BasketComponent
  },
  data() {
    return {
    }
  },
  methods: {
    goToRestaurant: function(restaurantId){
      this.$router.push({ path: 'restaurant', query: { r: restaurantId } });
    }
  }
}
</script>