interface AvatarProps {
    name: string;
    src?: string;
  }
  
  export function Avatar({
    name,
    src,
  }: AvatarProps) {
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  
    return (
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #6366f1, #14b8a6)",
          color: "white",
          fontWeight: 700,
          fontSize: 12,
        }}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          initials
        )}
      </div>
    );
  }