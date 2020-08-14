<template>
  <main class="main-admin-stats">
    <div class="header">
      <h3>Statistics</h3>
      <form>
        <select>
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </form>
    </div>
    <div class="statistics-container">
      <div class="stat">
        <h6>Sales</h6>
        <svg class="sales">
        </svg>
        <p>Graphs will go here in the next assignment</p>
      </div>
      <div class="stat">
        <h6>Orders</h6>
        <svg class="orders">

        </svg>
        <p>Graphs will go here in the next assignment</p>
      </div>
      <div class="stat">
        <h6>Restaurant Popularity</h6>
        <svg class="sales">
        </svg>
        <p>Graphs will go here in the next assignment</p>
      </div>
      <div class="stat">
        <h6>Sales by Suburb</h6>
        <svg class="orders">

        </svg>
        <p>Graphs will go here in the next assignment</p>
      </div>
    </div>

  </main>
</template>
<script>

export default {
  name: 'AdminStatistics',
  components: {

  },
  data() {
    return {

    }
  },
  methods:{

  }
}
</script>
