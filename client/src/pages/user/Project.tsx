import  { useEffect, useState } from 'react';
import PodcastSVG from '../../assets/PodcastSVG'; // Importing the SVG component
import { FaPlusCircle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import "./project.css"
import { yupResolver } from '@hookform/resolvers/yup';
import { useProject } from '../../contexts/ProjectContext';
import { useNavigate } from 'react-router';
import { useCreateProjectMutation, useFetchAllProjectsQuery } from '../../redux/apis/projectApi';
import { ITranscript, useGetTranscriptsQuery } from '../../redux/apis/transcriptApi';

// const data = [
//     {_id:"1",projectName:"Sample project", createdAt:"2025-04-22T08:34:25.522+00:00", files:4},
//     {_id:"2",projectName:"New project", createdAt:"2025-04-24T07:31:47.248+00:00", files:1},
// ]
 
// Validation schema using Yup
const schema = Yup.object({
  projectName: Yup.string().required('Project name is required'),
});

const Project = () => {
   const {data:allTranscripts}= useGetTranscriptsQuery()
   console.log("allTranscripts", allTranscripts);
   
  const [createProject, {isSuccess}]= useCreateProjectMutation()
  const {data}= useFetchAllProjectsQuery()
  const {  setProjectId } = useProject();
  // State to manage dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);
const navigate = useNavigate()
  // React Hook Form setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data: { projectName: string }) => {
    console.log(data); // Handle form data (e.g., create the project)
    createProject({name:data.projectName})
  };

  useEffect(() => {
    
    if(isSuccess){
      setIsDialogOpen(false); // Close dialog on form submission

    }
  }, [isSuccess]);

  return <>
    {
        data && data.result.length == 0 
        ?<>
        <div className="flex flex-col items-center justify-center bg-white">
      {/* Large text in purple color */}
      <h1 className="text-3xl font-bold text-purple-700 mb-8">Create a New Project</h1>

      {/* SVG Component */}
      <PodcastSVG />

      {/* Description */}
      <p className="text-center text-gray-700 mt-6 max-w-4xl">
        Our software provides powerful tools to manage podcasts, track episodes, and engage with your audience seamlessly. Create, edit, and publish podcasts with ease — plus many more features to help you grow your podcasting journey.
      </p>

      {/* Create New Project Button */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="mt-8 flex items-center w-52 px-2 py-1 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {/* Plus icon on the left */}
        <FaPlusCircle className="m-2 text-2xl" />
        <span className="font-semibold">Create New Project</span>
      </button>

      {/* Dialog for Creating New Project */}
      {isDialogOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> {/* Dark background with 50% opacity */}
    <div className="bg-white p-6 rounded-md shadow-lg w-128 max-w-2xl"> {/* Larger dialog */}
      <h2 className="text-2xl font-semibold text-black mb-4">Create Project</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
            Enter Project Name
          </label>
          <input
            type="text"
            placeholder='Type Here'
            id="projectName"
            {...register('projectName')}
            className="w-full p-2 mt-1 border rounded-sm bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.projectName && <p className="text-red-500 text-sm mt-2">{errors.projectName.message}</p>}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setIsDialogOpen(false)}
            className="px-4 py-2  text-red-600 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 font-bold  bg-purple-700 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Create 
          </button>
        </div>
      </form>
    </div>
  </div>
)}



    </div>
        </>
        :<>
        
        {/* // If data exists, display the list of projects */}
        <div className=" bg-white m-14">

<div className='absolute right-18'>
           <button
            onClick={() => setIsDialogOpen(true)}
            className=" flex items-center px-4 py-1 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <FaPlusCircle className="m-2 text-xl" />
            <span className="font-semibold">Create New Project</span>
          </button>
</div>

         <div>
         <h1 className="text-2xl font-bold text-purple-700 mb-8">Projects</h1>

         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {data && data.result.map((project: ITranscript, index: number) => {
  // Count how many transcripts belong to this project
  const transcriptCount = allTranscripts?.result?.filter(
    (transcript: ITranscript) => transcript.project === project._id
  ).length || 0;

  return (
    <div
      onClick={() => {
        if (project._id) {
          setProjectId(project._id);
          navigate("/project");
        }
      }}
      key={index}
      className="bg-white p-1 rounded-lg shadow-md border border-gray-300 flex items-center cursor-pointer hover:shadow-lg transition duration-200"
    >
      {/* Left side image/avatar */}
      <div className="w-16 h-16 bg-yellow-500 text-white rounded-lg flex items-center justify-center text-3xl font-bold mr-4">
        {project.name.substring(0, 2).toUpperCase()}
      </div>

      {/* Project details */}
      <div>
        <h3 className="font-semibold text-gray-800">{project.name}</h3>
        <p className="text-sm text-gray-500">
          Files: {transcriptCount}
        </p>
        <p className="text-sm text-gray-500">
          Created at:{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
       
      </div>
    </div>
  );
})}

</div>

         </div>
         {isDialogOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> {/* Dark background with 50% opacity */}
    <div className="bg-white p-6 rounded-md shadow-lg w-128 max-w-2xl"> {/* Larger dialog */}
      <h2 className="text-2xl font-semibold text-black mb-4">Create Project</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
            Enter Project Name
          </label>
          <input
            type="text"
            placeholder='Type Here'
            id="projectName"
            {...register('projectName')} // Register form input correctly
            className="w-full p-2 mt-1 border rounded-sm bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.projectName && <p className="text-red-500 text-sm mt-2">{errors.projectName.message}</p>}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setIsDialogOpen(false)}
            className="px-4 py-2  text-red-600 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 font-bold  bg-purple-700 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Create 
          </button>
        </div>
      </form>
    </div>
  </div>
)}
          {/* Create New Project Button (always visible) */}
         
        </div>
        </>
    }
    </>
};

export default Project;
