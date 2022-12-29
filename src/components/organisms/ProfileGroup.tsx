import React, { useContext, useEffect } from 'react'
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

    const { setProfiles, profiles, tags } = useContext(LoaContext)
    
    const TripodOpen = tags.includes("7")
    const gridWidth = TripodOpen ? CARD_WIDTH*2 : CARD_WIDTH
    const { width } = useWindowDimensions()
    const colCount = Math.min(profiles.length, TripodOpen ? 1 : 3, Math.max(1, Math.floor(width / gridWidth)))

    console.log(colCount)

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

    useEffect(() => {

    }, [profiles])
    

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
                            maxWidth: `${colCount*gridWidth}px`
                        }}>
                            <div style={{
                                display: "grid",
                                gap: "2px",
                                justifyContent: width > gridWidth ? "center" : "normal",
                                gridTemplateColumns: `repeat(${colCount}, 1fr)`,
                            }}>
                                {tags.includes("0") ? <div style={{
                                    minWidth: `${gridWidth}px`,
                                    gridColumn: `span ${colCount}`,
                                }}>
                                    <Collection info={profiles[0].collectInfo}/>
                                </div> : null}
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