import React, { PropsWithChildren } from "react";
import DefaultErrorMessage from "./defaultErrorMessage";

type Props = {
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<PropsWithChildren<Props>, State> {
  constructor(props: PropsWithChildren<Props>) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    const { fallback, children } = this.props;
    if (this.state.hasError) {
      if (fallback) {
        return fallback;
      } else {
        return <DefaultErrorMessage />;
      }
    }

    return children;
  }
}
export default ErrorBoundary;
