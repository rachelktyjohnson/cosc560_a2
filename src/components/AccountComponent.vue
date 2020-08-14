<template>
  <main class="main-account">
    <h2>My Account</h2>
    <div class="account-content">
      <div class="past-orders">
        <h4>Past Orders</h4>
        <div class="past-orders-group">
          <a v-for="order in userOrders" v-on:click="goToOrderStatus(order.orderId)">
            <div class="past-order">
              <p>Order #{{ order.orderId }} ({{order.status}})</p>
              <p>{{ formatDate(order.datetime) }}</p>
            </div>
          </a>
        </div>
      </div>
      <div class="account-details">
        <div class="details" v-if="!inEditMode">
          <h4>My Details</h4>
          <div class="customer-details">
            <p>{{userInfo.firstName}} {{userInfo.lastName}}</p>
            <p>{{userInfo.phone}}</p>
            <p>{{userInfo.email}}</p>
          </div>

          <h4>My Delivery Details</h4>
          <div class="delivery-details">
            <p>{{userInfo.address1}}</p>
            <p>{{userInfo.address2}}</p>
            <p>{{userInfo.suburb}}</p>
            <p>{{userInfo.state}} {{userInfo.postcode}}</p>
          </div>
        </div>
        <form v-else>
          <h4>My Details</h4>
          <div class="customer-details">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" v-model:value="userInfo.firstName"/>
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" v-model:value="userInfo.lastName"/>
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" v-model:value="userInfo.phone"/>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model:value="userInfo.email"/>
            </div>
          </div>
          <br>
          <h4>My Delivery Details</h4>
          <div class="delivery-details-edit">
            <div class="form-group">
              <label>Address Line 1</label>
              <input type="text" v-model:value="userInfo.address1"/>
            </div>
            <div class="form-group">
              <label>Address Line 2</label>
              <input type="text" v-model:value="userInfo.address2"/>
            </div>
            <div class="form-group">
              <label>Suburb</label>
              <input type="text" v-model:value="userInfo.suburb"/>
            </div>
            <div class="form-group">
              <label>State</label>
              <input type="text" v-model:value="userInfo.state"/>
            </div>
            <div class="form-group">
              <label>Postcode</label>
              <input type="number" v-model:value="userInfo.postcode"/>
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
export default {
  name: 'AccountComponent',
  data() {
    return {
      userInfo: this.$store.getters.getCurrentUser,
      inEditMode: false
    }
  },
  computed: {
    userOrders() {
      return this.$store.getters.getOrdersByUser(this.userInfo.userId)
    },
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
    formatDate(datetime){
      return datetime.getDate() + "-" + (datetime.getMonth()) + "-" + datetime.getFullYear()
    }
  }
}
</script>