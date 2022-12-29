import React, { useContext } from 'react'
import { BLUE_TONE, jobBooks } from '../../func/constant';
import { BigText, ColumnFlexDiv, IconImg, MidText, RowFlexDiv, SmallText } from '../atoms/styles';
import { HeartFilled } from '@ant-design/icons';
import { GiCrossedSwords } from "react-icons/gi";
import { Avatar, Badge, Progress, Tooltip } from 'antd';
import { getColor } from '../../func/function';
import { LoaContext } from '../../contexts';
import { InfoCircleTwoTone } from '@ant-design/icons';

const SubEquip: React.FC<SubEquipInfo> = (info) => {

    const { isDark, isSecret } = useContext(LoaContext)

    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "345px",
                margin: "0 auto",
                borderTop: `1px dashed ${BLUE_TONE}`,
                padding: "0 5px 0 5px"
            }}>
                <ColumnFlexDiv style={{ 
                    width: "105px",
                    height: "130px"
                }}>
                    <RowFlexDiv style={{alignItems: "center", height: "50px", justifyContent: "flex-start"}}>
                        <Tooltip title={
                                    <>
                                        악세서리별로 가중치를 반영한 품질입니다. <br/>
                                        목걸이는 10, 귀걸이는 3, 반지는 2의 가중치가 책정됩니다. <br/>
                                        기준은 악세서리별 상승되는 최대 특성값입니다.
                                    </>
                                }>
                            <Badge count="!" color={BLUE_TONE} size="small" style={{
                                right: 5, top: 3
                            }}>
                                <Avatar 
                                    size={35}
                                    shape="square"
                                    src={info.accessory.length > 0 ? info.accessory[0].src : undefined} 
                                    crossOrigin="anonymous" 
                                    style={{marginRight: "5px", border: `1.5px solid ${BLUE_TONE}`}}
                                />
                            </Badge>
                        </Tooltip>
                        <div>
                            <SmallText>
                                품질 <b style={{color: getColor(info.accAvgQuality, isDark)}}>{info.accAvgQuality}</b>&nbsp;&nbsp;
                            </SmallText>
                        </div>
                    </RowFlexDiv>                   
                    <RowFlexDiv style={{flexGrow: 1, alignItems: "center", justifyContent: "flex-start"}}>
                        {info.brace.name ?                        <>
                            <Avatar 
                                size={35}
                                shape="square"
                                src={info.brace.src}
                                crossOrigin="anonymous" 
                                style={{marginRight: "5px", border: `1.5px solid ${info.brace.color}`}}
                            />
                            <ColumnFlexDiv>
                                {isSecret ? <SmallText>??</SmallText> : (
                                    info.brace.options.length > 0 
                                    ? ( info.brace.options.map((a: string) => (
                                        <SmallText>{a}</SmallText>
                                    )))
                                    : <SmallText> - </SmallText>
                                )}
                            </ColumnFlexDiv>                        
                        </>
                        : <Avatar size={35} shape="square">N</Avatar>}
                    </RowFlexDiv>
                </ColumnFlexDiv>
                <div style={{  
                    borderLeft: `1px dashed ${BLUE_TONE}`,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    height: "130px",
                    padding: "5px",
                    flexGrow: 1
                }}>
                    <MidText style={{gridColumn: "span 2"}}>각인 상세</MidText>
                    {info.imprintings.map((a, idx) => (
                        <div style={{textAlign: "left"}} key={idx}>
                            <SmallText strong style={{fontSize: "13px", textIndent: "5px", wordBreak: "keep-all"}}
                                type={jobBooks.includes(a.name) ? "success" : 
                                ( a.name.includes("감소") ? "danger" : undefined)}>
                                Lv.{a.value} {a.name}
                            </SmallText>
                            <br/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SubEquip