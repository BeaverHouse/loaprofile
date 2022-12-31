import { Button, Spin, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { BattleItemOption, GuardianItems } from '../../func/constant';
import { getGuardianPrice, getIncome, getOutcome, saveImage } from '../../func/function';
import { BigText, ColumnFlexDiv, IconImg, MidText, RowFlexDiv, SmallText } from '../atoms/styles';
import { LoaContext } from '../../contexts';

function CalcPage() {

    const { isDark } = useContext(LoaContext);

    const [prices, setPrices] = useState<GuardianPrice>({} as GuardianPrice)
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      getGuardianPrice().then(data => {
        setPrices(data);
        setLoading(false)
      });
    }, [])

    return (
      <div style={{width: "100%", marginTop: "70px"}}>
        {loading ? <ColumnFlexDiv>
            <Spin tip="Loading..." style={{marginTop: "30px"}}/>
        </ColumnFlexDiv> : <>
            <RowFlexDiv>
              <Button type="primary" style={{margin: "2px"}} onClick={() => saveImage(`guardian`, isDark)}>
                  다운로드
              </Button>
            </RowFlexDiv>
            <ColumnFlexDiv style={{ width: "100%", margin: "0 auto", overflow: "auto"}}>
              <div id="guardian" style={{minWidth: "825px"}}>
                <MidText>갱신 시간 : {prices.time}</MidText>
                <br/>
                <BigText>오늘의 거래 가격</BigText>
                <table style={{marginTop: "5px", minWidth: "800px", justifyContent: "center"}}>
                  <tbody>
                    <tr>
                      {prices.data.filter(a => Math.floor(a.code/1000) === 66110).map((a => (
                        <td>
                          <Tooltip title={a.name}>
                            <IconImg src={`images/items/${a.code}.png`} 
                              crossOrigin="anonymous" style={{margin: "1px"}}/>
                          </Tooltip>                        
                          <MidText>{a.price.toFixed(1)}</MidText>
                        </td>
                      )))}
                    </tr>
                    <tr>
                      {prices.data.filter(a => Math.floor(a.code/1000) === 66102).map((a => (
                        <td>
                          <Tooltip title={a.name}>
                            <IconImg src={`images/items/${a.code}.png`} 
                              crossOrigin="anonymous" style={{margin: "1px"}}/>
                          </Tooltip>
                          <MidText>{a.price.toFixed(2)}</MidText>
                        </td>
                      )))}
                    </tr>
                    <tr>
                      {prices.data.filter(a => Math.floor(a.code/1000) === 101 && a.name.includes("폭탄")).map((a => (
                        <td>
                          <Tooltip title={a.name}>
                            <IconImg src={`images/items/${a.code}.png`} 
                              crossOrigin="anonymous" style={{margin: "1px"}}/>
                          </Tooltip>
                          <MidText>{a.price.toFixed(1)}</MidText>
                        </td>
                      )))}
                    </tr>
                    <tr>
                      {prices.data.filter(a => Math.floor(a.code/1000) === 101 && !a.name.includes("폭탄")).map((a => (
                        <td>
                          <Tooltip title={a.name}>
                            <IconImg src={`images/items/${a.code}.png`} 
                              crossOrigin="anonymous" style={{margin: "1px"}}/>
                          </Tooltip>
                          <MidText>{a.price.toFixed(1)}</MidText>
                        </td>
                      )))}
                    </tr>
                  </tbody>
                </table>
                <BigText>수익표</BigText>
                <table className="table-bordered" style={{margin: "5px auto", minWidth: "825px"}}>
                  <thead>
                    <tr>
                      <th>가디언</th>
                      <th>2수 전리품</th>
                      <th>수익</th>
                      <th>배틀아이템</th>
                      <th>배템 상세</th>
                      <th>비용 평균</th>
                      <th>휴게X 2수 이득</th>
                      <th>휴게O 2수 이득</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GuardianItems.map((g) => (
                      BattleItemOption.filter((_, idx) => g.options.includes(idx+1)).map((b, idx) => (
                        <tr>
                          {idx === 0 ? <td rowSpan={g.options.length}>
                            <BigText>{g.name}</BigText>
                          </td>: null}
                          {idx === 0 ? <td rowSpan={g.options.length}>
                            {g.items.map((a, idx) => (
                              <>
                                {idx === 0 ? null : <br/>}
                                <SmallText>{a.name + " x " + a.value}</SmallText>
                              </>                          
                            ))}
                          </td>: null}
                          {idx === 0 ? <td rowSpan={g.options.length}>
                            <MidText>
                              {getIncome(g.items, prices)}
                            </MidText>
                          </td>: null}
                          <td>
                            <MidText type='success'>
                              {b.name}
                            </MidText>
                          </td>
                          <td>
                            {b.items.map((a, idx) => (
                              <>
                                {idx === 0 ? null : <br/>}
                                <SmallText>{a.name + " x " + a.value}</SmallText>
                              </>   
                            ))}
                          </td>
                          <td>
                            <MidText>
                              {getOutcome(b.items, prices)}
                            </MidText>
                          </td>
                          <td>
                            <BigText type='success'>
                              {Math.round((getIncome(g.items, prices) - getOutcome(b.items, prices))*10)/10}
                            </BigText>                       
                          </td>
                          <td>
                            <BigText type='success'>
                              {Math.round((2*getIncome(g.items, prices) - getOutcome(b.items, prices))*10)/10}
                            </BigText>
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>              
            </ColumnFlexDiv>
            
        </>}
      </div>
    )
}

export default CalcPage