<template>
  <div class="basket">
    <h4>Basket</h4>
    <div v-for="store in basketItems">
      <div class="cart-contents">
        <h5>{{store.storeName}}</h5>
        <div v-for="item in store.itemList" class="cart-item-listing">
          <div class="item-contents">
            <h6>{{item.itemName}}</h6>
            <p><a href="#">Edit</a> <a href="#">Remove</a></p>
          </div>
          <div class="item-price">
            <p>{{formattedPrice(item.itemPrice)}}</p>
          </div>
        </div>
      </div>
    </div>
    <a href="checkout.html">
      <div class="checkout-button">Checkout</div>
    </a>
  </div>
</template>
<script>
export default {
  name: 'BasketComponent',
  data() {
    return {
      basketItems: [
        {
          storeName: "Big B's",
          itemList: [
            {
              itemName: "The Hunger Tamer",
              itemPrice: 6.50
            },
            {
              itemName: "Double Beef Burger",
              itemPrice: 9.80
            }
          ]
        },
        {
          storeName: "Crust Pizza",
          itemList: [
            {
              itemName: "The Grand Pepperoni",
              itemPrice: 13.50
            },
            {
              itemName: "Classic Cheeseburger",
              itemPrice: 14.50
            },
            {
              itemName: "Garlic Bread (Side)",
              itemPrice: 4.50
            }
          ]
        }
      ]
    }
  },
  methods: {
    formattedPrice: function(price){
      return "$" + price.toFixed(2);
    }
  }
}
</script>