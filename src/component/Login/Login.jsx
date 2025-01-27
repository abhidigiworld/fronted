import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        subscribe: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful", data);

                // Assuming the response includes the user type
                const { userType } = data; // userType could be 'admin', 'subadmin', 'user' we decide this thing later

                // Based on userType, redirect to different pages
                if (userType === "admin") {
                    navigate("/admin");
                } else if (userType === "subadmin") {
                    navigate("/subadmin");
                } else {
                    navigate("/user");
                }
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <>
            <Header/>
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-800 via-blue-800 to-indigo-800 text-white">
                <div className="container max-w-lg bg-gray-900 bg-opacity-90 p-12 rounded-3xl shadow-lg">
                    <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">
                        Welcome to RRR
                    </h1>

                    <form className="form-container space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <label className="block">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </label>

                            <label className="block">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </label>
                        </div>

                        <label className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                name="subscribe"
                                checked={formData.subscribe}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span className="text-sm">Agree to terms and conditions</span>
                        </label>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md shadow-md transition-all duration-300"
                        >
                            Log In
                        </button>

                        {/* Forgot Password and Sign Up links */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-400">
                                <a href="#" className="text-purple-500 hover:text-purple-400">
                                    Forgot Password?
                                </a>
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                Don't have an account?{" "}
                                <a href="#" className="text-purple-500 hover:text-purple-400">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-gray-400">
                        <p>
                            <span className="text-purple-500">RRR</span> helps you ace
                            your coding interviews with ease!
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoginPage;
