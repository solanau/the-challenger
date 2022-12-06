export const getRelativeTime = (ms: number) => {
    const seconds = ms / 1000;

    const rtf = new Intl.RelativeTimeFormat('en', {
        localeMatcher: 'best fit',
        numeric: 'auto',
        style: 'long',
    });

    if (Math.abs(seconds) < 1) {
        return null;
    } else if (Math.abs(seconds) < 60) {
        return rtf.format(seconds, 'second');
    } else if (Math.abs(seconds) < 3600) {
        return rtf.format(Math.floor(seconds / 60), 'minute');
    } else {
        return rtf.format(Math.floor(seconds / 3600), 'hour');
    }
};

export const dateToValue = (timestamp: number) => {
    const dt = new Date(timestamp);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 16);
};
