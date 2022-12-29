import { Badge, Tooltip } from "antd"
import { BLUE_TONE } from "../../func/constant"
import { BigText, SmallIconImg, RowFlexDiv, SmallText, ColumnFlexDiv, MidText } from "../atoms/styles"

const Jewels: React.FC<{info: Jewel[]}> = ({info}) => {

    return (
      <RowFlexDiv style={{
        justifyContent: "center", 
        flexWrap: "wrap",
        width: "345px",
        borderTop: `1px dashed ${BLUE_TONE}`,
        margin: "2px auto",
        paddingTop: '7px'
      }}>
        {info.length > 0 ? info.map((a, idx) => (
            <Tooltip title={a.desc} key={idx}>
                <ColumnFlexDiv>
                    <SmallIconImg src={a.src} crossOrigin="anonymous" style={{margin: "1px", border: `1.5px solid ${a.color}`}}/>
                    <MidText>{a.level}</MidText>
                </ColumnFlexDiv>
            </Tooltip>
        )) : <BigText>장착한 보석이 없습니다.</BigText>}
      </RowFlexDiv>
    )
  }
  
  export default Jewels