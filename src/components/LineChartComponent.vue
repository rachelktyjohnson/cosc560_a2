<template>
  <div>
    <svg id="line_chart"></svg>
  </div>

</template>
<script>
import * as d3 from 'd3';

export default {
  name: "LineChartComponent",
  data() {
    return {
      message: "Hello from the Chart Component!",
      width: 500,
      height: 300,
      dataPoints: 7,
      data: [],
      date: new Date(2019, 0, 1),
      sales: 50.21,
      margin: { top: 20, right: 30, bottom: 50, left: 40 }
    }
  },
  created: function () {
    //populate Data with the first X dataPoints
    for (let i = 0; i <= this.dataPoints; i++) {
      this.data = this.generateData();
    }
  },
  mounted: function () {

    //this.renderChart(this.data);
     // window.setInterval(()=>{
     //   this.generateData();
     //   this.renderChart(this.data);
     //   this.data.shift();
     // },1000)
  },
  methods: {
    generateData: function () {
      let MAX = 1000;
      let MIN = 10;

      //push datapoint
      this.data.push({date: this.date, sales: this.sales})

      //set the next date
      let nextDay = new Date(this.date);
      nextDay.setDate(nextDay.getDate() + 1);
      this.date = nextDay;

      //set the next sales (2 decimal places)
      this.sales = parseFloat((Math.random() * (MAX - MIN) + MIN).toFixed(2));
      return this.data;
    },
    renderChart(data) {
      //group element for the entire chart
      let svg_group = d3.select("#line_chart").append("g");

      // y axis
      let y_scale = d3.scaleLinear()
          .domain([0, d3.max(this.data, d => d.sales)]).nice()
          .range([this.height - this.margin.bottom, this.margin.top]);
      let y_axis = svg_group.append("g")
          .attr("transform", `translate(${this.margin.left},0)`)
          .attr('class', 'y axis')
          .call(d3.axisLeft(y_scale))
          .call(g => g.select(".domain"))
          .call(g => g.select(".tick:last-of-type text").clone()
              .attr("x", 3)
              .attr("text-anchor", "start")
              .attr("font-weight", "bold")
              .text(this.data.y));


      // define a group for the x-axis and the labels
      let x_axis = svg_group.append("g")
          .attr('class', 'x axis');

      // ex3.3 Step 8: line generator
      let line = d3.line()
          .defined(d => !isNaN(d.sales))
          .x(d => x_scale(d.date))
          .y(d => y_scale(d.sales));

      // ex3.3 Step 9: the actual line in the svg
      let the_line = svg_group
          .append("path")
          .attr("class", "line");
      // x axis
      // let x_scale;
      // define a group for the x-axis and the labels
      x_axis = svg_group.append("g")
          .attr('class', 'x axis');

      console.log(x_axis);

      // ex3.3 Step 8: line generator
      line = d3.line()
          .defined(d => !isNaN(d.sales))
          .x(d => x_scale(d.date))
          .y(d => y_scale(d.sales));

      // ex3.3 Step 9: the actual line in the svg
      the_line = svg_group
          .append("path")
          .attr("class", "line");

      // (re)calculate the x-scale and x-axis for the new data
      let x_scale = d3.scaleUtc()
          .domain(d3.extent(data, d => d.date))
          .range([this.margin.left, this.width - this.margin.right]);
      x_axis.attr('class', 'x axis')
          .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
          .call(d3.axisBottom(x_scale).ticks(this.width / 100).tickSizeOuter(0));
      // draw the line with data
      the_line.datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", line);

    }
  }
}
</script>