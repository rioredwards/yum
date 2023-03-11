const theme = [
  {
    name: "TypeScript white",
    scope: "entity.name.type.module.ts",
    settings: {
      foreground: "#e2cca9",
    },
  },
  {
    name: "TypeScript grey",
    scope:
      "keyword.operator.type.annotation.ts, punctuation.accessor.ts, punctuation.separator.key-value.ts",
    settings: {
      foreground: "#928374",
    },
  },
  {
    name: "TypeScript green",
    scope:
      "punctuation.definition.tag.directive.ts, entity.other.attribute-name.directive.ts",
    settings: {
      foreground: "#b0b846",
    },
  },
  {
    name: "TypeScript aqua",
    scope:
      "entity.name.type.ts, entity.name.type.interface.ts, entity.other.inherited-class.ts, entity.name.type.alias.ts, entity.name.type.class.ts, entity.name.type.enum.ts",
    settings: {
      foreground: "#8bba7f",
    },
  },
  {
    name: "TypeScript orange",
    scope:
      "storage.type.ts, storage.type.function.arrow.ts, storage.type.type.ts",
    settings: {
      foreground: "#f28534",
    },
  },
  {
    name: "TypeScript blue",
    scope: "entity.name.type.module.ts",
    settings: {
      foreground: "#80aa9e",
    },
  },
  {
    name: "TypeScript purple",
    scope:
      "keyword.control.import.ts, keyword.control.export.ts, storage.type.namespace.ts",
    settings: {
      foreground: "#d3869b",
    },
  },
  {
    name: "TSX white",
    scope: "entity.name.type.module.tsx",
    settings: {
      foreground: "#e2cca9",
    },
  },
  {
    name: "TSX grey",
    scope:
      "keyword.operator.type.annotation.tsx, punctuation.accessor.tsx, punctuation.separator.key-value.tsx",
    settings: {
      foreground: "#928374",
    },
  },
  {
    name: "TSX green",
    scope:
      "punctuation.definition.tag.directive.tsx, entity.other.attribute-name.directive.tsx, punctuation.definition.tag.begin.tsx, punctuation.definition.tag.end.tsx, entity.other.attribute-name.tsx",
    settings: {
      foreground: "#b0b846",
    },
  },
  {
    name: "TSX aqua",
    scope:
      "entity.name.type.tsx, entity.name.type.interface.tsx, entity.other.inherited-class.tsx, entity.name.type.alias.tsx, entity.name.type.class.tsx, entity.name.type.enum.tsx",
    settings: {
      foreground: "#8bba7f",
    },
  },
  {
    name: "TSX blue",
    scope: "entity.name.type.module.tsx",
    settings: {
      foreground: "#80aa9e",
    },
  },
  {
    name: "TSX purple",
    scope:
      "keyword.control.import.tsx, keyword.control.export.tsx, storage.type.namespace.tsx",
    settings: {
      foreground: "#d3869b",
    },
  },
  {
    name: "TSX orange",
    scope:
      "storage.type.tsx, storage.type.function.arrow.tsx, storage.type.type.tsx, support.class.component.tsx",
    settings: {
      foreground: "#f28534",
    },
  },
  {
    name: "TypeScript Class Modifiers",
    scope: "storage.modifier.ts",
    settings: {
      foreground: "#CC8242",
    },
  },
  {
    name: "TypeScript Type Casting",
    scope:
      "ts.cast.expr,ts.meta.entity.class.method.new.expr.cast,ts.meta.entity.type.name.new.expr.cast,ts.meta.entity.type.name.var-single-variable.annotation,tsx.cast.expr,tsx.meta.entity.class.method.new.expr.cast,tsx.meta.entity.type.name.new.expr.cast,tsx.meta.entity.type.name.var-single-variable.annotation",
    settings: {
      foreground: "#7A9EC2",
    },
  },
  {
    name: "TypeScript Type Declaration",
    scope:
      "ts.meta.type.support,ts.meta.type.entity.name,ts.meta.class.inherited-class,tsx.meta.type.support,tsx.meta.type.entity.name,tsx.meta.class.inherited-class,type-declaration,enum-declaration",
    settings: {
      foreground: "#7A9EC2",
    },
  },
  {
    name: "TypeScript Method Declaration",
    scope:
      "function-declaration,method-declaration,method-overload-declaration,type-fn-type-parameters",
    settings: {
      foreground: "#FFC66D",
    },
  },
  {
    name: "Typescript Namespace",
    scope: "ts.meta.entity.name.namespace,tsx.meta.entity.name.namespace",
    settings: {
      foreground: "#CCCCCC",
    },
  },
];

const scopes = theme
  .map((t) => t.scope.split(","))
  .flat()
  .map((s) => {
    return s.trim();
  });
console.log(scopes);

