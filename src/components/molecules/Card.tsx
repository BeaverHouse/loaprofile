import React from 'react'
import { BigText, ColumnFlexDiv, MidText, RowFlexDiv } from '../atoms/styles'
import { GiCardRandom } from "react-icons/gi";
import { BLUE_TONE } from '../../func/constant';

const Card: React.FC<{info: string[]}> = ({info}) => {
  return (
    <RowFlexDiv style={{
        justifyContent: "center", 
        flexWrap: "wrap", 
        width: "345px",
        borderTop: `1px dashed ${BLUE_TONE}`,
        margin: "2px auto",
        paddingTop: '7px'
    }}>
        <BigText strong style={{fontSize: "30px", marginRight: "15px"}}>
            <GiCardRandom/>
        </BigText>
        <ColumnFlexDiv>
            {info.map((val, idx) => (
                <MidText key={idx}>{val}</MidText>
            ))}
        </ColumnFlexDiv>
    </RowFlexDiv>
  )
}

export default Card