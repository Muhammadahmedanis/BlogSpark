import React, { useEffect, useState } from 'react'
import { FiUsers, FiActivity, FiDollarSign, FiDatabase } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card.jsx'
import Chart from '../components/Chart.jsx';
import Table from '../components/Table.jsx';
// import { toggleTheme } from '../../redux/themeSlice.js';


function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const blog = useSelector((state) => state.user);
  

  let theme;
  const handleTheme = () => {
    // const theme = useSelector(state => state.theme.theme);
    // dispatch(toggleTheme());
  }


  const [trend, setTrend] = useState("0% change");
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Current month (0-11)
    const currentYear = currentDate.getFullYear(); // Current year

    let currentMonthUsers = 0;
    let prevMonthUsers = 0;

    // Count users for the current and previous month
    user?.forEach((user) => {
      const userDate = new Date(user.createdAt);
      const userMonth = userDate.getMonth(); // User's registration month
      const userYear = userDate.getFullYear(); // User's registration year

      // Current month users count
      if (userMonth === currentMonth && userYear === currentYear) {
        currentMonthUsers++;
      }

      // Previous month users count
      if (userMonth === (currentMonth - 1 + 12) % 12 && userYear === currentYear) {
        prevMonthUsers++;
      }
    });

    // Function to calculate the percentage increase in users
    const calculatePercentageChange = () => {
      if (prevMonthUsers === 0 && currentMonthUsers > 0) {
        return "New Users";
      }
      if (prevMonthUsers === 0) {
        return "No users yet";
      }

      const change = ((currentMonthUsers - prevMonthUsers) / prevMonthUsers) * 100;
      return `${Math.abs(change).toFixed(1)}% ${change >= 0 ? "increase" : "decrease"}`;
    };

    setTrend(calculatePercentageChange());
  }, [user]); 
  

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}> 
     <div className="flex-1 overflow-y-auto m-3 dark:bg-gray-800">
        <div className='grid grid-cols-2 md-grid-cols-2 lg:grid-cols-4 gap-3'>
        <Card 
            icon={<FiUsers className="w-6 h-6 dark:text-indigo-300" />}
            title="Active User"
            value={user?.length}
            trend={trend}
            color="bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300"
        />
        <Card 
            icon={<FiActivity className="w-6 h-6 dark:text-emerald-300" />}
            title="Active Token"
            value="2,853"
            trend="3.3% decrease"
            color="bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300"
            />
        <Card 
            icon={<FiDollarSign className="w-6 h-6 dark:text-rose-300" />}
            title="Active Token"
            value="2,853"
            trend="3.3% decrease"
            color="bg-rose-100 dark:bg-rose-900 dark:text-rose-300"
            />
        <Card 
            icon={<FiDatabase className="w-6 h-6 dark:text-amber-300" />}
            title="Active Token"
            value="2,853"
            trend="3.3% decrease"
            color="bg-amber-100 dark:bg-amber-900 dark:text-amber-300"
            />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-col-2 gap-5 my-3">
        <Chart  /> 
        {/* theme={theme} */}
        </div>
        <div className='grid my-3 overflow-y-hidden'>
        <Table />
        </div>
      </div>
    </div>
  )
}

export default Dashboard