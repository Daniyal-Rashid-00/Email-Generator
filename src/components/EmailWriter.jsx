import { useState, useEffect } from 'react';
import { Send, Copy, Check, Mail, Sparkles, MessageSquare, User, Moon, Sun } from 'lucide-react';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
const OPENROUTER_MODEL = 'tngtech/deepseek-r1t2-chimera:free'; // Using free DeepSeek model via OpenRouter

const tones = [
  { value: 'professional', label: 'Professional', description: 'Clear and business-appropriate' },
  { value: 'warm', label: 'Warm', description: 'Friendly and approachable' },
  { value: 'concise', label: 'Concise', description: 'Brief and to the point' },
  { value: 'formal', label: 'Formal', description: 'Traditional and respectful' },
  { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
  { value: 'persuasive', label: 'Persuasive', description: 'Compelling and convincing' }
];

export default function EmailWriter() {
  const [rawThoughts, setRawThoughts] = useState('');
  const [tone, setTone] = useState('professional');
  const [contextEmail, setContextEmail] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage and update DOM
  useEffect(() => {
    // Check localStorage safely
    try {
      const saved = localStorage.getItem('darkMode');
      if (saved) {
        const isDark = JSON.parse(saved);
        setDarkMode(isDark);
        if (isDark) {
          document.documentElement.classList.add('dark');
        }
      }
    } catch (error) {
      console.error('Error reading dark mode preference:', error);
    }
  }, []);

  // Update dark mode class on body when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const generateEmail = async () => {
    if (!rawThoughts.trim()) return;

    setIsLoading(true);
    setGeneratedEmail('');
    
    try {
      // Check if API key is available
      if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_api_key_here') {
        throw new Error('API key not configured. Please set VITE_OPENROUTER_API_KEY environment variable.');
      }

      const contextPart = contextEmail.trim() 
        ? `\n\nContext - I am responding to this email:\n"${contextEmail}"\n\n`
        : '';

      const prompt = `You are an expert email writer. Transform the following raw thoughts into a well-crafted email with a ${tone} tone.

Raw thoughts: "${rawThoughts}"${contextPart}

Instructions:
- Write a complete, professional email body
- Use a ${tone} tone throughout
- Make it clear, engaging, and well-structured
- Ensure proper email etiquette
- Do not include a subject line
- Respond with ONLY the email body content. Do not include any explanations or additional text outside of the email.`;

      const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
      
      console.log('Making API request to OpenRouter');
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin, // Optional: for analytics
          'X-Title': 'Email Writer App' // Optional: for analytics
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('API Error Response:', responseData);
        
        // Provide more specific error messages
        if (response.status === 401) {
          throw new Error('401 Unauthorized: API key is invalid. Please check your OpenRouter API key.');
        } else if (response.status === 403) {
          throw new Error('403 Forbidden: API key may be restricted or invalid. Please check your OpenRouter API key.');
        } else if (response.status === 400) {
          throw new Error(`400 Bad Request: ${responseData.error?.message || 'Invalid request format'}`);
        } else if (response.status === 429) {
          throw new Error('429 Rate Limit: Too many requests. Free tier limit reached. Please try again later.');
        } else {
          throw new Error(`API error ${response.status}: ${responseData.error?.message || 'Unknown error'}`);
        }
      }

      if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
        const emailText = responseData.choices[0].message.content;
        setGeneratedEmail(emailText.trim());
      } else {
        console.error('Unexpected response format:', responseData);
        throw new Error('Unexpected response format from API');
      }
    } catch (error) {
      console.error('Error generating email:', error);
      const errorMessage = error.message || 'Unknown error';
      setGeneratedEmail(`Sorry, there was an error generating your email:\n\n${errorMessage}\n\nPlease check the browser console for more details.`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      generateEmail();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-300/20 dark:bg-slate-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className="w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-white/50 dark:border-slate-700/50 flex items-center justify-center hover:scale-110 transition-all duration-200"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-slate-600/5 dark:from-blue-600/10 dark:to-slate-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 sm:mb-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800 dark:from-slate-200 dark:via-blue-400 dark:to-slate-200 bg-clip-text text-transparent mb-3 sm:mb-4 px-4">
              Email Writing Assistant
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium px-4">
              Transform your thoughts into polished, professional emails with AI assistance
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Vertical Layout */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pb-12 z-10">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Your Thoughts Section */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-xl flex items-center justify-center shadow-md">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200">Your Thoughts</h2>
            </div>
            
            <textarea
              value={rawThoughts}
              onChange={(e) => setRawThoughts(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Write what you want to communicate... Don't worry about grammar or structure - just get your ideas down."
              className="w-full h-32 sm:h-40 p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
            />
            
            <div className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span>
              <span>Tip: Press Cmd/Ctrl + Enter to generate your email</span>
            </div>
          </div>

          {/* Tone Selection */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-900/50 dark:to-slate-700/50 rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200">Email Tone</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tones.map((toneOption) => (
                <button
                  key={toneOption.value}
                  onClick={() => setTone(toneOption.value)}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left transform hover:scale-[1.02] ${
                    tone === toneOption.value
                      ? 'border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 shadow-lg scale-[1.02]'
                      : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-700/70 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white/90 dark:hover:bg-slate-700/90 hover:shadow-md'
                  }`}
                >
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{toneOption.label}</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">{toneOption.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Context Email Section */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200">Context (Optional)</h2>
              </div>
              <button
                onClick={() => setShowContext(!showContext)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-sm sm:text-base"
              >
                {showContext ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showContext && (
              <>
                <p className="text-slate-600 dark:text-slate-300 mb-4 font-medium text-sm sm:text-base">
                  Paste the email you're responding to for better context
                </p>
                <textarea
                  value={contextEmail}
                  onChange={(e) => setContextEmail(e.target.value)}
                  placeholder="Paste the original email here..."
                  className="w-full h-32 p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
                />
              </>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={generateEmail}
            disabled={isLoading || !rawThoughts.trim()}
            className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:from-blue-500 dark:via-blue-600 dark:to-blue-500 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 dark:from-blue-600 dark:to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                <span className="relative z-10">Crafting your email...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Generate Email</span>
              </>
            )}
          </button>

          {/* Generated Email Section */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 min-h-96 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-800/50 rounded-xl flex items-center justify-center shadow-md">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200">Generated Email</h2>
              </div>
              
              {generatedEmail && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 rounded-lg transition-all duration-200 text-slate-700 dark:text-slate-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">Crafting your perfect email...</p>
              </div>
            ) : generatedEmail ? (
              <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-4 sm:p-6 border-2 border-slate-200 dark:border-slate-600 shadow-inner">
                <pre className="whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-[15px] font-medium">
                  {generatedEmail}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                  <Mail className="w-8 h-8 sm:w-10 sm:h-10 opacity-50" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-slate-500 dark:text-slate-400">Your polished email will appear here</p>
                <p className="text-xs sm:text-sm mt-2 text-slate-400 dark:text-slate-500">Enter your thoughts and select a tone to get started</p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 dark:from-blue-900/20 dark:via-slate-800/50 dark:to-blue-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-blue-100 dark:border-blue-800/50 shadow-xl">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              Pro Tips
            </h3>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 sm:space-y-2.5 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>Be specific about what you want to achieve</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>Include key details even if roughly written</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>Try different tones to see what works best</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>Add context for more personalized responses</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 sm:py-8 border-t border-slate-200/50 dark:border-slate-700/50 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            Made by <span className="text-blue-600 dark:text-blue-400 font-semibold">Daniyal</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
