import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...restProps }) => {
  return (
    <button
      className="mt-6 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-200"
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
