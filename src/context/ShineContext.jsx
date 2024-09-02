import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

export const ShineContext = createContext(null);

export function useShine() {
  return useContext(ShineContext);
}

export function ShineProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 회원정보 가져오기 예시 코드
  // useEffect(() => {
  //   const testUser = async () => {
  //     const {
  //       data: { user }
  //     } = await supabase.auth.getUser();

  //     console.log("user", user);
  //   };
  // }, []);

  // 유저의 auth 상태가 변경되면
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event, session); // session : user;

      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        setIsLoggedIn(true);
      } else if (event === "SIGNED_OUT") {
        await supabase.auth.signOut();
        setIsLoggedIn(false);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  });

  // 저장하기
  return <ShineContext.Provider value={{ isLoggedIn }}>{children}</ShineContext.Provider>;
}
