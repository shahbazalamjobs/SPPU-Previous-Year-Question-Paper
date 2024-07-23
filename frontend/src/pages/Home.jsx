import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        // axios.get('http://localhost:5000/api/data')
        axios.get('https://sppu-previous-year-question-paper.onrender.com/api/data')
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
            <Helmet>
                <title>SPPU Previous Year Question Papers</title>
                <meta name="description" content="Find previous year question papers for various courses at SPPU. Download papers for Computer Engineering, Electronics, Electrical, and more." />
                <meta name="keywords" content="SPPU, previous year question papers, Computer Engineering, Electronics, Electrical Engineering, University" />
                <meta name="author" content="Your Name" />
                <meta property="og:title" content="SPPU Previous Year Question Papers" />
                <meta property="og:description" content="Find previous year question papers for various courses at SPPU. Download papers for Computer Engineering, Electronics, Electrical, and more." />
                <meta property="og:image" content="/path/to/your/image.jpg" />
                <meta property="og:url" content="https://www.yourwebsite.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="SPPU Previous Year Question Papers" />
                <meta name="twitter:description" content="Find previous year question papers for various courses at SPPU. Download papers for Computer Engineering, Electronics, Electrical, and more." />
                <meta name="twitter:image" content="/path/to/your/image.jpg" />
                <link rel="canonical" href="https://www.yourwebsite.com" />
            </Helmet>
            <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8">
                <div className="mb-0 py-2 sm:py-4 md:py-6 pl-2 sm:pl-4 md:pl-6 lg:pl-8 text-sm text-gray-400">
                    <span>[Note] - This is not an official SPPU website.</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-[rgb(84,82,82)] pt-2 sm:pt-4 md:pt-6 pb-0 pl-2 sm:pl-4 md:pl-6 lg:pl-8">
                    SPPU Previous Year Question Papers
                </h1>

                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-4 md:p-5 lg:p-6 space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base font-medium mb-1">
                            Course
                        </label>
                        <select
                            value={selectedCourse}
                            onChange={handleCourseChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 text-sm sm:text-base py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <option value="" style={{ fontSize: '1rem' }}>Select Course</option>
                            {courses.length > 0 ? (
                                courses.map(course => (
                                    <option key={course.course} value={course.course} style={{ fontSize: '1rem' }}>{course.course}</option>
                                ))
                            ) : (
                                <option value="" style={{ fontSize: '1rem' }}>Not Available</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base font-medium mb-1">
                            Branch
                        </label>
                        <select
                            value={selectedBranch}
                            onChange={handleBranchChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 text-sm sm:text-base py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <option value="" style={{ fontSize: '1rem' }}>Select Branch</option>
                            {branches.length > 0 ? (
                                branches.map(branch => (
                                    <option key={branch.branch} value={branch.branch} style={{ fontSize: '1rem' }}>{branch.branch}</option>
                                ))
                            ) : (
                                <option value="" style={{ fontSize: '1rem' }}>Not Available</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-base font-medium mb-1">
                            Year
                        </label>
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 text-sm sm:text-base py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <option value="" style={{ fontSize: '1rem' }}>Select Year</option>
                            {years.length > 0 ? (
                                years.map(year => (
                                    <option key={year.year} value={year.year} style={{ fontSize: '1rem' }}>{year.year}</option>
                                ))
                            ) : (
                                <option value="" style={{ fontSize: '1rem' }}>Not Available</option>
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
