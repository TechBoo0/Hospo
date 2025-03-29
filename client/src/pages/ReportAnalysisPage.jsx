import React from 'react';
import ReportUpload from '../components/ReportUpload';
import "../styles/reportUpload.css"

const ReportAnalysisPage = () => {
  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Report Analysis Tool</h1>
        <p>Upload your report, select a language, and get AI-powered insights using OpenAI GPT-4</p>
      </div>
      
      <div className="main-content">
        <ReportUpload />
      </div>
    </div>
  );
};

export default ReportAnalysisPage;
