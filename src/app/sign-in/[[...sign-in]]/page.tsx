import { SignIn } from "@clerk/nextjs";
export const runtime = "edge";
export default function Page(){
    return (
        <div className="w-full h-screen flex justify-center align-center">
            <SignIn/>
        </div>
    )
}
