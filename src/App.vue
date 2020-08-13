<template>
  <div id="container">
    <header>
      <div class="header-left">
        <a>
          <router-link to="/"><img class="logo logo-bug" src="img/logo-bug.svg" alt="DropBearEats Bug Logo"></router-link>
          <router-link to="/"><img v-if="userInfo.userType==='user'" class="logo logo-text" src="img/logo-text.svg" alt="DropBearEats Text Logo">
          <img v-else class="logo logo-text" src="img/logo-admin-text.svg" alt="DropBearEats Admin Logo"></router-link>
        </a>
      </div>
      <div class="header-right">
        <nav>
          <router-link v-if="!isLoggedIn" to="/login">Log in</router-link>
          <router-link v-else to="/account">My Account</router-link>
        </nav>

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
import RestaurantsListingComponent from "./components/ListingComponent.vue";
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
    }
  },
  computed: {
    userInfo: function() {
      return this.$store.getters.getCurrentUser;
    },
    isLoggedIn: function() {
      return this.userInfo.userId !== null;
    }
  }
}
</script>