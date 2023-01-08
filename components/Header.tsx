import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header id="header">
      <Link href="/" className="img-container">
        <Image
          src="/assets/images/sketch-logo.png"
          alt="header-logo"
          fill
          sizes="100%"
          priority
        />
      </Link>
      <nav id="navbar">
        <Link href="/">Home</Link>
        <Link href="/#about">About</Link>
        <Link href="/events">Events</Link>
        <Link href="/member">Members</Link>
      </nav>
    </header>
  );
}
