import { cn } from "@/lib/classNameMerge";

interface IContainer {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainer) => {
  return (
    <div className={cn("max-w-[1440px] mx-auto px-[120px]", className)}>
      {children}
    </div>
  );
};

export default Container;
