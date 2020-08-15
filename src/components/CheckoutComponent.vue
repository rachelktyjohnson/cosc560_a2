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
              <input disabled type="text" :value="userInfo.firstName"/>
            </div>
            <div class="form-field">
              <label>Last Name</label>
              <input disabled type="text" :value="userInfo.lastName"/>
            </div>
            <div class="form-field">
              <label>Mobile Number</label>
              <input type="tel" disabled :value="userInfo.phone"/>
            </div>
            <div class="form-field">
              <label>Email</label>
              <input type="email"disabled :value="userInfo.email"/>
            </div>
          </div>
          <div class="form-address">
            <div class="form-field">
              <label>Address Line 1</label>
              <input type="text"disabled :value="userInfo.address1"/>
            </div>
            <div class="form-field">
              <label>Address Line 2</label>
              <input type="text"disabled :value="userInfo.address2"/>
            </div>
            <div class="form-field">
              <label>Suburb</label>
              <input type="text"disabled :value="userInfo.suburb"/>
            </div>
            <div class="form-field">
              <label>Postcode</label>
              <input type="number"disabled :value="userInfo.postcode"/>
            </div>
            <div class="form-field">
              <label>State</label>
              <select disabled>
                <option>{{ userInfo.state }}</option>
                <!--<option>Queensland</option>
                <option>Victoria</option>
                <option>South Australia</option>
                <option>Australian Capital Territory</option>
                <option>Western Australia</option>
                <option>Northern Territory</option>-->
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
    },

    placeOrder: function(){
      if (this.isPaymentValid()===true){
        //stuff to do if the payment is valid
        this.$store.commit('pushOrder');

        //last Order Placed
        let goTo = this.$store.state.orders[this.$store.state.orders.length - 1].orderId;
        this.$router.push({ path: 'status', query: { id:goTo } });

        //start 5 second timer
        setTimeout(this.changeOrderStatus,5000);
      }
    }
  }
}
</script>