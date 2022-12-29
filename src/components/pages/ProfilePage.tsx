import { Spin, App, Space, Input } from 'antd';
import { useEffect, useContext, useState } from 'react';
import { LoaContext } from '../../contexts';
import { getCharInfo } from '../../func/function';
import Downloader from '../atoms/Downloader';
import { ColumnFlexDiv, MidText, RowFlexDiv } from '../atoms/styles';
import ProfileGroup from '../organisms/ProfileGroup';

const { Search } = Input;

function ProfilePage() {
    
  const { names, setProfiles, addProfile, profiles, isDark } = useContext(LoaContext)
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(true);

  const [nickname, setNickname] = useState("")
  
  const searchNickName = () => {
      getCharInfo(nickname, Math.max(...profiles.map(a => a.id), 0) + 1, notification)
      .then((val) => {
        if(val.id) {
          addProfile(val)
          setNickname("")
        }
      })
  }

  useEffect(() => {
    let infos = [] as Promise<CharInfo>[];    
    names.forEach((name, idx) => {
      if(name.length > 0) infos.push(getCharInfo(name, idx+1, notification))
    })   
    Promise.all(infos).then(arr => {
      setProfiles(arr.filter(a => a.id));
      setLoading(false)
    });
  }, [])

  return (
    <div style={{width: "100%", marginTop: "70px"}}>
      {loading ? <Spin tip="Loading..." style={{marginTop: "30px"}}/>
       : <ColumnFlexDiv>
        <MidText>Tip : 박스를 길게 눌러 드래그해 보세요.</MidText>
        <RowFlexDiv>
          <Downloader tag='profile-wrapper'/>
        </RowFlexDiv>
        <RowFlexDiv>
          <Search
              placeholder="닉네임"
              value={nickname} 
              allowClear
              style={{maxWidth: 200}}
              onChange={(e) => setNickname(e.target.value)}
              onSearch={searchNickName}
          />
        </RowFlexDiv>
        <ProfileGroup/>
      </ColumnFlexDiv>}
    </div>
  )
}

export default ProfilePage