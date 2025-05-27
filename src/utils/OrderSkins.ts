import Skin, { SkinWithDiscount } from "@/interfaces/skin.interface";


export function OrderSkins(skins: Skin[], filters: any = {}): { filteredSkins: Record<string, SkinWithDiscount[]>; categories: string[] } {
    let itemsFilter: Skin[] = skins

    itemsFilter = skins.filter(skin => {
        if (filters.search && !skin.displayName.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.rarity && filters.rarity !== "All" && !skin.rarity?.id.includes(filters.rarity)) return false;
        if (filters.category && filters.category !== "All" && !skin.section.name.includes(filters.category)) return false;

        return true
    })



    console.log(filters)
    let filteredSkins: Record<string, SkinWithDiscount[]> = {};
    itemsFilter.forEach((item:any) => {
        const grupo = item.section.name.length <= 2 ? "" : item.section.name;
        if (!filteredSkins[grupo]) {
            filteredSkins[grupo] = [];
        }
        filteredSkins[grupo].push(item);
    })

    const ordered = Object.keys(filteredSkins)
        .sort()
        .flatMap(group => filteredSkins[group]);

    console.log(filteredSkins)
    const categories = ["All", ...Object.keys(filteredSkins)];

    return { filteredSkins, categories }
}
