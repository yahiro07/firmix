import { PageProps } from "$fresh/server.ts";
import { MainLayout } from "~/islands/MainLayout.tsx";

export default function BaseLayout({ Component }: PageProps) {
  return (
    <MainLayout>
      <Component />
    </MainLayout>
  );
}
