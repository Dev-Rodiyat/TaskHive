import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const getDayName = (date) =>
  date.toLocaleDateString('en-US', { weekday: 'short' }); // "Mon", "Tue", etc.

const getWeekDays = () => {
  const days = [];
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday as start

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    days.push({
      date: d,
      label: getDayName(d),
      tasks: 0,
    });
  }

  return days;
};

const WeeklyProgressChart = ({ tasks }) => {
  const chartData = useMemo(() => {
    const weekDays = getWeekDays();

    tasks?.forEach(task => {
      const completedDate = new Date(task.completedAt || task.createdAt);
      const completedDay = getDayName(completedDate);

      const dayEntry = weekDays.find(d => d.label === completedDay);
      if (dayEntry) {
        dayEntry.tasks += 1;
      }
    });

    return weekDays;
  }, [tasks]);

  return (
    <div className="mt-10 w-full">
      <h2 className="text-xl font-semibold mb-4 text-zinc-800 text-center sm:text-left">
        Weekly Progress
      </h2>
      <div className="bg-white rounded-xl shadow p-4 w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="tasks" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyProgressChart;