'use client'

import React from "react";
import TypingAnimation from "@/lib/TypingAnimation";
import Image from "next/image";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const Page = () => {
    const [input, setInput] = React.useState("");
    const [message, saveSetMessage] = React.useState([]);
    const [isOutput, setIsOutput] = React.useState(false);
    const chatRef = React.useRef(null);

    React.useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [message])

    const handleButton = async () => {
        if (input.trim() === "") {
            return;
        }

        const response = await fetch('/api/data', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        const newMessage = { user: "SAYA", content: input }
        const outputMessage = { ai: "MIKO AI", reply: data.data }
        saveSetMessage([...message, newMessage, outputMessage])
        setInput("");
        setIsOutput(true);
    }

    const handlePress = async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            await handleButton();
        }
    }

    return (
        <>
            {/* Pesan pengguna & Balasan dari MIKO AI*/}
            <div ref={chatRef} className="flex flex-col flex-grow overflow-y-auto mb-4 p-4" style={{ scrollBehavior: 'smooth' }}>
            <div className="flex justify-center">
                <Image src="/miko.jpg" alt="" width={100} height={100} priority={true} className="rounded-full border-2 border-sky-500 mb-2"/>
            </div>
            <h2 className="text-xl font-bold text-center mb-4 text-white">How can I help you today?</h2>

                {message.map((messages, index) => (
                    <div key={index} className={messages.user === "SAYA" ? "self-end mb-4" : "self-start"} style={{ maxWidth: "75%", wordWrap: "break-word", overflowWrap: "break-word" }}>
                        <div className={messages.user === "SAYA" ? "bg-gray-300 text-black rounded-lg shadow-md px-4 py-2 flex-grow" : 
                            "bg-blue-600 text-white rounded-lg shadow-md px-4 py-2 flex-grow mb-4"}>
                            <h3 className="font-bold">
                            {messages.ai === "MIKO AI" ? messages.ai : messages.user}
                            </h3>
                            {messages.ai === "MIKO AI" && isOutput ? <TypingAnimation text={messages.reply} className="break-words text-justify"/> : 
                            <p className="text-left">{messages.content}</p> }
                        </div>
                    </div>
                ))}
            </div>

            {/* Input dan tombol kirim */}
            <div className="bg-zinc-700 rounded shadow p-4">
                <div className="flex w-full flex-nowrap sm:flex-row items-center">
                    <Input
                        color="default"
                        type="text"
                        size="md"
                        radius="none"
                        className="focus-within:border-2 focus-within:border-blue-400 focus-within:rounded" 
                        placeholder="Ketik pesan"
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handlePress}/>

                    <Button 
                        onClick={handleButton} // onClick di next ui 2.8.0 ada bug
                        color="primary" 
                        size="sm"
                        className="px-4 py-2  text-white font-semibold rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 ml-2">
                        <SendOutlinedIcon/>
                    </Button> 
                </div>
            </div>
        </>           
    )
}

export default Page