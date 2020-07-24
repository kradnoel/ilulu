import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:vibicard/core/data/interaction.dart';
import 'package:vibicard/core/bloc/auth_bloc.dart';

abstract class LoginState extends Equatable {
  const LoginState();
}

class LoginInitial extends LoginState {}

class LoginLoading extends LoginState {}

class LoginSuccess extends LoginState {}

class LoginFailure extends LoginState {
  final String error;

  LoginFailure({@required this.error});

  @override
  List<Object> get props => [error];
}

abstract class LoginEvent extends Equatable {
  const LoginEvent();
}

class LoginButtonPressed extends LoginEvent {
  final String username;
  final String password;

  LoginEnter({@required this.username, @required this.password});

  @override
  List<Object> get props => [username, password];

  @override
  String toString() => "LoginEnter { username: $username, password: $password }";
}

class LogineBloc extends Bloc<LoginEvent, LoginState>{
  //AccountService service = new AccountService();
  final AuthenticationBloc _authenticationBloc;
  final AuthenticationService _authenticationService;

  LoginBloc(AuthenticationBloc authenticationBloc, AuthenticationService authenticationService)
      : assert(authenticationBloc != null),
        assert(authenticationService != null),
        _authenticationBloc = authenticationBloc,
        _authenticationService = authenticationService;

  @override
	LoginState get initialState => LoginInitial();

	@override
  Stream<LoginState> mapEventToState(LoginEvent event) async* {
    if (event is LoginButtonPressed) {
      yield* _mapLoginToState(event);
    }
  }

  Stream<LoginState> _mapLoginToState(LoginButtonPressed event) async* {
    yield LoginLoading();
    try {
      final account = await _authenticationService.login(event.username, event.password);

      if (account != null) {
        _authenticationBloc.add(UserLoggedIn(account: account);
        yield LoginSuccess();
        yield LoginInitial();
      } else {
        yield LoginFailure(error: "Username or password is Incorrect!!!");
      }
    } catch (err) {
      yield LoginFailure(error: error.message);
    }
  }
}

