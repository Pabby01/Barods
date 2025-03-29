import { useState } from 'react';
// Import the external CSS file
import './ArchitecturalLanding.css';

export default function ArchitecturalLandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? 0 : prev - 1));
  };
  
  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? 1 : prev));
  };
  
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="container flex flex-col md:flex-row items-center">
          <div className="hero-content md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to Barods Global Home Designs!</h1>
            <p className="text-gray-700">
              Discover a wide range of building plans, from detached duplexes
              to hotels and more. Our professionally designed plans are ready
              for construction, giving you flexible purchase options to simplify
              your dream home journey. Whatever your vision, we've got the
              perfect plan for you!
            </p>
          </div>
          <div className="hero-image md:w-1/2">
            <img 
              src="/images/arch-1.png" 
              alt="3D Floor Plan" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="latest-projects bg-green-600 text-white">
        <div className="latest-projects-header container p-6">
          <h2 className="text-3xl font-bold text-white">Latest Projects</h2>
          <p className="md:w-1/2 mt-2 md:mt-0">
            Our professionally designed plans are ready for construction, giving you
            flexible purchase options to simplify your dream home journey.
          </p>
        </div>
        
        <div className="project-cards bg-white">
          <div className="container p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="project-card bg-white rounded shadow">
              <img 
                src="/images/image.png" 
                alt="Duplex 5 Bedroom" 
                className="w-full h-auto"
              />
              <h3 className="text-xl font-semibold p-4 text-gray-800">Duplex - 5 Bedroom</h3>
            </div>
            
            <div className="project-card bg-white rounded shadow">
              <img 
                src="/images/image-2.png" 
                alt="Duplex 4 Bedroom" 
                className="w-full h-auto"
              />
              <h3 className="text-xl font-semibold p-4 text-gray-800">Duplex - 4 Bedroom</h3>
            </div>
            
            <div className="project-card bg-white rounded shadow">
              <img 
                src="/images/image.png" 
                alt="Duplex 3 Bedroom" 
                className="w-full h-auto"
              />
              <h3 className="text-xl font-semibold p-4 text-gray-800">Duplex - 3 Bedroom</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Are the Best Section */}
      <section className="why-best bg-green-100">
        <div className="container p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-4">
              <img 
                src="/images/image 3.png" 
                alt="Modern House Design" 
                className="w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Why we are the Best!</h2>
              <p className="text-gray-700">
                Our professionally designed plans are ready for construction, giving you flexible purchase
                options to simplify your dream home journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Satisfied Clients Section */}
      <section className="satisfied-clients bg-white">
        <div className="container p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Satisfied Clients</h2>
              
              <div className="client-testimonial flex items-start mb-4">
                <div className="client-image w-16 h-16 mr-4">
                  <img 
                    src="/images/client.png" 
                    alt="Client" 
                    className="w-full h-full rounded"
                  />
                </div>
                <div className="client-info">
                  <h3 className="font-bold">Alabi Dagunro</h3>
                  <p className="text-sm text-gray-600">Victoria Island, Lagos.</p>
                  <p className="mt-2 text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore 
                    magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea 
                    commodo consequat.
                  </p>
                </div>
              </div>
              
              <div className="testimonial-controls flex mt-4">
                <button 
                  onClick={handlePrevSlide} 
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-2"
                >
                  &#8249;
                </button>
                <button 
                  onClick={handleNextSlide}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  &#8250;
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2 p-4">
              <img 
                src="/images/image-4.png" 
                alt="Modern House" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}