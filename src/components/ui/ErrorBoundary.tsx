import React from "react";

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Optionally log error to an error reporting service
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-red-600">
          <h2 className="text-2xl font-bold mb-2">Something went wrong.</h2>
          <p className="mb-4">Please try refreshing the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
} 