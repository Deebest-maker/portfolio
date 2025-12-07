"use client";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumeDownload() {
  const generateResume = () => {
    const resumeContent = `
TOMA HAMIDU HARUNA
Blockchain & AI Developer | Full-Stack Engineer
thmsharuna@gmail.com | Nigeria
GitHub: github.com/Deebest-maker | LinkedIn: linkedin.com/in/thomas-haruna-07a75a349

PROFESSIONAL SUMMARY
Self-taught developer specializing in blockchain technology, artificial intelligence, and full-stack development. 
Passionate about building decentralized applications and intelligent systems. 
Seeking scholarship opportunities to advance technical education and contribute to emerging technologies.

TECHNICAL SKILLS

Blockchain & Web3:
- Solidity (Smart Contracts)
- Foundry (Testing & Development)
- Vyper, Rust, Noir
- zkSync Technology
- DeFi Protocol Design
- Smart Contract Security

AI & Data Science:
- Machine Learning
- AI Model Development
- Stock Market Forecasting
- Prompt Engineering
- Python for AI/ML
- Data Analysis & Visualization

Full-Stack Development:
- JavaScript/TypeScript
- React & Next.js
- Nest.js (Backend)
- HTML5 & CSS3
- Node.js
- RESTful APIs

Mobile Development:
- Flutter
- Cross-Platform Apps
- Mobile UI/UX

FEATURED PROJECTS

AI Stock Price Forecasting System
- Machine learning model leveraging temporal analysis to forecast stock price movements
- Technologies: Python, TensorFlow, Pandas, Data Analysis
- Status: Deployed & Production Ready

DeFi Raffle Smart Contract
- Provably fair decentralized lottery system using Chainlink VRF for verifiable randomness
- Technologies: Solidity, Foundry, Chainlink VRF, Ethereum
- Features: Automated winner selection, transparent fund distribution, gas optimization
- Status: Deployed on Mainnet

FundMe DApp
- Decentralized crowdfunding platform with Ethereum integration
- Technologies: Solidity, React, Web3.js, MetaMask, Foundry
- Features: Real-time funding tracking, transparent donations
- Status: Production Ready

Simple Storage Contract
- Gas-efficient smart contract demonstrating blockchain storage patterns
- Technologies: Solidity, Foundry, Ethereum
- Status: Live on Testnet

EXPERIENCE & LEARNING JOURNEY

Self-Taught Developer (2023 - Present)
- Mastered blockchain development, AI/ML, and full-stack technologies through intensive self-learning
- Built production-ready smart contracts on Ethereum
- Developed AI stock forecasting model
- Created full-stack DApps with React and Solidity

Blockchain & DeFi Specialization (2023-2024)
- Deep dive into Web3 technologies and DeFi protocols
- Mastered Solidity, Foundry, and Vyper
- Implemented zkSync and zero-knowledge proofs
- Built decentralized raffle and crowdfunding systems

AI & Data Science (2023)
- Entered artificial intelligence and machine learning
- Built predictive ML models
- Specialized in prompt engineering
- Applied data analysis to real-world problems

EDUCATION
Seeking scholarship for Bachelor's degree in Computer Science/Software Engineering
Self-taught through online courses, documentation, and hands-on projects

ADDITIONAL INFORMATION
- Languages: English (Fluent)
- Location: Nigeria
- Availability: Open to opportunities and collaborations
- Self-motivated learner with strong problem-solving skills
- Passionate about emerging technologies and innovation

REFERENCES
Available upon request
    `;

    // Create blob and download
    const blob = new Blob([resumeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Toma_Hamidu_Haruna_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.button
      onClick={generateResume}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-6 py-3 bg-dark-card border-2 border-electric-blue text-electric-blue font-bold rounded-xl hover:bg-electric-blue hover:text-dark-bg transition-all shadow-lg shadow-electric-blue/20"
    >
      <Download className="w-5 h-5" />
      Download Resume
    </motion.button>
  );
}
