import 'package:flutter/material.dart';

TextStyle nameStyle = _titleBold(18);
TextStyle companyStyle = _titleStyle(18);
TextStyle professionStyle = _titleStyle(14);

TextStyle titleStyle = _titleBold(18);

TextStyle cardTitleStyle = _titleBold(16);
TextStyle cardSubtitleStyle = _titleStyle(14);

TextStyle _titleStyle(double size) {
	return TextStyle(
		fontSize: size
	);
}

TextStyle _titleBold(double size) {
	return TextStyle(
		fontSize: size,
		fontWeight: FontWeight.bold);
}
