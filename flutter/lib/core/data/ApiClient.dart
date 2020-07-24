import 'package:retrofit/retrofit.dart'
import 'package:ilulu_mobile/core/data/BaseModel.dart';
import 'package:ilulu_mobile/core/data/visitor.dart';

part 'ApiClient.g.dart';

@RestApi(baseUrl: "http://192.168.0.100:3001")
abstract class ApiClient {
  factory ApiClient(Dio dio) {
    dio.options = BaseOptions(receiveTimeout: 5000, connectTimeout: 5000);
    return _ApiClient(dio, baseUrl: baseUrl);
  }

  @GET("/visitors/{id}")
  Future<BaseModel<List<Visitor>>> getVisitorsFromId(@Path("id") int accountId)
}
