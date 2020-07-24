import 'package:json_annotation/json_annotation.dart';

part 'breakdown.g.dart';

@JsonSerializable(nullable: false)
class Breakdown {
  final int id;
  final String EquipametCode;
  final String reportDate;
  final String message;

  Breakdown({this.id, this.EquipametCode, this.reportDate, this.message});

  factory Breakdown.fromJson(Map<String, dynamic> json) => _$BreakdownFromJson(json);
  Map<String, dynamic> toJson() => _$BreakdownToJson(this);

}
