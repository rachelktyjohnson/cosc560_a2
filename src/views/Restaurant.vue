<template>
  <restaurant-component :restaurant-id="restaurantId"></restaurant-component>
</template>
<script>
import RestaurantComponent from '../components/RestaurantComponent.vue';

export default {
  name: 'Restaurant',
  components: {
    RestaurantComponent
  },
  data() {
    return {
      restaurantId: 0
    }
  },
  mounted: function() {
    this.restaurantId = this.$route.query.r;
  },
}
</script>
