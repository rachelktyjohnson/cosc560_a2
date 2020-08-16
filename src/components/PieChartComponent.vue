<template>
  <div>
    <br>
    <h6>{{formatDateTime(date,'date')}}</h6>
    <div id="pie_dataviz"></div>
  </div>

</template>
<script>
import * as d3 from 'd3';
import {dateMixin} from "../mixins/dateMixin";

export default{
  name: "PieChartComponent",
  mixins: [dateMixin],
  data() {
    return {
      data: {
        "BB": 964.34,
        "RP": 753.12,
        "GML": 824.74,
        "KM": 519.03,
        "GK": 796.23,
        "WND": 585.94
      },
      date: new Date(2019,0,1)
    }
  },
  mounted: function(){
      // set the dimensions and margins of the graph
      let width = 450
      let height = 450
      let margin = 40

      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      let radius = Math.min(width, height) / 2 - margin



      this.chart(width,height,radius)

      window.setInterval(()=>{
        this.generateData();
        //clear the g transform
        this.chart(width,height,radius);
      },2000)
  },
  methods:{
    chart:function(width,height,radius){
      //clear g transform
      d3.select("#pie_dataviz svg").remove();
      console.log("cleared");
      // append the svg object to the div called 'my_dataviz'
      let svg = d3.select("#pie_dataviz")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      // Compute the position of each group on the pie:
      let pie = d3.pie()
          .value(function(d) {return d.value; })
      let data_ready = pie(d3.entries(this.data))
      // Now I know that group A goes from 0 degrees to x degrees and so on.

      // shape helper to build arcs:
      let arcGenerator = d3.arc()
          .innerRadius(0)
          .outerRadius(radius)

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
          .selectAll('mySlices')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('d', arcGenerator)
          .attr('fill', "black")
          .attr("stroke", "black")
          .style("stroke-width", "2px")
          .style("opacity", 0.4)

      // Now add the annotation. Use the centroid method to get the best coordinates
      svg
          .selectAll('mySlices')
          .data(data_ready)
          .enter()
          .append('text')
          .text(function(d){ return d.data.key+" $"+ d.data.value})
          .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
          .style("text-anchor", "middle")
          .style("font-size", 10)

    },
    generateData: function(){
      let MAX = 1000;
      let MIN = 500;

      //set the next date
      let nextDay = new Date(this.date);
      nextDay.setDate(nextDay.getDate()+1);
      this.date = nextDay;

      for (let key in this.data){
        this.data[key] = parseFloat((Math.random() * (MAX - MIN) + MIN).toFixed(2));
      }
      console.log(this.data);
      return this.data;
    }
  }
}
</script>