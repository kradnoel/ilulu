import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:ilulu_mobile/core/data/account.dart';
import 'package:ilulu_mobile/core/data/ApiService.dart';

abstract class AuthenticationEvent extends Equatable {
  const AuthenticationEvent();

  @override
  List<Object> get props => [];
}

// Fired just after the app is launched
class AppStarted extends AuthenticationEvent {
  @override
  String toString() => 'AppStarted {}';
}

// Fired when a user has successfully logged in
class UserLoggedIn extends AuthenticationEvent {
  final Account account;

  UserLoggedIn({this.account});

  @override
  List<Object> get props => [account];

  @override
  String toString() => 'UserLoggedIn {}';
}

// Fired when the user has logged out
class UserLoggedOut extends AuthenticationEvent {
  @override
  String toString() => 'UserLoggedOut {}';
}

abstract class AuthenticationState extends Equatable {
  const AuthenticationState();

  @override
  List<Object> get props => [];
}

class AuthenticationInitial extends AuthenticationState {}

class AuthenticationLoading extends AuthenticationState {}

class AuthenticationNotAuthenticated extends AuthenticationState {}

class AuthenticationAuthenticated extends AuthenticationState {
  final Account account;

  AuthenticationAuthenticated({this.account});

  @override
  List<Object> get props => [account];
}

class AuthenticationFailure extends AuthenticationState {
  final String message;

  AuthenticationFailure({this.message});

  @override
  List<Object> get props => [message];
}

class AuthenticationBloc extends Bloc<AuthenticationEvent, AuthenticationState> {
  final AuthenticationService _authenticationService;

  AuthenticationBloc(AuthenticationService authenticationService)
    : assert(authenticationService != null),
      _authenticationService = authenticationService;

  @override
  AuthenticationState get initialState => AuthenticationInitial();

  @override
  Stream<AuthenticationState> mapEventToState(AuthenticationEvent event) async* {
    if (event is AppStarted) {
      yield* _mapAppLoadedToState(event);
    }

    if (event is UserLoggedIn) {
      yield* _mapUserLoggedInToState(event);
    }

    if (event is UserLoggedOut) {
      yield* _mapUserLoggedOutToState(event);
    }
  }

  Stream<AuthenticationState> _mapAppLoadedToState(AppStarted event) async* {
    yield AuthenticationLoading(); // to display splash screen
    try {
      await Future.delayed(Duration(milliseconds: 100)); // a simulated delay
      final currentAccount = await _authenticationService.getCurrentAccount();

      if (currentAccount != null) {
        yield AuthenticationAuthenticated(account: currentAccount);
      } else {
        yield AuthenticationNotAuthenticated();
      }
    } catch (err) {
      yield AuthenticationFailure(message: err.message ?? 'An unknown error occurred');
    }
  }

  Stream<AuthenticationState> _mapUserLoggedInToState(UserLoggedIn event) async* {
    yield AuthenticationAuthenticated(account: event.account);
  }

  Stream<AuthenticationState> _mapUserLoggedOutToState(UserLoggedOut event) async* {
    await _authenticationService.signOut();
    yield AuthenticationNotAuthenticated();
  }
}
