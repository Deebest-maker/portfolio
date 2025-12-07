import { Code, Sparkles, Rocket, Trophy } from "lucide-react";

export default function Experience() {
  const journey = [
    {
      year: "2024",
      icon: Trophy,
      title: "Self-Taught Developer Journey",
      description:
        "Mastered blockchain development, AI/ML, and full-stack technologies through intensive self-learning.",
      highlights: [
        "Built production-ready smart contracts on Ethereum",
        "Developed AI stock forecasting model",
        "Created full-stack DApps with React and Solidity",
      ],
      color: "toxic-green",
    },
    {
      year: "2023-2024",
      icon: Code,
      title: "Blockchain & DeFi Specialization",
      description:
        "Deep dive into Web3 technologies, focusing on Solidity, smart contract security, and DeFi protocols.",
      highlights: [
        "Mastered Solidity, Foundry, and Vyper",
        "Implemented zkSync and zero-knowledge proofs",
        "Built decentralized raffle and crowdfunding systems",
      ],
      color: "electric-blue",
    },
    {
      year: "2023",
      icon: Sparkles,
      title: "AI & Data Science",
      description:
        "Entered the world of artificial intelligence and machine learning, focusing on practical applications.",
      highlights: [
        "Built predictive ML models",
        "Specialized in prompt engineering",
        "Applied data analysis to real-world problems",
      ],
      color: "purple-500",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-dark-card to-dark-bg py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            My <span className="text-electric-blue">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Self-taught. Self-driven. Unstoppable.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-toxic-green via-electric-blue to-purple-500"></div>

          <div className="space-y-12">
            {journey.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative pl-20">
                  {/* Timeline Icon */}
                  <div
                    className={`absolute left-0 w-16 h-16 bg-dark-bg border-4 border-${item.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent className={`w-8 h-8 text-${item.color}`} />
                  </div>

                  {/* Content Card */}
                  <div className="bg-dark-bg/50 backdrop-blur-sm border border-electric-blue/20 rounded-xl p-6 hover:border-toxic-green/50 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-3">
                      <span
                        className={`text-${item.color} font-bold text-xl px-4 py-1 bg-${item.color}/10 rounded-full`}
                      >
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <ul className="space-y-2">
                      {item.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-electric-blue mt-1">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End of Timeline */}
          <div className="relative pl-20 mt-8">
            <div className="absolute left-0 w-16 h-16 bg-dark-bg border-4 border-toxic-green rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Rocket className="w-8 h-8 text-toxic-green" />
            </div>
            <div className="bg-gradient-to-r from-electric-blue/10 to-toxic-green/10 border border-toxic-green/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                What's Next?
              </h3>
              <p className="text-gray-300">
                Seeking scholarship opportunities to further advance my
                expertise in emerging technologies and contribute to
                groundbreaking projects in Web3 and AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
