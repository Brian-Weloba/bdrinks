import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Whisky", href: "/category/whisky", current: false },
  { name: "Gin", href: "/category/gin", current: false },
  { name: "Rum", href: "/category/rum", current: false },
  { name: "Brandy", href: "/category/brandy", current: false },
  { name: "Vodka", href: "/category/vodka", current: false },
  { name: "Wines", href: "/category/wine", current: false },
  { name: "Cans", href: "/category/canned", current: false },
];

//function to update the current item
function updateCurrent(navigation, path) {
  navigation.forEach((item) => {
    if (item.href.toLowerCase() === path.toLowerCase()) {
      item.current = true;
    } else {
      item.current = false;
    }
  });
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    updateCurrent(navigation, pathname);
  }, [pathname]);

  return (
    <div className="fixed top-0 z-50 w-full">
      <Disclosure as="nav" className="bg-zinc-800 ">
        {({ open }) => (
          <>
            <div className=" mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-max">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="/" aria-label="Berny's">
                      <img
                        className="block lg:hidden my-2 h-14 w-auto"
                        src={process.env.PUBLIC_URL + "/trademark.png"}
                        alt="Berny's liquor"
                      />
                    </a>
                    <a href="/" aria-label="Berny's">
                      <img
                        className="hidden lg:block my-2 h-14 w-auto"
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        href="/"
                        alt="Berny's liquor"
                      />
                    </a>
                  </div>
                  <div className="hidden sm:block sm:ml-6 my-auto">
                    <div className="flex space-x-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-zinc-900 text-white"
                              : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                            "px-2 py-2 rounded-md text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="flex items-center justify-center">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="bg-zinc-800 p-1 rounded-full text-zinc-400 sm:hover:text-orange-400"
                        >
                          <span className="sr-only">View cart</span>
                          <ShoppingCartIcon
                            className="h-6 w-6 sm:h-8 sm:w-8 mx-1"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      <Link to="/favorites">
                        <button
                          type="button"
                          className="bg-zinc-800 p-1 rounded-full text-zinc-400 sm:hover:text-red-800"
                        >
                          <span className="sr-only">View cart</span>
                          <HeartIcon
                            className=" h-6 w-6 sm:h-8 sm:w-8 mx-1"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
