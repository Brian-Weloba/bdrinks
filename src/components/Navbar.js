import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

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
  const [cookies, setCookie, removeCookie] = useCookies(["cartItems"]);
  const [cartEmpty, setCartEmpty] = useState(true);

  //keep checking of cart cookie has items.
  useEffect(() => {
    if (cookies.cartItems) {
      if (cookies.cartItems.length > 0) {
        setCartEmpty(false);
      } else {
        setCartEmpty(true);
      }
    }
  }
  , [cookies.cartItems]);


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
                  <div className="hidden sm:flex sm:items-stretch align-center sm:ml-6">
                    <div className="flex align-stretch ">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-transparent text-red-600 border-b-2 border-red-600"
                              : "text-zinc-300 border-zinc-500 hover:border-white -zinc-700 hover:text-white",
                            "px-2 self-end pb-4  text-base font-medium mb-2 border-b-2 "
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
                          class="inline-flex relative items-center justify-center p-1 rounded-md text-zinc-400 sm:hover:text-white"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6 sm:h-7 sm:w-7 mx-1"
                            aria-hidden="true"
                          />
                          {!cartEmpty ? (
                          <span className="flex h-3 w-3 absolute top-1 right-1 mb-0.5">
                              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                            </span>
                          ) : null}
                        </button>
                      </Link>
                      <Link to="/favorites">
                        <button
                          type="button"
                          class="inline-flex items-center justify-center p-1 rounded-md text-zinc-400 sm:hover:text-red-800"
                        >
                          <HeartIcon
                            className=" h-6 w-6 sm:h-7 sm:w-7 mx-1"
                            aria-hidden="true"
                          />
                           
                        </button>
                        {/* <button
                          type="button"
                          className="bg-zinc-800 p-1 rounded-full text-zinc-400 sm:hover:text-red-600"
                        >
                          <HeartIcon
                            className=" h-6 w-6 sm:h-7 sm:w-7 mx-1"
                            aria-hidden="true"
                          />
                          <span class="flex h-3 w-3">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                              <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                            </span>
                          
                        </button> */}
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
