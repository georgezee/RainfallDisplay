import React, { Component } from 'react'
import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const YEAR_LIST = [
  ["2020", "#f8d19d"],
  ["2021", "#dda0dd"],
  ["2022", "#eb9595"],
  ["2023", "#9ab7d3"],
  ["2024", "#e3a7c0"],
  ["2025", "#b8f3dd"],
  ["2026", "#90ee90"],
  ["2027", "#d0b3ff"],
  ["2028", "#ffd5b1"],
  ["2029", "#ffe6f2"],
  ["2030", "#b7e5d4"],
  ["2031", "#c7e9b4"],
  ["2032", "#fde0dd"],
];

export default class YearChart extends Component {

  constructor(props) {
    super(props);
    const currentYear = new Date().getFullYear().toString();
    const initialChecked = {};
    YEAR_LIST.forEach(([year]) => {
      if (year <= currentYear) {
        initialChecked[year] = true;
      }
    });
    this.state = { checkedYears: initialChecked };
  }

  handleToggle(year) {
    this.setState(prev => ({
      checkedYears: { ...prev.checkedYears, [year]: !prev.checkedYears[year] }
    }));
  }

  render() {
    const { monthlyData } = this.props;
    const { checkedYears } = this.state;
    const currentYear = new Date().getFullYear().toString();

    const visibleYears = YEAR_LIST.filter(([year]) => year <= currentYear);

    const bars = visibleYears.map(([year, colour]) =>
      checkedYears[year]
        ? <Bar key={year} dataKey={year} fill={colour} />
        : null
    );

    const checkboxes = visibleYears.map(([year, colour]) => (
      <FormControlLabel
        key={year}
        label={year}
        control={
          <Checkbox
            checked={!!checkedYears[year]}
            onChange={() => this.handleToggle(year)}
            style={{ color: colour }}
          />
        }
      />
    ));

    return (
      <div>
        <ResponsiveContainer width='100%' aspect={2.5 / 1.0}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Rain (mm)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            {bars}
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0 16px 16px' }}>
          {checkboxes}
        </div>
      </div>
    );
  }
}
