<template>
  <div>
    <br>
    <div id="line_dataviz">
      <svg width="500" height="300" id="line_chart"></svg>
    </div>
  </div>

</template>
<script>
import * as d3 from 'd3';
import {dateMixin} from "../mixins/dateMixin";

export default {
  name: "LineChartComponent",
  mixins: [dateMixin],
  data() {
    return {
      dataPoints: 28,
      data: [],
      date: new Date("2019-01-01")
    }
  },
  created: function () {
    //populate Data with the first X dataPoints
    for (let i = 0; i < this.dataPoints; i++) {
      this.data = this.generateData();
    }
    console.log("Created");
  },
  mounted: function () {
    // set the dimensions and margins of the graph
    let width = 500
    let height = 300
    let margin = {top: 20, right: 30, bottom: 50, left: 40};


    this.chartLine(margin, width, height,)

    window.setInterval(() => {
      this.generateData();
      this.data.shift();
      this.chartLine(margin, width, height,)
    }, 1000)
  },
  methods: {
    chartLine: function (margin, width, height,) {
      d3.select("#line_chart g").remove();
      let svg_group = d3.select("#line_chart").append("g");

      let y_scale = d3.scaleLinear()
          .domain([0, d3.max(this.data, d => d.sales)]).nice()
          .range([height - margin.bottom, margin.top]);
      let y_axis = svg_group.append("g")
          .attr("transform", `translate(${margin.left},0)`)
          .attr('class', 'y axis')
          .call(d3.axisLeft(y_scale))
          .call(g => g.select(".domain"))
          .call(g => g.select(".tick:last-of-type text").clone()
              .attr("x", 3)
              .attr("text-anchor", "start")
              .attr("font-weight", "bold")
              .text(this.data.y));
      console.log(y_axis);


      // ex3.3 Step 7
      // x axis
      let x_scale;
      // define a group for the x-axis and the labels
      let x_axis = svg_group.append("g")
          .attr('class', 'x axis');

      console.log(x_axis);

      // ex3.3 Step 8: line generator
      let line = d3.line()
          .defined(d => !isNaN(d.sales))
          .x(d => x_scale(d.date))
          .y(d => y_scale(d.sales));
      // ex3.3 Step 9: the actual line in the svg
      let the_line = svg_group
          .append("path")
          .attr("class", "line");

      // ex3.3 Step 10
      // (re)calculate the x-scale and x-axis for the new data
      x_scale = d3.scaleUtc()
          .domain(d3.extent(this.data, d => d.date))
          .range([margin.left, width - margin.right]);
      x_axis.attr('class', 'x axis')
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x_scale).ticks(width / 100).tickSizeOuter(0));
      // draw the line with data
      the_line.datum(this.data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", line);

    },
    generateData: function () {
      let MAX = 6000;
      let MIN = 3000;

      this.data.push({"date": this.date, "sales": parseFloat((Math.random() * (MAX - MIN) + MIN).toFixed(2))})

      //set the next date
      let nextDay = new Date(this.date);
      nextDay.setDate(nextDay.getDate() + 1);
      this.date = nextDay;

      return this.data;
    }
  }
}
</script>