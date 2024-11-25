"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from 'next/navigation';
import { TypingAnimation } from "@/components/home/magicui/typing-animation";
import { InteractiveGridPattern } from "@/components/home/magicui/interactive-grid-pattern";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
// import bgImg from "@/assets/images/hero-section-bg.png";
import img1 from "@/public/assets/images/hero-section-1.png";


export default function HeroSection() {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const privy = usePrivy();
  const router = useRouter();
  const handleLogin = useCallback(() => privy.login(), [privy]);
  const [CA, setCA] = useState("");

  useEffect(() => {
    axios.get("https://catools.dev3vds1.link/get/almaze-labs")
      .then(response => {
        const data = response.data
        if (data) {
          // console.log(`this is the data addr : ${data.address}`)
          setCA(data.address);

        }
      })
      .catch(error => {
        console.error("Error fetching CA:", error);
      });
  }, []);

  useEffect(() => {
    if (privy?.ready) {
      if (privy.authenticated) {
        localStorage.setItem('useremail', privy.user?.email?.address ?? "Guest");
        Cookies.set('privy-authenticated', 'true', { path: '/', expires: 1 });
        router.push('/dashboard');
      }
    }
  }, [privy.ready, privy.authenticated, router]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  });

  

  return (
    <section className="relative pt-56">
      <div className="relative z-10 mx-auto container max-w-[1128px] px-8 flex flex-col items-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="mb-6 h-[42px] px-1.5 border border-white/50 rounded-md flex items-center"
        >
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                CA
              );
              setIsCopied(true);
            }}
            className="py-1.5 px-5 bg-[#001A2C] rounded-full flex items-center gap-2 text-sm font-medium text-white"
          >
            CA :{" "}
            {isCopied
              ? "Copied!"
              : CA}
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_771)">
                <path
                  d="M5.68437 5.91912V4.13412C5.68437 3.42005 5.68437 3.06301 5.82334 2.79028C5.94558 2.55037 6.14063 2.35532 6.38054 2.23308C6.65327 2.09412 7.01031 2.09412 7.72437 2.09412H12.5694C13.2834 2.09412 13.6405 2.09412 13.9132 2.23308C14.1531 2.35532 14.3482 2.55037 14.4704 2.79028C14.6094 3.06301 14.6094 3.42005 14.6094 4.13412V8.97912C14.6094 9.69318 14.6094 10.0502 14.4704 10.323C14.3482 10.5629 14.1531 10.7579 13.9132 10.8801C13.6405 11.0191 13.2834 11.0191 12.5694 11.0191H10.7844M3.89937 14.8441H8.74437C9.45844 14.8441 9.8155 14.8441 10.0882 14.7051C10.3281 14.5829 10.5232 14.3879 10.6454 14.148C10.7844 13.8752 10.7844 13.5182 10.7844 12.8041V7.95912C10.7844 7.24505 10.7844 6.88801 10.6454 6.61528C10.5232 6.37537 10.3281 6.18032 10.0882 6.05808C9.8155 5.91912 9.45844 5.91912 8.74437 5.91912H3.89937C3.18531 5.91912 2.82827 5.91912 2.55554 6.05808C2.31563 6.18032 2.12058 6.37537 1.99834 6.61528C1.85937 6.88801 1.85938 7.24505 1.85938 7.95912V12.8041C1.85938 13.5182 1.85937 13.8752 1.99834 14.148C2.12058 14.3879 2.31563 14.5829 2.55554 14.7051C2.82827 14.8441 3.1853 14.8441 3.89937 14.8441Z"
                  stroke="white"
                  strokeWidth="1.275"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_771">
                  <rect
                    width="15.3"
                    height="15.3"
                    fill="white"
                    transform="translate(0.584351 0.81897)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </motion.div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-3 max-w-[950px] min-h-[120px] font-offbit text-6xl text-center uppercase text-[#1DA2FF]"
        >
          
          <TypingAnimation startOnView = {false}>
            SELF EVOLVING AGI THAT HELPS YOU COMPLETE MUNDANE TASKS
          </TypingAnimation>
        </motion.h1>

        <motion.p
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          viewport={{ once: true }}
          className="mb-6 text-lg font-medium text-center text-[#001A2C]"
        >
          The autoagentic AGI. Almaze is a self-evolving AGI made of agents that
          collaborate, and build new agents <br /> as needed, in order to
          complete tasks for a user.
        </motion.p>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
          className="mb-14 flex items-center gap-4"
        >
          <div className="h-[42px] px-1.5 border border-[#001A2C]/10 rounded-md flex items-center">
            <button className="py-1.5 px-5 bg-[#1DA2FF] rounded-full flex items-center gap-2 text-sm font-medium text-white" onClick={handleLogin}>
              Try Almaze{" "}
              <svg
                width="4"
                height="8"
                viewBox="0 0 4 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 7L3.5 4L0.5 1"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="h-[42px] px-1.5 border border-[#001A2C]/10 rounded-md flex items-center">
            <a href="https://almaze.gitbook.io/docs" target="_blank" >
              <button className="py-1.5 px-5 bg-[#001A2C] rounded-full flex items-center gap-2 text-sm font-medium text-white">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg" 
                >
                  <g clipPath="url(#clip0_1_784)">
                    <path
                      d="M6.3921 8.00633C7.05703 8.3901 7.38949 8.58199 7.75463 8.58231C8.11974 8.58263 8.45254 8.39133 9.11815 8.00871L13.361 5.56978C13.5526 5.45968 13.6706 5.2556 13.6706 5.03466C13.6706 4.81373 13.5526 4.60964 13.361 4.49954L9.11662 2.05973C8.45173 1.67753 8.11928 1.48643 7.75452 1.48657C7.38974 1.48671 7.05746 1.67807 6.39286 2.06079L2.74409 4.16201C2.71704 4.17759 2.70352 4.18536 2.69091 4.19274C1.44452 4.92238 0.674463 6.25445 0.664167 7.69867C0.664062 7.71327 0.664062 7.72886 0.664062 7.76008C0.664062 7.79125 0.664062 7.80683 0.664166 7.82141C0.67444 9.26401 1.44278 10.5948 2.68695 11.325C2.69953 11.3324 2.71302 11.3402 2.74003 11.3558L5.02562 12.6754C6.35742 13.4444 7.02331 13.8288 7.75458 13.8291C8.48584 13.8294 9.15201 13.4453 10.4843 12.6773L12.8971 11.2864C13.5642 10.9018 13.8977 10.7095 14.0809 10.3925C14.2641 10.0755 14.2641 9.69052 14.2641 8.92048V7.43294C14.2641 7.21931 14.1484 7.02245 13.9617 6.9185C13.7811 6.81792 13.561 6.81941 13.3818 6.92243L8.43443 9.76631C8.10251 9.95714 7.93653 10.0525 7.75439 10.0526C7.57228 10.0526 7.40625 9.95733 7.0742 9.76674L3.72571 7.84463C3.55798 7.74835 3.47411 7.7002 3.40675 7.69151C3.25318 7.6717 3.10551 7.75772 3.04701 7.9011C3.02136 7.96399 3.02187 8.06068 3.02291 8.25408C3.02367 8.39648 3.02406 8.46766 3.03736 8.53313C3.06717 8.67978 3.14431 8.81257 3.25696 8.91107C3.30726 8.95505 3.3689 8.99065 3.49222 9.06181L7.07231 11.1281C7.40523 11.3202 7.57168 11.4163 7.75446 11.4164C7.93725 11.4164 8.10376 11.3204 8.43677 11.1285L12.8249 8.59899C12.9386 8.53341 12.9955 8.50064 13.0382 8.52527C13.0808 8.54992 13.0808 8.61556 13.0808 8.74687V9.42158C13.0808 9.6141 13.0808 9.71034 13.035 9.7896C12.9892 9.86884 12.9058 9.91693 12.739 10.0131L9.11971 12.0994C8.45339 12.4835 8.12023 12.6755 7.75454 12.6754C7.38883 12.6752 7.05584 12.4829 6.38989 12.0981L3.00368 10.1421C2.99293 10.1359 2.98755 10.1327 2.98254 10.1298C2.27254 9.71493 1.83444 8.95592 1.83033 8.13359C1.8303 8.12779 1.8303 8.12158 1.8303 8.10915V7.4898C1.8303 7.03584 2.07207 6.61626 2.46483 6.38861C2.81188 6.18743 3.23996 6.18703 3.58737 6.38756L6.3921 8.00633Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_784">
                      <rect
                        width="13.8125"
                        height="13.8125"
                        fill="white"
                        transform="translate(0.570312 0.734619)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Open Gitbook
              </button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.25 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <Image src={img1} alt="" className="w-full" />
        </motion.div>
      </div>

      {/* <Image src={bgImg} alt="" className="absolute top-0 left-0 w-full" /> */}

      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,transparent,white)]",
          "absolute -top-[350px] left-0 w-full h-full skew-y-6"
        )}
      />
    </section>
  );
}
