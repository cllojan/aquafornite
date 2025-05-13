import Skin from "@/interfaces/skin.interface";


export function OrderSkins(skins:Skin[]): Record<string, Skin[]> {
    let groups:Record<string, Skin[]> = {};
    skins.forEach(item => {
        const grupo = item.section?.name || "Sin Nombre";
        if (!groups[grupo]) {
            groups[grupo] = [] ;
        }
        groups[grupo].push(item);
    })
    
    const ordered = Object.keys(groups)
        .sort()
        .flatMap(group => groups[group]);
    console.log(ordered)
    
    return groups
}
