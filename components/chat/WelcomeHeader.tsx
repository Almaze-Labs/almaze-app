interface WelcomeHeaderProps {
  name: string;
  version: string;
}

const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return "GOOD MORNING";
  } else if (hour >= 12 && hour < 17) {
    return "GOOD AFTERNOON";
  } else {
    return "GOOD EVENING";
  }
};

export const WelcomeHeader = ({ name, version }: WelcomeHeaderProps) => {
  const greeting = getTimeBasedGreeting();
  
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-4 py-3 bg-[#1DA2FF] text-white font-light transition duration-200 ease-linear z-100 rounded-full text-sm w-1/2">
          {version} {">"}
        </button>
        <h1 className="text-5xl mt-3 mb-2 font-offbit">
          {greeting}, <span className="text-[#1DA2FF]">{name}</span>
        </h1>
      </div>
    </>
  );
};