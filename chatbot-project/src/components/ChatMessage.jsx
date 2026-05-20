import RobotImage from '../assets/robot.png';
import UserImage from '../assets/custom-pic.jpeg';
import dayjs from "dayjs"
import './ChatMessage.css'

export function ChatMessage({ message, sender, time }){
    return (
        <div 
            className={sender === 'user' 
                ? 'chat-message-user' 
                : 'chat-message-robot'}
        >
  
            {sender === "robot" && <img src={RobotImage} className="profile-img"/>}
            <div className="chat-message-text">
                {message}
                {time && <p className='message-meta'>{time}</p>}
            </div>
            {sender === "user" && <img src={UserImage} className="profile-img"/>}
        </div>
    )
  }