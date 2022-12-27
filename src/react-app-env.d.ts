/// <reference types="react-scripts" />

interface BaseKeyVal {
    name: string;
    value: number;
}

interface ItemInfo {
    src: string;
    color: string;
}

```
Advanced Unit
```
interface CharInfo {
    id: number;
    basicInfo : BasicInfo;
    collectInfo: BaseKeyVal[];
    equipInfo: EquipInfo;
    subEquipInfo: SubEquipInfo;
    jewelInfo: Jewel[],
    tripodInfo: TripodInfo;
    cardInfo: string[];
}

interface BasicInfo {
    server: string;
    job: string;
    nickname: string;
    displayName: string;  // 따로 표시할 이름
    itemLv: string;

    isSafe: boolean;
    link: string;

    atk: number;
    hp: number;

    fightLv: number;    // 전투레벨
    skillPt: number;
    maxSkillPt: number;
    adventureLv: number;    // 원대레벨
}

interface Clothes extends ItemInfo {
    name: string;
    quality: number; 
    level: number;
    set: string;
    setLv: number;
}

interface EquipInfo {
    defense: Clothes[];
    weapon: Clothes;
    defenseCut: number;
    defAvgQuality: number;
    setName: string;
    setLv: string;
}

interface Accessary extends ItemInfo {
    name: string;
    quality: number;   // 품질
}

interface Brace extends ItemInfo {
    name: string;
    options: string[];
}

interface SubEquipInfo {
    accessory: Accessary[],
    brace: Brace
    accAvgQuality: number;
    stats: BaseKeyVal[];
    imprintings: BaseKeyVal[];
    imprintSummay: string;
}

interface Jewel extends ItemInfo {
    name: string;
    desc: string;
    level: number;
}

interface Tripod {
    originSkill: string;
    name: string;
    level: number;
    isMax: boolean;
    src: string;
}

interface TripodInfo {
    lv5Tripod: number;
    lv4Tripod: number;
    maxTripod: number;
    tripodList: Tripod[]
}


// --------------------------------
// 아이템 관련
// --------------------------------
interface ItemPriceInfo {
    price: number;
    code: number;
    name: string;
}

interface GuardianPrice {
    data: ItemPriceInfo[]
    time: string
}