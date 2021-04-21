'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const API_KEY = '7TyYdrk2KFeaefYFTe6T104199997';
    let icsLink = document.querySelector('.js-result-link-ics');
    let response = {
        ok: "1",
        ics: "Ссылк на ICS календарь",
        google: "Ссылка на google календарь",
        start: "28.09.2018 00:00",
        title: "Заголовок события",
        json: "json-строка со всеми переданными параметрами календаря"
    };
    let shortUrl = '';
    let calendarInfo = '';

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
            getShortUrl(values, ajax)
                .then(
                    result => {
                        shortUrl = result;
                        return shortUrl;

                    },
                    error => {
                        console.log("Rejected: " + error); // error - аргумент reject
                    }
                )
                .then(
                    shortUrl => {
                        return getCalendarLink(values, ajax, shortUrl);
                    },
                    error => {
                        console.log("Rejected: " + error); // error - аргумент reject
                    }
                )
                .then(
                    result => {
                        calendarInfo = result;
                        placeLink(calendarInfo.ics, icsLink)
                        return console.log(calendarInfo);

                    },
                    error => {
                        console.log("Rejected: " + error); // error - аргумент reject
                    }
                );
        },
    });


    function getShortUrl(values, ajax) {
        return new Promise(function (resolve, reject) {
            ajax({
                url: window.shortUrl,
                method: 'GET',
                data: `https://live.skillbox.ru/calendar/?direction=${values.direction}`,
                async: true,
                callback: function (resp) {
                    resolve(resp);
                }
            });
        });
    }

    function getCalendarLink(values, ajax) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve(response);
            }, 500);
            // ajax({
            //     url: window.calendarUrl,
            //     method: 'POST',
            //     data: {
            //         apikey: API_KEY,
            //         start: values.start + '00:00',
            //         end: values.end + ' 01:00',
            //         timezone: 'Europe/Moscow',
            //         title: values.title,
            //         url: urlClck,
            //         location: '',
            //         description: values.description,
            //         remind: '20',
            //         remind_unit: 'm'
            //     },
            //     async: true,
            //     callback: function (resp) {
            //         resolve(resp);
            //     }
            // });
        });
    }

    function placeLink(link, block) {
        block.value = link;
    }
});
