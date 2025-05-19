
import Image from "next/image";
import Header from '@/components/Header';
import Skins from '@/components/Skins';
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="">           
     <Suspense fallback={<p>Loading</p>}>
      <Header/>
      <Skins/>
     
     </Suspense>
    </div>
  );
}
