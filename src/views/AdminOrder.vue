<template>
  <main class="main-admin">
    <div class="single-order">
      <div class="order-details">
        <div class="header">
          <h3>Order #14596</h3>
          <select>
            <option hidden selected disabled>Change Status</option>
            <option>Processing</option>
            <option>Received</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <div class="edit">Edit Order</div>
          <div class="cancel">Cancel Order</div>
        </div>
        <h4>5:31PM on July 18 2020</h4>
        <div class="dbe-order-statuses">
          <h6>Paid</h6>
          <h6>Delivering</h6>
        </div>

        <div class="order-listing">
          <h4>Big B's Chicken and Burgers</h4>
          <div class="order-item-listing">
            <div class="item-contents">
              <h6>The Hunger Tamer</h6>
              <p>Quarter Chicken of the Day, chips, random 500ml can</p>
            </div>
            <div class="item-price">
              <p>$6.50</p>
            </div>
          </div>
          <div class="order-item-listing">
            <div class="item-contents">
              <h6>Double Beef Burger</h6>
              <p>Two beef patties, cheese, tomato, onion, lettuce</p>
            </div>
            <div class="item-price">
              <p>$9.80</p>
            </div>
          </div>
        </div>

        <div class="order-listing">
          <h4>Crust Pizza</h4>
          <div class="order-item-listing">
            <div class="item-contents">
              <h6>The Hunger Tamer</h6>
              <p>Quarter Chicken of the Day, chips, random 500ml can</p>
            </div>
            <div class="item-price">
              <p>$6.50</p>
            </div>
          </div>
          <div class="order-item-listing">
            <div class="item-contents">
              <h6>Double Beef Burger</h6>
              <p>Two beef patties, cheese, tomato, onion, lettuce</p>
            </div>
            <div class="item-price">
              <p>$9.80</p>
            </div>
          </div>
        </div>
        <div class="totals">
          <div class="subtotal">
            <h6>Subtotal</h6>
            <h6>$16.30</h6>
          </div>
          <div class="delivery">
            <h6>Delivery</h6>
            <h6>$8.00</h6>
          </div>
          <div class="total">
            <h5>Total</h5>
            <h5>$24.30</h5>
          </div>
        </div>
      </div>
      <div class="customer-details">
        <h5>Customer Details</h5>
        <div class="customer-details">
          <p>Rachel Johnson</p>
          <p>+61 432 633 453</p>
          <p>rachelktyjohnson@gmail.com</p>
        </div>

        <h5>Delivery Details</h5>
        <div class="delivery-details">
          <p>Suite 209</p>
          <p>30 Campbell Street</p>
          <p>Riverville</p>
          <p>NSW 2149</p>
        </div>
      </div>
    </div>


  </main>
</template>
<script>

export default {
  name: 'AdminOrder',
  components: {
  },
  data() {
    return {
      orderId:15060
    }
  },
  computed:{
    order() {
      return this.$store.getters.getOrder(this.orderId);
    },
    user() {
      return this.$store.getters.getUser(this.order.userId)
    },
    orderDelivery() {
      let numOfRestaurants = Object.keys(this.order.orderContents).length;
      return 5 * numOfRestaurants;
    },
    orderTotal() {
      let subtotal = 0;

      for (let [key, values] of Object.entries(this.order.orderContents)) {
        values.forEach (item => {
          subtotal += this.$store.state.restaurants[key].menu[item].menuItemPrice;
        })
      }

      return subtotal + this.orderDelivery;
    }
  },
  mounted: function() {
    this.orderId = this.$route.query.id;
  },
}
</script>