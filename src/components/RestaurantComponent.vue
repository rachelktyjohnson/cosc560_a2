<template>
<main class="main-single">
<h5>Restaurant in {{ $store.state.suburb }}</h5>
<h2>{{ $store.state.restaurants[restaurantId].restaurantName}}</h2>
<p>{{ $store.state.restaurants[restaurantId].restaurantTagline}}</p>
<div class="restaurant-content pure-g">
  <div class="pure-u-3-4">
    <div class="menu-section">
      <h4>Popular</h4>
      <div class="menu">
        <a v-for="(menuItem,index) in $store.state.restaurants[restaurantId].menu"
           v-on:click="triggerAddToCart(restaurantId,index)"
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
  props: ['restaurantId'],
  data() {
    return {
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