import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("You must agree to the terms and privacy policy.");
      return;
    }
    console.log("Form Submitted", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="border p-2 rounded w-full"
            onChange={handleChange}
            value={formData.firstName}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="border p-2 rounded w-full"
            onChange={handleChange}
            value={formData.lastName}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="border p-2 rounded w-full mt-4"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded w-full mt-4"
          onChange={handleChange}
          value={formData.password}
        />
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            name="agreed"
            onChange={handleChange}
            checked={formData.agreed}
            className="mr-2"
          />
          <label>
            I agree to the{" "}
            <a href="#" className="text-blue-600">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600">
              Privacy Policy
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
