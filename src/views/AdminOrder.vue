<template>
  <main class="main-admin">
    <div class="single-order">
      <div class="order-details">
        <div class="header">
          <h3>Order #{{ orderId }}</h3>
          <div class="edit" v-on:click="goToEdit">Edit Order</div>
        </div>
        <h4>{{ formatDateTime(orderInfo.datetime) }}</h4>

        <div class="order-listing" v-for="(orderContents, restaurantID) in orderInfo.orderContents">
          <h4>{{$store.state.restaurants[restaurantID].restaurantName}}</h4>
          <div class="order-item-listing" v-for="item in orderContents">
            <div class="item-contents">
              <h6>{{$store.state.restaurants[restaurantID].menu[item].menuItemName}}</h6>
              <p>{{$store.state.restaurants[restaurantID].menu[item].menuItemTagline}}</p>
            </div>
            <div class="item-price">
              <p>${{$store.state.restaurants[restaurantID].menu[item].menuItemPrice.toFixed(2)}}</p>
            </div>
          </div>
        </div>


        <div class="totals">
          <div class="delivery">
            <h6>Delivery</h6>
            <h6>${{ orderDelivery.toFixed(2) }}</h6>
          </div>
          <div class="total">
            <h5>Total</h5>
            <h5>${{ orderTotal.toFixed(2) }}</h5>
          </div>
        </div>
      </div>


      <div class="customer-details">
        <div class="dbe-order-statuses">
          <h6>{{ orderInfo.status }}</h6>
        </div>
        <h5>Customer Details</h5>
        <div class="customer-details">
          <p>{{ userInfo.firstName }} {{ userInfo.lastName }}</p>
          <p>{{ userInfo.phone }}</p>
          <p>{{ userInfo.email }}</p>
        </div>

        <h5>Delivery Details</h5>
        <div class="delivery-details">
          <p>{{ userInfo.address1 }}</p>
          <p>{{ userInfo.address2 }}</p>
          <p>{{ userInfo.suburb }}</p>
          <p>{{ userInfo.state }} {{ userInfo.postcode }}</p>
        </div>
      </div>
    </div>


  </main>
</template>
<script>
import { dateMixin } from '../mixins/dateMixin';
import { dataMixin } from '../mixins/dataMixin';
export default {
  name: 'AdminOrder',
  mixins: [dateMixin,dataMixin],
  components: {
  },
  data() {
    return {
      orderId:15060,
      selectedStatus:'none'
    }
  },
  computed: {
    userInfo(){
      return this.$store.state.users[this.orderInfo.userId];
    },
    orderInfo() {
      return this.$store.getters.getOrder(this.orderId);
    },
  },
  mounted: function() {
    this.orderId = this.$route.query.id;
  },
  methods: {
    goToEdit:function(){
      this.$store.commit('prepareForEditing',this.orderInfo);
      this.$router.push('adminorderedit');
    }
  }
}
</script>