

function Profil() {
  return (
    <><header>-</header><main>
          <div className="bg-gray-100 min-h-screen py-8 flex-auto">
            <div className=" md:mx-auto max-w-6xl min-w-xs mx-3 bg-white shadow-md p-6 rounded-lg justify-center">
                  <div className="flex items-center">
                      <img
                          className="lg:w-60 lg:h-60 md:w-48 md:h-48 w-32 h-32 rounded-full mr-4"
                          src="/test.jpg"
                          alt="User Avatar" />
                      <div>
                          <h1 className="text-2xl font-semibold lg:text-4xl md:text-3xl">John Doe</h1>
                          <p className="text-white bg-red-600 text-center rounded-2xl mt-2">Developer</p>
                      </div>
                  </div>
                  
                  <div className="mt-6">
                      <h2 className="text-lg font-semibold ">Information</h2>
                      <ul className="mt-2 text-gray-600">
                        <li className="flex items-center space-x-2">
                    
                            
                              <span>john@example.com</span>
                          </li>
                          <li className="flex items-center space-x-2 mt-2">
                              
                              <a href="http://" className="text-blue-500">change password</a>
                          </li>
                      </ul>
                  </div>
                  <div className="mt-6">
                      <h2 className="text-lg font-semibold">My Game</h2>
                      
                  </div>
                  <section className=" border-2 mt-2">.</section>
              </div>
          </div>
      </main></>
  );
};



  


export default Profil