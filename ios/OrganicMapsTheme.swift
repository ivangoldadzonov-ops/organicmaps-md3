//
//  OrganicMapsTheme.swift
//  Organic Maps — Material Design 3 tokens for iOS.
//
//  Mirrors tokens/tokens.json. Update both together.
//

import SwiftUI

enum OMColor {
    // Roles, light scheme
    static let primaryLight = Color(hex: 0x146C43)
    static let onPrimaryLight = Color.white
    static let primaryContainerLight = Color(hex: 0xA6F2C1)
    static let onPrimaryContainerLight = Color(hex: 0x00210F)
    static let secondaryLight = Color(hex: 0x4E6355)
    static let secondaryContainerLight = Color(hex: 0xD0E8D6)
    static let onSecondaryContainerLight = Color(hex: 0x0B1F14)
    static let tertiaryLight = Color(hex: 0x3A6470)
    static let tertiaryContainerLight = Color(hex: 0xBEEAF8)
    static let onTertiaryContainerLight = Color(hex: 0x001F27)
    static let errorLight = Color(hex: 0xBA1A1A)
    static let surfaceLight = Color(hex: 0xF7FBF5)
    static let onSurfaceLight = Color(hex: 0x191C19)
    static let onSurfaceVariantLight = Color(hex: 0x414942)
    static let surfaceContainerLowestLight = Color(hex: 0xFFFFFF)
    static let surfaceContainerLowLight = Color(hex: 0xF1F5EF)
    static let surfaceContainerLight = Color(hex: 0xEBEFE9)
    static let surfaceContainerHighLight = Color(hex: 0xE5E9E4)
    static let surfaceContainerHighestLight = Color(hex: 0xE0E4DE)
    static let outlineLight = Color(hex: 0x717971)
    static let outlineVariantLight = Color(hex: 0xC0C9C0)

    // Roles, dark scheme
    static let primaryDark = Color(hex: 0x8BD6A5)
    static let onPrimaryDark = Color(hex: 0x003920)
    static let primaryContainerDark = Color(hex: 0x00522F)
    static let onPrimaryContainerDark = Color(hex: 0xA6F2C1)
    static let secondaryDark = Color(hex: 0xB4CCBA)
    static let secondaryContainerDark = Color(hex: 0x364B3D)
    static let onSecondaryContainerDark = Color(hex: 0xD0E8D6)
    static let tertiaryDark = Color(hex: 0xA2CDDC)
    static let tertiaryContainerDark = Color(hex: 0x214C58)
    static let onTertiaryContainerDark = Color(hex: 0xBEEAF8)
    static let errorDark = Color(hex: 0xFFB4AB)
    static let surfaceDark = Color(hex: 0x0F1511)
    static let onSurfaceDark = Color(hex: 0xDFE4DE)
    static let onSurfaceVariantDark = Color(hex: 0xC0C9C0)
    static let surfaceContainerLowestDark = Color(hex: 0x0A0F0C)
    static let surfaceContainerLowDark = Color(hex: 0x171D18)
    static let surfaceContainerDark = Color(hex: 0x1B211C)
    static let surfaceContainerHighDark = Color(hex: 0x252B26)
    static let surfaceContainerHighestDark = Color(hex: 0x303631)
    static let outlineDark = Color(hex: 0x8A938B)
    static let outlineVariantDark = Color(hex: 0x414942)
}

extension Color {
    init(hex: UInt32) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: 1
        )
    }
}

enum OMShape {
    static let extraSmall: CGFloat = 4
    static let small: CGFloat = 8
    static let medium: CGFloat = 12
    static let large: CGFloat = 16
    static let extraLarge: CGFloat = 28

    static let chip = RoundedRectangle(cornerRadius: 8, style: .continuous)
    static let sheet = RoundedRectangle(cornerRadius: 28, style: .continuous).corners([.topLeft, .topRight])
    static let searchBar = Capsule()
    static let fab = RoundedRectangle(cornerRadius: 16, style: .continuous)
    static let smallFab = RoundedRectangle(cornerRadius: 12, style: .continuous)
}

