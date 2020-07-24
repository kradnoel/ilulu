import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:ilulu_mobile/core/data/interaction.dart';
import 'package:ilulu_mobile/core/data/ApiService.dart';

abstract class InteractionState extends Equatable {
  const InteractionState();

  @override
  List<Object> get props => [];
}

class InteractionInitial extends InteractionState {}

class InteractionLoading extends InteractionState {}

class InteractionSuccess extends InteractionState {}

abstract class InteractionEvent extends Equatable {
  const InteractionEvent();

  @override
  List<Object> get props => [];
}

class InteractionSend extends InteractionEvent {
  final Interaction interaction;

  InteractionSend({this.interaction});

  @override
  List<Object> get props => [interaction];

  @override
  String toString() => "InteractionSend { interaction: $interaction }";
}

class InteractionError extends InteractionState {
  final String error;

  InteractionError({this.error});

  @override
  List<Object> get props => [error];

  @override
  String toString() => "InteractionError { error: $error }";
}

class InteractionBloc extends Bloc<InteractionEvent, InteractionState> {
  InteractionService service = new InteractionService();

  @override
	InteractionState get initialState => InteractionInitial();

	@override
  Stream<InteractionState> mapEventToState(InteractionEvent event) async* {
    if (event is InteractionSend) {
      yield* _mapInteractionSendToState(event);
    }

  }

  Stream<InteractionState> _mapInteractionSendToState(InteractionSend event) async* {
    yield InteractionLoading();
    try {
      await service.sendInteraction(event.interaction);
      yield InteractionSuccess();
    } catch (err) {
      yield InteractionError(error: "Error");
    }
  }
}

