import { ServerResponse } from "http";
import { ValidationResult } from "joi";

export interface IRouterHandler {
  handler: (response: ServerResponse) => void
  validate: () => void
}

export default abstract class RouteHandler implements IRouterHandler {
  constructor(
    readonly body: any,
    private readonly schemaValidator: (body: any) => ValidationResult<any>
  ) {}

  validate () {
    const validation = this.schemaValidator(this.body);
    if (validation.error instanceof Error) {
      throw new Error(
        validation.error.details.map(
          ({message}) => message
        ).join(', ')
      )
    }
  }

  abstract handler (response: ServerResponse): void
}
