import React, { useContext } from 'react'
import { LoaContext } from '../../contexts';
import { useSensors, useSensor, KeyboardSensor, DndContext, closestCenter, DragEndEvent, MouseSensor } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import useWindowDimensions from '../../func/useWindowDimensions';
import { Empty } from 'antd';
import { ColumnFlexDiv, RowFlexDiv } from '../atoms/styles';
import Collection from '../molecules/Collection';
import { CARD_WIDTH } from '../../func/constant';
import Profile from './Profile';



function ProfileGroup() {

    const { setProfiles, addProfile, profiles } = useContext(LoaContext)
    const { width } = useWindowDimensions()
    const colCount = Math.min(profiles.length, 3, Math.max(1, Math.floor(width / CARD_WIDTH)))

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    
    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        if (active.id !== over?.id) {
          const oldIndex = profiles.map(a => a.id).indexOf(parseInt(active.id.toString()));
          const newIndex = profiles.map(a => a.id).indexOf(parseInt(over?.id.toString() || '0'));
            
          setProfiles(arrayMove(profiles, oldIndex, newIndex));
        }
    }   

    return (
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={profiles.map(a => a.id)}
            >
                <RowFlexDiv>
                    { profiles.length > 0 ?
                        <ColumnFlexDiv id="profile-wrapper" style={{
                            width: "95%",
                            maxWidth: `${colCount*CARD_WIDTH}px`
                        }}>
                            <div style={{
                                display: "grid",
                                gap: "2px",
                                justifyContent: width > CARD_WIDTH ? "center" : "normal",
                                gridTemplateColumns: `repeat(auto-fit)}`,
                            }}>
                                <div style={{
                                    minWidth: `${CARD_WIDTH}px`,
                                    gridColumn: `span ${colCount}`,
                                }}>
                                    <Collection info={profiles[0].collectInfo}/>
                                </div>
                                {profiles.map(a => a.id).map((id) => {
                                    const profile = profiles.find(a => a.id === id) || {} as CharInfo;
                                    return <Profile {...profile}/>
                                })}
                            </div>
                        </ColumnFlexDiv>
                    : <Empty description={"아직 아무것도 없어요..."}/> }
                </RowFlexDiv>
            </SortableContext>
        </DndContext>
    )
}

export default ProfileGroup