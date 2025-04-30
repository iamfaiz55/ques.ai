  import { useState } from 'react';
  import { BiCopy } from 'react-icons/bi';
  import {  FaHandsHelping, FaRegHeart, FaUser } from 'react-icons/fa';
  import { FiPlus } from 'react-icons/fi';
  import { GoPencil } from 'react-icons/go';
  import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { RootState } from '../redux/store';

  const Sidebar = () => {
  
  const {user}= useSelector((state :RootState)=> state.auth)
 
    const [collaps, setCollaps] = useState(true);
    const [activeLink, setActiveLink] = useState('');
   
    const initials = user?.name ? user.name.split(" ").map(word => word[0]).join("").toUpperCase() : '';

    const handleLinkClick = (link:string) => {
      setActiveLink(link);

    };

    return <div className='flex'>
        <div className={`flex flex-col h-screen ${collaps ? "w-20" : "w-64"} border-r border-gray-200 relative`}>
        {/* Logo/Header */}
        <div className="text-xl font-bold mb-6 text-purple-800 mt-5 px-3">
          
        <div className="">
        {
          collaps 
          ?<Link to="/">
          <svg width="50" height="30" viewBox="0 0 106 107" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M52.8341 101.442C26.2663 101.442 4.73438 79.9099 4.73438 53.3421C4.73438 26.7742 26.2729 5.24231 52.8341 5.24231C79.3954 5.24231 100.934 26.7742 100.934 53.3421" stroke="#7E22CE" stroke-width="9.27232" stroke-miterlimit="10"/>
    <path d="M33.7207 76.2093H39.6687C44.7774 76.2093 48.9212 72.0655 48.9212 66.9568V56.2966C48.9212 51.1879 53.065 47.0441 58.1737 47.0441H58.8346C63.9433 47.0441 68.0871 51.1879 68.0871 56.2966V92.0707C68.0871 97.1794 72.2309 101.323 77.3396 101.323C82.4483 101.323 86.5921 97.1794 86.5921 92.0707V80.8355C86.5921 75.7268 90.7359 71.583 95.8446 71.583H105.097" stroke="#7E22CE" stroke-width="9.27232" stroke-miterlimit="10"/>
  </svg>
          </Link>
          :<Link to="/">
            <svg width="140" height="25" viewBox="0 0 187 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_6_2892)">
  <path d="M20.1188 37.8323C10.1505 37.8323 2.07178 29.7535 2.07178 19.7853C2.07178 9.81703 10.153 1.73828 20.1188 1.73828C30.0846 1.73828 38.1658 9.81703 38.1658 19.7853" stroke="#7E22CE" stroke-width="3.47897" stroke-miterlimit="10"/>
  <path d="M64.9858 4.94938C72.4174 4.94938 79.0381 10.3774 79.0381 19.1951C79.0381 23.046 77.7685 26.2423 75.688 28.6277L78.9612 32.248L75.4574 35.2509L72.1074 31.5537C69.9898 32.7464 67.525 33.4011 64.9833 33.4011C57.5914 33.4011 50.9683 27.9731 50.9683 19.1926C50.9683 10.4121 57.5914 4.9469 64.9833 4.9469L64.9858 4.94938ZM64.9858 28.2433C66.1785 28.2433 67.4109 28.0127 68.4896 27.5515L64.2146 22.855L67.7581 19.8125L72.033 24.5858C72.9579 23.1997 73.5357 21.3896 73.5357 19.1579C73.5357 12.9984 69.2236 10.0724 64.9883 10.0724C60.753 10.0724 56.4781 12.9984 56.4781 19.1579C56.4781 25.3173 60.7902 28.2433 64.9883 28.2433H64.9858Z" fill="#7E22CE"/>
  <path d="M95.4033 30.7851C94.3644 32.5555 92.1698 33.3267 90.1663 33.3267C85.5839 33.3267 82.9653 29.9767 82.9653 25.858V13.8837H88.0858V24.819C88.0858 26.9366 89.1645 28.6302 91.5499 28.6302C93.9354 28.6302 95.1306 27.0904 95.1306 24.8959V13.8837H100.251V29.4014C100.251 30.8644 100.368 32.1737 100.444 32.8283H95.5546C95.4777 32.444 95.4009 31.5587 95.4009 30.7875L95.4033 30.7851Z" fill="#7E22CE"/>
  <path d="M122.625 27.3978C121.663 30.671 118.66 33.4036 114.001 33.4036C108.804 33.4036 104.221 29.6692 104.221 23.2766C104.221 17.2312 108.687 13.3059 113.54 13.3059C119.392 13.3059 122.896 17.0403 122.896 23.1229C122.896 23.8544 122.819 24.6256 122.819 24.7024H109.265C109.381 27.2044 111.499 29.0146 114.038 29.0146C116.426 29.0146 117.735 27.8219 118.35 26.1258L122.625 27.3954V27.3978ZM117.852 21.1987C117.775 19.3117 116.543 17.4643 113.617 17.4643C110.961 17.4643 109.498 19.4654 109.381 21.1987H117.852Z" fill="#7E22CE"/>
  <path d="M129.71 26.5868C129.826 28.0895 130.942 29.4756 133.174 29.4756C134.868 29.4756 135.676 28.5904 135.676 27.5886C135.676 26.7405 135.098 26.0487 133.635 25.7412L131.133 25.1635C127.476 24.3551 125.819 22.1606 125.819 19.5024C125.819 16.1152 128.822 13.3032 132.904 13.3032C138.294 13.3032 140.105 16.7301 140.335 18.7709L136.06 19.733C135.907 18.6171 135.098 17.1913 132.941 17.1913C131.594 17.1913 130.516 17.9997 130.516 19.0784C130.516 20.0033 131.208 20.5786 132.249 20.772L134.944 21.3497C138.679 22.1209 140.566 24.3923 140.566 27.1645C140.566 30.2443 138.178 33.4009 133.211 33.4009C127.513 33.4009 125.549 29.7037 125.318 27.5489L129.707 26.5868H129.71Z" fill="#7E22CE"/>
  <path d="M147.92 26.0884C149.884 26.0884 151.464 27.6679 151.464 29.5921C151.464 31.5164 149.884 33.0959 147.92 33.0959C145.956 33.0959 144.417 31.5164 144.417 29.5921C144.417 27.6679 145.996 26.0884 147.92 26.0884Z" fill="#7E22CE"/>
  <path d="M173.795 24.3924H160.742L157.392 32.8233H154.774L165.823 5.52466H168.749L179.799 32.8233H177.18L173.793 24.3924H173.795ZM161.628 22.1582H172.91L167.249 7.94977L161.628 22.1582Z" fill="#7E22CE"/>
  <path d="M184.535 32.8255V5.52686H187V32.8255H184.535Z" fill="#7E22CE"/>
  <path d="M12.9473 28.365H15.179C17.0957 28.365 18.6505 26.8103 18.6505 24.8935V20.8938C18.6505 18.977 20.2052 17.4222 22.122 17.4222H22.37C24.2868 17.4222 25.8415 18.977 25.8415 20.8938V34.3162C25.8415 36.233 27.3963 37.7877 29.3131 37.7877C31.2298 37.7877 32.7846 36.233 32.7846 34.3162V30.1008C32.7846 28.184 34.3393 26.6292 36.2561 26.6292H39.7276" stroke="#7E22CE" stroke-width="3.47897" stroke-miterlimit="10"/>
  </g>
  <defs>
  <clipPath id="clip0_6_2892">
  <rect width="186.667" height="39.573" fill="white" transform="translate(0.333496)"/>
  </clipPath>
  </defs>
  </svg>

          </Link>
        }

          </div>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1">
            <ul className="space-y-2 px-4 py-2">
              <li>
                <Link
                to="/project"
                  onClick={() => handleLinkClick('podcast')}
                  className={`flex items-center p-2 text-gray-700 hover:bg-purple-100 rounded-md ${activeLink === 'podcast' ? 'bg-purple-200 text-purple-800' : ''}`}
                >
                  <FiPlus className="h-5 w-5 mr-2" />
                  {/* Show the text only if the sidebar is not collapsed */}
                  {!collaps && <span>Add your Podcast(s)</span>}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleLinkClick('repurpose')}
                  className={`flex items-center p-2 text-gray-700 hover:bg-purple-100 rounded-md ${activeLink === 'repurpose' ? 'bg-purple-200 text-purple-800' : ''}`}
                >
                  <GoPencil className="h-5 w-5 mr-2" />
                  {!collaps && <span>Create & Repurpose</span>}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleLinkClick('widget')}
                  className={`flex items-center p-2 text-gray-700 hover:bg-purple-100 rounded-md ${activeLink === 'widget' ? 'bg-purple-200 text-purple-800' : ''}`}
                >
                  <BiCopy className="h-5 w-5 mr-2" />
                  {!collaps && <span>Podcast Widget</span>}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleLinkClick('upgrade')}
                  className={`flex items-center p-2 text-gray-700 hover:bg-purple-100 rounded-md ${activeLink === 'upgrade' ? 'bg-purple-200 text-purple-800' : ''}`}
                >
                  <FaRegHeart className="h-5 w-5 mr-2" />
                  {!collaps && <span>Upgrade</span>}
                </a>
              </li>
              <li>
                <Link
                  to="/project/account"
                  onClick={() => handleLinkClick('account')}
                  className={`flex items-center p-2 text-gray-700 hover:bg-purple-100 rounded-md ${activeLink === 'upgrade' ? 'bg-purple-200 text-purple-800' : ''}`}
                >
                  <FaUser className="h-5 w-5 mr-2" />
                  {!collaps && <span>Account</span>}
                </Link>
              </li>
            </ul>
          </nav>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>
        
        {/* Help Section */}
        <div className="mb-1 px-3">
        
          
                <a
                  href="#"
                  onClick={() => handleLinkClick('help')}
                  className={`flex items-center p-2 text-gray-700 hover:bg-purple-100 rounded-md ${activeLink === 'help' ? 'bg-purple-200 text-purple-800' : ''}`}
                  >
                  <FaHandsHelping  className="h-5 w-5 mr-2" />
                  {!collaps && <span>Help</span>}
                </a>
            
        </div>
        
            {/* User Info */}
            <div className="flex items-center mt-auto p-2 text-sm text-gray-500">
          {/* Circular Avatar with Initials */}
          <div className="w-10 h-10 flex items-center justify-center bg-purple-800 text-white rounded-full mr-2">
         
            <span>{initials}</span>
       
        </div>
        
        {
          !collaps &&   <div>
          <div>{user && user.name}</div>
          <div>{user && user.email}</div>
        </div>
        }
        </div>

        
        {/* Drawer Button at Left Border Bottom Corner */}
        <div className={`absolute ${collaps ? "left-14" :"left-57"} bottom-35 transform translate-x-0 translate-y-1/2 mb-4 ml-2`}>
            <button
              onClick={() => setCollaps(!collaps)} // Toggle collapse state
              className="bg-purple-800 text-white p-2 rounded-full shadow-lg hover:bg-purple-700"
            >
          {collaps?<MdKeyboardDoubleArrowRight   className="h-4 w-4" /> : <MdKeyboardDoubleArrowLeft className="h-4 w-4" /> }

            </button>
          </div>
      </div>

      </div>
  };

  export default Sidebar;
  