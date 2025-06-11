

import Header from '@/components/Header';
import Skins from '@/components/Skins';

import { getSkins } from "@/lib/getSkins";
export const runtime = "edge";
export default async function Home() {
  const {skins, categories} = await getSkins();
  
  return (
    <div className="">                
      <Header/>
      <Skins skins={skins} categories={categories}/ >          
    </div>
  );
}
