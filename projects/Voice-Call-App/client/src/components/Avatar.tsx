import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

function Avatar({ src }: { src?: string }) {
  if (src === undefined) {
    return <FaUserCircle size={24} />;
  }
  return (
    <Image
      src={src}
      alt="avatar"
      className="rounded-full"
      height={40}
      width={40}
    />
  );
}

export default Avatar;