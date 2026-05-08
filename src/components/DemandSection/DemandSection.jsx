import SlideButton from "../SlideButton/SlideButton";
import "./DemandSection.css";

function DemandSection() {
  return (
    <section className="demand-section">
      <div className="demand-section__container">
        {/* Left text */}
        <p className="demand-section__left">
          A global team of search-first content marketers
          <br />
          engineering semantic relevancy &amp; category
          <br />
          signals for both the internet and people
        </p>

        {/* Right content */}
        <div className="demand-section__right">
          <h2 className="demand-section__title">
            Driving Demand &amp;
            <br />
            Discovery
            <img
              src="/src/assets/images/team-member.avif"
              alt="Team member"
              className="demand-section__image"
            />
          </h2>

          <div className="demand-section__buttons">
            <SlideButton text="Our Story" href="#story" />
            <SlideButton text="Our Services" href="#services" ghost />{" "}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemandSection;
