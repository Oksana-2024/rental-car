interface IHome {
  children: React.ReactNode;
}
export default function Home({ children }: IHome) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
