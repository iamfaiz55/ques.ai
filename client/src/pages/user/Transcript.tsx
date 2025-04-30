import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5'; // For the back icon
import { useNavigate } from 'react-router';
import { useGetSingleTranscriptQuery } from '../../redux/apis/transcriptApi';
import { useProject } from '../../contexts/ProjectContext';
import { skipToken } from '@reduxjs/toolkit/query';

// Dummy data for transcript
// const dummyTranscript = "Welcome to our first episode... Here, we discuss the basics of podcasting and how to get started.";

const Transcript = () => {
  const {transcriptId}= useProject()
      // projectId ? projectId  : skipToken
  
  const {data, isSuccess}= useGetSingleTranscriptQuery(transcriptId ? transcriptId  : skipToken)
  // console.log("data :", data);
  
  const [isEditing, setIsEditing] = useState(false);
  const [transcript, setTranscript] = useState<string>();
const navigate = useNavigate()
  // Toggle editing state
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle change in the transcript input
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(event.target.value);
  };
  useEffect(() => {
    if(isSuccess){
    setTranscript(data?.result.transcript)
    
  }

}, [isSuccess]);
  return (
    <div className="relative w-full h-screen bg-gray-100 p-6">
      {/* Back Icon */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Back Icon */}
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <IoArrowBack size={24} className="text-purple-800" />
        </div>

        {/* Transcript Heading */}
        <h1 className="text-2xl font-semibold text-purple-800">Transcript</h1>
      </div>
      {/* Text Area */}
      <div className="w-full h-full bg-white p-4 rounded-lg shadow-md">
        <textarea
          className="w-full h-full p-4  rounded-md resize-none"
          value={transcript}
          onChange={handleChange}
          readOnly={!isEditing}
        />

        {/* Edit Button */}
        <button
          className="absolute top-6 right-6 text-sm text-purple-600 hover:text-purple-800"
          onClick={handleEditClick}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default Transcript;
