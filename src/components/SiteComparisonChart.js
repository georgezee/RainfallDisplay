import React, { useState } from 'react';
import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {getSiteDisplayName} from '../util/SiteNames';

const MIN_YEAR = 2020;

export default function SiteComparisonChart({ rainData, sites }) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const siteTotals = {};
  if (rainData && sites) {
    rainData.forEach(row => {
      const siteID = parseInt(row.siteId);
      const rainDate = new Date(row.date);
      if (rainDate.getFullYear() === selectedYear) {
        siteTotals[siteID] = (siteTotals[siteID] || 0) + row.rainfallMm;
      }
    });
  }

  const chartData = [];
  if (sites) {
    sites.forEach(site => {
      if (site && siteTotals[site.siteid] > 0) {
        chartData.push({
          name: getSiteDisplayName(site.vanityName),
          rainfall: Math.round(siteTotals[site.siteid] * 10) / 10,
        });
      }
    });
    chartData.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <IconButton onClick={() => setSelectedYear(y => y - 1)} disabled={selectedYear <= MIN_YEAR}>
          <ArrowLeftIcon />
        </IconButton>
        <Typography variant="h6" style={{ margin: '0 16px' }}>{selectedYear}</Typography>
        <IconButton onClick={() => setSelectedYear(y => y + 1)} disabled={selectedYear >= currentYear}>
          <ArrowRightIcon />
        </IconButton>
      </div>
      <ResponsiveContainer width='100%' aspect={2.5 / 1.0}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} />
          <YAxis label={{ value: 'Rain (mm)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`${value} mm`, 'Total Rainfall']} />
          <Bar dataKey="rainfall" fill="#42a5f5" name="Total Rainfall (mm)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
