import Container from "@/components/container/Container";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React, { useEffect } from "react";

export default async function page() {
  return (
    <>
      <Header />
      <Container.Root>
        <Container.Content>Result</Container.Content>
      </Container.Root>
      <div className="h-40 lg:h-48"></div>
      <Footer />
    </>
  );
}
