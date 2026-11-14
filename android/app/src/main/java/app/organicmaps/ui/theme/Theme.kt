package app.organicmaps.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private fun role(map: Map<String, Color>, key: String): Color = map.getValue(key)

private fun omLightScheme() = lightColorScheme(
    primary = role(LightColors, "primary"),
    onPrimary = role(LightColors, "onPrimary"),
    primaryContainer = role(LightColors, "primaryContainer"),
    onPrimaryContainer = role(LightColors, "onPrimaryContainer"),
    secondary = role(LightColors, "secondary"),
    onSecondary = role(LightColors, "onSecondary"),
    secondaryContainer = role(LightColors, "secondaryContainer"),
    onSecondaryContainer = role(LightColors, "onSecondaryContainer"),
    tertiary = role(LightColors, "tertiary"),
    onTertiary = role(LightColors, "onTertiary"),
    tertiaryContainer = role(LightColors, "tertiaryContainer"),
    onTertiaryContainer = role(LightColors, "onTertiaryContainer"),
    error = role(LightColors, "error"),
    onError = role(LightColors, "onError"),
    errorContainer = role(LightColors, "errorContainer"),
    onErrorContainer = role(LightColors, "onErrorContainer"),
    background = role(LightColors, "surface"),
    onBackground = role(LightColors, "onSurface"),
    surface = role(LightColors, "surface"),
    onSurface = role(LightColors, "onSurface"),
    surfaceVariant = role(LightColors, "surfaceVariant"),
    onSurfaceVariant = role(LightColors, "onSurfaceVariant"),
    surfaceDim = role(LightColors, "surfaceDim"),
    surfaceBright = role(LightColors, "surfaceBright"),
    surfaceContainerLowest = role(LightColors, "surfaceContainerLowest"),
    surfaceContainerLow = role(LightColors, "surfaceContainerLow"),
    surfaceContainer = role(LightColors, "surfaceContainer"),
    surfaceContainerHigh = role(LightColors, "surfaceContainerHigh"),
    surfaceContainerHighest = role(LightColors, "surfaceContainerHighest"),
    outline = role(LightColors, "outline"),
    outlineVariant = role(LightColors, "outlineVariant"),
    inverseSurface = role(LightColors, "inverseSurface"),
    inverseOnSurface = role(LightColors, "inverseOnSurface"),
    inversePrimary = role(LightColors, "inversePrimary"),
)

private fun omDarkScheme() = darkColorScheme(
    primary = role(DarkColors, "primary"),
    onPrimary = role(DarkColors, "onPrimary"),
    primaryContainer = role(DarkColors, "primaryContainer"),
    onPrimaryContainer = role(DarkColors, "onPrimaryContainer"),
    secondary = role(DarkColors, "secondary"),
    onSecondary = role(DarkColors, "onSecondary"),
    secondaryContainer = role(DarkColors, "secondaryContainer"),
    onSecondaryContainer = role(DarkColors, "onSecondaryContainer"),
    tertiary = role(DarkColors, "tertiary"),
    onTertiary = role(DarkColors, "onTertiary"),
    tertiaryContainer = role(DarkColors, "tertiaryContainer"),
    onTertiaryContainer = role(DarkColors, "onTertiaryContainer"),
    error = role(DarkColors, "error"),
    onError = role(DarkColors, "onError"),
    errorContainer = role(DarkColors, "errorContainer"),
    onErrorContainer = role(DarkColors, "onErrorContainer"),
    background = role(DarkColors, "surface"),
    onBackground = role(DarkColors, "onSurface"),
    surface = role(DarkColors, "surface"),
    onSurface = role(DarkColors, "onSurface"),
    surfaceVariant = role(DarkColors, "surfaceVariant"),
    onSurfaceVariant = role(DarkColors, "onSurfaceVariant"),
    surfaceDim = role(DarkColors, "surfaceDim"),
    surfaceBright = role(DarkColors, "surfaceBright"),
    surfaceContainerLowest = role(DarkColors, "surfaceContainerLowest"),
    surfaceContainerLow = role(DarkColors, "surfaceContainerLow"),
    surfaceContainer = role(DarkColors, "surfaceContainer"),
    surfaceContainerHigh = role(DarkColors, "surfaceContainerHigh"),
    surfaceContainerHighest = role(DarkColors, "surfaceContainerHighest"),
    outline = role(DarkColors, "outline"),
    outlineVariant = role(DarkColors, "outlineVariant"),
    inverseSurface = role(DarkColors, "inverseSurface"),
    inverseOnSurface = role(DarkColors, "inverseOnSurface"),
    inversePrimary = role(DarkColors, "inversePrimary"),
)

/**
 * Root theme. [dynamicColor] is off by default: Organic Maps keeps its brand green
 * instead of taking colours from the wallpaper.
 */
@Composable
fun OrganicMapsTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit,
) {
    val context = LocalContext.current
    val scheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ->
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        darkTheme -> omDarkScheme()
        else -> omLightScheme()
    }

    MaterialTheme(
        colorScheme = scheme,
        typography = OmTypography,
        shapes = OmShapes,
        content = content,
    )
}
