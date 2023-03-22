import { type App } from "@vuepress/core";

export const prepareRedirects = (app: App, config: Record<string, string>) => {
  app.writeTemp(
    "redirect/config.js",
    `\
export const redirectConfig = ${JSON.stringify(config, null, 2)};
`
  );
};
