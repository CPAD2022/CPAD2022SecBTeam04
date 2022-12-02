import 'package:firebase_auth/firebase_auth.dart';
import 'package:rxdart/rxdart.dart';

class CpadFirebaseUser {
  CpadFirebaseUser(this.user);
  User? user;
  bool get loggedIn => user != null;
}

CpadFirebaseUser? currentUser;
bool get loggedIn => currentUser?.loggedIn ?? false;
Stream<CpadFirebaseUser> cpadFirebaseUserStream() => FirebaseAuth.instance
        .authStateChanges()
        .debounce((user) => user == null && !loggedIn
            ? TimerStream(true, const Duration(seconds: 1))
            : Stream.value(user))
        .map<CpadFirebaseUser>(
      (user) {
        currentUser = CpadFirebaseUser(user);
        return currentUser!;
      },
    );
