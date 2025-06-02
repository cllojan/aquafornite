import Skin, { SkinWithBlur, SkinWithDiscount } from "@/interfaces/skin.interface";
import { getPlaiceholder } from "plaiceholder";

export async function getSkins(){
    const res = await fetch("https://fortniteapi.io/v2/shop?lang=es", {
        headers : {
            authorization: `${process.env.APIKEY_FORTNITE}`
        }
    })
    const data = await res.json();
    const skinsRate = data.shop;
    const discountRate = 0.0043;

    //obtener claves para las categorias 
    const skins:SkinWithDiscount[] = skinsRate.map((skin:any)=> ({
        ...skin,
        discount: parseFloat((skin.price.finalPrice * discountRate).toFixed(2)),
    })) 
    let filteredSkins: Record<string, Skin[]> = {};
    skins.forEach((item:any) => {
        const grupo = item.section.name.length <= 2 ? "" : item.section.name;
        if (!filteredSkins[grupo]) {
            filteredSkins[grupo] = [];
        }
        filteredSkins[grupo].push(item);
    })
    /*
    const withBlur = await Promise.all(
        skins.map(async (skin:any) => {
            const imageUrl = skin.displayAssets[0]?.url;
            const imageRes = await fetch(imageUrl);
            const buffer = await imageRes.arrayBuffer();
            const { base64 } = await getPlaiceholder(Buffer.from(buffer));
            return {
                ...skin,
                blurDataUrl:base64,
            }
        })
    )*/
    const categories = ["Todos", ...Object.keys(filteredSkins)];
    return {skins, categories}
}   