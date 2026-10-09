import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useVoiceInteraction } from '../../../hooks/useVoiceInteraction';

const AITutorChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi Alex! I noticed you're struggling a bit with Thermodynamics. Would you like to go over the Second Law?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Voice interaction hook
  const {
    isListening,
    isSpeaking,
    isSupported,
    transcript,
    error: voiceError,
    autoSpeak,
    setAutoSpeak,
    toggleListening,
    speak,
    stopSpeaking,
  } = useVoiceInteraction();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle voice transcript - auto-send when recognized
  useEffect(() => {
    if (transcript && !isListening) {
      setInput(transcript);
      // Auto-submit the voice transcript
      setTimeout(() => {
        const userMessage = { id: Date.now(), text: transcript, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
          const aiMessage = {
            id: Date.now() + 1,
            text: "That's a great question! The Second Law of Thermodynamics states that the total entropy of an isolated system can never decrease over time. Think of it like a messy room - it naturally gets messier unless you put energy into cleaning it!",
            sender: 'ai'
          };
          setMessages(prev => [...prev, aiMessage]);
          setIsTyping(false);

          // Speak the AI response if auto-speak is enabled
          if (autoSpeak) {
            speak(aiMessage.text);
          }
        }, 2000);
      }, 100);
    }
  }, [transcript, isListening, autoSpeak, speak]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: "That's a great question! The Second Law of Thermodynamics states that the total entropy of an isolated system can never decrease over time. Think of it like a messy room - it naturally gets messier unless you put energy into cleaning it!",
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Speak the AI response if auto-speak is enabled
      if (autoSpeak) {
        speak(aiMessage.text);
      }
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[500px]">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-primary-50 to-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shadow-sm">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">AI Tutor</h3>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-slate-500">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Auto-speak toggle */}
          <button
            onClick={() => {
              setAutoSpeak(!autoSpeak);
              if (!autoSpeak && isSpeaking) stopSpeaking();
            }}
            className={`p-2 rounded-lg transition-colors ${autoSpeak
                ? 'text-primary-600 hover:bg-primary-50'
                : 'text-slate-400 hover:bg-slate-50'
              }`}
            title={autoSpeak ? 'Auto-speak enabled' : 'Auto-speak disabled'}
          >
            {autoSpeak ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
            <Sparkles size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-slate-100 text-slate-600' : 'bg-primary-100 text-primary-600'
                  }`}>
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user'
                  ? 'bg-primary-600 text-white rounded-br-none'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <Bot size={14} />
              </div>
              <div className="bg-slate-100 p-3 rounded-2xl rounded-bl-none">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice status indicator */}
      {(isListening || isSpeaking) && (
        <div className="px-4 py-2 bg-gradient-to-r from-primary-50 to-transparent border-t border-slate-100">
          <div className="flex items-center space-x-2">
            {isListening && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 bg-red-500 rounded-full"
                />
                <span className="text-sm text-slate-600 font-medium">Listening...</span>
              </>
            )}
            {isSpeaking && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                />
                <span className="text-sm text-slate-600 font-medium">Speaking...</span>
              </>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="p-4 border-t border-slate-100">
        {voiceError && isSupported && (
          <div className="mb-2 text-xs text-red-500">
            Voice error: {voiceError}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Ask a question or use voice..."}
            className="flex-1 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            disabled={isListening}
          />

          {/* Microphone button */}
          {isSupported && (
            <motion.button
              type="button"
              onClick={toggleListening}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl transition-all duration-200 ${isListening
                  ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </motion.button>
          )}

          <button
            type="submit"
            disabled={!input.trim() || isListening}
            className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AITutorChat;
