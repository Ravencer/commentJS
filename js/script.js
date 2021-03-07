//объявляем функцию, которая будет сортировать массив с выбранным типом и значениями, введенными пользователем
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

//объявляем функцию, которая будет чистить окно с выводом
	hideAllResponseBlocks = () => {
		//получаем все блоки с возможными ответами пользователю
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//скрываем их
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
//объявляем функцию, которая будет показывать нужный блок с нужным ответом пользователю
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//сначала скрываем все прошлые блоки с ответами
		hideAllResponseBlocks();
		//показываем нужный блок, будь это блок с ошибкой, с пустым результатом и тд.
		document.querySelector(blockSelector).style.display = 'block';
		//если ответ существует
		if (spanSelector) {
			//то вставляем этот ответ в показанный блок
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
//объявляем функцию, которая будет выводить ошибку и показывать нужный блок для пользователя
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
//объявляем функцию, которая будет выводить результат, если введенные данные корректны и не пусты
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
//объявляем функцию, которая будет показывать, что выводить нечего
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
//основная функция, которая будет траить проверку введенных пользователем данных с выбранным типом данных
	tryFilterByType = (type, values) => {
//блок, который программа будет пытаться выполнить
		try {
			//сортируем введенные пользователем данные с помощью первой функции и выводим их через запятую
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//проверяем на наличие подходящих данных, если их нет, то выводим соответствующее сообщение
			const alertMsg = (valuesArray.length) ?
			//если подходящие данные есть
				`Данные с типом ${type}: ${valuesArray}` :
			//если подходящие данные отстутствуют
				`Отсутствуют данные типа ${type}`;
			//выводим результат с нужным нам блоком и информацией
			showResults(alertMsg);
		//блок, который будет ловить исключения
		} catch (e) {
			//выводим блок с отловленной ошибкой
			showError(`Ошибка: ${e}`);
		}
	};
//получаем кнопку из dom дерева
const filterButton = document.querySelector('#filter-btn');
//навешиваем событие нажатия на кнопку
filterButton.addEventListener('click', e => {
	//получаем инпут с нужным типом данных
	const typeInput = document.querySelector('#type');
	//получаем инпут с введенными данными
	const dataInput = document.querySelector('#data');
	//если данных от пользователя не поступило
	if (dataInput.value === '') {
		//выводим сообщение, что поле не должно быть пустым
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//показываем блок, уведомляющий, что данных для фильтрации пока нет
		showNoResults();
	//иначе
	} else {
		//отменяем прошлое уведомление о том, что поле пустое, если такое сообщение уже было
		dataInput.setCustomValidity('');
		//отменяем стандартное поведение браузера
		e.preventDefault();
		//запускаем метод фильтрации данных, который получает нужный тип данных и введенные пользователем данные без лишних пробелов
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

