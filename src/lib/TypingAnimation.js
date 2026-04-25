'use client'

import React from "react";
 
const TypingAnimation = ({ text }) => {
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