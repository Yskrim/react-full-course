import { useEffect, useRef } from 'react';

export function useAutoScroll(chatMessages){
    const containerRef = useRef(null);
  
    useEffect(()=>{
        const containerElem =containerRef.current;
        if(containerElem){
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);
  
    return containerRef
  }