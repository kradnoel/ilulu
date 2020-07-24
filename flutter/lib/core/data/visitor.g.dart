// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'visitor.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Visitor _$VisitorFromJson(Map<String, dynamic> json) {
  return Visitor(
    id: json['id'] as int,
    fullName: json['fullName'] as String,
    docNumber: json['docNumber'] as String,
    TypeDocumentId: json['TypeDocumentId'] as int,
    entryDate: json['entryDate'] as String,
  );
}

Map<String, dynamic> _$VisitorToJson(Visitor instance) => <String, dynamic>{
      'id': instance.id,
      'fullName': instance.fullName,
      'docNumber': instance.docNumber,
      'TypeDocumentId': instance.TypeDocumentId,
      'entryDate': instance.entryDate,
    };

VisitorResponse _$VisitorResponseFromJson(Map<String, dynamic> json) {
  return VisitorResponse(
    code: json['code'] as int,
    status: json['status'] as String,
    message: json['message'] as String,
    data: (json['data'] as List)
        .map((e) => Visitor.fromJson(e as Map<String, dynamic>))
        .toList(),
  );
}

Map<String, dynamic> _$VisitorResponseToJson(VisitorResponse instance) =>
    <String, dynamic>{
      'code': instance.code,
      'status': instance.status,
      'message': instance.message,
      'data': instance.data,
    };

VisitorStringResponse _$VisitorStringResponseFromJson(
    Map<String, dynamic> json) {
  return VisitorStringResponse(
    code: json['code'] as int,
    status: json['status'] as String,
    message: json['message'] as String,
    data: json['data'] as String,
  );
}

Map<String, dynamic> _$VisitorStringResponseToJson(
        VisitorStringResponse instance) =>
    <String, dynamic>{
      'code': instance.code,
      'status': instance.status,
      'message': instance.message,
      'data': instance.data,
    };
