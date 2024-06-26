import AccountProfile from '@/app/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

 const page = async() => {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl
  }
  return (
    <main className='px-10 py-20 mx-auto flex justify-start flex-col max-w-3xl'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='text-base-regular text-light-2 mt-3'>Complete your profile now to use ZapText</p>
      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle="Continue"/>
      </section>
    </main>
  )
}

export default page