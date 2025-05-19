import { SignIn } from "@clerk/nextjs";

export default function Page(){
    return (
        <div className="w-full h-screen flex justify-center align-center">
            <SignIn/>
        </div>
    )
}
