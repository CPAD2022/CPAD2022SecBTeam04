import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'lat_lng.dart';
import 'place.dart';
import '../backend/backend.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../../auth/auth_util.dart';

DateTime convertDate(String rawDate) {
  // kjboboAdd your function code here!

  var re = RegExp(
    r'^'
    r'(?<day>[0-9]{1,2})'
    r'/'
    r'(?<month>[0-9]{1,2})'
    r'/'
    r'(?<year>[0-9]{4,})'
    r'$',
  );

  var match = re.firstMatch(rawDate);
  if (match == null) {
    throw FormatException('Unrecognized date format');
  }

  var dateTime4 = DateTime(
    int.parse(match.namedGroup('year')!),
    int.parse(match.namedGroup('month')!),
    int.parse(match.namedGroup('day')!),
  );

  return dateTime4;
}
