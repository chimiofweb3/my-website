
import React from 'react';

interface ProjectsProps {
  setView?: (view: string) => void;
}

/**
 * Projects Component
 * 
 * Redirects back to home on 'View Source' as requested.
 */
const Projects: React.FC<ProjectsProps> = ({ setView }) => {
  const projectList = [
    {
      title: 'Personal Portfolio',
      description: 'My very first major project - a responsive, interactive portfolio built with React and Tailwind CSS.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=250'
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100"
            >
              <div className="overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {project.description}
                </p>
                <button 
                  onClick={() => setView?.('home')}
                  className="inline-flex items-center text-blue-600 font-bold hover:translate-x-2 transition-transform cursor-pointer"
                >
                  View Source <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          ))}
          
          <div className="border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center p-12 text-center bg-gray-50/50">
            <div>
              <p className="text-gray-400 font-bold text-lg uppercase tracking-widest">Next Ship Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
