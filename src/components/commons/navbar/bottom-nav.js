import Link from 'next/link';

function BottomNav () {
    return (
        <div className="w-full md:hidden">            
          <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-bg-primary shadow border-white border-t-2">
            <div id="tabs" className="flex justify-between">
            <Link href="/">
                <a href="#" className="w-full text-color-white justify-center inline-block text-center pt-2 pb-1">                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="tab tab-home block text-white text-xs">Home</span>
                </a>
              </Link>

              <Link href="/categories">
                <a href="#" className="w-full text-color-white justify-center inline-block text-center pt-2 pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span className="tab tab-kategori block text-white text-xs">Categories</span>
                </a>     
              </Link>     

              <Link href="/account">
                <a href="#" className="w-full text-color-white justify-center inline-block text-center pt-2 pb-1">                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline-block mb-1 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="tab tab-account block text-white text-xs">Account</span>
                </a>
              </Link>
            </div>
          </section>
        </div>
    )
}

export default BottomNav
