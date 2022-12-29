import React from 'react'
import { BLUE_TONE } from '../../func/constant';
import { BigText, ColumnFlexDiv, MidText, SmallText } from '../atoms/styles';
import { HeartFilled } from '@ant-design/icons';
import { GiCrossedSwords } from "react-icons/gi";
import { Progress } from 'antd';

const Summary: React.FC<CharInfo> = (info) => {

    const EffectStats = info.subEquipInfo.stats.filter(a => a.value > 200)

    return (
        <div style={{
            width: "345px",
            margin: "0 auto",
            marginTop: "5px",
            display: "grid",
            gridTemplateColumns: `1fr 1fr 1fr`,
            borderTop: `1px dashed ${BLUE_TONE}`,
        }}>
            <ColumnFlexDiv style={{
                width: "110px",
                textAlign: "left",
                padding: "5px",
                borderRight: `1px dashed ${BLUE_TONE}`,
                borderBottom: `1px dashed ${BLUE_TONE}`,
            }}>
                <MidText>전투 Lv.{info.basicInfo.fightLv}</MidText>
                <MidText>원정대 Lv.{info.basicInfo.adventureLv}</MidText>
                <MidText>SP {info.basicInfo.skillPt} / {info.basicInfo.maxSkillPt}</MidText>
            </ColumnFlexDiv>
            <ColumnFlexDiv style={{
                width: "100px",
                justifyContent: "center",
                borderBottom: `1px dashed ${BLUE_TONE}`,
                textAlign: "left",
                padding: "5px"
            }}>
                <MidText style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <GiCrossedSwords/>&nbsp;&nbsp;{info.basicInfo.atk}
                </MidText>
                <MidText style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <HeartFilled/>&nbsp;&nbsp;{info.basicInfo.hp}
                </MidText>
            </ColumnFlexDiv>
            <ColumnFlexDiv style={{
                width: "135px",
                textAlign: "left",
                padding: "10px",
                alignItems: "center",
                borderLeft: `1px dashed ${BLUE_TONE}`,
                gridRow: `span 2`,
            }}>
                <MidText style={{ marginBottom: "3px" }}>Tripod</MidText>
                <Progress 
                    percent={(info.tripodInfo.lv4Tripod + info.tripodInfo.lv5Tripod)/info.tripodInfo.maxTripod*100} 
                    success={{ percent: info.tripodInfo.lv5Tripod/info.tripodInfo.maxTripod*100 }} 
                    format={() => <BigText>
                        {info.tripodInfo.lv4Tripod + info.tripodInfo.lv5Tripod} / {info.tripodInfo.maxTripod}
                    </BigText>}
                    width={80}
                    type="circle" 
                />
                <MidText style={{ marginTop: "5px" }}>
                    Lv.4 : {info.tripodInfo.lv4Tripod}&nbsp;&nbsp;&nbsp;Lv.5 : {info.tripodInfo.lv5Tripod}
                </MidText>
            </ColumnFlexDiv>
            <ColumnFlexDiv style={{
                width: "110px",
                borderRight: `1px dashed ${BLUE_TONE}`,
                textAlign: "left",
                padding: "5px"
            }}>
                {EffectStats.map((a, idx) => (
                    <div style={{textAlign: "left"}} key={idx}>
                        <SmallText strong>
                            {a.name} {a.value}
                        </SmallText>
                        <br/>
                    </div>
                ))}                
                <MidText type="success">
                    특합 {EffectStats.reduce((a, b) => a+b.value, 0)}
                </MidText>
            </ColumnFlexDiv>
            <ColumnFlexDiv style={{
                width: "100px",
                padding: "5px",
                justifyContent: "center"
            }}>
                <BigText style={{fontSize: "22px"}}>{info.subEquipInfo.imprintSummay}</BigText>
            </ColumnFlexDiv>
        </div>
    )
}

export default Summary