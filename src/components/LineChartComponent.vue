<template>
  <div>
    <p>{{ message }}</p>
    <svg :height="height" :width="width"></svg>
    <p>{{date}}</p>
    <p>{{data}}</p>
  </div>

</template>
<script>
import * as d3 from 'd3';

export default{
  name: "LineChartComponent",
  data() {
    return {
      message: "Hello from the Chart Component!",
      margin: {top:20, right:30, bottom:50, left:40},
      width: 500,
      height: 300,
      dataPoints: 30,
      data: [],
      date: new Date(2019,0,1),
      sales: 50.21
    }
  },
  created: function(){
    //populate Data with the first X dataPoints
    for (let i=0; i<=this.dataPoints; i++){
      this.data = this.generateData();
    }
  },
  mounted: function(){
    // window.setInterval(()=>{
    //   this.generateData()
    //   this.data.shift();
    // },1000)
  },
  methods:{
    generateData: function(){
      let MAX = 1000;
      let MIN = 10;

      //push datapoint
      this.data.push({date: this.date, sales: this.sales})

      //set the next date
      let nextDay = new Date(this.date);
      nextDay.setDate(nextDay.getDate()+1);
      this.date = nextDay;

      //set the next sales (2 decimal places)
      this.sales = parseFloat((Math.random() * (MAX - MIN) + MIN).toFixed(2));
      return this.data;
    }
  }
}
</script>