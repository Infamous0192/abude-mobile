import Dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';
Dayjs.extend(relativeTime);
Dayjs.extend(customParseFormat);
Dayjs.extend(localizedFormat).locale('id');

export const dayjs = Dayjs;
