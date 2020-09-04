import React, { Component } from 'react'
//import { LineChart, Line } from 'recharts';
//const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default class YearChart extends Component {



  data = [
    {
        "name": "Jan 2019",
        "Product A": 3432,
        "Procuct B": 2342
    },
    {
        "name": "Feb 2019",
        "Product A": 2342,
        "Procuct B": 3246
    },
    {
        "name": "Mar 2019",
        "Product A": 4565,
        "Procuct B": 4556
    },
    {
        "name": "Apr 2019",
        "Product A": 6654,
        "Procuct B": 4465
    },
    {
        "name": "May 2019",
        "Product A": 8765,
        "Procuct B": 4553
    }
]

render() {
  let monthlyData = this.props.monthlyData;
  console.log(monthlyData);
    return (
        <LineChart width={730} height={250} data={monthlyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rainMM" stroke="#0095FF" />
        </LineChart>
    )
};
}
