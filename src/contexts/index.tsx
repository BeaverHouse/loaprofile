import { createContext, useState } from "react";

const LoaContext = createContext({
    names: [] as string[],
    profiles: [] as CharInfo[],
    setProfiles: (infos: CharInfo[]) => {},
    addProfile: (info: CharInfo) => {},
    removeProfile: (id: number) => {},
    isDark: false,
    toggleDark: () => {},
    isSecret: false,
    toggleSecret: () => {},
    tags: [] as string[],
    toggleTags: (tags: string[]) => {}
})

interface Props {
    children: JSX.Element | JSX.Element[];
  }
  
  const LoaProvider = ({ children }: Props): JSX.Element => {
  
    const [names, setNames] = useState(
      window.localStorage.getItem("loa_inv") ? 
      Array.from(new Set(window.localStorage.getItem("loa_inv")?.split(",")))
      : []
    );

    const [profiles, setProfiles] = useState([] as CharInfo[]);
    const [isSecret, setIsSecret] = useState(window.localStorage.getItem("loa_secret") === "true")
    const [isDark, setIsDark] = useState(window.localStorage.getItem("dark_mode") === "true")
    const [tags, setTags] = useState(
      window.localStorage.getItem("loa_tag") ? 
      Array.from(new Set(window.localStorage.getItem("loa_tag")?.split(",")))
      : ["0","1","2","3","4","5","6"]
    );

    const toggleDark = () => {
      const newVal = !isDark
      setIsDark(newVal) 
      window.localStorage.setItem("dark_mode", newVal.toString())
    }

    const toggleTags = (newTags: string[]) => {
      setTags(newTags)
      window.localStorage.setItem("loa_tag", newTags.join(","))
    }
    
    const toggleSecret = () => {
      const newVal = !isSecret
      setIsSecret(newVal) 
      window.localStorage.setItem("loa_secret", newVal.toString())
    }

    const addProfile = async (info: CharInfo) => {
      if(info.id) {
        setProfiles([...profiles, info])
        const newNames = [...names, info.basicInfo.nickname]
        window.localStorage.setItem("loa_inv", newNames.join(","))
        setNames(newNames);
      }
    }

    const removeProfile = (id: number) => {
      const newNames = profiles.filter(a => a.id !== id).map(a => a.basicInfo.nickname);
      window.localStorage.setItem("loa_inv", newNames.join(","))
      setNames(newNames);
      setProfiles(profiles.filter(a => a.id !== id))
    }

      return (
        <LoaContext.Provider
          value={{
            names,
            profiles,
            setProfiles,
            addProfile,
            removeProfile,
            isDark,
            toggleDark,
            isSecret,
            toggleSecret,
            tags,
            toggleTags
          }}>
          {children}
        </LoaContext.Provider>
      );
  };
    
  export { LoaContext, LoaProvider }