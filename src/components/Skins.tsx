'use client'

import { OrderSkins } from "@/utils/OrderSkins";
import { useEffect, useState } from "react";
import Skin from "@/interfaces/skin.interface";


import { Button } from '@heroui/button';
import { Icon } from "@iconify/react";
import { Input } from "@heroui/react";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
const Skins: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rarity, setRarity] = useState(new Set<string>([]));
  const [category, setCategory] = useState(new Set<string>([""]));
  const [sortBy, setSortBy] = useState(new Set(["newest"]));
  const [skins, setSkins] = useState<Record<string, Skin[]>>({});

  const handleSearch = () => {
    console.log({
      searchQuery,
      rarity: Array.from(rarity)[0] || "all",
      category: Array.from(category)[0] || "all",
      sortBy: Array.from(sortBy)[0] || "newest"
    })
  }
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
    <main className="w-full flex flex-col items-center justify-center min-h-screen bg-content1 dark:bg-background p-2">
      <div className="w-full bg-content1 p-6">

        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          <div className="w-full md:flex-1">
            <Input
              label="Buscar"
              placeholder="Buscar skin..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              classNames={{
                inputWrapper: "shadow-none",
              }}
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              label={"Rarezas"}
              placeholder={"Selecionar por rareza"}
              selectedKeys={rarity}
              onSelectionChange={(keys) => {
                setRarity(new Set(keys as Iterable<string>))
              }}
              classNames={{
                trigger: "shadow-none",
              }}
            >
              {categories.map((item) => (
                <SelectItem key={item.key} textValue={item.label}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full md:w-64">
            <Select
              label={"Rarezas"}
              placeholder={"Selecionar por rareza"}
              selectedKeys={category}
              onSelectionChange={(keys) => {
                setCategory(new Set(keys as Iterable<string>))
              }}
              classNames={{
                trigger: "shadow-none",
              }}
            >
              {categories.map((item) => (
                <SelectItem key={item.key} textValue={item.label}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full md:w-64">
            <Select
              label={"Rarezas"}
              placeholder={"Selecionar por rareza"}
              selectedKeys={rarity}
              onSelectionChange={(keys) => {
                setRarity(new Set(keys as Iterable<string>))
              }}
              classNames={{
                trigger: "shadow-none",
              }}
            >
              {categories.map((item) => (
                <SelectItem key={item.key} textValue={item.label}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full  md:w-auto md:self-end">
            <Button
              color="primary"
              className="w-full md:w-auto"
              onPress={handleSearch}
              startContent={<Icon icon="lucide:filter" />}
            >
              Search
            </Button>
          </div>
        </div>
        <section className="">

          {Object.entries(skins).map(([key, value]) => (

            <div className="flex flex-col " key={key}>
              <h2 className="text-2xl font-semibold mt-8">{key}</h2>
              <div className="grid grid-cols-1 gap-4 mt-4  xl:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  h-full">
                {
                  value.map((skin, idx) => (

                    <Card
                      key={idx}
                      className="flex-shrink-0 h-[280px] max-w-xs relative overflow-hidden"
                      style={{
                        background: skin.colors.color1,
                        backgroundImage: `linear-gradient(180deg, ${skin.colors.color1} 0%, ${skin.colors.color2} 50%, ${skin.colors.color3})`
                      }}
                    >
                      <Image
                        
                        removeWrapper
                        alt={skin.displayAssets[0].displayAsset}// add hover zoomed with transition in image
                        className={`z-0 w-full h-full object-cover `}
                        src={skin.displayAssets[0].url}
                      />
                      <CardFooter className="absolute bg-gradient-to-t from-zinc-900  ellipsis to-transparent bottom-0 z-10 pb-2">
                        <div className="flex flex-col">
                          <span className="text-white/75 text-tiny">{skin.price.finalPrice}</span>
                          <span className="text-white  font-semibold truncate ellipsis">{skin.displayName}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                }
              </div>

            </div>

          ))}
        </section>
      </div>

    </main>
  );
};

export default Skins;
