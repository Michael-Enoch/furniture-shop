
function NavBar(){
    return (
    <>
        <nav className="flex flex-col">
            <div className="flex justify-between py-10 px-15 pb-3 items-center">
                <a className='' href='#'>logo</a>
                <div className="flex rounded-full bg-gray-100 py-3 px-5">
                    <input className='focus:outline-none' 
                    type='text' placeholder='Search for product here'/>
                </div>
                <div className="flex fle-row gap-7">
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    
                </div>
            </div>
            <div className="flex gap-5 p-4 justify-center">
                <a className="text-xs font-medium" href="">HOME</a>
                <a className="text-xs font-medium" href="">BEDROOM</a>
                <a className="text-xs font-medium" href="">LIVING ROOM</a>
                <a className="text-xs font-medium" href="">DINNG</a>
                <a className="text-xs font-medium" href="">HOME OFFICE</a>
                <a className="text-xs font-medium" href="">OUTDOOR</a>
                <a className="text-xs font-medium" href="">MORE</a>
            </div>
        </nav>
    </>
    )
}

export default NavBar