import { Box } from "../../styled-system/jsx";

export default function Home() {
  return (
    <main>
      <Box color="red">hello</Box>
      <div>foo</div>
      <div if={false}>bar</div>
    </main>
  );
}
