import { Button } from 'antd'
import React, { useContext } from 'react'
import { LoaContext } from '../../contexts';
import { saveImage } from '../../func/function';

interface DownloaderProps {
    tag: string;
}

/**
 * Downloader
 * 
 * 특정 태그가 달린 div 영역을 이미지로 다운로드할 수 있게 합니다.
 * 일부 기기에서 동작하지 않을 수도 있습니다.
 * 
 * @param tag
 */
const Downloader: React.FC<DownloaderProps> = ({ tag }) => {

    const { isDark } = useContext(LoaContext)

    return (
        <Button 
            shape='round' 
            style={{ height: 32, width: 128, fontSize: "14px", margin: 3}} 
            type="primary"
            onClick={() => saveImage(tag, isDark)}
        >
            전체 다운로드
        </Button>
    )
}

export default Downloader
