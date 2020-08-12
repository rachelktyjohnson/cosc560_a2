<template>
  <div id="container">
    <header>
      <div class="header-left">
        <a href="index.html">
          <img class="logo logo-bug" src="img/logo-bug.svg" alt="DropBearEats Bug Logo">
          <img v-if="userType==='user'" class="logo logo-text" src="img/logo-text.svg" alt="DropBearEats Text Logo">
          <img v-else-if="userType==='admin'" class="logo logo-text" src="img/logo-admin-text.svg" alt="DropBearEats Admin Logo">
        </a>
      </div>
      <div class="header-right">
        <nav>
          <a href="account.html">{{ $store.state.users[userID].firstName }}'s Account</a>
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
import LandingComponent from "./components/LandingComponent.vue";
import RestaurantsListingComponent from "./components/RestaurantsListingComponent.vue";
import RestaurantComponent from "./components/RestaurantComponent.vue";
import CheckoutComponent from "./components/CheckoutComponent.vue";
import StatusComponent from "./components/StatusComponent.vue";
export default {
  components: {
    LandingComponent,
    RestaurantsListingComponent,
    RestaurantComponent,
    CheckoutComponent,
    StatusComponent
  },
  data() {
    return {
      userType: "user",
      userID: 2
    }
  }
}
</script>