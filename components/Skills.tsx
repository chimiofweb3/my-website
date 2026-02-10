
import React from 'react';

/**
 * Skills Component
 * 
 * Lists core skills like HTML, CSS, and JS using modern badges.
 */
const Skills: React.FC = () => {
  const skills = [
    { name: 'HTML5', color: 'bg-orange-100 text-orange-700' },
    { name: 'CSS3', color: 'bg-blue-100 text-blue-700' },
    { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'React', color: 'bg-cyan-100 text-cyan-700' },
    { name: 'Tailwind CSS', color: 'bg-sky-100 text-sky-700' },
    { name: 'Git', color: 'bg-red-100 text-red-700' }
  ];

  return (
    <section id="skills" className="bg-slate-900 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Technical Toolbox</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <div 
              key={skill.name} 
              className={`${skill.color} px-6 py-3 rounded-xl font-bold text-lg shadow-md hover:scale-105 transition-transform cursor-default`}
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
