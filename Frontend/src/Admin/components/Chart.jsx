import React from 'react'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';


function Chart() {
  const monthlyData = [
    { name: 'Jan', visits: 4000, resolved: 2400 },
    { name: 'Feb', visits: 3000, resolved: 1398 },
    { name: 'Mar', visits: 2000, resolved: 9800 },
    { name: 'Apr', visits: 2780, resolved: 3908 },
  ];

const departmentDistribution = [
  { name: 'Medical', value: 400, color: '#4F46E5' },
  { name: 'Financial', value: 300, color: '#10B981' },
  { name: 'Education', value: 300, color: '#F59E0B' },
];


  return (
    <>
    <div className="p-6 rounded-xl shadow-sm dark:bg-gray-700 dark:border bg-white">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Monthly Activity</h3>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3"  stroke="dark:bg-[#4B5563] bg-[#E5E7EB] "/>
                <XAxis dataKey="name" stroke="dark:bg-[#D1D5DB] bg-[#374151]"/>
                <YAxis stroke="dark:bg-[#D1D5DB] bg-[#374151]" />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#4F46E5" />
                <Bar dataKey="resolved" fill="#10B981" />
            </BarChart>
            </ResponsiveContainer>
        </div>
    </div>

    <div  className="p-6 rounded-xl shadow-sm dark:bg-gray-700 dark:border bg-white">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Department Distribution</h3>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={departmentDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label>
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
    </>
  )
}

export default Chart