import Sidebar from './Sidebar';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; // Import icons
import { IoHomeOutline } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { useSignOutMutation } from '../redux/apis/authApi';

const Layout = () => {
  const location = useLocation();
const [logout]= useSignOutMutation()
  const getBreadcrumbs = (path: string) => {
    const segments = path.split('/').filter(Boolean); // Remove empty segments
    return segments;
  };

  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <div className="flex bg-gray-100">
      <Sidebar />

      {/* Right Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar: Breadcrumbs Left + Icons Right */}
        <div className="flex justify-between items-center mb-4">
          {/* Left: Breadcrumbs */}
          <div className="flex items-center space-x-2">
          <Link to="/">
          <IoHomeOutline className="" />
          </Link>
            <h1 className="font-extralight text-xl flex flex-wrap">
              {breadcrumbs.length > 0 ? (
                breadcrumbs.map((segment, index) => {
                  const pathToBreadcrumb = `/${breadcrumbs.slice(0, index + 1).join('/')}`; // Construct the path up to the current segment
                  return (
                    <span key={index} className="text-purple-800 capitalize">
                      <Link to={pathToBreadcrumb} className="hover:underline">
                        {segment}
                      </Link>
                      {index < breadcrumbs.length - 1 && " / "}
                    </span>
                  );
                })
              ) : (
                <span className="text-purple-800">Home</span>
              )}
            </h1>
          </div>

          {/* Right: Notification and Logout */}
          <div className="flex items-center space-x-4">
            <button className="text-black hover:text-purple-600 bg-white rounded-full p-2">
              <FaBell size={20} />
            </button>
            <button onClick={()=>logout()} className="text-purple-800 hover:text-purple-600 bg-white rounded-full p-2">
              <FiLogOut size={20} color="red" />
            </button>
          </div>
        </div>

        {/* === Route Child Pages === */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
