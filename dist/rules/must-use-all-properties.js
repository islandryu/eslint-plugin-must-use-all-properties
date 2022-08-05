"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.rule = void 0;
var utils_1 = require("@typescript-eslint/utils");
var createRule = utils_1.ESLintUtils.RuleCreator(function (name) { return "https://example.com/rule/".concat(name); });
var ENABLE_COMMENT = "must-use-all-properties";
exports.rule = createRule({
    create: function (context) {
        return {
            ObjectPattern: function (node) {
                var sourceCord = context.getSourceCode();
                var comments = sourceCord.getAllComments();
                if (!comments.find(function (comment) {
                    return comment.value.includes(ENABLE_COMMENT) &&
                        comment.loc.end.line === node.loc.start.line - 1;
                }))
                    return;
                var parserServices = utils_1.ESLintUtils.getParserServices(context);
                var checker = parserServices.program.getTypeChecker();
                var originObj = parserServices.esTreeNodeToTSNodeMap.get(node);
                var objType = checker.getTypeAtLocation(originObj);
                var objectPropertyNames = getObjectPropertyNames(objType);
                var objectPatternPropertyNames = getObjectPatternPropertyNames(node);
                if (!objectPropertyNames)
                    return;
                var missingProperties = objectPropertyNames.filter(function (propertyName) { return !objectPatternPropertyNames.includes(propertyName); });
                if (!missingProperties.length)
                    return;
                var typeAnnotation = node.typeAnnotation
                    ? sourceCord.getText(node.typeAnnotation)
                    : "";
                context.report({
                    node: node,
                    messageId: "missingProperty",
                    fix: function (fixer) {
                        return fixer.replaceText(node, "{".concat(__spreadArray(__spreadArray([], objectPatternPropertyNames, true), missingProperties, true).map(function (key) { return key; }), "}").concat(typeAnnotation && " " + typeAnnotation));
                    }
                });
            }
        };
    },
    name: "must-use-all-properties",
    meta: {
        docs: {
            description: "Detect unused properties.",
            recommended: false
        },
        messages: {
            missingProperty: "Not enough properties defined."
        },
        type: "suggestion",
        schema: [],
        fixable: "code"
    },
    defaultOptions: []
});
function getObjectPatternPropertyNames(node) {
    return node.properties
        .map(function (property) {
        var _a;
        if (((_a = property.value) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.Identifier) {
            return property.value.name;
        }
    })
        .filter(function (property) { return !!property; });
}
function getObjectPropertyNames(type) {
    var properties = type.getProperties();
    return properties.map(function (property) {
        return property.getName();
    });
}
