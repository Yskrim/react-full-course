import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
import { getWeather } from './scripts/getWeather';
import './App.css';

function App(){
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) ?? [])
  
  useEffect(()=>{
    const [lat, lon] = [ -27.4698, 153.0251 ]
    Chatbot.addResponses({
      "hi" : "Hi! Glad to see you again!",
      "Weather" : async () =>{ return await getWeather(lat,lon)}
    })
  }, [])

  useEffect(()=>{
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  return (
      <div className="app-container">
          {chatMessages.length===0
              ? <p className="intro-text">Welcome to the chatbot project! Send a message using the textbox below.</p>
              : <ChatMessages chatMessages={chatMessages}/>}
          <ChatInput 
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
          />
      </div>
  )
}

export default App
