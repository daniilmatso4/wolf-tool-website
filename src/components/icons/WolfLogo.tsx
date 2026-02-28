interface WolfLogoProps {
  size?: number;
  className?: string;
}

export default function WolfLogo({ size = 24, className = '' }: WolfLogoProps) {
  return (
    <img
      src="/wolf-logo.png"
      alt="Wolf Tool"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
