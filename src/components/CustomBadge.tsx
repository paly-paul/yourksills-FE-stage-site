import { ReactNode } from "react";

type CustomBadgeProps = {
  children: ReactNode;
};

const CustomBadge = ({ children }: CustomBadgeProps) => {
  return <div className='badge'>{children}</div>;
};

export default CustomBadge;
