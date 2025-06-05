import Link from "next/link";
import Container from "./components/container";

export default function Home() {
  return (
    <>
      <main>
        <section
          className="bg-[url(/Picture.png)] bg-no-repeat bg-center bg-cover pt-[536px]"
          style={{ height: "calc(100vh - 68px)" }}
        >
          <Container className="text-white flex flex-col items-center">
            <h1 className="font-bold text-6xl w-[783px] mb-[16px]">
              Find your perfect rental car
            </h1>
            <p className="text-2xl mb-[40px]">
              Reliable and budget-friendly rentals for any journey
            </p>
            <Link
              href="/catalog"
              className="bg-[#3470ff] w-[144px] h-[44px] rounded-xl flex items-center justify-center"
            >
              View Catalog
            </Link>
          </Container>
        </section>
      </main>
    </>
  );
}
