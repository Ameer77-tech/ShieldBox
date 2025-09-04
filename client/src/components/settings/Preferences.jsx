import React from "react";

const Preferences = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="md:p-10 p-5 mt-5">
      <h1 className="text-2xl font-bold">Preferences</h1>
      <div className="md:mt-10 mt-5 flex flex-col md:gap-1 gap-5">
        <div className="flex items-center justify-between hover:bg-gray-700/20 md:p-2 rounded">
          <p className="tracking-wider">
            Current Theme - {theme}
            <span className="text-blue-600"></span>
          </p>
          <button onClick={toggleTheme} className="btn btn-soft btn-accent">
            Change to {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
        <div className="flex items-center justify-between hover:bg-gray-700/20 md:p-2 rounded">
          <p className="tracking-wider">
            Notifications <span className="text-blue-600"></span>
          </p>
          <input
            type="checkbox"
            defaultChecked
            className="toggle toggle-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default Preferences;
