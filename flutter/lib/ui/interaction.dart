import 'package:flutter/material.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ilulu_mobile/core/shared/shared.dart';
import 'package:ilulu_mobile/core/bloc/bloc.dart';
import 'package:ilulu_mobile/core/routes.dart';
import 'package:ilulu_mobile/ui/widgets.dart';

class InteractionPage extends StatefulWidget {
  @override
  _InteractionPageState createState() => _InteractionPageState();
}

class _InteractionPageState extends State<InteractionPage> {
  final Map<String, String> object = Map();
  final _formKey = GlobalKey<FormState>();
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  InteractionBloc _interactionBloc;

  @override
	void initState() {
		super.initState();
		_interactionBloc = InteractionBloc();
	}

	@override
  void dispose() {
    _interactionBloc.close();
    super.dispose();
  }

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
          'Sugestao & Reclamacao',
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
          onPressed: () => MyRouter.router.navigateTo(context, "add_interaction", transition: TransitionType.fadeIn),
        ),
      ),
    );
  }
}

class AddInteractionPage extends StatefulWidget {
  @override
  _AddInteractionPageState createState() => _AddInteractionPageState();
}

class _AddInteractionPageState extends State<AddInteractionPage> {
  final Map<String, String> object = Map();
  final _formKey = GlobalKey<FormState>();
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  final _items = [
    'Sugestao',
    'Reclamacao'
  ];

  /*
  return BlocBuilder<InteractionBloc, InteractionState>(
      bloc: _interactionBloc,
	    builder: (context, state) {

	      if (state is InteractionInitial) {
	        return MyScaffold(
	          context: context,
	          title: Text('a'),
	          body: Placeholder(),
	        );
	      } else if (state is InteractionLoading) {
	        return CircularProgressIndicator();
	      } else {
	        return Container();
	      }
	    }
    );
  */

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
          'Enviar Sugestao / Reclamacao',
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
                                            'Tipo',
                                            style: TextStyle(
                                              fontSize: 12.0,
                                            ),
                                          ),
                                          DropdownButtonFormField<String>(
                                            decoration: InputDecoration(
                                              contentPadding: EdgeInsets.fromLTRB(10, 20, 10, 20),
                                              filled: true,
                                              fillColor: Colors.grey[200],
                                              hintText: 'Tipo',
                                            ),
                                            items: _items.map((label) => DropdownMenuItem(
                                              child: Text(label),
                                              value: label,
                                            )).toList(),
                                            onChanged: (_) {},
                                            validator: (String value) {
                                              if (value == '' || value == null){
                                                return '*Tipo em falta.';
                                              }
                                              _formKey.currentState.save();
                                              return null;
                                            },
                                            onSaved: (String value) {
                                              object['tipo'] = value;
                                            },
                                          ),
                                        ],
                                      ),
                                    ),
                                    SizedBox(height: 10.0),
                                    MyTextFormField(
                                      initialValue: '',
                                      labelText: 'Mensagem',
                                      hintText: 'Ex: ...',
                                      minLines: 3,
                                      validator: (String value) {
                                        if (value == ''){
                                          return '*Mensagem em falta.';
                                        }
                                        _formKey.currentState.save();
                                        return null;
                                      },
                                      onSaved: (String value) {
                                        object['mensagem'] = value;
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
                                      child: Text('Enviar'),
                                      onPressed: () {
                                        if(_formKey.currentState.validate()) {
                                          print('valid');
                                          print("Date - ${object['mensagem']}");
                                        }else{
                                          print('not validated');
                                          print("Date - ${object['tipo']}");
                                        }
                                      }
                                    ),
                                  ],
                                ),
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
