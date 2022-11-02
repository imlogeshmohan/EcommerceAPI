import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { moon, sun } from './Assets/ThemeToggle';

function ThemeToggle(width = 30) {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function renderThemeChanger() {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <button
          className="p-2"
          onClick={() => {
            setTheme('light');
          }}
        >
          <svg width={30} height={30} className="fill-white">
            {sun}
          </svg>
        </button>
      );
      // eslint-disable-next-line no-else-return
    } else {
      return (
        <button
          className="p-2"
          onClick={() => {
            setTheme('dark');
          }}
        >
          <svg width={30} height={30}>
            {moon}
          </svg>
        </button>
      );
    }
  }
  return renderThemeChanger();
}

export default ThemeToggle;
