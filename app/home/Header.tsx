"use client";
import Image from "next/image";
import logoImg from "../../public/assets/images/brand/logo.svg";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";

export default function Header() {
  const privy = usePrivy();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");
  
  const handleLogin = useCallback(() => privy.login(), [privy]);

  useEffect(() => {
    if (privy?.ready) {
        localStorage.setItem('useremail', privy.user?.email?.address ?? "Guest");
        Cookies.set('privy-authenticated', 'true', { path: '/', expires: 1 });
        router.push('/dashboard');
      }
    }
  }, [privy.ready, privy.authenticated, router]);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Intersection Observer to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ["features", "tokenomics"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: "Features", href: "features", isExternal: false },
    { name: "Tokenomics", href: "tokenomics", isExternal: false },
    { name: "Docs", href: "https://almaze.gitbook.io/docs/", isExternal: true },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="fixed z-[1000] top-0 left-0 w-full"
    >
      <div className="mx-auto container max-w-[1128px] pt-8 px-8">
        <div className="relative py-5 px-6 border border-[#eee] bg-white/80 backdrop-blur-lg rounded-full flex justify-between items-center">
          <Link href={"/"} className="flex">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image src={logoImg} alt="" className="w-[36px]" />
            </motion.div>
          </Link>

          <ul className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.isExternal ? (
                  <motion.a
                    href={item.href}
                    target="_blank"
                  >
                     <motion.button
                    className={`relative py-1.5 px-2 rounded-md text-sm font-medium text-[#001A2C] transition-colors duration-200 ${
                      activeSection === item.href ? "text-[#1DA2FF]" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.name}
                    {activeSection === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-[#1DA2FF]"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                  </motion.a>
                ) : (
                  
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className={`relative py-1.5 px-2 rounded-md text-sm font-medium text-[#001A2C] transition-colors duration-200 ${
                      activeSection === item.href ? "text-[#1DA2FF]" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.name}
                    {activeSection === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-[#1DA2FF]"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                )}
              </li>
            ))}

            <li>
              <motion.a
                href="https://github.com/Almaze-Labs"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-2 hover:bg-[#001A2C]/5 rounded-md flex items-center gap-1.5 text-sm font-medium text-[#001A2C]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_1_744"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="1"
                    width="19"
                    height="18"
                  >
                    <path d="M18.5 1H0.5V19H18.5V1Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1_744)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.5 1C4.5275 1 0.5 5.0275 0.5 10C0.5 13.9825 3.07625 17.3463 6.65375 18.5388C7.10375 18.6175 7.2725 18.3475 7.2725 18.1113C7.2725 17.8975 7.26125 17.1888 7.26125 16.435C5 16.8513 4.415 15.8838 4.235 15.3775C4.13375 15.1188 3.695 14.32 3.3125 14.1063C2.9975 13.9375 2.5475 13.5213 3.30125 13.51C4.01 13.4988 4.51625 14.1625 4.685 14.4325C5.495 15.7938 6.78875 15.4113 7.30625 15.175C7.385 14.59 7.62125 14.1963 7.88 13.9713C5.8775 13.7463 3.785 12.97 3.785 9.5275C3.785 8.54875 4.13375 7.73875 4.7075 7.10875C4.6175 6.88375 4.3025 5.96125 4.7975 4.72375C4.7975 4.72375 5.55125 4.4875 7.2725 5.64625C7.9925 5.44375 8.7575 5.3425 9.5225 5.3425C10.2875 5.3425 11.0525 5.44375 11.7725 5.64625C13.4938 4.47625 14.2475 4.72375 14.2475 4.72375C14.7425 5.96125 14.4275 6.88375 14.3375 7.10875C14.9113 7.73875 15.26 8.5375 15.26 9.5275C15.26 12.9813 13.1563 13.7463 11.1538 13.9713C11.48 14.2525 11.7613 14.7925 11.7613 15.6363C11.7613 16.84 11.75 17.8075 11.75 18.1113C11.75 18.3475 11.9188 18.6288 12.3688 18.5388C15.9238 17.3463 18.5 13.9713 18.5 10C18.5 5.0275 14.4725 1 9.5 1Z"
                      fill="#001A2C"
                    />
                  </g>
                </svg>
              </motion.a>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <motion.a
              href="https://x.com/almaze_ai"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-[42px] h-[42px] border border-[#001A2C]/10 rounded-md flex justify-center items-center hover:bg-[#001A2C]/5"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2719 1.58659H18.0832L11.9415 8.60617L19.1667 18.1582H13.5094L9.0784 12.365L4.00833 18.1582H1.1954L7.76457 10.65L0.833374 1.58659H6.6343L10.6395 6.88187L15.2719 1.58659ZM14.2853 16.4756H15.843L5.78787 3.18087H4.11626L14.2853 16.4756Z"
                  fill="#001A2C"
                />
              </svg>
            </motion.a>

            <div className="h-[42px] px-1.5 border border-[#001A2C]/10 rounded-md flex items-center">
              <motion.button
                className="py-1.5 px-5 bg-[#1DA2FF] rounded-full flex items-center gap-2 text-sm font-medium text-white"
                onClick={handleLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
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
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}