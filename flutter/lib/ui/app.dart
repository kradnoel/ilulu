import 'package:flutter/material.dart';
import 'package:ilulu_mobile/core/shared/shared.dart';
import 'package:ilulu_mobile/core/routes.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Chapter 01 - Demo',
      //theme: ThemeData(
      //  primarySwatch: myPrimaryColor,
      //  visualDensity: VisualDensity.adaptivePlatformDensity,
      //),
      theme: ThemeData(
		    primarySwatch: myPrimaryColor,
        primaryColor: myPrimaryColor3,
        accentColor: myPrimaryColor3,
        canvasColor: mySecondaryColor,
				visualDensity: VisualDensity.adaptivePlatformDensity,
			),
      //home: MyHomePage(title: 'Chapter 01 Home Page'),
      // home: NavigationPage(),
      initialRoute: 'home',
	    onGenerateRoute: MyRouter.router.generator,
    );
  }
}
