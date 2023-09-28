"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteHandler {
    constructor(body, schemaValidator) {
        this.body = body;
        this.schemaValidator = schemaValidator;
    }
    validate() {
        const validation = this.schemaValidator(this.body);
        if (validation.error instanceof Error) {
            throw new Error(validation.error.details.map(({ message }) => message).join(', '));
        }
    }
}
exports.default = RouteHandler;
