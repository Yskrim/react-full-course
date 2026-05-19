import { useAutoScroll } from '../hooks/useAutoScroll'
import { ChatMessage } from './ChatMessage'
import './ChatMessages.css'

export function ChatMessages({ chatMessages }){
    const chatMessagesRef = useAutoScroll(chatMessages)
    return(
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((obj)=>{
                return(
                    <ChatMessage 
                        key={obj.id} 
                        message={obj.message} 
                        sender={obj.sender}
                    />
                )
            })}
        </div>
    ) 
  }