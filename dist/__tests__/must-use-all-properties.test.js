"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var utils_1 = require("@typescript-eslint/utils");
var eslint_utils_1 = require("@typescript-eslint/utils/dist/eslint-utils");
var path = __importStar(require("path"));
var must_use_all_properties_1 = require("../rules/must-use-all-properties");
var RuleTester = utils_1.ESLintUtils.RuleTester;
var fixturesPath = path.join(__dirname, "fixtures");
console.log(fixturesPath);
var ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: fixturesPath,
        project: "./tsconfig.json"
    }
});
ruleTester.run("must-use-all-properties", must_use_all_properties_1.rule, {
    valid: [
        {
            code: "\nconst data = {name: \"hoge\", rank: 1};\n// must-use-all-properties\nconst {name, rank} = data;\n            "
        },
        {
            code: "\nconst data = {name: \"hoge\", rank: 1};\nconst {name} = data;\n            "
        },
        {
            code: "\nconst Component = (\n// must-use-all-properties\n  {name,rank} : {name: string, rank: number}\n) => {\n}\n            "
        },
        {
            code: "\ntype Props = {name: string, rank: number};\nconst Component = (\n// must-use-all-properties\n  {name, rank} : Props\n) => {\n}\n            "
        },
    ],
    invalid: [
        {
            code: "\nconst data = {name: \"hoge\", rank: 1};\n// must-use-all-properties\nconst {name} = data;\n      ",
            errors: [
                {
                    messageId: "missingProperty",
                    line: 4,
                    column: 7
                },
            ],
            output: (0, eslint_utils_1.noFormat)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nconst data = {name: \"hoge\", rank: 1};\n// must-use-all-properties\nconst {name,rank} = data;\n      "], ["\nconst data = {name: \"hoge\", rank: 1};\n// must-use-all-properties\nconst {name,rank} = data;\n      "])))
        },
        {
            code: "\nconst Component = (\n// must-use-all-properties\n  {name} : {name: string, rank: number}\n) => {\n}\n      ",
            errors: [
                {
                    messageId: "missingProperty",
                    line: 4,
                    column: 3
                },
            ],
            output: (0, eslint_utils_1.noFormat)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nconst Component = (\n// must-use-all-properties\n  {name,rank} : {name: string, rank: number}\n) => {\n}\n      "], ["\nconst Component = (\n// must-use-all-properties\n  {name,rank} : {name: string, rank: number}\n) => {\n}\n      "])))
        },
        {
            code: "\ntype Props = {name: string, rank: number};\nconst Component = (\n// must-use-all-properties\n  {name} : Props\n) => {\n}\n      ",
            errors: [
                {
                    messageId: "missingProperty",
                    line: 5,
                    column: 3
                },
            ],
            output: (0, eslint_utils_1.noFormat)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\ntype Props = {name: string, rank: number};\nconst Component = (\n// must-use-all-properties\n  {name,rank} : Props\n) => {\n}\n      "], ["\ntype Props = {name: string, rank: number};\nconst Component = (\n// must-use-all-properties\n  {name,rank} : Props\n) => {\n}\n      "])))
        },
        {
            code: "\nconst data = {name: \"hoge\", type: \"type\",rank: 1};\n// must-use-all-properties\nconst {name, rank} = data;\n      ",
            errors: [
                {
                    messageId: "missingProperty",
                    line: 4,
                    column: 7
                },
            ],
            output: (0, eslint_utils_1.noFormat)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nconst data = {name: \"hoge\", type: \"type\",rank: 1};\n// must-use-all-properties\nconst {name,rank,type} = data;\n      "], ["\nconst data = {name: \"hoge\", type: \"type\",rank: 1};\n// must-use-all-properties\nconst {name,rank,type} = data;\n      "])))
        },
    ]
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
