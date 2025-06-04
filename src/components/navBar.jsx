import { getDatabase, onValue, ref, runTransaction } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../../Firebase/firebase";
import logo from '../assets/images/logo.jpg'

const Navbar = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  useEffect(() => {
    const db = getDatabase(app);
    const countRef = ref(db, "visitorCount");

    runTransaction(countRef, (current) => (current || 0) + 1)
      .then(() => console.log("Visitor count incremented"))
      .catch((err) => console.error("Transaction failed:", err));

    const unsubscribe = onValue(countRef, (snapshot) => {
      setVisitorCount(snapshot.val());
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Navbar mounted"); // should log only once
  }, []);

  return (
    <div className="w-full bg-white shadow-md flex flex-col ">
      <div className='w-full flex items-center justify-between py-10 px-15 pb-3 '>
        <div className='flex gap-0 bg-gray-300 py-3 px-4.5 rounded-full'>
            <input className='bg-gray-300 focus:outline-0' 
            type='text' placeholder='Search products here...'/>
            <button className=''>
                <span>
                    <svg id="Layer_1" class="icon icon-header-search" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill='black' height='20' viewBox="0 0 980.04 981.7">
                <g id="_3_3" data-name="3_3"><path d="M979.3,928.4,718.5,667.2a399.9,399.9,0,0,0,92.8-256.7C811.3,188.9,631.9,9.2,410.7,9.2S10,188.9,10
                ,410.5,189.4,811.8,410.7,811.8A398.56,398.56,0,0,0,667,718.9L927.8,980.2a36.52,36.52,0,1,0,51.5-51.8ZM410.7,738.7C230,738.7,83,591.4,83,
                410.5S230,82.3,410.7,82.3,738.4,229.5,738.4,410.5,591.3,738.7,410.7,738.7Z" transform="translate(-10 -9.2)"></path></g></svg>
                </span>
            </button>
        </div>
        
        <div className='flex gap-4 items-center'>
            <img className='h-10' src={logo} alt=''/>
        
            Visitor count
        </div>
        <div className='flex gap-3 items-center'>
            <a href=''>
                <span>
                    {/* <svg version="1.1" id="Capa_1" class="icon icon-account" height='20' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                    <g>
	<g>
		<path d="M256,288.389c-153.837,0-238.56,72.776-238.56,204.925c0,10.321,8.365,18.686,18.686,18.686h439.747
			c10.321,0,18.686-8.365,18.686-18.686C494.56,361.172,409.837,288.389,256,288.389z M55.492,474.628
			c7.35-98.806,74.713-148.866,200.508-148.866s193.159,50.06,200.515,148.866H55.492z"></path>
	</g>
                    </g>
                    <g>
	                <g>
		<path d="M256,0c-70.665,0-123.951,54.358-123.951,126.437c0,74.19,55.604,134.54,123.951,134.54s123.951-60.35,123.951-134.534
			C379.951,54.358,326.665,0,256,0z M256,223.611c-47.743,0-86.579-43.589-86.579-97.168c0-51.611,36.413-89.071,86.579-89.071
			c49.363,0,86.579,38.288,86.579,89.071C342.579,180.022,303.743,223.611,256,223.611z"></path>
	                </g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
                    </svg> */}
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" height='20' xml:space="preserve">
<g>
	<g>
		<path d="M256,288.389c-153.837,0-238.56,72.776-238.56,204.925c0,10.321,8.365,18.686,18.686,18.686h439.747
			c10.321,0,18.686-8.365,18.686-18.686C494.56,361.172,409.837,288.389,256,288.389z M55.492,474.628
			c7.35-98.806,74.713-148.866,200.508-148.866s193.159,50.06,200.515,148.866H55.492z"></path>
	</g>
</g>
<g>
	<g>
		<path d="M256,0c-70.665,0-123.951,54.358-123.951,126.437c0,74.19,55.604,134.54,123.951,134.54s123.951-60.35,123.951-134.534
			C379.951,54.358,326.665,0,256,0z M256,223.611c-47.743,0-86.579-43.589-86.579-97.168c0-51.611,36.413-89.071,86.579-89.071
			c49.363,0,86.579,38.288,86.579,89.071C342.579,180.022,303.743,223.611,256,223.611z"></path>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
                </span>
            </a>
        </div>
      </div>
      <div className="ml-auto text-sm text-gray-500">
        Visitors: {visitorCount != 0 ? visitorCount : "Loading...."}
      </div>
    </div>
  );
};

export default Navbar;
