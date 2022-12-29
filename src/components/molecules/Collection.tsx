import { Tooltip, Watermark } from 'antd'
import React from 'react'
import { BigText, MidText, SmallText } from '../atoms/styles'

const Collection: React.FC<{info: BaseKeyVal[]}> = ({info}) => {

    return (
        <Watermark content="beta.loaprofile.com"
            font={{
                color: "gray", fontSize: 12
            }}
            width={100}
            rotate={0}
            height={300}
            gap={[1000,1000]}
            offset={[10,5]}
            style={{
                border: '1px solid #a7aeb4',
                borderRadius: "8px",
                width: "100%",
            }}
        >
            <BigText>Collection</BigText>
            <div style={{
                textAlign: "center",
                margin: "10px 1px 5px 1px",
                width: "100%",
                gridColumn: "span 2"
            }}>
                <table width="98%" align='center'>
                    <thead>
                        <tr>
                            {info.map((a, idx) => (
                                <Tooltip key={idx} title={a.name}>
                                    <th>
                                        <img alt={a.name} src={`images/collections/${a.name}.png`} />
                                    </th>
                                </Tooltip>
                            ))}
                        </tr>
                    </thead>
                    <tbody>            
                        <tr>
                            {info.map((a, idx) => (
                                <th key={idx}>
                                    <MidText>{a.value}</MidText>
                                </th>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </Watermark>
    )
}

export default Collection