import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then(response => {
                setCourses(response.data.universities[0].courses);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleCourseChange = (event) => {
        const course = event.target.value;
        setSelectedCourse(course);
        const selectedCourseData = courses.find(c => c.course === course);

        // If course has branches, set them
        if (selectedCourseData && selectedCourseData.branches) {
            setBranches(selectedCourseData.branches);
        } else {
            setBranches([]);
        }
        setSelectedBranch('');
        setYears([]);
    };

    const handleBranchChange = (event) => {
        const branch = event.target.value;
        setSelectedBranch(branch);
        const selectedBranchData = branches.find(b => b.branch === branch);

        // If branch has years, set them
        if (selectedBranchData && selectedBranchData.years) {
            setYears(selectedBranchData.years);
        } else {
            setYears([]);
        }
        setSelectedYear('');
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Navigate to Papers page with selected data
        window.location.href = `/papers?course=${selectedCourse}&branch=${selectedBranch}&year=${selectedYear}`;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-0 text-[#a5a5a5] py-2 sm:py-4 md:py-6 pl-2 sm:pl-4 md:pl-6 lg:pl-8">
                    Previous Year Question Papers
                </h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 space-y-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                            Course
                        </label>
                        <select value={selectedCourse} onChange={handleCourseChange} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 text-lg py-3 px-4 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                            <option value="">Select Course</option>
                            {courses.length > 0 ? (
                                courses.map(course => (
                                    <option key={course.course} value={course.course}>{course.course}</option>
                                ))
                            ) : (
                                <option value="">Not Available</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                            Branch
                        </label>
                        <select value={selectedBranch} onChange={handleBranchChange} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 text-lg py-3 px-4 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                            <option value="">Select Branch</option>
                            {branches.length > 0 ? (
                                branches.map(branch => (
                                    <option key={branch.branch} value={branch.branch}>{branch.branch}</option>
                                ))
                            ) : (
                                <option value="">Not Available</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                            Year
                        </label>
                        <select value={selectedYear} onChange={handleYearChange} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 text-lg py-3 px-4 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                            <option value="">Select Year</option>
                            {years.length > 0 ? (
                                years.map(year => (
                                    <option key={year.year} value={year.year}>{year.year}</option>
                                ))
                            ) : (
                                <option value="">Not Available</option>
                            )}
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                        Submit
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Home;
