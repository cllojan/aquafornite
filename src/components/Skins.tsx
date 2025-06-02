'use client'

import { OrderSkins } from "@/utils/OrderSkins";
import { useEffect, useState, useMemo, useDeferredValue, FormEvent } from "react";
import Skin, { SkinWithBlur, SkinWithDiscount } from "@/interfaces/skin.interface";

import ImageBlur from "./ImageBlur";
import Image from "next/image";
import SkinGridInfinite from '@/components/InfiniteSkins';

const Skins = ({skins,categories } :{skins:SkinWithDiscount[],categories:string[]}) => {

  const [searchQuery, setSearchQuery] = useState("");

  const [rarity, setRarity] = useState("All");
  const [category, setCategory] = useState("All");

  const [sortBy, setSortBy] = useState(new Set(["newest"]));


  const [listSkins, setListSkins] = useState<Skin[]>([]);
  const [listCategory, setListCategory] = useState<string[]>(["All"]);


  

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setSearchQuery(formData.get("search") as string);
    setRarity(formData.get("rarity") as string);
    setCategory(formData.get("category") as string);
    console.log(formData.get('search') as string)

  }  

  const filteredSkins = useMemo(() => {
    return OrderSkins(skins, {
      rarity: rarity,
      category: category,
      search: searchQuery
    })

  }, [ rarity, category, searchQuery])


  const rari = [
    { key: "All", label: "All" },
    { key: "common", label: "Common" },
    { key: "epic", label: "Epic" },
    { key: "legendary", label: "Legendary" },
    { key: "rare", label: "Rare" },
    { key: "uncommon", label: "Uncommon" },
  ]
 
  return (
    <main className="w-full flex flex-col  min-h-screen p-2">
      <div className="w-full bg-content1 p-6">

        <form className="flex flex-col md:flex-row gap-4 flex-wrap">
          <div className="w-full md:flex-1 ">
            <input
              onChange={e=> setSearchQuery(e.target.value)}
              type="search"
              placeholder="Buscar skin..."
              className=" w-full input"
              name="search"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              defaultValue=" Pick a color"
              className=" w-full select"
              onChange={e => setRarity(e.target.value)}
              name="rarity"
            >
              {rari.map((item) => (
                <option
                  key={item.label}
                  value={item.label}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-64">
            <select
              onChange={e=>setCategory(e.target.value)}
              className=" w-full select"
              name="category"
            >
              {categories.map((item, inx) => (
                <option
                
                  key={inx}
                  value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/** 
           * <div className="w-full md:w-64">
            <select
              defaultValue="Pick a color"
              className=" w-full select"
              name="order"
            >
              {categories.map((item) => (
                <option
                  key={item}

                  value={item.label}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
           <div className="w-full md:w-auto md:self-end">
            <button className="btn btn-active btn-primary" type="submit">Filtrar</button>
          </div>
          */}
         

        </form>
       
      </div>
      <SkinGridInfinite groupedSkins={filteredSkins.filteredSkins} />
    </main>
  );
}

export default Skins;
