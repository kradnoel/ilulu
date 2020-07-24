import 'package:flutter/material.dart';
import 'package:ilulu_mobile/core/shared/shared.dart';
import 'package:ilulu_mobile/ui/widgets.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final Map<String, String> object = Map();
  final _formKey = GlobalKey<FormState>();
  final _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: MyScaffold(
        hasCustomKey: true,
        customKey: _scaffoldKey,
        context: context,
        title: Text(
          'Login',
          style: titleStyle
        ),
        body: Stack(
          fit: StackFit.expand,
          children: <Widget>[
            SingleChildScrollView(
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Card(
                        elevation: 5,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5.0),
                        ),
                        color: Colors.white,
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: Column(
                            children: <Widget>[
                              MyTextFormField(
                                initialValue: '',
                                labelText: 'Nome de Utilizador',
                                hintText: 'Ex: user',
                                validator: (String value) {
                                  if (value == ''){
                                    return '*Nome do Utilizador em falta.';
                                  }
                                  _formKey.currentState.save();
                                  return null;
                                },
                                onSaved: (String value) {
                                  object['username'] = value;
                                },
                              ),
                              SizedBox(height: 10.0),
                              MyTextFormField(
                                initialValue: '',
                                isPassword: true,
                                labelText: 'Senha',
                                hintText: 'Ex: 12345',
                                validator: (String value) {
                                  if (value == ''){
                                    return '*Senha em falta.';
                                  }
                                  _formKey.currentState.save();
                                  return null;
                                },
                                onSaved: (String value) {
                                  object['username'] = value;
                                },
                              ),
                              SizedBox(height: 10.0),
                              RawMaterialButton(
                                elevation: 5.0,
                                fillColor: myPrimaryColor,
                                padding: const EdgeInsets.all(15.0),
                                textStyle: cardTitleStyle,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(5.0),
                                ),
                                child: Text('Login'),
                                onPressed: () {
                                  if(_formKey.currentState.validate()) {
                                    print('valid');
                                  }else{
                                    print('not validated');
                                  }
                                }
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
