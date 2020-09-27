<template>
  <main class="main-checkout">
    <h2>Checkout</h2>
    <div class="checkout-content pure-g">
      <div class="pure-u-3-4">
        <p>Need to change your details? <router-link to="/account">Do it in Your Account</router-link></p>
        <!--<p>Placing this order will create a DropBearEats account for you using these details.</p>-->
        <form v-if="$store.state.cart !== {}">
          <h4>Our Dropbear is delivering to...</h4>
          <div class="form-customer">
            <div class="form-field">
              <label>First Name</label>
              <input disabled type="text" :value="this.$store.state.loggedIn.user.firstName"/>
            </div>
            <div class="form-field">
              <label>Last Name</label>
              <input disabled type="text" :value="this.$store.state.loggedIn.user.lastName"/>
            </div>
            <div class="form-field">
              <label>Mobile Number</label>
              <input type="tel" disabled :value="this.$store.state.loggedIn.user.phoneNumber"/>
            </div>
            <div class="form-field">
              <label>Email</label>
              <input type="email"disabled :value="this.$store.state.loggedIn.user.email"/>
            </div>
          </div>
          <div class="form-address">
            <div class="form-field">
              <label>Address Line 1</label>
              <input type="text"disabled :value="this.$store.state.loggedIn.user.address.add1"/>
            </div>
            <div class="form-field">
              <label>Address Line 2</label>
              <input type="text"disabled :value="this.$store.state.loggedIn.user.address.add2"/>
            </div>
            <div class="form-field">
              <label>Suburb</label>
              <input type="text"disabled :value="this.$store.state.loggedIn.user.address.suburb"/>
            </div>
            <div class="form-field">
              <label>Postcode</label>
              <input type="number"disabled :value="this.$store.state.loggedIn.user.address.postcode"/>
            </div>
            <div class="form-field">
              <label>State</label>
              <select disabled>
                <option>{{ this.$store.state.loggedIn.user.address.state }}</option>
              </select>
            </div>
          </div>
          <h4>Payment Method</h4>

          <div class="form-payment">
            <div class="form-field">
              <label>Payment Method</label>
              <select v-model="paymentType" name="payment-method" id="payment-method">
                <option value="null" disabled selected hidden>Select a payment method</option>
                <option value="card">Credit Card</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>
            <div class="payment-cash" v-if="paymentType==='cash'">
              <h5>Cash payment will be required on delivery</h5>
            </div>
            <div class="payment-card" v-if="paymentType==='card'">
              <div class="form-field">
                <label>Card Type</label>
                <select v-model="cardDetails.cardType">
                  <option value="none" disabled selected hidden>Select a card type</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="visa">Visa</option>
                  <option value="amex">AMEX</option>
                </select>
              </div>
              <div class="form-field">
                <label>Card Number</label>
                <input v-model="cardDetails.cardNumber" type="number"/>
              </div>
              <div class="form-field">
                <label>Expiry Date</label>
                <input v-model="cardDetails.expiryDate" type="date"/>
              </div>
              <div class="form-field">
                <label>CVC</label>
                <input v-model="cardDetails.cvc" type="number"/>
              </div>
            </div>
            <div class="errors" v-if="errors.length > 0">
              <p><strong>There was something wrong with your card details:</strong></p>
              <li v-for="error in errors">{{error}}</li>
            </div>
          </div>

          <input v-if="paymentType !== null" type="submit" class="dbe-button" value="Place Order" v-on:click.stop.prevent="placeOrder()">
        </form>
      </div>
      <div class="pure-u-1-4">
        <basket-component></basket-component>
      </div>
    </div>
  </main>
</template>
<script>

import BasketComponent from "./BasketComponent.vue";
import { dataMixin } from '../mixins/dataMixin';
import axios from "axios";
export default {
  name: 'CheckoutComponent',
  mixins:[dataMixin],
  components: {
    BasketComponent
  },
  data() {
    return {
      paymentType: null,
      errors: [],
      cardDetails: {
        cardType: 'none',
        cardNumber: '',
        expiryDate: null,
        cvc: ''
      }
      ,user:[]
    }
  },
  methods: {
    isPaymentValid: function(){
      this.errors = [];
      if (this.paymentType === 'cash'){
        return true;
      } else {
        let valid = true;

        //check card type
        if (this.cardDetails.cardType==='none'){
          valid = false;
          this.errors.push("Please select a card type");
        }

        //check number is 16 for M/V and 15 for AMEX
        if ((this.cardDetails.cardType==='mastercard' || this.cardDetails.cardType==='visa')&&this.cardDetails.cardNumber.length!==16){
          this.errors.push("Card Number should be 16 digits");
          valid = false;
        } else if (this.cardDetails.cardType==='amex'&&this.cardDetails.cardNumber.length!==15){
          this.errors.push("Card Number should be 15 digits");
          valid = false;
        }

        //check expiry is today or later
        let dateObj = new Date(this.cardDetails.expiryDate);
        let todayObj = new Date();

        if (this.cardDetails.expiryDate === null){
          this.errors.push("Please enter an expiry date");
          valid = false;
        }

        if (this.cardDetails.expiryDate !== null && (dateObj < todayObj)){
          this.errors.push("Your credit card has expired");
          valid = false;
        }

        //check cvc is 3 for M/V or 4 for AMEX
        if ((this.cardDetails.cardType==='mastercard' || this.cardDetails.cardType==='visa')&&this.cardDetails.cvc.length!==3){
          this.errors.push("CVC should be 3 digits");
          valid = false;
        } else if (this.cardDetails.cardType==='amex'&&this.cardDetails.cvc.length!==4){
          this.errors.push("CVC should be 4 digits");
          valid = false;
        }

        return valid;
      }
    },fiveSecondChange: function(){
      let orderID = this.$store.state.orders[this.$store.state.orders.length-1].orderId;
      let newStatus = "Processing";
      this.$store.commit('changeOrderStatus',{orderID,newStatus});
    },
    placeOrder: function(){
      if (this.isPaymentValid()===true){
        //push the order
        //get userID
        //get cart straight from the store
        const userID = this.$store.state.loggedIn.user._id;
        const cart = this.$store.state.cart;
        console.log(cart);
        axios.post('http://localhost:9000/orders/',{
          user: userID,
          cart: cart
        })
        .then(response => {
          //go to that order
          const newOrderID = response.data.data._id;
          this.$router.push({ path: 'status', query: { id:newOrderID } });
          this.$store.commit('resetCart');
          axios.post('http://localhost:9000/notifications',{
            userID: this.$store.state.loggedIn.user._id,
            content: "Order #" + newOrderID + " is now processing!"
          })
          //start 5 second timer
          setTimeout(()=>{
            axios.patch('http://localhost:9000/orders/'+newOrderID,{
              status: "received",
              cart:cart
            })
            axios.post('http://localhost:9000/notifications',{
              userID: this.$store.state.loggedIn.user._id,
              content: "Order #" + newOrderID + " has been received!"
            })

          },5000);
        }).catch (err =>{
          this.errors.push(err)
        })


      }
    }
  }
}
</script>