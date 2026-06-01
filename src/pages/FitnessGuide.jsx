import React from 'react';
import { BookOpen, Activity, ArrowRight, Play } from 'lucide-react';

const tutorials = {
  pushups: [
    {
      title: 'Standard Push-up',
      description: 'The classic upper-body exercise that targets chest, shoulders, and triceps.',
      steps: [
        'Start in a plank position with hands slightly wider than shoulder-width.',
        'Keep your body in a straight line from head to heels.',
        'Lower your body until your chest nearly touches the floor.',
        'Push back up to the starting position.'
      ],
      target: 'Chest, Shoulders, Triceps, Core',
      difficulty: 'Beginner'
    },
    {
      title: 'Diamond Push-up',
      description: 'A variation that places more emphasis on the triceps and inner chest.',
      steps: [
        'Form a diamond shape with your hands directly under your chest.',
        'Keep elbows tucked close to your body as you lower down.',
        'Push back up explosively.'
      ],
      target: 'Triceps, Inner Chest',
      difficulty: 'Intermediate'
    },
    {
      title: 'Wide Grip Push-up',
      description: 'Focuses more on the outer chest and shoulders.',
      steps: [
        'Place hands wider than standard, about 1.5 times shoulder-width.',
        'Lower your body, allowing elbows to flare out slightly.',
        'Push back up to the start.'
      ],
      target: 'Outer Chest, Shoulders',
      difficulty: 'Intermediate'
    },
    {
      title: 'Pike Push-up',
      description: 'An excellent shoulder-builder and progression towards handstand push-ups.',
      steps: [
        'Start in a downward dog yoga position (hips high in the air).',
        'Lower your head towards the floor between your hands.',
        'Push back up, keeping the hips elevated.'
      ],
      target: 'Shoulders, Upper Chest',
      difficulty: 'Advanced'
    }
  ],
  squats: [
    {
      title: 'Standard Squat',
      description: 'The foundational lower-body movement.',
      steps: [
        'Stand with feet shoulder-width apart, toes slightly pointed out.',
        'Keep your chest up and core braced.',
        'Push your hips back and bend your knees to lower down.',
        'Go as low as comfortable, then push through heels to stand.'
      ],
      target: 'Quads, Glutes, Hamstrings',
      difficulty: 'Beginner'
    },
    {
      title: 'Sumo Squat',
      description: 'Targets the inner thighs and glutes more heavily.',
      steps: [
        'Take a wide stance with toes pointed outwards at a 45-degree angle.',
        'Lower down while keeping your knees tracking over your toes.',
        'Squeeze glutes at the top of the movement.'
      ],
      target: 'Inner Thighs, Glutes',
      difficulty: 'Beginner'
    },
    {
      title: 'Jump Squat',
      description: 'A plyometric variation to build explosive power.',
      steps: [
        'Perform a standard squat to lower down.',
        'Explode upwards, jumping off the ground.',
        'Land softly and immediately go into the next repetition.'
      ],
      target: 'Quads, Calves, Cardiovascular System',
      difficulty: 'Intermediate'
    },
    {
      title: 'Bulgarian Split Squat',
      description: 'A challenging unilateral exercise for leg strength and balance.',
      steps: [
        'Stand a couple of feet in front of a bench or chair.',
        'Place one foot behind you on the elevated surface.',
        'Lower your body until your front thigh is parallel to the floor.',
        'Push back up through your front heel.'
      ],
      target: 'Quads, Glutes, Balance',
      difficulty: 'Advanced'
    }
  ]
};

const GuideCard = ({ tutorial }) => (
  <div className="premium-glass-card rounded-2xl p-5">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-base font-bold text-white">{tutorial.title}</h3>
      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
        tutorial.difficulty === 'Beginner' ? 'bg-brand-orange/10 text-brand-orange border border-brand-orange/20' :
        tutorial.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
        'bg-red-500/10 text-red-500 border border-red-500/20'
      }`}>
        {tutorial.difficulty}
      </span>
    </div>
    <p className="text-slate-400 text-sm mb-5 leading-relaxed">{tutorial.description}</p>
    
    <div className="space-y-4">
      <div>
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">Technique</h4>
        <ol className="space-y-3">
          {tutorial.steps.map((step, idx) => (
            <li key={idx} className="flex gap-2.5 items-start text-slate-300 text-sm">
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-brand-orange/10 text-brand-orange text-[10px] font-bold shrink-0 border border-brand-orange/20 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>
      
      <div className="pt-4 border-t border-brand-border flex items-center gap-2">
        <Activity className="w-4 h-4 text-brand-orange shrink-0" />
        <span className="text-xs text-slate-400">
          <strong className="text-white font-semibold">Focus:</strong> {tutorial.target}
        </span>
      </div>
    </div>
  </div>
);

const FitnessGuide = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-6 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto pt-4">
          <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-xl mb-2 border border-brand-orange/20 shadow-[0_0_30px_rgba(255,126,51,0.06)]">
            <BookOpen className="w-8 h-8 text-brand-orange" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Fitness <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff4b1f]">Tutorials</span>
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Elevate your training with our comprehensive guide to bodyweight mastery.
          </p>
        </div>

        <div className="space-y-12 pb-8">
          {/* Push-ups Section */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-l-4 border-brand-orange pl-4">
              <h2 className="text-xl font-semibold text-white tracking-tight">Push-up Variations</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {tutorials.pushups.map((tut, idx) => (
                <GuideCard key={idx} tutorial={tut} />
              ))}
            </div>
          </section>

          {/* Squats Section */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-l-4 border-brand-orange pl-4">
              <h2 className="text-xl font-semibold text-white tracking-tight">Squat Variations</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {tutorials.squats.map((tut, idx) => (
                <GuideCard key={idx} tutorial={tut} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FitnessGuide;
