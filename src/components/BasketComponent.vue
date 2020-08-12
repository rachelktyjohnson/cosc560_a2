<template>
  <div class="basket">
    <h4>Basket</h4>
    <div v-for="(restaurant,restaurantKey) in $store.state.cart">
      <div class="cart-contents">
        <h5>{{ $store.state.restaurants[restaurantKey].restaurantName }}</h5>
        <div v-for="(item, itemKey) in restaurant" class="cart-item-listing">
          <div class="item-contents">
            <h6>{{$store.state.restaurants[restaurantKey].menu[item].menuItemName}}</h6>
            <p><a v-on:click="triggerRemoveCart(restaurantKey,itemKey)">Remove</a></p>
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
        <h6>{{$store.getters.cartSubtotal}}</h6>
      </div>
    </div>
    <p class="basketIsEmpty" v-if="cartIsEmpty()">
      I hear your stomach rumbling... get adding!
    </p>
    <a>
      <div class="checkout-button">Checkout</div>
    </a>
  </div>
</template>
<script>

export default {
  name: 'BasketComponent',
  data() {
    return {

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