import Skin from "@/interfaces/skin.interface";


export function OrderSkins(skins:Skin[],filters: any = {}): Record<string, Skin[]> {
    let itemsFilter = skins.filter(skin => {
            if(filters.rarity && !skin.rarity?.id.includes(filters.rarity) && filters.rarity !== "all" && skin.rarity.id == null) return;
            return true
        })
    
    
    let groups:Record<string, Skin[]> = {};
    itemsFilter.forEach(item => {
        const grupo = item.section?.name || "Sin Nombre";
        if (!groups[grupo]) {
            groups[grupo] = [] ;
        }
        groups[grupo].push(item);
    })
    
    const ordered = Object.keys(groups)
        .sort()
        .flatMap(group => groups[group]);
    
    console.log(groups)
    return groups
}
