import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const CTABanner = () => {
  const { isAuthenticated, user } = useAuthStore();
  return (
    <section className="bg-blue-600 py-12 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Ready to Transform Your Document Management?
        </h2>

        <p className="text-blue-100 mb-8">
          Start your free trial today and experience the power of AI-driven
          document scanning.
        </p>

        <Link to="/sign-in">
          <button className="bg-white text-blue-600 font-medium px-8 py-3 rounded-md hover:bg-blue-50 transition-colors">
            Start Free Trial
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
