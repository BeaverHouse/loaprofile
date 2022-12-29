import React, { useContext, useState } from 'react'
import { LoaContext } from '../../contexts';
import { CARD_WIDTH, DARK_PRIMARY } from '../../func/constant';
import { BigText, IconImg, MidText, RowFlexDiv } from '../atoms/styles';
import { EditOutlined, WarningOutlined } from '@ant-design/icons';

const Header: React.FC<BasicInfo> = (info) => {
    const [editableStr, setEditableStr] = useState(
        info.displayName ? info.displayName : info.nickname
    );
    const { isDark } = useContext(LoaContext)

    return (
        <>
            <RowFlexDiv style={{
                width: `${CARD_WIDTH}px`, minHeight: "40px"
            }}>
                <IconImg src={`images/jobs/${info.job}.png`} style={{
                backgroundColor: isDark ? "#a7aeb4" : undefined,
                margin: "2.5px 7.5px 2.5px 5px"
                }}/>
                <div style={{width: "220px", textAlign: "left"}}>
                    <MidText
                        style={{margin: "5px"}}
                        editable={info.isSafe ? {
                            onChange: setEditableStr,
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
                <div style={{margin: "0 5px 0 5px", width: "60px"}}>
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
        </>
    )
}

export default Header