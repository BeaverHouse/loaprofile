import { Progress } from 'antd'
import React, { useContext } from 'react'
import { LoaContext } from '../../contexts'
import { BLUE_TONE } from '../../func/constant'
import { getColor } from '../../func/function'
import { ColumnFlexDiv, IconImg, MidText, RowFlexDiv, SmallText } from '../atoms/styles'

const Armor: React.FC<EquipInfo> = (info) => {

    const { isSecret, isDark } = useContext(LoaContext)

  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "345px",
        margin: "0 auto",
        borderTop: `1px dashed ${BLUE_TONE}`,
        padding: "5px 10px 5px 10px"
    }}>
        {info.defense.length > 0 ? 
        <>
            <RowFlexDiv>
                {info.defense.map((a, idx) => (
                    <div key={idx}>
                        <IconImg src={a.src} crossOrigin="anonymous" style={{margin: "5px 3px 0 3px", border: `1.5px solid ${a.color}`}}/>
                        <div>
                            { isSecret 
                            ? null
                            : <SmallText>
                                <b style={{color: getColor(a.quality, isDark)}}>{a.quality}</b>
                            </SmallText>}
                        </div>
                    </div>
                ))}
            </RowFlexDiv>
            <ColumnFlexDiv style={{marginLeft: "10px"}}>
                <SmallText strong style={{fontSize: "14px"}}>
                    방컷 {info.defenseCut}
                </SmallText>
                <SmallText strong style={{fontSize: "14px"}}>
                    {info.setLv}
                </SmallText>       
                <SmallText strong style={{fontSize: "14px"}}>
                    {info.setName}
                </SmallText>
            </ColumnFlexDiv>
        </>
        : <MidText>방어구 없음</MidText>}
    </div>
  )
}

export default Armor