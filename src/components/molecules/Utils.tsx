import { DeleteOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons"
import { Button, notification, Popconfirm, Watermark } from "antd"
import React from "react"
import { useContext } from "react"
import { saveImage } from "../../func/function"
import { LoaContext } from "../../contexts"
import { BLUE_TONE } from "../../func/constant"

const ProfileUtils: React.FC<{id : number}> = ({id}) => {

    const { removeProfile, isDark } = useContext(LoaContext)

    const deleteList = () => {
        removeProfile(id)
        notification.info({
            message: '삭제되었습니다.'
        });
    };

    return (
      <div className="profile-buttons"
        style={{
            justifyContent: "center", 
            flexWrap: "wrap", 
            borderTop: `1px dashed ${BLUE_TONE}`,
            width: "345px",
            margin: "2px auto",
            paddingTop: '7px'
      }}>
        <Button type="primary" shape="round"  style={{margin: "2px"}} onClick={() => saveImage(`profile-loa-${id}`, isDark)}>
            <VerticalAlignBottomOutlined />
        </Button>
        <Popconfirm
            title="정말 삭제할까요?"
            onConfirm={deleteList}
            okText="Yes"
            cancelText="No"
        >
            <Button type="primary" shape="round" danger>
                <DeleteOutlined />
            </Button>
        </Popconfirm>
      </div>
    )
  }
  
  export default React.memo(ProfileUtils)