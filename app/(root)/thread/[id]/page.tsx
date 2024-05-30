import ThreadCard from "@/app/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page({params}:{params: {id: String}}){

    if(!params.id) return null;

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded){
        redirect('/onboarding');
    }

    const thread = await fetchThreadById(params.id);

    return (
        <section className="relative">
            <div>
            <ThreadCard 
              key={thread._id}
              id={thread._id}
              currentUserId={user?.id || ""} 
              parentId={thread.parentId}
              content={thread.text}
              author={thread.author}
              community={thread.community}
              comments={thread.children}
              createdAt={thread.createdAt}
            />
            </div>
        </section>
    )
}