import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            padding: "20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>⚠️</h1>
          <h2 style={{ marginBottom: "10px" }}>Something went wrong</h2>
          <p style={{ marginBottom: "20px", opacity: 0.8 }}>
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              background: "white",
              color: "#667eea",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Reload Page
          </button>
          {process.env.NODE_ENV === "development" && this.state.errorInfo && (
            <details
              style={{
                marginTop: "20px",
                textAlign: "left",
                maxWidth: "600px",
              }}
            >
              <summary style={{ cursor: "pointer", marginBottom: "10px" }}>
                Error Details
              </summary>
              <pre
                style={{
                  background: "rgba(0,0,0,0.2)",
                  padding: "15px",
                  borderRadius: "8px",
                  overflow: "auto",
                  fontSize: "12px",
                }}
              >
                {this.state.error?.toString()}
                {"\n\n"}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
