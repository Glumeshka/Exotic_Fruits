// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате в список! будет добовляться данные с формы ввода и переводиться в формат JSON

let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

const display = () => { // ето функция для отображения из текущего списка фруктов
  fruitsList.innerHTML = ''; // TODO: очищаем fruitsList от вложенных элементов, чтобы заполнить актуальными данными из fruits
    for (let i = 0; i < fruits.length; i++) {
    const li = document.createElement('li');
    li.classList.add('fruit__item');
    if (fruits[i]["color"] == 'фиолетовый') { // добавляем цвет заливки через добавление класса
      li.classList.add('fruit_violet');
    } else if (fruits[i]["color"] == 'зеленый') {
      li.classList.add('fruit_green');
    } else if (fruits[i]["color"] == 'розово-красный') {
      li.classList.add('fruit_carmazin');
    } else if (fruits[i]["color"] == 'желтый') {
      li.classList.add('fruit_yellow');
    } else if (fruits[i]["color"] == 'светло-коричневый') {
      li.classList.add('fruit_lightbrown');
    } else if (fruits[i]["color"] == 'черный') {
      li.classList.add('fruit_black');
    } else if (fruits[i]["color"] == 'синий') {
      li.classList.add('fruit_blue');
    }
    const div =` 
    <div class="fruit__info">
    <div>index: ${i}</div>
    <div>kind: ${fruits[i]["kind"]}</div>
    <div>color: ${fruits[i]["color"]}</div>
    <div>weight: ${fruits[i]["weight"]}</div>
    </div>
    `;
    li.innerHTML = div;
    fruitsList.appendChild(li);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива

const shuffleFruits = () => { // функция для перемешивания списка
  let tempFruits = Array.from(fruits); // копируем промежуточный массив для сравнения в самой функции для получения актуального массива на момент сравнения
  let result = [];

  while (fruits.length > 0) { // TODO: допишите функцию перемешивания массива
    let i = getRandomInt(0, fruits.length - 1);
    result.push(fruits[i]);
    fruits.splice(i, 1);
  }
  if (JSON.stringify(tempFruits) === JSON.stringify(result)) { // сравнение строк из массивов, нашел несколько методов, остановился на этом.
    alert('Не перемешались!');
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  minValue = parseInt(document.querySelector('.minweight__input').value);
  maxValue = parseInt(document.querySelector('.maxweight__input').value);

  if (isNaN(minValue)) { // проверка на NaN и установка дефолтных значений
    minValue = 0;
  }

  if (isNaN(maxValue)) {
    maxValue = 100;
  }

  if (minValue > maxValue) { // меняем местами при обратном диапазоне
    [minValue, maxValue] = [maxValue, minValue];
  }

  fruits = fruits.filter((item) => { // фильтруем текущие данные по заданным значениям
    return item.weight >= minValue && item.weight <= maxValue;
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (item1, item2) => { // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['розово-красный', 'желтый', 'зеленый', 'синий', 'фиолетовый', 'светло-коричневый', 'черный'];
  const priority1 = priority.indexOf(item1.color);
  const priority2 = priority.indexOf(item2.color);
  return (priority1 > priority2) ? true : false;
};

const sortAPI = {
  bubbleSort(arr, comparation) { // TODO: допишите функцию сортировки пузырьком
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (comparation(arr[j], arr[j + 1])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  },

  quickSort(arr, comparation) { // TODO: допишите функцию быстрой сортировки
     // функция обмена элементов
     function swap(arr, firstIndex, secondIndex) {
      [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
    }
    // функция разделитель
    function partition(arr, comparation, left, right) {
      let pivot = arr[Math.floor((right + left) / 2)],
        i = left,
        j = right;
      while (i <= j) {
        while (comparation(pivot, arr[i])) {
          i++;
        }
        while (comparation(arr[j], pivot)) {
          j--;
        }
        if (i <= j) {
          swap(arr, i, j);
          i++;
          j--;
        }
      }
      return i;
    }
    // алгоритм быстрой сортировки
    function quickSortAlg(arr, comparation, left = 0, right = arr.length - 1) {
      let index;
      if (arr.length > 1) {
        index = partition(arr, comparation, left, right);
        if (left < index - 1) {
          quickSortAlg(arr, comparation, left, index - 1);
        }
        if (index < right) {
          quickSortAlg(arr, comparation, index, right);
        }
      }
      return arr;
    }
    // запуск быстрой сортировки
    quickSortAlg(arr, comparation);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => { // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind == 'bubbleSort') {
    sortKindLabel.textContent = 'quickSort';
    sortKind = 'quickSort';
  } else {
    sortKindLabel.textContent = 'bubbleSort';
    sortKind = 'bubbleSort';
  }
});

sortActionButton.addEventListener('click', () => {
    sortTimeLabel.textContent = 'sorting...'; // TODO: вывести в sortTimeLabel значение 'sorting...'

    const sort = sortAPI[sortKind];
    sortAPI.startSort(sort, fruits, comparationColor);
    sortTimeLabel.textContent = sortTime; // TODO: вывести в sortTimeLabel значение sortTime
    display(); 
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => { // TODO: создание и добавление нового фрукта в массив fruits необходимые значения берем из kindInput, colorInput, weightInput
   
   newFruitKind = kindInput.value; // получение введенных значений
   newFruitColor = colorInput.value;
   newFruitWeight = weightInput.value;
 
   if ((newFruitKind === '') || (newFruitColor === '') || (newFruitWeight === '')) {
     alert('Введите недостающие данные!'); // Предупреждение
   } else {
     let newItem = { // создание массива для нового фрукта
       kind: newFruitKind,
       color: newFruitColor,
       weight: newFruitWeight
     };
     fruits.push(newItem); // добавление в конец текущего массива     
   } 
  display();
});