enum OMType {
    static func titleLarge() -> Font { .system(size: 22, weight: .medium) }
    static func titleMedium() -> Font { .system(size: 16, weight: .medium) }
    static func headlineSmall() -> Font { .system(size: 24, weight: .regular) }
    static func headlineMedium() -> Font { .system(size: 28, weight: .regular) }
    static func bodyLarge() -> Font { .system(size: 16) }
    static func bodyMedium() -> Font { .system(size: 14) }
    static func bodySmall() -> Font { .system(size: 12) }
    static func labelLarge() -> Font { .system(size: 14, weight: .medium) }
    static func labelMedium() -> Font { .system(size: 12, weight: .medium) }
}

enum OMTheme: String, CaseIterable {
    case light, dark, system
}

/// Resolves every MD3 role for the current scheme.
struct OMThemeValues {
    let primary: Color
    let onPrimary: Color
    let primaryContainer: Color
    let onPrimaryContainer: Color
    let secondary: Color
    let secondaryContainer: Color
    let onSecondaryContainer: Color
    let tertiary: Color
    let error: Color
    let surface: Color
    let onSurface: Color
    let onSurfaceVariant: Color
    let surfaceContainerLowest: Color
    let surfaceContainerLow: Color
    let surfaceContainer: Color
    let surfaceContainerHigh: Color
    let surfaceContainerHighest: Color
    let outline: Color
    let outlineVariant: Color

    init() {
        self.init(colorScheme: UITraitCollection.current.userInterfaceStyle)
    }

    init(colorScheme: UIUserInterfaceStyle) {
        let dark = colorScheme == .dark
        primary = dark ? OMColor.primaryDark : OMColor.primaryLight
        onPrimary = dark ? OMColor.onPrimaryDark : OMColor.onPrimaryLight
        primaryContainer = dark ? OMColor.primaryContainerDark : OMColor.primaryContainerLight
        onPrimaryContainer = dark ? OMColor.onPrimaryContainerDark : OMColor.onPrimaryContainerLight
        secondary = dark ? OMColor.secondaryDark : OMColor.secondaryLight
        secondaryContainer = dark ? OMColor.secondaryContainerDark : OMColor.secondaryContainerLight
        onSecondaryContainer = dark ? OMColor.onSecondaryContainerDark : OMColor.onSecondaryContainerLight
        tertiary = dark ? OMColor.tertiaryDark : OMColor.tertiaryLight
        error = dark ? OMColor.errorDark : OMColor.errorLight
        surface = dark ? OMColor.surfaceDark : OMColor.surfaceLight
        onSurface = dark ? OMColor.onSurfaceDark : OMColor.onSurfaceLight
        onSurfaceVariant = dark ? OMColor.onSurfaceVariantDark : OMColor.onSurfaceVariantLight
        surfaceContainerLowest = dark ? OMColor.surfaceContainerLowestDark : OMColor.surfaceContainerLowestLight
        surfaceContainerLow = dark ? OMColor.surfaceContainerLowDark : OMColor.surfaceContainerLowLight
        surfaceContainer = dark ? OMColor.surfaceContainerDark : OMColor.surfaceContainerLight
        surfaceContainerHigh = dark ? OMColor.surfaceContainerHighDark : OMColor.surfaceContainerHighLight
        surfaceContainerHighest = dark ? OMColor.surfaceContainerHighestDark : OMColor.surfaceContainerHighestLight
        outline = dark ? OMColor.outlineDark : OMColor.outlineLight
        outlineVariant = dark ? OMColor.outlineVariantDark : OMColor.outlineVariantLight
    }
}

enum OMLayout {
    static let margin: CGFloat = 16
    static let touchTarget: CGFloat = 48
    static let searchBarHeight: CGFloat = 56
    static let navBarHeight: CGFloat = 80
    static let fabSize: CGFloat = 56
    static let fabSizeSmall: CGFloat = 40
    static let sheetPeek: CGFloat = 352
    static let heroHeight: CGFloat = 320
}

enum OMMotion {
    static let emphasized = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.5)
    static let standard = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.3)
    static let micro = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.2)
}

// MARK: - Corner rounding helper

extension RoundedRectangle {
    func corners(_ corners: UIRectCorner) -> some Shape {
        AnyShape(RoundedCorner(radius: cornerRadius, corners: corners))
    }
}

struct RoundedCorner: Shape {
    var radius: CGFloat
    var corners: UIRectCorner = .allCorners

    func path(in rect: CGRect) -> Path {
        Path(UIBezierPath(
            roundedRect: rect,
            byRoundingCorners: corners,
            cornerRadii: CGSize(width: radius, height: radius)
        ).cgPath)
    }
}
