import React, { createContext, useState } from "react";
import ProfilePage from "./ProfilePage.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        soundsEnabled: true,
        statusVisible: true,
        name: "User Name",
        email: "user@email.com",
        avatar: "https://i.pravatar.cc/120?img=7",
    });

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};