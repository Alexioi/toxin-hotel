# toxin-hotel

Собранный проект можно посмотреть [тут](https://alexioi.github.io/toxin-hotel/).

### Запуск проекта локально

1. Скачать репозиторий:

```bash
git clone https://github.com/Alexioi/toxin-hotel.git
```

2. Перейти в директорию проекта:

```bash
cd toxin-hotel/
```

3. Установить зависимости:

```bash
npm ci
```

4. Запустить live-server:

```bash
npm run server
```

### Скрипты

- Компилирует билд и запускает скрипт purgecss

```bash
npm run build
```

- Удаляет из билда неиспользуемые css классы

```bash
npm run purgecss
```

- Запустить скрипт build и после компиляции проекта отправить на origin/gh-pages

```bash
npm run deploy
```

- Запустить live-server реагирующий на изменения в рабочей директории

```bash
npm run server
```

### Используемые плагины

[air-datepicker ^2.2.3](https://www.npmjs.com/package/air-datepicker) - добавляет календарь

[imask ^6.0.7](https://www.npmjs.com/package/imask) - добавляет маску в инпуты

[ion-rangeslider ^2.3.1](https://www.npmjs.com/package/ion-rangeslider) - плагин ползунка

[paginationjs ^2.1.5](https://www.npmjs.com/package/paginationjs) - плагин пагинации

### Зависимости

npm 8.15.0
