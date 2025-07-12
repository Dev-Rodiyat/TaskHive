// components/WeeklyProgressChart.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Mon', tasks: 2 },
  { day: 'Tue', tasks: 1 },
  { day: 'Wed', tasks: 3 },
  { day: 'Thu', tasks: 0 },
  { day: 'Fri', tasks: 2 },
  { day: 'Sat', tasks: 1 },
  { day: 'Sun', tasks: 4 },
];

const WeeklyProgressChart = () => (
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4 text-zinc-800">Weekly Progress</h2>
    <div className="h-64 bg-white rounded-xl shadow p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="tasks" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default WeeklyProgressChart;
