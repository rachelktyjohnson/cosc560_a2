<template>
  <main class="main-checkout">
    <h2>Checkout</h2>
    <div class="checkout-content pure-g">
      <div class="pure-u-3-4">
        <!--<p>Already have an account? <a href="#">Make your life easier and log in</a></p>-->
        <form action="payment.html">
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
          <p>Placing this order will create a DropBearEats account for you using these details.</p>
          <input type="submit" class="dbe-button" value="Continue to Payment">
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
    }
  },
  methods: {
  }
}
</script>