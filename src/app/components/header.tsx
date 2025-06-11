import Image from "next/image";
import NavLinks from "./navlinks";
import Container from "./container";

const Header = () => {
  return (
    <header className="bg-porcelain-500">
      <Container className="flex flex-row justify-between py-6">
        <Image
          src="/Logo.svg"
          alt="Logo company"
          width={104}
          height={20}
          priority
        />
        <NavLinks />
      </Container>
    </header>
  );
};

export default Header;
