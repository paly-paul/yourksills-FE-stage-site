import Link from "next/link";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  classes?: string;
  action?: (title?: string) => void;
  disabled?: boolean;
};

const AccentButton: React.FC<ButtonProps> = ({
  href,
  text,
  classes,
  action,
  type = "button",
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) action?.();
  };

  if (href) {
    return (
      <Link
        href={href}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          action?.();
        }}
        aria-disabled={disabled}
        className={`accent-button inline-flex items-center justify-center ${classes}`}
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          pointerEvents: disabled ? "none" : "auto",
        }}>
        <span>{text}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className={`accent-button ${classes} `}
      disabled={disabled}>
      <span>{text}</span>
    </button>
  );
};

const BorderButton: React.FC<ButtonProps> = ({
  href,
  text,
  classes,
  action,
  type = "button",
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) action?.();
  };

  if (href) {
    return (
      <Link
        href={href}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          action?.();
        }}
        aria-disabled={disabled}
        className={`btn-shadow btn-radius border-purple border btn-radius-padding text-purple font-semibold inline-flex items-center justify-center ${classes}`}
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          pointerEvents: disabled ? "none" : "auto",
        }}>
        <span>{text}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className={`btn-shadow btn-radius cursor-pointer border-purple border btn-radius-padding text-purple font-semibold ${classes}`}>
      <span>{text}</span>
    </button>
  );
};

export { AccentButton, BorderButton };
