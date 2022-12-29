import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Card } from 'antd';
import React from 'react'
import Header from '../molecules/Header';

const Profile : React.FC<CharInfo> = (info) => {

    const {
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
      id: info.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex : isDragging ? "100" : "auto"
    };
  
    return (
        <div ref={setNodeRef} style={style} id={`profile-loa-${info.id}`}>
        <Card.Grid hoverable={false} 
            style={{width: "100%", border: '1px solid #a7aeb4', boxShadow: 'unset', borderRadius: "8px"}
        }>
            <Header {...info.basicInfo}/>
        </Card.Grid>
        </div>
    )
}

export default Profile