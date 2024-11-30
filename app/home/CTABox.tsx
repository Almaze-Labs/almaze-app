"use client";
import { TypingAnimation } from "@/components/home/magicui/typing-animation";
import { FlickeringGrid } from "@/components/home/magicui/flickering-grid";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import Cookies from 'js-cookie';

export default function CTABox() {
  const privy = usePrivy();
  const router = useRouter();
  // const handleLogin = useCallback(() => privy.login(), [privy]);
  useEffect(() => {
    if (privy?.ready) {
      if (privy.authenticated) {
        localStorage.setItem('useremail', privy.user?.email?.address ?? "Guest");
        Cookies.set('privy-authenticated', 'true', { path: '/', expires: 1 });
        router.push('/dashboard');
      }
    }
  }, [privy.ready, privy.authenticated, router]);
  
  return (
    <section>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          
          className="relative p-16 bg-[#1DA2FF] rounded-2xl overflow-hidden"
        >
            <h2 className="font-offbit max-w-[750px] min-h-[96px] text-5xl text-center text-white">
              <TypingAnimation startOnView={false}>
                SELF EVOLVING AGI THAT HELPS YOU COMPLETE MUNDANE TASKS
              </TypingAnimation>
            </h2>

            <p className="my-4 text-center text-white/75">
              The autoagentic AGI. Almaze is a self-evolving AGI made of agents
              that collaborate, and build new agents <br /> as needed, in order
              to complete tasks for a user.
            </p>
          </div>

          <FlickeringGrid
            className="z-0 absolute inset-0 size-full"
            squareSize={3}
            gridGap={5}
            color="#fff"
            maxOpacity={0.25}
            flickerChance={0.1}
            width={1064}
            height={346}
          />
        </motion.div>
      </div>
    </section>
  );
}
