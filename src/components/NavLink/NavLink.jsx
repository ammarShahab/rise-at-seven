import "./NavLink.css";

/**
 * NavLink Component
 * Animated underline on hover using pseudo-element transform
 */
function NavLink({ href, children, isActive = false }) {
  return (
    <a href={href} className={`nav-link ${isActive ? "nav-link--active" : ""}`}>
      {children}
    </a>
  );
}

export default NavLink;
