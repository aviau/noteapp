import {
    ArrowBack,
    ArrowForward,
    Close,
    CropSquare,
    HorizontalRule,
} from "@mui/icons-material";
import { IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { GlobalStateContext } from "@/ui/foundation/GlobalStateProvider";
import { useContext } from "react";
import { Ui2MainMessageType } from "@/lib/ipc/ui2Main";

export function TopBar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { uiMain, activeVaultId } = useContext(GlobalStateContext);

    // TODO: Improve navigation
    // Find if there's a previous or next path in the stack, so we can disable the button when unavailable
    const handleBack = () => navigate(-1);
    const handleForward = () => navigate(1);
    const handleMinimize = () => {
        uiMain.invokeUi2Main({ type: Ui2MainMessageType.WINDOWS_MINIMIZE });
    };
    const handleMaximize = () => {
        uiMain.invokeUi2Main({ type: Ui2MainMessageType.WINDOWS_MAXIMIZE });
    };
    const handleQuit = () => {
        uiMain.invokeUi2Main({ type: Ui2MainMessageType.WINDOWS_QUIT });
    };

    const appTitlePrefix = activeVaultId ? `${activeVaultId} -` : "";

    return (
        <Toolbar
            sx={{
                background: theme.palette.secondary.dark,
                minHeight: 30,
                WebkitAppRegion: "drag",
                "& > button": {
                    WebkitAppRegion: "no-drag",
                },
            }}
        >
            <IconButton onClick={handleBack}>
                <ArrowBack
                    fontSize="small"
                    sx={{
                        color: theme.palette.text.secondary,
                    }}
                />
            </IconButton>
            <IconButton onClick={handleForward}>
                <ArrowForward
                    fontSize="small"
                    sx={{ color: theme.palette.text.secondary }}
                />
            </IconButton>
            <Typography
                variant="subtitle2"
                align="center"
                component="p"
                sx={{ flex: 1, color: theme.palette.text.secondary }}
            >
                {appTitlePrefix} Note App
            </Typography>
            <IconButton onClick={handleMinimize}>
                <HorizontalRule
                    fontSize="small"
                    sx={{ color: theme.palette.text.secondary }}
                />
            </IconButton>
            <IconButton onClick={handleMaximize}>
                <CropSquare
                    fontSize="small"
                    sx={{ color: theme.palette.text.secondary }}
                />
            </IconButton>
            <IconButton onClick={handleQuit}>
                <Close fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            </IconButton>
        </Toolbar>
    );
}
