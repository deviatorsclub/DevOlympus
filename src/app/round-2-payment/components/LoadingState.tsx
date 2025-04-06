export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-white">
      <div className="w-12 h-12 border-4 border-t-purple-500 border-b-purple-700 border-l-purple-500 border-r-purple-700 rounded-full animate-spin mb-4"></div>
      <p className="text-lg">Loading payment status...</p>
    </div>
  );
}
