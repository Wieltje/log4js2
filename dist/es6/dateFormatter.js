/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dateFormat = dateFormat;
/**
 * log4js <https://github.com/anigenero/log4js2>
 *
 * Copyright 2016-present Robin Schultz <http://anigenero.com>
 * Released under the MIT License
 */

let i18n = {
	'd': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'm': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

const TOKEN = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsAa])\1?|[LloSZ]|'[^']*'|'[^']*'/g;
const TIMEZONE = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
const TIMEZONE_CLIP = /[^-+\dA-Z]/g;

/**
 * Predefined DATE formats (specified by logj2)
 * @private
 * @type {{DEFAULT: string, ABSOLUTE: string, COMPACT: string, DATE: string, ISO8601: string, ISO8601_BASIC: string}}
 */
const _PREDEFINED = {
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
	let isUTC = mask.slice(0, 4) == 'UTC:';
	if (isUTC) {
		mask = mask.slice(4);
	}

	let prefix = isUTC ? 'getUTC' : 'get';
	let day = date[prefix + 'Day']();
	let month = date[prefix + 'Month']();
	let fullYear = date[prefix + 'FullYear']();
	let hours = date[prefix + 'Hours']();
	let minutes = date[prefix + 'Minutes']();
	let seconds = date[prefix + 'Seconds']();
	let milliseconds = date[prefix + 'Milliseconds']();
	let offset = isUTC ? 0 : date.getTimezoneOffset();

	let flags = {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGVGb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsiZGF0ZUZvcm1hdCIsImkxOG4iLCJUT0tFTiIsIlRJTUVaT05FIiwiVElNRVpPTkVfQ0xJUCIsIl9QUkVERUZJTkVEIiwicGFkIiwidmFsdWUiLCJsZW5ndGgiLCJTdHJpbmciLCJkYXRlIiwibWFzayIsIkRFRkFVTFQiLCJpc1VUQyIsInNsaWNlIiwicHJlZml4IiwiZGF5IiwibW9udGgiLCJmdWxsWWVhciIsImhvdXJzIiwibWludXRlcyIsInNlY29uZHMiLCJtaWxsaXNlY29uZHMiLCJvZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsImZsYWdzIiwiZ2V0RGF0ZSIsImQiLCJtIiwibWF0Y2giLCJwb3AiLCJyZXBsYWNlIiwiTWF0aCIsImZsb29yIiwiYWJzIiwiJDAiXSwibWFwcGluZ3MiOiI7Ozs7O1FBNERnQkEsVSxHQUFBQSxVO0FBNURoQjs7Ozs7OztBQU9BLElBQUlDLE9BQU87QUFDVixNQUFNLENBQUUsS0FBRixFQUFTLEtBQVQsRUFBZ0IsS0FBaEIsRUFBdUIsS0FBdkIsRUFBOEIsS0FBOUIsRUFBcUMsS0FBckMsRUFBNEMsS0FBNUMsRUFBbUQsUUFBbkQsRUFBNkQsUUFBN0QsRUFDTCxTQURLLEVBQ00sV0FETixFQUNtQixVQURuQixFQUMrQixRQUQvQixFQUN5QyxVQUR6QyxDQURJO0FBR1YsTUFBTSxDQUFFLEtBQUYsRUFBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCLEtBQXZCLEVBQThCLEtBQTlCLEVBQXFDLEtBQXJDLEVBQTRDLEtBQTVDLEVBQW1ELEtBQW5ELEVBQTBELEtBQTFELEVBQ0wsS0FESyxFQUNFLEtBREYsRUFDUyxLQURULEVBQ2dCLFNBRGhCLEVBQzJCLFVBRDNCLEVBQ3VDLE9BRHZDLEVBQ2dELE9BRGhELEVBQ3lELEtBRHpELEVBQ2dFLE1BRGhFLEVBRUwsTUFGSyxFQUVHLFFBRkgsRUFFYSxXQUZiLEVBRTBCLFNBRjFCLEVBRXFDLFVBRnJDLEVBRWlELFVBRmpEO0FB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QjtBQXNCWCxPQUFNQSxRQUFRLEVBQVIsR0FBYSxHQUFiLEdBQW1CLEdBdEJkO0FBdUJYLFFBQU9BLFFBQVEsRUFBUixHQUFhLElBQWIsR0FBb0IsSUF2QmhCO0FBd0JYLE9BQU1OLFFBQVEsS0FBUixHQUFnQixDQUFDSixPQUFPQyxJQUFQLEVBQWFtQixLQUFiLENBQW1CMUIsUUFBbkIsS0FBZ0MsQ0FBRSxFQUFGLENBQWpDLEVBQXlDMkIsR0FBekMsR0FBK0NDLE9BQS9DLENBQXVEM0IsYUFBdkQsRUFBc0UsRUFBdEUsQ0F4Qlg7QUF5QlgsT0FBTSxDQUFDbUIsU0FBUyxDQUFULEdBQWEsR0FBYixHQUFtQixHQUFwQixJQUEyQmpCLElBQUkwQixLQUFLQyxLQUFMLENBQVdELEtBQUtFLEdBQUwsQ0FBU1gsTUFBVCxJQUFtQixFQUE5QixJQUFvQyxHQUFwQyxHQUEwQ1MsS0FBS0UsR0FBTCxDQUFTWCxNQUFULElBQW1CLEVBQWpFLEVBQXFFLENBQXJFO0FBekJ0QixFQUFaOztBQTRCQSxRQUFPWixLQUFLb0IsT0FBTCxDQUFhN0IsS0FBYixFQUFvQixVQUFVaUMsRUFBVixFQUFjO0FBQ3hDLFNBQU9BLE1BQU1WLEtBQU4sR0FBY0EsTUFBTVUsRUFBTixDQUFkLEdBQTBCQSxFQUFqQztBQUNBLEVBRk0sQ0FBUDtBQUlBIiwiZmlsZSI6ImRhdGVGb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGxvZzRqcyA8aHR0cHM6Ly9naXRodWIuY29tL2FuaWdlbmVyby9sb2c0anMyPlxuICpcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQgUm9iaW4gU2NodWx0eiA8aHR0cDovL2FuaWdlbmVyby5jb20+XG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqL1xuXG5sZXQgaTE4biA9IHtcblx0J2QnIDogWyAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JywgJ1N1bmRheScsICdNb25kYXknLFxuXHRcdCdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknIF0sXG5cdCdtJyA6IFsgJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcblx0XHQnT2N0JywgJ05vdicsICdEZWMnLCAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsXG5cdFx0J0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJyBdXG59O1xuXG5jb25zdCBUT0tFTiA9IC9kezEsNH18TXsxLDR9fHl5KD86eXkpP3woW0hobXNBYV0pXFwxP3xbTGxvU1pdfCdbXiddKid8J1teJ10qJy9nO1xuY29uc3QgVElNRVpPTkUgPSAvXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZztcbmNvbnN0IFRJTUVaT05FX0NMSVAgPSAvW14tK1xcZEEtWl0vZztcblxuLyoqXG4gKiBQcmVkZWZpbmVkIERBVEUgZm9ybWF0cyAoc3BlY2lmaWVkIGJ5IGxvZ2oyKVxuICogQHByaXZhdGVcbiAqIEB0eXBlIHt7REVGQVVMVDogc3RyaW5nLCBBQlNPTFVURTogc3RyaW5nLCBDT01QQUNUOiBzdHJpbmcsIERBVEU6IHN0cmluZywgSVNPODYwMTogc3RyaW5nLCBJU084NjAxX0JBU0lDOiBzdHJpbmd9fVxuICovXG5jb25zdCBfUFJFREVGSU5FRCA9IHtcbiAgICAnREVGQVVMVCcgOiAneXl5eS1NTS1kZCBISDptbTpzcyxTJyxcbiAgICAnQUJTT0xVVEUnIDogJ0hIOk1NOnNzLFMnLFxuICAgICdDT01QQUNUJyA6ICd5eXl5TU1kZEhIbW1zc1MnLFxuICAgICdEQVRFJyA6ICdkZCBNTU0geXl5eSBISDptbTpzcyxTJyxcbiAgICAnSVNPODYwMScgOiAneXl5eS1NTS1kZFRISDptbTpzcyxTJyxcbiAgICAnSVNPODYwMV9CQVNJQycgOiAneXl5eU1NZGRUSEhtbXNzLFMnXG59O1xuXG4vKipcbiAqIFBhZHMgbnVtYmVycyBpbiB0aGUgZGF0ZSBmb3JtYXRcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBsZW5ndGhcbiAqXG4gKiBAcmV0dXJucyB7P3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcGFkKHZhbHVlLCBsZW5ndGgpIHtcblxuICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcblx0bGVuZ3RoID0gbGVuZ3RoIHx8IDI7XG5cbiAgICB3aGlsZSAodmFsdWUubGVuZ3RoIDwgbGVuZ3RoKSB7XG5cdFx0dmFsdWUgPSAnMCcgKyB2YWx1ZTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcblxufVxuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGVcbiAqIEBwYXJhbSBkYXRlXG4gKiBAcGFyYW0gbWFza1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGVGb3JtYXQoZGF0ZSwgbWFzaykge1xuXG4gICAgaWYgKF9QUkVERUZJTkVEW21hc2tdKSB7XG4gICAgICAgIG1hc2sgPSBfUFJFREVGSU5FRFttYXNrXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtYXNrID0gU3RyaW5nKG1hc2sgfHwgX1BSRURFRklORUQuREVGQVVMVCk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGRhdGUgZm9ybWF0IGlzIHNldCBmb3IgVVRDXG4gICAgbGV0IGlzVVRDID0gKG1hc2suc2xpY2UoMCwgNCkgPT0gJ1VUQzonKTtcblx0aWYgKGlzVVRDKSB7XG5cdFx0bWFzayA9IG1hc2suc2xpY2UoNCk7XG5cdH1cblxuXHRsZXQgcHJlZml4ID0gaXNVVEMgPyAnZ2V0VVRDJyA6ICdnZXQnO1xuXHRsZXQgZGF5ID0gZGF0ZVtwcmVmaXggKyAnRGF5J10oKTtcblx0bGV0IG1vbnRoID0gZGF0ZVtwcmVmaXggKyAnTW9udGgnXSgpO1xuXHRsZXQgZnVsbFllYXIgPSBkYXRlW3ByZWZpeCArICdGdWxsWWVhciddKCk7XG5cdGxldCBob3VycyA9IGRhdGVbcHJlZml4ICsgJ0hvdXJzJ10oKTtcblx0bGV0IG1pbnV0ZXMgPSBkYXRlW3ByZWZpeCArICdNaW51dGVzJ10oKTtcblx0bGV0IHNlY29uZHMgPSBkYXRlW3ByZWZpeCArICdTZWNvbmRzJ10oKTtcblx0bGV0IG1pbGxpc2Vjb25kcyA9IGRhdGVbcHJlZml4ICsgJ01pbGxpc2Vjb25kcyddKCk7XG5cdGxldCBvZmZzZXQgPSBpc1VUQyA/IDAgOiBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cblx0bGV0IGZsYWdzID0ge1xuXHRcdCdkJyA6IGRhdGUuZ2V0RGF0ZSgpLFxuXHRcdCdkZCcgOiBwYWQoZGF0ZS5nZXREYXRlKCkpLFxuXHRcdCdkZGQnIDogaTE4bi5kW2RheV0sXG5cdFx0J2RkZGQnIDogaTE4bi5kW2RheSArIDddLFxuXHRcdCdNJyA6IG1vbnRoICsgMSxcblx0XHQnTU0nIDogcGFkKG1vbnRoICsgMSksXG5cdFx0J01NTScgOiBpMThuLm1bbW9udGhdLFxuXHRcdCdNTU1NJyA6IGkxOG4ubVttb250aCArIDEyXSxcblx0XHQneXknIDogU3RyaW5nKGZ1bGxZZWFyKS5zbGljZSgyKSxcblx0XHQneXl5eScgOiBmdWxsWWVhcixcblx0XHQnaCcgOiBob3VycyAlIDEyIHx8IDEyLFxuXHRcdCdoaCcgOiBwYWQoaG91cnMgJSAxMiB8fCAxMiksXG5cdFx0J0gnIDogaG91cnMsXG5cdFx0J0hIJyA6IHBhZChob3VycyksXG5cdFx0J20nIDogbWludXRlcyxcblx0XHQnbW0nIDogcGFkKG1pbnV0ZXMpLFxuXHRcdCdzJyA6IHNlY29uZHMsXG5cdFx0J3NzJyA6IHBhZChzZWNvbmRzKSxcblx0XHQnUycgOiBwYWQobWlsbGlzZWNvbmRzLCAxKSxcblx0XHQnYScgOiBob3VycyA8IDEyID8gJ2EnIDogJ3AnLFxuXHRcdCdhYScgOiBob3VycyA8IDEyID8gJ2FtJyA6ICdwbScsXG5cdFx0J0EnIDogaG91cnMgPCAxMiA/ICdBJyA6ICdQJyxcblx0XHQnQUEnIDogaG91cnMgPCAxMiA/ICdBTScgOiAnUE0nLFxuXHRcdCdaJyA6IGlzVVRDID8gJ1VUQycgOiAoU3RyaW5nKGRhdGUpLm1hdGNoKFRJTUVaT05FKSB8fCBbICcnIF0pLnBvcCgpLnJlcGxhY2UoVElNRVpPTkVfQ0xJUCwgJycpLFxuXHRcdCdvJyA6IChvZmZzZXQgPiAwID8gJy0nIDogJysnKSArIHBhZChNYXRoLmZsb29yKE1hdGguYWJzKG9mZnNldCkgLyA2MCkgKiAxMDAgKyBNYXRoLmFicyhvZmZzZXQpICUgNjAsIDQpXG5cdH07XG5cblx0cmV0dXJuIG1hc2sucmVwbGFjZShUT0tFTiwgZnVuY3Rpb24gKCQwKSB7XG5cdFx0cmV0dXJuICQwIGluIGZsYWdzID8gZmxhZ3NbJDBdIDogJDA7XG5cdH0pO1xuXG59XG4iXX0=