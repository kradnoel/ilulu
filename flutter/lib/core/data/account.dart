import 'package:json_annotation/json_annotation.dart';

part 'account.g.dart';


@JsonSerializable(nullable: false)
class Account {
  final int id;
  final String username;
  final String role;
  final bool isActive;

  Account({this.id, this.isActive, this.username, this.role});

  @override
  String toString() => "Account { id: $id, username: $username, role: $role, isActive: $isActive }";

  factory Account.fromJson(Map<String, dynamic> json) => _$AccountFromJson(json);
  Map<String, dynamic> toJson() => _$AccountToJson(this);

}

@JsonSerializable(nullable: false)
class AccountResponse {
  final int code;
  final String status;
  final String message;
  final List<Account> data;

  AccountResponse({this.code, this.status, this.message, this.data});

  @override
  String toString() => "AccountResponse { code: $code, status: $status, message: $message, data: $data }";

  factory AccountResponse.fromJson(Map<String, dynamic> json) => _$AccountResponseFromJson(json);
  Map<String, dynamic> toJson() => _$AccountResponseToJson(this);
}

@JsonSerializable(nullable: false)
class AccountStringResponse {
  final int code;
  final String status;
  final String message;
  final String data;

  AccountStringResponse({this.code, this.status, this.message, this.data});

  @override
  String toString() => "AccountStringResponse { code: $code, status: $status, message: $message, data: $data }";

  factory AccountStringResponse.fromJson(Map<String, dynamic> json) => _$AccountStringResponseFromJson(json);
  Map<String, dynamic> toJson() => _$AccountStringResponseToJson(this);
}
