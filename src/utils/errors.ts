import { number, object } from "zod";

export class DataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataError";
  }
}

export class ValidateFormDataError extends Error {
  issues?: object[];

  constructor(message: string, issues?: object[]) {
    super(message);
    this.name = "NoDataError";
    this.issues = issues;
  }
}

export class NoDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoDataError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
