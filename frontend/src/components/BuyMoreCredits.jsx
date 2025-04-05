const BuyMoreCredits = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <h3 className="text-lg font-medium mb-4">Basic</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">Free</span>
      </div>

      <div className="flex-grow space-y-3 mb-6">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span className="text-gray-700">20 credits</span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span className="text-gray-700">Basic OCR</span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span className="text-gray-700">2GB Storage</span>
        </div>
      </div>

      <Link to={`${isAuthenticated ? "/document-sharing" : "/sign-up"}`}>
        <button className="text-gray-600 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 text-center mt-auto">
          Choose Basic
        </button>
      </Link>
    </div>
  );
};

export default BuyMoreCredits;
