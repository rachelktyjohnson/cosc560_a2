<template>
  <main class="main-login">
    <h3>Hey, hungry bear!</h3>
    <h4>Log in so you can get some nosh</h4>

    <form v-on:submit.stop.prevent="checkLogin()" class="login-form">
      <div class="form-group">
        <label>Username (Email)</label>
        <input id="usernameInput" type="text" v-model:value="username"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input id="passwordInput" type="password" v-model:value="password"/>
      </div>
      <div class="form-group">
        <input class="login-button" type="submit" value="Login">
      </div>
      <div v-if="this.errors.length > 0" class="errors">
        <p v-for="error in errors">{{error}}</p>
      </div>
    </form>
  </main>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
      username: "",
      password: "",
      errors: []
    }
  },
  beforeCreate(){

  },
  methods:{
    checkLogin: function(){
      this.errors = [];
      if (!this.username || !this.password){
        if (!this.username){
          this.errors.push("Please enter a username");
        }
        if (!this.password){
          this.errors.push("Please enter a password");
        }
      } else {
        if (this.username==='admin' && this.password==='admin'){
          //change logged in userID and go to dashboard
          this.$store.commit('changeUser',0);
          this.$router.push('adminstatistics');
        } else if (this.username==='adam' && this.password==='adam'){
          //change logged in userID and go to landing
          this.$store.commit('changeUser',1);
          this.$router.push('listing');
        } else if (this.username==='ben' && this.password==='ben'){
          //change logged in userID and go to landing
          this.$store.commit('changeUser',2);
          this.$router.push('listing');
        }  else if (this.username==='charlie' && this.password==='charlie'){
          //change logged in userID and go to landing
          this.$store.commit('changeUser',3);
          this.$router.push('listing');
        } else {
          this.errors.push("Oops! Looks like you don't have an account with us.")
        }
      }

    }
  }
}
</script>
