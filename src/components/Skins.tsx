'use client'

import { OrderSkins } from "@/utils/OrderSkins";
import { useEffect, useState, useMemo } from "react";
import Skin from "@/interfaces/skin.interface";
import { Icon } from "@iconify/react";

import { useSkinCart } from "@/hooks/useSkinCart";
import Image from "next/image";

const Skins: React.FC = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [rarity, setRarity] = useState(new Set<string>(["All"]));
  const [category, setCategory] = useState(new Set<string>(["All"]));

  const [sortBy, setSortBy] = useState(new Set(["newest"]));

  
  const [listSkins, setListSkins] = useState<Skin[]>([]);
  const [listCategory, setListCategory] = useState<string[]>(["All"]);
  const [trigger, setTrigger] = useState<boolean>(false);
  
  const {addItem} = useSkinCart()
  
  useEffect(() => {    
    const fetchSkins = async () => {
      const response = await fetch('https://fortniteapi.io/v2/shop?lang=es', {
        headers: {
          authorization: `${process.env.APIKEY_FORTNITE}`,
        },
      });
      const data = await response.json();
      setListSkins(data.shop);
      const { categories: allCategories } = OrderSkins(data.shop);
      setListCategory(allCategories)
            

    }

    fetchSkins();
    setTrigger(false);
  }, [trigger])

  const filteredSkins = useMemo(() => {
    return OrderSkins(listSkins, {
      rarity: Array.from(rarity)[0],
      category: Array.from(category)[0],
      sortBy: Array.from(sortBy)[0],
    })

  }, [listSkins, rarity,category])


  const rari = [
    { key: "All", label: "All" },
    { key: "common", label: "Common" },
    { key: "epic", label: "Epic" },
    { key: "legendary", label: "Legendary" },
    { key: "rare", label: "Rare" },
    { key: "uncommon", label: "Uncommon" },
  ]
  const categories = [
    { key: "all", label: "All Categories" },
    { key: "electronics", label: "Electronics" },
    { key: "clothing", label: "Clothing" },
    { key: "furniture", label: "Furniture" },
    { key: "books", label: "Books" },
    { key: "sports", label: "Sports" }
  ];
  if(Object.entries(filteredSkins).length == 0){
    return <div className="fixed inset-0 bg-neutral z-50 flex justify-center items-center ">
        <span className="loading loading-spinner text-success loading-lg"></span>
    </div>
  }
  return (
    <main className="w-full flex flex-col  min-h-screen p-2">
      <div className="w-full bg-content1 p-6">

        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          <div className="w-full md:flex-1 ">
            <input
              type="Buscar"
              placeholder="Buscar skin..."
              onChange={e => {
                setSearchQuery(e.target.value)
              }}
              className=" w-full input "

            />
          </div>
          <div className="w-full md:w-64">
            <select
              defaultValue=" Pick a color"
              className=" w-full select"
              onChange={(e) => {
                setRarity(new Set([e.target.value]))
              }}
            >
              {rari.map((item) => (
                <option
                  key={item.label}

                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-64">
            <select
              defaultValue="Pick a color"
              className=" w-full select"
              onChange={(e) => {
                setCategory(new Set([e.target.value]))
              }}
            >
              {listCategory.map((item,inx) => (
                <option key={inx}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-64">
            <select
              defaultValue="Pick a color"
              className=" w-full select"
              
            >
              {categories.map((item) => (
                <option key={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          
        </div>
        <section className="">
          
          {Object.entries(filteredSkins.filteredSkins).map(([key, value]) => (

            <div className="flex flex-col " key={key}>
              <h2 className="text-2xl font-semibold mt-8">{key}</h2>
              <div className=" grid grid-cols-1 gap-4 mt-4  xl:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 ">
                {
                  value.map((skin, idx) => (

                    <div
                      key={idx}
                      className="group card image-full flex-shrink-0 h-[280px] max-w-xs relative overflow-hidden cursor-pointer shadow-[0px_0px_80px_-44px_rgba(0,_0,_0,_0.7)]"
                      style={{
                        background: skin.colors.color1,
                        backgroundImage: `linear-gradient(180deg, ${skin.colors.color1} 0%, ${skin.colors.color2} 50%, ${skin.colors.color3})`
                      }}
                    >
                      <Image
                        alt={skin.displayAssets[0]?.displayAsset || "https://placehold.co/600x400/EEE/31343C"}
                        className={`z-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105`}
                        objectFit="cover"
                        fill
                        sizes="100"
                        priority={true}
                        src={skin.displayAssets[0]?.url || "https://placehold.co/600x400/EEE/31343C"}
                      />
                      <div className="w-full pl-2 pr-2 pb-10  translate-y-8 absolute bg-gradient-to-t from-zinc-900  ellipsis to-transparent bottom-[-50] z-9 pb-2  group-hover:-translate-y-8 transition-transform duration-300">
                        <div className="flex flex-col">
                          <span className="text-white/75 text-tiny">{skin.price.finalPrice}</span>
                          <span className="text-white  font-semibold truncate ellipsis">{skin.displayName}</span>
                        </div>
                        <button onClick={() => addItem(value[idx])} className=" btn mt-2  w-full  btn-primary text-white font-medium transition-colors">
                          Agregar al carrito 
                        </button>
                      </div>
                      
                    </div>
                  ))
                }
              </div>

            </div>

          ))}
        </section>
      </div>

    </main>
  );
}

export default Skins;
