export type TOperationResponseContent<
  TOperation extends { responses: Record<number | string, unknown> },
  TStatus extends keyof TOperation['responses']
> = TOperation['responses'][TStatus] extends { content: infer Content }
  ? Content extends Record<string, unknown>
    ? Content[keyof Content] // Handle multiple content types
    : Content
  : TOperation['responses'][TStatus] extends void
  ? void
  : TOperation['responses'][TStatus] extends null | undefined
  ? null
  : never;
