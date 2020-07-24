
class BaseModel<T> {
  int code;
  String status;
  String message;
  T data;

  setData(T data) {
    this.data = data;
  }

  setCode(int code) {
    this.code = code;
  }

  setMessage(String message) {
    this.message = message;
  }

  get getCode {
    return code;
  }

  get getMessage {
    return message;
  }
}
