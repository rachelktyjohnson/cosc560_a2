<template>
  <main class="main-account">
    <h2>My Account</h2>
    <div class="account-content">
      <div class="past-orders">
        <h4>Past Orders</h4>
        <div class="past-orders-group">
          <a v-for="order in orders" v-on:click="goToOrderStatus(order._id)">
            <div class="past-order">
              <p>Order #{{ order._id }} ({{order.status}})</p>
              <p>{{ formatDateTime(order.datetime,'date') }}</p>
            </div>
          </a>
        </div>
      </div>
      <div class="account-details">
        <div class="details" v-if="!inEditMode">
          <h4>My Details</h4>
          <div class="customer-details">
            <p>{{user.firstName}} {{user.lastName}}</p>
            <p>{{user.phoneNumber}}</p>
            <p>{{user.email}}</p>
          </div>

          <h4>My Delivery Details</h4>
          <div class="delivery-details">
            <p>{{user.address.add1}}</p>
            <p>{{user.address.add2}}</p>
            <p>{{user.address.suburb}}</p>
            <p>{{user.address.state}} {{user.address.postcode}}</p>
          </div>
        </div>
        <form v-else>
          <h4>My Details</h4>
          <div class="customer-details">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" v-model:value="user.firstName"/>
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" v-model:value="user.lastName"/>
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" v-model:value="user.phoneNumber"/>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model:value="user.email"/>
            </div>
          </div>
          <br>
          <h4>My Delivery Details</h4>
          <div class="delivery-details-edit">
            <div class="form-group">
              <label>Address Line 1</label>
              <input type="text" v-model:value="user.address.add1"/>
            </div>
            <div class="form-group">
              <label>Address Line 2</label>
              <input type="text" v-model:value="user.address.add2"/>
            </div>
            <div class="form-group">
              <label>Suburb</label>
              <input type="text" v-model:value="user.address.suburb"/>
            </div>
            <div class="form-group">
              <label>State</label>
              <input type="text" v-model:value="user.address.state"/>
            </div>
            <div class="form-group">
              <label>Postcode</label>
              <input type="number" v-model:value="user.address.postcode"/>
            </div>
          </div>
          <input v-on:click.stop.prevent="editUser" type="submit" class="submit" value="Save">
        </form>
        <a v-if="!inEditMode" class="edit-details" v-on:click="triggerEdit()">Edit Details</a>
      </div>
    </div>
  </main>
</template>

<script>
import { dateMixin } from '../mixins/dateMixin.js';
import { dataMixin } from '../mixins/dataMixin.js';
import axios from 'axios';

export default {
  name: 'AccountComponent',
  mixins:[dateMixin,dataMixin],
  data() {
    return {
      inEditMode: false,
      user: [],
      orders: []
    }
  },
  beforeCreate () {
    axios.get('http://localhost:9000/users/'+this.$store.state.loggedIn.userID)
        .then (response => {
          this.user = response.data.data
        })
        .catch (err =>{
          this.errors.push(err)
        })
    axios.get('http://localhost:9000/orders/byuser/'+this.$store.state.loggedIn.userID)
        .then (response => {
          this.orders = response.data.data
        })
        .catch (err =>{
          this.errors.push(err)
        })
  },
  methods:{
    goToOrderStatus: function(orderID){
      this.$router.push({ path: 'status', query: { id:orderID } });
    },
    editUser: function(){
      this.$store.commit('editUserInfo',this.userInfo);
      this.triggerEdit();
    },
    triggerEdit: function(){
      this.inEditMode = !this.inEditMode;
    },
  }
}
</script>