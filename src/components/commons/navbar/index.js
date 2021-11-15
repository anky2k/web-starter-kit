import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from 'next/link';
import Confirm from '../confirm';
import useDrawer from '../../../hooks/use-drawer';

function Nav() {
  const { show, close } = useDrawer();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-purple-900">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 cursor-pointer">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/about">
                    <a                    
                        className=" text-white hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 px-3 py-2 text-sm font-medium"
                    >
                        About
                    </a>
                 </Link>
                 <Link href="/blog">
                  <a                    
                    className="text-white hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 px-3 py-2 text-sm font-medium"
                  >
                    Blog
                  </a>
                  </Link>  
                  <Link href="/portfolio">
                  <a                    
                    className="text-white hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 px-3 py-2 text-sm font-medium"
                  >
                    Portfolio
                  </a>
                  </Link>  
                  <Link href="/contact">
                  <a                    
                    className="text-white hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 px-3 py-2 text-sm font-medium"
                  >
                    Contact
                  </a>
                  </Link>                                     
                    <div className="dropdown dropdown-hover bg-transparent rounded-none">
                      <Link href="/account">
                        <div tabIndex="0" className="btn btn-ghost rounded-none
                        text-white hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 
                        focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 px-3 py-2 
                        text-sm font-medium capitalize">Account</div> 
                      </Link>                 
                      <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-sm font-medium capitalize">
                        <li
                          onClick={() => show('', () => (<Confirm title={'Are you sure?'} onCancel={close} onConfirm={close}/>))}
                        >
                          <a>Unsubscribe</a>
                        </li>                         
                      </ul>
                    </div>                    
                </div> 
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 text-purple-600 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-200 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/about">
                    <a                  
                    className="hover:bg-purple-200 text-white block px-3 py-2 text-base font-medium"
                    >
                    About
                    </a>
                </Link>  
                <Link href="/blog">
                    <a                  
                    className="text-white hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 block px-3 py-2 text-base font-medium"
                    >
                    Blog
                    </a>
                </Link>  
                <Link href="/portfolio">
                    <a                  
                    className="text-white hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 block px-3 py-2 text-base font-medium"
                    >
                    Portfolio
                    </a>
                </Link>  
                <Link href="/contact">
                    <a                  
                    className="text-white hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 block px-3 py-2 text-base font-medium"
                    >
                    Contact
                    </a>
               </Link>                  
               <Link href="/account">
                    <a                  
                    className="text-white hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 block px-3 py-2 text-base font-medium"
                    >
                    Account
                    </a>                    
               </Link>  
               <div className="divider" />
                <a
                  onClick={() => show('', () => (<Confirm title={'Are you sure?'} onCancel={close} onConfirm={close}/>))}                  
                  className="text-white ml-4 hover:bg-purple-200 hover:text-purple-800 active:text-purple-800 focus:text-purple-800 active:bg-purple-200 focus:bg-purple-200 block px-3 py-2 text-base font-medium"
                >
                Unsubscribe
                </a>                    
               <div className="divider" />
              </div>                  
            </div>
        </Transition>
      </nav>     
    </div>
  );
}

export default Nav;
