import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = () => {
    if (email) {
      // Implement your email sending logic here
      setMessage('Email sent successfully!');
      setEmail('');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">SPPU PAPERS</h2>
            <p className="text-sm">
              &copy; 2024 Cosmos solutions. All Rights Reserved
            </p>
            <div className="flex justify-center md:justify-start items-center text-sm text-gray-400">
              <span>[Note] - This is Not an official SPPU website</span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <ul className="flex space-x-4 mb-6 md:mb-2 justify-center md:justify-start">

              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  <FaTwitter size={20} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 transition-colors duration-300"
                >
                  <FaLinkedinIn size={20} />
                </a>
              </li>
            </ul>
            <ul className="flex space-x-4 text-sm mb-2 justify-center md:justify-start">
              <li>
                <a
                  href="#privacy-policy"
                  className="hover:text-gray-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms-of-service"
                  className="hover:text-gray-400 transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
            <div className="text-sm mb-2 flex flex-col items-center md:items-start">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="p-2 rounded-l-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendEmail}
                  className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Send
                </button>
              </div>
              {message && <p className="mt-2 text-sm text-green-400 text-center">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
