import Image from "next/image";

export default function PolyavaLogo() {
  return (
    <div className="flex items-center select-none">
      <Image src="/Polyava_logo.png" alt="Polyava Logo" width={160} height={40} priority className="h-10 w-auto" />
    </div>
  );
}
