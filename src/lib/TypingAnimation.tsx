'use client'

import React, { FC } from "react";
 
interface TypingAnimationProps {
  text: string;
}

const TypingAnimation: FC<TypingAnimationProps> = ({ text }) => {
    const [displayText, setDisplayText] = React.useState("");

    React.useEffect(() =>{
        let index = 0;
        const typingInterval = setInterval(() => {
            setDisplayText(text.substring(0, index))
            index++;

            if (index > text.length) {
                clearInterval(typingInterval)
            }
        }, 47);
        
        return () => clearInterval(typingInterval)

    }, [text])

    return <>{displayText}</>
}

export default TypingAnimation