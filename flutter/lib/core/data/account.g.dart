// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'account.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Account _$AccountFromJson(Map<String, dynamic> json) {
  return Account(
    id: json['id'] as int,
    isActive: json['isActive'] as bool,
    username: json['username'] as String,
    role: json['role'] as String,
  );
}

Map<String, dynamic> _$AccountToJson(Account instance) => <String, dynamic>{
      'id': instance.id,
      'username': instance.username,
      'role': instance.role,
      'isActive': instance.isActive,
    };

AccountResponse _$AccountResponseFromJson(Map<String, dynamic> json) {
  return AccountResponse(
    code: json['code'] as int,
    status: json['status'] as String,
    message: json['message'] as String,
    data: (json['data'] as List)
        .map((e) => Account.fromJson(e as Map<String, dynamic>))
        .toList(),
  );
}

Map<String, dynamic> _$AccountResponseToJson(AccountResponse instance) =>
    <String, dynamic>{
      'code': instance.code,
      'status': instance.status,
      'message': instance.message,
      'data': instance.data,
    };

AccountStringResponse _$AccountStringResponseFromJson(
    Map<String, dynamic> json) {
  return AccountStringResponse(
    code: json['code'] as int,
    status: json['status'] as String,
    message: json['message'] as String,
    data: json['data'] as String,
  );
}

Map<String, dynamic> _$AccountStringResponseToJson(
        AccountStringResponse instance) =>
    <String, dynamic>{
      'code': instance.code,
      'status': instance.status,
      'message': instance.message,
      'data': instance.data,
    };
