type PropsType = {
  children: React.ReactNode;
  className: string;
  colors: string[];
  animationSpeed: number;
  showBorder: boolean;
};

export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"], // Default colors
  animationSpeed = 8, // Default animation speed in seconds
  showBorder = false, // Default overlay visibility
}: PropsType) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`, // This will be applied directly to the style
  };

  return (
    <span
      className={`relative mx-auto inline-flex max-w-fit flex-row items-center justify-center overflow-hidden rounded-[1.25rem] font-swearDisplay font-bold backdrop-blur transition-shadow duration-500 ${className}`}
    >
      {showBorder && (
        <div
          className="animate-gradient pointer-events-none absolute inset-0 z-0 bg-cover"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
            // Direct animation style will override Tailwind animation duration
          }}
        >
          <div
            className="absolute inset-0 z-[-1] rounded-[1.25rem] bg-black"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      )}
      <div
        className="z-2 animate-gradient relative inline-block bg-cover text-transparent"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        {children}
      </div>
    </span>
  );
}
