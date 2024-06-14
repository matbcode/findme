/**
 * Returns the current time zone
 *
 * @param {string} zoneName
 * @returns {string}
 */
export function getTimeZone(zoneName = 'longOffset') {
    // set up formatter
    let formatter = new Intl.DateTimeFormat(undefined, {
        timeZoneName: zoneName,
    })
    // run formatter on current date
    return (
        formatter
            .formatToParts(Date.now())
            // extract the actual value from the formatter, only reliable way i can find to do this
            .find((formatted) => formatted.type === 'timeZoneName')[
            'value'
        ]
    )
}

/**
 * Returns the current date with an offset of minutes
 * @param {*} minutes
 * @returns
 */
export function getCurrentDateOffset({
    minutes = 0,
    hours = 0,
    days = 0,
    months = 0,
    years = 0,
}) {
    return new Date(
        new Date().setMinutes(
            new Date().getMinutes() +
                minutes +
                hours * 60 +
                days * 1440 +
                months * 43200 +
                years * 518400,
        ),
    )
}
