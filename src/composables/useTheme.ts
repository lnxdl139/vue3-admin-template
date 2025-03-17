import { ref, watchEffect } from "vue";

const THEME_KEY = "selected-theme";

export function useTheme() {
  const theme = ref(localStorage.getItem(THEME_KEY) || "light");

  const setTheme = (newTheme: string) => {
    theme.value = newTheme;
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  watchEffect(() => {
    setTheme(theme.value);
  });

  return { theme, setTheme };
}
