import 'package:flutter/material.dart';
import 'package:fluro/fluro.dart';
import 'package:ilulu_mobile/core/shared/shared.dart';
import 'package:ilulu_mobile/core/routes.dart';
import 'package:ilulu_mobile/ui/widgets.dart';

class VisitorPage extends StatelessWidget {

  final _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    final List<String> entries = <String>['A', 'B', 'C'];
    final List<int> colorCodes = <int>[600, 500, 100];

    return SafeArea(
      child: MyScaffold(
        hasCustomKey: true,
        customKey: _scaffoldKey,
        hasLeading: true,
        leading: BackButton(),
        context: context,
        title: Text(
          'Indicar sobre Visita',
          style: titleStyle
        ),
        body: Stack(
          fit: StackFit.expand,
          children: <Widget>[
            ListView.builder(
              padding: const EdgeInsets.all(8),
              itemCount: entries.length,
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  height: 50.0,
                  color: Colors.amber[colorCodes[index]],
                  child: Center(child: Text('Entry ${entries[index]}')),
                );
              }
            ),
          ],
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: () => MyRouter.router.navigateTo(context, "add_visitor", transition: TransitionType.fadeIn),
        ),
      ),
    );
  }
}

class AddVisitorPage extends StatefulWidget {
  @override
  _AddVisitorPageState createState() => _AddVisitorPageState();
}

class _AddVisitorPageState extends State<AddVisitorPage> {
  final Map<String, String> object = Map();
  final _formKey = GlobalKey<FormState>();
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  final _items = [
    'Bilhete de Identidade',
    'Passaporte',
    'Carta de Conducao',
    'Outro'
  ];

  final DateTime _datetime = new DateTime.now();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: MyScaffold(
        hasCustomKey: true,
        customKey: _scaffoldKey,
        hasLeading: true,
        leading: BackButton(),
        context: context,
        title: Text(
          'Adicionar Visitante',
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
                              _MyTextFormField(
                                initialValue: '',
                                labelText: 'Nome de Visitante',
                                hintText: 'Ex: Jorge Antonio',
                                validator: (String value) {
                                  if (value == ''){
                                    return '*Nome do Visitante em falta.';
                                  }
                                  if (Validator.Name(value) == false){
                                    return '*Expressao invalida. Verifique o nome';
                                  }
                                  _formKey.currentState.save();
                                  return null;
                                },
                                onSaved: (String value) {
                                  object['name'] = value;
                                },
                              ),
                              SizedBox(height: 10.0),
                              Container(
                                child: Column(
                                  children: <Widget>[
                                    Padding(
                                      padding: const EdgeInsets.all(5.0),
                                      child: Column(
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: <Widget>[
                                          Text(
                                            'Tipo de Documento',
                                            style: TextStyle(
                                              fontSize: 12.0,
                                            ),
                                          ),

                                          DropdownButtonFormField<String>(
                                            decoration: InputDecoration(
                                              contentPadding: EdgeInsets.fromLTRB(10, 20, 10, 20),
                                              filled: true,
                                              fillColor: Colors.grey[200],
                                              hintText: 'Tipo de documento',
                                            ),
                                            items: _items.map((label) => DropdownMenuItem(
                                              child: Text(label),
                                              value: label,
                                            )).toList(),
                                            onChanged: (_) {},
                                            validator: (String value) {
                                              if (value == '' || value == null){
                                                return '*Tipo de documento em falta.';
                                              }
                                              _formKey.currentState.save();
                                              return null;
                                            },
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(height: 10.0),
                              _MyTextFormField(
                                initialValue: '',
                                labelText: 'Codigo do documento',
                                hintText: 'Ex: 12AB45C',
                                validator: (String value) {
                                  if (value == ''){
                                    return '*Codigo do documento em falta.';
                                  }
                                  _formKey.currentState.save();
                                  return null;
                                },
                                onSaved: (String value) {
                                  object['docNumber'] = value;
                                },
                              ),
                              SizedBox(height: 10.0),
                              _MyDateTimePickerFormField(
                                initialValue: null,
                                labelText: 'Data da Visita',
                                validator: (DateTime value) {
                                  if (value == null){
                                    return '*Data da visita em falta.';
                                  }
                                  _formKey.currentState.save();
                                  return null;
                                }
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
                                child: Text('Adicionar'),
                                onPressed: () {
                                  if(_formKey.currentState.validate()) {
                                    print('valid');
                                    print("Date - ${object['date']}");
                                  }else{
                                    print('not validated');
                                    print("Date - ${object['date']}");
                                  }
                                }
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                )
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MyTextFormField extends StatelessWidget{
  final String initialValue;
  final String hintText;
  final String labelText;
  final TextInputType keyboardType;
  final Function validator;
  final Function onSaved;
  final bool isPassword;
  final bool isEmail;

  _MyTextFormField({
    this.initialValue,
    this.keyboardType,
    this.hintText,
    this.labelText,
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

class _MyDateTimePickerFormField extends FormField<DateTime> {

  _MyDateTimePickerFormField({
    FormFieldSetter<DateTime> onSaved,
    FormFieldValidator<DateTime> validator,
    DateTime initialValue = null,
    bool autovalidate = false,
    BoxDecoration decoration,
    String labelText = null,
  }) : super(
    onSaved: onSaved,
    validator: validator,
    initialValue: initialValue,
    autovalidate: autovalidate,
    builder: (FormFieldState<DateTime> state) {
      return Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(5.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  '${labelText}',
                  style: TextStyle(
                    fontSize: 12.0,
                  ),
                ),
                SizedBox(height: 5.0),
                Container(
                  decoration: state.hasError ? BoxDecoration(
                    border: Border(
                      top: BorderSide.none,
                      //bottom: BorderSide(width: 1.0, color: Colors.lightBlue.shade900),
                      bottom: BorderSide(width: 1.0, color: Colors.red.shade700),
                    ),
                    color: Colors.grey[200],
                  ) : BoxDecoration(
                    border: Border(
                      top: BorderSide.none,
                      //bottom: BorderSide(width: 1.0, color: Colors.lightBlue.shade900),
                      bottom: BorderSide(width: 1.0, color: Colors.grey.shade700),
                    ),
                    color: Colors.grey[200],
                  ),
                  child: CalendarDatePicker(
                    initialDate: new DateTime.now(),
                    firstDate: new DateTime.now(),
                    lastDate: new DateTime.now().add(new Duration(days: 10)),
                    onDateChanged: (DateTime date){
                      state.didChange(date);
                    },
                  ),
                ),
                SizedBox(height: 5.0),
                state.hasError ? Text(
                  '  ${state.errorText}',
                  style: TextStyle(
                    color: Colors.red.shade700,
                    fontSize: 12.0,
                  )
                ) : Container(),
              ],
            ),
          ),
        ],
      );
    }
  );
}

/**
*
*
**/
class Validator {

  static bool Name(String name) {
    String namePattern = r'^[a-zA-Z]';

    RegExp regExp = new RegExp(namePattern);
    return regExp.hasMatch(name);
  }
}
