import 'package:json_annotation/json_annotation.dart';

part 'visitor.g.dart';

@JsonSerializable(nullable: false)
class Visitor {
  final int id;
  final String fullName;
  final String docNumber;
  final int TypeDocumentId;
  final String entryDate;

  Visitor({this.id, this.fullName, this.docNumber, this.TypeDocumentId, this.entryDate});

  factory Visitor.fromJson(Map<String, dynamic> json) => _$VisitorFromJson(json);
  Map<String, dynamic> toJson() => _$VisitorToJson(this);
}

@JsonSerializable(nullable: false)
class VisitorResponse {
  final int code;
  final String status;
  final String message;
  final List<Visitor> data;

  VisitorResponse({this.code, this.status, this.message, this.data});

  @override
  String toString() => "VisitorResponse { code: $code, status: $status, message: $message, data: $data }";

  factory VisitorResponse.fromJson(Map<String, dynamic> json) => _$VisitorResponseFromJson(json);
  Map<String, dynamic> toJson() => _$VisitorResponseToJson(this);
}

@JsonSerializable(nullable: false)
class VisitorStringResponse {
  final int code;
  final String status;
  final String message;
  final String data;

  VisitorStringResponse({this.code, this.status, this.message, this.data});

  @override
  String toString() => "VisitorStringResponse { code: $code, status: $status, message: $message, data: $data }";

  factory VisitorStringResponse.fromJson(Map<String, dynamic> json) => _$VisitorStringResponseFromJson(json);
  Map<String, dynamic> toJson() => _$VisitorStringResponseToJson(this);
}
