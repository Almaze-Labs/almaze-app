"use client";
import { useState } from "react";
import { TypingAnimation } from "@/components/home/magicui/typing-animation";
import { motion, AnimatePresence } from "framer-motion";

export default function TokenomicsSection() {
  const [activeState, setActiveState] = useState<number>(1);

  const handleStateChange = (state: number) => {
    setActiveState(state);
  };

  const tabs = [
    {
      id: 1,
      color: "#1DA2FF",
      title: "CIRCULATING SUPPLY",
      percentage: "95%",
      content: {
        title: "CIRCULATING SUPPLY (95%)",
        background: "tokenomics-section-bg.png",
        text: "The circulating supply represents the total amount of tokens that are currently available in the market. This ensures liquidity and accessibility for all participants. Our commitment to transparency and fairness is reflected in the high percentage of tokens allocated for circulation.",
        bullets: [
          "Ensures liquidity and accessibility for all participants.",
          "Reflects our commitment to transparency and fairness.",
          "Supports the growth and sustainability of our community."
        ]
      }
    },
    {
      id: 2,
      color: "#FBBC05",
      title: "TEAM ALLOCATIONS",
      percentage: "2%",
      content: {
        title: "TEAM ALLOCATIONS (2%)",
        background: "tokenomics-section-bg-2.png",
        text: "The team allocation represents a small portion of the total supply, dedicated to rewarding the team for their hard work and commitment. This ensures that the team remains motivated and aligned with the project's long-term goals.",
        bullets: [
          "Rewards the team for their dedication and hard work.",
          "Aligns the team's interests with the project's success.",
          "Supports the ongoing development and growth of the project."
        ]
      }
    },
    {
      id: 3,
      color: "#EA4335",
      title: "MARKETING OPERATIONS",
      percentage: "1%",
      content: {
        title: "MARKETING OPERATIONS (1%)",
        background: "tokenomics-section-bg-3.png",
        text: "The marketing operations allocation is dedicated to promoting our project and expanding our reach. This ensures that we can effectively communicate our vision and attract new participants.",
        bullets: [
          "Supports promotional activities and campaigns.",
          "Helps in expanding our community and user base.",
          "Ensures effective communication of our project's vision and goals."
        ]
      }
    },
    {
      id: 4,
      color: "#2AD458",
      title: "TREASURY",
      percentage: "2%",
      content: {
        title: "TREASURY (2%)",
        background: "tokenomics-section-bg-4.png",
        text: "The treasury allocation is reserved for the long-term sustainability and growth of the project. This fund will be used for future development, partnerships, and unforeseen expenses.",
        bullets: [
          "Ensures the project's long-term sustainability and growth.",
          "Provides funds for future development and partnerships.",
          "Covers unforeseen expenses and emergencies."
        ]
      }
    }
  ];

  return (
    <section id="tokenomics" className="pt-36">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="mx-auto container max-w-[1128px] px-8 flex flex-col items-center"
      >
        <p className="font-serif text-sm uppercase text-center text-[#1DA2FF]">
          Tokenomics
        </p>

        <h2 className="my-4 max-w-[450px] min-h-[96px] font-offbit text-5xl text-center uppercase text-[#1DA2FF]">
          <TypingAnimation startOnView = {false}>GREAT TOKENS SIMPLE TOKENOMICS</TypingAnimation>
        </h2>

        <p className="mb-12 font-medium text-center text-[#001A2C]">
          Discover the transparent and fair distribution of our tokens, designed to ensure <br /> sustainability and growth for our community.
        </p>

        <div className="w-full border border-[#eee] bg-white rounded-xl">
          <div className="border-b border-[#eee] grid grid-cols-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => handleStateChange(tab.id)}
                className={`border-r border-[#eee] py-5 px-7 cursor-pointer transition-all duration-300 
                ${activeState === tab.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="w-[15px] h-[15px] rounded block"
                    style={{ backgroundColor: tab.color }}
                  />
                  <p className="text-sm font-medium uppercase text-[#001A2C]">
                    {tab.title}
                  </p>
                </div>
                <h3
                  className="font-offbit text-5xl uppercase transition-all duration-300 "
                  style={{ color: tab.color }}
                >
                  {tab.percentage}
                </h3>
              </div>
            ))}
          </div>

          <div className="p-5">
            <div className="relative font-offbit h-[280px] overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                {tabs.map((tab) => (
                  activeState === tab.id && (
                    <motion.div
                      key={tab.id}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        duration: 0.3
                      }}
                      className="absolute inset-0 p-8 rounded-xl"
                      style={{
                        background: `url('/images/${tab.content.background}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: "#1DA2FF",
                      }}
                    >
                      <h4 className="mb-1.5 text-3xl uppercase text-white">
                        {tab.content.title}
                      </h4>
                      <div className="text-sm font-serif leading-[24px] text-white space-y-4">
                        <p>{tab.content.text}</p>
                        <ul className="space-y-1">
                          {tab.content.bullets.map((bullet, index) => (
                            <li key={index}>• {bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}