import { useState, useEffect, useRef } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }){
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
  
    async function sendMessage(){
        const newChatMessages = [
            ...chatMessages, 
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID(),
                time: dayjs().format('h:mma'),
            },
            {
                message: <img src={LoadingSpinner} className="loading-spinner"/>,
                sender: 'robot',
                isLoading: true,
                id: crypto.randomUUID()
            }
        ]
        setChatMessages(newChatMessages)
        setIsLoading(true)
  
        const response = await Chatbot.getResponseAsync(inputText);
        setIsLoading(false);
        newChatMessages.splice(-1,1);
        setChatMessages([
            ...newChatMessages, 
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
                time: dayjs().format('h:mma'),
            }
        ])
        setInputText('')
    }
  
    useEffect(()=>{
        if(!isLoading && inputRef.current){
            inputRef.current.focus()
        }
    },[isLoading])
  
    return (
        <div className="chat-input-container">
            <input 
                ref={inputRef}
                className="chat-input"
                placeholder="Send a message to Chatbot" 
                disabled={isLoading}
                onChange={(e)=>{
                    setInputText(e.target.value)
                }}
                onKeyDown={(e)=>{
                    e.key==='Enter'&&sendMessage()
                    e.key==='Escape'&&setInputText('')
                }}
                value={inputText}
            />   
            <button
                onClick={sendMessage}
                className="send-button"
            >Send</button>
        </div>
    )
}
  
