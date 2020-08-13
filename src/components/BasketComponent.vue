<template>
  <div class="basket">
    <div v-if="isLoggedIn">
      <h4>Basket</h4>
      <div v-for="(restaurant,restaurantKey) in $store.state.cart">
        <div class="cart-contents">
          <h5>{{ $store.state.restaurants[restaurantKey].restaurantName }}</h5>
          <div v-for="(item, itemKey) in restaurant" class="cart-item-listing">
            <div class="item-contents">
              <h6>{{$store.state.restaurants[restaurantKey].menu[item].menuItemName}}</h6>
              <p><a v-if="!ifCheckoutPage" v-on:click="triggerRemoveCart(restaurantKey,itemKey)">Remove</a></p>
            </div>
            <div class="item-price">
              <p>${{$store.state.restaurants[restaurantKey].menu[item].menuItemPrice.toFixed(2)}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!cartIsEmpty()" class="totals">
        <div class="subtotal">
          <h6>Subtotal</h6>
          <h6>${{$store.getters.cartSubtotal.toFixed(2)}}</h6>
        </div>
        <div class="delivery">
          <h6>Delivery</h6>
          <h6>${{$store.getters.cartDelivery.toFixed(2)}}</h6>
        </div>
        <div class="total">
          <h5>Total</h5>
          <h5>${{$store.getters.cartTotal.toFixed(2)}}</h5>
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

export default {
  name: 'BasketComponent',
  data() {
    return {

    }
  },
  computed: {
    ifCheckoutPage() {
      return this.$route.name === 'checkout';
    },
    userInfo: function() {
      return this.$store.getters.getCurrentUser;
    },
    isLoggedIn: function() {
      return this.userInfo.userId !== null;
    }

  },
  methods: {
    triggerRemoveCart: function(restaurantID, menuItemID){
      this.$store.commit('removeFromCart',{restaurantID,menuItemID});
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