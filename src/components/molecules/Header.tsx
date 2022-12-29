import React, { useContext, useEffect, useState } from 'react'
import { LoaContext } from '../../contexts';
import { BLUE_TONE, CARD_WIDTH, DARK_PRIMARY } from '../../func/constant';
import { BigText, IconImg, MidText, RowFlexDiv } from '../atoms/styles';
import { EditOutlined, WarningOutlined } from '@ant-design/icons';
import { Watermark } from 'antd';

const Header: React.FC<{info: BasicInfo, id: number}> = ({info, id}) => {

    const [editableStr, setEditableStr] = useState(
        info.displayName ? info.displayName : info.nickname
    );
    const { isDark, profiles } = useContext(LoaContext)

    const updateDisplayName = (name: string) => {
        const profile = profiles.find(a => a.id === id) || {} as CharInfo;
        profile.basicInfo.displayName = name
        setEditableStr(name)
    }

    useEffect(() => {
        setEditableStr(info.displayName ? info.displayName : info.nickname)
    }, [id])

    return (
        <Watermark content="beta.loaprofile.com"
            font={{
                color: "gray", fontSize: 12
            }}
            width={100}
            rotate={0}
            height={300}
            gap={[1000,1000]}
            offset={[10,0]}
        >
            <RowFlexDiv style={{
                width: `${CARD_WIDTH}px`, minHeight: "40px", paddingTop: "10px"
            }}>
                <IconImg src={`images/jobs/${info.job}.png`} style={{
                    backgroundColor: isDark ? BLUE_TONE : undefined,
                    margin: "2.5px 7.5px 2.5px 5px",
                    borderRadius: "5px"
                }}/>
                <div style={{width: "210px", textAlign: "left"}}>
                    <MidText
                        style={{margin: "2px"}}
                        editable={info.isSafe ? {
                            onChange: updateDisplayName,
                            tooltip: "이름 수정",
                            maxLength: 12,
                            enterIcon: null,
                            icon: <EditOutlined style={{
                                color: isDark ? DARK_PRIMARY : undefined
                            }}/>
                        } : false}
                    >
                        {editableStr}
                    </MidText>
                </div>
                <div style={{margin: "0 5px 0 5px", width: "70px"}}>
                    <MidText>
                        Item
                    </MidText>
                    <br/>
                    <BigText>
                        {info.itemLv}
                    </BigText>
                </div>
            </RowFlexDiv>
            { info.isSafe ? null : 
                <div style={{
                    width: `${CARD_WIDTH-10}px`, 
                    height: "35px", 
                    margin: "5px",
                    borderRadius: "5px",
                    backgroundColor: "red"
                }}>
                    <BigText style={{color: "white", lineHeight: "35px"}}>
                        <WarningOutlined/> 로스트아크 채널 영구차단 유저입니다.
                    </BigText>
                </div>
            }
        </Watermark>
    )
}

export default Header