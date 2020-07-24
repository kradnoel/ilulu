import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart' hide Headers ;
import 'package:ilulu_mobile/core/data/visitor.dart';

part 'ApiProvider.g.dart';

class ApiProvider {
  Dio _dio;
  ApiClient _apiClient;
  bool handlerDisabled;

  ApiProvider() {
    _dio = new Dio();
    _apiClient = new ApiClient(_dio);
  }


}

@RestApi(baseUrl: "http://192.168.0.100:3001")
abstract class ApiClient {
  factory ApiClient(Dio dio) {
    dio.options = BaseOptions(receiveTimeout: 5000, connectTimeout: 5000);

    dio.interceptors.add(InterceptorsWrapper(
      onRequest:(RequestOptions options) async {

        if (!options.headers['handlerdisabled']) {
          String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRqYW1hbCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTU5NTMzMzc3Mn0.-ToDmCaykVxvBFlwzWAJJMe3vIjIEh-n_u_qrST0ZAg";
          options.headers['authorization'] = 'Bearer ${token}';
        }
        print('send request：path:${options.path}，baseURL:${options.baseUrl}, Headers: ${options.headers}');
        return options; //continue
      },
      onResponse:(Response response) async {
        return response; // continue
      },
      onError: (DioError e) async {
        if (e.response == null) {
          e.error = "Ligacao ao Servidor Indisponivel. Verifique a sua ligacao a Internet";
        }
        return  e;
      }
    ));

    return _ApiClient(dio);
  }

    //return _ApiClient(dio, baseUrl: baseUrl);

  //@GET("/visitors/{id}")
  //Future<BaseModel<List<Visitor>>> getVisitorsFromId(@Path("id") int accountId);
}
