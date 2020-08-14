<template>
  <main class="main-admin-stats">
    <div class="header">
      <h3>Statistics</h3>
      <!--<form>
        <select>
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </form>-->
    </div>
    <div class="statistics-container">
      <div class="stat">
        <h6>Sales($) per Transaction</h6>
        <svg class="per-transaction">
        </svg>
        <p>Graphs will go here in the next assignment</p>
      </div>
      <div class="stat">
        <h6>Sales($) per Store</h6>
        <svg class="per-store">

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
