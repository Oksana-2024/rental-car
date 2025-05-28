import Image from "next/image";
import NavLinks from "./navlinks";
import Container from "./container";

const Header = () => {
  return (
    <Container className="flex flex-row justify-between py-[26px]">
      <Image
        src="/Logo.svg"
        alt="Logo company"
        width={104}
        height={16}
        priority
      />
      <NavLinks />
    </Container>
  );
};

export default Header;
