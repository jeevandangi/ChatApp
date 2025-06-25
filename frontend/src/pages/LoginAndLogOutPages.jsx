

// Login.jsx
import { useState } from "react";
import { useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { ApiResponseHandler } from "../utils/ApiResponseHandler"
import { MdOutlineImage } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { LoaderButton } from "./LoderButton";

const Login = () => {
    useEffect(() => {
        document.title = "Login"
    }, [])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const { email, password } = formData
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await ApiResponseHandler("/api/v1/userS/login", "POST", { email, password })
            if (res.data.statusCode == 200) {
                navigate('/home')
            }
        } catch (error) {
            console.log(error?.response);
        } finally {
            setLoading(false)
        }


    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Welcome Back!</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-200">Email</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaUser className="text-gray-400 mr-2" />
                            <input type="email" placeholder="Email" className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-200">Password</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaLock className="text-gray-400 mr-2" />
                            <input type="password" placeholder="Password" className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {
                        loading ?
                            <LoaderButton prob="Wait" /> :
                            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition">
                                log In
                            </button>
                    }
                </form>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    Don't have an account? <a href="/register" className="text-red-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
}


// Register.jsx


const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        password: '',
        email: '',
        profile: '',
    });

    useEffect(() => {
        document.title = "register";
    }, []);

    const handelFormChange = (e) => {
        if (e.target.name === 'profile') {
            setFormData({ ...formData, profile: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const { fullName, password, email, profile } = formData;

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const form = new FormData();
            form.append("fullName", fullName);
            form.append("email", email);
            form.append("password", password);
            if (profile) {
                form.append("profile", profile);
            }

            const res = await ApiResponseHandler("/api/v1/users/register", "POST", form);

            if (res.data.statusCode == 200) {
                navigate("/")
            }

            console.log(res.data);
        } catch (error) {
            console.log(error?.response);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Join VideoTube</h2>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-200">Full Name</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaUser className="text-gray-400 mr-2" />
                            <input type="text" name="fullName" placeholder="Full Name" required
                                className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
                                onChange={handelFormChange}
                            />
                        </div>
                    </div>



                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-200">Email</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaUser className="text-gray-400 mr-2" />
                            <input type="email" name="email" placeholder="Email" required
                                className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
                                onChange={handelFormChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-200">Password</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaLock className="text-gray-400 mr-2" />
                            <input type="password" name="password" placeholder="Password" required
                                className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
                                onChange={handelFormChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-200">Profile</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <MdOutlineImage className="text-gray-400 mr-2" />
                            <input type="file" accept="image/*" name="profile"
                                className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
                                onChange={handelFormChange}
                            />
                        </div>
                    </div>

                    {
                        loading ?
                            <LoaderButton prob="Registering" /> :
                            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition">
                                Register
                            </button>
                    }


                </form>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    Already have an account? <a href="/" className="text-red-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};



export { Login, Register }