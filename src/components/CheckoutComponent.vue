<template>
  <main class="main-checkout">
    <h2>Checkout</h2>
    <div class="checkout-content pure-g">
      <div class="pure-u-3-4">
        <!--<p>Already have an account? <a href="#">Make your life easier and log in</a></p>-->
        <form>
          <h4>Who is our DropBear delivering to?</h4>
          <div class="form-customer">
            <div class="form-field">
              <label>First Name</label>
              <input type="text"/>
            </div>
            <div class="form-field">
              <label>Last Name</label>
              <input type="text"/>
            </div>
            <div class="form-field">
              <label>Mobile Number</label>
              <input type="tel"/>
            </div>
            <div class="form-field">
              <label>Email</label>
              <input type="email"/>
            </div>
          </div>
          <h4>Where is our DropBear delivering to?</h4>
          <div class="form-address">
            <div class="form-field">
              <label>Address Line 1</label>
              <input type="text"/>
            </div>
            <div class="form-field">
              <label>Address Line 2</label>
              <input type="text"/>
            </div>
            <div class="form-field">
              <label>Suburb</label>
              <input type="tel"/>
            </div>
            <div class="form-field">
              <label>Postcode</label>
              <input type="email"/>
            </div>
            <div class="form-field">
              <label>State</label>
              <select>
                <option>New South Wales</option>
                <option>Queensland</option>
                <option>Victoria</option>
                <option>South Australia</option>
                <option>Australian Capital Territory</option>
                <option>Western Australia</option>
                <option>Northern Territory</option>
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
            <div class="warning">
              <p><strong>Error:</strong> Details of error if there is one</p>
            </div>
            <div class="payment-cash" v-if="paymentType==='cash'">
              <h5>Cash payment will be required on delivery</h5>
            </div>
            <div class="payment-card" v-if="paymentType==='card'">
              <div class="form-field">
                <label>Card Type</label>
                <select>
                  <option disabled selected hidden>Select a card type</option>
                  <option>Mastercard</option>
                  <option>Visa</option>
                  <option>AMEX</option>
                </select>
              </div>
              <div class="form-field">
                <label>Card Number</label>
                <input type="number"/>
              </div>
              <div class="form-field">
                <label>Expiry Date</label>
                <input type="date"/>
              </div>
              <div class="form-field">
                <label>CVC</label>
                <input type="number"/>
              </div>
            </div>
          </div>
          <p>Placing this order will create a DropBearEats account for you using these details.</p>
          <input type="submit" class="dbe-button" value="Place Order">
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

export default {
  name: 'CheckoutComponent',
  components: {
    BasketComponent
  },
  data() {
    return {
      paymentType: null
    }
  },
  methods: {

  }
}
</script>