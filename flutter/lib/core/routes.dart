import 'package:flutter/material.dart';
import 'package:fluro/fluro.dart';

// import 'package:ilulu_mobile/ui/breakdown.dart';
import 'package:ilulu_mobile/ui/login.dart';
import 'package:ilulu_mobile/ui/navigation.dart';
import 'package:ilulu_mobile/ui/interaction.dart';
import 'package:ilulu_mobile/ui/visitor.dart';

class MyRouter {
  MyRouter();

  static Router router = Router();

  static Handler _navigationHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, dynamic> params) => new NavigationPage()
  );

  static Handler _loginHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, dynamic> params) => new LoginPage()
  );

  static Handler _interactionHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, dynamic> params) => new InteractionPage()
  );

  static Handler _addInteractionHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, dynamic> params) => new AddInteractionPage()
  );

  static Handler _visitorHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, dynamic> params) => new VisitorPage()
  );

  static Handler _addVisitorHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, dynamic> params) => new AddVisitorPage()
  );

  static void setupRouter() {
    router.define('home', handler: _navigationHandler, transitionType: TransitionType.inFromRight);
    router.define('login', handler: _loginHandler, transitionType: TransitionType.inFromRight);
    router.define('interaction', handler: _interactionHandler, transitionType: TransitionType.inFromRight);
    router.define('add_interaction', handler: _addInteractionHandler, transitionType: TransitionType.inFromRight);
    router.define('visitor', handler: _visitorHandler, transitionType: TransitionType.inFromRight);
    router.define('add_visitor', handler: _addVisitorHandler, transitionType: TransitionType.inFromRight);
  }
}
