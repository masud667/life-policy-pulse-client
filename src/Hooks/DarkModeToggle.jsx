const DarkModeToggle = () => {
  const handleToggle = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  return (
    <button onClick={handleToggle} className="btn btn-sm">
      🌙 / ☀️
    </button>
  );
};

export default DarkModeToggle;
