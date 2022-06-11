import './App.css';
import initialData from "./leaderboard"
import {useEffect, useState} from "react";

const {toast} = require('tailwind-toast')

let searchData = null;

function App() {

    const [filteredData, setFilteredData] = useState([])
    const [searchText, setSearchText] = useState([])

    function searchFunc() {
        searchData = null;
        let values = getInitialValues()
        if (searchText === "") {
            toast().warning('Warning', 'Please input name!').with({
                shape: 'pill',
                duration: 2000,
                speed: 1000,
                color: 'bg-yellow-400',
                fontColor: 'yellow',
                fontTone: 'text-yellow-700'
            }).show()
        } else {
            values = values.sort((b, a) => {
                return (a.bananas - b.bananas);
            })

            values.map((value) => {
                if ((value.name.includes(searchText) || value.name.toLowerCase().includes(searchText)) && !searchData)
                    searchData = value
                return 0;
            })

            values.map((value, index) => {
                values[index].rankNumber = (index + 1)
                return 0;
            })

            values = values.slice(0, 10)

            let isExist = false;
            values.map(value => {
                if (searchData && value.uid === searchData.uid)
                    isExist = true;
                return 0;
            })

            if (!isExist)
                if (!searchData) {
                    toast().warning('This user name does not exist!', 'Please specify an existing user name!').with({
                        shape: 'pill',
                        duration: 2000,
                        speed: 1000,
                        color: 'bg-yellow-400',
                        fontColor: 'yellow',
                        fontTone: 'text-yellow-700'
                    }).show()
                } else
                    values[9] = searchData
            setFilteredData(values)
        }
    }

    function isCuurrentIndex(data) {
        if (searchData) {
            return searchData.uid === data.uid
        } else
            return false;
    }

    function getInitialValues() {
        let keys = Object.keys(initialData)
        let values = []
        keys.map(key => {
                values.push(initialData[key])
            }
        )
        return values;
    }

    useEffect(() => {
        setFilteredData(getInitialValues())
    }, [])

    return (
        <div className="App">
            <div className="w-3/5 mx-auto mt-6">
                <div className="flex justify-between items-center">
                    <form method="GET">
                        <div className="relative text-blue-600 focus-within:text-blue-400">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                     stroke-width="2"
                                     viewBox="0 0 24 24" className="w-6 h-6"><path
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </span>
                            <input type="search" name="q"
                                   onChange={(e) => {
                                       setSearchText(e.target.value)
                                   }}
                                   className="py-2 text-sm text-blue bg-white border-b-blue pl-10 focus:outline-none focus:text-blue-900"
                                   placeholder="Search..." autoComplete="off"/>
                        </div>
                    </form>
                    <button type="button"
                            onClick={searchFunc}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Search
                    </button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Number of bananas
                            </th>
                            <th scope="col" className="px-6 py-3">
                                isSearchedUser
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredData.map((data, index) =>
                            {
                                return (
                                    <tr className={
                                        isCuurrentIndex(data) ? "bg-blue-200" : "bg-white"}>
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {data.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {data.rankNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.bananas}
                                        </td>
                                        <td className="px-6 py-4">
                                            {String(data.subscribed)}
                                        </td>
                                    </tr>
                                )
                            }
                                )
                            }
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
