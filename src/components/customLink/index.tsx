import React from "react";
import { Link, useMatch } from "react-router-dom";

import "./styles.css";

type Props = {
  to: string;
  children: React.ReactNode;
};

const CustomLink = ({ children, to, ...props }: Props) => {
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });

  return (
    <Link to={to} {...props}>
      <li className="header-leftcontent__link">
        <div className={match && "active-text"}>{children}</div>
      </li>
    </Link>
  );
};

export { CustomLink };
