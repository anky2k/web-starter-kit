const Marquee = ({ text }) => (
  <p
    className={`
      m-0 m-auto 
      whitespace-nowrap
      overflow-hidden
    `}
  >
    <span
      className={`
        pl-100
        inline-block
        animate-marquee
      `}
    >
      {text}
    </span>
  </p>
);

export default Marquee;
