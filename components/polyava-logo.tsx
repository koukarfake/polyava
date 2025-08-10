import Image from "next/image";

export default function PolyavaLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <span className="text-3xl font-extrabold tracking-tight text-white">P</span>
      <Image src="/Coin.png" alt="AVA Coin" width={32} height={32} className="inline-block align-middle" />
      <span className="text-3xl font-extrabold tracking-tight text-white">LYAVA</span>
    </div>
  );
}
