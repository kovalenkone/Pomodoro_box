type TKey = 'ss' | 'mm' | 'hh' | 'm'

function plural(word: string, num: number) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11
        ? forms[0]
        : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
        ? forms[1]
        : forms[2];
}

export function pluralTime(number: number, withoutSuffix: boolean, key: TKey) {
    var format = {
        ss: withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
        mm: withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
        hh: 'час_часа_часов',
    };
    if (key === 'm') {
        return withoutSuffix ? 'минута' : 'минуту';
    } else {
        return number + ' ' + plural(format[key], +number);
    }
}