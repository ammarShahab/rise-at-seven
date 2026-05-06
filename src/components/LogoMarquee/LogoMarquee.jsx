import "./LogoMarquee.css";

const logos = [
  "Shark | NINJA",
  "Capital One",
  "Red Bull",
  "JD",
  "Kroger",
  "HubSpot",
];

function LogoMarquee() {
  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos, ...logos];

  return (
    <section className="logo-marquee" aria-label="Client logos">
      <div className="logo-marquee__container">
        <span className="logo-marquee__label">The agency behind_</span>

        <div className="logo-marquee__wrapper">
          <div className="logo-marquee__track">
            {allLogos.map((text, index) => (
              <div key={index} className="logo-marquee__item">
                <span className="logo-marquee__logo-text">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogoMarquee;
