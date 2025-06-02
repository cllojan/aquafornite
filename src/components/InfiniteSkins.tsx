'use client '

import { useEffect,useRef, useState } from "react";
import Image from "next/image";
import Skin, { SkinWithDiscount } from "@/interfaces/skin.interface";
import { useSkinCart } from "@/hooks/useSkinCart";
import { useIsMobile} from '@/hooks/useIsMobile';
interface Props{
    groupedSkins: Record<string,SkinWithDiscount[]>,    
    
}
export default function SkinGridInfinite({groupedSkins}:Props){
    const categories = Object.entries(groupedSkins)
    const [visibleCount, setVisibleCount ] = useState(4);
    const [activeId, setActiveId]  = useState<string | null>(null);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useIsMobile();

    const { addItem } = useSkinCart()


    
    useEffect(() =>{
        const observer = new IntersectionObserver(
            (entries) =>{
                if(entries[0].isIntersecting){
                    setVisibleCount((prev) => Math.min(prev + 2, categories.length))
                }
            },
            {
                rootMargin:"100px",
            }
        )
        if(observerRef.current){
            observer.observe(observerRef.current);
        }
        return () => {
            if(observerRef.current){
                observer.disconnect();
            }
        }
    },[categories.length])

    const toggle = (id:string) =>{
      console.log(id)
      setActiveId(prev => (prev === id? null : id));
    }
    return (
        <section className="p-6">

          {categories.slice(0,visibleCount).map(([key, value]) => (

            <div className="flex flex-col " key={key}>
              <h2 className="text-2xl font-semibold mt-8">{key}</h2>
              <div className=" grid grid-cols-1 gap-4 mt-4  xl:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 ">
                {
                  value.map((skin, idx) => {                    
                    return (
                      <div
                        key={idx}
                        onClick={() => { 
                          if (isMobile) addItem(skin)
                        }}
                        className="group card image-full flex-shrink-0 h-[280px] max-w-xs relative overflow-hidden cursor-pointer shadow-[0px_0px_80px_-44px_rgba(0,_0,_0,_0.7)]"
                        style={{
                          background: skin.colors.color1,
                          backgroundImage: `linear-gradient(180deg, ${skin.colors.color1} 0%, ${skin.colors.color2} 50%, ${skin.colors.color3})`
                        }}
                      >
                        <Image
                          alt={skin.displayAssets[0]?.displayAsset || "https://placehold.co/600x400/EEE/31343C"}                          
                          width={400}
                          height={300}
                          priority={true}
                          className={`z-0 w-full object-cover h-full transition-transform duration-700 ease-out group-hover:scale-105 active:scale-105 `}
                          src={skin.displayAssets[0]?.url || "https://placehold.co/400x400.png?text=Not+Found"}
                        />


                        <div className={`w-full pl-2 pr-2 pb-10  ${isMobile ? '-translate-y-7' : 'translate-y-8'} absolute bg-gradient-to-t from-zinc-900  ellipsis to-transparent bottom-[-50] z-9 pb-2  group-hover:-translate-y-8 transition-transform duration-300`}>
                          <div className="flex flex-col">
                            <span className="text-white/75 text-sm">{skin.price.finalPrice} V-BUCKS - {skin.discount} USD</span>
                            <span className="text-white  font-semibold truncate ellipsis">{skin.displayName}</span>
                          </div>
                         {
                          !isMobile && (
                            <button 
                            onClick={() => addItem(skin)}
                             className=" btn mt-2  w-full  btn-primary text-white font-medium transition-colors">
                              Agregar al carrito
                            </button>
                          )
                         }
                        </div>

                      </div>
                    )
                  })
                }
              </div>

            </div>

          ))}
          {/* 👇 Sentinel */}
      {visibleCount < categories.length && (
        <div ref={observerRef} className="h-16 mt-8" />
      )}
        </section>
    )
}


