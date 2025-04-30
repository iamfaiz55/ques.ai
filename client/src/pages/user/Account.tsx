import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="bg-gray-100  px-4 py-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header with Back Button and Account Details side by side */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.history.back()} // This will navigate the user back to the previous page
              className="text-gray-600 hover:text-purple-600 flex items-center"
            >
              <FaArrowLeft className="text-2xl" />
         
            </button>
            <h2 className="text-2xl font-bold ">Account Settings</h2>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Layout: Avatar, Name, Email side by side */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Avatar */}
          <div className="flex justify-center md:justify-start">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              {/* Replace this with the actual user image URL */}
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzEGTSuiJtqHYh18T5C6abk-xZvfU_shDf3p7Ju1imJjtBDMm7_EkWALtsYMAzmxCu5Lk&usqp=CAU"
                }
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Email Fields */}
          <div className="flex flex-col md:flex-row md:space-x-8 w-full">
            {/* Name Field */}
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={user?.name || ""}
                readOnly={!isEditing}
                className={`w-full px-3 py-2 border rounded-md bg-white ${
                  isEditing ? "border-purple-500" : "border-gray-300 bg-gray-100"
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            {/* Email Field */}
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-3 bg-white py-2 border border-gray-300 bg-gray-100 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-12">
     
     
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Subscriptions</h1>
      
      <div className="w-full bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 p-4 rounded-2xl border-1 border-purple-900">
  <div className="flex justify-between items-center">
    <div className="text-center">
      <p className="text-xl text-purple-800">
        Oops! You don't have any active plans. <span className="font-bold">Upgrade now!</span>
      </p>
    </div>
    {/* Upgrade Button */}
    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">
      Upgrade
    </button>
  </div>
</div>

      
    
    </div>
      
    </div>
  );
};

export default Account;
