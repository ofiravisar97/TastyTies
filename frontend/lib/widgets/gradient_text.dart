import 'package:flutter/material.dart';
import 'package:frontend/core/configs/theme/app_colors.dart';

class GradientText extends StatelessWidget {
  const GradientText (
    this.text, {
    super.key,
    this.style,
  });

  final String text;
  final TextStyle? style;

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
    shaderCallback: (bounds) => AppColors.primaryGradient.createShader(
      Rect.fromLTWH(0, 0, bounds.width, bounds.height),
    ),
    blendMode: BlendMode.srcATop,
    child: Text(
      text,
      style: style,
    ),
  );
  }

}