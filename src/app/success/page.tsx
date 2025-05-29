import Image from "next/image";
import Link from "next/link";

export default function Success(){
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-4 flex justify-center">
                    <Image src={'/images/check_circle.png'} alt="check" width={100} height={100}/>
                </div>
                <h1 className="text-3xl font-bold mb-2">Gracias!</h1>
                <p className="text-gray-00 mb-8">Tu compra fue exitosa </p>
                <Link href="/">
                    <button className="btn btn-primary">Volver a la inicio</button>
                </Link>
            </div>
        </div>
    )
}