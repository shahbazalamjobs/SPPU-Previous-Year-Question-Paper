// // src/pages/Papers.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { Helmet } from 'react-helmet';

// const Papers = () => {
//     const [papersData, setPapersData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [openSubjects, setOpenSubjects] = useState({});
//     const location = useLocation();

//     // Helper function to parse query parameters
//     const queryParams = new URLSearchParams(location.search);
//     const course = queryParams.get('course');
//     const branch = queryParams.get('branch');
//     const year = queryParams.get('year');

//     useEffect(() => {
//         setLoading(true);
//         axios.get('http://localhost:5000/api/data') // Fetch data from backend
//             .then(response => {
//                 const universityData = response.data.universities[0];
//                 const courseData = universityData.courses.find(c => c.course === course);
//                 const branchData = courseData.branches.find(b => b.branch === branch);
//                 const yearData = branchData.years.find(y => y.year === year);

//                 setPapersData(yearData);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             });
//     }, [course, branch, year]);

//     const handleToggle = (subject) => {
//         setOpenSubjects(prev => ({
//             ...prev,
//             [subject]: !prev[subject]
//         }));
//     };

//     if (loading) {
//         return <div className="text-center text-lg">Loading...</div>;
//     }

//     if (!papersData) {
//         return (
//             <div className="flex items-center justify-center min-h-[80vh]">
//                 <div className="text-center text-lg">
//                     No data found
//                 </div>
//             </div>
//         );
//     }

//     // Sort patterns in descending order by patternYear
//     const sortedPatterns = papersData.patterns.sort((a, b) => b.patternYear - a.patternYear);

//     return (
//         <div className="flex flex-col min-h-screen">
//             <Helmet>
//                 <title>{`SPPU ${course} ${branch} ${year} Previous Year Question Papers`}</title>
//                 <meta name="description" content={`Download previous year question papers for ${course} ${branch} ${year} at SPPU. Find papers sorted by pattern year.`} />
//                 <meta name="keywords" content={`SPPU, ${course}, ${branch}, ${year}, previous year question papers`} />
//                 <meta name="author" content="Your Name" />
//                 <meta property="og:title" content={`SPPU ${course} ${branch} ${year} Previous Year Question Papers`} />
//                 <meta property="og:description" content={`Download previous year question papers for ${course} ${branch} ${year} at SPPU. Find papers sorted by pattern year.`} />
//                 <meta property="og:image" content="/path/to/your/image.jpg" />
//                 <meta property="og:url" content="https://www.yourwebsite.com/papers" />
//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content={`SPPU ${course} ${branch} ${year} Previous Year Question Papers`} />
//                 <meta name="twitter:description" content={`Download previous year question papers for ${course} ${branch} ${year} at SPPU. Find papers sorted by pattern year.`} />
//                 <meta name="twitter:image" content="/path/to/your/image.jpg" />
//                 <link rel="canonical" href={`https://www.yourwebsite.com/papers?course=${course}&branch=${branch}&year=${year}`} />
//             </Helmet>
//             <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8">
//                 <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-[rgb(84,82,82)] pt-2 sm:pt-4 md:pt-6 pb-0 pl-2 sm:pl-4 md:pl-6 lg:pl-8">
//                     Previous Year Question Papers
//                 </h1>

//                 <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-500">
//                         {course} - {branch} - {year}
//                     </h2>

