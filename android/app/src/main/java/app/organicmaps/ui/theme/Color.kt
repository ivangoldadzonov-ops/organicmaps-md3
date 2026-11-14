package app.organicmaps.ui.theme

import androidx.compose.ui.graphics.Color

// Organic Maps MD3 — light scheme.
// Source of truth: tokens/tokens.json. Do not edit by hand.

val LightColors = mapOf(
    "primary" to Color(0xFF146C43),
    "onPrimary" to Color(0xFFFFFFFF),
    "primaryContainer" to Color(0xFFA6F2C1),
    "onPrimaryContainer" to Color(0xFF00210F),
    "secondary" to Color(0xFF4E6355),
    "onSecondary" to Color(0xFFFFFFFF),
    "secondaryContainer" to Color(0xFFD0E8D6),
    "onSecondaryContainer" to Color(0xFF0B1F14),
    "tertiary" to Color(0xFF3A6470),
    "onTertiary" to Color(0xFFFFFFFF),
    "tertiaryContainer" to Color(0xFFBEEAF8),
    "onTertiaryContainer" to Color(0xFF001F27),
    "error" to Color(0xFFBA1A1A),
    "onError" to Color(0xFFFFFFFF),
    "errorContainer" to Color(0xFFFFDAD6),
    "onErrorContainer" to Color(0xFF410002),
    "surface" to Color(0xFFF7FBF5),
    "onSurface" to Color(0xFF191C19),
    "surfaceVariant" to Color(0xFFDCE5DB),
    "onSurfaceVariant" to Color(0xFF414942),
    "surfaceDim" to Color(0xFFD8DDD7),
    "surfaceBright" to Color(0xFFF7FBF5),
    "surfaceContainerLowest" to Color(0xFFFFFFFF),
    "surfaceContainerLow" to Color(0xFFF1F5EF),
    "surfaceContainer" to Color(0xFFEBEFE9),
    "surfaceContainerHigh" to Color(0xFFE5E9E4),
    "surfaceContainerHighest" to Color(0xFFE0E4DE),
    "outline" to Color(0xFF717971),
    "outlineVariant" to Color(0xFFC0C9C0),
    "inverseSurface" to Color(0xFF2E312E),
    "inverseOnSurface" to Color(0xFFEFF1EC),
    "inversePrimary" to Color(0xFF8BD6A5),
)

// Organic Maps MD3 — dark scheme.
val DarkColors = mapOf(
    "primary" to Color(0xFF8BD6A5),
    "onPrimary" to Color(0xFF003920),
    "primaryContainer" to Color(0xFF00522F),
    "onPrimaryContainer" to Color(0xFFA6F2C1),
    "secondary" to Color(0xFFB4CCBA),
    "onSecondary" to Color(0xFF203528),
    "secondaryContainer" to Color(0xFF364B3D),
    "onSecondaryContainer" to Color(0xFFD0E8D6),
    "tertiary" to Color(0xFFA2CDDC),
    "onTertiary" to Color(0xFF033541),
    "tertiaryContainer" to Color(0xFF214C58),
    "onTertiaryContainer" to Color(0xFFBEEAF8),
    "error" to Color(0xFFFFB4AB),
    "onError" to Color(0xFF690005),
    "errorContainer" to Color(0xFF93000A),
    "onErrorContainer" to Color(0xFFFFDAD6),
    "surface" to Color(0xFF0F1511),
    "onSurface" to Color(0xFFDFE4DE),
    "surfaceVariant" to Color(0xFF414942),
    "onSurfaceVariant" to Color(0xFFC0C9C0),
    "surfaceDim" to Color(0xFF0F1511),
    "surfaceBright" to Color(0xFF353B36),
    "surfaceContainerLowest" to Color(0xFF0A0F0C),
    "surfaceContainerLow" to Color(0xFF171D18),
    "surfaceContainer" to Color(0xFF1B211C),
    "surfaceContainerHigh" to Color(0xFF252B26),
    "surfaceContainerHighest" to Color(0xFF303631),
    "outline" to Color(0xFF8A938B),
    "outlineVariant" to Color(0xFF414942),
    "inverseSurface" to Color(0xFFDFE4DE),
    "inverseOnSurface" to Color(0xFF2E312E),
    "inversePrimary" to Color(0xFF146C43),
)

// Colors used by the map renderer symbols.
object MapSymbols {
    val park = Color(0xFFCDE8C4)
    val water = Color(0xFFB6DEF5)
    val building = Color(0xFFE7E4DB)
    val roadCasing = Color(0xFFDAD6C9)
    val roadFill = Color(0xFFFFFFFF)
    val highwayFill = Color(0xFFFFE1A8)
    val label = Color(0xFF4A5049)
    val route = Color(0xFF146C43)
}
