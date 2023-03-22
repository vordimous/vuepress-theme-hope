import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { entries } from "vuepress-shared";

export const setupRedirect = async () => {
  const { redirectConfig } = await import("@internal/redirect/config.js");

  const router = useRouter();
  const route = useRoute();

  watch(
    () => route.path,
    () => {
      for (const [from, to] of entries(redirectConfig)) {
        if ((route.path = from)) {
          router.replace(to);
        }
      }
    },
    { immediate: true }
  );
};
