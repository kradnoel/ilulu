import 'package:flutter/material.dart';
import 'package:fluro/fluro.dart';
import 'package:ilulu_mobile/core/shared/shared.dart';
import 'package:ilulu_mobile/core/routes.dart';
import 'package:ilulu_mobile/ui/widgets.dart';



class NavigationPage extends StatelessWidget {
  final _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: MyScaffold(
        hasCustomKey: true,
        customKey: _scaffoldKey,
        hasLeading: true,
        leading: IconButton(
          icon: icon_menu,
          onPressed: () => _scaffoldKey.currentState.openDrawer(),
        ),
        context: context,
        title: Text(
          'Home',
          style: titleStyle
        ),
        hasDrawer: true,
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: <Widget>[
              DrawerHeader(
                decoration: BoxDecoration(
                  color: Colors.blue,
                ),
                child: Text(
                  'Drawer Header',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                  ),
                ),
              ),
              ListTile(
                leading: Icon(Icons.person_add),
                title: Text('Informar sobre Visita'),
                onTap: () => MyRouter.router.navigateTo(context, "visitor", transition: TransitionType.fadeIn),
              ),
              Divider(),
              ListTile(
                leading: Icon(Icons.question_answer),
                title: Text('Indicar Sugestao / Reclamacao'),
                onTap: () => MyRouter.router.navigateTo(context, "interaction", transition: TransitionType.fadeIn),
              ),
              Divider(),
              ListTile(
                leading: Icon(Icons.offline_bolt),
                title: Text('Reportar Avaria'),
              ),
              Divider(),
              ListTile(
                leading: Icon(Icons.power_settings_new),
                title: Text('Sair'),
              ),
              Divider(),
            ],
          ),
        ),
        body: Placeholder(),
      ),
    );
  }
}
