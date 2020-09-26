<template>
  <main class="main-login">
    <h3>Hey, hungry bear!</h3>
    <h4>Log in so you can get some nosh</h4>

    <form v-on:submit.stop.prevent="checkLogin()" class="login-form">
      <div class="form-group">
        <label>Email</label>
        <input id="usernameInput" type="email" v-model:value="email"/>
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
      email: "",
      password: "",
      errors: []
    }
  },
  beforeCreate(){

  },
  methods:{
    checkLogin: function(){
      this.errors = [];
      if (!this.email || !this.password){
        if (!this.email){
          this.errors.push("Please enter an email");
        }
        if (!this.password){
          this.errors.push("Please enter a password");
        }
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:9000/users/login',
          headers: {},
          data: {
            email: this.email,
            password: this.password
          }
        })
            .then (response => {
              //this.$store.state.loggedIn.userID = response.data.userID;
              //this.$store.state.loggedIn.token = response.data.token;
              const userID = response.data.userID;
              const token = response.data.token;
              this.$store.commit('changeUser',{userID, token})
              this.$router.push('listing');
            })
            .catch (err =>{
              this.errors.push("Oops, doesn't seem like you're in our systems!")
            })
      }

    }
  }
}
</script>
