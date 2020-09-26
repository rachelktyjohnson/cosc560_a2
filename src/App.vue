<template>
  <div>
    <div id="container">
    <header>
      <div class="header-left">
        <a>
          <router-link :to="logoUrl"><img class="logo logo-bug" src="img/logo-bug.svg" alt="DropBearEats Bug Logo">
          </router-link>
          <router-link :to="logoUrl" >
            <img v-if="!user.admin"  class="logo logo-text" src="img/logo-text.svg" alt="DropBearEats Text Logo">
            <img v-if="user.admin"  class="logo logo-text" src="img/logo-admin-text.svg" alt="DropBearEats Admin Logo">
          </router-link>
        </a>
      </div>
      <div class="header-right">
        <nav>
          <router-link v-if="!isLoggedIn" to="/login">Log in</router-link>
          <svg v-if="isLoggedIn" class="notification-icon" :class="{shaking: hasNewNotifications()}" v-on:click="toggleNotifications()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g id="Layer_2">
              <circle class="cls-1" cx="49.75" cy="50" r="48"/>
              <path class="cls-2"
                    d="M49.77,73.42c-8.08,0-16.17-.07-24.25,0-2.08,0-2.66-.65-2.7-2.71-.09-4.18,1.06-7.63,4.44-10.3,1.66-1.32,2.11-3.29,2.09-5.37q0-5.74,0-11.51c.06-9.8,5.61-17.33,15-20.24A2.11,2.11,0,0,0,46,21.4,4.18,4.18,0,0,1,50.3,18a4.1,4.1,0,0,1,4.22,3.47,2.48,2.48,0,0,0,2,2.17A20.31,20.31,0,0,1,70.3,43.29c0,4,0,7.94,0,11.92A6.84,6.84,0,0,0,72.93,61c3.62,2.91,4.11,6.9,3.81,11.16-.1,1.45-1.17,1.29-2.1,1.29q-9.45,0-18.91,0Z"/>
              <path class="cls-2" d="M43.36,76.45H56.11a6,6,0,0,1-5.55,6.32C46.54,83.09,43.78,80.76,43.36,76.45Z"/>
            </g>
          </svg>
          <router-link v-if="!user.admin && isLoggedIn" to="/account">My Account</router-link>
          <router-link v-if="user.admin" to="/adminorders">Orders</router-link>
          <router-link v-if="user.admin" to="/adminstatistics">Stats</router-link>
          <a v-if="isLoggedIn" v-on:click="logOut()">Log out</a>
        </nav>

      </div>
    </header>
    <router-view/>
    <footer>
      Developed for COSC560 by Rachel Johnson
    </footer>
    <notifications-component v-show="showNotifications" :key="componentKey"></notifications-component>
    </div>
  </div>
</template>

<script>

import NotificationsComponent from "./components/NotificationsComponent.vue";
import axios from 'axios';

export default {
  components: {
    NotificationsComponent
  },
  data() {
    return {
      showNotifications:false,
      notifications: [],
      errors: [],
      user: [],
      componentKey: 0
    }
  },
  beforeCreate() {
    if (this.$store.state.loggedIn.userID!==null){
      console.log(this.$store.state.loggedIn.userID);
      axios.get('http://localhost:9000/notifications/byuser/'+this.$store.state.loggedIn.userID)
          .then (response => {
            this.notifications = response.data.data
          })
          .catch (err =>{
            this.errors.push(err)
          })

      axios.get('http://localhost:9000/users/'+this.$store.state.loggedIn.userID)
          .then (response => {
            this.user = response.data.data
          })
          .catch (err =>{
            this.errors.push(err)
          })
    }

  },
  computed: {
    isLoggedIn: function () {
      return this.$store.state.loggedIn.user !== null;
    },
    logoUrl: function(){
      if (this.user.admin){
        return 'adminorders'
      } else {
        return '/'
      }

    }
  },
  methods: {
    forceRender(){
      this.componentKey += 1;
    },
    logOut: function () {
      const userID = null;
      const token = null;
      this.$store.commit('changeUser', {userID,token});
      this.$router.push('login');
    },
    hasNewNotifications: function(){
      if (this.notifications.length > 0) {
        let found = false;
        //some used so it can break out of the loop at the first FALSE
        this.notifications.some(function (item) {
          console.log(item.read);
          if (item.read === false) {
            found = true;
            return true;
          }
        })
        return found;
      }
    },
    toggleNotifications(){
      this.showNotifications = !this.showNotifications;
      //set all user notifications to false
      if (this.$store.state.loggedIn.user !== null){
        axios.patch('http://localhost:9000/notifications/read/'+this.$store.state.loggedIn.user);
        this.forceRender();
      }


    }
  }
}
</script>