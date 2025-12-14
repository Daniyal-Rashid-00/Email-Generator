import { useState } from 'react';
import { Send, Copy, Check, Mail, Sparkles, MessageSquare, User } from 'lucide-react';

const GEMINI_API_KEY = 'AIzaSyD7aezdpE-DAmGxVd_dC5w9NZXDRL62_II';
const GEMINI_MODEL = 'gemini-2.5-flash';

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

  const generateEmail = async () => {
    if (!rawThoughts.trim()) return;

    setIsLoading(true);
    setGeneratedEmail('');
    
    try {
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

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const emailText = data.candidates[0].content.parts[0].text;
        setGeneratedEmail(emailText.trim());
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error generating email:', error);
      setGeneratedEmail('Sorry, there was an error generating your email. Please try again.');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-slate-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-4">
              Email Writing Assistant
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Transform your thoughts into polished, professional emails with AI assistance
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Vertical Layout */}
      <div className="relative max-w-4xl mx-auto px-6 pb-12 z-10">
        <div className="space-y-6">
          
          {/* Your Thoughts Section */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-md">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">Your Thoughts</h2>
            </div>
            
            <textarea
              value={rawThoughts}
              onChange={(e) => setRawThoughts(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Write what you want to communicate... Don't worry about grammar or structure - just get your ideas down."
              className="w-full h-40 p-4 border-2 border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-700 placeholder-slate-400 font-medium"
            />
            
            <div className="mt-4 text-sm text-slate-500 flex items-center gap-2">
              <span className="text-blue-600">💡</span>
              <span>Tip: Press Cmd/Ctrl + Enter to generate your email</span>
            </div>
          </div>

          {/* Tone Selection */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-slate-100 rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">Email Tone</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {tones.map((toneOption) => (
                <button
                  key={toneOption.value}
                  onClick={() => setTone(toneOption.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left transform hover:scale-[1.02] ${
                    tone === toneOption.value
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-[1.02]'
                      : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white/90 hover:shadow-md'
                  }`}
                >
                  <div className="font-semibold text-slate-800">{toneOption.label}</div>
                  <div className="text-sm text-slate-600 mt-1">{toneOption.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Context Email Section */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-slate-600" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Context (Optional)</h2>
              </div>
              <button
                onClick={() => setShowContext(!showContext)}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                {showContext ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showContext && (
              <>
                <p className="text-slate-600 mb-4 font-medium">
                  Paste the email you're responding to for better context
                </p>
                <textarea
                  value={contextEmail}
                  onChange={(e) => setContextEmail(e.target.value)}
                  placeholder="Paste the original email here..."
                  className="w-full h-32 p-4 border-2 border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm text-slate-700 placeholder-slate-400 font-medium"
                />
              </>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={generateEmail}
            disabled={isLoading || !rawThoughts.trim()}
            className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-5 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
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
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 min-h-96 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center shadow-md">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Generated Email</h2>
              </div>
              
              {generatedEmail && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 rounded-lg transition-all duration-200 text-slate-700 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
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
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-600 font-medium">Crafting your perfect email...</p>
              </div>
            ) : generatedEmail ? (
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border-2 border-slate-200 shadow-inner">
                <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-[15px] font-medium">
                  {generatedEmail}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                  <Mail className="w-10 h-10 opacity-50" />
                </div>
                <p className="text-lg font-semibold text-slate-500">Your polished email will appear here</p>
                <p className="text-sm mt-2 text-slate-400">Enter your thoughts and select a tone to get started</p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 rounded-3xl p-6 border-2 border-blue-100 shadow-xl">
            <h3 className="font-bold text-slate-800 mb-4 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Pro Tips
            </h3>
            <ul className="text-sm text-slate-600 space-y-2.5 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Be specific about what you want to achieve</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Include key details even if roughly written</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Try different tones to see what works best</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Add context for more personalized responses</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
