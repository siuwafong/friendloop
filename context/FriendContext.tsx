import React, { useState, createContext } from "react"

interface IFriend {
  firstName: string;
  lastName: string;
  id: string;
  fullName: string;
  image: string | null; 
  isFriend: boolean
  key: string
}

type IFriendContext = [IFriend[], React.Dispatch<React.SetStateAction<IFriend[]>>];

export const FriendContext = createContext<IFriendContext | undefined>(undefined)

export const FriendContextProvider = ({ children }) => {

  const [friends, setFriends] = useState<IFriend[]>([])

  return (
    <FriendContext.Provider
      value={{
        friends,
        setFriends
      }}
    >
      {children}
    </FriendContext.Provider>
  )
}

