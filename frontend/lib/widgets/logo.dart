import 'package:flutter/material.dart';
import 'package:frontend/widgets/gradient_text.dart'; // Make sure this path is correct

class Logo extends StatelessWidget {
  final String logoAssetPath = "assets/images/logo.png"; // Defined as a constant field
  final TextStyle? textStyle;
  final double logoWidth;
  final double logoHeight;
  final double gap;

  const Logo({
    super.key,
    this.textStyle,
    this.logoWidth = 64.0,
    this.logoHeight = 64.0,
    this.gap = 8.0,
  });

  @override
  Widget build(BuildContext context) {
    final Color tiesColor = Theme.of(context).brightness == Brightness.dark ? Colors.white : Colors.black;

    const TextStyle baseTextStyle = TextStyle(
      fontSize: 48.0,
      fontWeight: FontWeight.bold,
      fontFamily: 'Nunito', // Make sure to specify your font family here
    );

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Image.asset(
          logoAssetPath,
          width: logoWidth,
          height: logoHeight,
        ),
        SizedBox(width: gap),
        // --- The "TastyTies" Text combination ---
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            GradientText(
              "Tasty",
              style: baseTextStyle,
            ),
            Text(
              "Ties",
              style: baseTextStyle.copyWith(
                color: tiesColor, // Only override the color for "Ties"
              ),
            ),
          ],
        ),
      ],
    );
  }
}