const newScopes = [
  "entity.name.type.module.ts",
  "keyword.operator.type.annotation.ts",
  "punctuation.accessor.ts",
  "punctuation.separator.key-value.ts",
  "punctuation.definition.tag.directive.ts",
  "entity.other.attribute-name.directive.ts",
  "entity.name.type.ts",
  "entity.name.type.interface.ts",
  "entity.other.inherited-class.ts",
  "entity.name.type.alias.ts",
  "entity.name.type.class.ts",
  "entity.name.type.enum.ts",
  "storage.type.ts",
  "storage.type.function.arrow.ts",
  "storage.type.type.ts",
  "entity.name.type.module.ts",
  "keyword.control.import.ts",
  "keyword.control.export.ts",
  "storage.type.namespace.ts",
  "entity.name.type.module.tsx",
  "keyword.operator.type.annotation.tsx",
  "punctuation.accessor.tsx",
  "punctuation.separator.key-value.tsx",
  "punctuation.definition.tag.directive.tsx",
  "entity.other.attribute-name.directive.tsx",
  "punctuation.definition.tag.begin.tsx",
  "punctuation.definition.tag.end.tsx",
  "entity.other.attribute-name.tsx",
  "entity.name.type.tsx",
  "entity.name.type.interface.tsx",
  "entity.other.inherited-class.tsx",
  "entity.name.type.alias.tsx",
  "entity.name.type.class.tsx",
  "entity.name.type.enum.tsx",
  "entity.name.type.module.tsx",
  "keyword.control.import.tsx",
  "keyword.control.export.tsx",
  "storage.type.namespace.tsx",
  "storage.type.tsx",
  "storage.type.function.arrow.tsx",
  "storage.type.type.tsx",
  "support.class.component.tsx",
  "storage.modifier.ts",
  "ts.cast.expr",
  "ts.meta.entity.class.method.new.expr.cast",
  "ts.meta.entity.type.name.new.expr.cast",
  "ts.meta.entity.type.name.var-single-variable.annotation",
  "tsx.cast.expr",
  "tsx.meta.entity.class.method.new.expr.cast",
  "tsx.meta.entity.type.name.new.expr.cast",
  "tsx.meta.entity.type.name.var-single-variable.annotation",
  "ts.meta.type.support",
  "ts.meta.type.entity.name",
  "ts.meta.class.inherited-class",
  "tsx.meta.type.support",
  "tsx.meta.type.entity.name",
  "tsx.meta.class.inherited-class",
  "type-declaration",
  "enum-declaration",
  "function-declaration",
  "method-declaration",
  "method-overload-declaration",
  "type-fn-type-parameters",
  "ts.meta.entity.name.namespace",
  "tsx.meta.entity.name.namespace",
];

const uniqueArray = Array.from(new Set(newScopes));

console.log(newScopes.length);
console.log(uniqueArray.sort());

const typescriptScopes = uniqueArray.filter((s) => !s.includes("tsx"));
const tsxScopes = uniqueArray.filter((s) => s.includes("tsx"));

console.log("typescriptScopes", typescriptScopes);
console.log("tsxScopes", tsxScopes);

const typescriptTheme = [
  "entity.name.type.alias.ts",
  "entity.name.type.class.ts",
  "entity.name.type.enum.ts",
  "entity.name.type.interface.ts",
  "entity.name.type.module.ts",
  "entity.name.type.ts",
  "entity.other.attribute-name.directive.ts",
  "entity.other.inherited-class.ts",
  "enum-declaration",
  "function-declaration",
  "keyword.control.export.ts",
  "keyword.control.import.ts",
  "keyword.operator.type.annotation.ts",
  "method-declaration",
  "method-overload-declaration",
  "punctuation.accessor.ts",
  "punctuation.definition.tag.directive.ts",
  "punctuation.separator.key-value.ts",
  "storage.modifier.ts",
  "storage.type.function.arrow.ts",
  "storage.type.namespace.ts",
  "storage.type.ts",
  "storage.type.type.ts",
  "ts.cast.expr",
  "ts.meta.class.inherited-class",
  "ts.meta.entity.class.method.new.expr.cast",
  "ts.meta.entity.name.namespace",
  "ts.meta.entity.type.name.new.expr.cast",
  "ts.meta.entity.type.name.var-single-variable.annotation",
  "ts.meta.type.entity.name",
  "ts.meta.type.support",
  "type-declaration",
  "type-fn-type-parameters",
];

const tsxTheme = [
  "entity.name.type.alias.tsx",
  "entity.name.type.class.tsx",
  "entity.name.type.enum.tsx",
  "entity.name.type.interface.tsx",
  "entity.name.type.module.tsx",
  "entity.name.type.tsx",
  "entity.other.attribute-name.directive.tsx",
  "entity.other.attribute-name.tsx",
  "entity.other.inherited-class.tsx",
  "keyword.control.export.tsx",
  "keyword.control.import.tsx",
  "keyword.operator.type.annotation.tsx",
  "punctuation.accessor.tsx",
  "punctuation.definition.tag.begin.tsx",
  "punctuation.definition.tag.directive.tsx",
  "punctuation.definition.tag.end.tsx",
  "punctuation.separator.key-value.tsx",
  "storage.type.function.arrow.tsx",
  "storage.type.namespace.tsx",
  "storage.type.tsx",
  "storage.type.type.tsx",
  "support.class.component.tsx",
  "tsx.cast.expr",
  "tsx.meta.class.inherited-class",
  "tsx.meta.entity.class.method.new.expr.cast",
  "tsx.meta.entity.name.namespace",
  "tsx.meta.entity.type.name.new.expr.cast",
  "tsx.meta.entity.type.name.var-single-variable.annotation",
  "tsx.meta.type.entity.name",
  "tsx.meta.type.support",
];
