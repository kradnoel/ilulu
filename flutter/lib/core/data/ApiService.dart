import 'package:ilulu_mobile/core/data/account.dart';
import 'package:ilulu_mobile/core/data/interaction.dart';
import 'package:ilulu_mobile/core/data/ApiProvider.dart';

class ApiService {
  ApiProvider provider;

  ApiService() {
    provider = new ApiProvider();
  }

  Future<List<Account>> login(String username, String password) async {
    List<Account> profileList = List<Account>();
    return profileList;
  }
}

class AuthenticationService {
  List<UserAccount> accounts = List<UserAccount>();
  User u = User(username: "djamal", password: "0000");
  //accounts.add(UserAccount(User("djamal","0000"),Account(1, "djamal", "CLIENT", true)));

  Future<Account> getCurrentAccount() {
    return null;
  }

  Future<Account> login(String username, String password) {
    //Account account;

    return null;
  }

  Future<void> signOut() {}
}

class InteractionService {
  Future<String> sendInteraction(Interaction interaction) async {
    return "Saved sucessfuly";
  }
}

class UserAccount {
  final User user;
  final Account account;

  UserAccount({this.user, this.account});

}

class User {
  final String username;
  final String password;

  User({this.username, this.password});
}
