// src/components/FilterBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterBar = ({ onFilterChange }) => {
    const [courses, setCourses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then(response => {
                setCourses(response.data.universities[0].courses);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            const selectedCourseData = courses.find(c => c.course === selectedCourse);
            setBranches(selectedCourseData ? selectedCourseData.branches : []);
            setYears([]);
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (selectedBranch) {
            const selectedBranchData = branches.find(b => b.branch === selectedBranch);
            setYears(selectedBranchData ? selectedBranchData.years : []);
        }
    }, [selectedBranch]);

    const handleFilterChange = () => {
        onFilterChange({
            course: selectedCourse,
            branch: selectedBranch,
            year: selectedYear,
            searchTerm,
        });
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                    <label className="block text-gray-700 text-base font-medium mb-2">Course</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        onBlur={handleFilterChange}
                        className="form-select block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.course} value={course.course}>{course.course}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-gray-700 text-base font-medium mb-2">Branch</label>
                    <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        onBlur={handleFilterChange}
                        className="form-select block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                            <option key={branch.branch} value={branch.branch}>{branch.branch}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-gray-700 text-base font-medium mb-2">Year</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        onBlur={handleFilterChange}
                        className="form-select block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <option value="">Select Year</option>
                        {years.map(year => (
                            <option key={year.year} value={year.year}>{year.year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-gray-700 text-base font-medium mb-2">Search</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onBlur={handleFilterChange}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Search papers..."
                />
            </div>
        </div>
    );
};

export default FilterBar;
