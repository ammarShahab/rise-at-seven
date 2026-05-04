import "./ScrollIndicator.css";

function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      <span>Scroll</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  );
}

export default ScrollIndicator;
