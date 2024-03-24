import React, { FC, PropsWithChildren } from "react";
import DefaultErrorMessage from "./defaultErrorMessage";

type Retry = () => void;

type Props = {
  fallback?: React.ReactNode;
  renderFallback?: FC<Retry>;
  withLogs?: boolean;
  onRetry?: () => void;
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

  componentDidCatch(error, errorInfo) {
    // const { withLogs, sendAppError } = this.props;
    // if (withLogs) {
    //   const errorString =
    //     String(error) +
    //     "\nThis error is located at:\n" +
    //     String(errorInfo?.componentStack);
    //   sendAppError(error);
    //   logError(errorString);
    // }
  }

  retry = () => {
    const { onRetry } = this.props;

    onRetry?.();

    this.setState({
      hasError: false,
    });
  };

  render() {
    const { fallback, withLogs, children, renderFallback } = this.props;
    if (this.state.hasError) {
      if (fallback) {
        return fallback;
      } else if (renderFallback) {
        return renderFallback(this.retry);
      } else {
        return <DefaultErrorMessage />;
      }
    }

    return children;
  }
}
export default ErrorBoundary;
