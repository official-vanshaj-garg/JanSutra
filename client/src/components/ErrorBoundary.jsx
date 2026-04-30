import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card" style={{ backgroundColor: '#fee2e2', borderColor: '#fca5a5' }}>
          <h2 style={{ color: '#991b1b', margin: 0 }}>Something went wrong.</h2>
          <p style={{ color: '#991b1b', marginTop: '0.5rem' }}>An unexpected error occurred while rendering this section.</p>
          <button className="btn" onClick={() => window.location.reload()} style={{ marginTop: '1rem', backgroundColor: '#991b1b' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
