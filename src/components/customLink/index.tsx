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
      <li className="nav-text_row">
        <div
          className={
            match ? "navbar-link-block text-active" : "navbar-link-block"
          }
        >
          {children}
        </div>
      </li>
    </Link>
  );
};

export { CustomLink };
