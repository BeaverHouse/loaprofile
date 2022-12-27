import { Spin, Layout } from 'antd';
import { useEffect, useContext, useState } from 'react';
import { LoaContext } from '../../contexts';
import { getCharInfo } from '../../func/function';


function ProfilePage() {
    
  const { names, setProfiles } = useContext(LoaContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let infos = [] as Promise<CharInfo>[];
    names.forEach((name, idx) => {
      if(name.length > 0) infos.push(getCharInfo(name, idx+1))
    })
    Promise.all(infos).then(arr => {
      setProfiles(arr.filter(a => a.id));
      setLoading(false)
    });
  }, [])

  return (
    <div style={{width: "100%", marginTop: "70px"}}>
      {loading ? <Spin tip="Loading..." style={{marginTop: "30px"}}/> : <>profile</>}
    </div>
  )
}

export default ProfilePage