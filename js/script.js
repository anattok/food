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
            openModal()
        });
    })

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        clearInterval(modalTimerId) // очищаем интервал, для того чтобы если пользователь сам его открыл, то он не появлялось через заданое количество секунд
    }

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
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 6000)//открываем модальное окно через промежуток времени


    //если пользователь долистал до конца (минут 1 рх исправление бага для ращные браузеров не открывалось окно) появляется модалка, 
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);//убираем слушатель, чтобы мдалка не появлялась второй раз
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //menu

    const menu = [
        {
            src: 'https://sensey64.ru/uploads/images/artleo.com-30924.jpg',
            alt: 'rolly',
            title: 'Роллы "Азиатики" набор',
            text: 'Роллы - одна из разновидностей суши в японской кухне, отличительной особенностью которой является скручивание в цилиндрическую форму, с последующим разрезанием на дольки.',
            price: 890
        },
        {
            src: 'https://static.fanpage.it/wp-content/uploads/sites/22/2021/09/beef-burger.jpg',
            alt: 'berger',
            title: 'Сочный бургер "Толстяк"',
            text: 'Классический бургер  – это жареная котлета из говяжьего  фарша между двумя половинками разрезанной булочки, с листком салата, долькой помидора и репчатым луком. ',
            price: 550
        },
        {
            src: 'https://eda.yandex.ru/images/1387779/1f34a88909e68b85bbdd8c77462bb04d-1100x825.jpg',
            alt: 'shaverma',
            title: 'Шаверма "Братуха" классика',
            text: 'Шаурма — обжаренное на вертикальном гриле мясо в лаваше, тонкой пите, пресной лепешке, приправленное овощами и соусами. ',
            price: 250
        },
        {
            src: 'https://cdn.vkuso.ru/uploads/75356_9134526002859f3270a1871fbedd6cd4_190519-020358.jpg',
            alt: 'wings',
            title: 'Сочные куринные крылышки BBQ',
            text: 'Куриные крылышки — одна из самых популярных закусок, очень вкусное и при этом простое в приготовлении блюдо. ',
            price: 420
        },
        {
            src: 'https://cdn.lifehacker.ru/wp-content/uploads/2020/06/6_1592925463-scaled-e1592925524667.jpg',
            alt: 'soup',
            title: 'Соляночка с копчёными колбасками',
            text: 'Солянка (или селянка) – блюдо традиционной русской кухни, густой пряный и острый суп, сваренный на крепком мясном бульоне с обязательным добавлением солёных огурцов.',
            price: 330
        },
        {
            src: 'http://www.menslife.com/upload/iblock/4be/piknik_po_korolevski_kak_prigotovit_idealnyy_shashlyk.jpg',
            alt: 'meat',
            title: 'Свиной шашлык "Не убежала"',
            text: 'Буквально, «шашлык» — это мясное кушанье, зажаренное на вертеле над огнем или углями.',
            price: 590
        }

    ]


    class CardMenu {
        constructor(src, alt, title, text, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');
            element.classList.add('menu__item')

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> РУБ</div>
            </div>`;

            this.parent.append(element);
        }
    }

    menu.forEach(cart => {
        new CardMenu(
            cart.src,
            cart.alt,
            cart.title,
            cart.text,
            cart.price,
            '.menu .container'
        ).render()
    })

});





