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
      </div>

      <div class="stat">
        <h6>Sales($) per Store</h6>
      </div>

    </div>

  </main>
</template>
<script>
import * as d3 from 'd3';
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
