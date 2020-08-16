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
  name: "PieChartComponent",
  data() {
    return {
      message: "Hello from the Pie Component!",
      margin: {top:20, right:30, bottom:50, left:40},
      width: 500,
      height: 500,
      restaurants: 10,
      data: [
        {restaurant:"Big B's", sales:364.34},
        {restaurant:"Rene's Pizza Place", sales:753.12},
        {restaurant:"Golden Ma Lun", sales:424.74},
        {restaurant:"Main Street Kebabs", sales:119.03},
        {restaurant:"The Grounds Keeper Cafe", sales:296.23},
        {restaurant:"Westpoint Noodle and Dumpling Bar", sales:585.94},
      ],
      date: new Date(2019,0,31)
    }
  },
  mounted: function(){
     // window.setInterval(()=>{
     //   this.generateData();
     // },1000)
  },
  methods:{
    generateData: function(){
      let MAX = 1000;
      let MIN = 10;

      //set the next date
      let nextDay = new Date(this.date);
      nextDay.setDate(nextDay.getDate()+1);
      this.date = nextDay;


      //set the next sales (2 decimal places)
      for (let i=0; i<this.data.length; i++){
        this.data[i].sales = parseFloat((Math.random() * (MAX - MIN) + MIN).toFixed(2));
      }
      return this.data;
    }
  }
}
</script>