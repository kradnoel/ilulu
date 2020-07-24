import 'package:flutter/material.dart';

const MaterialColor myPrimaryColor = MaterialColor(
		_primaryColorValue,
		<int, Color>{
			50: Color(0xFFECEFF1),
      100: Color(0xFFCFD8DC),
      200: Color(0xFFB0BEC5),
      300: Color(0xFF90A4AE),
      400: Color(0xFF78909C),
      500: Color(_primaryColorValue),
      600: Color(0xFF546E7A),
      700: Color(0xFF455A64),
      800: Color(0xFF37474F),
      900: Color(0xFF263238),
		},
);

const Color mySecondaryColor = Color.fromARGB(255, 255, 255, 255);
const Color myPrimaryColor2 = Color(_primaryColorValue);
const Color myPrimaryColor3 = Color(_primaryColorValue2);

const int _primaryColorValue = 0xFF2979FF;
const int _primaryColorValue2 = 0xFF2980FF;
