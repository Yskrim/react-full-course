import RobotImage from '../assets/robot.png';
import UserImage from '../assets/user.png';
import './ChatMessage.css'

export function ChatMessage({ message, sender }){
    return (
        <div 
            className={sender === 'user' 
                ? 'chat-message-user' 
                : 'chat-message-robot'}
        >
  
            {sender === "robot" && <img src={RobotImage} className="profile-img"/>}
            <div className="chat-message-text">{message}</div>
            {sender === "user" && <img src={UserImage} className="profile-img"/>}
        </div>
    )
  }