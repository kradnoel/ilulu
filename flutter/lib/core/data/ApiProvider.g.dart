// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ApiProvider.dart';

// **************************************************************************
// RetrofitGenerator
// **************************************************************************

class _ApiClient implements ApiClient {
  _ApiClient(this._dio, {this.baseUrl}) {
    ArgumentError.checkNotNull(_dio, '_dio');
    this.baseUrl ??= 'http://192.168.0.100:3001';
  }

  final Dio _dio;

  String baseUrl;
}
