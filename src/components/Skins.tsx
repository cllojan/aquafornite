'use client'

import { OrderSkins } from "@/utils/OrderSkins";
import { useEffect, useState } from "react";
import Skin from "@/interfaces/skin.interface";
import {Select} from "@/components/Elements";

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

  return (
    <main className="p-10 flex flex-col font-display  gap-4">
      <div className="flex gap-4 horizontal flex-wrap sm:flex-nowrap ">

        <div className="w-full max-w-sm min-w-[200px]">
          <div className="relative">
            <input type="text" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-[#3c5b77] rounded-md pl-3 pr-16 py-2 transition duration-300 ease  focus:outline-none focus:border-[#668eb2] hover:border-[#668eb2]   shadow-sm focus:shadow" placeholder="Buscar por skin" />
            <button
              className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Buscar
            </button>
          </div>
        </div>

        
        <Select>
              <option value="">Todas las rarezas</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
        </Select>

        <Select>
              <option value="">Todas las rarezas</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
        </Select>
        <Select>
              <option value="">Todas las rarezas</option>
              <option value="JM">John Mayer</option>
              <option value="SRV">Stevie Ray Vaughn</option>
              <option value="JH">Jimi Hendrix</option>
              <option value="BBK">B.B King</option>
              <option value="AK">Albert King</option>
              <option value="BG">Buddy Guy</option>
              <option value="EC">Eric Clapton</option>
        </Select>
      </div>
      <ul className="">

        {Object.entries(skins).map(([key, value]) => (

          <div className="flex flex-col " key={key}>
            <h2 className="text-2xl font-semibold mt-8">{key}</h2>
            <div className="grid grid-cols-1 gap-4 mt-4  xl:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  h-full">
              {
                value.map((skin) => (

                  <div style={{ background: skin.colors.color1, backgroundImage: `linear-gradient(180deg,  ${skin.colors.color1} 0%, ${skin.colors.color2} 50%, ${skin.colors.color3})` }} className="flex-shrink-0 h-70 relative overflow-hidden rounded-lg max-w-xs shadow-lg">
                    <img className=" h-70 object-cover" src={skin.displayAssets[0].url} alt={skin.displayAssets[0].displayAsset} />
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
    </main>
  );
};

export default Skins;
