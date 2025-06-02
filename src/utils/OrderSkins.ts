import Skin, { SkinWithDiscount } from "@/interfaces/skin.interface";


export function OrderSkins(skins: SkinWithDiscount[], filters:{
    search? : string;
    rarity? : string;
    category? : string;
    sortBy?: string;
} = {}): { filteredSkins: Record<string, SkinWithDiscount[]>; categories: string[] } {
    let itemsFilter: Skin[] = skins

    itemsFilter = skins.filter(skin => {
        if (filters.search && !skin.displayName.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.rarity && filters.rarity !== "All" && !skin.rarity?.id.includes(filters.rarity)) return false;
        if (filters.category && filters.category !== "Todos" && !skin.section.name.includes(filters.category)) return false;

        return true
    })
    
    let filteredSkins: Record<string, SkinWithDiscount[]> = {};
    itemsFilter.forEach((item:any) => {
        const grupo = item.section.name.length <= 2 ? "" : item.section.name;
        if (!filteredSkins[grupo]) {
            filteredSkins[grupo] = [];
        }
        filteredSkins[grupo].push(item);
    })

    const sortFn = (a: SkinWithDiscount, b:SkinWithDiscount ) => {
        switch(filters.sortBy){
            case 'price_asc':
                return a.discount - b.discount;                
            case 'price_desc':
                return b.discount - a.discount;            
            default:
                return 0;

        }
    }

    for (const group in filteredSkins){
        filteredSkins[group] = filteredSkins[group].sort(sortFn)
    }

    const groupkeys = Object.keys(filteredSkins).sort((a,b) => {
        if(filters.sortBy === 'name_desc') return b.localeCompare(a);
        if(filters.sortBy === 'name_asc') return a.localeCompare(b);
        return 0;
    })
    
    const orderedFilteredSkins: Record<string, SkinWithDiscount[]> = {};
    for(const key of groupkeys){
        orderedFilteredSkins[key] = filteredSkins[key];
    }
    const categories = ["Todos", ...Object.keys(groupkeys)];
    console.log(categories)
    return { filteredSkins:orderedFilteredSkins, categories }
}
