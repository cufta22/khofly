import { nprogress } from "@mantine/nprogress";
import { type IFC } from "@ts/global.types";

import React from "react";
import { Link, useLocation, type LinkProps } from "react-router";

interface Props extends LinkProps, IFC {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  target?: React.HTMLAttributeAnchorTarget;
}

const InternalLink: React.FC<Props> = ({ children, ...linkProps }) => {
  const { pathname } = useLocation();

  // Handle NProgress
  const handleClick = () => {
    if (pathname !== linkProps.to) {
      nprogress.start();
    }
  };

  return (
    <Link {...linkProps} onClick={handleClick} target={linkProps?.target || "_self"}>
      {children}
    </Link>
  );
};

export default InternalLink;
