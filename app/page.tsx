"use client"

import NavBar from '@/components/navBar';

export default function Home() {
  return (
    <div className='bg-home-blue h-screen'>
      <NavBar />
      <div className='mx-8'>
        <div className="pt-48">
          <h1 className="text-3xl mb-8">The Ultimate communication platform</h1>
          <p className='mb-8 w-5/6 lg:w-2/5'>
            At the heart of Teamsphere are channels: organized spaces for everyone
            and everything you need for work. In channels, it&apos;s easier to connect
            across departments, offices, time zones and even other companies.
          </p>
        </div>
        <a href="/chat" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Try for free
        </a>
      </div>
    </div>
  );
}
