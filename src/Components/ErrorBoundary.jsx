import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In production you'd send this to an error-tracking service
    // (Sentry, LogRocket, etc.) instead of just logging it.
    console.error("Uncaught error:", error, info);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#161b22] px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-[#e6edf3] mb-3">
              Something went wrong
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Please try refreshing the page. If the problem continues, come back later.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
