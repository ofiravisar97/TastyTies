import 'package:flutter/material.dart';


class AppColors {
  static const primary = Color(0xFFFCA17D);
  static const darkPrimary = Color(0xFFF4734A);
  static const lightBackground = Color(0xFFF2f2f2);
  static const darkBackground = Color(0xff0D0C0C);
  static const textMuted = Color(0xffBEBEBE);
  static const darkGrey = Color(0xff343434);
  static const primaryGradient = LinearGradient(
    colors: [AppColors.primary,AppColors.darkPrimary],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
