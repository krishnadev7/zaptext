import UserCard from "@/app/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const page = async() => {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user?.id);

    if(!userInfo?.onboarded){
        redirect('/onboarding')
    }

    // fetch user profiles
    const result = await fetchUsers({userId: user.id, searchString: '', pageNumber: 1, pageSize: 25})

    return(
        <section className="head-text mb-10">
            {result.users.length === 0 ? (<p className="no-result">No users!</p>):(
                <>
                {result.users.map((person) => (
                    <UserCard
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        username={person.username}
                        imgUrl={person.image}
                        personType={'user'}
                    />
                ))}
                </>
            )}
        </section>
    )
}

export default page