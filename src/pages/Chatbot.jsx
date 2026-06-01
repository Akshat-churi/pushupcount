import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Activity } from 'lucide-react';

// A simple mock bot logic
const getBotResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return "Hello there! I'm your AI Fitness Assistant. How can I help you with your health, diet, or workouts today?";
  }
  if (lowerMsg.includes('diet') || lowerMsg.includes('food') || lowerMsg.includes('eat')) {
    return "For a healthy diet, focus on whole foods: lean proteins, plenty of vegetables, complex carbohydrates, and healthy fats. Make sure you're eating in a caloric deficit if you want to lose weight, or a surplus to build muscle. Always stay hydrated!";
  }
  if (lowerMsg.includes('protein')) {
    return "Protein is crucial for muscle recovery. Aim for about 1.6 to 2.2 grams of protein per kilogram of body weight if you're actively training. Good sources include chicken, fish, eggs, tofu, lentils, and Greek yogurt.";
  }
  if (lowerMsg.includes('pushup') || lowerMsg.includes('push-up')) {
    return "Push-ups are fantastic for chest, shoulders, and triceps! Make sure to keep your core tight and your body in a straight line. If standard push-ups are too hard, try knee push-ups or incline push-ups. Check our Fitness Guide section for more details!";
  }
  if (lowerMsg.includes('squat')) {
    return "Squats are the king of lower body exercises. Keep your chest up, push your knees out slightly, and break parallel if your mobility allows it. Want to track your form? Use our AI Squat Tracker from the home page!";
  }
  if (lowerMsg.includes('lose weight') || lowerMsg.includes('fat loss')) {
    return "Weight loss ultimately comes down to a caloric deficit—burning more calories than you consume. Combine a balanced, slightly restricted diet with regular cardiovascular exercise and strength training to preserve muscle mass.";
  }
  if (lowerMsg.includes('muscle') || lowerMsg.includes('build')) {
    return "To build muscle, you need three things: resistance training (progressive overload), adequate protein intake, and sufficient rest/sleep. Aim to train each muscle group 2 times a week.";
  }
  
  return "That's a great question! While I'm just a simulated assistant right now, I highly recommend consulting a certified personal trainer or nutritionist for personalized advice. Is there anything else about workouts or basic nutrition I can help with?";
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! I'm FitBot, your AI fitness and nutrition assistant. Ask me anything about workouts, diet, or training!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate network delay for bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getBotResponse(userMessage.text)
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-6 bg-transparent flex flex-col items-center">
      <div className="w-full max-w-3xl flex-1 flex flex-col premium-glass-card rounded-2xl overflow-hidden">
        
        {/* Chat Header */}
        <div className="border-b border-brand-border/40 p-4 flex items-center gap-3 bg-brand-surface/20">
          <div className="bg-brand-orange/10 p-2 rounded-xl border border-brand-orange/20">
            <Bot className="w-5 h-5 text-brand-orange" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">FitBot Assistant</h2>
            <p className="text-[10px] text-brand-orange font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
              Live & Ready
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                msg.sender === 'user' 
                  ? 'bg-slate-800 border-slate-700 shadow-md' 
                  : 'bg-brand-orange/10 border-brand-orange/20 shadow-[0_0_10px_rgba(255,126,51,0.06)]'
              }`}>
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4 text-slate-300" />
                ) : (
                  <Bot className="w-4 h-4 text-brand-orange" />
                )}
              </div>
              
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none border border-slate-700' 
                  : 'bg-brand-orange text-white rounded-tl-none font-medium'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 flex-row">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-brand-orange/10 border border-brand-orange/20 shadow-[0_0_10px_rgba(255,126,51,0.06)]">
                <Bot className="w-4 h-4 text-brand-orange" />
              </div>
              <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-brand-orange/40 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-brand-orange/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-brand-orange/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-brand-border/40 bg-brand-surface/20">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about health and fitness..."
              className="w-full bg-brand-dark border border-brand-border text-white rounded-xl pl-5 pr-12 py-3 focus:outline-none focus:border-brand-orange/50 focus:ring-2 focus:ring-brand-orange/5 transition-all placeholder:text-slate-600 text-sm shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-brand-orange text-white rounded-lg hover:bg-[#ff8f4d] disabled:opacity-30 disabled:hover:bg-brand-orange transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-center mt-2.5 flex items-center justify-center gap-1.5 text-[9px] text-slate-600 uppercase tracking-widest font-semibold">
            <Activity className="w-3 h-3" />
            <span>FitTrack AI Health Assistant • Beta</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
