import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hi! I\'m PropertyGuard\'s AI assistant. I can help you with questions about property management, compliance, warranties, and EWC protection. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate API call to backend chatbot endpoint
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          user_id: localStorage.getItem('userId') || null,
          context: 'propertyguard_app'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        type: 'bot',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Fallback responses for common questions
      let fallbackResponse = getFallbackResponse(message);
      
      const errorMessage = {
        type: 'bot',
        content: fallbackResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('ewc') || lowerMessage.includes('expropriation')) {
      return 'PropertyGuard helps protect your property rights by maintaining comprehensive documentation that can be crucial for EWC challenges. Our platform stores all ownership documents, compliance certificates, and property improvements in a secure, tamper-proof format that can support legal proceedings.';
    }
    
    if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
      return 'PropertyGuard tracks all your property warranties and guarantees, including expiration dates and maintenance requirements. You can upload warranty documents, set reminders for required maintenance, and ensure your warranties remain valid.';
    }
    
    if (lowerMessage.includes('compliance') || lowerMessage.includes('coc') || lowerMessage.includes('certificate')) {
      return 'Our compliance management system tracks all your Certificates of Compliance (COCs), building regulations, and inspection requirements. We send automated reminders before certificates expire and help you maintain full regulatory compliance.';
    }
    
    if (lowerMessage.includes('insurance') || lowerMessage.includes('policy')) {
      return 'PropertyGuard analyzes your insurance policies to extract specific requirements and ensures you meet all conditions for valid coverage. We track policy renewals, required maintenance, and help identify coverage gaps.';
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('subscription')) {
      return 'PropertyGuard offers flexible pricing: Starter plan at $9/month for individual homeowners, Professional at $29/month for property investors, and Business at $59/month for property managers. All plans include core compliance tracking and document management.';
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return 'I\'m here to help! You can ask me about PropertyGuard features, compliance requirements, EWC protection, warranty tracking, or any property management questions. For technical issues, you can also contact our support team at support@propertyguard.co.za.';
    }
    
    return 'I\'m sorry, I\'m having trouble connecting to our AI service right now. For immediate assistance, please contact our support team at support@propertyguard.co.za or try asking about PropertyGuard features like EWC protection, warranty tracking, or compliance management.';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const quickQuestions = [
    "How does EWC protection work?",
    "What documents should I upload?",
    "How do I track warranties?",
    "What are compliance requirements?",
    "How much does PropertyGuard cost?"
  ];

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center gap-2"
        >
          <MessageCircle size={24} />
          <span className="hidden sm:inline">Need Help?</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold">PropertyGuard Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'bot' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                    {message.type === 'user' && <User size={16} className="mt-1 flex-shrink-0" />}
                    <div className="text-sm">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Questions (show only if no messages yet) */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded border border-blue-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot size={16} />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about PropertyGuard..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              For complex issues, contact <a href="mailto:support@propertyguard.co.za" className="text-blue-600 hover:underline">support@propertyguard.co.za</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;