//                     {sortedPatterns.length > 0 ? (
//                         sortedPatterns.map((pattern, index) => (
//                             <div key={pattern.patternYear} className={`mb-4 ${index < sortedPatterns.length - 1 ? 'mb-4 border-b border-gray-200' : ''}`}>
//                                 <h3 className="text-xl font-semibold text-gray-400 mb-2">
//                                     Pattern Year: {pattern.patternYear}
//                                 </h3>
//                                 {pattern.subjects && pattern.subjects.length > 0 ? (
//                                     pattern.subjects.map(subject => (
//                                         <div key={subject.subject} className="border border-gray-200 rounded-md mt-2">
//                                             <button
//                                                 onClick={() => handleToggle(subject.subject)}
//                                                 className="w-full text-left px-4 py-2 flex justify-between items-center bg-gray-100 hover:bg-gray-200 focus:outline-none rounded-t-md"
//                                             >
//                                                 <span className="text-lg font-semibold">{subject.subject}</span>
//                                                 <span className="text-lg">{openSubjects[subject.subject] ? '-' : '+'}</span>
//                                             </button>
//                                             {openSubjects[subject.subject] && (
//                                                 <div className="py-2 bg-white rounded-b-md">
//                                                     {subject.papers && subject.papers.length > 0 ? (
//                                                         <table className="min-w-full divide-y divide-gray-200">
//                                                             <thead className="bg-gray-100">
//                                                                 <tr>
//                                                                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Year</th>
//                                                                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Month</th>
//                                                                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Link</th>
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody className="bg-white divide-y divide-gray-200">
//                                                                 {subject.papers.flatMap(paper =>
//                                                                     (paper.exams || [])
//                                                                         .filter(exam => paper.type === 'endsem') // Filter out insem papers
//                                                                         .map((exam, i) => (
//                                                                             <tr key={`${subject.subject}-${paper.type}-${exam.year}-${exam.month}`}>
//                                                                                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{exam.year}</td>
//                                                                                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{exam.month}</td>
//                                                                                 <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                                                                                     <a href={exam.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
//                                                                                         Download
//                                                                                     </a>
//                                                                                 </td>
//                                                                             </tr>
//                                                                         ))
//                                                                 )}
//                                                             </tbody>
//                                                         </table>
//                                                     ) : (
//                                                         <div className="text-gray-500">Not available</div>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="text-gray-500">No subjects available</div>
//                                 )}
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-gray-500">No patterns available</div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Papers;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Papers = () => {
    const [papersData, setPapersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openSubjects, setOpenSubjects] = useState({});
    const location = useLocation();

    // Helper function to parse query parameters
    const queryParams = new URLSearchParams(location.search);
    const course = queryParams.get('course');
    const branch = queryParams.get('branch');
    const year = queryParams.get('year');

    useEffect(() => {
        setLoading(true);
        // axios.get('http://localhost:5000/api/data') // Fetch data from backend
        axios.get('https://sppu-previous-year-question-paper.onrender.com/api/data')
            .then(response => {
                const universityData = response.data.universities[0];
                const courseData = universityData.courses.find(c => c.course === course);
                const branchData = courseData.branches.find(b => b.branch === branch);
                const yearData = branchData.years.find(y => y.year === year);

                setPapersData(yearData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [course, branch, year]);

    const handleToggle = (subject) => {
        setOpenSubjects(prev => ({
            ...prev,
            [subject]: !prev[subject]
        }));
    };

    // Function to convert Google Drive URL to direct download URL
    const convertToDirectDownloadUrl = (url) => {
        const fileIdMatch = url.match(/\/d\/(.*?)\/|file\/d\/(.*?)\//);
        if (fileIdMatch) {
            const fileId = fileIdMatch[1] || fileIdMatch[2];
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
        return url; // Return original URL if it doesn't match the pattern
    };

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (!papersData) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="text-center text-lg">
                    No data found
                </div>
            </div>
        );
    }

    // Sort patterns in descending order by patternYear
    const sortedPatterns = papersData.patterns.sort((a, b) => b.patternYear - a.patternYear);

    return (
        <div className="flex flex-col min-h-screen">
            <Helmet>
                <title>{`SPPU ${course} ${branch} ${year} Previous Year Question Papers`}</title>
                <meta name="description" content={`Download previous year question papers for ${course} ${branch} ${year} at SPPU. Find papers sorted by pattern year.`} />
                <meta name="keywords" content={`SPPU, ${course}, ${branch}, ${year}, previous year question papers`} />
                <meta name="author" content="Your Name" />
                <meta property="og:title" content={`SPPU ${course} ${branch} ${year} Previous Year Question Papers`} />
                <meta property="og:description" content={`Download previous year question papers for ${course} ${branch} ${year} at SPPU. Find papers sorted by pattern year.`} />
                <meta property="og:image" content="/path/to/your/image.jpg" />
                <meta property="og:url" content="https://www.yourwebsite.com/papers" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`SPPU ${course} ${branch} ${year} Previous Year Question Papers`} />
                <meta name="twitter:description" content={`Download previous year question papers for ${course} ${branch} ${year} at SPPU. Find papers sorted by pattern year.`} />
                <meta name="twitter:image" content="/path/to/your/image.jpg" />
                <link rel="canonical" href={`https://www.yourwebsite.com/papers?course=${course}&branch=${branch}&year=${year}`} />
            </Helmet>
            <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-[rgb(84,82,82)] pt-2 sm:pt-4 md:pt-6 pb-0 pl-2 sm:pl-4 md:pl-6 lg:pl-8">
                    Previous Year Question Papers
                </h1>

                <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-500">
                        {course} - {branch} - {year}
                    </h2>

                    {sortedPatterns.length > 0 ? (
                        sortedPatterns.map((pattern, index) => (
                            <div key={pattern.patternYear} className={`mb-4 ${index < sortedPatterns.length - 1 ? 'mb-4 border-b border-gray-200' : ''}`}>
                                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                                    Pattern Year: {pattern.patternYear}
                                </h3>
                                {pattern.subjects && pattern.subjects.length > 0 ? (
                                    pattern.subjects.map(subject => (
                                        <div key={subject.subject} className="border border-gray-200 rounded-md mt-2">
                                            <button
                                                onClick={() => handleToggle(subject.subject)}
                                                className="w-full text-left px-4 py-2 flex justify-between items-center bg-gray-100 hover:bg-gray-200 focus:outline-none rounded-t-md"
                                            >
                                                <span className="text-lg font-semibold">{subject.subject}</span>
                                                <span className="text-lg">{openSubjects[subject.subject] ? '-' : '+'}</span>
                                            </button>
                                            {openSubjects[subject.subject] && (
                                                <div className="py-2 bg-white rounded-b-md">
                                                    {subject.papers && subject.papers.length > 0 ? (
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-100">
                                                                <tr>
                                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Year</th>
                                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Month</th>
                                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Link</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {subject.papers.flatMap(paper =>
                                                                    (paper.exams || [])
                                                                        .filter(exam => paper.type === 'endsem') // Filter out insem papers
                                                                        .map((exam, i) => (
                                                                            <tr key={`${subject.subject}-${paper.type}-${exam.year}-${exam.month}`}>
                                                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{exam.year}</td>
                                                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{exam.month}</td>
                                                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                                                                    <a
                                                                                        href={convertToDirectDownloadUrl(exam.link)} // Convert to direct download URL
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="text-blue-600 hover:text-blue-800"
                                                                                    >
                                                                                        Download
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <div className="text-gray-500">Not available</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500">No subjects available</div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">No patterns available</div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Papers;
