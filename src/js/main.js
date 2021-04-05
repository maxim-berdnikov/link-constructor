'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const API_KEY = 'Zd87K9NT8EBihkb8anKy102553014';
    let googleUrl = '';
    let icsUrl = '';

    new JustValidate('.js-form', {
        rules: {
            title: {
                required: true
            },
            desc: {
                required: true
            },
            start: {
                required: true
            },
            end: {
                required: true
            },
            month: {
                required: true
            },
            day: {
                required: true
            },
            id: {
                required: true
            },
        },

        submitHandler: function (form, values, ajax) {
            getShortUrl(values, ajax, 'ics', icsUrl)
                .then(
                    result => {
                        icsUrl = result;
                        return icsUrl;

                    },
                    error => {
                        console.log("Rejected: " + error); // error - аргумент reject
                    }
                )
                .then(
                    icsUrl => {
                        console.log(icsUrl); // result - аргумент resolve
                        return getShortUrl(values, ajax, 'ics', googleUrl);

                    },
                    error => {
                        console.log("Rejected: " + error); // error - аргумент reject
                    }
                )
                .then(
                    googleUrlResp => {
                        console.log(googleUrlResp); // result - аргумент resolve
                        googleUrl = googleUrlResp;
                        return googleUrl;

                    },
                    error => {
                        console.log("Rejected: " + error); // error - аргумент reject
                    }
                )
                .then(
                    googleUrl => {
                        getCalendarLink();
                    },
                    error => {
                        console.log("Rejected: " + error); // error - аргумент reject
                    }
                );
        },
    });


    function getShortUrl(values, ajax, type, url) {
        return new Promise(function (resolve, reject) {
            ajax({
                url: 'https://clck.ru/--?url=',
                method: 'GET',
                data: `https://live.skillbox.ru/calendar/?direction=${values.direction}&utm_source=calendar${type}&utm_medium=calendar&utm_campaign=all_all_calendar${type}_calendar_invite_intensive-${values.id}-2021-${values.month}_all_${values.direction}_skillbox&utm_content=${values.date}&utm_term=intensive`,
                async: true,
                callback: function (resp) {
                    resolve(resp);
                }
            });

        });
    }
    function getCalendarLink() {
        console.log('Календарь создан');
    }
});
