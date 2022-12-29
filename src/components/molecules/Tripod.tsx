import { Avatar, Col, Row } from 'antd'
import Column from 'antd/es/table/Column'
import React from 'react'
import { BLUE_TONE } from '../../func/constant'
import { BigText, ColumnFlexDiv, IconImg, RowFlexDiv, SmallIconImg, SmallText } from '../atoms/styles'


const Tripod: React.FC<TripodInfo> = (info) => {

    const customSkills = Array.from(new Set(info.tripodList.map(a => a.originSkill)))

    const getColor = (tripod: Tripod) => {
        if (tripod.isMax) return "#4EE44E"
        else if (tripod.level === 4) return "#FFC300"
        else return "#FF7276"
    }

    return (
        <RowFlexDiv style={{
            justifyContent: "center", 
            flexWrap: "wrap", 
            margin: "2px auto",
            textAlign: "center"
        }}>
            {customSkills.length > 0 ? (
                <Row style={{marginTop: '2px'}}>
                    {customSkills.map((c, idx) => {
                        const filtered = info.tripodList.filter(a => a.originSkill === c)
                        return (                        
                            <Col span={12} key={idx} style={{
                                display: 'flex', 
                                alignItems: "center",
                                boxSizing: "border-box",
                                padding: "0 5px 5px 5px",
                            }}>                                 
                                <ColumnFlexDiv style={{width: "175px"}}>     
                                    <RowFlexDiv style={{marginBottom: "5px"}}>
                                        <SmallIconImg src={filtered[0].src}/>
                                        <br/>
                                        <SmallText>&nbsp;{filtered[0].originSkill}</SmallText>
                                    </RowFlexDiv>                                 
                                    {filtered.map((tripod, idx2) => (
                                        <div key={"tripod" + idx2} style={{display: 'flex', margin: "1px"}}>
                                            <Avatar 
                                                size='small'
                                                shape='square' 
                                                style={{
                                                    marginRight: "5px",
                                                    fontWeight: "bold",
                                                    backgroundColor: getColor(tripod)
                                                }
                                            }>{tripod.isMax ? "M" : tripod.level}</Avatar>
                                            <SmallText>{tripod.name}</SmallText>
                                        </div>
                                    ))}
                                </ColumnFlexDiv>
                            </Col>
                        )
                    })}
                </Row>   
            ) : null}            
            
        </RowFlexDiv>
    )
}

export default Tripod