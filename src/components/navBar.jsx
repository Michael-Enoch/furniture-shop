import { getDatabase, onValue, ref, runTransaction } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../../Firebase/firebase";
import logo from '../assets/images/logo.jpg'
import './nav.css'

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
      <div className='w-full flex items-center justify-between py-5.5 px-15  '>
        <div className='searchBar flex gap-1 bg-gray-100 py-2.25 px-4.5 rounded-full'>
            <input className='bg-gray-100 focus:outline-0' 
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
            <a href=''><img className='h-15' src={logo} alt=''/></a>
        
            <div className='flex flex-row gap-1 items-center'>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                </svg>
              </span>
              <span>
                {visitorCount != 0 ? visitorCount + ' ' : "Loading...." + ' '}
                Visitors
              </span>
            </div>
        </div>
        
        <div className='flex gap-6 items-center'>
            <a href='' className='relative'>
                <span>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" height='22' xml:space="preserve">
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
            <a href=''className='relative'>
                <div className='h-4 w-4 p-2 text-white text-xs flex items-center justify-center -top-1.5 left-3 rounded-full bg-teal-500 absolute'>0</div>

              <span>
                <svg class="icon icon-whishlist" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" height='22' xml:space="preserve">
<g>
	<g>
		<path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25    c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25    c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7    c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574    c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431    c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351    C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646    c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245    C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659    c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66    c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351    C482,254.358,413.255,312.939,309.193,401.614z"></path>
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
            <a href='' className='relative'>
                <div className='h-4 w-4 p-2 text-white text-xs flex items-center justify-center -top-1.5 left-3 rounded-full bg-teal-500 absolute'>0</div>
              <span>
                <svg  version="1.1" id="Capa_1" class="icon icon-bubble" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height='22' viewBox="0 0 250 271"  xml:space="preserve">
<path style={{stroke: 'black', fill: 'black'}} d="M125.294,137.831c33.359,0,60.5-27.14,60.5-60.499V51.839c0-5.522-4.477-10-10-10c-5.523,0-10,4.478-10,10v25.492
	c0,22.331-18.168,40.498-40.499,40.498S84.795,99.662,84.795,77.331V51.839c0-5.522-4.477-10-10-10s-10,4.478-10,10v25.492
	C64.794,110.691,91.934,137.831,125.294,137.831z"></path>
<g>
	<path style={{ fill: 'none', stroke: 'black', strokeWidth:'20', strokeMiterLimit:'10'}} d="M238.065,252.088c0,4.4-3.6,8-8,8H19.935
		c-4.4,0-8-3.6-8-8V18.912c0-4.4,3.6-8,8-8h210.131c4.4,0,8,3.6,8,8V252.088z"></path>
</g>
</svg>
              </span>
            </a>
        </div>

      </div>
      <div className=" flex w-full justify-center items-center gap-12">
        <a  href='' className='link text-sm font-medium py-3.5 relative hover:text-teal-500 duration-300 ease-in-out'>
          HOME
          <span className='absolute left-0 top-11.5  h-0.5 rounded
          text-xs text-white bg-black'></span>
        </a>
        <a href='' className='text-sm font-medium py-3.5 relative group hover:text-teal-500 duration-300 ease-in-out'>BEDROOM</a>
        <a href='' className='text-sm font-medium py-3.5 relative group hover:text-teal-500 duration-300 ease-in-out'>LIVING ROOM</a>
        <a href='' className='text-sm font-medium py-3.5 relative group hover:text-teal-500 duration-300 ease-in-out'>DINING</a>
        <a href='' className='text-sm font-medium py-3.5 relative group hover:text-teal-500 duration-300 ease-in-out'>HOME OFFICE</a>
        <a href='' className='text-sm font-medium py-3.5 relative group hover:text-teal-500 duration-300 ease-in-out'>OUTDOOR</a>
        <a href='' className='text-sm font-medium py-3.5 relative group hover:text-teal-500 duration-300 ease-in-out'>MORE</a>
      </div>
    </div>
  );
};

export default Navbar;
