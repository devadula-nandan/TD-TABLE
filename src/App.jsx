import React from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Welcome to TD-Table App!</h1>
        <p className="text-lg text-secondary">
          This is the main app. To explore the components, start Storybook.
        </p>
        <div className="space-x-4">
          <a
            href="http://localhost:6006"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Storybook
          </a>
          <a
            href="https://github.com/your-repo"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
