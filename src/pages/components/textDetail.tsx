interface TextDetailProps {
  subTitle?: string;
  title: string;
  text: string;
  button?: string;
}

const TextDetail = ({ subTitle, title, text, button }: TextDetailProps) => {
  const pStyle = button
    ? "text-[#121212E5] font-normal leading-[22.4px] mb-[64px]"
    : "text-[#121212E5] font-normal leading-[22.4px]";

  return (
    <div className="relative h-full border border-r-[#121212] border-b-[#121212] p-[80px]">
      {subTitle ? (
        <h3 className="text-[14px] font-medium uppercase leading-[16.8px] mb-6">
          {subTitle}
        </h3>
      ) : (
        ""
      )}
      <h2 className="text-[38px] leading-[45.6px] font-medium mb-4">{title}</h2>
      <p className={pStyle}>{text}</p>
      {button ? (
        <button className="leading-[19.2px] uppercase font-medium tracking-[0.025em] border border-[#121212] px-[43px] py-[19.5px]">
          {button}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default TextDetail;
