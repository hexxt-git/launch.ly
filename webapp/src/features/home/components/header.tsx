import Logo from "../assets/logo";

export default function Headers() {
  return (
   
    <header className="w-full flex flex-row justify-around  items-center px-8 py-4 backdrop-blur-md">
        
        <div className='flex flex-row items-center gap-3'>
          <Logo/>
          <div className='text-white text-2xl font-bold'>
            LUNCH
            <span className='text-white/80 text-xl font-semibold'>
              .ly
            </span>
          </div>
        </div>

   
        <nav className='flex flex-row gap-8 text-white/80 text-sm font-medium'>
          <a href='#Hero' className="hover:text-white transition-colors">Home</a>
          <a href='#Faqs' className="hover:text-white transition-colors">FAQs</a>
          <a href='#WhatWeOffer' className="hover:text-white transition-colors">What we offer</a>
          <a href='#WhyChooseUs' className="hover:text-white transition-colors">Why choose us</a>
        </nav>

       
        <div className='flex flex-row gap-4 items-center'>
          <a href={'/login'}>
            <button className='bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity'>
              Login
            </button>
          </a>
          <a href={'/signup'}>
            <button className='bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity'>
              Sign up
            </button>
          </a>
        </div>

    </header>
  )
}