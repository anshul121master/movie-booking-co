export const SET_SELECTED_SCREEN = 'SET_SELECTED_SCREEN'

export function setSelectedScreen(screen) {
    return {
        type: SET_SELECTED_SCREEN,
        screen
    }
}