const Loader = ({
  text = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

      <p className="mt-5 text-slate-500 font-medium">
        {text}
      </p>
    </div>
  );
};

export default Loader;