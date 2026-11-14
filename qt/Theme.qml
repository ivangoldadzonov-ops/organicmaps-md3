// Organic Maps — Material Design 3 tokens for the Qt/QML desktop client.
// Mirrors tokens/tokens.json. Do not edit by hand.

pragma Singleton
import QtQuick 6.5

QtObject {
    id: theme

    // Detect the platform dark mode through palette when available.
    property bool dark: false

    // ── Colour roles ────────────────────────────────────────────
    property color primary:       dark ? "#8BD6A5" : "#146C43"
    property color onPrimary:     dark ? "#003920" : "#FFFFFF"
    property color primaryContainer: dark ? "#00522F" : "#A6F2C1"
    property color onPrimaryContainer: dark ? "#A6F2C1" : "#00210F"

    property color secondary:        dark ? "#B4CCBA" : "#4E6355"
    property color onSecondary:      dark ? "#203528" : "#FFFFFF"
    property color secondaryContainer: dark ? "#364B3D" : "#D0E8D6"
    property color onSecondaryContainer: dark ? "#D0E8D6" : "#0B1F14"

    property color tertiary:          dark ? "#A2CDDC" : "#3A6470"
    property color tertiaryContainer: dark ? "#214C58" : "#BEEAF8"
    property color onTertiaryContainer: dark ? "#BEEAF8" : "#001F27"

    property color error: dark ? "#FFB4AB" : "#BA1A1A"

    property color surface:                 dark ? "#0F1511" : "#F7FBF5"
    property color onSurface:               dark ? "#DFE4DE" : "#191C19"
    property color onSurfaceVariant:        dark ? "#C0C9C0" : "#414942"
    property color surfaceContainerLowest:  dark ? "#0A0F0C" : "#FFFFFF"
    property color surfaceContainerLow:     dark ? "#171D18" : "#F1F5EF"
    property color surfaceContainer:        dark ? "#1B211C" : "#EBEFE9"
    property color surfaceContainerHigh:    dark ? "#252B26" : "#E5E9E4"
    property color surfaceContainerHighest: dark ? "#303631" : "#E0E4DE"

    property color outline:        dark ? "#8A938B" : "#717971"
    property color outlineVariant: dark ? "#414942" : "#C0C9C0"

    // ── Map symbols ─────────────────────────────────────────────
    property color mapPark:       dark ? "#1E3524" : "#CDE8C4"
    property color mapWater:      dark ? "#12405A" : "#B6DEF5"
    property color mapBuilding:   dark ? "#262B27" : "#E7E4DB"
    property color mapRoadCasing: dark ? "#2C322E" : "#DAD6C9"
    property color mapRoadFill:   dark ? "#3A413B" : "#FFFFFF"
    property color mapHighway:    dark ? "#5A4522" : "#FFE1A8"
    property color mapLabel:      dark ? "#B9C2B9" : "#4A5049"
    property color mapRoute:      dark ? "#8BD6A5" : "#146C43"

    // ── Typography ──────────────────────────────────────────────
    readonly property string fontFamily: "Roboto"
    readonly property int displayLarge: 57
    readonly property int headlineMedium: 28
    readonly property int headlineSmall: 24
    readonly property int titleLarge: 22
    readonly property int titleMedium: 16
    readonly property int bodyLarge: 16
    readonly property int bodyMedium: 14
    readonly property int bodySmall: 12
    readonly property int labelLarge: 14
    readonly property int labelMedium: 12

    // ── Shape ───────────────────────────────────────────────────
    readonly property int shapeXs: 4
    readonly property int shapeSm: 8
    readonly property int shapeMd: 12
    readonly property int shapeLg: 16
    readonly property int shapeXl: 28
    readonly property int shapeFull: 999

    // ── Layout ──────────────────────────────────────────────────
    readonly property int margin: 16
    readonly property int gutter: 8
    readonly property int touchTarget: 48
    readonly property int searchBarHeight: 56
    readonly property int navBarHeight: 80
    readonly property int fabSize: 56
    readonly property int fabSizeSmall: 40

    // ── Motion (ms) ─────────────────────────────────────────────
    readonly property int durationShort4: 200
    readonly property int durationMedium2: 300
    readonly property int durationLong2: 500
    readonly property int easingType: Easing.Bezier
    readonly property var easingBezier: [0.2, 0, 0, 1]

    // ── Elevation shadows ───────────────────────────────────────
    readonly property var elevation1: [
        { "y": 1, "blur": 2, "spread": 0, "color": "#33000000" },
        { "y": 1, "blur": 3, "spread": 1, "color": "#26000000" }
    ]
    readonly property var elevation2: [
        { "y": 1, "blur": 2, "spread": 0, "color": "#33000000" },
        { "y": 2, "blur": 6, "spread": 2, "color": "#26000000" }
    ]
    readonly property var elevation3: [
        { "y": 4, "blur": 8, "spread": 3, "color": "#26000000" },
        { "y": 1, "blur": 3, "spread": 0, "color": "#33000000" }
    ]
}
