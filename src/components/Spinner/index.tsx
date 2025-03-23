import { FC } from 'react';

const Spinner: FC = () => {
  return (
    <div aria-label="Loading" className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-transparent border-t-red-500 border-r-pink-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-gray-700 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default Spinner;
