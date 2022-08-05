import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";
import { Type } from "typescript";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

const ENABLE_COMMENT = "must-use-all-properties";

export const rule = createRule({
  create(context) {
    return {
      ObjectPattern(node) {
        const sourceCord = context.getSourceCode();
        const comments = sourceCord.getAllComments();
        if (
          !comments.find(
            (comment) =>
              comment.value.includes(ENABLE_COMMENT) &&
              comment.loc.end.line === node.loc.start.line - 1
          )
        )
          return;

        const parserServices = ESLintUtils.getParserServices(context);
        const checker = parserServices.program.getTypeChecker();

        const originObj = parserServices.esTreeNodeToTSNodeMap.get(node);
        const objType = checker.getTypeAtLocation(originObj);
        const objectPropertyNames = getObjectPropertyNames(objType);
        const objectPatternPropertyNames = getObjectPatternPropertyNames(node);
        if (!objectPropertyNames) return;
        const missingProperties = objectPropertyNames.filter(
          (propertyName) => !objectPatternPropertyNames.includes(propertyName)
        );
        if (!missingProperties.length) return;

        const typeAnnotation = node.typeAnnotation
          ? sourceCord.getText(node.typeAnnotation)
          : "";
        context.report({
          node,
          messageId: "missingProperty",
          fix: (fixer) =>
            fixer.replaceText(
              node,
              `{${[...objectPatternPropertyNames, ...missingProperties].map(
                (key) => key
              )}}${typeAnnotation && " " + typeAnnotation}`
            ),
        });
      },
    };
  },
  name: "must-use-all-properties",
  meta: {
    docs: {
      description: "Detect unused properties.",
      recommended: false,
    },
    messages: {
      missingProperty: "Not enough properties defined.",
    },
    type: "suggestion",
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
});

function getObjectPatternPropertyNames(node: TSESTree.ObjectPattern) {
  return node.properties
    .map((property) => {
      if (property.value?.type === AST_NODE_TYPES.Identifier) {
        return property.value.name;
      }
    })
    .filter((property): property is string => !!property);
}

function getObjectPropertyNames(type: Type) {
  const properties = type.getProperties();
  return properties.map((property) => {
    return property.getName();
  });
}
