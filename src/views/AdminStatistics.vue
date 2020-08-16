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
        <h4>Sales($) per Day</h4>
        <line-chart-component></line-chart-component>
      </div>

      <div class="stat">
        <h4>Sales($) per Store</h4>
        <pie-chart-component></pie-chart-component>
      </div>

    </div>

  </main>
</template>
<script>
import LineChartComponent from '../components/LineChartComponent.vue';
import PieChartComponent from '../components/PieChartComponent.vue';
export default {
  name: 'AdminStatistics',
  components: {
    LineChartComponent,
    PieChartComponent
  },
  data() {
    return {}
  }
}
</script>
