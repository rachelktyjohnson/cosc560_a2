<template>
  <div id="container">
    <header>
      <div class="header-left">
        <a>
          <router-link to="/"><img class="logo logo-bug" src="img/logo-bug.svg" alt="DropBearEats Bug Logo"></router-link>
          <router-link to="/"><img v-if="userType==='user'" class="logo logo-text" src="img/logo-text.svg" alt="DropBearEats Text Logo"></router-link>
          <img v-if="userType==='admin'" class="logo logo-text" src="img/logo-admin-text.svg" alt="DropBearEats Admin Logo">
        </a>
      </div>
      <div class="header-right">
        <nav>
          <router-link to="/account">{{ $store.state.users[userID].firstName }}'s Account</router-link>
          <a href="admin-orders.html">(Admin Dashboard)</a>
        </nav>
        <!--<nav class="nav flex-column">
          <router-link to="/" class="nav-link">Expenses</router-link>
          <router-link to="/report" class="nav-link">Report</router-link>
          <a class="nav-link" href="notification.html">Notification</a>
        </nav>-->

      </div>
    </header>
    <router-view/>
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
import AccountComponent from "./components/AccountComponent.vue";


export default {
  components: {
    LandingComponent,
    RestaurantsListingComponent,
    RestaurantComponent,
    CheckoutComponent,
    StatusComponent,
    AccountComponent
  },
  data() {
    return {
      userType: "user",
      userID: 2
    }
  }
}
</script>