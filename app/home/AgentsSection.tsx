"use client";
import { useRef } from "react";
import { JSX } from "react/jsx-runtime";
import Image from "next/image";
import img1 from "@/public/assets/images/agents-section-1.png"
import { TypingAnimation } from "@/components/home/magicui/typing-animation";
import { AnimatedBeam } from "@/components/home/magicui/animated-beam";
import { motion } from "framer-motion";

interface IAgent {
  icon: JSX.Element;
  color: string;
  title: string;
  description: string;
}

export default function AgentsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  const agents: IAgent[] = [
    {
      icon: (
        <svg
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 33C25.4558 33 31.5 26.9558 31.5 19.5C31.5 12.0442 25.4558 6 18 6C10.5442 6 4.5 12.0442 4.5 19.5C4.5 26.9558 10.5442 33 18 33Z"
            stroke="#30A5FF"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M18 5.25V3"
            stroke="#30A5FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 3H21"
            stroke="#30A5FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.1592 15.3856C23.2592 16.4755 21.4992 25.3399 19.6934 25.4961C18.1784 25.6272 17.7062 22.6392 17.3871 21.6921C17.0723 20.7574 16.7217 20.4208 15.7947 20.1142C13.4398 19.3351 12.2624 18.9456 12.0293 18.3288C11.4119 16.6956 20.7543 13.9935 22.1592 15.3856Z"
            stroke="#30A5FF"
            strokeWidth="2.25"
          />
        </svg>
      ),
      color: "#30A5FF",
      title: "Compass",
      description:
        "The core intelligence of ALMAZE, guiding tasks and agents to achieve user goals effectively.",
    },
    {
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 33H33"
            stroke="#FFBA17"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M27 13.5H21C17.277 13.5 16.5 14.277 16.5 18V33H31.5V18C31.5 14.277 30.723 13.5 27 13.5Z"
            stroke="#FFBA17"
            strokeWidth="2.25"
            strokeLinejoin="round"
          />
          <path
            d="M22.5 33H4.5V7.5C4.5 3.777 5.277 3 9 3H18C21.723 3 22.5 3.777 22.5 7.5V13.5"
            stroke="#FFBA17"
            strokeWidth="2.25"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 9H9M4.5 15H9M4.5 21H9"
            stroke="#FFBA17"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M22.5 19.5H25.5M22.5 24H25.5"
            stroke="#FFBA17"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M24 33V28.5"
            stroke="#FFBA17"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#FFBA17",
      title: "Architect",
      description:
        "Designs and maintains agents, ensuring the maze evolves efficiently to tackle new challenges.",
    },
    {
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.5 16.5L27 9" stroke="#FF5C3D" strokeWidth="2.25" />
          <path
            d="M28.5 10.5L25.5 7.5L29.25 5.25L30.75 6.75L28.5 10.5Z"
            stroke="#FF5C3D"
            strokeWidth="2.25"
            strokeLinejoin="round"
          />
          <path
            d="M6.03769 13.4623C4.52124 11.9459 4.12642 9.73254 4.85322 7.85322L6.98622 9.98622H9.98622V6.98622L7.85322 4.85322C9.73254 4.12642 11.9459 4.52124 13.4623 6.03769C14.9793 7.5547 15.3739 9.76911 14.646 11.6489L24.3511 21.354C26.2309 20.626 28.4452 21.0207 29.9623 22.5376C31.4787 24.0541 31.8736 26.2674 31.1467 28.1467L29.0137 26.0137H26.0137V29.0137L28.1467 31.1467C26.2674 31.8736 24.0541 31.4787 22.5376 29.9623C21.0217 28.4464 20.6266 26.2342 21.3523 24.3553L11.6447 14.6476C9.76579 15.3733 7.55356 14.9782 6.03769 13.4623Z"
            stroke="#FF5C3D"
            strokeWidth="2.25"
            strokeLinejoin="round"
          />
          <path
            d="M18.3045 21.75L9.89845 30.1561C9.10672 30.9478 7.8231 30.9478 7.03137 30.1561L5.84379 28.9686C5.05207 28.1769 5.05207 26.8932 5.84379 26.1015L14.2499 17.6953"
            stroke="#FF5C3D"
            strokeWidth="2.25"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#FF5C3D",
      title: "Tool Smith",
      description:
        "The creator of resources, Toolsmith crafts and refines the instruments agents need to navigate the maze of tasks effectively.",
    },
    {
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.25 26.25L33 33"
            stroke="#9700F4"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 16.5C30 9.04416 23.9559 3 16.5 3C9.04416 3 3 9.04416 3 16.5C3 23.9559 9.04416 30 16.5 30C23.9559 30 30 23.9559 30 16.5Z"
            stroke="#9700F4"
            strokeWidth="2.25"
            strokeLinejoin="round"
          />
          <path
            d="M14.2386 11.25C13.1639 11.3151 12.4799 11.4943 11.9871 11.9871C11.4943 12.4799 11.3151 13.1639 11.25 14.2386M18.7614 11.25C19.8361 11.3151 20.5202 11.4943 21.0129 11.9871C21.5057 12.4799 21.6849 13.1639 21.75 14.2386M21.7385 18.9321C21.6647 19.9095 21.4791 20.5467 21.0129 21.0129C20.5202 21.5057 19.8361 21.6849 18.7614 21.75M14.2386 21.75C13.1639 21.6849 12.4799 21.5057 11.9871 21.0129C11.5209 20.5467 11.3354 19.9095 11.2616 18.9321"
            stroke="#9700F4"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#9700F4",
      title: "Scout",
      description:
        "Maps knowledge and explores information, providing essential data for informed decision-making within the maze.",
    },
  ];

  return (
    <section className="pt-36">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="mx-auto container max-w-[1128px] px-8 flex flex-col items-center"
      >
        <p className="font-serif text-sm uppercase text-center text-[#1DA2FF]">
          Agents
        </p>
        <h2 className="my-4 min-h-[48px] font-offbit text-5xl text-center uppercase text-[#1DA2FF]">
          <TypingAnimation startOnView={false}> 4 AGENTS POWERING ALMAZE</TypingAnimation>
        </h2>

        <p className="mb-12 font-medium text-center text-[#001A2C]">
            <span className="text-base">Meet the core agents driving ALMAZE</span>
            <br />
        </p>

          <div ref={logoRef} className="relative z-10 mb-56 flex">
            <Image src={img1} alt="" className="w-[86px]" />
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={logoRef}
            duration={3}
            curvature={350}
            reverse
            pathColor="#30A5FF"
            gradientStartColor="#30A5FF"
            gradientStopColor="#30A5FF"
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={logoRef}
            toRef={div2Ref}
            duration={3}
            reverse
            pathColor="#FFBA17"
            gradientStartColor="#FFBA17"
            gradientStopColor="#FFBA17"
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={logoRef}
            toRef={div3Ref}
            duration={3}
            pathColor="#FF5C3D"
            gradientStartColor="#FF5C3D"
            gradientStopColor="#FF5C3D"
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div4Ref}
            toRef={logoRef}
            duration={3}
            curvature={350}
            pathColor="#9700F4"
            gradientStartColor="#9700F4"
            gradientStopColor="#9700F4"
          />

          <div className="relative z-10 grid grid-cols-4 gap-4">
            {agents.map((agent, index) => {
              return (
                <div
                  key={index}
                  ref={
                    index === 0
                      ? div1Ref
                      : index === 1
                      ? div2Ref
                      : index === 2
                      ? div3Ref
                      : div4Ref
                  }
                  className="p-6 border border-[#eee] bg-white rounded-xl flex flex-col items-center gap-2.5"
                >
                  {agent.icon}

                  <h3
                    className="font-offbit text-2xl font-semibold uppercase text-center"
                    style={{
                      color: agent.color,
                    }}
                  >
                    {agent.title}
                  </h3>

                  <p className="text-sm text-center text-[#001A2C]/75">
                    {agent.description}
                  </p>
                </div>
              );
            })}
        </div>
      </motion.div>
    </section>
  );
}
