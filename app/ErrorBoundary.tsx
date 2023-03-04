"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Bad_Data_Msg } from "./Bad_Data_Msg";

interface Props {
  children?: ReactNode;
}

type State =
  | {
      hasError: false;
    }
  | {
      hasError: true;
      error_msg: string;
    };

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(e: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error_msg: e.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Bad_Data_Msg>{this.state.error_msg}</Bad_Data_Msg>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
