<template>
  <div class="basket">
    <h4>Basket</h4>
    <div v-for="(restaurant,key) in $store.state.cart">
      <div class="cart-contents">
        <h5>{{ $store.state.restaurants[key].restaurantName }}</h5>
        <div v-for="item in restaurant" class="cart-item-listing">
          <div class="item-contents">
            <h6>{{$store.state.restaurants[key].menu[item].menuItemName}}</h6>
            <p><a>Remove</a></p>
          </div>
          <div class="item-price">
            <p>${{$store.state.restaurants[key].menu[item].menuItemPrice.toFixed(2)}}</p>
          </div>
        </div>
      </div>
    </div>
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
    formattedPrice: function(price){
      return "$" + price.toFixed(2);
    }
  }
}
</script>