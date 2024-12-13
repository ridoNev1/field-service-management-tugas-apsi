import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch } from "react-icons/fi";

interface INavbar {
  isNeedSearch?: boolean;
  onSearch?: (val: string) => void;
}

const Navbar: React.FC<INavbar> = ({ isNeedSearch, onSearch }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [search, setSearch] = useState<string>("");

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full max-w-[412px] py-4 px-6 flex items-center justify-between">
      <div className="flex items-center justify-center h-10">
        <span
          className="text-2xl font-extrabold tracking-wide"
          style={{
            background: "linear-gradient(to right, #3b82f6, #1d4ed8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          FSM
        </span>
      </div>
      <div className="relative">
        {isNeedSearch && (
          <div
            className={`flex items-center justify-center transition-all duration-300 ${
              searchActive ? "w-64" : "w-10"
            }`}
          >
            {!searchActive ? (
              <Button
                variant="ghost"
                onClick={toggleSearch}
                className="flex items-center justify-center"
              >
                <FiSearch className="h-6 w-6 text-gray-500" />
              </Button>
            ) : (
              <Input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                onBlur={toggleSearch}
                autoFocus
                value={search}
                onChange={(e) => {
                  setSearch(e?.target?.value);
                  if (onSearch) onSearch(e?.target?.value);
                }}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
