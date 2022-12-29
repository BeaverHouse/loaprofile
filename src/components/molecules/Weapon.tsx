import { Empty, Progress } from 'antd'
import React, { useContext } from 'react'
import { LoaContext } from '../../contexts'
import { BLUE_TONE } from '../../func/constant'
import { getColor } from '../../func/function'
import { ColumnFlexDiv, IconImg, MidText, SmallText } from '../atoms/styles'

const Weapon: React.FC<EquipInfo> = (info) => {

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
        {info.weapon.name ?
        <>
            <IconImg src={info.weapon.src} crossOrigin="anonymous" 
                style={{marginRight: "15px", border: `1.5px solid ${info.weapon.color}`}}
            />
            <ColumnFlexDiv style={{width: "250px", alignItems: "flex-start"}}>
                <MidText>
                    {info.weapon.name}
                </MidText>
                { isSecret 
                ? null
                : <Progress percent={info.weapon.quality} size='small'
                    format={() => <SmallText>
                        {info.weapon.quality}
                    </SmallText>} 
                    style={{width: "200px", margin: 0}}
                    strokeColor={getColor(info.weapon.quality, isDark)}
                />}
            </ColumnFlexDiv>
        </>
        : <MidText>무기 없음</MidText>}
    </div>
  )
}

export default Weapon