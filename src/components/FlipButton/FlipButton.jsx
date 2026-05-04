import "./FlipButton.css";

/**
 * FlipButton Component
 * 3D text flip animation on hover using CSS transforms
 * Two text layers stacked, container rotates 180deg on X-axis
 */
function FlipButton({ text, href, className = "" }) {
  return (
    <a href={href} className={`flip-button ${className}`} aria-label={text}>
      <span className="flip-button__inner">
        <span className="flip-button__face flip-button__face--front">
          {text}
        </span>
        <span className="flip-button__face flip-button__face--back">
          {text}
        </span>
      </span>
    </a>
  );
}

export default FlipButton;
