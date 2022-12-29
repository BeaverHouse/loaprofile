import { NotificationInstance } from "antd/es/notification/interface"
import axios from "axios"
import html2canvas from "html2canvas"

export const getCharInfo = async (name: string, id: number, noti: NotificationInstance) => {
    const url = `${process.env.REACT_APP_LOA_HOST}/v3/char/${encodeURI(name)}`    

    try {
        const res = await axios.get(url)
        if (res.status === 200) {
            const info = res.data as CharInfo
            info.id = id
            return info
        }
    } catch {
        noti.error({
            message: "해당하는 캐릭터가 없거나, 인게임 점검 중입니다.",
            description: name
        })
    }

    return {} as CharInfo
}

export const getGuardianPrice = async () => {
    const url = `${process.env.REACT_APP_LOA_HOST}/v3/guardian/price`
    
    const res = await axios.get(url)
    if (res.status === 200) {
        const info = res.data as GuardianPrice
        return info
    } 
        
    return {} as GuardianPrice
}

export const getColor = (quality: number, isDark=false) => {
    if (isDark) return undefined
    if (quality === 100) return "#FF5E00"
    else if (quality >= 90) return "#FF00DD"
    else if (quality >= 70) return "#0054FF"
    else return undefined 
}

export const saveImage = (tag: string, isDark=false, displayName = Date.now().toString()) => {
    const element = document.getElementById(tag)
    if (!element) return;
    html2canvas(element, {
        allowTaint: true,
        scale: 1.5,
        useCORS: true,
        backgroundColor: isDark ? "#2c3e50" : "white",
        ignoreElements: (element) => element.className === "profile-buttons"
    }).then((canvas) => {
        const dataUrl = canvas.toDataURL()
        const link = document.createElement('a');
        link.download = `${displayName}.png`;
        link.href = dataUrl;
        link.click();
    })
}

// export const getNotiText = (data: CharInfo) => `
// ${getImprintingNum(data.imprintingInfo)} 무기 Lv.${data.simpleEquipInfo.weapon.level} ${data.mainInfo.job}
// 최대 스포 ${data.skillInfo.maxSkillPt}, Lv5 트포 ${data.skillInfo.lv5Tripod}/${data.skillInfo.maxTripod}, Lv4 트포 ${data.skillInfo.lv4Tripod}/${data.skillInfo.maxTripod}
            
// ${data.isSafe ? "안전한 유저입니다." : "로스트아크 채널 영구차단 유저입니다."}
// `

export const getIncome = (data: {
    name: string;
    value: number;
}[], prices: GuardianPrice) => {
    const res = data.map(a => {
        const price = prices?.data.find(b => b.name === a.name)?.price || 0
        return price * a.value
    }).reduce((a,b) => a+b, 0)
    return Math.round(res*10)/10
}

export const getOutcome = (data: {
    name: string;
    value: number;
}[], prices: GuardianPrice) => {
    const res =  data.map(a => {
        const price = prices.data.find(b => b.name === a.name)?.price || 0
        return price * a.value / 4
    }).reduce((a,b) => a+b, 0)
    return Math.round(res*10)/10
}