import { Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

export const ColumnFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`
export const RowFlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 9px;
`

export const SmallText = styled(Text)`
    font-size: 12px;
`
export const MidText = styled(Text)`
    font-size: 14px;
    font-weight: 600;
`
export const BigText = styled(Text)`
    font-size: 17px;
    font-weight: 600;
`

// 이미지 아이콘
export const IconImg = styled.img`
    width: 35px;
    height: 35px;
`
export const SmallIconImg = styled.img`
    width: 28px;
    height: 28px;
`