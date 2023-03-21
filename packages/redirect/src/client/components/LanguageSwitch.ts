import { useRouteLocale } from "@vuepress/client";
import { entries } from "packages/shared/lib/shared/index.js";
import { type VNode, defineComponent, h, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

declare const REDIRECT_LOCALES: Record<string, string[]>;
declare const REDIRECT_METHOD: "modal" | "redirect";

const redirectLocaleConfig = REDIRECT_LOCALES;
const redirectMethod = REDIRECT_METHOD;

export default defineComponent({
  name: "LanguageSwitch",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const routeLocale = useRouteLocale();

    const showModal = ref(false);
    const routePath = ref("");

    onMounted(() => {
      const { languages } = window.navigator;

      for (const language of languages)
        for (const [localePath, langs] of entries(redirectLocaleConfig))
          if (langs.includes(language))
            if (redirectMethod === "modal") {
              showModal.value = true;
              routePath.value = localePath;
            } else {
              void router.replace(
                route.path.replace(routeLocale.value, localePath)
              );
            }
    });

    return (): VNode | null =>
      showModal.value
        ? // TODO: Add modal
          h("div")
        : null;
  },
});
