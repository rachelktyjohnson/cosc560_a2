<template>
  <main class="main-admin">
    {{order}}
    <h1 v-if="loading">Loading...</h1>
    <div v-if="!loading">
    <div class="single-order single-order-edit">
      <div class="order-details">
        <div class="header">
          <h3>Order #{{ order._id }}</h3>
          <select v-model="order.status">
            <option value="none"hidden selected disabled>Change Status</option>
            <option value="processing">Processing</option>
            <option value="received">Received</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <h4>{{ formatDateTime(order.datetime) }}</h4>
        <div class="order-listing" v-for="(items, restaurantID) in order.cart">
          <h4>{{getRestaurant(restaurantID).name}}</h4>
          <div class="order-item-listing" v-for="(item,key) in items">
            <div class="item-contents">
              <h6>{{getItem(item).name}}</h6>
              <p>{{ getItem(item).description }}</p>
            </div>
            <div class="item-price">
              <p>${{getItem(item).price.toFixed(2)}}</p>
              <p class="delete" v-on:click="removeItem(restaurantID,item)">x</p>
            </div>
          </div>
        </div>

        <div class="totals">
          <div class="delivery">
            <h6>Delivery</h6>
            <h6>${{delivery.toFixed(2)}}</h6>
          </div>
          <div class="total">
            <h5>Total</h5>
            <h5>${{total.toFixed(2)}}</h5>
          </div>
        </div>
      </div>



      <div class="edit-options">
        <a v-on:click="saveOrder(order)" class="save">Save Order</a>
        <a v-on:click="returnToOrder(order._id)" class="cancel">Cancel Edit</a>
      </div>
    </div>

    </div>
  </main>
</template>
<script>
import { dateMixin } from '../mixins/dateMixin';
import axios from "axios";
export default {
  name: 'AdminOrderEdit',
  mixins: [dateMixin],
  components: {
  },
  data() {
    return {
      order: this.$store.state.editSpace,
      restaurants: [],
      users: [],
      items: [],
      loading:true
    }
  },
  beforeCreate() {

          axios.get('http://localhost:9000/restaurants')
              .then (response => {
                this.restaurants = response.data.data
                axios.get('http://localhost:9000/items')
                    .then (response => {
                      this.items = response.data.data;
                      this.loading = false;
                    })
              }).catch (err =>{
            this.errors.push(err)
          })
  },
  computed: {
    subtotal(){
      let subtotal = 0;
      for (const [key, value] of Object.entries(this.order.cart)){
        value.forEach((item)=>{
          const itemPrice = this.getItem(item).price
          subtotal += itemPrice
        })
      }
      return subtotal;
    },
    delivery(){
      //$5 per property in cart object
      const stores = Object.keys(this.order.cart).length
      return stores*5
    },
    total(){
      return this.subtotal+this.delivery;
    }
  },
  methods: {
    removeItem: function(restaurantID,itemID){
      //pull it out of the property array
      const index = this.order.cart[restaurantID].indexOf(itemID);
      this.order.cart[restaurantID].splice(index,1);
      //if property array is empty, delete it
      if (this.order.cart[restaurantID].length===0){
        delete this.order.cart[restaurantID];
      }
    },
    returnToOrder: function(orderID){
      this.$router.push({ path: 'adminorder', query: { id:orderID } });
    },
    saveOrder: function(orderInfo){
      let userID = this.order.user;
      let orderID = this.order._id;
      //change order and push to MDB
      axios.patch('http://localhost:9000/orders/'+orderID,{
        //replace cart and status, nothing else should be changed
        status: this.order.status,
        cart: this.order.cart
      })
      .then(()=>{
        //send notification
        axios.post('http://localhost:9000/notifications',{
          userID: userID,
          content: "Order #" + userID + " has been changed!"
        })
            .then(()=> {
              //route back to order page
              this.returnToOrder(orderID);
            })
      })







    },
    getRestaurant(restaurantID){
      const restaurant = this.restaurants.filter(obj => {
        return obj._id === restaurantID
      })
      return restaurant[0];
    },
    getItem(itemID){
      const item = this.items.filter(obj => {
        return obj._id === itemID
      })
      return item[0];
    }
  }
}
</script>