window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {

        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (target === tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }

    });

    //timer таймер

    const deadline = '2025-02-23';

    function getTimeRemaining(endTime) {

        const countMillisec = Date.parse(endTime) - Date.parse(new Date());//получаем разницу между "датой конца акции" и "сегодняшней датой" в кол-ве миллисекунд
        const days = Math.floor(countMillisec / (1000 * 60 * 60 * 24));//получаем общее количество дней из количества миллисекунд, которые лежат в переменной "countMillisec " 
        const hours = Math.floor((countMillisec / (1000 * 60 * 60) % 24)); //получаем общее количество часов из количества миллисекунд, которые лежат в переменной "countMillisec " и забирам только остаток от деления на 24 (все целые дни уйдут, останется только часы которые меньше 24, и их округляем)
        const minutes = Math.floor((countMillisec / 1000 / 60) % 60);//получаем количество секунд (countMillisec / 1000), далее полученной число делина 60 чтобы получить минуты, и получаем остаток от деления на 60
        const seconds = Math.floor((countMillisec / 1000) % 60);//получаем количество секунд (countMillisec / 1000), и получаем остаток от деления на 60, потому что нам нужно число меньше минуты.

        return {//делаем объект с данными
            'total': countMillisec,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //функция добаволяет ноль если число от 1 до 9
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }

        return num;
    }

    //функция с двумя аргументами, selector нужен чтобы эта функция работала с разными счетчиками на странице
    function setClock(selectior, endtime) {
        const timer = document.querySelector(selectior); // находим все нужные элементы на странице
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000); //вызываем функцию updateClock каждую секунду

        updateClock() // вызываем функцию чтобы не было бага "задержки"

        function updateClock() {
            const t = getTimeRemaining(endtime); // получаем в переменную t объект с данными который создали выше,

            days.innerHTML = getZero(t.days);//вписываем свои значения из объекта в найденные элементы
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { //функция остановит счетчик когда раница меджу дедлайном и сейчас станет 0
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline)


    //Modal модальное окно

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');

    //находим все кнопки которые открывают модальное окно и вешаем на них собылие клик
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    })

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    //вешаем событие клик на крестик модального окна
    modalCloseBtn.addEventListener('click', () => {
        closeModal()
    });

    //вешаем событие клик на затемнённую подложку
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })

    //закрытие модального окна по кнопке Esc
    //посмотреть другие значения кнопок в event.code https://www.toptal.com/developers/keycode
    document.addEventListener('keydown', (e)=>{
        if(e.code === "Escape" && modal.classList.contains('show')){
            closeModal()
        }
    })
});