import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client-preset",
    },
  },
};
export default config;
