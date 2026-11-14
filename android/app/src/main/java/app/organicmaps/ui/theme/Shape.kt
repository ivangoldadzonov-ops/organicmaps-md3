package app.organicmaps.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.ui.unit.dp

// MD3 shape scale. Mirrors tokens.json → shape.
val OmShapes = Shapes(
    extraSmall = RoundedCornerShape(4.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(16.dp),
    extraLarge = RoundedCornerShape(28.dp),
)

object OmShapeTokens {
    val chip = RoundedCornerShape(8.dp)
    val smallFab = RoundedCornerShape(12.dp)
    val fab = RoundedCornerShape(16.dp)
    val sheet = RoundedCornerShape(topStart = 28.dp, topEnd = 28.dp)
    val searchBar = RoundedCornerShape(28.dp)
    val pill = RoundedCornerShape(percent = 50)
    val navIndicator = RoundedCornerShape(percent = 50)
}
