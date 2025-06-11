'use client'
import { SignUp} from '@clerk/nextjs';
export const runtime = "edge";
export default function Page(){
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <SignUp/>
        </div>
    )
}
