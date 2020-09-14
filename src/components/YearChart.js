import React, { Component } from 'react'
//import { LineChart, Line } from 'recharts';
//const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class YearChart extends Component {

  render() {
    let monthlyData = this.props.monthlyData;
      // console.log("rendering year chart ...");
      // console.log(monthlyData);

    return (
      <ResponsiveContainer width='100%' aspect={2.5/1.0}>
        <BarChart data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month"/>
          <YAxis label={{ value: 'Rain (mm)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey="2018" fill="#aad3df" />
          <Bar type="monotone" dataKey="2019" fill="#add19e" />
          <Bar type="monotone" dataKey="2020" fill="#f8d19d" />
        </BarChart>
      </ResponsiveContainer>
    )
  };
}
