import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Card as AntdCard } from 'antd';
import React, {useContext, useEffect} from 'react'
import { LoaContext } from '../../contexts';
import { BLUE_TONE } from '../../func/constant';
import { ColumnFlexDiv, RowFlexDiv } from '../atoms/styles';
import Armor from '../molecules/Armor';
import Card from '../molecules/Card';
import Header from '../molecules/Header';
import Jewels from '../molecules/Jewel';
import SubEquip from '../molecules/SubEquip';
import Summary from '../molecules/Summary';
import Tripod from '../molecules/Tripod';
import Utils from '../molecules/Utils';
import Weapon from '../molecules/Weapon';

const Profile : React.FC<CharInfo> = (info) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
      id: info.id,
    });

    const { tags } = useContext(LoaContext)

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex : isDragging ? "100" : "auto",
      border: isDragging ? "3px solid red" : `1px solid ${BLUE_TONE}`,
      borderRadius: "8px"
    };
  
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} id={`profile-loa-${info.id}`}>
            <AntdCard.Grid hoverable={false} 
                style={{width: "100%", height: "100%",  boxShadow: 'unset'}}
            >
                <RowFlexDiv style={{
                    alignItems:"stretch"
                }}>
                    <ColumnFlexDiv>                    
                        <Header info={info.basicInfo} id={info.id}/>
                        {tags.includes("1") ? <Summary {...info}/> : null}
                        {tags.includes("2") ? <Weapon {...info.equipInfo}/> : null}
                        {tags.includes("3") ? <Armor {...info.equipInfo}/> : null}
                        {tags.includes("4") ? <SubEquip {...info.subEquipInfo}/> : null}
                        {tags.includes("5") ? <Jewels info={info.jewelInfo}/> : null}
                        {tags.includes("6") ? <Card info={info.cardInfo}/> : null}      
                        {!tags.includes("7") ? <Utils id={info.id}/> : null}                   
                    </ColumnFlexDiv>
                    {tags.includes("7") ? <ColumnFlexDiv style={{
                        borderLeft: `1px dashed ${BLUE_TONE}`,
                    }}>    
                        <Tripod {...info.tripodInfo}/>
                        <Utils id={info.id}/>
                    </ColumnFlexDiv> : null}
                </RowFlexDiv>
            </AntdCard.Grid>
        </div>
    )
}

export default Profile