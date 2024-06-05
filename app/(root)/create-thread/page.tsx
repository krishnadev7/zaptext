import PostThread from "@/app/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function page() {
    const user = await currentUser();

    console.log("user", user);
    
    if(!user){
        return null;
    }

    const userInfo  = await fetchUser(user.id);


    if (!userInfo || !userInfo.onboarded) {
        redirect('/onboarding');
      }

      console.log("userInfo", userInfo);


    return (
        <>
        <h1 className="head-text">Create Thread</h1>
        <PostThread userId={userInfo._id.toString()}/>
        </>
    )
}

export default page;
