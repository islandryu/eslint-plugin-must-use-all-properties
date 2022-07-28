declare const _default: {
    rules: {
        "must-use-all-properties": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<"missingProperty", never[], {
            ObjectPattern(node: import("@typescript-eslint/types/dist/generated/ast-spec").ObjectPattern): void;
        }>;
    };
};
export = _default;
