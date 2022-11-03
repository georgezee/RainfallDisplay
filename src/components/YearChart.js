import React, { Component } from 'react'
//import { LineChart, Line } from 'recharts';
//const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class YearChart extends Component {

  render() {
    let monthlyData = this.props.monthlyData;
      // console.log("rendering year chart ...");
      // console.log(monthlyData);

    let yearList = [
      ["2018", "#aad3df"],
      ["2019", "#add19e"],
      ["2020", "#f8d19d"],
      ["2021", "#dda0dd"],
      ["2022", "#eb9595"],
      ["2023", "#9ab7d3"],
      ["2024", "#e3a7c0"],
    ]

    const years = yearList.map((item, index) => {
      let year = item[0];
      let colour = item[1];

      let currentYear = new Date().getFullYear();

      // Only show years that are current or in the past, based on user device.
      if (year <= currentYear) {
        return <Bar type="monotone" dataKey={year} fill={colour} />
      }
    });

    return (
      <ResponsiveContainer width='100%' aspect={2.5/1.0}>
        <BarChart data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month"/>
          <YAxis label={{ value: 'Rain (mm)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {years}
        </BarChart>
      </ResponsiveContainer>
    )
  };
}
