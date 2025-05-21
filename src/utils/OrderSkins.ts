import Skin from "@/interfaces/skin.interface";


export function OrderSkins(skins: Skin[], filters: any = {}): { filteredSkins: Record<string, Skin[]>; categories: string[] } {
    let itemsFilter: Skin[] = skins
    if (filters.rarity != 'All' || filters.category != 'All') {        
        itemsFilter = skins.filter(skin => {
            if (filters.rarity && !skin.rarity?.id.includes(filters.rarity) && filters.rarity !== "All") return false;
            if (filters.category && !skin.section.name.includes(filters.category) && filters.category !== "All") return false;
            return true
        })
    }



    let filteredSkins: Record<string, Skin[]> = {};
    itemsFilter.forEach(item => {
        
        
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
    const categories = ["All",...Object.keys(filteredSkins)];

    return { filteredSkins, categories }
}
