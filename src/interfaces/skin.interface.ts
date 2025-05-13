export default interface Skin {
    mainId: string;
    displayName: string;
    displayType:string;
    price:{
        finalPrice:number;
    };
    imageUrl: string;
    section: {
        id:string;
        name: string;
    };
    rarity:{
        id:string;
        name:string;
    };
    colors:{
        color1:string;
        color2:string;
        color3:string;
        textBackgroundColor:string;    
    }
    displayAssets:{
        background:string;
        displayAsset:string
        url:string;
    }[];
}