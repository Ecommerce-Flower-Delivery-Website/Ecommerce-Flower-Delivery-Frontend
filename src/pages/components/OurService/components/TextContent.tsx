interface TextContentProps {
  subTitle: string;
  title: string;
  text: string;
  button: string;
}

const TextContent = ({ subTitle, title, text, button }: TextContentProps) => {
  return (
    <div className="flower-container w-[77.78%] flex flex-col justify-center items-center">
      <h4 className="text-sm leading-[16.8px] mb-6">{subTitle}</h4>
      <h2 className="text-[50px] leading-[60px] font-semibold mb-4">{title}</h2>
      <p className="text-lg leading-[25.2px] mb-[64px]">{text}</p>
      <button className="leading-[19.2px] w-[180px] h-[56px] border border-[#121212] tracking-[0.03em] uppercase">
        {button}
      </button>
    </div>
  );
};

export default TextContent;
