import { ESLintUtils } from "@typescript-eslint/utils";
import { noFormat } from "@typescript-eslint/utils/dist/eslint-utils";
import * as path from "path";
import { rule } from "../rules/must-use-all-properties";

const { RuleTester } = ESLintUtils;

const fixturesPath = path.join(__dirname, "fixtures");
console.log(fixturesPath);
const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: fixturesPath,
    project: "./tsconfig.json",
  },
});

ruleTester.run("must-use-all-properties", rule, {
  valid: [
    {
      code: `
const data = {name: "hoge", rank: 1};
// must-use-all-properties
const {name, rank} = data;
            `,
    },
    {
      code: `
const data = {name: "hoge", rank: 1};
const {name} = data;
            `,
    },
    {
      code: `
const Component = (
// must-use-all-properties
  {name,rank} : {name: string, rank: number}
) => {
}
            `,
    },
    {
      code: `
type Props = {name: string, rank: number};
const Component = (
// must-use-all-properties
  {name, rank} : Props
) => {
}
            `,
    },
  ],
  invalid: [
    {
      code: `
const data = {name: "hoge", rank: 1};
// must-use-all-properties
const {name} = data;
      `,
      errors: [
        {
          messageId: "missingProperty",
          line: 4,
          column: 7,
        },
      ],
      output: noFormat`
const data = {name: "hoge", rank: 1};
// must-use-all-properties
const {name,rank} = data;
      `,
    },
    {
      code: `
const Component = (
// must-use-all-properties
  {name} : {name: string, rank: number}
) => {
}
      `,
      errors: [
        {
          messageId: "missingProperty",
          line: 4,
          column: 3,
        },
      ],
      output: noFormat`
const Component = (
// must-use-all-properties
  {name,rank} : {name: string, rank: number}
) => {
}
      `,
    },
    {
      code: `
type Props = {name: string, rank: number};
const Component = (
// must-use-all-properties
  {name} : Props
) => {
}
      `,
      errors: [
        {
          messageId: "missingProperty",
          line: 5,
          column: 3,
        },
      ],
      output: noFormat`
type Props = {name: string, rank: number};
const Component = (
// must-use-all-properties
  {name,rank} : Props
) => {
}
      `,
    },
    {
      code: `
const data = {name: "hoge", type: "type",rank: 1};
// must-use-all-properties
const {name, rank} = data;
      `,
      errors: [
        {
          messageId: "missingProperty",
          line: 4,
          column: 7,
        },
      ],
      output: noFormat`
const data = {name: "hoge", type: "type",rank: 1};
// must-use-all-properties
const {name,rank,type} = data;
      `,
    },
  ],
});
