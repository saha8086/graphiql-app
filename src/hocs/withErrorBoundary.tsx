import React from 'react';

import { Fallback as DefaultFallback } from '@components/Fallback/Fallback';

export const withErrorBoundary = <Props extends object>(
  Component: React.FC<Props>,
  Fallback = DefaultFallback
) =>
  class ErrorBoundary extends React.Component<Props, { error?: Error }> {
    static getDerivedStateFromError(error: Error) {
      return { error };
    }

    render() {
      return this.state.error ? (
        <Fallback error={this.state.error} />
      ) : (
        <Component {...this.props} />
      );
    }
  };
