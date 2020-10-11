import { IconButton } from '@material-ui/core';
import { MicNone } from '@material-ui/icons';
import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectChatName,selectChatId} from './features/chatSlice'
import {selectUser} from './features/userSlice'
import FlipMove from 'react-flip-move';
import db from './firebase'
import './Chat.css'
import Message from './Message'
import firebase from 'firebase'
import userEvent from '@testing-library/user-event';
function Chat() {
    const user=useSelector(selectUser);
    const [input,setInput]=useState("");
    const chatName = useSelector(selectChatName);
    const [messages,setMessages]=useState([]);
    const chatId=useSelector(selectChatId)
    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection("chats").doc(chatId).collection("messages").add(
            {
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                message:input,
                uid:user.uid,
                photo:user.photo,
                email:user.email,
                displayName:user.displayName

            }
        )
        setInput("");
    }
    useEffect(() => {
        if(chatId){
            db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
                setMessages(
                    snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data(),
                }))
            )
            )
         
        }
    
    }, [chatId])
    console.log(messages);
    return (
        <div className="chat"> 
        <div className="chat_header">
            <h4>To:<span className="chat_name">{chatName}</span></h4>
            <strong>Details</strong>
        </div>
        <div className="chat_messages">

            {messages.map(message=>(
                <FlipMove>
                <Message key={message.id} contents={message.data}/>
                </FlipMove>
            ))}
          
     
        </div>
        <div className="chat_input">
             <form>
                 <input value={input} 
                 onChange={(e)=>setInput(e.target.value)}
                 type="text"></input>
                 <button onClick={sendMessage}>Send Message</button>
             </form>
             <IconButton>
             <MicNone className="chat_mic"/>
            </IconButton>
        </div>
            
        </div>
    )
}

export default Chat
