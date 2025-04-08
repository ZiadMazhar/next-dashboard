"use client"

import { useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"
import { useAppSelector } from "@/redux/hooks"


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)


const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const lineData = {
  labels: months,
  datasets: [
    {
      label: "Sales 2023",
      data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      tension: 0.3,
    },
    {
      label: "Sales 2022",
      data: [45, 50, 60, 65, 45, 50, 35, 40, 50, 60, 65, 70],
      borderColor: "rgb(107, 114, 128)",
      backgroundColor: "rgba(107, 114, 128, 0.5)",
      tension: 0.3,
    },
  ],
}

const barData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 15000, 22000],
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      borderColor: "rgb(59, 130, 246)",
      borderWidth: 1,
    },
    {
      label: "Expenses",
      data: [8000, 12000, 10000, 14000],
      backgroundColor: "rgba(239, 68, 68, 0.5)",
      borderColor: "rgb(239, 68, 68)",
      borderWidth: 1,
    },
  ],
}

const pieData = {
  labels: ["Product A", "Product B", "Product C", "Product D"],
  datasets: [
    {
      data: [35, 25, 20, 20],
      backgroundColor: [
        "rgba(59, 130, 246, 0.7)",
        "rgba(16, 185, 129, 0.7)",
        "rgba(239, 68, 68, 0.7)",
        "rgba(245, 158, 11, 0.7)",
      ],
      borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)", "rgb(239, 68, 68)", "rgb(245, 158, 11)"],
      borderWidth: 1,
    },
  ],
}

const getChartOptions = (isDarkMode: boolean) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: isDarkMode ? "#e5e7eb" : "#374151",
      },
    },
    tooltip: {
      bodyColor: isDarkMode ? "#e5e7eb" : "#374151",
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      borderColor: isDarkMode ? "#374151" : "#e5e7eb",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: isDarkMode ? "#374151" : "#e5e7eb",
      },
      ticks: {
        color: isDarkMode ? "#e5e7eb" : "#374151",
      },
    },
    x: {
      grid: {
        color: isDarkMode ? "#374151" : "#e5e7eb",
      },
      ticks: {
        color: isDarkMode ? "#e5e7eb" : "#374151",
      },
    },
  },
})

export default function ChartsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState("all")
  

  const darkMode = useAppSelector((state) => state.ui.darkMode)

  const cardBgClass = darkMode ? "bg-gray-800" : "bg-white"
  const headingClass = darkMode ? "text-white" : "text-gray-900"
  const textClass = darkMode ? "text-gray-300" : "text-gray-600"
  
  const chartOptions = getChartOptions(darkMode)

  return (
    <div>
      <h1 className={`text-2xl font-bold mb-6 ${headingClass}`}>Charts</h1>

      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "all"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : `${textClass} hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 border-b-2 border-transparent`
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Charts
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "line"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : `${textClass} hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 border-b-2 border-transparent`
              }`}
              onClick={() => setActiveTab("line")}
            >
              Line Chart
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "bar"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : `${textClass} hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 border-b-2 border-transparent`
              }`}
              onClick={() => setActiveTab("bar")}
            >
              Bar Chart
            </button>
          </li>
          <li>
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "pie"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : `${textClass} hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 border-b-2 border-transparent`
              }`}
              onClick={() => setActiveTab("pie")}
            >
              Pie Chart
            </button>
          </li>
        </ul>
      </div>


      <div className="grid grid-cols-1 gap-6">
        {(activeTab === "all" || activeTab === "line") && (
          <div className={`${cardBgClass} p-6 rounded-lg shadow`}>
            <h2 className={`text-lg font-semibold mb-4 ${headingClass}`}>Monthly Sales Comparison</h2>
            <div className="h-80">
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        )}

  
        {(activeTab === "all" || activeTab === "bar") && (
          <div className={`${cardBgClass} p-6 rounded-lg shadow`}>
            <h2 className={`text-lg font-semibold mb-4 ${headingClass}`}>Quarterly Revenue vs Expenses</h2>
            <div className="h-80">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        )}


        {(activeTab === "all" || activeTab === "pie") && (
          <div className={`${cardBgClass} p-6 rounded-lg shadow`}>
            <h2 className={`text-lg font-semibold mb-4 ${headingClass}`}>Product Sales Distribution</h2>
            <div className="h-80 flex justify-center">
              <div className="w-full max-w-md">
                <Pie data={pieData} options={chartOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}