<template>
  <div id="container">
    <header>
      <div class="header-left">
        <a href="index.html">
          <img class="logo logo-bug" src="img/logo-bug.svg" alt="DropBearEats Bug Logo">
          <img class="logo logo-text" src="img/logo-text.svg" alt="DropBearEats Text Logo">
        </a>
      </div>
      <div class="header-right">
        <nav>
          <a href="account.html">My Account</a>
          <a href="admin-orders.html">(Admin Dashboard)</a>
        </nav>
      </div>
    </header>
    <restaurant-component></restaurant-component>
    <footer>
      Developed for COSC560 by Rachel Johnson
    </footer>
  </div>
</template>

<script>

import RestaurantsListingComponent from "./components/RestaurantsListingComponent.vue";
import RestaurantComponent from "./components/RestaurantComponent.vue";
export default {
  components: {
    RestaurantsListingComponent,
    RestaurantComponent
  }
}
</script>