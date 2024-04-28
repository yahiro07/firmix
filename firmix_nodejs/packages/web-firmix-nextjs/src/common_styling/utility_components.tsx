import { Box } from "@mui/system";
import Link from "next/link";
import { ComponentProps } from "react";
import { prefab } from "./prefab";

export const StyledLink = prefab<ComponentProps<typeof Link>>(
  <Box component={Link} />
);

export const StyledA = prefab<JSX.IntrinsicElements["a"]>(
  <Box component="a" />
);

export const Ul = prefab(<Box component="ul" />);

export const Li = prefab(<Box component="li" />);

export const H1 = prefab(<Box component="h1" />);

export const H2 = prefab(<Box component="h2" />);

export const H3 = prefab(<Box component="h3" />);

export const H4 = prefab(<Box component="h4" />);

export const Img = prefab<JSX.IntrinsicElements["img"]>(
  <Box component="img" />
);

export const Input = prefab<JSX.IntrinsicElements["input"]>(
  <Box component="input" />
);

export const Label = prefab(<Box component="label" />);

export const Flex = prefab(<Box display="flex" />);

export const HStack = prefab(<Box display="flex" alignItems="center" />);

export const VStack = prefab(<Box display="flex" flexDirection="column" />);

export const Center = prefab(
  <Box display="flex" justifyContent="center" alignItems="center" />
);

export const Spacer = prefab(<Box flexGrow="1" />);
