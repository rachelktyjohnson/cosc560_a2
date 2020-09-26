<template>
  <div class="basket">
    <div v-if="isLoggedIn">
      <h4>Basket</h4>
      <div v-for="(itemIDs,restaurantID) in $store.state.cart">
        {{restaurantID}}
        {{itemIDs}}
        <div class="cart-contents">
          <h5>{{restaurantID}}</h5>
          <div v-for="itemID in itemIDs" class="cart-item-listing">
            <div class="item-contents">
              <h6>{{ itemID }}</h6>
              <p><a v-if="!ifCheckoutPage" v-on:click="triggerRemoveCart(restaurantID,itemID)">Remove</a></p>
            </div>
            <div class="item-price">
              <p>$</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!cartIsEmpty()" class="totals">
        <div class="subtotal">
          <h6>Subtotal</h6>
          <h6>$</h6>
        </div>
        <div class="delivery">
          <h6>Delivery</h6>
          <h6>$</h6>
        </div>
        <div class="total">
          <h5>Total</h5>
          <h5>$</h5>
        </div>
      </div>

      <p class="basketIsEmpty" v-if="cartIsEmpty()">
        I hear your stomach rumbling... get adding!
      </p>
      <a>
        <router-link to="/checkout">
          <div v-if="!cartIsEmpty() && !ifCheckoutPage" class="checkout-button">Checkout</div>
        </router-link>
      </a>
    </div>
    <div v-else>
      <router-link to="/login"><h5>Hungry? Log in to start dropping that feeling!</h5></router-link>
    </div>
  </div>
</template>
<script>
import { dataMixin } from '../mixins/dataMixin';
export default {
  name: 'BasketComponent',
  mixins: [dataMixin],
  data() {
    return {}
  },
  computed: {
    ifCheckoutPage() {
      return this.$route.name === 'checkout';
    }
  },
  methods: {
    triggerRemoveCart: function(restaurantID, itemID){
      this.$store.commit('removeFromCart',{restaurantID,itemID});
    },
    cartIsEmpty: function () {
      for(let key in this.$store.state.cart) {
        if(this.$store.state.cart.hasOwnProperty(key))
          return false;
      }
      return true;
    }
  }
}
</script>