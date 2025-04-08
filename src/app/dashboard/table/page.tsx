"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { useAppSelector } from "@/redux/hooks"


const initialData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Active" },
  { id: 6, name: "Diana Miller", email: "diana@example.com", role: "Admin", status: "Inactive" },
  { id: 7, name: "Edward Davis", email: "edward@example.com", role: "User", status: "Active" },
  { id: 8, name: "Fiona Clark", email: "fiona@example.com", role: "Editor", status: "Active" },
  { id: 9, name: "George White", email: "george@example.com", role: "User", status: "Inactive" },
  { id: 110, name: "Hannah Green", email: "hannah@example.com", role: "Admin", status: "Active" },
  { id: 121, name: "Ian Black", email: "ian@example.com", role: "User", status: "Active" },
  { id: 132, name: "Julia Red", email: "julia@example.com", role: "Editor", status: "Inactive" },
  { id: 90, name: "George White", email: "george@example.com", role: "User", status: "Inactive" },
  { id: 140, name: "Hannah Green", email: "hannah@example.com", role: "Admin", status: "Active" },
  { id: 151, name: "Ian Black", email: "ian@example.com", role: "User", status: "Active" },
  { id: 91, name: "George White", email: "george@example.com", role: "User", status: "Inactive" },
  { id: 160, name: "Hannah Green", email: "hannah@example.com", role: "Admin", status: "Active" },
  { id: 171, name: "Ian Black", email: "ian@example.com", role: "User", status: "Active" },
  { id: 92, name: "George White", email: "george@example.com", role: "User", status: "Inactive" },
  { id: 180, name: "Hannah Green", email: "hannah@example.com", role: "Admin", status: "Active" },
  { id: 191, name: "Ian Black", email: "ian@example.com", role: "User", status: "Active" },
  { id: 93, name: "George White", email: "george@example.com", role: "User", status: "Inactive" },
  { id: 1000, name: "Hannah Green", email: "hannah@example.com", role: "Admin", status: "Active" },
  { id: 1211, name: "Ian Black", email: "ian@example.com", role: "User", status: "Active" },
]

type SortDirection = "asc" | "desc" | null
type SortField = "name" | "email" | "role" | "status" | null

export default function TablePage(): JSX.Element {
  const darkMode = useAppSelector((state) => state.ui.darkMode)
  const cardBgClass = darkMode ? "bg-gray-800" : "bg-white"
  const headingClass = darkMode ? "text-white" : "text-gray-900"
  const textClass = darkMode ? "text-gray-300" : "text-gray-600"

  const [data, setData] = useState(initialData)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [searchTerm, setSearchTerm] = useState("")


  const handleSort = (field: SortField) => {
    if (sortField === field) {

      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortField(null)
        setSortDirection(null)
      } else {
        setSortDirection("asc")
      }
    } else {

      setSortField(field)
      setSortDirection("asc")
    }
  }


  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField || !sortDirection) return 0

    const aValue = (a as any)[sortField].toLowerCase()
    const bValue = (b as any)[sortField].toLowerCase()

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })


  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown size={16} />
    if (sortDirection === "asc") return <ArrowUp size={16} />
    if (sortDirection === "desc") return <ArrowDown size={16} />
    return <ArrowUpDown size={16} />
  }

  return (
    <div>
      <h1 className={`text-2xl font-bold mb-6 ${headingClass}`}>Data Table</h1>
      <div className={`shadow rounded-lg overflow-hidden ${cardBgClass}`}>
        <div className={`p-4 border-b dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 ${cardBgClass}`}>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <span className={`text-sm mr-2 ${textClass}`}>Items per page:</span>
            <select
              className={`border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'}`}
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1) 
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700`}>
            <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textClass}`}>
                  ID
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${textClass}`}
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {renderSortIcon("name")}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${textClass}`}
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    {renderSortIcon("email")}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${textClass}`}
                  onClick={() => handleSort("role")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Role</span>
                    {renderSortIcon("role")}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${textClass}`}
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {renderSortIcon("status")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${cardBgClass}`}>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700`}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${textClass}`}>{item.id}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${headingClass}`}>
                      {item.name}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${textClass}`}>
                      {item.email}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${textClass}`}>
                      {item.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={`px-6 py-4 text-center text-sm ${textClass}`}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={`px-4 py-3 border-t border-gray-200 dark:border-gray-600 sm:px-6 flex flex-col sm:flex-row items-center justify-between ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className={`text-sm mb-2 sm:mb-0 ${textClass}`}>
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">{Math.min(startIndex + itemsPerPage, sortedData.length)}</span> of{" "}
            <span className="font-medium">{sortedData.length}</span> results
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className={`inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md ${cardBgClass} text-sm font-medium ${textClass} hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md ${cardBgClass} text-sm font-medium ${textClass} hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ChevronLeft size={16} />
            </button>

            <span className={`inline-flex items-center px-4 py-1 border border-gray-300 dark:border-gray-600 rounded-md ${cardBgClass} text-sm font-medium ${textClass}`}>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md ${cardBgClass} text-sm font-medium ${textClass} hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md ${cardBgClass} text-sm font-medium ${textClass} hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}