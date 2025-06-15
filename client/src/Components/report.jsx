import React, { useState } from 'react';
import OpenAI from 'openai';
import './report.css';

const Report = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('English');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('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');
  const [model, setModel] = useState('gpt-3.5-turbo');

  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 
    'Chinese', 'Japanese', 'Russian', 'Arabic'
  ];

  const modelOptions = [
    'gpt-3.5-turbo',
    'gpt-4',
    'gpt-4-turbo'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter your OpenAI API key');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: Exposing API keys in browser is not recommended for production
      });
      
      const fullPrompt = language !== 'English' 
        ? `Respond in ${language}. ${prompt}`
        : prompt;
      
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: fullPrompt }
        ],
        max_tokens: 1000
      });
      
      setResponse(completion.choices[0].message.content);
    } catch (err) {
      setError(`Error: ${err.message || 'Failed to communicate with OpenAI'}`);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <h2>OpenAI Assistant</h2>
      <p>Enter your prompt, select a language and provide your API key to get an AI-generated response</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="apiKey">OpenAI API Key:</label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
            required
          />
          <small className="api-key-warning">Warning: Entering your API key in the browser is not secure for production use.</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="model">Select Model:</label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            {modelOptions.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="prompt">Your Prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            rows={6}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Select Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languageOptions.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !prompt}
        >
          {loading ? 'Processing...' : 'Get AI Response'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {response && (
        <div className="response-container">
          <h3>AI Response:</h3>
          <div className="response-content">{response}</div>
        </div>
      )}
    </div>
  );
};

export default Report;
