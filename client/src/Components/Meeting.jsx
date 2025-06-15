import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useParams, useNavigate } from 'react-router';
import io from 'socket.io-client';  
import axios from "axios"

const socket = io("https://hospo.onrender.com");

function Meeting() {
    const [stream, setStream] = useState();
    const [peerId, setPeerId] = useState('');
    const { userid } = useParams();
    const peerInstance = useRef(null);
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [audio, setAudio] = useState(true);
    const [video, setVideo] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const nav = useNavigate();
    const name = userid;
    
    // Hide controls after inactivity
    useEffect(() => {
        let timeout;
        const handleActivity = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => setShowControls(false), 3000);
        };
        
        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('click', handleActivity);
        
        // Initial timeout
        timeout = setTimeout(() => setShowControls(false), 3000);
        
        return () => {
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('click', handleActivity);
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        socket.emit("join", name);
    
        navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                localVideoRef.current.muted = true;
                setStream(stream);
    
                const peer = new Peer(name);
                peer.on('open', (id) => {
                    console.log(id);
                    setPeerId(id);    
                });
    
                peer.on('call', (call) => {
                    call.answer(stream);
                    call.on('stream', (remote) => {
                        remoteVideoRef.current.srcObject = remote;
                        setIsConnected(true);
                        setIsConnecting(false);
                        console.log("Received remote stream, stopping call attempts.");
                    });
                });
    
                peerInstance.current = peer;
            })
            .catch((error) => {
                console.error('Failed to get local stream', error);
            });
    }, [audio, video]);
    

    function call(name) {
        setIsConnecting(true);
        const call = peerInstance.current.call(name, stream);
        call.on("stream", (remote) => {
            remoteVideoRef.current.srcObject = remote;
            setIsConnected(true);
            setIsConnecting(false);
        });
        
        // Timeout if call doesn't connect within 10 seconds
        setTimeout(() => {
            if (!isConnected) {
                setIsConnecting(false);
            }
        }, 10000);
    }
    
    function checkRoom() {
        console.log("hi")
        socket.emit("check", name);
        socket.on("conform", (response) => {
            if (response === "yes") {
                console.log("user is in the room");
            } else {
                console.log("No other users in the room");
            }
        });
    }

    function toggleAudio() {
        setAudio(!audio);
        if (stream) {
            stream.getAudioTracks()[0].enabled = !audio;
        }
    }

    function toggleVideo() {
        setVideo(!video);
        if (stream) {
            stream.getVideoTracks()[0].enabled = !video;
        }
    }

    function endCall() {
        if (peerInstance.current) {
            peerInstance.current.destroy();  
        }
        
        if (stream) {
            stream.getVideoTracks()[0].enabled = false;
        }

        if(localStorage.getItem("delivery")){
            axios.post("http://localhost:6001/delivery", {
                name:localStorage.getItem("name"),
                email:localStorage.getItem("email")
            })
            .then((response) => {
                console.log(response.data.message);
                nav('/');  
            })
            .catch((error) => {
                console.error("Error ending call or updating delivery:", error);
            });
        } else {
            nav('/');
        }
    }
    
    return (
        <div className="h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 flex flex-col justify-center items-center relative" 
             onMouseMove={() => setShowControls(true)}>
            <div className="max-w-6xl w-full">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
                    {/* Remote video */}
                    <div className={`w-full md:w-2/3 relative rounded-xl overflow-hidden transition-all duration-500 shadow-lg ${isConnected ? 'scale-100' : 'scale-95 opacity-80'}`}>
                        <div className="aspect-video relative bg-gray-900 rounded-xl overflow-hidden">
                            <video 
                                playsInline 
                                autoPlay 
                                ref={remoteVideoRef} 
                                className="h-full w-full object-cover" 
                            />
                            {!isConnected && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white">
                                    {isConnecting ? (
                                        <div className="flex flex-col items-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-3"></div>
                                            <span>Connecting...</span>
                                        </div>
                                    ) : (
                                        <span>No one has joined yet</span>
                                    )}
                                </div>
                            )}
                            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 text-sm rounded-md">
                                Remote User
                            </div>
                        </div>
                    </div>
                    
                    {/* Local video */}
                    <div className={`w-full md:w-1/3 relative z-10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 
                                    ${isConnected ? 'scale-100' : 'md:scale-105'}`}>
                        <div className="aspect-video relative bg-gray-900 rounded-xl overflow-hidden">
                            <video 
                                playsInline 
                                autoPlay 
                                ref={localVideoRef} 
                                className={`h-full w-full object-cover ${video ? '' : 'hidden'}`}
                            />
                            {!video && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                                    <div className="h-24 w-24 rounded-full bg-gray-600 flex items-center justify-center text-2xl">
                                        {localStorage.getItem("name")?.charAt(0).toUpperCase() || "You"}
                                    </div>
                                </div>
                            )}
                            <div className="absolute bottom-2 left-2 flex space-x-2 items-center">
                                <div className={`h-3 w-3 rounded-full ${audio ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="text-white text-xs bg-black bg-opacity-60 px-2 py-1 rounded-md">You</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Controls */}
                <div className={`transition-all duration-300 ease-in-out transform fixed bottom-0 left-0 right-0 flex justify-center mb-6 
                                ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                    <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm p-3 rounded-full flex items-center space-x-4 shadow-lg">
                        <button 
                            className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors ${audio ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
                            onClick={toggleAudio}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {audio ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" stroke="currentColor" strokeWidth="2"/>
                                )}
                            </svg>
                        </button>
                        
                        <button 
                            className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors ${video ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
                            onClick={toggleVideo}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {video ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                )}
                            </svg>
                        </button>
                        
                        {/* {!isConnected && (
                            <button 
                                className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors bg-green-600 hover:bg-green-700 ${isConnecting ? 'animate-pulse' : ''}`}
                                onClick={() => call(name)}
                                disabled={isConnecting}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </button>
                        )} */}
                        
                        <button 
                            className="flex items-center justify-center h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                            onClick={endCall}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Meeting;
