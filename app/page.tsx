"use client";

import { sendMailAction } from "@/lib/sendMail";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [formData, setFormData] = useState({
    userEmail: "",
    name: "",
    subject: "",
    body: "",
  });

  // State to manage dark mode toggle
  const [darkMode, setDarkMode] = useState(true);

  // Use useEffect to apply the dark mode class to the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Toggle dark mode state
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await sendMailAction({
        to: "mickael.murmann@elan-formation.fr", // Email is always sent to admin
        name: formData.name,
        subject: formData.subject,
        body: `
          <h1>New message from ${formData.name}</h1>
          <p><strong>Email:</strong> ${formData.userEmail}</p>
          <p>${formData.body}</p>
        `,
      });

      // Show success toast notification
      toast.success("Email sent successfully !");

      // Optionally clear form after submission
      setFormData({
        userEmail: "",
        name: "",
        subject: "",
        body: "",
      });
    } catch (error) {
      // Show error toast notification if something goes wrong
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center bg-gray-100 text-black dark:bg-gray-900 dark:text-white`}
    >
      {/* Dark Mode Toggle Button */}
      <div className="absolute top-6 right-6">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-700 text-white transition duration-300"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Full-width background and centered form */}
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition duration-300">
          <h1 className="text-3xl font-bold text-center mb-8">Send an Email</h1>

          <form onSubmit={send} className="space-y-6">
            {/* User's Email */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2" htmlFor="userEmail">
                Your Email
              </label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                placeholder="Enter your email"
                value={formData.userEmail}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>

            {/* Sender's Name */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 mb-2" htmlFor="body">
                Message
              </label>
              <textarea
                id="body"
                name="body"
                placeholder="Type your message here..."
                value={formData.body}
                onChange={handleChange}
                rows={8}
                className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg transition duration-300"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}