// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'interaction.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Interaction _$InteractionFromJson(Map<String, dynamic> json) {
  return Interaction(
    id: json['id'] as int,
    type: json['type'] as String,
    message: json['message'] as String,
    residentId: json['residentId'] as String,
  );
}

Map<String, dynamic> _$InteractionToJson(Interaction instance) =>
    <String, dynamic>{
      'id': instance.id,
      'type': instance.type,
      'message': instance.message,
      'residentId': instance.residentId,
    };
