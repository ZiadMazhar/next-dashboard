"use client"

import React, { useEffect, useState } from "react"
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  ChartData,
  ChartOptions
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function ChartsPage(): JSX.Element {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Line chart data
  const lineChartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Website Traffic',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'App Traffic',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  }

  // Bar chart data
  const barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales 2022',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Sales 2023',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  // Pie chart data
  const pieChartData: ChartData<'pie'> = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [300, 500, 200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  // Chart options
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Traffic Data',
      },
    },
  }

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales Comparison',
      },
    },
  }

  const pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Device Distribution',
      },
    },
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Charts</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Line data={lineChartData} options={chartOptions} />
        </div>
        
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold mt-2">1,234</p>
            <p className="text-green-500 flex items-center mt-2">
              <span>↑ 12%</span>
              <span className="text-gray-500 text-sm ml-1">vs last month</span>
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <p className="text-3xl font-bold mt-2">$56,789</p>
            <p className="text-red-500 flex items-center mt-2">
              <span>↓ 3%</span>
              <span className="text-gray-500 text-sm ml-1">vs last month</span>
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Conversion Rate</h3>
            <p className="text-3xl font-bold mt-2">5.67%</p>
            <p className="text-green-500 flex items-center mt-2">
              <span>↑ 2.3%</span>
              <span className="text-gray-500 text-sm ml-1">vs last month</span>
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Avg. Session</h3>
            <p className="text-3xl font-bold mt-2">4m 23s</p>
            <p className="text-green-500 flex items-center mt-2">
              <span>↑ 8%</span>
              <span className="text-gray-500 text-sm ml-1">vs last month</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
