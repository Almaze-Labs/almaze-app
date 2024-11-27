"use client";
import { JSX } from "react/jsx-runtime";
import { TypingAnimation } from "@/components/home/magicui/typing-animation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface IFeature {
  icon: JSX.Element;
  title: string;
  description: JSX.Element;
}

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features: IFeature[] = [
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
            d="M21.2559 31.3359C27.5304 30.9189 32.5284 25.8499 32.9397 19.4865C33.0201 18.2412 33.0201 16.9515 32.9397 15.7062C32.5284 9.34269 27.5304 4.27382 21.2559 3.85673C19.1152 3.71444 16.8804 3.71474 14.7441 3.85673C8.46958 4.27382 3.47161 9.34269 3.06036 15.7062C2.97988 16.9515 2.97988 18.2412 3.06036 19.4865C3.21015 21.8041 4.23514 23.95 5.44186 25.762C6.14251 27.0306 5.68011 28.6138 4.95031 29.9968C4.42411 30.994 4.16101 31.4926 4.37226 31.8528C4.58352 32.2129 5.05539 32.2245 5.99914 32.2474C7.8655 32.2929 9.12402 31.7637 10.123 31.027C10.6896 30.6093 10.9729 30.4003 11.1682 30.3763C11.3634 30.3523 11.7477 30.5106 12.516 30.8271C13.2066 31.1115 14.0084 31.287 14.7441 31.3359C16.8804 31.4779 19.1152 31.4782 21.2559 31.3359Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinejoin="round"
          />
          <path
            d="M15.7305 10.5016V13.4701M10.5 15.7522H13.578M22.5346 15.7522H25.6125M22.5346 20.212H25.6125M10.5 20.212H13.578M15.7305 22.5304V25.4989M20.2687 22.5304V25.4989M20.2526 10.5016V13.4701M15.078 22.4529H21.0346C21.8629 22.4529 22.5346 21.7813 22.5346 20.9529V14.9701C22.5346 14.1417 21.8629 13.4701 21.0346 13.4701H15.078C14.2495 13.4701 13.578 14.1417 13.578 14.9701V20.9529C13.578 21.7813 14.2495 22.4529 15.078 22.4529Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Problem Solver",
      description: (
        <>
          • Understands context and nuances<br />
          • Adapts strategies in real-time<br />
          • Provides clear, actionable guidance
        </>
      ),
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
            d="M11.25 6.75024C8.76473 6.75024 6.75 8.76497 6.75 11.2502C6.75 12.1032 6.98733 12.9008 7.39956 13.5805C5.32091 13.9781 3.75 15.8057 3.75 18.0002C3.75 20.1947 5.32091 22.0225 7.39956 22.42M11.25 6.75024C11.25 4.67918 12.9289 3.00024 15 3.00024C17.071 3.00024 18.75 4.67918 18.75 6.75024V9.00024M11.25 6.75024C11.25 7.97711 11.8392 9.06636 12.75 9.75053M7.39956 22.42C6.98733 23.0998 6.75 23.8973 6.75 24.7502C6.75 27.2356 8.76473 29.2502 11.25 29.2502C11.25 31.3213 12.9289 33.0002 15 33.0002C17.071 33.0002 18.75 31.3213 18.75 29.2502V27.0002M7.39956 22.42C7.93422 21.5384 8.7631 20.8552 9.75 20.5063"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.25 13.5001H23.25C21.8358 13.5001 21.1287 13.5001 20.6894 13.9395C20.25 14.3788 20.25 15.0859 20.25 16.5001V19.5001C20.25 20.9143 20.25 21.6214 20.6894 22.0608C21.1287 22.5001 21.8358 22.5001 23.25 22.5001H26.25C27.6642 22.5001 28.3713 22.5001 28.8106 22.0608C29.25 21.6214 29.25 20.9143 29.25 19.5001V16.5001C29.25 15.0859 29.25 14.3788 28.8106 13.9395C28.3713 13.5001 27.6642 13.5001 26.25 13.5001Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.5 22.5001V25.5001M27 22.5001V25.5001M22.5 10.5001V13.5001M27 10.5001V13.5001M20.25 15.7501H17.25M20.25 20.2501H17.25M32.25 15.7501H29.25M32.25 20.2501H29.25"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
            ),
            title: "System Architect",
            description: (
        <>
          • Develops scalable solutions<br />
          • Optimizes performance<br />
          • Ensures system reliability
        </>
            ),
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
            d="M28.5 18.0001C28.5 16.7575 29.5074 15.7501 30.75 15.7501C31.9926 15.7501 33 16.7575 33 18.0001C33 19.2427 31.9926 20.2501 30.75 20.2501C29.5074 20.2501 28.5 19.2427 28.5 18.0001Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
          />
          <path
            d="M3 18.0001C3 16.7575 4.00736 15.7501 5.25 15.7501C6.49264 15.7501 7.5 16.7575 7.5 18.0001C7.5 19.2427 6.49264 20.2501 5.25 20.2501C4.00736 20.2501 3 19.2427 3 18.0001Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
          />
          <path
            d="M20.5606 15.4395C20.1213 15.0001 19.4142 15.0001 18 15.0001C16.5858 15.0001 15.8787 15.0001 15.4394 15.4395M20.5606 15.4395C21 15.8788 21 16.5859 21 18.0001C21 19.4143 21 20.1214 20.5606 20.5608M15.4394 15.4395C15 15.8788 15 16.5859 15 18.0001C15 19.4143 15 20.1214 15.4394 20.5608M15.4394 20.5608C15.8787 21.0001 16.5858 21.0001 18 21.0001C19.4142 21.0001 20.1213 21.0001 20.5606 20.5608"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31.0606 3.43946C30.6213 3.00012 29.9142 3.00012 28.5 3.00012C27.0858 3.00012 26.3787 3.00012 25.9394 3.43946M31.0606 3.43946C31.5 3.87881 31.5 4.58591 31.5 6.00012C31.5 7.41434 31.5 8.12144 31.0606 8.56079M25.9394 3.43946C25.5 3.87881 25.5 4.58591 25.5 6.00012C25.5 7.41434 25.5 8.12144 25.9394 8.56079M25.9394 8.56079C26.3787 9.00012 27.0858 9.00012 28.5 9.00012C29.9142 9.00012 30.6213 9.00012 31.0606 8.56079"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.0607 27.4395C9.62131 27.0001 8.91421 27.0001 7.5 27.0001C6.08579 27.0001 5.37869 27.0001 4.93934 27.4395M10.0607 27.4395C10.5 27.8788 10.5 28.5859 10.5 30.0001C10.5 31.4143 10.5 32.1214 10.0607 32.5608M4.93934 27.4395C4.5 27.8788 4.5 28.5859 4.5 30.0001C4.5 31.4143 4.5 32.1214 4.93934 32.5608M4.93934 32.5608C5.37869 33.0001 6.08579 33.0001 7.5 33.0001C8.91421 33.0001 9.62131 33.0001 10.0607 32.5608"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 18.0001H15"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 18.0001H28.5"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 15.0001C18 12.0001 19.25 6.00012 25.5 6.00012"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 21.0001C18 24.0001 16.75 30.0001 10.5 30.0001"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
            ),
            title: "Tool Crafter",
            description: (
        <>
          • Creates custom solutions<br />
          • Enhances existing tools<br />
          • Maintains tool efficiency
        </>
            ),
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
            d="M31.9762 10.7122L31.2358 9.42731C30.6759 8.45557 30.396 7.9697 29.9196 7.77595C29.4432 7.58221 28.9044 7.73509 27.8269 8.04085L25.9966 8.5564C25.3087 8.71504 24.5869 8.62504 23.9589 8.30231L23.4535 8.01076C22.9149 7.66577 22.5006 7.15712 22.2712 6.55924L21.7704 5.06317C21.441 4.07314 21.2763 3.57812 20.8842 3.29498C20.4922 3.01184 19.9714 3.01184 18.9298 3.01184H17.2576C16.2162 3.01184 15.6954 3.01184 15.3033 3.29498C14.9113 3.57812 14.7466 4.07314 14.4172 5.06317L13.9163 6.55924C13.687 7.15712 13.2727 7.66577 12.7341 8.01076L12.2287 8.30231C11.6006 8.62504 10.8789 8.71504 10.191 8.5564L8.36062 8.04085C7.28311 7.73509 6.74437 7.58221 6.268 7.77595C5.79163 7.9697 5.51167 8.45557 4.95172 9.42731L4.21135 10.7122C3.68649 11.6231 3.42405 12.0785 3.47499 12.5634C3.52591 13.0482 3.87724 13.4389 4.57989 14.2203L6.12645 15.9493C6.50445 16.4278 6.77281 17.2618 6.77281 18.0117C6.77281 18.7618 6.50454 19.5955 6.12649 20.0742L4.57989 21.8032C3.87724 22.5847 3.52593 22.9753 3.47499 23.4603C3.42405 23.9451 3.68649 24.4005 4.21135 25.3113L4.95171 26.5962C5.51164 27.5679 5.79163 28.0539 6.268 28.2475C6.74437 28.4413 7.28313 28.2885 8.36065 27.9826L10.1909 27.4671C10.8789 27.3084 11.6008 27.3985 12.229 27.7213L12.7342 28.0129C13.2728 28.3579 13.687 28.8664 13.9162 29.4643L14.4172 30.9606C14.7466 31.9506 14.9113 32.4456 15.3033 32.7288C15.6954 33.0118 16.2162 33.0118 17.2576 33.0118H18.9298C19.9714 33.0118 20.4922 33.0118 20.8842 32.7288C21.2763 32.4456 21.441 31.9506 21.7704 30.9606L22.2714 29.4643C22.5006 28.8664 22.9147 28.3579 23.4534 28.0129L23.9586 27.7213C24.5868 27.3985 25.3086 27.3084 25.9966 27.4671L27.8269 27.9826C28.9044 28.2885 29.4432 28.4413 29.9196 28.2475C30.396 28.0539 30.6759 27.5679 31.2358 26.5962L31.9762 25.3113C32.5011 24.4005 32.7634 23.9451 32.7126 23.4603C32.6616 22.9753 32.3103 22.5847 31.6077 21.8032L30.061 20.0742C29.683 19.5955 29.4147 18.7618 29.4147 18.0117C29.4147 17.2618 29.6832 16.4278 30.061 15.9493L31.6077 14.2203C32.3103 13.4389 32.6616 13.0482 32.7126 12.5634C32.7634 12.0785 32.5011 11.6231 31.9762 10.7122Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
            d="M12.75 24.0001C13.7979 22.1885 15.7566 20.9696 18 20.9696C20.2433 20.9696 22.202 22.1885 23.25 24.0001M21 14.2501C21 15.907 19.6569 17.2501 18 17.2501C16.3431 17.2501 15 15.907 15 14.2501C15 12.5933 16.3431 11.2501 18 11.2501C19.6569 11.2501 21 12.5933 21 14.2501Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
        </svg>
            ),
            title: "Insight Explorer",
            description: (
        <>
          • Researches comprehensively<br />
          • Validates information<br />
          • Synthesizes findings
        </>
            ),
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
            d="M7.98257 14.5245C11.6031 8.1181 13.4133 4.91488 15.8975 4.09033C17.264 3.63672 18.7361 3.63672 20.1026 4.09033C22.5867 4.91488 24.3969 8.1181 28.0175 14.5245C31.638 20.9309 33.4482 24.1341 32.9052 26.7441C32.6064 28.1801 31.8704 29.4824 30.8025 30.4647C28.8615 32.2502 25.2411 32.2502 18 32.2502C10.759 32.2502 7.13846 32.2502 5.19745 30.4647C4.12963 29.4824 3.39359 28.1801 3.09484 26.7441C2.55179 24.1341 4.36205 20.9309 7.98257 14.5245Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
          />
          <path
            d="M18.3633 25.5001V19.5001C18.3633 18.793 18.3633 18.4395 18.1435 18.2197C17.9239 18.0001 17.5704 18.0001 16.8633 18.0001"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.988 13.5001H18.0015"
            stroke="#1DA2FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
            ),
            title: "Logic Weaver",
            description: (
        <>
          • Analyzes relationships<br />
          • Builds logical frameworks<br />
          • Creates innovative solutions
        </>
            ),
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
            d="M19.5 4.50359C18.7949 4.50012 18.0461 4.50012 17.25 4.50012C10.5325 4.50012 7.17373 4.50012 5.08686 6.58698C3 8.67386 3 12.0326 3 18.7501C3 25.4676 3 28.8264 5.08686 30.9133C7.17373 33.0001 10.5325 33.0001 17.25 33.0001C23.9675 33.0001 27.3263 33.0001 29.4132 30.9133C31.5 28.8264 31.5 25.4676 31.5 18.7501C31.5 17.9541 31.5 17.2053 31.4965 16.5001"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M27.75 3.00012L28.1369 4.04567C28.6442 5.41665 28.8978 6.10215 29.3979 6.60221C29.898 7.10228 30.5835 7.35593 31.9545 7.86324L33 8.25012L31.9545 8.637C30.5835 9.14432 29.898 9.39798 29.3979 9.89804C28.8978 10.3981 28.6442 11.0836 28.1369 12.4546L27.75 13.5001L27.3631 12.4546C26.8558 11.0836 26.6022 10.3981 26.1021 9.89804C25.602 9.39798 24.9165 9.14432 23.5455 8.637L22.5 8.25012L23.5455 7.86324C24.9165 7.35593 25.602 7.10228 26.1021 6.60221C26.6022 6.10215 26.8558 5.41665 27.3631 4.04567L27.75 3.00012Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 26.2501C13.9976 22.5868 20.4648 22.4143 24 26.2501M20.9927 15.0001C20.9927 17.0712 19.3113 18.7501 17.2372 18.7501C15.1633 18.7501 13.482 17.0712 13.482 15.0001C13.482 12.9291 15.1633 11.2501 17.2372 11.2501C19.3113 11.2501 20.9927 12.9291 20.9927 15.0001Z"
            stroke="#1DA2FF"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Integration Architect",
      description: (
        <>
          • Coordinates operations<br />
          • Enhances compatibility<br />
          • Optimizes workflows
        </>
      ),
    },
  ];

  return (
    <section id="features" className="pt-36">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="mx-auto container max-w-[1128px] px-8 flex flex-col items-center"
      >
        <p className="font-serif text-sm uppercase text-center text-[#1DA2FF]">
          Features
        </p>

        <h2 className="my-4 max-w-[500px] min-h-[96px] font-offbit text-5xl text-center uppercase text-[#1DA2FF]">
          <TypingAnimation startOnView={false}>
            ALMAZE IS LOADED WITH FEATURES
          </TypingAnimation>
        </h2>

        <p className="mb-12 font-medium text-center text-[#001A2C]">
          Discover the powerful features that make Almaze your ultimate AI companion. <br />
          From problem-solving to system optimization, explore what Almaze can do for you.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-[#1DA2FF]/5 block rounded-xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>

              <div 
                className="p-8 border-2 border-gray-100 bg-white rounded-2xl flex flex-col gap-4 relative z-20 h-full transition-all duration-300 group-hover:border-[#1DA2FF]/20 group-hover:shadow-lg"
              >
                <div className="p-3 bg-blue-50 rounded-xl w-fit">
                  {feature.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-offbit text-[#001A2C] tracking-wide">
                    {feature.title}
                  </h3>
                  <div className="h-px w-12 bg-[#1DA2FF]"></div>
                  <p className="text-sm leading-relaxed text-[#001A2C]/75 font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
