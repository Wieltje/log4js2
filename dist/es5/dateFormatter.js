/*istanbul ignore next*/'use strict';

exports.__esModule = true;
exports.dateFormat = dateFormat;
/**
 * log4js <https://github.com/anigenero/log4js2>
 *
 * Copyright 2016-present Robin Schultz <http://anigenero.com>
 * Released under the MIT License
 */

var i18n = {
	'd': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'm': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

var TOKEN = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsAa])\1?|[LloSZ]|'[^']*'|'[^']*'/g;
var TIMEZONE = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
var TIMEZONE_CLIP = /[^-+\dA-Z]/g;

/**
 * Predefined DATE formats (specified by logj2)
 * @private
 * @type {{DEFAULT: string, ABSOLUTE: string, COMPACT: string, DATE: string, ISO8601: string, ISO8601_BASIC: string}}
 */
var _PREDEFINED = {
	'DEFAULT': 'yyyy-MM-dd HH:mm:ss,S',
	'ABSOLUTE': 'HH:MM:ss,S',
	'COMPACT': 'yyyyMMddHHmmssS',
	'DATE': 'dd MMM yyyy HH:mm:ss,S',
	'ISO8601': 'yyyy-MM-ddTHH:mm:ss,S',
	'ISO8601_BASIC': 'yyyyMMddTHHmmss,S'
};

/**
 * Pads numbers in the date format
 *
 * @param value
 * @param length
 *
 * @returns {?string}
 */
function pad(value, length) {

	value = String(value);
	length = length || 2;

	while (value.length < length) {
		value = '0' + value;
	}

	return value;
}

/**
 * Formats the date
 * @param date
 * @param mask
 * @returns {string}
 */
function dateFormat(date, mask) {

	if (_PREDEFINED[mask]) {
		mask = _PREDEFINED[mask];
	} else {
		mask = String(mask || _PREDEFINED.DEFAULT);
	}

	// check if the date format is set for UTC
	var isUTC = mask.slice(0, 4) == 'UTC:';
	if (isUTC) {
		mask = mask.slice(4);
	}

	var prefix = isUTC ? 'getUTC' : 'get';
	var day = date[prefix + 'Day']();
	var month = date[prefix + 'Month']();
	var fullYear = date[prefix + 'FullYear']();
	var hours = date[prefix + 'Hours']();
	var minutes = date[prefix + 'Minutes']();
	var seconds = date[prefix + 'Seconds']();
	var milliseconds = date[prefix + 'Milliseconds']();
	var offset = isUTC ? 0 : date.getTimezoneOffset();

	var flags = {
		'd': date.getDate(),
		'dd': pad(date.getDate()),
		'ddd': i18n.d[day],
		'dddd': i18n.d[day + 7],
		'M': month + 1,
		'MM': pad(month + 1),
		'MMM': i18n.m[month],
		'MMMM': i18n.m[month + 12],
		'yy': String(fullYear).slice(2),
		'yyyy': fullYear,
		'h': hours % 12 || 12,
		'hh': pad(hours % 12 || 12),
		'H': hours,
		'HH': pad(hours),
		'm': minutes,
		'mm': pad(minutes),
		's': seconds,
		'ss': pad(seconds),
		'S': pad(milliseconds, 1),
		'a': hours < 12 ? 'a' : 'p',
		'aa': hours < 12 ? 'am' : 'pm',
		'A': hours < 12 ? 'A' : 'P',
		'AA': hours < 12 ? 'AM' : 'PM',
		'Z': isUTC ? 'UTC' : (String(date).match(TIMEZONE) || ['']).pop().replace(TIMEZONE_CLIP, ''),
		'o': (offset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4)
	};

	return mask.replace(TOKEN, function ($0) {
		return $0 in flags ? flags[$0] : $0;
	});
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGVGb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsiZGF0ZUZvcm1hdCIsImkxOG4iLCJUT0tFTiIsIlRJTUVaT05FIiwiVElNRVpPTkVfQ0xJUCIsIl9QUkVERUZJTkVEIiwicGFkIiwidmFsdWUiLCJsZW5ndGgiLCJTdHJpbmciLCJkYXRlIiwibWFzayIsIkRFRkFVTFQiLCJpc1VUQyIsInNsaWNlIiwicHJlZml4IiwiZGF5IiwibW9udGgiLCJmdWxsWWVhciIsImhvdXJzIiwibWludXRlcyIsInNlY29uZHMiLCJtaWxsaXNlY29uZHMiLCJvZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsImZsYWdzIiwiZ2V0RGF0ZSIsImQiLCJtIiwibWF0Y2giLCJwb3AiLCJyZXBsYWNlIiwiTWF0aCIsImZsb29yIiwiYWJzIiwiJDAiXSwibWFwcGluZ3MiOiI7OztRQTREZ0JBLFUsR0FBQUEsVTtBQTVEaEI7Ozs7Ozs7QUFPQSxJQUFJQyxPQUFPO0FBQ1YsTUFBTSxDQUFFLEtBQUYsRUFBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCLEtBQXZCLEVBQThCLEtBQTlCLEVBQXFDLEtBQXJDLEVBQTRDLEtBQTVDLEVBQW1ELFFBQW5ELEVBQTZELFFBQTdELEVBQ0wsU0FESyxFQUNNLFdBRE4sRUFDbUIsVUFEbkIsRUFDK0IsUUFEL0IsRUFDeUMsVUFEekMsQ0FESTtBQUdWLE1BQU0sQ0FBRSxLQUFGLEVBQVMsS0FBVCxFQUFnQixLQUFoQixFQUF1QixLQUF2QixFQUE4QixLQUE5QixFQUFxQyxLQUFyQyxFQUE0QyxLQUE1QyxFQUFtRCxLQUFuRCxFQUEwRCxLQUExRCxFQUNMLEtBREssRUFDRSxLQURGLEVBQ1MsS0FEVCxFQUNnQixTQURoQixFQUMyQixVQUQzQixFQUN1QyxPQUR2QyxFQUNnRCxPQURoRCxFQUN5RCxLQUR6RCxFQUNnRSxNQURoRSxFQUVMLE1BRkssRUFFRyxRQUZILEVBRWEsV0FGYixFQUUwQixTQUYxQixFQUVxQyxVQUZyQyxFQUVpRCxVQUZqRDtBQUhJ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QUFzQlgsT0FBTUEsUUFBUSxFQUFSLEdBQWEsR0FBYixHQUFtQixHQXRCZDtBQXVCWCxRQUFPQSxRQUFRLEVBQVIsR0FBYSxJQUFiLEdBQW9CLElBdkJoQjtBQXdCWCxPQUFNTixRQUFRLEtBQVIsR0FBZ0IsQ0FBQ0osT0FBT0MsSUFBUCxFQUFhbUIsS0FBYixDQUFtQjFCLFFBQW5CLEtBQWdDLENBQUUsRUFBRixDQUFqQyxFQUF5QzJCLEdBQXpDLEdBQStDQyxPQUEvQyxDQUF1RDNCLGFBQXZELEVBQXNFLEVBQXRFLENBeEJYO0FBeUJYLE9BQU0sQ0FBQ21CLFNBQVMsQ0FBVCxHQUFhLEdBQWIsR0FBbUIsR0FBcEIsSUFBMkJqQixJQUFJMEIsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxHQUFMLENBQVNYLE1BQVQsSUFBbUIsRUFBOUIsSUFBb0MsR0FBcEMsR0FBMENTLEtBQUtFLEdBQUwsQ0FBU1gsTUFBVCxJQUFtQixFQUFqRSxFQUFxRSxDQUFyRTtBQXpCdEIsRUFBWjs7QUE0QkEsUUFBT1osS0FBS29CLE9BQUwsQ0FBYTdCLEtBQWIsRUFBb0IsVUFBVWlDLEVBQVYsRUFBYztBQUN4QyxTQUFPQSxNQUFNVixLQUFOLEdBQWNBLE1BQU1VLEVBQU4sQ0FBZCxHQUEwQkEsRUFBakM7QUFDQSxFQUZNLENBQVA7QUFJQSIsImZpbGUiOiJkYXRlRm9ybWF0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBsb2c0anMgPGh0dHBzOi8vZ2l0aHViLmNvbS9hbmlnZW5lcm8vbG9nNGpzMj5cbiAqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50IFJvYmluIFNjaHVsdHogPGh0dHA6Ly9hbmlnZW5lcm8uY29tPlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKi9cblxubGV0IGkxOG4gPSB7XG5cdCdkJyA6IFsgJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCcsICdTdW5kYXknLCAnTW9uZGF5Jyxcblx0XHQnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5JyBdLFxuXHQnbScgOiBbICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG5cdFx0J09jdCcsICdOb3YnLCAnRGVjJywgJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLFxuXHRcdCdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlcicgXVxufTtcblxuY29uc3QgVE9LRU4gPSAvZHsxLDR9fE17MSw0fXx5eSg/Onl5KT98KFtIaG1zQWFdKVxcMT98W0xsb1NaXXwnW14nXSonfCdbXiddKicvZztcbmNvbnN0IFRJTUVaT05FID0gL1xcYig/OltQTUNFQV1bU0RQXVR8KD86UGFjaWZpY3xNb3VudGFpbnxDZW50cmFsfEVhc3Rlcm58QXRsYW50aWMpICg/OlN0YW5kYXJkfERheWxpZ2h0fFByZXZhaWxpbmcpIFRpbWV8KD86R01UfFVUQykoPzpbLStdXFxkezR9KT8pXFxiL2c7XG5jb25zdCBUSU1FWk9ORV9DTElQID0gL1teLStcXGRBLVpdL2c7XG5cbi8qKlxuICogUHJlZGVmaW5lZCBEQVRFIGZvcm1hdHMgKHNwZWNpZmllZCBieSBsb2dqMilcbiAqIEBwcml2YXRlXG4gKiBAdHlwZSB7e0RFRkFVTFQ6IHN0cmluZywgQUJTT0xVVEU6IHN0cmluZywgQ09NUEFDVDogc3RyaW5nLCBEQVRFOiBzdHJpbmcsIElTTzg2MDE6IHN0cmluZywgSVNPODYwMV9CQVNJQzogc3RyaW5nfX1cbiAqL1xuY29uc3QgX1BSRURFRklORUQgPSB7XG4gICAgJ0RFRkFVTFQnIDogJ3l5eXktTU0tZGQgSEg6bW06c3MsUycsXG4gICAgJ0FCU09MVVRFJyA6ICdISDpNTTpzcyxTJyxcbiAgICAnQ09NUEFDVCcgOiAneXl5eU1NZGRISG1tc3NTJyxcbiAgICAnREFURScgOiAnZGQgTU1NIHl5eXkgSEg6bW06c3MsUycsXG4gICAgJ0lTTzg2MDEnIDogJ3l5eXktTU0tZGRUSEg6bW06c3MsUycsXG4gICAgJ0lTTzg2MDFfQkFTSUMnIDogJ3l5eXlNTWRkVEhIbW1zcyxTJ1xufTtcblxuLyoqXG4gKiBQYWRzIG51bWJlcnMgaW4gdGhlIGRhdGUgZm9ybWF0XG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gbGVuZ3RoXG4gKlxuICogQHJldHVybnMgez9zdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHBhZCh2YWx1ZSwgbGVuZ3RoKSB7XG5cbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG5cdGxlbmd0aCA9IGxlbmd0aCB8fCAyO1xuXG4gICAgd2hpbGUgKHZhbHVlLmxlbmd0aCA8IGxlbmd0aCkge1xuXHRcdHZhbHVlID0gJzAnICsgdmFsdWU7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG5cbn1cblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlXG4gKiBAcGFyYW0gZGF0ZVxuICogQHBhcmFtIG1hc2tcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXRlRm9ybWF0KGRhdGUsIG1hc2spIHtcblxuICAgIGlmIChfUFJFREVGSU5FRFttYXNrXSkge1xuICAgICAgICBtYXNrID0gX1BSRURFRklORURbbWFza107XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWFzayA9IFN0cmluZyhtYXNrIHx8IF9QUkVERUZJTkVELkRFRkFVTFQpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIHRoZSBkYXRlIGZvcm1hdCBpcyBzZXQgZm9yIFVUQ1xuICAgIGxldCBpc1VUQyA9IChtYXNrLnNsaWNlKDAsIDQpID09ICdVVEM6Jyk7XG5cdGlmIChpc1VUQykge1xuXHRcdG1hc2sgPSBtYXNrLnNsaWNlKDQpO1xuXHR9XG5cblx0bGV0IHByZWZpeCA9IGlzVVRDID8gJ2dldFVUQycgOiAnZ2V0Jztcblx0bGV0IGRheSA9IGRhdGVbcHJlZml4ICsgJ0RheSddKCk7XG5cdGxldCBtb250aCA9IGRhdGVbcHJlZml4ICsgJ01vbnRoJ10oKTtcblx0bGV0IGZ1bGxZZWFyID0gZGF0ZVtwcmVmaXggKyAnRnVsbFllYXInXSgpO1xuXHRsZXQgaG91cnMgPSBkYXRlW3ByZWZpeCArICdIb3VycyddKCk7XG5cdGxldCBtaW51dGVzID0gZGF0ZVtwcmVmaXggKyAnTWludXRlcyddKCk7XG5cdGxldCBzZWNvbmRzID0gZGF0ZVtwcmVmaXggKyAnU2Vjb25kcyddKCk7XG5cdGxldCBtaWxsaXNlY29uZHMgPSBkYXRlW3ByZWZpeCArICdNaWxsaXNlY29uZHMnXSgpO1xuXHRsZXQgb2Zmc2V0ID0gaXNVVEMgPyAwIDogZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG5cdGxldCBmbGFncyA9IHtcblx0XHQnZCcgOiBkYXRlLmdldERhdGUoKSxcblx0XHQnZGQnIDogcGFkKGRhdGUuZ2V0RGF0ZSgpKSxcblx0XHQnZGRkJyA6IGkxOG4uZFtkYXldLFxuXHRcdCdkZGRkJyA6IGkxOG4uZFtkYXkgKyA3XSxcblx0XHQnTScgOiBtb250aCArIDEsXG5cdFx0J01NJyA6IHBhZChtb250aCArIDEpLFxuXHRcdCdNTU0nIDogaTE4bi5tW21vbnRoXSxcblx0XHQnTU1NTScgOiBpMThuLm1bbW9udGggKyAxMl0sXG5cdFx0J3l5JyA6IFN0cmluZyhmdWxsWWVhcikuc2xpY2UoMiksXG5cdFx0J3l5eXknIDogZnVsbFllYXIsXG5cdFx0J2gnIDogaG91cnMgJSAxMiB8fCAxMixcblx0XHQnaGgnIDogcGFkKGhvdXJzICUgMTIgfHwgMTIpLFxuXHRcdCdIJyA6IGhvdXJzLFxuXHRcdCdISCcgOiBwYWQoaG91cnMpLFxuXHRcdCdtJyA6IG1pbnV0ZXMsXG5cdFx0J21tJyA6IHBhZChtaW51dGVzKSxcblx0XHQncycgOiBzZWNvbmRzLFxuXHRcdCdzcycgOiBwYWQoc2Vjb25kcyksXG5cdFx0J1MnIDogcGFkKG1pbGxpc2Vjb25kcywgMSksXG5cdFx0J2EnIDogaG91cnMgPCAxMiA/ICdhJyA6ICdwJyxcblx0XHQnYWEnIDogaG91cnMgPCAxMiA/ICdhbScgOiAncG0nLFxuXHRcdCdBJyA6IGhvdXJzIDwgMTIgPyAnQScgOiAnUCcsXG5cdFx0J0FBJyA6IGhvdXJzIDwgMTIgPyAnQU0nIDogJ1BNJyxcblx0XHQnWicgOiBpc1VUQyA/ICdVVEMnIDogKFN0cmluZyhkYXRlKS5tYXRjaChUSU1FWk9ORSkgfHwgWyAnJyBdKS5wb3AoKS5yZXBsYWNlKFRJTUVaT05FX0NMSVAsICcnKSxcblx0XHQnbycgOiAob2Zmc2V0ID4gMCA/ICctJyA6ICcrJykgKyBwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhvZmZzZXQpIC8gNjApICogMTAwICsgTWF0aC5hYnMob2Zmc2V0KSAlIDYwLCA0KVxuXHR9O1xuXG5cdHJldHVybiBtYXNrLnJlcGxhY2UoVE9LRU4sIGZ1bmN0aW9uICgkMCkge1xuXHRcdHJldHVybiAkMCBpbiBmbGFncyA/IGZsYWdzWyQwXSA6ICQwO1xuXHR9KTtcblxufVxuIl19