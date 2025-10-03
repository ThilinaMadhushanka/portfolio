import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  componentDidMount() {
    this._onError = (event) => {
      const msg = event?.message || (event?.reason && event.reason.message) || String(event);
      this.setState({ hasError: true, error: new Error(msg) });
      console.error('Global error captured by ErrorBoundary:', event);
    };

    this._onRejection = (event) => {
      const reason = event?.reason || event;
      const msg = reason?.message || String(reason);
      this.setState({ hasError: true, error: new Error(msg) });
      console.error('Unhandled promise rejection captured by ErrorBoundary:', reason);
    };

    this._origConsoleError = console.error;
    console.error = (...args) => {
      try {
        const first = args[0];
        const message = first instanceof Error ? first.message : String(first);
        this.setState({ hasError: true, error: first instanceof Error ? first : new Error(message) });
      } catch (e) {
      }
      this._origConsoleError.apply(console, args);
    };

    window.addEventListener('error', this._onError);
    window.addEventListener('unhandledrejection', this._onRejection);
  }

  componentWillUnmount() {
    if (this._origConsoleError) console.error = this._origConsoleError;
    window.removeEventListener('error', this._onError);
    window.removeEventListener('unhandledrejection', this._onRejection);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: 20,
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          borderRadius: 8,
        }}>
          <div>
            <h3 style={{ margin: 0, color: '#ff7676' }}>3D preview failed to load</h3>
            <p style={{ marginTop: 8, color: '#ddd' }}>{this.state.error?.message || 'An unexpected error occurred while rendering the 3D scene.'}</p>
            <p style={{ marginTop: 8, color: '#bbb', fontSize: 12 }}>Open the browser console for full stack trace.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
