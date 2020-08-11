<template>
<main class="main-single">
<h5>Restaurant in {{ $store.state.suburb }}</h5>
<h2>{{ $store.state.restaurants[restaurantID].restaurantName}}</h2>
<p>{{ $store.state.restaurants[restaurantID].restaurantTagline}}</p>
<div class="restaurant-content pure-g">
  <div class="pure-u-3-4">
    <div class="menu-section">
      <h4>Popular</h4>
      <div class="menu">
        <a v-for="(menuItem,index) in $store.state.restaurants[restaurantID].menu"
           v-on:click="triggerAddToCart(restaurantID,index)"
           href="#">
          <div class="menu-item">
            <div class="item-content">
              <h5>{{ menuItem.menuItemName }}</h5>
              <p>{{ menuItem.menuItemTagline }}</p>
              <p><strong>${{ menuItem.menuItemPrice.toFixed(2) }}</strong></p>
            </div>
            <img :src="menuItem.menuItemSrc" :alt="menuItem.menuItemName"/>
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

import BasketComponent from "./BasketComponent.vue";
export default {
  name: 'RestaurantComponent',
  components: {
    BasketComponent
  },
  data() {
    return {
      restaurantID: 0
    }
  },
  methods: {
    triggerAddToCart: function(restaurantID,menuItemID){
      console.log(`Adding ${menuItemID} to ${restaurantID}`);
      this.$store.commit('addToCart',{restaurantID,menuItemID});
    }
  }
}
</script>