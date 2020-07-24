// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'breakdown.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Breakdown _$BreakdownFromJson(Map<String, dynamic> json) {
  return Breakdown(
    id: json['id'] as int,
    EquipametCode: json['EquipametCode'] as String,
    reportDate: json['reportDate'] as String,
    message: json['message'] as String,
  );
}

Map<String, dynamic> _$BreakdownToJson(Breakdown instance) => <String, dynamic>{
      'id': instance.id,
      'EquipametCode': instance.EquipametCode,
      'reportDate': instance.reportDate,
      'message': instance.message,
    };
