export const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="md:w-8 md:h-8 w-6 h-6  border-4  border-t-blue-600 border-r-blue-600 rounded-full animate-spin animation-delay-0" role="status"></div>
      <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-r-blue-600 border-b-blue-600  border-gray-200 rounded-full animate-spin animation-delay-200" role="status"></div>
      <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-b-blue-600 border-l-blue-600  border-gray-200 rounded-full animate-spin animation-delay-400" role="status"></div>
      <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-l-blue-600 border-t-blue-600  border-gray-200 rounded-full animate-spin animation-delay-600" role="status"></div>
      <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-t-blue-600 border-r-blue-600  border-gray-200 rounded-full animate-spin animation-delay-800" role="status"></div>
      <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-r-blue-600 border-b-blue-600  border-gray-200 rounded-full animate-spin animation-delay-1000" role="status"></div>
      <div className="md:w-8 md:h-8 w-6 h-6  border-4 border-t-4 border-b-blue-600 border-l-blue-600  border-gray-200 rounded-full animate-spin animation-delay-1200" role="status"></div>
    </div>
  );
}

