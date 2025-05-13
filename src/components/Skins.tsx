'use client'

import { OrderSkins } from "@/utils/OrderSkins";
import { useEffect, useState } from "react";
import Skin from "@/interfaces/skin.interface";
import { OwSelect } from "@/components/Elements";
import Image from "next/image";
import { Button } from '@heroui/button';
import { Searchinput } from "@/components/SearchInput";
import { Input, Select, SelectItem } from "@heroui/react";
const Skins: React.FC = () => {

  const [skins, setSkins] = useState<Record<string, Skin[]>>({});
  useEffect(() => {
    const fetchSkins = async () => {
      const response = await fetch('https://fortniteapi.io/v2/shop?lang=es', {
        headers: {
          authorization: "d60d4e00-59f21374-a1c3d875-f9975241",
        },
      });
      const data = await response.json();

      setSkins(OrderSkins(data.shop));
      console.log(data)
    }

    fetchSkins();
  }, [])
  const categories = [
    { key: "all", label: "All Categories" },
    { key: "electronics", label: "Electronics" },
    { key: "clothing", label: "Clothing" },
    { key: "furniture", label: "Furniture" },
    { key: "books", label: "Books" },
    { key: "sports", label: "Sports" }
  ];
  return (
    <main className="w-full flex flex-col items-center justify-center min-h-screen bg-background p-2">
      <div className="w-full bg-content1 p-6 rounded-large shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Product Search</h2>
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
        <div className="w-full md:flex-1">
            <Input
              label="Search"
              placeholder="Enter keywords..."
              
              classNames={{
                inputWrapper: "shadow-none",
              }}
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              label="Category"
              placeholder="Select category"
             
              classNames={{
                trigger: "shadow-none",
              }}
            >
              {categories.map((item) => (
                <SelectItem key={item.key} >
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full md:w-64">
            <OwSelect>
              <option value="">Todas las rarezas</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
            </OwSelect>
          </div>

          <OwSelect>
            <option value="">Todas las rarezas</option>
            <option value="JM">John Mayer</option>
            <option value="SRV">Stevie Ray Vaughn</option>
            <option value="JH">Jimi Hendrix</option>
            <option value="BBK">B.B King</option>
            <option value="AK">Albert King</option>
            <option value="BG">Buddy Guy</option>
            <option value="EC">Eric Clapton</option>
          </OwSelect>
          <OwSelect>
            <option value="">Todas las rarezas</option>
            <option value="JM">John Mayer</option>
            <option value="SRV">Stevie Ray Vaughn</option>
            <option value="JH">Jimi Hendrix</option>
            <option value="BBK">B.B King</option>
            <option value="AK">Albert King</option>
            <option value="BG">Buddy Guy</option>
            <option value="EC">Eric Clapton</option>
          </OwSelect>
        </div>
        <ul className="">

          {Object.entries(skins).map(([key, value]) => (

            <div className="flex flex-col " key={key}>
              <h2 className="text-2xl font-semibold mt-8">{key}</h2>
              <div className="grid grid-cols-1 gap-4 mt-4  xl:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  h-full">
                {
                  value.map((skin, idx) => (

                    <div key={idx} style={{ background: skin.colors.color1, backgroundImage: `linear-gradient(180deg,  ${skin.colors.color1} 0%, ${skin.colors.color2} 50%, ${skin.colors.color3})` }} className="flex-shrink-0 h-70 relative overflow-hidden rounded-lg max-w-xs shadow-lg">
                      <Image layout="fill" objectFit='cover' src={skin.displayAssets[0].url} alt={skin.displayAssets[0].displayAsset} />
                      <div className="absolute bottom-[-15] left-[-10] right-0 text-white px-6 pb-6 mt-6 bg-gradient-to-t from-zinc-900 to-slate-100 to-transparent">
                        <span className="block opacity-75 -mb-1">{skin.price.finalPrice}</span>
                        <div className="flex justify-between">
                          <span className="block font-semibold font-roboto text-base truncate">{skin.displayName}</span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>

            </div>

          ))}
        </ul>
      </div>

    </main>
  );
};

export default Skins;
