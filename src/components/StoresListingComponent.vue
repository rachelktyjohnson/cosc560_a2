<template>
  <main class="main-listing">
    <h3>Restaurants in {{ suburb }}</h3>
    <h6>Change Location?</h6>
    <div class="pure-g">
      <div class="pure-u-3-4">
        <div class="restaurants">
          <a v-for="store in stores">
            <section class="restaurant">
              <img :src="store.imgSrc" :alt="store.storeName"/>
              <div class="content">
                <h4>{{ store.storeName }}</h4>
                <p>{{ store.tagLine }}</p>
                <p>{{ store.storeRating }} &#9733; ({{ store.numberOfRatings }})</p>
              </div>
            </section>
          </a>
        </div>
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
  name: 'StoresListingComponent',
  components: {
    BasketComponent
  },
  data() {
    return {
      suburb: "Riverview",
      stores: [
        {
          storeName: "Big B's Chicken and Burgers",
          storeTagline: "Chicken, burgers, chips, American",
          storeRating: 4.9,
          numberOfRatings: 203,
          imgSrc: '/img/listing-bigb.jpg'
        },
        {
          storeName: "Crust Pizza",
          storeTagline: "Chicken, Lebanese",
          storeRating: 3.8,
          numberOfRatings: 46,
          imgSrc: '/img/listing-crustpizza.jpg'
        },
        {
          storeName: "El Jannah",
          storeTagline: "Chicken, Middle Eastern",
          storeRating: 3.8,
          numberOfRatings: 263,
          imgSrc: '/img/listing-eljannah.jpg'
        },
        {
          storeName: "Golden Ma Lun",
          storeTagline: "Chinese, Asian",
          storeRating: 3.7,
          numberOfRatings: 149,
          imgSrc: '/img/listing-goldenmalun.jpg'
        },
        {
          storeName: "Main Street Kebabs",
          storeTagline: "Pizza, Chicken, Casual",
          storeRating: 4.2,
          numberOfRatings: 24,
          imgSrc: '/img/listing-kebabs.jpg'
        },
        {
          storeName: "Rene's Pizza Place",
          storeTagline: "Pizza, Pasta, Italian",
          storeRating: 4.8,
          numberOfRatings: 155,
          imgSrc: '/img/listing-renes.jpg'
        },
        {
          storeName: "The Grounds Keeper Cafe",
          storeTagline: "Modern Australian, Cafe",
          storeRating: 3,
          numberOfRatings: 21,
          imgSrc: '/img/listing-groundskeeper.jpg'
        },
        {
          storeName: "Westpoint Noodle and Dumpling Bar",
          storeTagline: "Chinese, Thai, Asian",
          storeRating: 4.2,
          numberOfRatings: 3,
          imgSrc: '/img/listing-westpoint.jpg'
        },
        {
          storeName: "Chaska Indian Street Food",
          storeTagline: "Indian, Street Food",
          storeRating: 3.8,
          numberOfRatings: 5,
          imgSrc: '/img/listing-chaska.jpg'
        },
      ]
    }
  },
  methods: {

  }
}
</script>