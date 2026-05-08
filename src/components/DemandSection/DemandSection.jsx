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
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&q=80"
              alt="Team member"
              className="demand-section__image"
            />
          </h2>

          <div className="demand-section__buttons">
            <SlideButton text="Our Story" href="#contact" />
            <SlideButton text="Our Services" href="#contact" ghost />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemandSection;
