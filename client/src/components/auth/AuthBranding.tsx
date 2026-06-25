"use client";

export default function AuthBranding() {
  return (
    <div
      className="hidden flex-1 lg:block"
      style={{
        backgroundImage: "url('/images/auth-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
