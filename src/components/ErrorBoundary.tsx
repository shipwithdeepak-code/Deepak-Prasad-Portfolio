import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught render error:", error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#FAFDFB] text-[#042718] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#042718]/10 shadow-[0_16px_40px_rgba(4,39,24,0.06)] p-8 sm:p-10 flex flex-col items-center">
            {/* Soft accent status dot */}
            <div className="w-12 h-12 rounded-full bg-[#188E39]/10 text-[#188E39] flex items-center justify-center mb-5 font-mono font-bold text-lg">
              !
            </div>

            <h1 className="font-onest font-bold text-xl sm:text-2xl text-[#042718] tracking-tight mb-2">
              Something went wrong loading this page.
            </h1>

            <p className="font-inter text-sm text-[#042718]/70 leading-relaxed mb-6">
              An unexpected display issue occurred. Refreshing the page usually restores standard operation.
            </p>

            <button
              type="button"
              onClick={this.handleRefresh}
              className="font-inter font-semibold text-sm px-6 py-3 rounded-full bg-[#188E39] hover:bg-[#13732e] text-white transition-[background-color,box-shadow] shadow-sm hover:shadow cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
