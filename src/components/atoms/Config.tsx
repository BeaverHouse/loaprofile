import React, { useState, useContext } from 'react'
import { SettingOutlined  } from '@ant-design/icons';
import { App, Button, Modal, Switch, Tag } from 'antd';
import { LoaContext } from '../../contexts';
import { BigText, ColumnFlexDiv, MidText, SmallText } from './styles';
import { BLUE_TONE, tagsData } from '../../func/constant';

const { CheckableTag } = Tag;

function Config() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isDark, toggleDark, isSecret, toggleSecret, tags, toggleTags } = useContext(LoaContext);
    const { notification } = App.useApp()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (tag: string, checked: boolean) => {
        if(tag === "0" && checked) {
            notification.info({
                message: "가장 앞에 있는 캐릭터의 수집품 정보가 표시될 거에요."
            })
        } else if (tag === "7" && checked) {
            notification.info({
                message: "트라이포드는 오른쪽에 표시되고, 설정에 따라 명함이 예쁘지 않을 수 있어요."
            })
        }

        const newTags = checked
        ? [...tags, tag]
        : tags.filter((t) => t !== tag);
        toggleTags(newTags);
    };

  return (
    <>
        <Button type="primary"
            style={{ margin: 3}} 
            shape="circle" 
            onClick={showModal}
            icon={<SettingOutlined />} 
        />
        <Modal title="설정" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <ColumnFlexDiv style={{ alignItems: "flex-start" }}>
                <MidText>명함 설정</MidText>
                <SmallText>명함에서 표시할 정보를 설정할 수 있어요.</SmallText>
                
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    margin: '10px 0 5px 0'
                }}>
                    {tagsData.map((tag, idx) => (
                        <CheckableTag
                            key={tag}
                            checked={tags.indexOf(idx.toString()) > -1}
                            style={{
                                border: `1px solid ${BLUE_TONE}`,
                                margin: "3px"
                            }}
                            onChange={(checked) => handleChange(idx.toString(), checked)}
                        >
                        {tag}
                        </CheckableTag>
                    ))}
                </div>
                <MidText>일반 설정</MidText>
                <div>
                    <Switch checked={isDark} onChange={toggleDark}/>&nbsp;&nbsp;다크 모드
                </div>
                <div>
                    <Switch checked={isSecret} onChange={toggleSecret}/>&nbsp;&nbsp;품질,팔찌 가리기
                </div>
            </ColumnFlexDiv>
        </Modal>
    </>
  )
}

export default Config