import { Parser } from "./parsers/index"

export type GenericState = {
  [name: string]: any,
};

export type FormDefinition<T extends GenericState> = {
  [K in keyof T]?: {
    parser: Parser<any>;
  }
};
