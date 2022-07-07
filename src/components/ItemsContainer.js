import React from "react";

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-6 sm:px-8 px-5 py-10 text-center sm:text-left">
            <div className="col-span-1">
        <ul>
          <li>
            <h1 className="mb-1 font-semibold">INFORMATION</h1>
          </li>
          <li className="py-2">
            <p>Payment: On Delivery</p>
          </li>
          <li>
            <p>Delivery Time: 90 MINUTES MON-SUN 8:30AM - 6:15PM</p>
          </li>
          <li>
            <p>Call: +254711346421</p>
          </li>
          <li>
            {/* mpesa icon */}
            <img className="w-1/2 sm:w-1/4 mt-1 mx-auto sm:ml-0"  src={`${process.env.PUBLIC_URL}/mpesa.png`} alt="Buy goods" />
            {/* <p>Buy Goods:9378773</p> */}
          </li>
        </ul>
      </div>
      <div className=" text:base col-span-1 sm:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-0 sm:pl-8 p-0 ">
        <div className=" col-span-1 sm:col-span-2 justify-center mx-auto">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
            className=" w-2/3 sm:w-1/3 mx-auto sm:mr-auto sm:ml-0 pb-3"
          />
        </div>
        <div className=" pt-1 flex justify-center sm:justify-start sm:border-t-2 sm:border-zinc-400">
          <ul>
            <li>
              <h1 className="mb-1 font-semibold">SOCIAL</h1>
            </li>
            <li className="py-2">
              <a
                className="text-white sm:text-zinc-400 hover:text-white"
                href="https://wa.me/254711346421"
              >
                <div className="flex mx-auto">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>{" "}
                  <p className="pl-2">WhatsApp</p>
                </div>
              </a>
            </li>
            <li className="py-2">
              <a className=" text-white sm:text-zinc-400 hover:text-white" href="facebook">
                <div className="flex mx-auto">
                  <svg
                    className="w-6 h-6  fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <p className="pl-2">Facebook</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className=" pt-1 sm:border-t-2 sm:border-zinc-400">
          <ul>
            <li>
              <h1 className="mb-1 font-semibold">CONTACT</h1>
            </li>
            <li className="py-2">
              <a
                className="text-white sm:text-zinc-400 hover:text-white"
                href="tel:+254711346421"
              >
                Phone
              </a>
            </li>
            <li className="py-2">
              <a
                className="disabled text-white sm:text-zinc-400 hover:text-white"
                href="mailto:bweloba@gmail.com"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemsContainer;
