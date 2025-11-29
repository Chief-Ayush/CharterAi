import React from "react";

class ChessboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chessboard Error:", error, errorInfo);
    this.state = { hasError: true, error, errorInfo };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <h2>⚠️ Something went wrong</h2>
            <p>The Financial Chessboard encountered an error.</p>
            <details style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>
              <summary>Error Details (click to expand)</summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "20px",
                padding: "12px 24px",
                borderRadius: "12px",
                background: "var(--primary)",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChessboardErrorBoundary;
