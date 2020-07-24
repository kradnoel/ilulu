import 'package:json_annotation/json_annotation.dart';
import 'package:sqflite/sqflite.dart';
//import 'package:ilulu_mobile/core/data/DioSingleton.dart';
import 'package:retrofit/retrofit.dart';

part 'interaction.g.dart';

final String tableInteraction = 'interactions';
final String columnId = '_id';
final String columnType = 'type';
final String columnMessage = 'message';
final String columnResidentId = 'residentId';

@JsonSerializable(nullable: false)
class Interaction {
  final int id;
  final String type;
  final String message;
  final String residentId;

  Interaction({this.id, this.type, this.message, this.residentId});

  factory Interaction.fromJson(Map<String, dynamic> json) => _$InteractionFromJson(json);
  Map<String, dynamic> toJson() => _$InteractionToJson(this);
}

/*

class InteractionService {
  final DioSingleton singleton = DioSingleton();
  final List<Interaction> _interactions = new List<Interaction>();

  InteractionService() {}

  Future<List<Interaction>> getInteractions() async {
    singleton.client.get();
    return _interactions;
  }
}

*/
