import { FC, ReactNode } from 'react';

interface AppBodyProps {
  children: ReactNode;
}

const AppBody: FC<AppBodyProps> = ({ children }) => {
  return (
    <div className="flex-1 flex flex-col container mx-auto p-4">{children}</div>
  );
};

export default AppBody;
