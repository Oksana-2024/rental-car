import Link from "next/link";
import Container from "./components/container";

export default function Home() {
  return (
    <>
      <main>
        <section className="bg-[url(/Picture.png)] h-screen bg-no-repeat bg-center bg-cover pt-[436px]">
          <Container className="text-white flex flex-col justify-center align-center">
            <h1 className="font-bold text-6xl w-[783px]">Find your perfect rental car</h1>
            <p className="text-2xl">
              Reliable and budget-friendly rentals for any journey
            </p>
            <Link href="/catalog" className="bg-[#3470ff] w-[144px] h-[44px] ">
              View Catalog
            </Link>
          </Container>
        </section>
      </main>
    </>
  );
}
