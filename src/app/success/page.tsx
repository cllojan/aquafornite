import Image from "next/image";
import Link from "next/link";
async function loadProducts(){
    const history = {
    user_id: 'user_abc123',
    items: [
      { name: 'Skin Legendaria', price: 12.99, image: 'https://...' },
      { name: 'Pickaxe', price: 7.5, image: 'https://...' }
    ],
    total: 20.49
  };
    const data = await fetch('/api/history',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(history)
    })
    return data;
}
export default async function Success(){
    const xd = await loadProducts();
    console.log(xd)
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