import 'package:flutter/material.dart';
import 'package:ilulu_mobile/core/shared/shared.dart';

/*
* Widget build a Custom Scaffold with a specified body
* @required body - Widget
* @return Scaffold - Widget
*/
Widget MyScaffold({
  @required bool hasCustomKey = false,
  @required GlobalKey customKey,
  @required final BuildContext context,
  @required final Text title,
  @required final Widget body,
  @required bool hasLeading = false,
  @required Widget leading,
  @required bool hasActions = false,
  @required List<Widget> actions,
  @required bool hasDrawer = false,
  @required Widget drawer,
  final FloatingActionButtonLocation floatingActionButtonLocation,
  final FloatingActionButton floatingActionButton
}) {

  return (hasCustomKey) ? Scaffold(
    key: customKey,
    appBar: AppBar(
      leading: (hasLeading) ? leading : Container(),
      title: title,
      actions: (hasActions) ? actions : <Widget>[],
      centerTitle: true,
      elevation: 5.0,
    ),
    drawer: (hasDrawer) ? drawer : Container(),
    drawerEnableOpenDragGesture: false,
    body: body,
    floatingActionButtonLocation: floatingActionButtonLocation,
    floatingActionButton: floatingActionButton
  ) : Scaffold(
    appBar: AppBar(
      leading: (hasLeading) ? leading : Container(),
      title: title,
      actions: (hasActions) ? actions : <Widget>[],
      centerTitle: true,
      elevation: 5.0,
    ),
    body: body,
    floatingActionButtonLocation: floatingActionButtonLocation,
    floatingActionButton: floatingActionButton
  );
}

/**
* Generate a Widget with Checkmark for a given Color if specified
* @required value - boolean
* @optional color - Color
* @return Icon
**/
Widget CheckMark({
  @required bool value,
  Color color = const Color(0x000000)
  }) {
  return (value == true) ? Icon(Icons.check, color: color) : Icon(null);
}

/**
* Generate a Widget with Checkmark for a given Color if specified
* @required value - boolean
* @optional color - Color
* @return Icon
**/
Widget RowTile({
    @required final Icon icon,
    @required final String title,
    @required final String subtitle
    }) {
    return Row(
      children: <Widget>[
        icon,
        SizedBox(width: 10),
        Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(title, style: cardTitleStyle),
            Text(subtitle, style: cardSubtitleStyle),
          ],
        ),
      ],
    );
  }

/**
* Generate a Widget a custom TextFormField
**/
class MyTextFormField extends StatelessWidget {
  final String initialValue;
  final String hintText;
  final String labelText;
  final int minLines;
  final TextInputType keyboardType;
  final Function validator;
  final Function onSaved;
  final bool isPassword;
  final bool isEmail;

  MyTextFormField({
    this.initialValue,
    this.keyboardType,
    this.hintText,
    this.labelText,
    this.minLines,
    this.validator,
    this.onSaved,
    this.isPassword = false,
    this.isEmail = false,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      initialValue: initialValue,
      keyboardType: keyboardType,
      minLines: minLines,
      maxLines: 10,
      autofocus: false,
      obscureText: isPassword ? true : false,
      decoration: InputDecoration(
        contentPadding: EdgeInsets.fromLTRB(10, 20, 10, 20),
        filled: true,
        isDense: true,
        fillColor: Colors.grey[200],
        labelText: labelText,
        hintText: hintText,
      ),
      //decoration: InputDecoration(
      //  labelText: labelText,
      //  hintText: hintText,
      //  border: OutlineInputBorder(
      //    borderRadius: BorderRadius.circular(5.0),
      //    borderSide: BorderSide(color: Colors.white)
      //  ),
      //  isDense: true,
      //  filled: true,
      //  fillColor: mySecondaryColor,
        //fillColor: Colors.white,
      //),
      validator: validator,
      onSaved: onSaved,
    );
  }
}
