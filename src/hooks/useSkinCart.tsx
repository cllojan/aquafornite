import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { showToast } from "nextjs-toast-notify";

import Skin, { SkinWithDiscount } from "@/interfaces/skin.interface";
interface SkinItem extends SkinWithDiscount{
    quantity:number;
}
interface SkinStore {
    items: SkinWithDiscount[],    
    addItem: (data: SkinWithDiscount) => void,
    removeItem: (id: string) => void,
    removeAll: () => void,
    
}

export const useSkinCart = create(persist<SkinStore>((set,get) => ({
    items:[],
    addItem:(data:SkinWithDiscount) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.mainId === data.mainId)
        if(existingItem){
            return showToast.success("¡Like registrado con éxito, gracias 😘!", {
                    duration: 3000,
                    position: "bottom-center",
                    transition: "swingInverted",
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>',
                    sound: true,
                  });
            
        }
        set({
            items:[...get().items,data]
        })
        console.log(get().items)
    },
    
    removeItem:(id:string) => {
        set({items:[...get().items.filter(item => item.mainId != id)]})
        console.log(get().items)
    },
    removeAll:() => set({items:[]}),
    
    
}),{
    name:'skin-cart',
    storage:createJSONStorage(() => localStorage)
}))
