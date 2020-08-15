<template>
  <main class="main-home">
    <div class="breakout">
      <h3>Find your local hunger tamers</h3>
      <form v-on:submit.stop.prevent="goToListing()" method="post">
        <input type="text" placeholder="Your suburb or postcode" v-model="suburb"/>
        <input type="submit" value="Go"/>
      </form>
    </div>
    <div class="how-we-work">
      <h3>How do we work?</h3>
      <div class="sections">
        <section>
          <img src="img/dbe-step1.svg" alt="Step 1">
          <h5>You find your local hunger tamer here</h5>
        </section>
        <section>
          <img src="img/dbe-step2.svg" alt="Step 2">
          <h5>We let them know and they prepare your food</h5>
        </section>
        <section>
          <img src="img/dbe-step3.svg" alt="Step 3">
          <h5>Our Dropbears collect and deliver to you!</h5>
        </section>
      </div>

    </div>
    <div class="breakout">
      <h3>Drop that hunger level now</h3>
      <form v-on:submit.stop.prevent="goToListing()" method="post">
        <input type="text" placeholder="Your suburb or postcode" v-model="suburb"/>
        <input type="submit" value="Go"/>
      </form>
    </div>
  </main>
</template>

<script>

export default {
  name: 'LandingComponent',
  data() {
    return {
      suburb: null
    }
  },
  methods: {
    goToListing: function(){
      this.$store.commit('changeSuburb',this.suburb);
      this.$router.push('listing');
    }
  }
}
</script>