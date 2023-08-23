

function Profil() {
  return (
    <><header>-</header><main>
          <div className="bg-gray-100 min-h-screen py-8">
              <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg">
                  <div className="flex items-center">
                      <img
                          className=" w-32 h-32 rounded-full mr-4"
                          src="/test.jpg"
                          alt="User Avatar" />
                      <div>
                          <h1 className="text-2xl font-semibold">John Doe</h1>
                          <p className="text-white bg-red-600 text-center rounded-2xl">Developer</p>
                      </div>
                  </div>
                  
                  <div className="mt-6">
                      <h2 className="text-lg font-semibold">Information</h2>
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