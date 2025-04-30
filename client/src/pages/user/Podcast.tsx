import { useEffect, useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useProject } from '../../contexts/ProjectContext';
import { useNavigate } from 'react-router';
import { useFetchTranscriptFromYoutubeMutation, useGetAllTranscriptsQuery } from '../../redux/apis/transcriptApi';
import { skipToken } from '@reduxjs/toolkit/query';

const dummyUploadedFiles = [
  {
    id: "1",
    name: 'Episode 1 - Welcome.mp3',
    type: 'audio',
    uploadedAt: '2025-04-20T14:06:56.414+00:00',
    transcript: 'Welcome to our first episode...',
  },
  {
    id: "2",
    name: 'Marketing Tips.mp4',
    type: 'video',
    uploadedAt: '2025-04-05T10:15:40.436+00:00',
    transcript: 'In this video we discuss marketing...',
  },
  {
    id: "3",
    name: 'episode_3_notes.pdf',
    type: 'document',
    uploadedAt: '2025-04-05T10:15:05.747+00:00',
    transcript: '',
  },
];

const schema = Yup.object({
  videoUrl: Yup.string().required('Video Url is required'),
  name: Yup.string().required('Video name is required'),
});
interface FileItem {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
}


const Podcast = () => {
  const [getTranscript, { isSuccess,  isLoading}]= useFetchTranscriptFromYoutubeMutation()
  const [uploadMode, setUploadMode] = useState<"upload" | "youtube" | "rss" | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [showTable, setShowTable] = useState(false); 
  const [youtubePreviewUrl, setYoutubePreviewUrl] = useState<string | null>(null);
  
  const { projectId, setTranscriptId}= useProject()
  const { data } = useGetAllTranscriptsQuery(
    projectId ? projectId  : skipToken
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewURL, setVideoPreviewURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { register, handleSubmit, watch,formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: { videoUrl: string, name:string }) => {
   
    if (!projectId) {
      alert("Please select a project before continuing.");
      return;
    }
  
    getTranscript({youtubeUrl:data.videoUrl, projectId, name:data.name})
    setSelectedFile(null);
    setVideoPreviewURL(null);
    // setIsDialogOpen(false);
  };

  useEffect(() => {
    if (uploadMode === null) {
      setLoadingFiles(true);
      setTimeout(() => {
        setUploadedFiles(dummyUploadedFiles);
        setLoadingFiles(false);
      }, 500); 
    }
  }, [uploadMode]);

  const formatDate = (value: string | Date) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(',', ' |');
  };
  

  const handleShowTable = () => {
    setShowTable(true);
    setUploadMode(null)
  };

useEffect(() => {
  
  if(isSuccess){
    setIsDialogOpen(false)
  }
}, [isSuccess]);

const watchedVideoUrl = watch('videoUrl');

useEffect(() => {
  if (uploadMode === 'youtube' && watchedVideoUrl) {
    const match = watchedVideoUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (match) {
      const videoId = match[1];
      setYoutubePreviewUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setYoutubePreviewUrl(null);
    }
  } else {
    setYoutubePreviewUrl(null);
  }
}, [watchedVideoUrl, uploadMode]);
console.log("data of transcript:", data);


  return (
    <div className="px-6">
      {/* Top Heading */}
      <h1 className="text-2xl font-bold text-purple-800 mb-4">Add Podcast</h1>

      {/* 3 Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* RSS Feed Card */}
        <div 
          onClick={() => {
            setUploadMode("rss");
            setIsDialogOpen(true);
          }} 
          className="bg-purple-50 p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between cursor-pointer"
        >
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-black mb-1">RSS Feed</h2>
            <p className="text-sm text-gray-600">Add your podcast using an RSS link.</p>
          </div>
          <img
            src="https://cdn2.iconfinder.com/data/icons/social-icon-3/512/social_style_3_rss-1024.png"
            alt="RSS Feed"
            className="w-16 h-16 object-cover rounded-md ml-4"
          />
        </div>

        {/* YouTube Video Card */}
        <div 
          onClick={() => {
            setUploadMode("youtube");
            setIsDialogOpen(true);
          }} 
          className="bg-purple-50 p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between cursor-pointer"
        >
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-black mb-1">YouTube Video</h2>
            <p className="text-sm text-gray-600">Link videos from YouTube easily.</p>
          </div>
          <img
            src="https://res.cloudinary.com/dpc5d15ci/image/upload/v1745870016/youtube_fy2lkx.png"
            alt="YouTube Video"
            className="w-16 h-16 object-cover rounded-md ml-4"
          />
        </div>

        {/* Upload File Card */}
        <div 
          onClick={() => {
            setUploadMode("upload")
            setShowTable(false);
          }} 
          className="bg-purple-50 p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between cursor-pointer"
        >
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-black mb-1">Upload File</h2>
            <p className="text-sm text-gray-600">Upload audio files manually.</p>
          </div>
          <FaUpload size={30} className="text-purple-800 ml-4" />
        </div>
      </div>

      <button
        type="button"
        onClick={handleShowTable}
        className="text-red-500 underline text-sm mb-2"
      >
        {showTable ? 'Hide All Files' : 'Show All Files'}
      </button>

   {/* === Fullscreen Upload Section === */}
{uploadMode === "upload" && (
  <div className="w-full bg-white rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition relative">
    {/* Close Button */}
    <button
      onClick={() => {
        setUploadMode(null);  // Close the fullscreen upload section
        setSelectedFile(null);
        setVideoPreviewURL(null);
      }}
      className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800 focus:outline-none"
    >
      &times;
    </button>

    {/* Upload Icon */}
    <MdOutlineCloudUpload size={80} className="text-purple-700 " />

    {/* Instruction Text */}
    <h2 className="text-xl font-semibold text-purple-700 mb-2">Upload Your File</h2>
    <p className="text-sm text-gray-600 mb-4">Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
    <p className="text-sm text-gray-400 mb-4">MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>

    {/* Hidden File Input */}
    <input
      type="file"
      className="hidden"
      id="fileUpload"
      ref={fileInputRef}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          setSelectedFile(file);
          const previewURL = URL.createObjectURL(file);
          setVideoPreviewURL(previewURL);
          setIsDialogOpen(true);
        }
      }}
    />

    {/* Clickable Label */}
    <label
      htmlFor="fileUpload"
      className="bg-purple-700 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-purple-800 transition"
    >
      Select File
    </label>
  </div>
)}


      {showTable && (
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Files</h2>
          {loadingFiles ? (
            <p className="text-gray-600">Loading...</p>
          ) : uploadedFiles.length === 0 ? (
            <p className="text-gray-500">No files uploaded yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-sm rounded-2xl">
                  <th className="p-3 border-b text-gray-500">No.</th>
                  <th className="p-3 border-b text-gray-500">Name</th>
                  <th className="p-3 border-b text-gray-500">Upload Date & Time</th>
                  <th className="p-3 border-b text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data.result.map((file, index) => (
                  <tr key={file._id} className="hover:bg-gray-50 text-sm">
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{file.name.toUpperCase()}</td>
                    
                    <td className="p-3 border-b">{file.createdAt ? formatDate(file.createdAt): "N/A"}</td>
                    <td className="p-3 border-b ">
                      <button
                        className="px-3 py-1 text-sm bg-white text-gray-500 border rounded-l-md hover:bg-purple-700 transition"
                        onClick={() => {
                         if(file._id){
                          setTranscriptId(file._id)
                          navigate("/project/transcript")
                         }
                        }}
                      >
                        View
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-white text-red-500 border rounded-r-md hover:bg-red-600 transition"
                        onClick={() =>
                          setUploadedFiles(prev => prev.filter(f => f.id !== file._id))
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Dialog for Creating New Project */}
      {isDialogOpen && (uploadMode === "youtube" || uploadMode === "rss" || selectedFile) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full sm:w-128 max-w-2xl">
            <h2 className="text-2xl font-semibold text-black mb-4">
              {uploadMode === "youtube" ? "Add YouTube Video" : uploadMode === "rss" ? "Add RSS Feed" : "Create Project"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            {uploadMode === 'youtube' && youtubePreviewUrl && (
  <iframe
    width="100%"
    height="200"
    className="rounded-md border border-gray-300 mb-4"
    src={youtubePreviewUrl}
    title="YouTube Video Preview"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
)}
{videoPreviewURL && selectedFile?.type.startsWith("video/") && (
  <video
    controls
    src={videoPreviewURL}
    className="w-full h-60 mb-4 rounded-md border border-gray-300"

  />
)}

              {selectedFile && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setVideoPreviewURL(null);
                    setIsDialogOpen(false);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''; 
                    }
                  }}
                  className="text-red-500 underline text-sm mb-4"
                >
                  Remove Selected File
                </button>
              )}

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Enter Video Name
                </label>
                <input
                  type="text"
                  placeholder="Type Here"
                  id="name"
                  {...register('name')}
                  className="w-full p-2 mt-1 border rounded-sm bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
                  Enter Video URL
                </label>
                <input
                  type="text"
                  placeholder="Type Here"
                  id="videoUrl"
                  {...register('videoUrl')}
                  className="w-full p-2 mt-1 border rounded-sm bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.videoUrl && <p className="text-red-500 text-sm mt-2">{errors.videoUrl.message}</p>}
              </div>
              

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setSelectedFile(null);
                    setVideoPreviewURL(null);
                  }}
                  className="px-4 py-2 text-red-600 rounded-md"
                >
                  Cancel
                </button>
                {isLoading ? (
  <div className="px-5 py-2 text-purple-600 font-semibold">Creating transcript...</div>
) : (
  <button
    type="submit"
    className="px-5 py-2 font-bold bg-purple-700 text-white rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
  >
    Create
  </button>
)}

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Podcast;
