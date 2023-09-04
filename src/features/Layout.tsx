import { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex bg-slate-100 justify-center items-center h-screen">
      {props.children}
    </div>
  );
};

export default Layout;
