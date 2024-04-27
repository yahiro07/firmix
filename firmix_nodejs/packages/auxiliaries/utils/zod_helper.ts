import { ZodError } from "zod";

export function formatZodErrorToLines(error: Error): string[] {
  if (error instanceof ZodError) {
    const lines = error.issues.map(
      (issue) =>
        `${issue.path.toString().replaceAll(",", ".")}: ${issue.message}`
    );
    return lines;
  } else {
    return [error.message];
  }
}
