const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 md:p-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="h-60 sm:h-72 md:h-80 relative w-full bg-white border border-gray-300 rounded-lg animate-pulse"
        >
          <div className="p-4 sm:p-6 md:p-10 h-full flex flex-col">
            <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
