import { FC, ReactNode } from 'react';

interface AppBodyProps {
  children?: ReactNode;
}

const AppBody: FC<AppBodyProps> = ({ children }) => {
  return (
    <div aria-label="App Body" className="flex-1 flex flex-col">
      {children}
    </div>
  );
};

export default AppBody;
